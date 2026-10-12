import * as fs from 'node:fs';
import * as path from 'node:path';
import ts from 'typescript';

type ReferenceKind = 'UI' | 'test';
type ReferenceLocation = { file: string; line: number };
type ClassEntry = {
  name: string;
  implementationPath: string;
  symbols: Map<ts.Symbol, string>;
  uiReferences: Map<string, ReferenceLocation[]>;
  testReferences: Map<string, ReferenceLocation[]>;
};

const root = process.cwd();
const domainRoot = path.join(root, 'data/domain');
const excludedDomainDirectories = new Set(['data', 'enum', 'model', 'base', 'login']);
const sourceExtensions = new Set(['.ts', '.tsx', '.mts', '.cts']);

function walk(directory: string, shouldIncludeFile: (file: string) => boolean): string[] {
  if (!fs.existsSync(directory)) return [];

  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const filePath = path.join(directory, entry.name);
    if (entry.isDirectory()) return walk(filePath, shouldIncludeFile);
    return entry.isFile() && shouldIncludeFile(filePath) ? [filePath] : [];
  });
}

function isTypeScriptSource(file: string): boolean {
  return sourceExtensions.has(path.extname(file));
}

function canonicalSymbol(checker: ts.TypeChecker, symbol: ts.Symbol | undefined): ts.Symbol | undefined {
  if (!symbol) return undefined;
  return symbol.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol;
}

const configPath = ts.findConfigFile(root, ts.sys.fileExists, 'tsconfig.json');

if (!configPath) throw new Error('Could not find tsconfig.json');
const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
if (configFile.error) throw new Error(ts.flattenDiagnosticMessageText(configFile.error.messageText, '\n'));
const parsedConfig = ts.parseJsonConfigFileContent(configFile.config, ts.sys, path.dirname(configPath));
const implementationFiles = walk(domainRoot, (file) => {
  const relative = path.relative(domainRoot, file).split(path.sep);
  return !excludedDomainDirectories.has(relative[0]) && isTypeScriptSource(file);
}).sort();
const uiFiles = [
  ...walk(path.join(root, 'app'), isTypeScriptSource),
  ...walk(path.join(root, 'components'), isTypeScriptSource),
].sort();
const testFiles = walk(path.join(root, 'tests'), (file) => /\.test\.tsx?$/.test(file)).sort();
const testFileSet = new Set(testFiles);
const referenceFiles = [...new Set([...uiFiles, ...testFiles])];
const sourceFileByPath = new Map<string, ts.SourceFile>();
const program = ts.createProgram({
  rootNames: [...new Set([...parsedConfig.fileNames, ...implementationFiles, ...referenceFiles])],
  options: parsedConfig.options,
});
const checker = program.getTypeChecker();

for (const sourceFile of program.getSourceFiles()) {
  sourceFileByPath.set(path.resolve(sourceFile.fileName), sourceFile);
}

