import { Box, Grid, Meter, Text } from 'grommet';
import { CharacterBox } from '../../base/CharacterBox';
import IconImage from '../../base/IconImage';
import ShadowBox from '../../base/ShadowBox';
import TextAndLabel from '../../base/TextAndLabel';
import TipDisplay from '../../base/TipDisplay';
import type { Player } from '../../../data/domain/player';
import { SkillsIndex } from '../../../data/domain/SkillsIndex';
import { Skilling } from '../../../data/domain/skilling';
import type { Chapter, ChapterBonus, Spelunking } from '../../../data/domain/world-7/spelunking';
import { commaNotation, notateNumber, toTime } from '../../../data/utility';

interface SpelunkingPart2Props {
    spelunking: Spelunking;
    players: Player[];
}

function earnedEffect(bonus: ChapterBonus): string {
    const effect = bonus.level === 0 ? (bonus.data.func === 'decayMulti' ? 1 : 0) : bonus.getBonus();
    const value = effect.toFixed(2);
    return bonus.data.bonus.includes('{')
        ? bonus.data.bonus.replace('{', value)
        : `${value}${bonus.data.bonus}`;
}

export function SpelunkingSummary({ spelunking, players }: SpelunkingPart2Props) {
    const allFullHours = spelunking.getHoursUntilAllFull();

    return (
        <Box direction="row" gap="small" data-spelunking-summary>
            <ShadowBox background="dark-1" pad="small" gap="xxsmall" data-spelunking-summary-card="reads">
                <Text size="small" weight={500}>Daily page reads</Text>
                <TextAndLabel
                    label="Remaining / limit"
                    text={`${commaNotation(spelunking.dailyReadsRemaining)} / ${commaNotation(spelunking.dailyReadLimit)}`}
                    textSize="16px"
                    labelSize="12px"
                    tooltip={<Text color="dark-1" size="small" data-spelunking-read-detail>Account-wide allowance in the saved daily period.</Text>}
                />
            </ShadowBox>
            <ShadowBox background="dark-1" pad="small" gap="xxsmall" data-spelunking-summary-card="stamina">
                <Text size="small" weight={500}>Stamina</Text>
                <Box direction="row" gap="medium" align="start">
                    <TextAndLabel label="Recharge" text={`${spelunking.hourlyRecharge.toFixed(2)} stamina/h`} textSize="16px" labelSize="12px" />
                    <TipDisplay heading="Time to refill the team" maxWidth="520px" body={
                        <Box gap="xsmall" data-spelunking-refill-detail>
                            <Text color="dark-1" size="small">Uses saved stamina with unchanged recharge and no spending. All characters recharge together. This is not a live timer.</Text>
                            {players.map(player => {
                                const stamina = spelunking.stamina.find(entry => entry.playerID === player.playerID)!;
                                const hours = stamina.getHoursUntilFull(spelunking.hourlyRecharge);

                                return (
                                    <Box key={player.playerID} direction="row" justify="between" gap="small" data-spelunking-refill-player={player.playerID} data-spelunking-refill-hours={hours}>
                                        <Text color="dark-1" size="small">{player.playerName}</Text>
                                        <Text color="dark-1" size="small">{hours === 0 ? 'Full' : toTime(hours * 3600).trim()}</Text>
                                    </Box>
                                );
                            })}
                        </Box>
                    }>
                        <Box gap="xxsmall" data-spelunking-refill-trigger>
                            <Text size="12px" color="accent-2">Team refill</Text>
                            <Text size="16px" data-spelunking-all-full data-spelunking-all-full-hours={allFullHours}>
                                {allFullHours === 0 ? 'Full' : toTime(allFullHours * 3600).trim()}
                            </Text>
                        </Box>
                    </TipDisplay>
                </Box>
            </ShadowBox>
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
        <Box gap="xxsmall" pad={{ vertical: 'xsmall' }} border={{ side: 'bottom', color: 'grey-1' }} data-spelunking-bonus={bonus.index} style={{ opacity: bonus.level === 0 ? 0.65 : 1 }}>
            <Grid columns={['minmax(0, 1fr)', '48px', '104px']} gap="small" align="center" data-bonus-main-row>
                <Text size="13px" data-bonus-effect>{earnedEffect(bonus)}</Text>
                <Text size="13px" textAlign="end" data-bonus-level>{commaNotation(bonus.level)}</Text>
                <TipDisplay heading="Minimum pages per stack" body={
                    <Text color="dark-1" size="small" data-spelunking-requirement-detail={`${chapterIndex}-${bonus.index}`}>{commaNotation(bonus.data.requiredPages)} pages per stack</Text>
                }>
                    <Text size="13px" textAlign="end" data-spelunking-requirement={`${chapterIndex}-${bonus.index}`}>{notateNumber(bonus.data.requiredPages)}</Text>
                </TipDisplay>
            </Grid>
            {limit !== undefined && <Grid columns={['minmax(0, 1fr)', '48px', '104px']} gap="small">
                <Box gap="xxsmall" data-spelunking-progress={`${chapterIndex}-${bonus.index}`} data-spelunking-progress-value={progress} data-spelunking-effect-limit={limit}>
                    <Box direction="row" justify="between" gap="xsmall">
                        <Text size="12px" color="accent-2">{progressText}</Text>
                        <Text size="12px" color="accent-2">Soft cap {limitText}</Text>
                    </Box>
                    <Meter aria-label={`Chapter ${chapterIndex + 1} bonus ${bonus.index + 1} earned progress`} values={[{ value: Math.min(99.9, percentage!), color: 'brand' }]} max={100} thickness="6px" size="full" background="grey-1" round />
                </Box>
            </Grid>}
        </Box>
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
            <Grid columns={['minmax(0, 1fr)', '48px', '104px']} gap="small" align="end">
                <Text size="12px" color="accent-2">Earned bonus</Text>
                <Text size="12px" color="accent-2" textAlign="end">Level</Text>
                <Text size="12px" color="accent-2" textAlign="end">Min. pages / stack</Text>
            </Grid>
            {chapter.bonuses.map(bonus => <ChapterBonusRow key={bonus.index} chapterIndex={chapter.index} bonus={bonus} />)}
        </ShadowBox>
    );
}

