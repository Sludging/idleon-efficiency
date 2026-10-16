import { useContext } from 'react';
import type { ReactNode } from 'react';
import { Box, Grid, Meter, Text, ThemeContext } from 'grommet';
import { normalizeColor } from 'grommet/utils';
import styled from 'styled-components';
import { CharacterBox } from '../../base/CharacterBox';
import IconImage from '../../base/IconImage';
import ShadowBox from '../../base/ShadowBox';
import TextAndLabel, { ComponentAndLabel } from '../../base/TextAndLabel';
import TipDisplay from '../../base/TipDisplay';
import type { Player } from '../../../data/domain/player';
import { SkillsIndex } from '../../../data/domain/SkillsIndex';
import { Skilling } from '../../../data/domain/skilling';
import type { Chapter, ChapterBonus, Spelunking } from '../../../data/domain/world-7/spelunking';
import { commaNotation, notateNumber, toTime } from '../../../data/utility';

const JournalTable = styled.table<{ $muted: string }>`
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
    font-variant-numeric: tabular-nums;
    font-size: 12px;
    line-height: 20px;
    th { font-weight: 400; color: ${({ $muted }) => $muted}; text-align: left; }
    th, td { padding: 0 6px 0 0; vertical-align: middle; }
    th:last-child, td:last-child { padding: 0; text-align: right; }
    th:nth-child(2), td:nth-child(2) { text-align: center; }
    col:nth-child(2) { width: 35px; }
    col:nth-child(3) { width: 94px; }
    col:nth-child(4) { width: 128px; }
    col:nth-child(5) { width: 80px; }
`;

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

