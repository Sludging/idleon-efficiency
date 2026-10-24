'use client';

import { Box, Text } from 'grommet';
import type { ThemeType } from 'grommet';
import { normalizeColor } from 'grommet/utils';
import styled from 'styled-components';
import type { SneakingMasteryReward } from '../../../data/domain/world-6/sneaking';

const RewardGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
    gap: 8px;
`;

const RewardCard = styled.div<{ $earned: boolean }>`
    display: flex;
    flex-direction: column;
    min-width: 0;
    opacity: ${({ $earned }) => $earned ? 1 : 0.5};
    border-radius: 4px;
    background: ${({ theme }: { theme: ThemeType }) => normalizeColor('background-back', theme)};
`;

const RewardHeader = styled.div`
    padding: 8px 12px;
    background: ${({ theme }: { theme: ThemeType }) => normalizeColor('grey-1', theme)};
`;

export function MasteryDisplay({ rewards }: { rewards: SneakingMasteryReward[] }) {
    return (
        <RewardGrid>
            {rewards.map(reward => (
                <RewardCard key={reward.index} $earned={reward.earned}>
                    <RewardHeader>
                        <Text size="small" weight={600}>{reward.description.replace(/_/g, ' ').replace(/#/g, 'x').trim()}</Text>
                    </RewardHeader>
                    <Box pad={{ horizontal: '12px', vertical: '8px' }} gap="xsmall" flex>
                        {reward.bonusDescription && (
                            <Text size="small">{reward.bonusDescription.replace(/_/g, ' ').replace(/#/g, 'x').trim()}</Text>
                        )}
                        <Text size="xsmall" color="accent-2">Mastery {reward.requiredMastery}</Text>
                    </Box>
                </RewardCard>
            ))}
        </RewardGrid>
    );
}
