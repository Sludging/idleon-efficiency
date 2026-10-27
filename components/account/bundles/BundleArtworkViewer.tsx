'use client';

import { useId } from 'react';
import { Box, Button, Heading, Layer } from 'grommet';
import type { BundleCatalogEntry } from '../../../data/domain/bundleCatalog';
import IconImage from '../../base/IconImage';

export default function BundleArtworkViewer({
    entry,
    onClose,
}: {
    entry: BundleCatalogEntry;
    onClose: () => void;
}) {
    const headingId = useId();
    const bundleName = entry.name ?? 'Unknown bundle';

    if (!entry.artwork) {
        return null;
    }

    return (
        <Layer
            role="dialog"
            aria-modal="true"
            aria-labelledby={headingId}
            modal
            responsive={false}
            animation={false}
            position="center"
            background="dark-1"
            onEsc={onClose}
            onClickOutside={onClose}
            style={{ maxWidth: 'calc(100vw - 24px)', maxHeight: 'calc(100vh - 24px)' }}
        >
            <Box
                style={{
                    width: 'fit-content',
                    maxWidth: 'calc(100vw - 24px)',
                    maxHeight: 'calc(100vh - 24px)',
                }}
            >
                <Box
                    direction="row"
                    align="center"
                    justify="between"
                    gap="small"
                    pad="medium"
                    border={{ side: 'bottom', color: 'grey-1' }}
                    flex={false}
                >
                    <Heading
                        id={headingId}
                        level="2"
                        size="small"
                        margin="none"
                        style={{ fontWeight: 'normal', overflowWrap: 'anywhere' }}
                    >
                        {bundleName}
                    </Heading>
                    <Button
                        label="Close"
                        aria-label="Close bundle image"
                        onClick={onClose}
                        autoFocus
                    />
                </Box>
                <Box
                    pad="medium"
                    align="start"
                    overflow="auto"
                    style={{ minHeight: 0 }}
                >
                    <IconImage data={entry.artwork} style={{ flexShrink: 0, marginLeft: 'auto', marginRight: 'auto' }} />
                </Box>
            </Box>
        </Layer>
    );
}