const classes: ClassEntry[] = [];
for (const file of implementationFiles) {
  const sourceFile = sourceFileByPath.get(path.resolve(file));
  if (!sourceFile) continue;

  const visit = (node: ts.Node): void => {
    if (ts.isClassDeclaration(node) && node.name) {
      const classSymbol = canonicalSymbol(checker, checker.getSymbolAtLocation(node.name));
      if (classSymbol) {
        const symbols = new Map<ts.Symbol, string>([[classSymbol, node.name.text]]);
        for (const member of node.members) {
          if (!member.name) continue;
          const memberSymbol = canonicalSymbol(checker, checker.getSymbolAtLocation(member.name));
          if (memberSymbol) symbols.set(memberSymbol, member.name.getText(sourceFile));
        }
        classes.push({
          name: node.name.text,
          implementationPath: path.relative(root, file).split(path.sep).join('/'),
          symbols,
          uiReferences: new Map(),
          testReferences: new Map(),
        });
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);
}

const classBySymbol = new Map<ts.Symbol, { entry: ClassEntry; name: string }>();
for (const entry of classes) {
  for (const [symbol, name] of entry.symbols) classBySymbol.set(symbol, { entry, name });
}

for (const file of referenceFiles) {
  const sourceFile = sourceFileByPath.get(path.resolve(file));
  if (!sourceFile) continue;
  const kind: ReferenceKind = testFileSet.has(file) ? 'test' : 'UI';
  const relativeFile = path.relative(root, file).split(path.sep).join('/');

  const visit = (node: ts.Node): void => {
    if (ts.isIdentifier(node) || ts.isPrivateIdentifier(node)) {
      const symbol = canonicalSymbol(checker, checker.getSymbolAtLocation(node));
      const match = symbol && classBySymbol.get(symbol);
      if (match) {
        const references = kind === 'UI' ? match.entry.uiReferences : match.entry.testReferences;
        const locations = references.get(match.name) ?? [];
        locations.push({ file: relativeFile, line: sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile)).line + 1 });
        references.set(match.name, locations);
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);
}

type CoverageGroup = 'both' | 'ui-only' | 'test-only' | 'neither';
type SerializedReference = { symbol: string; locations: ReferenceLocation[] };

const coverageGroupOrder: CoverageGroup[] = ['both', 'ui-only', 'test-only', 'neither'];
const coverageGroups: Record<CoverageGroup, ClassEntry[]> = {
  both: [],
  'ui-only': [],
  'test-only': [],
  neither: [],
};
const getCoverageGroup = (entry: ClassEntry): CoverageGroup => {
  const hasUI = entry.uiReferences.size > 0;
  const hasTests = entry.testReferences.size > 0;
  if (hasUI && hasTests) return 'both';
  if (hasUI) return 'ui-only';
  if (hasTests) return 'test-only';
  return 'neither';
};
for (const entry of classes) coverageGroups[getCoverageGroup(entry)].push(entry);

const uiCount = classes.filter((entry) => entry.uiReferences.size > 0).length;
const testCount = classes.filter((entry) => entry.testReferences.size > 0).length;
const bothCount = coverageGroups.both.length;
const neitherCount = coverageGroups.neither.length;
const summary = {
  totalClasses: classes.length,
  uiReferenced: uiCount,
  testReferenced: testCount,
  both: bothCount,
  neither: neitherCount,
};

function referenceRows(references: Map<string, ReferenceLocation[]>): SerializedReference[] {
  return [...references.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([symbol, locations]) => ({
      symbol,
      locations: [...new Map(locations.map((location) => [`${location.file}:${location.line}`, location])).values()]
        .sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line),
    }));
}

function escapeMarkdown(value: string): string {
  return value.replace(/[\\`*_{}\[\]()#+.!|<>~-]/g, '\\$&').replaceAll('\n', ' ');
}

function referenceSummary(references: Map<string, ReferenceLocation[]>): string {
  if (!references.size) return '—';
  return referenceRows(references).map(({ symbol, locations }) => {
    const renderedLocations = locations.map(({ file, line }) => `${file}:${line}`);
    return `**${escapeMarkdown(symbol)}** (${renderedLocations.map(escapeMarkdown).join(', ')})`;
  }).join('<br>');
}

const sortedEntries = (entries: ClassEntry[]): ClassEntry[] =>
  [...entries].sort((a, b) => a.implementationPath.localeCompare(b.implementationPath) || a.name.localeCompare(b.name));

function renderMarkdown(): string {
  const lines = [
    '# Domain class references',
    '',
    'Automatically generated inventory of editable class declarations in `data/domain/**`, excluding top-level `data`, `enum`, `model`, `base`, and `login` directories.',
    '',
    'UI references are symbol-resolved uses in `app/**` or `components/**`. Test references are symbol-resolved uses in `tests/**/*.test.ts` or `tests/**/*.test.tsx`. A class is referenced when its class symbol or one of its declared member symbols is used. Project compiler options come from `tsconfig.json`; scoped UI and test files are added as explicit program roots because tests and scripts are excluded by that configuration.',
    '',
    `Totals: **${summary.totalClasses} classes** · **${summary.uiReferenced} with UI references** · **${summary.testReferenced} with test references** · **${summary.both} with both** · **${summary.neither} with neither**.`,
    '',
  ];
  for (const group of coverageGroupOrder) {
    lines.push(`## ${group} (${coverageGroups[group].length})`, '');
    const byPath = new Map<string, ClassEntry[]>();
    for (const entry of sortedEntries(coverageGroups[group])) {
      const pathEntries = byPath.get(entry.implementationPath) ?? [];
      pathEntries.push(entry);
      byPath.set(entry.implementationPath, pathEntries);
    }
    for (const [implementationPath, entries] of byPath) {
      lines.push(`### ${escapeMarkdown(implementationPath)}`, '', '| Class | UI references | Test references |', '| --- | --- | --- |');
      for (const entry of entries) {
        lines.push(`| ${escapeMarkdown(entry.name)} | ${referenceSummary(entry.uiReferences)} | ${referenceSummary(entry.testReferences)} |`);
      }
      lines.push('');
    }
  }
  return `${lines.join('\n')}\n`;
}

function escapeHTML(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;').replaceAll("'", '&#39;');
}

function renderHTML(): string {
  const groupLabels: Record<CoverageGroup, string> = {
    both: 'UI and tests',
    'ui-only': 'UI only',
    'test-only': 'Tests only',
    neither: 'Neither',
  };
  const locationCount = (references: SerializedReference[]): number =>
    references.reduce((total, reference) => total + reference.locations.length, 0);
  const renderReferenceSet = (label: string, tone: string, references: SerializedReference[]): string => `
    <section class="reference-set reference-set--${tone}">
      <h4>${label}<span>${locationCount(references)} locations</span></h4>
      ${references.length
      ? `<ul class="reference-list">${references.map(({ symbol, locations }) => `
          <li class="reference-row">
            <strong>${escapeHTML(symbol)}</strong>
            <span class="reference-locations">${locations.map(({ file, line }) =>
        `<code>${escapeHTML(file)}:${line}</code>`).join('')}</span>
          </li>`).join('')}
        </ul>`
      : '<p class="empty-references">No references recorded.</p>'}
    </section>`;
  const groups = coverageGroupOrder.map((group) => {
    const byPath = new Map<string, ClassEntry[]>();
    for (const entry of sortedEntries(coverageGroups[group])) {
      const pathEntries = byPath.get(entry.implementationPath) ?? [];
      pathEntries.push(entry);
      byPath.set(entry.implementationPath, pathEntries);
    }
    const pathSections = [...byPath].map(([implementationPath, entries]) => `
      <section class="file-group" data-total="${entries.length}">
        <h3>
          <code>${escapeHTML(implementationPath)}</code>
          <span class="file-count">${entries.length} ${entries.length === 1 ? 'class' : 'classes'}</span>
        </h3>
        <div class="class-list">
          ${entries.map((entry) => {
      const uiReferences = referenceRows(entry.uiReferences);
      const testReferences = referenceRows(entry.testReferences);
      const uiLocations = locationCount(uiReferences);
      const testLocations = locationCount(testReferences);
      const searchTerms = [...new Set([
        entry.name,
        entry.implementationPath,
        ...uiReferences.flatMap(({ symbol, locations }) => [symbol, ...locations.map(({ file }) => file)]),
        ...testReferences.flatMap(({ symbol, locations }) => [symbol, ...locations.map(({ file }) => file)]),
      ])].join(' ').toLocaleLowerCase();
      return `<details class="class-entry" data-group="${group}" data-search="${escapeHTML(searchTerms)}">
              <summary>
                <span class="class-name">${escapeHTML(entry.name)}</span>
                <span class="class-signals">
                  <span class="signal signal--ui">${uiLocations} UI</span>
                  <span class="signal signal--tests">${testLocations} tests</span>
                </span>
              </summary>
              <div class="class-detail">
                <p>Declared symbols and their locations in the UI and test sources.</p>
                <div class="reference-columns">
                  ${renderReferenceSet('UI references', 'ui', uiReferences)}
                  ${renderReferenceSet('Test references', 'tests', testReferences)}
                </div>
              </div>
            </details>`;
    }).join('')}
        </div>
      </section>`).join('');
    return `<section class="coverage-group" data-group="${group}" data-total="${coverageGroups[group].length}">
      <header class="coverage-heading">
        <h2><span class="group-marker" aria-hidden="true"></span>${groupLabels[group]}</h2>
        <span class="group-count">${coverageGroups[group].length} ${coverageGroups[group].length === 1 ? 'class' : 'classes'}</span>
      </header>
      ${pathSections}
    </section>`;
  }).join('');
  const filters = [
    { value: 'all', label: 'All classes', count: summary.totalClasses },
    ...coverageGroupOrder.map((group) => ({
      value: group,
      label: groupLabels[group],
      count: coverageGroups[group].length,
    })),
  ].map(({ value, label, count }, index) => `
    <button class="filter-button" type="button" data-filter="${value}" aria-pressed="${index === 0}">
      <span>${label}</span><span class="filter-count">${count}</span>
    </button>`).join('');
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Domain class index</title>
  <style>
    :root {
      color-scheme: light;
      --canvas: #e5ece8;
      --surface: #f8faf7;
      --ink: #19342f;
      --muted: #536d66;
      --rule: #b9c9c1;
      --ui: #176f7c;
      --tests: #805b25;
      --both: #536d3a;
      --neither: #687874;
      --focus: #9a681d;
      --body-font: "Avenir Next", "Trebuchet MS", system-ui, sans-serif;
      --display-font: "Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif;
      font: 16px/1.5 var(--body-font);
    }
    * { box-sizing: border-box; }
    body { margin: 0; background: var(--canvas); color: var(--ink); }
    button, input { font: inherit; }
    button, summary { -webkit-tap-highlight-color: transparent; }
    button:focus-visible, input:focus-visible, summary:focus-visible {
      outline: 3px solid var(--focus);
      outline-offset: 3px;
    }
    [hidden] { display: none !important; }
    .page { width: min(1240px, calc(100% - 3rem)); margin: 0 auto; }
    .page-header {
      display: grid;
      grid-template-columns: minmax(0, 1.15fr) minmax(20rem, .85fr);
      gap: 3rem;
      align-items: end;
      padding: clamp(2.5rem, 7vw, 5.5rem) 0 2.5rem;
      border-bottom: 1px solid var(--rule);
    }
    .page-header h1 {
      max-width: 13ch;
      margin: .3rem 0 .8rem;
      font: 500 clamp(2.6rem, 5vw, 4.5rem)/1.02 var(--display-font);
      letter-spacing: -.035em;
    }
    .page-intro { max-width: 54ch; margin: 0; color: var(--muted); font-size: 1.05rem; }
    .report-summary {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 1rem;
      margin: 0;
      padding: 0 0 .25rem;
    }
    .report-summary div { border-left: 2px solid var(--rule); padding-left: .85rem; }
    .report-summary dt { color: var(--muted); font-size: .78rem; line-height: 1.35; }
    .report-summary dd { margin: .35rem 0 0; font-size: clamp(1.5rem, 3vw, 2rem); font-weight: 700; line-height: 1; }
    .overlap-note { margin: .45rem 0 0; color: var(--muted); font-size: .78rem; }
    .browse-controls {
      position: sticky;
      top: 0;
      z-index: 2;
      padding: 1rem 0;
      border-bottom: 1px solid var(--rule);
      background: var(--surface);
    }
    .search-row { display: flex; gap: 1rem; align-items: end; }
    .search-field { display: grid; flex: 1; gap: .35rem; max-width: 46rem; }
    .search-field label { color: var(--muted); font-size: .8rem; font-weight: 700; }
    .search-field input {
      width: 100%;
      min-height: 2.8rem;
      padding: .55rem .8rem;
      border: 1px solid var(--rule);
      border-radius: 2px;
      background: white;
      color: var(--ink);
    }
    .result-count { margin: 0 0 .65rem auto; color: var(--muted); font-size: .85rem; white-space: nowrap; }
    .filter-list { display: flex; gap: .5rem; overflow-x: auto; padding: .8rem 0 .1rem; }
    .filter-button {
      display: inline-flex;
      flex: 0 0 auto;
      gap: .65rem;
      align-items: center;
      padding: .45rem .7rem;
      border: 1px solid var(--rule);
      border-radius: 2px;
      background: transparent;
      color: var(--ink);
      cursor: pointer;
    }
    .filter-button[aria-pressed="true"] { border-color: var(--ink); background: var(--ink); color: var(--surface); }
    .filter-count { font-variant-numeric: tabular-nums; font-size: .78rem; opacity: .78; }
    .index { padding: 1.5rem 0 4rem; }
    .coverage-group { margin: 0 0 2rem; padding: 0 0 .4rem; border-bottom: 1px solid var(--rule); }
    .coverage-heading {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      padding: .6rem 0 .85rem;
      border-bottom: 1px solid var(--rule);
    }
    .coverage-heading h2 { display: flex; align-items: center; gap: .65rem; margin: 0; font-size: 1.35rem; font-weight: 700; }
    .coverage-group[data-group="both"] { --group-color: var(--both); }
    .coverage-group[data-group="ui-only"] { --group-color: var(--ui); }
    .coverage-group[data-group="test-only"] { --group-color: var(--tests); }
    .coverage-group[data-group="neither"] { --group-color: var(--neither); }
    .group-marker { width: .72rem; height: .72rem; border-radius: 50%; background: var(--group-color); }
    .group-count { color: var(--muted); font-size: .85rem; font-variant-numeric: tabular-nums; }
    .file-group { padding: 1rem 0 .35rem; border-bottom: 1px solid color-mix(in srgb, var(--rule), transparent 40%); }
    .file-group h3 {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 1rem;
      margin: 0 0 .35rem;
      font-size: .9rem;
      font-weight: 600;
    }
    .file-group h3 code { overflow-wrap: anywhere; color: var(--muted); font: .84rem/1.5 ui-monospace, "Cascadia Code", monospace; }
    .file-count { flex: 0 0 auto; color: var(--muted); font-size: .76rem; font-weight: 400; }
    .class-entry { border-top: 1px solid color-mix(in srgb, var(--rule), transparent 52%); }
    .class-entry > summary {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      min-height: 2.8rem;
      padding: .45rem .25rem;
      cursor: pointer;
      list-style-position: inside;
    }
    .class-entry > summary::marker { color: var(--group-color); }
    .class-name { font-weight: 650; overflow-wrap: anywhere; }
    .class-signals { display: flex; flex: 0 0 auto; gap: .45rem; }
    .signal { padding: .12rem .4rem; border-left: 2px solid currentColor; color: var(--muted); font-size: .75rem; font-variant-numeric: tabular-nums; }
    .signal--ui { color: var(--ui); }
    .signal--tests { color: var(--tests); }
    .class-entry[open] > summary { color: var(--group-color); }
    .class-detail { padding: .2rem 1rem 1rem 1.35rem; }
    .class-detail > p { margin: 0 0 .9rem; color: var(--muted); font-size: .8rem; }
    .reference-columns { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.5rem; }
    .reference-set { min-width: 0; }
    .reference-set h4 { display: flex; justify-content: space-between; gap: .6rem; margin: 0 0 .45rem; font-size: .82rem; }
    .reference-set h4 span { color: var(--muted); font-size: .72rem; font-weight: 400; }
    .reference-list { display: grid; gap: .4rem; margin: 0; padding: 0; list-style: none; }
    .reference-row { display: grid; grid-template-columns: minmax(5rem, max-content) minmax(0, 1fr); gap: .75rem; align-items: baseline; font-size: .78rem; }
    .reference-row strong { overflow-wrap: anywhere; }
    .reference-locations { display: flex; flex-wrap: wrap; gap: .25rem .6rem; }
    .reference-locations code { color: var(--muted); font: .72rem/1.5 ui-monospace, "Cascadia Code", monospace; overflow-wrap: anywhere; }
    .empty-references { margin: 0; color: var(--muted); font-size: .78rem; }
    .empty-state { margin: 1rem 0; padding: 1.25rem; border-left: 3px solid var(--tests); background: var(--surface); }
    footer { padding: 1rem 0 2.5rem; border-top: 1px solid var(--rule); color: var(--muted); font-size: .8rem; }
    @media (max-width: 760px) {
      .page { width: min(100% - 2rem, 44rem); }
      .page-header { grid-template-columns: 1fr; gap: 2rem; padding-top: 2.5rem; }
      .report-summary { max-width: 38rem; }
      .browse-controls { padding: .85rem 0; }
      .search-row { align-items: start; flex-direction: column; gap: .45rem; }
      .search-field { width: 100%; max-width: none; }
      .result-count { margin: 0; }
      .reference-columns { grid-template-columns: 1fr; gap: 1rem; }
      .class-entry > summary { align-items: start; flex-direction: column; gap: .2rem; padding: .6rem .2rem; }
      .class-signals { padding-left: 1rem; }
    }
    @media (prefers-reduced-motion: reduce) {
      html { scroll-behavior: auto; }
    }
    @media print {
      body { background: white; }
      .browse-controls { position: static; padding-inline: 0; border: 0; }
      .filter-list { display: none; }
      .page { width: 100%; }
    }
  </style>
</head>
<body>
  <div class="page">
    <header class="page-header">
      <div>
        <h1>Domain class index</h1>
        <p class="page-intro">Find editable domain classes and the UI or test sources that reference their class and member symbols.</p>
      </div>
      <div class="summary-block">
        <dl class="report-summary" aria-label="Inventory totals">
          <div><dt>Class declarations</dt><dd>${summary.totalClasses}</dd></div>
          <div><dt>Classes with UI references</dt><dd>${summary.uiReferenced}</dd></div>
          <div><dt>Classes with test references</dt><dd>${summary.testReferenced}</dd></div>
        </dl>
        <p class="overlap-note">UI and test totals can overlap.</p>
      </div>
    </header>
    <main>
      <section class="browse-controls" aria-label="Search and filter the class index">
        <div class="search-row">
          <div class="search-field">
            <label for="class-search">Search class, member symbol, or file path</label>
            <input id="class-search" type="search" autocomplete="off" placeholder="Try a class or member name">
          </div>
          <p class="result-count" id="result-count" aria-live="polite">${summary.totalClasses} classes shown</p>
        </div>
        <nav class="filter-list" aria-label="Filter by reference group">
          ${filters}
        </nav>
      </section>
      <p class="empty-state" id="empty-state" hidden>No classes match. Try another search or reference group.</p>
      <div class="index" id="class-index">
        ${groups}
      </div>
    </main>
    <footer>A class is listed when its class symbol or a declared member symbol appears in a scoped UI or test source.</footer>
  </div>
  <script>
    const searchInput = document.querySelector('#class-search');
    const filterButtons = [...document.querySelectorAll('[data-filter]')];
    const resultCount = document.querySelector('#result-count');
    const emptyState = document.querySelector('#empty-state');
    const groups = [...document.querySelectorAll('.coverage-group')];
    let activeFilter = 'all';

    function updateResults() {
      const query = searchInput.value.trim().toLocaleLowerCase();
      let visibleCount = 0;
      document.querySelectorAll('.class-entry').forEach((entry) => {
        const matches = (activeFilter === 'all' || entry.dataset.group === activeFilter)
          && entry.dataset.search.includes(query);
        entry.hidden = !matches;
        if (matches) visibleCount += 1;
      });
      document.querySelectorAll('.file-group').forEach((fileGroup) => {
        const visible = Boolean(fileGroup.querySelector('.class-entry:not([hidden])'));
        fileGroup.hidden = !visible;
        const count = fileGroup.querySelector('.file-count');
        if (count) {
          const total = Number(fileGroup.dataset.total);
          const shown = fileGroup.querySelectorAll('.class-entry:not([hidden])').length;
          count.textContent = shown === total ? total + (total === 1 ? ' class' : ' classes') : shown + ' of ' + total + ' classes';
        }
      });
      groups.forEach((group) => {
        const visible = Boolean(group.querySelector('.class-entry:not([hidden])'));
        group.hidden = !visible;
        const count = group.querySelector('.group-count');
        if (count && query) {
          const total = Number(group.dataset.total);
          const shown = group.querySelectorAll('.class-entry:not([hidden])').length;
          count.textContent = shown + ' of ' + total + ' classes';
        }
      });
      const filtered = query.length > 0 || activeFilter !== 'all';
      resultCount.textContent = filtered
        ? visibleCount + ' of ' + ${summary.totalClasses} + ' classes shown'
        : visibleCount + (visibleCount === 1 ? ' class shown' : ' classes shown');
      emptyState.hidden = visibleCount !== 0;
    }

    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        activeFilter = button.dataset.filter;
        filterButtons.forEach((filterButton) => {
          filterButton.setAttribute('aria-pressed', String(filterButton === button));
        });
        updateResults();
      });
    });
    searchInput.addEventListener('input', updateResults);
    updateResults();
  </script>
