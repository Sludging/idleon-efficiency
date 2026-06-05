declare const window: Window &
    typeof globalThis & {
        nitroAds?: {
            addUserToken?: (hash: string, encoding: string) => void
            clearUserTokens?: () => void
        }
    }

export function addNitroHashedEmailToken(hash: string) {
    window.nitroAds?.addUserToken?.(hash, 'SHA-256');
}

export function clearNitroHashedEmailTokens() {
    window.nitroAds?.clearUserTokens?.();
}
