import {
    Box,
    Grid,
    Text,
} from 'grommet'
import TextAndLabel from '../../../components/base/TextAndLabel';
import ShadowBox from "../../base/ShadowBox";
import IconImage from '../../base/IconImage';
import { Prayer } from '../../../data/domain/prayers';
import { GroupByFunction, nFormatter } from '../../../data/utility';
import { PrayerBase } from '../../../data/domain/data/PrayerRepo';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';

export function PrayerDisplay() {
    const theData = useAppDataStore((state) => state.data.getData());

    const prayers = theData.get("prayers") as Prayer[];
    const storage = theData.get("storage") as Storage;

    return (
        <Box gap="medium">
            {
                Array.from(GroupByFunction(prayers.filter(prayer => prayer.data.name != "Some Prayer Name0"), function (base: PrayerBase) { return base.data.unlockZone }).entries()).map(([_, prayers], index) => (
                    <Box key={index} gap="small">
                        <Text>{prayers[0].data.unlockZone}</Text>
                        {
                            prayers.map((prayer, index) => {
                                const amountInStorage = storage?.amountInStorage(prayer.data.soul) ?? 0;
                                const costToNextLevel = prayer.getLevelCosts();
                                const costToMax = prayer.getCostToMax();
                                return (
                                    <ShadowBox key={`prayer_${index}`} background="dark-1" pad="medium" align="start" margin={{ right: 'large', bottom: 'small' }} style={{opacity: prayer.level == 0 ? 0.5 : 1}}>
                                        <Grid columns={{ count: 7, size: 'auto' }} gap={{ column: 'medium' }} fill>
                                            <IconImage data={prayer.getImageData()} />
                                            <TextAndLabel textSize='small' text={prayer.data.name} label="Name" />
                                            <TextAndLabel textSize='small' text={`${prayer.level.toString()}/${prayer.data.maxLevel.toString()}`} label="Level" />
                                            <TextAndLabel textSize='xsmall' text={prayer.getBonusText()} label="Bonus" />
                                            <TextAndLabel textSize='xsmall' text={prayer.getCurseText()} label="Curse" />
                                            {prayer.level == prayer.data.maxLevel && <Box align="center" justify="center"><Text color="green-1" size="large">Maxed!</Text></Box>}
                                            {prayer.level == 0 && <TextAndLabel textSize='small' text={prayer.data.unlockWave.toString()} label="Wave Req" />}
                                            {prayer.level > 0 && prayer.level != prayer.data.maxLevel && <TextAndLabel textSize='small' textColor={costToNextLevel < amountInStorage ? 'green-1' : 'white'} text={nFormatter(costToNextLevel, "Smaller")} label="Cost to next" />}
                                            {prayer.level > 0 && prayer.level != prayer.data.maxLevel && <TextAndLabel textSize='small' textColor={costToMax < amountInStorage ? 'green-1' : 'white'} text={nFormatter(costToMax, "Smaller")} label="Cost to max" />}

                                        </Grid>
                                    </ShadowBox>
                                )
                            })
                        }
                    </Box>
                ))
            }
        </Box>
    )

}