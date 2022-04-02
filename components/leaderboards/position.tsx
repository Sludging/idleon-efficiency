import { Anchor, Box, Stack, Text } from "grommet"
import { useState } from "react";
import { Dungeons } from "../../data/domain/dungeons";
import { CategoryType } from "../../data/domain/leaderboards/data";
import { getCoinsArray, nFormatter } from "../../data/utility";
import CoinsDisplay from "../coinsDisplay";
import Star from "./star";

const Position = ({ position, profile, value, type = CategoryType.Number, background = "blue-1" }: { position: number, profile: string, value: number, type: CategoryType, background?: string }) => {
    const [backgroundColor, setBackgroundColor] = useState<string>(background);
    const [starFill, setStarFill] = useState<string>("#283F70");
    const [positionColor, setPositionColor] = useState<string>("white");

    let dungeonRank = undefined;
    if (type == CategoryType.Dungeon) {
        dungeonRank = Dungeons.getDungeonRank(value);
    }

    const onMouseEnter = () => {
        setBackgroundColor("blue-2");
        setStarFill("#FFD300")
        setPositionColor("black")
    }

    const onMouseLeave = () => {
        setBackgroundColor(background);
        setStarFill("#283F70")
        setPositionColor("white")
    }

    return (
        <Box onMouseEnter={() => onMouseEnter()} onMouseLeave={() => onMouseLeave()} background={backgroundColor} round="10px" height="45px" justify="between" align="center" direction="row" pad={{ top: '8px', bottom: '8px', left: '8px', right: '16px' }}>
            <Box direction="row" align="center" gap="small">
                <Stack anchor="center" margin={{ top: '8px' }}>
                    <Star fill={starFill} />
                    <Box align="center" margin={{ top: '-5px' }}>
                        <Text color={positionColor} size="10px">{position}</Text>
                    </Box>
                </Stack>
                <Anchor weight="normal" color="#efefef" href={`https://${profile}.idleonefficiency.com`} target='_blank'>
                    <Text size="14px">{profile}</Text>
                </Anchor>
            </Box>
            {type == CategoryType.Money && <CoinsDisplay coinMap={getCoinsArray(value)} maxCoins={3} regularRow={true} />}
            {(type == CategoryType.Number || type == CategoryType.Percent) && <Text>{nFormatter(value, "Smaller")}{type == CategoryType.Percent ? "%" : ""}</Text>}
            {
                dungeonRank &&
                <Box direction="row" gap="small">
                    <Text>{nFormatter(value, "Whole")}</Text>
                    <Box title={dungeonRank.toString()} width={{ max: '20px' }} >
                        <Box className={Dungeons.getDungeonRankClass(dungeonRank)} />
                    </Box>
                </Box>
            }
        </Box>
    )
}

export default Position