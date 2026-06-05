export const NITRO_HASHED_EMAIL_OPT_OUT_KEY = 'nitro_hashed_email_opt_out';

export const NITRO_HASHED_EMAIL_CONSENT_CHANGED = 'nitro-hashed-email-consent-changed';

export function isNitroHashedEmailOptedOut(): boolean {
    if (typeof window === 'undefined') {
        return false;
    }
    return localStorage.getItem(NITRO_HASHED_EMAIL_OPT_OUT_KEY) === 'true';
}

export function setNitroHashedEmailOptOut(optOut: boolean): void {
    if (optOut) {
        localStorage.setItem(NITRO_HASHED_EMAIL_OPT_OUT_KEY, 'true');
    } else {
        localStorage.removeItem(NITRO_HASHED_EMAIL_OPT_OUT_KEY);
    }
    window.dispatchEvent(new Event(NITRO_HASHED_EMAIL_CONSENT_CHANGED));
}
