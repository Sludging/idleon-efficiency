# Data rows

Use `DataRow` when repeated entity or progression records read across aligned fields.
It is the shared pattern for that composition, whether the parent stacks rows or
arranges compact rows in collection columns. Cards, tables, inventory tiles,
singleton summaries and composite dashboard panels serve different tasks; labels
or an internal grid alone do not make them data rows.

## Choose fields

- **`identity`**: an existing entity name, with optional artwork beside it. Do not
  invent a name or treat resource artwork as entity identity.
- **`text`**: a formatted string with a label. Use `role: "description"` for compact
  prose such as a bonus; omit `role` (or use `"value"`) for ordinary values. Keep
  existing semantic colors and tooltips in the field's `color` and `tooltip`.
- **`content`**: a rich renderer such as a resource group, link or progress display.
  Supply its label; use `label: null` only when the content is genuinely unlabeled.
- **`artwork`**: standalone artwork that does not belong beside an entity name.
- **`details`**: optional labeled content below the main fields, for relationships
  or other supporting information rather than extra main-grid columns.

## Compose the row

`DataRow` owns the dark shell, small padding and field gaps, centered main fields,
identity alignment and compact label/value typography. Use its field composition,
not per-caller shell styling, header placement or alignment overrides. The
[component and its types](../../components/base/DataRow.tsx) are the authoritative API.

The caller owns field order and `columns`, including responsive tracks. Prefer
`minmax(0, …fr)` tracks: percentage widths totaling 100% leave no room for the
component's gaps. Allow descriptions and rich content to wrap. Stack rows in a
parent `Box` with `gap="small"`; collection columns need not become page-width rows.

Use stable entity keys for rows and semantic keys for fields and details, including
conditional fields. Set `opacity` from the feature's existing locked, empty or
unleveled state rather than changing its meaning. Keep filtering, ordering,
formatters, state alternatives, links, tooltips and controls caller-owned. Group
related resources inside one rich field instead of flattening each nested resource
into a top-level row; preserve their interactions and affordability colors.

## Example: Atom fields

This pattern uses the Atom caller's fields and formatters, with imports relative to
its component directory. `atom.index` is the entity identity, not the map position.

```tsx
import { Box } from "grommet";
import type { Atom } from "../../../data/domain/world-3/construction/atomCollider";
import { nFormatter } from "../../../data/utility";
import DataRow from "../../base/DataRow";
import IconImage from "../../base/IconImage";

function AtomRows({ atoms }: { atoms: readonly Atom[] }) {
    return (
        <Box gap="small">
            {atoms.map(atom => (
                <DataRow
                    key={atom.index}
                    opacity={atom.level > 0 ? 1 : 0.6}
                    columns={["minmax(0, 25fr)", "minmax(0, 35fr)", "minmax(0, 10fr)", "minmax(0, 10fr)", "minmax(0, 20fr)"]}
                    fields={[
                        { key: "identity", kind: "identity", name: atom.data.name, artwork: <IconImage data={atom.getImageData()} scale={0.5} /> },
                        { key: "bonus", kind: "text", label: "Bonus", value: atom.getBonusText(), role: "description" },
                        { key: "level", kind: "text", label: "Level", value: `${atom.level} / ${atom.getMaxLevel()}` },
                        atom.level === 0
                            ? { key: "unlock", kind: "text", label: "Unlock Cost", value: nFormatter(atom.getCostToUnlock()) }
                            : { key: "next", kind: "text", label: "Next level cost", value: nFormatter(atom.getCost()) },
                        { key: "max", kind: "text", label: "Cost to max", value: nFormatter(atom.getCostToMaxLevel()) },
                    ]}
                />
            ))}
        </Box>
    );
}
```

See the [Atom caller](../../components/world-3/construction/atomCollider.tsx) for the
surrounding filter and particle summary.
