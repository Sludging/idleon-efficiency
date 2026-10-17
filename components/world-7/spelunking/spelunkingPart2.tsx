import { useContext } from 'react';
import type { ReactNode } from 'react';
import { Box, Grid, Meter, Text, ThemeContext } from 'grommet';
import { normalizeColor } from 'grommet/utils';
import styled from 'styled-components';
import IconImage from '../../base/IconImage';
import RoundedShadowBox from '../../base/RoundedShadowBox';
import { ComponentAndLabel } from '../../base/TextAndLabel';
import TipDisplay from '../../base/TipDisplay';
import type { Player } from '../../../data/domain/player';
import { SkillsIndex } from '../../../data/domain/SkillsIndex';
import { Skilling } from '../../../data/domain/skilling';
import type { Chapter, ChapterBonus, Spelunking } from '../../../data/domain/world-7/spelunking';
import { commaNotation, notateNumber, toTime } from '../../../data/utility';

const JournalGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px;
    @media (max-width: 760px) {
        grid-template-columns: minmax(0, 1fr);
    }
`;

const JournalTableFrame = styled.div`
    width: 100%;
    overflow-x: auto;
`;

const JournalTable = styled.table<{ $muted: string; $divider: string }>`
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
    font-variant-numeric: tabular-nums;
    font-size: 12px;
    line-height: 20px;
    th { font-weight: 400; color: ${({ $muted }) => $muted}; text-align: left; }
    th, td { padding: 8px 6px 8px 0; vertical-align: middle; }
    thead th { padding-top: 0; padding-bottom: 8px; white-space: nowrap; }
    thead tr { border-bottom: 1px solid ${({ $divider }) => $divider}; }
    th:last-child, td:last-child { padding-right: 0; text-align: right; }
    th:nth-child(2), td:nth-child(2),
    th:nth-child(3), td:nth-child(3) { text-align: center; }
    col:nth-child(1) { width: 36%; }
    col:nth-child(2) { width: 10%; }
    col:nth-child(3) { width: 16%; }
    col:nth-child(4) { width: 23%; }
    col:nth-child(5) { width: 15%; }
    @media (max-width: 420px) {
        min-width: 420px;
    }
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

const SummaryGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 16px;
    min-width: 0;
    > *:not(:first-child) {
        border-left: 1px solid ${({ theme }) => normalizeColor('grey-1', theme)};
        padding-left: 16px;
    }
    @media (max-width: 900px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        > *:nth-child(3), > *:nth-child(4) { border-left: 0; padding-left: 0; }
    }
    @media (max-width: 540px) {
        grid-template-columns: minmax(0, 1fr);
        > *:not(:first-child) { border-left: 0; padding-left: 0; }
    }
