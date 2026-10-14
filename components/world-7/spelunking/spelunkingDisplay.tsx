import { Box, CheckBox, Grid, Select, Text } from 'grommet';
import IconImage from '../../base/IconImage';
import ShadowBox from '../../base/ShadowBox';
import TextAndLabel, { ComponentAndLabel } from '../../base/TextAndLabel';
import TipDisplay from '../../base/TipDisplay';
import { Discovery, Spelunking, Tunnel } from '../../../data/domain/world-7/spelunking';
import type { AmberDenomination } from '../../../data/domain/world-7/spelunking';
import { Item } from '../../../data/domain/items';
import { commaNotation } from '../../../data/utility';

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
            <Box direction="row" wrap align="center" gap="medium">
                <Text size="small" color="accent-2">Account discoveries: <Text size="small" weight={500}>{ordinarySummary.found} / {ordinarySummary.capacity}</Text> found</Text>
                <Text size="small" color="accent-2">Account Grand Discoveries: <Text size="small" weight={500}>{grandSummary.found} / {grandSummary.capacity}</Text> found</Text>
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
            <Grid columns={['minmax(0, 1fr)', 'minmax(0, 1fr)']} gap="medium">
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
        <ShadowBox
            background="dark-1"
            pad="medium"
            gap="small"
            aria-label={`${tunnel.data.name}: ${tunnel.available ? 'Available' : 'Locked'}, ${tunnel.loreCompleted ? 'Lore complete' : 'Lore incomplete'}`}
            style={{ opacity: !tunnel.available ? 0.4 : tunnel.loreCompleted ? 1 : 0.7 }}
        >
            <Box direction="row" gap="small" align="center">
                <TipDisplay heading={tunnel.loreBoss.name} body={<Text size="small" color="dark-1">Lore boss of {tunnel.data.name}.</Text>}>
                    <Box width="72px" height="72px" flex={false} align="center" justify="center" aria-label={`${tunnel.loreBoss.name}: ${tunnel.loreCompleted ? 'Lore complete' : 'Lore incomplete'}`}>
                        <IconImage data={bossArt} scale={72 / Math.max(bossArt.width, bossArt.height)} />
                    </Box>
                </TipDisplay>
                <Box gap="xxsmall" flex>
                    <Box direction="row" wrap justify="between" align="center" gap="small">
                        <Text size="xsmall" color="accent-2">{tunnel.data.name}</Text>
                        {!tunnel.available && (
                            <Text size="xsmall" color="accent-2">Locked · Complete {tunnel.accessLoreTunnel!.data.name} Lore</Text>
                        )}
                    </Box>
                    <Text size="small" weight={500} style={{ whiteSpace: 'pre-line' }}>{tunnel.data.loreBonus.replaceAll(' @ ', '\n')}</Text>
                </Box>
            </Box>
            <Grid columns={tunnel.loreCompleted ? ['minmax(0, 1fr)', 'minmax(0, 1fr)'] : ['minmax(0, 1fr)', 'minmax(0, 1fr)', 'minmax(0, 1fr)']} gap="small">
                <TextAndLabel label="Best depth" textSize="xlarge" text={commaNotation(tunnel.bestDepth)} />
                {!tunnel.loreCompleted && <TextAndLabel label="Boss depth" textSize="small" text={commaNotation(tunnel.data.bossDepth)} />}
                <ComponentAndLabel label="Biggest haul" component={
                    <Box direction="row" gap="xxsmall" align="center" aria-label={`${biggestHaulText} ${amber.name}`}>
                        <IconImage data={amberArt} scale={24 / Math.max(amberArt.width, amberArt.height)} />
                        <Text size="small">{biggestHaulText}</Text>
                    </Box>
                } />
            </Grid>
            <Box border={{ side: 'top', color: 'grey-1' }} pad={{ top: 'small' }} gap="xxsmall">
                <Text size="small">Discoveries: {ordinarySummary.found} / {ordinarySummary.capacity} found</Text>
                <Box direction="row" wrap align="center" gap="small">
                    <Text size="small">Grand Discoveries: {grandSummary.found} / {grandSummary.capacity} found</Text>
                    <Text size="xsmall" color="accent-2">{grandSummary.missing === 0 ? 'Collection complete' : tunnel.grandEligible ? 'Requirements met' : 'Requirements not met'}</Text>
                </Box>
            </Box>
            <Box direction="row" wrap gap="xxsmall" align="center">
                {ordinaryEntries.length === 0 && <Text size="small" color="accent-2">No {collectionStatus.toLowerCase()} discoveries</Text>}
                {ordinaryEntries.map(discovery => <DiscoveryIcon key={discovery.index} discovery={discovery} />)}
            </Box>
            {tunnel.itemDrops.length > 0 && (
                <Box direction="row" wrap gap="small" align="center">
                    {tunnel.itemDrops.map(drop => (
                        <Box key={drop.dropCode} direction="row" gap="xxsmall" align="center">
                            <IconImage data={Item.getImageData(drop.itemId)} scale={2 / 3} />
                            <Text size="xsmall" color="accent-2">{drop.displayName}</Text>
                        </Box>
                    ))}
                </Box>
            )}
        </ShadowBox>
    );
}

function DiscoveryIcon({ discovery }: { discovery: Discovery }) {
    const art = discovery.getImageData();
    const image = (
        <Box width="32px" height="32px" align="center" justify="center" style={{ opacity: discovery.found ? 1 : 0.55 }}>
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
