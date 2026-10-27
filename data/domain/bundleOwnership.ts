import { BUNDLE_CATALOG, BundleCategory } from './bundleCatalog';

export type BundleOwnershipState = 'owned' | 'unowned' | 'unknown';

export interface BundleCategorySummary {
    ownedCount: number;
    unownedCount: number;
    unknownCount: number;
    totalCount: number;
}

export class BundleOwnership {
    available: boolean = false;
    private receivedEntryIds: Set<string> = new Set();

    parse(rawBundlesReceived: string | undefined): void {
        const receipts: Record<string, string | number> | null | undefined = rawBundlesReceived === undefined
            ? undefined
            : JSON.parse(rawBundlesReceived);

        this.available = receipts != null;
        this.receivedEntryIds.clear();
        if (!receipts) {
            return;
        }

        for (const [entryId, receivedFlag] of Object.entries(receipts)) {
            if (Number(receivedFlag) === 1) {
                this.receivedEntryIds.add(entryId);
            }
        }
    }

    getOwnership(nativeEntryId: string): BundleOwnershipState {
        if (!this.available) {
            return 'unknown';
        }

        return this.receivedEntryIds.has(nativeEntryId) ? 'owned' : 'unowned';
    }

    getCategorySummary(category: BundleCategory): BundleCategorySummary {
        const summary: BundleCategorySummary = {
            ownedCount: 0,
            unownedCount: 0,
            unknownCount: 0,
            totalCount: 0,
        };

        for (const entry of BUNDLE_CATALOG) {
            if (entry.category !== category) {
                continue;
            }

            summary.totalCount += 1;
            const ownership = this.getOwnership(entry.nativeId);
            if (ownership === 'owned') {
                summary.ownedCount += 1;
            } else if (ownership === 'unowned') {
                summary.unownedCount += 1;
            } else {
                summary.unknownCount += 1;
            }
        }

        // The three Starter Pack variants share one received-entitlement family.
        if (category === 'starterOffer') {
            return {
                ownedCount: Number(summary.ownedCount > 0),
                unownedCount: Number(summary.ownedCount === 0 && summary.unknownCount === 0),
                unknownCount: Number(summary.ownedCount === 0 && summary.unknownCount > 0),
                totalCount: 1,
            };
        }

        return summary;
    }
}
