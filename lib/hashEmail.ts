export async function hashEmailForAds(email: string): Promise<string> {
    const normalized = email.trim().toLowerCase();
    const buffer = await crypto.subtle.digest(
        'SHA-256',
        new TextEncoder().encode(normalized),
    );
    return Array.from(new Uint8Array(buffer))
        .map((byte) => byte.toString(16).padStart(2, '0'))
        .join('');
}