export function SpelunkingSummary({ spelunking, players, children }: SpelunkingPart2Props & { children?: ReactNode }) {
    const allFullHours = spelunking.getHoursUntilAllFull();

    return (
        <Box direction="row" wrap gap="small" data-spelunking-summary>
            {children}
            <ShadowBox background="dark-1" pad="small" gap="xxsmall" data-spelunking-summary-card="reads">
                <Text size="small" weight={500}>Daily page reads</Text>
                <TextAndLabel
                    label="Remaining / limit"
                    text={`${commaNotation(spelunking.dailyReadsRemaining)} / ${commaNotation(spelunking.dailyReadLimit)}`}
                    textSize="16px"
                    labelSize="12px"
                />
            </ShadowBox>
            <ShadowBox background="dark-1" pad="small" gap="xxsmall" data-spelunking-summary-card="stamina">
                <Text size="small" weight={500}>Stamina</Text>
                <Box direction="row" gap="medium" align="start">
                    <ComponentAndLabel label="Recharge" labelSize="12px" component={
                        <TipDisplay heading="Stamina recharge" maxWidth="620px" size="small" body={
                            <Box gap="small" data-spelunking-recharge-detail style={{ maxHeight: '40vh', overflowY: 'auto', overflowWrap: 'anywhere' }}>
                                <Box gap="xxsmall">
                                    <Text size="xsmall" weight="bold">Base</Text>
                                    <Text size="xsmall" data-recharge-base>{notateNumber(spelunking.baseHourlyRecharge, 'Smaller')} stamina/h</Text>
                                </Box>
                                <Grid columns={['minmax(0, 1fr)', 'minmax(0, 1fr)']} gap="medium">
                                    <Box gap="xsmall">
                                        <Text size="xsmall" weight="bold">Additive bonuses</Text>
                                        <Box gap="xxsmall">
                                            {spelunking.additiveRechargeContributors.map((entry, index) => (
                                                <Text key={index} size="xsmall" data-recharge-additive={index} style={{ opacity: entry.value === 0 ? 0.6 : 1 }}>
                                                    {entry.source.replace(/_/g, ' ').replace(/\s*@\s*/g, ' ')}: {entry.value >= 0 ? '+' : ''}{notateNumber(entry.value, 'Smaller')}%
                                                </Text>
                                            ))}
                                        </Box>
                                    </Box>
                                    <Box gap="xsmall">
                                        <Text size="xsmall" weight="bold">Multipliers</Text>
                                        <Box gap="xxsmall">
                                            {spelunking.rechargeMultiplierContributors.map((entry, index) => (
                                                <Text key={index} size="xsmall" data-recharge-multiplier={index} style={{ opacity: entry.value === 1 ? 0.6 : 1 }}>
                                                    {entry.source.replace(/_/g, ' ').replace(/\s*@\s*/g, ' ').replace('}', notateNumber(entry.value, 'Smaller'))}: ×{notateNumber(entry.value, 'Smaller')}
                                                </Text>
                                            ))}
                                        </Box>
                                    </Box>
                                </Grid>
                            </Box>
                        }>
                            <Text size="16px" tabIndex={0} data-spelunking-recharge-trigger style={{ textDecoration: 'underline dotted', textUnderlineOffset: '4px', cursor: 'help' }}>{spelunking.hourlyRecharge.toFixed(2)} stamina/h</Text>
                        </TipDisplay>
                    } />
                    <TipDisplay heading="Time to refill the team" maxWidth="520px" body={
                        <Box gap="xsmall" data-spelunking-refill-detail>
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
        <tr data-spelunking-bonus={bonus.index} style={{ opacity: bonus.level === 0 ? 0.65 : 1 }}>
            <td data-bonus-effect>{earnedEffect(bonus)}</td>
            <td data-bonus-level>{commaNotation(bonus.level)}</td>
            <td>
                <Text size="12px" data-spelunking-requirement={`${chapterIndex}-${bonus.index}`}>{notateNumber(bonus.data.requiredPages)}</Text>
            </td>
            <td>
                {limit !== undefined && <Box direction="row" gap="xxsmall" align="center" data-spelunking-progress={`${chapterIndex}-${bonus.index}`} data-spelunking-progress-value={progress} data-spelunking-effect-limit={limit}>
                    <Box flex>
                        <Meter aria-label={`Chapter ${chapterIndex + 1} bonus ${bonus.index + 1} earned progress`} values={[{ value: Math.min(99.9, percentage!), color: 'brand' }]} max={100} thickness="6px" size="full" background="grey-1" round />
                    </Box>
                    <Text size="12px" style={{ width: '40px', flexShrink: 0, textAlign: 'right', whiteSpace: 'nowrap' }}>{progressText}</Text>
                </Box>}
            </td>
            <td>{limitText}</td>
        </tr>
    );
}

function ChapterCard({ chapter, players }: { chapter: Chapter; players: Player[] }) {
    const theme = useContext(ThemeContext);
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
            <JournalTable $muted={normalizeColor('accent-2', theme)} aria-label={`${chapter.pageItem.displayName} bonuses`}>
                <colgroup><col /><col /><col /><col /><col /></colgroup>
                <thead>
                    <tr><th scope="col">Earned bonus</th><th scope="col">Level</th><th scope="col">Min. pages</th><th scope="col">Progress</th><th scope="col">Soft cap</th></tr>
                </thead>
                <tbody>{chapter.bonuses.map(bonus => <ChapterBonusRow key={bonus.index} chapterIndex={chapter.index} bonus={bonus} />)}</tbody>
            </JournalTable>
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
                                    <Box direction="row" align="center" gap="xxsmall" data-stamina-trigger={player.playerID}>
                                        <IconImage data={stamina.getImageData()} scale={0.4} />
                                        <Text size="11px" style={{ whiteSpace: 'nowrap' }} data-spelunking-stamina={player.playerID}>{commaNotation(stamina.current)} / {commaNotation(stamina.maximum)}</Text>
                                    </Box>
                                </Box>
                                <TipDisplay heading="Spelunking EXP" body={
                                    <Text color="dark-1" size="small" data-spelunking-exp-exact={player.playerID}>{notateNumber(skill.currentXP)} / {notateNumber(skill.xpReq)} EXP</Text>
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
