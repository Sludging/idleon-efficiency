import { Box, Grid, Text } from 'grommet';
import DataRow from '../../base/DataRow';
import IconImage from '../../base/IconImage';
import ShadowBox from '../../base/ShadowBox';
import TextAndLabel from '../../base/TextAndLabel';
import TipDisplay from '../../base/TipDisplay';
import type { Player } from '../../../data/domain/player';
import { SkillsIndex } from '../../../data/domain/SkillsIndex';
import type { Chapter, ChapterBonus, Spelunking } from '../../../data/domain/world-7/spelunking';
import { commaNotation, notateNumber, toTime } from '../../../data/utility';

interface SpelunkingPart2Props {
    spelunking: Spelunking;
    players: Player[];
}

function earnedEffect(bonus: ChapterBonus): string {
    const value = bonus.getBonus().toFixed(2);
    return bonus.data.bonus.includes('{')
        ? bonus.data.bonus.replace('{', value)
        : `${value}${bonus.data.bonus}`;
}

function ChapterCard({ chapter, players }: { chapter: Chapter; players: Player[] }) {
    const inventoryEntries = players.flatMap(player =>
        chapter.playerPageStacks[player.playerID].map((stack, stackIndex) => ({ player, stack, stackIndex }))
    );

    return (
        <ShadowBox background="dark-1" pad="medium" gap="small" data-spelunking-chapter={chapter.index}>
            <Box direction="row" gap="small" align="center">
                <TipDisplay heading={chapter.pageItem.displayName} maxWidth="420px" body={
                    <Text color="dark-1" size="small">{chapter.pageItem.description.replace(/\s*@\s*/g, ' ').trim()}</Text>
                }>
                    <Box aria-label={`${chapter.pageItem.displayName} description`} data-page-description={chapter.index}>
                        <IconImage data={chapter.pageItem.getImageData()} scale={1} />
                    </Box>
                </TipDisplay>
                <Text weight={500}>{chapter.pageItem.displayName}</Text>
            </Box>
            <Text size="small">{chapter.gatheringSource.details.Name}</Text>
            <Grid columns={['minmax(0, 1fr)', '70px', '150px']} gap="small">
                <Text size="xsmall" color="accent-2">Earned bonus</Text>
                <Text size="xsmall" color="accent-2">Level</Text>
                <Text size="xsmall" color="accent-2">Minimum pages per stack</Text>
            </Grid>
            {chapter.bonuses.map(bonus => (
                <Grid key={bonus.index} columns={['minmax(0, 1fr)', '70px', '150px']} gap="small" align="center" data-spelunking-bonus={bonus.index}>
                    <Box gap="xxsmall">
                        {bonus.level > 0 ? <Text size="small">{earnedEffect(bonus)}</Text> : <>
                            <Text size="small" weight={500}>Not earned</Text>
                            <Text size="xsmall" color="accent-2">{bonus.data.bonus.replace(/^[+]?\{[%]?\s*/, '').replace(/^x\s*/, '')}</Text>
                        </>}
                    </Box>
                    <Text size="small">{commaNotation(bonus.level)}</Text>
                    <Text size="small">{commaNotation(bonus.data.requiredPages)}</Text>
                </Grid>
            ))}
            <Box border={{ side: 'top', color: 'grey-1' }} pad={{ top: 'small' }} gap="small">
                <Box gap="xxsmall">
                    <Text size="xsmall" color="accent-2">Storage</Text>
                    {chapter.chestPageStacks.length === 0
                        ? <Text size="small">No pages in storage</Text>
                        : chapter.chestPageStacks.map((stack, index) => (
                            <Text key={index} size="small" data-storage-stack>{commaNotation(stack.count)} pages</Text>
                        ))}
                </Box>
                <Box gap="xxsmall">
                    <Text size="xsmall" color="accent-2">Character inventory</Text>
                    {inventoryEntries.length === 0
                        ? <Text size="small">No pages in character inventories</Text>
                        : inventoryEntries.map(({ player, stack, stackIndex }) => (
                            <Text key={`${player.playerID}-${stackIndex}`} size="small" data-inventory-stack>
                                {player.playerName}: {commaNotation(stack.count)} pages
                            </Text>
                        ))}
                </Box>
            </Box>
        </ShadowBox>
    );
}

export function SpelunkingJournal({ spelunking, players }: SpelunkingPart2Props) {
    return (
        <Box gap="medium">
            <ShadowBox background="dark-1" pad="medium" gap="small">
                <Box direction="row" gap="medium" align="center" justify="between">
                    <Box gap="xxsmall">
                        <Text weight={500}>Daily page reads</Text>
                        <Text size="small" color="accent-2">Account-wide · Saved daily period</Text>
                    </Box>
                    <Box direction="row" gap="large">
                        <TextAndLabel label="Remaining" text={commaNotation(spelunking.dailyReadsRemaining)} textSize="medium" />
                        <TextAndLabel label="Used" text={commaNotation(spelunking.dailyReadsUsed)} textSize="medium" />
                        <TextAndLabel label="Limit" text={commaNotation(spelunking.dailyReadLimit)} textSize="medium" />
                    </Box>
                </Box>
            </ShadowBox>
            <Text size="small">Read pages from one character inventory stack. Storage pages must be moved first.</Text>
            <Grid columns={['minmax(0, 1fr)', 'minmax(0, 1fr)']} gap="medium">
                {spelunking.chapters.map(chapter => <ChapterCard key={chapter.index} chapter={chapter} players={players} />)}
            </Grid>
        </Box>
    );
}

export function SpelunkingCharacters({ spelunking, players }: SpelunkingPart2Props) {
    return (
        <Box gap="small">
            <Text size="small" margin={{ bottom: 'small' }}>Estimate uses saved stamina, unchanged recharge, and no spending. It is not a live timer.</Text>
            {players.map(player => {
                const skill = player.skills.get(SkillsIndex.Spelunking)!;
                const stamina = spelunking.stamina.find(entry => entry.playerID === player.playerID)!;
                const refillHours = stamina.getHoursUntilFull(spelunking.hourlyRecharge);

                return (
                    <Box key={player.playerID} data-spelunking-player={player.playerID}>
                        <DataRow
                            columns={['minmax(0, 1.5fr)', 'minmax(0, 0.8fr)', 'minmax(0, 1.2fr)', 'minmax(0, 0.8fr)', 'minmax(0, 0.8fr)', 'minmax(0, 1fr)', 'minmax(0, 1.2fr)']}
                            fields={[
                                {
                                    key: 'character',
                                    kind: 'identity',
                                    name: player.playerName,
                                    artwork: <IconImage data={player.getClassImageData()} scale={0.8} />,
                                },
                                { key: 'level', kind: 'text', label: 'Spelunking level', value: commaNotation(skill.level) },
                                {
                                    key: 'exp',
                                    kind: 'content',
                                    label: 'EXP current-to-next-level',
                                    content: <TipDisplay heading="EXP current-to-next-level" body={
                                        <Text color="dark-1" size="small" data-spelunking-exp-exact>{commaNotation(skill.currentXP)} / {commaNotation(skill.xpReq)} EXP</Text>
                                    }>
                                        <Text size="small" data-spelunking-exp>{notateNumber(skill.currentXP)} / {notateNumber(skill.xpReq)}</Text>
                                    </TipDisplay>,
                                },
                                { key: 'current', kind: 'text', label: 'Saved stamina', value: commaNotation(stamina.current) },
                                { key: 'maximum', kind: 'text', label: 'Maximum stamina', value: commaNotation(stamina.maximum) },
                                { key: 'recharge', kind: 'text', label: 'Recharge per hour', value: `${spelunking.hourlyRecharge.toFixed(2)} stamina/h` },
                                { key: 'refill', kind: 'text', label: 'Estimated refill', value: refillHours === 0 ? 'Full at saved snapshot' : toTime(refillHours * 3600).trim() },
                            ]}
                            details={stamina.current > stamina.maximum ? [
                                { key: 'above-cap', label: null, content: <Text size="small">Saved amount exceeds maximum</Text> },
                            ] : undefined}
                        />
                    </Box>
                );
            })}
        </Box>
    );
}
