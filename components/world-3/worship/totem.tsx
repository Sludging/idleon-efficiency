import {
    Box,
    CheckBox,
    Grid,
    ResponsiveContext,
    Text,
    TextInput,
} from 'grommet'
import { useContext, useState } from 'react';
import { ComponentAndLabel } from '../../../components/base/TextAndLabel';
import { Worship as WorshipDomain } from '../../../data/domain/world-3/worship';
import ShadowBox from "../../base/ShadowBox";
import DataRow from "../../base/DataRow";
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';
import { useShallow } from 'zustand/react/shallow';
import TipDisplay from '../../base/TipDisplay';
import { CircleInformation } from 'grommet-icons';

export function TotemDisplay() {
    const [efficiency, setEfficiency] = useState<number>(0);
    const [effFoodBonus, setEffFoodBonus] = useState<number>(0);
    const [soooulsTalentBonus, setTalentBonus] = useState<number>(0);
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));
    const size = useContext(ResponsiveContext);

    const worship = theData.get("worship") as WorshipDomain;

    const [useDementiaSet, setUseDementiaSet] = useState(worship.dementiaSetAlwaysActive);

    return (
        <Box gap="medium">
            {
                worship.totalizer.unlockedBonuses.length > 0 &&
                <Box gap="medium" width="large">
                    <Text>Totalizer bonuses</Text>
                    <Grid columns={{ count: 'fit', size: 'small' }}>
                        {
                            worship.totalizer.unlockedBonuses.map((bonus, index) => (
                                <ShadowBox key={index} background="dark-1" pad="small" justify='center' margin={{ right: 'small', bottom: 'xsmall' }}>
                                    <Box direction='row'>
                                        <Text size='small'>{worship.totalizer.getBonusText(bonus)}</Text>
                                    </Box>
                                </ShadowBox>
                            ))
                        }
                    </Grid>
                </Box>
            }
            <Box width="auto" gap="medium" direction="row">
                <ComponentAndLabel
                    label="Worship Efficiency"
                    component={<Box direction="row" align="center" gap="large"><TextInput
                        value={efficiency}
                        onChange={event => setEfficiency(Number(event.target.value))}
                        type="number"
                    /></Box>}
                />
                <ComponentAndLabel
                    label="Worship food effect"
                    component={<Box direction="row" align="center" gap="large"><TextInput
                        value={effFoodBonus}
                        onChange={event => setEffFoodBonus(Number(event.target.value))}
                        type="number"
                    /></Box>}
                />
                <ComponentAndLabel
                    label="Sooouls bonus (wizard talent)"
                    component={<Box direction="row" align="center" gap="large"><TextInput
                        value={soooulsTalentBonus}
                        onChange={event => setTalentBonus(Number(event.target.value))}
                        type="number"
                    /></Box>}
                />
                <Box direction='row' gap='xsmall'>
                    <CheckBox
                        checked={useDementiaSet}
                        label="Dementia Set effect"
                        onChange={(event) => {
                            setUseDementiaSet(event.target.checked);
                        }}
                        disabled={worship.dementiaSetAlwaysActive}
                    />
                    <TipDisplay
                        heading="Dementia Set"
                        size='medium'
                        maxWidth='medium'
                        body={
                            <Box>
                                { worship.dementiaSetAlwaysActive ?
                                    <Text margin={{top:'xsmall'}} size='small'>You always get the set effect because of armor-set smithy</Text>
                                    :
                                    <Text margin={{top:'xsmall'}} size='small'>To avoid character checking for a global page, use this checkbox to consider it equipped or not</Text>
                                }
                            </Box>
                        }
                    >
                        <CircleInformation size="small" />
                    </TipDisplay>
                </Box>
            </Box>
            <Box>
                <Text size="xsmall">* Base XP is assuming multiplier of 1x.</Text>
                <Text size="xsmall">* You need a minimum efficiency of 60, 250, 1k, 3k, 8k, 25k, 250k and 2.5M on the respective totems to get bonus souls.</Text>
            </Box>
            <Grid columns={{ count: size == "small" ? 1 : 2, size: 'auto' }} gap="small">
                {
                    worship.totemInfo.map((totem, index) => (
                        <DataRow
                            key={index}
                            columns={["minmax(0, 24fr)", "minmax(0, 24fr)", "minmax(0, 14fr)", "minmax(0, 18fr)", "minmax(0, 20fr)"]}
                            fields={[
                                { key: "identity", kind: "identity", name: totem.name },
                                { key: "area", kind: "text", label: "Area", value: totem.map.data.map.name ?? "" },
                                { key: "wave", kind: "text", label: "Max Wave", value: totem.maxWave.toString() },
                                { key: "xp", kind: "text", label: "XP Per Charge", value: Math.floor(totem.getExpRewards() / totem.getChargeCost()).toString() },
                                { key: "souls", kind: "text", label: "Souls", value: totem.getSoulRewards(efficiency, effFoodBonus, soooulsTalentBonus, useDementiaSet).toString() },
                            ]}
                        />
                    ))
                }
            </Grid>
        </Box>
    )

}