import {
    Box,
    Text,
} from 'grommet'
import DataRow from "../../base/DataRow";
import IconImage from '../../base/IconImage';
import { Prayer } from '../../../data/domain/world-3/prayers';
import { GroupByFunction, nFormatter } from '../../../data/utility';
import { PrayerBase } from '../../../data/domain/data/PrayerRepo';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';
import { useShallow } from 'zustand/react/shallow';

export function PrayerDisplay() {
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

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
                                    <DataRow
                                        key={`prayer_${index}`}
                                        opacity={prayer.level == 0 ? 0.5 : 1}
                                        columns={["minmax(0, 1.6fr)", "minmax(0, 0.7fr)", "minmax(0, 1.2fr)", "minmax(0, 1.7fr)", "minmax(0, 0.8fr)", "minmax(0, 0.8fr)"]}
                                        fields={[
                                            { key: "identity", kind: "identity", name: prayer.data.name, artwork: <IconImage data={prayer.getImageData()} /> },
                                            { key: "level", kind: "text", label: "Level", value: `${prayer.level.toString()}/${prayer.data.maxLevel.toString()}` },
                                            { key: "bonus", kind: "text", label: "Bonus", value: prayer.getBonusText(), role: "description" },
                                            { key: "curse", kind: "text", label: "Curse", value: prayer.getCurseText(), role: "description" },
                                            ...(prayer.level == prayer.data.maxLevel ? [
                                                { key: "maxed", kind: "content" as const, label: null, content: <Text color="green-1" size="small">Maxed!</Text> },
                                            ] : []),
                                            ...(prayer.level == 0 ? [
                                                { key: "wave", kind: "text" as const, label: "Wave Req", value: prayer.data.unlockWave.toString() },
                                            ] : []),
                                            ...(prayer.level > 0 && prayer.level != prayer.data.maxLevel ? [
                                                { key: "next", kind: "text" as const, label: "Cost to next", color: costToNextLevel < amountInStorage ? 'green-1' : 'white', value: nFormatter(costToNextLevel, "Smaller") },
                                                { key: "max", kind: "text" as const, label: "Cost to max", color: costToMax < amountInStorage ? 'green-1' : 'white', value: nFormatter(costToMax, "Smaller") },
                                            ] : []),
                                        ]}
                                    />
                                )
                            })
                        }
                    </Box>
                ))
            }
        </Box>
    )

}