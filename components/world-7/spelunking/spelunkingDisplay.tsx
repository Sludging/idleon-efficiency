import { Box, CheckBox, Grid, Select, Text } from 'grommet';
import styled from 'styled-components';
import IconImage from '../../base/IconImage';
import RoundedShadowBox from '../../base/RoundedShadowBox';
import TextAndLabel, { ComponentAndLabel } from '../../base/TextAndLabel';
import TipDisplay from '../../base/TipDisplay';
import { Discovery, Spelunking, Tunnel } from '../../../data/domain/world-7/spelunking';
import type { AmberDenomination } from '../../../data/domain/world-7/spelunking';
import { Item } from '../../../data/domain/items';
import { commaNotation } from '../../../data/utility';

const TunnelMetrics = styled(Grid)`
    grid-template-columns: repeat(4, minmax(0, 1fr));

    @media (max-width: 600px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
`;

export type CollectionStatus = 'All' | 'Found' | 'Missing';

interface SpelunkingDisplayProps {
    spelunking: Spelunking;
    showLocked: boolean;
    collectionStatus: CollectionStatus;
    onShowLockedChange: (showLocked: boolean) => void;
    onCollectionStatusChange: (status: CollectionStatus) => void;
}

export default function SpelunkingDisplay({
    spelunking,
    showLocked,
    collectionStatus,
    onShowLockedChange,
    onCollectionStatusChange,
}: SpelunkingDisplayProps) {
    const ordinarySummary = spelunking.ordinarySummary;
    const grandSummary = spelunking.grandSummary;
    const currentAmber = spelunking.currentAmberDenomination;

    return (
        <Box gap="medium">
            <Box
                direction="row"
                wrap
                align="center"
                justify="between"
                gap="medium"
                border={{ side: 'top', color: 'grey-1' }}
                pad={{ top: 'medium' }}
            >
                <Box direction="row" wrap gap="large">
                    <Box gap="xxsmall">
                        <Text size="xlarge">{ordinarySummary.found} / {ordinarySummary.capacity} found</Text>
                        <Text size="xsmall" color="accent-2">Account discoveries</Text>
                    </Box>
                    <Box gap="xxsmall">
                        <Text size="xlarge">{grandSummary.found} / {grandSummary.capacity} found</Text>
                        <Text size="xsmall" color="accent-2">Account Grand Discoveries</Text>
                    </Box>
                </Box>
                <Box direction="row" wrap align="center" gap="medium">
                    <CheckBox label="Show locked" checked={showLocked} onChange={event => onShowLockedChange(event.target.checked)} />
                    <Box direction="row" align="center" gap="small">
                        <Text size="small" color="accent-2">Collection status</Text>
                        <Box width="130px" flex={false}>
                            <Select
                                aria-label="Collection status"
                                options={['All', 'Found', 'Missing']}
                                value={collectionStatus}
                                onChange={({ option }) => onCollectionStatusChange(option)}
                                size="small"
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box border={{ side: 'top', color: 'grey-1' }} />
            <Grid columns={{ count: 'fit', size: 'min(100%, 500px)' }} gap="medium">
                {spelunking.tunnels.filter(tunnel => showLocked || tunnel.available).map(tunnel => (
                    <TunnelCard key={tunnel.index} tunnel={tunnel} amber={currentAmber} collectionStatus={collectionStatus} />
                ))}
            </Grid>
        </Box>
    );
}

