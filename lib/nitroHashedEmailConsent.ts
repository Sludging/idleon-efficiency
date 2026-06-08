export const NITRO_HASHED_EMAIL_OPT_OUT_KEY = 'nitro_hashed_email_opt_out';

export const NITRO_HASHED_EMAIL_HASH_KEY = 'nitro_hashed_email_sha256';

// localStorage changes do not emit a storage event in the tab that made them.
// Hence we need a custom event to notify on the same tab.
export const NITRO_HASHED_EMAIL_UPDATED = 'nitro-hashed-email-updated';

function notifyNitroHashedEmailUpdated(): void {
    if (typeof window === 'undefined') {
        return;
    }
    window.dispatchEvent(new Event(NITRO_HASHED_EMAIL_UPDATED));
}

export function isNitroHashedEmailOptedOut(): boolean {
    if (typeof window === 'undefined') {
        return false;
    }
    return localStorage.getItem(NITRO_HASHED_EMAIL_OPT_OUT_KEY) === 'true';
}

export function setNitroHashedEmailOptOut(optOut: boolean): void {
    if (typeof window === 'undefined') {
        return;
    }
    if (optOut) {
        localStorage.setItem(NITRO_HASHED_EMAIL_OPT_OUT_KEY, 'true');
        localStorage.removeItem(NITRO_HASHED_EMAIL_HASH_KEY);
    } else {
        localStorage.removeItem(NITRO_HASHED_EMAIL_OPT_OUT_KEY);
    }
    notifyNitroHashedEmailUpdated();
}

export function getNitroHashedEmail(): string | undefined {
    if (typeof window === 'undefined') {
        return undefined;
    }
    // Opt-out should win even if an older session left a hash behind.
    if (isNitroHashedEmailOptedOut()) {
        return undefined;
    }
    return localStorage.getItem(NITRO_HASHED_EMAIL_HASH_KEY) ?? undefined;
}

export function setNitroHashedEmail(hash: string): void {
    if (typeof window === 'undefined') {
        return;
    }
    localStorage.setItem(NITRO_HASHED_EMAIL_HASH_KEY, hash);
    notifyNitroHashedEmailUpdated();
}

export function clearNitroHashedEmail(): void {
    if (typeof window === 'undefined') {
        return;
    }
    localStorage.removeItem(NITRO_HASHED_EMAIL_HASH_KEY);
    notifyNitroHashedEmailUpdated();
}
