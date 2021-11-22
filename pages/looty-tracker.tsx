import {
    Box,
    Text,
    Grid,
    Heading,
    CheckBox
} from 'grommet'
import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../data/appContext'
import { allItems, filteredLootyItems } from '../data/domain/items'


function LootyTracker() {
    const [availableItems, setAvailableItems] = useState<string[]>([]);
    const [missing, setMissing] = useState<string[]>([]);
    const [lootyInfo, setLootyInfo] = useState<string[]>([]);
    const [onlyMissing, setOnlyMissing] = useState<boolean>(false);
    const idleonData = useContext(AppContext);

    useEffect(() => {
        const lootyData = idleonData.getData().get("lootyData") as string[];
        // filter out any item that isn't a real item, and mark that as the looted items.
        if (lootyData) {
            setLootyInfo(lootyData.filter(x => Object.keys(allItems).findIndex(y => y == x) >= 0));
        }

        // Only keep actually lootable items.
        let itemsToShow = Object.keys(allItems).filter(x => x.indexOf('Card') < 0 && x.indexOf('Gem') < 0 && filteredLootyItems.findIndex(y => y == x) == -1)
        setAvailableItems(itemsToShow);

        // filter found
        const missingItems = itemsToShow.filter(x => lootyInfo.findIndex(y => y == x) == -1)
        setMissing(missingItems);
    }, [idleonData, allItems]);
    return (
        <Box gap="small">
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Looty Tracker</Heading>
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>THIS IS VERY INACCURATE AT THE MOMENT - Actively worked on to make it better!</Heading>
            <Box direction="row" gap="medium">
                <Text>Total Items = {availableItems.length}</Text>
                <Text>Already looted = {lootyInfo.length}</Text>
                <Text>Missing = {missing.length}</Text>
            </Box>
            <Box>
                <CheckBox
                    checked={onlyMissing}
                    label="Show only missing"
                    onChange={(event) => setOnlyMissing(event.target.checked)}
                />
            </Box>
            <Box pad="small">
                {lootyInfo &&
                    <Grid columns={{ size: "36px" }} gap="small">
                        {
                            !onlyMissing && availableItems.map((item, index) => (
                                <Box title={Object.entries(allItems).find(([rawName, _]) => rawName == item)?.[1]} style={{ width: "36px", height: "36px", backgroundPosition: "0 calc(var(--row) * -36px)", opacity: lootyInfo.find(x => x == item) != undefined ? 1 : 0.5 }} key={index} className={`icons icons-${item}_x1`} />
                            ))
                        }
                        {
                            onlyMissing && missing.map((item, index) => (
                                <Box title={Object.entries(allItems).find(([rawName, _]) => rawName == item)?.[1]} style={{ width: "36px", height: "36px", backgroundPosition: "0 calc(var(--row) * -36px)" }} key={index} className={`icons icons-${item}_x1`} />
                            ))
                        }
                    </Grid>
                }
            </Box>
        </Box>
    )
}

export default LootyTracker;