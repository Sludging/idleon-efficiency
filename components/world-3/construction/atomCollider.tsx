import { Box, CheckBox, Text } from "grommet";
import { useMemo, useState } from "react";
import { AtomCollider } from "../../../data/domain/world-3/construction/atomCollider";
import { nFormatter } from "../../../data/utility";
import IconImage from "../../base/IconImage";
import DataRow from "../../base/DataRow";
import { ComponentAndLabel } from "../../base/TextAndLabel";
import { useAppDataStore } from "../../../lib/providers/appDataStoreProvider";
import { useShallow } from "zustand/react/shallow";

export function AtomColliderDisplay() {
    const [hideMaxed, setHideMaxed] = useState(true);
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    const atomCollider = theData.get("collider") as AtomCollider;

    const atomsToShow = useMemo(() => {
        if (!atomCollider) {
            return [];
        }

        if (hideMaxed) {
            return atomCollider.atoms.filter(atom => atom.level != atom.getMaxLevel());
        }

        return atomCollider.atoms;
    }, [atomCollider, hideMaxed])

    return (
        <Box gap="medium" pad="large">
            <Box direction="row" gap="medium">
                <ComponentAndLabel
                    label="Particles"
                    component={
                        <Box direction="row" gap="small">
                            <IconImage data={AtomCollider.getParticleImageData()} scale={0.8} />
                            <Text>{nFormatter(atomCollider.particles)}</Text>
                        </Box>
                    }
                />
                <CheckBox
                    checked={hideMaxed}
                    label="Hide max level"
                    onChange={(event) => setHideMaxed(event.target.checked)}
                />
            </Box>
            <Box gap="small">
            {
                atomsToShow.map((atom, index) => {
                    return (
                        <DataRow
                            key={index}
                            opacity={atom.level > 0 ? 1 : 0.6}
                            columns={["minmax(0, 25fr)", "minmax(0, 35fr)", "minmax(0, 10fr)", "minmax(0, 10fr)", "minmax(0, 20fr)"]}
                            fields={[
                                { key: "identity", kind: "identity", name: atom.data.name, artwork: <IconImage data={atom.getImageData()} scale={0.5} /> },
                                { key: "bonus", kind: "text", label: "Bonus", value: atom.getBonusText(), role: "description" },
                                { key: "level", kind: "text", label: "Level", value: `${atom.level} / ${atom.getMaxLevel()}` },
                                ...(atom.level == 0 ? [{ key: "unlock", kind: "text" as const, label: "Unlock Cost", value: `${nFormatter(atom.getCostToUnlock())}` }] : []),
                                ...(atom.level > 0 ? [{ key: "next", kind: "text" as const, label: "Next level cost", value: `${nFormatter(atom.getCost())}` }] : []),
                                { key: "max", kind: "text", label: "Cost to max", value: `${nFormatter(atom.getCostToMaxLevel())}` },
                            ]}
                        />
                    )
                })
            }
            </Box>
        </Box>
    )

}