</body>
</html>
`;
}

function parseFormat(args: string[]): 'markdown' | 'html' | 'json' {
  let format = 'markdown';
  let formatSpecified = false;
  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];
    if (argument.startsWith('--format=')) {
      if (formatSpecified) throw new Error('Specify --format only once.');
      format = argument.slice('--format='.length);
      formatSpecified = true;
    } else if (argument === '--format') {
      if (formatSpecified) throw new Error('Specify --format only once.');
      const next = args[index + 1];
      if (!next || next.startsWith('--')) throw new Error('Expected markdown, html, or json after --format.');
      format = next;
      formatSpecified = true;
      index += 1;
    } else {
      throw new Error(`Unknown argument "${argument}". Use --format=markdown|html|json.`);
    }
  }
  if (format !== 'markdown' && format !== 'html' && format !== 'json') {
    throw new Error(`Unsupported report format "${format}". Supported formats: markdown, html, json.`);
  }
  return format;
}

const format = parseFormat(process.argv.slice(2));
const report = format === 'markdown'
  ? renderMarkdown()
  : format === 'html'
    ? renderHTML()
    : `${JSON.stringify({
      summary,
      groups: Object.fromEntries(coverageGroupOrder.map((group) => [
        group,
        sortedEntries(coverageGroups[group]).map((entry) => ({
          name: entry.name,
          implementationPath: entry.implementationPath,
          coverageGroup: group,
          uiReferences: referenceRows(entry.uiReferences),
          testReferences: referenceRows(entry.testReferences),
        })),
      ])),
    }, null, 2)}\n`;
const extension = format === 'markdown' ? 'md' : format;
fs.writeFileSync(path.join(root, `coverage-report.${extension}`), report);
