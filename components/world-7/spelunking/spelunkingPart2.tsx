import { Box, Grid, Text } from 'grommet';
import { CharacterBox } from '../../base/CharacterBox';
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

function SpelunkingSummary({ spelunking, players }: SpelunkingPart2Props) {
    const allFullHours = spelunking.getHoursUntilAllFull();

    return (
        <Box gap="small" data-spelunking-summary>
            <Grid columns={['minmax(0, 1fr)', 'minmax(0, 1fr)', 'minmax(0, 1fr)']} gap="small">
                <ShadowBox background="dark-1" pad="small" gap="xxsmall" data-spelunking-summary-card="reads">
                    <Text size="small" weight={500}>Daily page reads</Text>
                    <TextAndLabel
                        label="Remaining / limit"
                        text={`${commaNotation(spelunking.dailyReadsRemaining)} / ${commaNotation(spelunking.dailyReadLimit)}`}
                        textSize="16px"
                        labelSize="12px"
                        tooltip={<Text color="dark-1" size="small" data-spelunking-read-detail>Account-wide · Saved daily period</Text>}
                    />
                </ShadowBox>
                <ShadowBox background="dark-1" pad="small" gap="xxsmall" data-spelunking-summary-card="recharge">
                    <Text size="small" weight={500}>Recharge</Text>
                    <TextAndLabel
                        label="Shared rate"
                        text={`${spelunking.hourlyRecharge.toFixed(2)} stamina/h`}
                        textSize="16px"
                        labelSize="12px"
                    />
                </ShadowBox>
                <ShadowBox background="dark-1" pad="small" gap="xxsmall" data-spelunking-summary-card="refill">
                    <Text size="small" weight={500}>All full in</Text>
                    <TipDisplay heading="Individual refill estimates" maxWidth="520px" body={
                        <Box gap="xsmall" data-spelunking-refill-detail>
                            <Text color="dark-1" size="small">Estimates assume concurrent recharge. This is not a live timer.</Text>
                            {players.map(player => {
                                const stamina = spelunking.stamina.find(entry => entry.playerID === player.playerID)!;
                                const hours = stamina.getHoursUntilFull(spelunking.hourlyRecharge);

                                return (
                                    <Box key={player.playerID} direction="row" justify="between" gap="small" data-spelunking-refill-player={player.playerID} data-spelunking-refill-hours={hours}>
                                        <Text color="dark-1" size="small">{player.playerName}</Text>
                                        <Text color="dark-1" size="small">{hours === 0 ? 'Full at saved snapshot' : toTime(hours * 3600).trim()}</Text>
                                    </Box>
                                );
                            })}
                        </Box>
                    }>
                        <Box gap="xxsmall">
                            <Text size="12px" color="accent-2">Saved refill estimate</Text>
                            <Text size="16px" data-spelunking-all-full data-spelunking-all-full-hours={allFullHours}>
                                {allFullHours === 0 ? 'Full at saved snapshot' : toTime(allFullHours * 3600).trim()}
                            </Text>
                        </Box>
                    </TipDisplay>
                </ShadowBox>
            </Grid>
            <Text size="12px" color="accent-2">Saved snapshot · Assumes unchanged recharge and no spending.</Text>
        </Box>
    );
}