function TunnelCard({ tunnel, amber, collectionStatus }: { tunnel: Tunnel; amber: AmberDenomination; collectionStatus: CollectionStatus }) {
    const bossArt = tunnel.getLoreBossImageData();
    const amberArt = amber.getImageData();
    const biggestHaulText = amber.formatAmount(tunnel.biggestHaul);
    const ordinarySummary = tunnel.ordinarySummary;
    const grandSummary = tunnel.grandSummary;
    const ordinaryEntries = tunnel.discoveries.filter(discovery => collectionStatus === 'All' || discovery.found === (collectionStatus === 'Found'));

    return (
        <RoundedShadowBox
            background="dark-1"
            pad="medium"
            gap="medium"
            data-spelunking-tunnel={tunnel.index}
            aria-label={`${tunnel.data.name}: ${tunnel.available ? 'Available' : 'Locked'}, ${tunnel.loreCompleted ? 'Lore complete' : 'Lore incomplete'}`}
            style={{ opacity: !tunnel.available ? 0.78 : tunnel.loreCompleted ? 1 : 0.9 }}
        >
            <Box direction="row" gap="medium" align="start">
                <TipDisplay heading={tunnel.loreBoss.name} body={
                    <Text size="small" color="dark-1">
                        Lore boss of {tunnel.data.name}. {tunnel.loreCompleted ? 'Lore complete.' : `Complete this tunnel at depth ${commaNotation(tunnel.data.bossDepth)} to defeat the boss.`}
                    </Text>
                }>
                    <Box width="80px" height="80px" flex={false} align="center" justify="center" round="small" background="dark-2" aria-label={`${tunnel.loreBoss.name}: ${tunnel.loreCompleted ? 'Lore complete' : 'Lore incomplete'}`}>
                        <IconImage data={bossArt} scale={80 / Math.max(bossArt.width, bossArt.height)} />
                    </Box>
                </TipDisplay>
                <Box gap="xsmall" flex style={{ minWidth: 0 }}>
                    <Box direction="row" wrap justify="between" align="start" gap="small">
                        <Text size="medium" weight={500}>{tunnel.data.name}</Text>
                        {tunnel.itemDrops.length > 0 && (
                            <Box direction="row" wrap justify="end" gap="xsmall">
                                {tunnel.itemDrops.map(drop => (
                                    <Box key={drop.dropCode} direction="row" gap="xsmall" align="center" background="dark-2" pad={{ horizontal: 'small', vertical: 'xsmall' }} round="small">
                                        <IconImage data={Item.getImageData(drop.itemId)} scale={2 / 3} />
                                        <Text size="xsmall">{drop.displayName}</Text>
                                    </Box>
                                ))}
                            </Box>
                        )}
                    </Box>
                    <Text size="small" style={{ whiteSpace: 'pre-line' }}>{tunnel.data.loreBonus.replaceAll(' @ ', '\n')}</Text>
                    {!tunnel.available && <Text size="xsmall" color="accent-2">Locked · Complete {tunnel.accessLoreTunnel!.data.name} Lore</Text>}
                </Box>
            </Box>
            <Box background="grey-1" pad="xsmall" round="small">
                <TunnelMetrics gap="none">
                <TipDisplay heading="Best depth" body={
                    <Text size="small" color="dark-1">
                        {tunnel.loreCompleted ? 'Lore boss defeated.' : `Defeat ${tunnel.loreBoss.name} at depth ${commaNotation(tunnel.data.bossDepth)} to complete this tunnel's Lore.`}
                    </Text>
                }>
                    <Box gap="xxsmall" pad="small" border={{ side: 'right', color: 'dark-1' }}>
                        <Text size="xlarge">{commaNotation(tunnel.bestDepth)}</Text>
                        <Text size="xsmall">Best depth</Text>
                    </Box>
                </TipDisplay>
                <Box gap="xxsmall" pad="small" border={{ side: 'right', color: 'dark-1' }}>
                    <Box direction="row" gap="xxsmall" align="center" aria-label={`${biggestHaulText} ${amber.name}`}>
                        <IconImage data={amberArt} scale={24 / Math.max(amberArt.width, amberArt.height)} />
                        <Text size="xlarge">{biggestHaulText}</Text>
                    </Box>
                    <Text size="xsmall">Biggest haul</Text>
                </Box>
                <Box gap="xxsmall" pad="small" border={{ side: 'right', color: 'dark-1' }}>
                    <Text size="xlarge">{ordinarySummary.found} / {ordinarySummary.capacity}</Text>
                    <Text size="xsmall">Discoveries</Text>
                </Box>
                <TipDisplay heading="Grand discoveries" body={
                    <Text size="small" color="dark-1">
                        {grandSummary.missing === 0 ? 'All Grand Discoveries found.' : tunnel.grandEligible ? 'Requirements met. Grand Discoveries can be found.' : 'Requirements not met yet for Grand Discoveries.'}
                    </Text>
                }>
                    <Box gap="xxsmall" pad="small">
                        <Text size="xlarge">{grandSummary.found} / {grandSummary.capacity}</Text>
                        <Text size="xsmall">Grand discoveries</Text>
                    </Box>
                </TipDisplay>
                </TunnelMetrics>
            </Box>
            <Box direction="row" wrap gap="xsmall" align="center">
                {ordinaryEntries.length === 0 && <Text size="small" color="accent-2">No {collectionStatus.toLowerCase()} discoveries</Text>}
                {ordinaryEntries.map(discovery => <DiscoveryIcon key={discovery.index} discovery={discovery} />)}
            </Box>
        </RoundedShadowBox>
    );
}

function DiscoveryIcon({ discovery }: { discovery: Discovery }) {
    const art = discovery.getImageData();
    const image = (
        <Box
            width="36px"
            height="36px"
            align="center"
            justify="center"
            round="small"
            background="dark-2"
            style={{ opacity: discovery.found ? 1 : 0.65 }}
            data-spelunking-discovery={discovery.index}
            data-discovery-found={discovery.found}
        >
            <IconImage data={art} scale={Math.min(1, 32 / Math.max(art.width, art.height))} />
        </Box>
    );

    if (discovery.found) {
        return image;
    }

    return (
        <TipDisplay heading="Spawn depth" maxWidth="360px" body={
            <Text size="small" color="dark-1">{commaNotation(discovery.data.x6)}</Text>
        }>
            {image}
        </TipDisplay>
    );
}
