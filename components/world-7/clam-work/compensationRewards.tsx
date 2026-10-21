'use client';

import { Text } from 'grommet';
import styled from 'styled-components';
import { Clamworks } from '../../../data/domain/world-7/clamworks';

const RewardGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
    gap: 8px;
`;

const RewardCard = styled.div<{ $earned: boolean; $pending: boolean }>`
    min-width: 0;
    border: 1px solid ${({ theme, $pending }) => theme.global.colors[$pending ? 'status-warning' : 'grey-1']};
    border-radius: 4px;
    background: ${({ theme }) => theme.global.colors['background-back']};
    opacity: ${({ $earned, $pending }) => $earned || $pending ? 1 : 0.5};
`;

const RewardHeader = styled.div`
    padding: 8px 12px;
    background: ${({ theme }) => theme.global.colors['grey-1']};
`;

const RewardDetails = styled.div`
    display: flex;
    align-items: baseline;
    gap: 4px;
    padding: 8px 12px;
`;

export function CompensationRewards({ clamworks }: { clamworks: Clamworks }) {
    const pending = clamworks.getFirstPendingCompensationReward();
    const rewards = clamworks.compensationRewards;

    return (
        <RewardGrid>
            {rewards.map(reward => (
                <RewardCard
                    key={reward.index}
                    data-clam-reward={reward.index}
                    data-clam-earned={String(reward.earned)}
                    $earned={reward.earned}
                    $pending={reward.index === pending?.index}
                    aria-current={reward.index === pending?.index ? 'step' : undefined}
                >
                    <RewardHeader>
                        <Text size="small" weight={600}>{reward.data.description}</Text>
                    </RewardHeader>
                    <RewardDetails>
                        <Text size="xsmall">Worker Class {reward.data.requiredWorkerClassLevel}</Text>
                    </RewardDetails>
                </RewardCard>
            ))}
        </RewardGrid>
    );
}
