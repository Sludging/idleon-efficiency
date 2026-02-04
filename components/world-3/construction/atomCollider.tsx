import { Box, CheckBox, Grid, Text } from "grommet";
import { useMemo, useState } from "react";
import { AtomCollider } from "../../../data/domain/world-3/construction/atomCollider";
import { nFormatter } from "../../../data/utility";
import IconImage from "../../base/IconImage";
import ShadowBox from "../../base/ShadowBox";
import TextAndLabel, { ComponentAndLabel } from "../../base/TextAndLabel";
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
            {
                atomsToShow.map((atom, index) => {
                    return (
                        <ShadowBox style={{ opacity: atom.level > 0 ? 1 : 0.6 }} key={index} background="dark-1" pad="medium" direction="row" align="center" justify="between" margin={{ bottom: 'small' }}>
                            <Grid columns={["5%", "20%", "35%", "10%", "10%", "20%"]} gap="small" align="start" fill>
                                <IconImage data={atom.getImageData()} scale={0.5} />
                                <TextAndLabel labelSize="xsmall" textSize='small' text={atom.data.name} label="Name" />
                                <TextAndLabel labelSize="xsmall" textSize='xsmall' text={atom.getBonusText()} label="Bonus" />
                                <TextAndLabel labelSize="xsmall" textSize='small' text={`${atom.level} / ${atom.getMaxLevel()}`} label="Level" />
                                {atom.level == 0 && <TextAndLabel labelSize="xsmall" textSize='small' text={`${nFormatter(atom.getCostToUnlock())}`} label="Unlock Cost" />}
                                {atom.level > 0 && <TextAndLabel labelSize="xsmall" textSize='small' text={`${nFormatter(atom.getCost())}`} label="Next level cost" />}
                                <TextAndLabel labelSize="xsmall" textSize='small' text={`${nFormatter(atom.getCostToMaxLevel())}`} label="Cost to max" />
                            </Grid>
                        </ShadowBox>
                    )
                })
            }
        </Box>
    )

}