import { Box, Text } from "grommet"
import { useEffect } from "react";
import { CategoryData, CategoryType, TitleMap } from "../../data/domain/leaderboards/data"
import IconImage from "../base/IconImage";
import Position from "./position";

const Category = ({ data, currentUser }: { data: CategoryData, currentUser: string | undefined }) => {
    const sortedEntries = Array.from(Object.entries(data.Entries)).sort(([profile1, score1], [profile2, score2]) => score1 > score2 ? -1 : 1)
    const topTen = sortedEntries.slice(0, 10);
    const categoryInfo = TitleMap.get(data.Category) ?? { title: data.Category, type: CategoryType.Number, icon: "icons-3636 icons-GemP16_x1", imageData: { location: 'GemP16', height: 36, width: 36}};

    let userEntry: [string, any] | undefined = undefined;
    let userPosition: number | undefined = undefined;
    if (currentUser) {
        userEntry = sortedEntries.find(([profile, score]) => profile == currentUser);
        userPosition = sortedEntries.findIndex(([profile, score]) => profile == currentUser);
    }
    
    return (
        <Box margin={{ bottom: 'large' }} gap="small">
            <Box direction="row" align="center" gap="small">
                <Box width={{ max: '32px', min: '32px' }} height={{max: '32px', min: '32px'}}>
                    { categoryInfo.imageData != undefined && <IconImage data={categoryInfo.imageData} /> }
                    { categoryInfo.imageData == undefined && categoryInfo.icon && <Box className={categoryInfo.icon} />}
                </Box>
                <Text size="16px" style={{ fontWeight: 600 }}>{categoryInfo.title}</Text>
            </Box>
            <Box gap="xsmall">
                {
                    topTen.map(([profile, score], index) => (
                        <Position key={index} position={index + 1} profile={profile} value={score} type={categoryInfo.type} background={userPosition != undefined && index == userPosition ? "brand" : "blue-1"} />
                    ))
                }
                {
                    userEntry && userPosition != undefined && userPosition > 9 && <Position key={"user"} position={userPosition + 1} profile={userEntry[0]} value={userEntry[1]} type={categoryInfo.type} background="brand" />
                }
            </Box>
        </Box>
    )
}

export default Category