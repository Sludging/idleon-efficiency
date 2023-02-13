import { Box, CheckBox, Grid, Heading, ResponsiveContext, Text } from "grommet";
import { useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "../../../data/appContext";
import { AtomCollider } from "../../../data/domain/atomCollider";
import { Building } from "../../../data/domain/buildings";
import { Construction } from "../../../data/domain/construction";
import { Item } from "../../../data/domain/items";
import { Storage } from "../../../data/domain/storage";
import { nFormatter } from "../../../data/utility";
import IconImage from "../../base/IconImage";
import ShadowBox from "../../base/ShadowBox";
import TextAndLabel, { ComponentAndLabel } from "../../base/TextAndLabel";

export function AtomColliderDisplay() {
    const [atomCollider, setAtomCollider] = useState<AtomCollider>();
    const [hideMaxed, setHideMaxed] = useState(true);
    const appContext = useContext(AppContext);

    useEffect(() => {
        if (appContext) {
            const theData = appContext.data.getData();
            setAtomCollider(theData.get("collider"));
        }
    }, [appContext]);

    const atomsToShow = useMemo(() => {
        if (!atomCollider) {
            return [];
        }

        if (hideMaxed) {
            return atomCollider.atoms.filter(atom => atom.level != atom.getMaxLevel());
        }

        return atomCollider.atoms;
    }, [atomCollider, hideMaxed])

    if (!atomCollider || atomCollider.atoms.filter(atom => atom.level > 0).length == 0) {
        return (
            <Box align="center" pad="medium">
                <Heading level='3'>Come back when you unlocked this!</Heading>
            </Box>
        )
    }
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
                            <Grid columns={["10%", "15%", "35%", "10%", "10%", "10%"]} gap="small" align="start">
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