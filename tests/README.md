# Game Testing Infrastructure

Testing approach that validates domain calculations against extracted game values. Use the [canonical game-access policy](helpers/README.md#game-access) to select the default offline server or justify live access.

## Automatic Domain Class Reference Report

`scripts/domain-class-references.ts` inventories class declarations in editable
`data/domain/**` and their symbol references from `app/**`, `components/**`, and
test files. A class counts as referenced when its class symbol or one of its
declared member symbols is referenced from a root. This is a symbol-reference
inventory; it does not classify classes as core or parameter calculations.

The top-level `excludedDomainDirectories` set near the top of
`scripts/domain-class-references.ts` controls which top-level directories under
`data/domain` are excluded. It currently contains `data`, `enum`, `model`,
`base`, and `login`; maintainers add or remove directory names there when the
exclusion list changes.

All formats group classes into **both**, **UI-only**, **tests-only**, and
**neither**, and group entries by implementation path:

```bash
yarn coverage:report                         # Markdown: coverage-report.md
yarn coverage:report --format=markdown       # Markdown: coverage-report.md
yarn coverage:report --format=html           # HTML: coverage-report.html
yarn coverage:report --format=json           # JSON: coverage-report.json
```

The command also accepts the space-separated form, for example
`yarn coverage:report --format markdown`. HTML is a standalone, human-readable
report with collapsed references and search; JSON is machine-readable.

## Documentation

See `docs/TESTING_IMPLEMENTATION.md` for comprehensive testing guide.