`;

export function SpelunkingSummary({ spelunking, players, children, manicDetail }: SpelunkingPart2Props & { children?: ReactNode; manicDetail: ReactNode }) {
    const allFullHours = spelunking.getHoursUntilAllFull();

    return (
        <SummaryGrid data-spelunking-summary>
            {children}
            <Box gap="small" data-spelunking-summary-card="reads">
                <Box gap="xxsmall">
                    <Text size="small" weight={500}>Daily page reads</Text>
                    <Text size="16px">{commaNotation(spelunking.dailyReadsRemaining)} / {commaNotation(spelunking.dailyReadLimit)}</Text>
                    <Text size="12px" color="accent-2">Remaining / limit</Text>
                </Box>
                <Box direction="row" justify="between" align="center" gap="xsmall">
                    <TipDisplay heading="Manic mode" size="small" maxWidth="520px" body={manicDetail}>
                        <Box tabIndex={0} aria-label="Manic mode details">
                            <Text size="12px" color="accent-2" style={{ textDecoration: 'underline dotted', textUnderlineOffset: '4px', cursor: 'help' }}>Manic mode</Text>
                        </Box>
                    </TipDisplay>
                    <Text size="16px" data-spelunking-manic-mode>{spelunking.manic.enabled ? 'On' : 'Off'}</Text>
                </Box>
            </Box>
            <Box gap="small" data-spelunking-summary-card="stamina">
                <Text size="small" weight={500}>Stamina</Text>
                <Box gap="small">
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
                        <Box direction="row" justify="between" align="center" gap="xsmall" data-spelunking-refill-trigger>
                            <Text size="12px" color="accent-2">Team refill</Text>
                            <Text size="16px" data-spelunking-all-full data-spelunking-all-full-hours={allFullHours}>
                                {allFullHours === 0 ? 'Full' : toTime(allFullHours * 3600).trim()}
                            </Text>
                        </Box>
                    </TipDisplay>
                </Box>
            </Box>
        </SummaryGrid>
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
            <Text size="18px" weight={700}>{notateNumber(ownedPages)}</Text>
            <Text size="12px" color="accent-2">Owned pages</Text>
        </Box>
    );

    return (
        <RoundedShadowBox background="dark-1" gap="none" pad="none" style={{ overflow: 'hidden', minWidth: 0, height: '100%' }} data-spelunking-chapter={chapter.index}>
            <Box direction="row" align="center" justify="between" gap="small" pad={{ horizontal: 'medium', vertical: 'small' }} background="grey-1">
                <Box direction="row" align="center" gap="small" flex style={{ minWidth: 0 }}>
                    <TipDisplay heading={chapter.pageItem.displayName} maxWidth="420px" body={
                        <Text color="dark-1" size="small" data-spelunking-page-description-detail={chapter.index}>{chapter.pageItem.description.replace(/\s*@\s*/g, ' ').trim()}</Text>
                    }>
                        <Box aria-label={`${chapter.pageItem.displayName} description`} data-spelunking-page-description={chapter.index} background="dark-1" pad="xsmall" round="small">
                            <IconImage data={chapter.pageItem.getImageData()} scale={0.75} />
                        </Box>
                    </TipDisplay>
                    <Box gap="xxsmall" style={{ minWidth: 0 }}>
                        <Text size="14px" weight={600}>{chapter.pageItem.displayName}</Text>
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
            <Box pad="16px" style={{ minWidth: 0 }}>
                <JournalTableFrame>
                    <JournalTable $muted={normalizeColor('accent-2', theme)} $divider={normalizeColor('grey-1', theme)} aria-label={`${chapter.pageItem.displayName} bonuses`}>
                        <colgroup><col /><col /><col /><col /><col /></colgroup>
                        <thead>
                            <tr><th scope="col">Earned bonus</th><th scope="col">Level</th><th scope="col">Min. pages</th><th scope="col">Progress</th><th scope="col">Soft cap</th></tr>
                        </thead>
                        <tbody>{chapter.bonuses.map(bonus => <ChapterBonusRow key={bonus.index} chapterIndex={chapter.index} bonus={bonus} />)}</tbody>
                    </JournalTable>
                </JournalTableFrame>
            </Box>
        </RoundedShadowBox>
    );
}

export function SpelunkingJournal({ spelunking, players }: SpelunkingPart2Props) {
    return (
        <JournalGrid>
            {spelunking.chapters.map(chapter => <ChapterCard key={chapter.index} chapter={chapter} players={players} />)}
        </JournalGrid>
    );
}

const CharacterGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: 12px;
    @media (max-width: 1100px) { grid-template-columns: repeat(4, minmax(0, 1fr)); }
    @media (max-width: 760px) { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    @media (max-width: 420px) { grid-template-columns: minmax(0, 1fr); }
`;

export function SpelunkingCharacters({ spelunking, players }: SpelunkingPart2Props) {
    return (
        <CharacterGrid data-spelunking-character-grid>
            {players.map(player => {
                const skill = player.skills.get(SkillsIndex.Spelunking)!;
                const stamina = spelunking.stamina.find(entry => entry.playerID === player.playerID)!;

                return (
                    <RoundedShadowBox key={player.playerID} title={player.playerName} background="dark-2" pad="medium" gap="small" style={{ minHeight: '112px' }} data-spelunking-player={player.playerID}>
                        <Box gap="xsmall" direction="row" align="center">
                            <IconImage data={player.getClassImageData()} scale={0.7} />
                            <Text color="text" size="16px" weight={500} truncate>{player.playerName}</Text>
                        </Box>
                        <Box direction="row" justify="between" align="center" gap="xxsmall">
                            <TipDisplay heading="Spelunking level" body={<Text color="dark-1" size="small" data-skill-detail={player.playerID}>{player.playerName}: Level {commaNotation(skill.level)}</Text>}>
                                <Box direction="row" align="center" gap="xxsmall" data-skill-trigger={player.playerID}>
                                    <IconImage data={Skilling.getSkillImageData(SkillsIndex.Spelunking)} scale={0.4} />
                                    <Text size="13px" style={{ whiteSpace: 'nowrap' }}>Lv {commaNotation(skill.level)}</Text>
                                </Box>
                            </TipDisplay>
                            <Box direction="row" align="center" gap="xxsmall" data-stamina-trigger={player.playerID}>
                                <IconImage data={stamina.getImageData()} scale={0.4} />
                                <Text size="13px" style={{ whiteSpace: 'nowrap' }} data-spelunking-stamina={player.playerID}>{commaNotation(stamina.current)} / {commaNotation(stamina.maximum)}</Text>
                            </Box>
                        </Box>
                        <TipDisplay heading="Spelunking EXP" body={
                            <Text color="dark-1" size="small" data-spelunking-exp-exact={player.playerID}>{notateNumber(skill.currentXP)} / {notateNumber(skill.xpReq)} EXP</Text>
                        }>
                            <Box data-spelunking-exp={player.playerID} data-exp-current={skill.currentXP} data-exp-required={skill.xpReq}>
                                <Meter aria-label={`${player.playerName} Spelunking EXP`} values={[{ value: skill.currentXP / skill.xpReq * 100, color: 'brand' }]} max={100} thickness="4px" size="full" background="grey-1" round />
                            </Box>
                        </TipDisplay>
                    </RoundedShadowBox>
                );
            })}
        </CharacterGrid>
    );
}