function ChapterBonusRow({ chapterIndex, bonus }: { chapterIndex: number; bonus: ChapterBonus }) {
    const limit = bonus.getEffectLimit();
    const progress = bonus.getProgressToEffectLimit();
    const percentage = progress === undefined ? undefined : progress * 100;
    const progressText = percentage === undefined ? undefined
        : Number(percentage.toFixed(1)) >= 100 ? '<100%' : `${percentage.toFixed(1)}%`;
    const limitText = limit === undefined ? undefined
        : `${bonus.data.bonus.startsWith('+') ? '+' : ''}${limit.toFixed(2)}${bonus.data.bonus.startsWith('x') ? 'x' : bonus.data.bonus.includes('%') ? '%' : ''}`;

    return (
        <Grid columns={['minmax(0, 1fr)', '42px', '82px']} gap="small" align="start" data-spelunking-bonus={bonus.index}>
            <Box gap="xxsmall">
                {bonus.level > 0 ? <Text size="13px">{earnedEffect(bonus)}</Text> : <>
                    <Text size="13px" weight={500}>Not earned</Text>
                    <Text size="13px" color="accent-2">{bonus.data.bonus.replace(/^[+]?\{[%]?\s*/, '').replace(/^x\s*/, '')}</Text>
                </>}
                {limit === undefined ? (
                    <Text size="12px" color="accent-2">No finite limit</Text>
                ) : (
                    <TipDisplay heading="Finite effect limit" maxWidth="360px" body={
                        <Box gap="xsmall" data-spelunking-limit-detail={`${chapterIndex}-${bonus.index}`}>
                            <Text color="dark-1" size="small">This asymptotic limit is approached, not reached. It is not a reachable hard cap.</Text>
                            <Text color="dark-1" size="small">The limit includes current Sailing artifact strength where applicable.</Text>
                            <Text color="dark-1" size="small">Progress shows the earned portion of this bonus, not the current effect divided by its limit.</Text>
                            {bonus.data.func === 'decayMulti' && (
                                <Text color="dark-1" size="small">Earned progress excludes the multiplier baseline.</Text>
                            )}
                        </Box>
                    }>
                        <Box gap="xxsmall" data-spelunking-progress={`${chapterIndex}-${bonus.index}`} data-spelunking-progress-value={progress} data-spelunking-effect-limit={limit}>
                            <Box direction="row" justify="between" gap="xsmall">
                                <Text size="12px" color="accent-2">{progressText}</Text>
                                <Text size="12px" color="accent-2">Limit {limitText}</Text>
                            </Box>
                            <Box height="4px" background="grey-1" overflow="hidden">
                                <Box height="4px" background="brand" flex={false} data-spelunking-progress-fill={`${chapterIndex}-${bonus.index}`} style={{ width: `${Math.min(99.9, percentage!)}%` }} />
                            </Box>
                        </Box>
                    </TipDisplay>
                )}
            </Box>
            <Text size="13px">{commaNotation(bonus.level)}</Text>
            <TipDisplay heading="Minimum pages per stack" body={
                <Text color="dark-1" size="small" data-spelunking-requirement-detail={`${chapterIndex}-${bonus.index}`}>{commaNotation(bonus.data.requiredPages)} pages per stack</Text>
            }>
                <Text size="13px" data-spelunking-requirement={`${chapterIndex}-${bonus.index}`}>{notateNumber(bonus.data.requiredPages)}</Text>
            </TipDisplay>
        </Grid>
    );
}

function ChapterCard({ chapter, players }: { chapter: Chapter; players: Player[] }) {
    const storageStacks = chapter.chestPageStacks.filter(stack => stack.count > 0);
    const inventories = players.map(player => ({
        player,
        stacks: chapter.playerPageStacks[player.playerID].filter(stack => stack.count > 0),
    })).filter(entry => entry.stacks.length > 0);
    const ownedPages = storageStacks.reduce((total, stack) => total + stack.count, 0)
        + inventories.reduce((total, inventory) => total + inventory.stacks.reduce((count, stack) => count + stack.count, 0), 0);
    const ownedPagesDisplay = (
        <Box align="end" gap="xxsmall" data-spelunking-page-total={chapter.index} data-spelunking-owned-count={ownedPages}>
            <Text size="12px" color="accent-2">Owned pages</Text>
            <Text size="13px">{notateNumber(ownedPages)}</Text>
        </Box>
    );

    return (
        <ShadowBox background="dark-1" pad="small" gap="small" data-spelunking-chapter={chapter.index}>
            <Box direction="row" align="center" justify="between" gap="small">
                <Box direction="row" align="center" gap="small" flex>
                    <TipDisplay heading={chapter.pageItem.displayName} maxWidth="420px" body={
                        <Text color="dark-1" size="small" data-spelunking-page-description-detail={chapter.index}>{chapter.pageItem.description.replace(/\s*@\s*/g, ' ').trim()}</Text>
                    }>
                        <Box aria-label={`${chapter.pageItem.displayName} description`} data-spelunking-page-description={chapter.index}>
                            <IconImage data={chapter.pageItem.getImageData()} scale={1} />
                        </Box>
                    </TipDisplay>
                    <Box gap="xxsmall">
                        <Text size="14px" weight={500}>{chapter.pageItem.displayName}</Text>
                        <Text size="12px" color="accent-2">{chapter.gatheringSource.details.Name}</Text>
                    </Box>
                </Box>
                {ownedPages > 0 ? (
                    <TipDisplay heading="Page locations" maxWidth="420px" body={
                        <Box gap="small" data-spelunking-location-detail={chapter.index}>
                            {storageStacks.length > 0 && (
                                <Box gap="xxsmall">
                                    <Text color="dark-1" size="small" weight={500}>Storage</Text>
                                    {storageStacks.map((stack, index) => (
                                        <Text key={index} color="dark-1" size="small" data-spelunking-storage-stack={index}>{commaNotation(stack.count)} pages</Text>
                                    ))}
                                </Box>
                            )}
                            {inventories.map(({ player, stacks }) => (
                                <Box key={player.playerID} gap="xxsmall" data-spelunking-location-player={player.playerID}>
                                    <Text color="dark-1" size="small" weight={500}>{player.playerName} inventory</Text>
                                    {stacks.map((stack, index) => (
                                        <Text key={index} color="dark-1" size="small" data-spelunking-inventory-stack={index}>{commaNotation(stack.count)} pages</Text>
                                    ))}
                                </Box>
                            ))}
                        </Box>
                    }>
                        {ownedPagesDisplay}
                    </TipDisplay>
                ) : ownedPagesDisplay}
            </Box>
            <Grid columns={['minmax(0, 1fr)', '42px', '82px']} gap="small" align="end">
                <Text size="12px" color="accent-2">Earned bonus</Text>
                <Text size="12px" color="accent-2">Level</Text>
                <Text size="12px" color="accent-2">Min. pages / stack</Text>
            </Grid>
            {chapter.bonuses.map(bonus => <ChapterBonusRow key={bonus.index} chapterIndex={chapter.index} bonus={bonus} />)}
        </ShadowBox>
    );
}

export function SpelunkingJournal({ spelunking, players }: SpelunkingPart2Props) {
    return (
        <Box gap="small">
            <SpelunkingSummary spelunking={spelunking} players={players} />
            <Box gap="small">
                <Text size="12px" color="accent-2">Finite limits are approached, not reached.</Text>
                <Grid columns={['minmax(0, 1fr)', 'minmax(0, 1fr)']} gap="small">
                    {spelunking.chapters.map(chapter => <ChapterCard key={chapter.index} chapter={chapter} players={players} />)}
                </Grid>
            </Box>
        </Box>
    );
}

export function SpelunkingCharacters({ spelunking, players }: SpelunkingPart2Props) {
    return (
        <Box gap="small">
            <SpelunkingSummary spelunking={spelunking} players={players} />
            <Grid columns={['minmax(0, 1fr)', 'minmax(0, 1fr)', 'minmax(0, 1fr)']} gap="small">
                {players.map(player => {
                    const skill = player.skills.get(SkillsIndex.Spelunking)!;
                    const stamina = spelunking.stamina.find(entry => entry.playerID === player.playerID)!;

                    return (
                        <Box key={player.playerID} data-spelunking-player={player.playerID}>
                            <CharacterBox player={player} borderColor="grey-1" textColor="text">
                                <Box margin={{ top: 'xsmall' }} gap="xsmall">
                                    <Text size="13px">Spelunking level {commaNotation(skill.level)}</Text>
                                    <Box direction="row" justify="between" gap="small">
                                        <Text size="12px" color="accent-2">EXP</Text>
                                        <TipDisplay heading="EXP current-to-next-level" body={
                                            <Text color="dark-1" size="small" data-spelunking-exp-exact={player.playerID}>
                                                {commaNotation(skill.currentXP)} / {commaNotation(skill.xpReq)} EXP
                                            </Text>
                                        }>
                                            <Text size="13px" data-spelunking-exp={player.playerID}>{notateNumber(skill.currentXP)} / {notateNumber(skill.xpReq)}</Text>
                                        </TipDisplay>
                                    </Box>
                                    <Box direction="row" justify="between" gap="small">
                                        <Text size="12px" color="accent-2">Stamina</Text>
                                        <Text size="13px" data-spelunking-stamina={player.playerID}>{commaNotation(stamina.current)} / {commaNotation(stamina.maximum)}</Text>
                                    </Box>
                                    {stamina.current > stamina.maximum && <Text size="12px">Saved amount exceeds maximum</Text>}
                                </Box>
                            </CharacterBox>
                        </Box>
                    );
                })}
            </Grid>
        </Box>
    );
}
