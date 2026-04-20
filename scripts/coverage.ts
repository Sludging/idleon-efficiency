import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';

interface CoverageConfig {
  domains: string[];
  methods: string[];
  patterns: string[];
}

interface TestCoverage {
  file: string;
  covers: string[];
}

interface DomainMember {
  domain: string;
  class: string;
  member: string;
  file: string;
}

const projectRoot = process.cwd();
const config: CoverageConfig = JSON.parse(
  fs.readFileSync(path.join(projectRoot, 'coverage-config.json'), 'utf-8')
);

function extractTestCovers(filePath: string): string[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  // Match @testCovers followed by one or more word chars, dots, or spaces until end of line
  const matches = content.match(/@testCovers\s+([^\n]+)/g) || [];
  return matches.map(m => {
    const match = m.match(/@testCovers\s+([^\n]+)/);
    return match ? match[1].trim() : '';
  }).filter(Boolean);
}

function extractDomainMembers(filePath: string): DomainMember[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const members: DomainMember[] = [];
  const fileRelative = path.relative(projectRoot, filePath);

  // Extract domain folder name
  const domainMatch = filePath.match(/data\/domain\/(?:world-\d\/)?([^/]+)/);
  const domain = domainMatch ? domainMatch[1] : 'unknown';

  // Parse TypeScript file
  const sourceFile = ts.createSourceFile(
    filePath,
    content,
    ts.ScriptTarget.Latest,
    true
  );

  // Walk the AST and find class declarations
  function visit(node: ts.Node) {
    if (ts.isClassDeclaration(node) && node.name) {
      const className = node.name.text;

      // Extract members from this class
      node.members.forEach(member => {
        // Skip constructors
        if (ts.isConstructorDeclaration(member)) {
          return;
        }

        // Get member name
        let memberName: string | undefined;

        if (ts.isMethodDeclaration(member) && member.name) {
          memberName = (member.name as ts.Identifier).text;
        } else if (ts.isPropertyDeclaration(member) && member.name) {
          // Only include properties that are methods (have initializers that are arrow functions)
          if (member.initializer && ts.isArrowFunction(member.initializer)) {
            memberName = (member.name as ts.Identifier).text;
          }
        } else if (ts.isGetAccessorDeclaration(member) && member.name) {
          memberName = (member.name as ts.Identifier).text;
        }

        if (memberName) {
          members.push({
            domain,
            class: className,
            member: memberName,
            file: fileRelative,
          });
        }
      });
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return members;
}

function shouldIgnore(item: string): boolean {
  const [className, methodName] = item.split('.');

  // Check domain ignore list
  for (const domain of config.domains) {
    if (className.toLowerCase().includes(domain.toLowerCase())) {
      return true;
    }
  }

  // Check exact method matches
  if (config.methods.includes(item)) {
    return true;
  }

  // Check wildcard patterns
  for (const pattern of config.patterns) {
    const regex = new RegExp('^' + pattern.replace(/\*/g, '.*') + '$');
    if (regex.test(item)) {
      return true;
    }
  }

  return false;
}

function generateReport(
  allMembers: DomainMember[],
  testCoverage: TestCoverage[]
) {
  // Build coverage map
  const coveredSet = new Set<string>();
  testCoverage.forEach(test => {
    test.covers.forEach(cover => {
      coveredSet.add(cover);
    });
  });

  // Separate covered, uncovered, and ignored
  const covered: DomainMember[] = [];
  const uncovered: DomainMember[] = [];
  const ignored: DomainMember[] = [];

  allMembers.forEach(member => {
    const fullName = `${member.class}.${member.member}`;

    if (shouldIgnore(fullName)) {
      ignored.push(member);
    } else if (coveredSet.has(fullName)) {
      covered.push(member);
    } else {
      uncovered.push(member);
    }
  });

  const total = allMembers.length;
  const testable = allMembers.length - ignored.length;
  const coveragePercent =
    testable === 0 ? 0 : Math.round((covered.length / testable) * 100);

  // Generate markdown
  let markdown = `# Test Coverage Report\n\n`;
  markdown += `Generated: ${new Date().toISOString()}\n\n`;

  markdown += `## Summary\n\n`;
  markdown += `| Metric | Count |\n`;
  markdown += `|--------|-------|\n`;
  markdown += `| Total Methods | ${total} |\n`;
  markdown += `| Ignored | ${ignored.length} |\n`;
  markdown += `| Testable | ${testable} |\n`;
  markdown += `| Covered | ${covered.length} |\n`;
  markdown += `| Coverage | **${coveragePercent}%** |\n\n`;

  // Covered by domain
  if (covered.length > 0) {
    markdown += `## Covered Methods\n\n`;
    const coveredByDomain = new Map<string, DomainMember[]>();
    covered.forEach(m => {
      if (!coveredByDomain.has(m.domain)) {
        coveredByDomain.set(m.domain, []);
      }
      coveredByDomain.get(m.domain)!.push(m);
    });

    Array.from(coveredByDomain.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .forEach(([domain, members]) => {
        markdown += `### ${domain}\n\n`;
        members.forEach(m => {
          markdown += `- \`${m.class}.${m.member}\` ([${path.basename(m.file)}](${m.file}))\n`;
        });
        markdown += `\n`;
      });
  }

  // Uncovered (gaps)
  if (uncovered.length > 0) {
    markdown += `## Coverage Gaps\n\n`;
    const uncoveredByDomain = new Map<string, DomainMember[]>();
    uncovered.forEach(m => {
      if (!uncoveredByDomain.has(m.domain)) {
        uncoveredByDomain.set(m.domain, []);
      }
      uncoveredByDomain.get(m.domain)!.push(m);
    });

    Array.from(uncoveredByDomain.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .forEach(([domain, members]) => {
        markdown += `### ${domain}\n\n`;
        members.forEach(m => {
          markdown += `- \`${m.class}.${m.member}\` ([${path.basename(m.file)}](${m.file}))\n`;
        });
        markdown += `\n`;
      });
  }

  // Ignored
  if (ignored.length > 0) {
    markdown += `## Ignored Methods\n\n`;
    markdown += `These are excluded from coverage calculation per \`coverage-config.json\`.\n\n`;
    const ignoredByDomain = new Map<string, DomainMember[]>();
    ignored.forEach(m => {
      if (!ignoredByDomain.has(m.domain)) {
        ignoredByDomain.set(m.domain, []);
      }
      ignoredByDomain.get(m.domain)!.push(m);
    });

    Array.from(ignoredByDomain.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .forEach(([domain, members]) => {
        markdown += `### ${domain}\n\n`;
        markdown += `${members.length} method(s)\n`;
      });
  }

  // Validation warnings
  const validationWarnings: string[] = [];
  testCoverage.forEach(test => {
    test.covers.forEach(cover => {
      const exists = allMembers.some(
        m => `${m.class}.${m.member}` === cover
      );
      if (!exists && !shouldIgnore(cover)) {
        validationWarnings.push(
          `⚠️ Test file \`${test.file}\` claims to cover \`${cover}\` but method not found`
        );
      }
    });
  });

  if (validationWarnings.length > 0) {
    markdown += `## Validation Warnings\n\n`;
    validationWarnings.forEach(w => {
      markdown += `${w}\n`;
    });
    markdown += `\n`;
  }

  return markdown;
}

function findFiles(dir: string, pattern: RegExp, ignore?: RegExp): string[] {
  const files: string[] = [];

  function walk(currentDir: string) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    entries.forEach(entry => {
      const fullPath = path.join(currentDir, entry.name);
      const relativePath = path.relative(projectRoot, fullPath);

      if (ignore && ignore.test(relativePath)) {
        return;
      }

      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile() && pattern.test(fullPath)) {
        files.push(fullPath);
      }
    });
  }

  walk(dir);
  return files;
}

async function main() {
  console.log('🔍 Scanning test files...');
  const testFiles = findFiles(
    path.join(projectRoot, 'tests/domains'),
    /\.test\.ts$/
  );
  const testCoverage: TestCoverage[] = testFiles.map(file => ({
    file: path.relative(projectRoot, file),
    covers: extractTestCovers(file),
  }));
  console.log(`✓ Found ${testFiles.length} test files`);

  console.log('🔍 Scanning domain files...');
  const domainFiles = findFiles(
    path.join(projectRoot, 'data/domain'),
    /\.tsx$/,
    /\/(data|enum|model)\//
  );
  const allMembers: DomainMember[] = [];
  domainFiles.forEach(file => {
    allMembers.push(...extractDomainMembers(file));
  });
  console.log(`✓ Found ${domainFiles.length} domain files with ${allMembers.length} members`);

  console.log('📊 Generating report...');
  const report = generateReport(allMembers, testCoverage);

  const reportPath = path.join(projectRoot, 'coverage-report.md');
  fs.writeFileSync(reportPath, report);
  console.log(`✓ Report written to ${reportPath}`);

  // Print summary to console
  const summaryMatch = report.match(/\| Coverage \| \*\*(\d+)%\*\* \|/);
  const coverage = summaryMatch ? summaryMatch[1] : '?';
  console.log(`\n📈 Coverage: ${coverage}%\n`);
}

main().catch(err => {
  console.error('Error generating coverage report:', err);
  process.exit(1);
});