export function SpelunkingJournal({ spelunking, players }: SpelunkingPart2Props) {
    return (
        <Grid columns={['minmax(0, 1fr)', 'minmax(0, 1fr)']} gap="small">
            {spelunking.chapters.map(chapter => <ChapterCard key={chapter.index} chapter={chapter} players={players} />)}
        </Grid>
    );
}

export function SpelunkingCharacters({ spelunking, players }: SpelunkingPart2Props) {
    return (
        <Box gap="xsmall" data-spelunking-character-grid>
            <Text size="12px">Characters</Text>
            <Grid columns={{ size: 'small', count: 'fill' }} gap="xsmall">
                {players.map(player => {
                    const skill = player.skills.get(SkillsIndex.Spelunking)!;
                    const stamina = spelunking.stamina.find(entry => entry.playerID === player.playerID)!;

                    return (
                        <Box key={player.playerID} data-spelunking-player={player.playerID}>
                            <CharacterBox player={player} borderColor="grey-1" textColor="text">
                                <Box direction="row" justify="between" align="center" gap="xxsmall" margin={{ top: 'xxsmall', bottom: 'xxsmall' }}>
                                    <TipDisplay heading="Spelunking level" body={<Text color="dark-1" size="small" data-skill-detail={player.playerID}>{player.playerName}: Level {commaNotation(skill.level)}</Text>}>
                                        <Box direction="row" align="center" gap="xxsmall" data-skill-trigger={player.playerID}>
                                            <IconImage data={Skilling.getSkillImageData(SkillsIndex.Spelunking)} scale={0.4} />
                                            <Text size="11px" style={{ whiteSpace: 'nowrap' }}>Lv {commaNotation(skill.level)}</Text>
                                        </Box>
                                    </TipDisplay>
                                    <TipDisplay heading="Saved stamina / maximum" body={
                                        <Box gap="xsmall" data-spelunking-stamina-detail={player.playerID}>
                                            <Text color="dark-1" size="small">{commaNotation(stamina.current)} / {commaNotation(stamina.maximum)} stamina</Text>
                                            {stamina.current > stamina.maximum && <Text color="dark-1" size="small">Saved amount exceeds maximum.</Text>}
                                        </Box>
                                    }>
                                        <Box direction="row" align="center" gap="xxsmall" data-stamina-trigger={player.playerID}>
                                            <IconImage data={stamina.getImageData()} scale={0.4} />
                                            <Text size="11px" style={{ whiteSpace: 'nowrap' }} data-spelunking-stamina={player.playerID}>{commaNotation(stamina.current)} / {commaNotation(stamina.maximum)}</Text>
                                        </Box>
                                    </TipDisplay>
                                </Box>
                                <TipDisplay heading="Spelunking EXP" body={
                                    <Text color="dark-1" size="small" data-spelunking-exp-exact={player.playerID}>{commaNotation(skill.currentXP)} / {commaNotation(skill.xpReq)} EXP</Text>
                                }>
                                    <Box data-spelunking-exp={player.playerID} data-exp-current={skill.currentXP} data-exp-required={skill.xpReq}>
                                        <Meter aria-label={`${player.playerName} Spelunking EXP`} values={[{ value: skill.currentXP / skill.xpReq * 100, color: 'brand' }]} max={100} thickness="4px" size="full" background="grey-1" round />
                                    </Box>
                                </TipDisplay>
                            </CharacterBox>
                        </Box>
                    );
                })}
            </Grid>
        </Box>
    );
}
