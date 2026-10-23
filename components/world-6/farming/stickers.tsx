'use client';

import { Box, Text } from 'grommet';
import type { ThemeType } from 'grommet';
import { normalizeColor } from 'grommet/utils';
import styled from 'styled-components';
import IconImage from '../../base/IconImage';
import type { Farming, FarmingSticker } from '../../../data/domain/world-6/farming';
import { commaNotation, notateNumber } from '../../../data/utility';

const StickerGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
    gap: 8px;
`;

const StickerCard = styled.div<{ $owned: boolean }>`
    display: flex;
    flex-direction: column;
    min-width: 0;
    border: 1px solid ${({ theme }: { theme: ThemeType }) => normalizeColor('grey-1', theme)};
    border-radius: 4px;
    background: ${({ theme }: { theme: ThemeType }) => normalizeColor('background-back', theme)};
    opacity: ${({ $owned }) => $owned ? 1 : 0.5};
`;

const StickerHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 12px;
    background: ${({ theme }: { theme: ThemeType }) => normalizeColor('grey-1', theme)};
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.18);
    position: relative;
    z-index: 1;
`;

const StickerDetails = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 8px;
    padding: 8px 12px;
`;

function formatStickerDescription(sticker: FarmingSticker): string {
    let description = sticker.description;

    if (sticker.isMultiplicative && sticker.index === 1) {
        description = description.replace('approximately +{%', 'a hugh mungus }x');
    }
    if (sticker.isMultiplicative && sticker.index === 2) {
        description = description.replace('a measly, almost imperceivable +{%', 'a big time colossal }x');
    }

    const bonus = sticker.getBonus();
    const roundedBonus = Math.round(bonus * 10) / 10;
    const [wholeBonus, decimalBonus] = String(roundedBonus).split('.');
    const bonusText = `${commaNotation(Number(wholeBonus))}${decimalBonus ? `.${decimalBonus}` : ''}`;
    const multiplierText = notateNumber(1 + bonus / 100, 'MultiplierInfo').replace(/#/g, '');

    return description.replace(/\{/g, bonusText).replace(/\}/g, multiplierText);
}

function formatStickerChance(probability: number): string {
    if (probability <= 0) {
        return 'N/A';
    }

    const denominator = 1 / probability;
    const denominatorText = denominator < 1e7
        ? commaNotation(denominator)
        : notateNumber(denominator, 'Big');

    return `1 in ${denominatorText}`;
}

export function StickersDisplay({ farming }: { farming: Farming }) {
    const damageMultiplier = farming.getStickerDamageMultiplier();

    return (
        <Box gap="small" fill="horizontal">
            <Box direction="row" align="end" gap="medium" wrap>
                <Box>
                    <Text size="xxlarge" weight="normal">{commaNotation(farming.getTotalStickers())}</Text>
                    <Text size="xsmall" color="accent-2">Total Stickers</Text>
                </Box>
                {damageMultiplier > 1 && (
                    <Box>
                        <Text size="large" weight="normal">{notateNumber(damageMultiplier, 'MultiplierInfo').replace(/#/g, '')}x</Text>
                        <Text size="xsmall" color="accent-2">DMG Multi</Text>
                    </Box>
                )}
            </Box>
            <StickerGrid>
                {farming.stickers.map(sticker => (
                    <StickerCard key={sticker.index} $owned={sticker.count > 0}>
                        <StickerHeader>
                            <Box flex={false}>
                                <IconImage data={sticker.getImageData()} scale={0.6} />
                            </Box>
                            <Box style={{ minWidth: 0 }}>
                                <Text size="small" weight={600}>{sticker.name}</Text>
                                <Text size="xsmall" color="accent-2">Found: {commaNotation(sticker.count)}</Text>
                            </Box>
                        </StickerHeader>
                        <StickerDetails>
                            <Text size="small" style={{ flex: 1 }}>{formatStickerDescription(sticker)}</Text>
                            <Text size="xsmall" color="accent-2">Chance: {formatStickerChance(sticker.getFindProbability())}</Text>
                        </StickerDetails>
                    </StickerCard>
                ))}
            </StickerGrid>
        </Box>
    );
}
