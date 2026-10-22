#!/usr/bin/env node
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

function compareText(left, right) {
    return left < right ? -1 : left > right ? 1 : 0;
}

function parseArguments(args) {
    const options = {
        source: path.resolve(__dirname, '../data/domain/data'),
        output: path.resolve(__dirname, '../data/domain/repositories.generated.ts'),
    };

    for (let index = 0; index < args.length; index += 1) {
        const argument = args[index];
        if (argument !== '--source' && argument !== '--output') {
            throw new Error(`Unsupported argument: ${argument}`);
        }

        const value = args[index + 1];
        if (!value || value.startsWith('--')) {
            throw new Error(`Expected a path after ${argument}`);
        }

        options[argument.slice(2)] = path.resolve(value);
        index += 1;
    }

    return options;
}

function hasExportModifier(node) {
    return Boolean(node.modifiers && node.modifiers.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword));
}

function unwrapExpression(expression) {
    while (ts.isParenthesizedExpression(expression) || ts.isAsExpression(expression) || ts.isTypeAssertionExpression(expression)) {
        expression = expression.expression;
    }
    return expression;
}

function discoverFactories(sourceDirectory) {
    if (!fs.existsSync(sourceDirectory) || !fs.statSync(sourceDirectory).isDirectory()) {
        throw new Error(`Source directory does not exist: ${sourceDirectory}`);
    }

    const files = fs.readdirSync(sourceDirectory)
        .filter((file) => file.endsWith('Repo.ts'))
        .sort(compareText);
    const entries = [];
    const keys = new Map();

    for (const file of files) {
        const filePath = path.join(sourceDirectory, file);
        const sourceFile = ts.createSourceFile(filePath, fs.readFileSync(filePath, 'utf8'), ts.ScriptTarget.Latest, true);
        const reExports = new Set();
        for (const statement of sourceFile.statements) {
            if (ts.isExportDeclaration(statement) && statement.exportClause && ts.isNamedExports(statement.exportClause)) {
                for (const element of statement.exportClause.elements) reExports.add(element.name.text);
            }
        }

        let factoriesInFile = 0;
        for (const statement of sourceFile.statements) {
            if (ts.isFunctionDeclaration(statement) && statement.name) {
                const name = statement.name.text;
                if (!hasExportModifier(statement) && !reExports.has(name)) continue;
                addFactory(name, statement.parameters, file);
                continue;
            }

            if (!ts.isVariableStatement(statement) || !hasExportModifier(statement)) continue;
            for (const declaration of statement.declarationList.declarations) {
                if (!ts.isIdentifier(declaration.name) || !/^init.*Repo$/.test(declaration.name.text)) continue;
                const name = declaration.name.text;
                if (!declaration.initializer) {
                    throw new Error(`Unsupported factory ${file}:${name}: missing function initializer`);
                }
                const initializer = unwrapExpression(declaration.initializer);
                if (!ts.isArrowFunction(initializer) && !ts.isFunctionExpression(initializer)) {
                    throw new Error(`Unsupported factory ${file}:${name}: expected a function initializer`);
                }
                addFactory(name, initializer.parameters, file);
            }
        }

        if (factoriesInFile === 0) {
            throw new Error(`Unsupported repository source ${file}: no exported init*Repo factory found`);
        }

        function addFactory(name, parameters, sourceFileName) {
            if (!/^init.*Repo$/.test(name)) return;
            factoriesInFile += 1;
            const requiredParameters = parameters.filter((parameter) =>
                !parameter.questionToken && !parameter.initializer && !parameter.dotDotDotToken);
            if (requiredParameters.length > 0) {
                throw new Error(`Unsupported factory ${sourceFileName}:${name}: requires ${requiredParameters.length} argument(s)`);
            }

            const key = sourceFileName.slice(0, -'Repo.ts'.length);
            const prior = keys.get(key);
            if (prior) throw new Error(`Repository key collision ${JSON.stringify(key)}: ${prior} and ${sourceFileName}`);
            keys.set(key, sourceFileName);
            entries.push({ file: sourceFileName, key, name });
        }
    }

    return entries.sort((left, right) => compareText(left.key, right.key));
}

function renderRegistry(entries, sourceDirectory, outputFile) {
    const outputDirectory = path.dirname(outputFile);
    const imports = entries.map(({ file, name }) => {
        let importPath = path.relative(outputDirectory, path.join(sourceDirectory, file)).split(path.sep).join('/');
        if (!importPath.startsWith('.')) importPath = `./${importPath}`;
        return `import { ${name} } from ${JSON.stringify(importPath.replace(/\.ts$/, ''))};`;
    });
    const properties = entries.map(({ key, name }) => `    ${JSON.stringify(key)}: ${name},`);
    return [
        '// Generated by scripts/generate-repositories.cjs. Do not edit.',
        ...imports,
        '',
        'export const repositoryFactories = {',
        ...properties,
        '} as const;',
        '',
        'export type RepositoryName = keyof typeof repositoryFactories;',
        'export type RepositoryRecords<K extends RepositoryName> = ReturnType<(typeof repositoryFactories)[K]>;',
        '',
    ].join('\n');
}

try {
    const { source, output } = parseArguments(process.argv.slice(2));
    const entries = discoverFactories(source);
    const generated = renderRegistry(entries, source, output);
    fs.mkdirSync(path.dirname(output), { recursive: true });
    if (!fs.existsSync(output) || fs.readFileSync(output, 'utf8') !== generated) {
        fs.writeFileSync(output, generated, 'utf8');
    }
    console.log(`Generated ${entries.length} repository factories: ${output}`);
} catch (error) {
    console.error(`Repository registry generation failed: ${error.message}`);
    process.exitCode = 1;
}
