"use client"

import { useEffect } from 'react';
import {
    getNitroHashedEmail,
    NITRO_HASHED_EMAIL_HASH_KEY,
    NITRO_HASHED_EMAIL_UPDATED,
} from './nitroHashedEmailConsent';

declare const window: Window &
    typeof globalThis & {
        gtag: any
        nitroAds: any
        _pwGA4PageviewId: string
        dataLayer: any
    }

const adUnits: Record<string, any> = {
    "left-side-rail": {
        "refreshTime": 30,
        "format": "rail",
        "rail": "left",
        "railOffsetTop": 0,
        "railOffsetBottom": 50,
        "railSpacing": 20,
        "railCollisionWhitelist": ["*"],
        "mediaQuery": "(min-width: 1750px)",
        "sizes": [
            [
                "160",
                "600"
            ]
        ],
        "report": {
            "enabled": true,
            "icon": true,
            "wording": "Report Ad",
            "position": "bottom-right"
        }
    },
    "right-side-rail": {
        "refreshTime": 30,
        "format": "rail",
        "rail": "right",
        "railOffsetTop": 0,
        "railOffsetBottom": 50,
        "railSpacing": 20,
        "railCollisionWhitelist": ["*"],
        "mediaQuery": "(min-width: 1750px)",
        "sizes": [
            [
                "160",
                "600"
            ]
        ],
        "report": {
            "enabled": true,
            "icon": true,
            "wording": "Report Ad",
            "position": "bottom-right"
        }
    },
    "floating-video-player": {
        "refreshTime": 30,
        "format": "floating",
        "report": {
            "enabled": true,
            "icon": true,
            "wording": "Report Ad",
            "position": "top-left"
        }
    },
    'bottom-anchor': {
        "format": "anchor-v2",
        "anchor": "bottom",
        "anchorBgColor": "rgba(23, 23, 23, 0.5)",
        "anchorClose": true,
        "anchorPersistClose": false,
        "anchorStickyOffset": 0,
        // mediaQuery taken from snowcrows website
        "mediaQuery": "(min-width: 1025px), (min-width: 768px) and (max-width: 1024px), (min-width: 320px) and (max-width: 767px)",
        "report": {
            "enabled": true,
            "icon": true,
            "wording": "Report Ad",
            "position": "top-right"
        }
    },
};

const Nitro = ({ demo = false }: { demo: boolean }) => {
    useEffect(() => {    
        let adsCreated = false;

        const addStoredUserToken = () => {
            if (demo) {
                return;
            }

            const hashedEmail = getNitroHashedEmail();
            if (hashedEmail) {
                window.nitroAds.addUserToken(hashedEmail, 'SHA-256');
            }
        }

        // Used after ads exist; initial load adds the token before createAd below.
        const syncStoredUserToken = () => {
            const hashedEmail = getNitroHashedEmail();
            if (hashedEmail && !demo) {
                window.nitroAds.addUserToken(hashedEmail, 'SHA-256');
                return;
            }
            window.nitroAds.clearUserTokens?.();
        }

        // Function to add ad units
        const addUnits = () => {
            Object.keys(adUnits).forEach(key => {
                window.nitroAds.createAd(key, {
                    ...adUnits[key],
                    demo: demo
                });
            });
        };

        if (!window.nitroAds) {
            window.nitroAds = window.nitroAds || {};
            window.nitroAds.createAd = function (...args: any[]) {
                return new Promise(e => {
                    window.nitroAds.queue.push(["createAd", args, e])
                })
            };
            window.nitroAds.addUserToken = function (...args: any[]) {
                window.nitroAds.queue.push(["addUserToken", args])
            };
            window.nitroAds.clearUserTokens = function () {
                window.nitroAds.queue.push(["clearUserTokens", []])
            };
            window.nitroAds.queue = [];
            // Load the Ramp configuration script
            const configScript = document.createElement("script");
            configScript.src = `https://s.nitropay.com/ads-2146.js`;
            configScript.setAttribute("data-cfasync", "false");
            configScript.setAttribute("data-spa", "auto");
            document.head.appendChild(configScript);

            configScript.onload = () => {
                // NitroPay recommends registering user data before creating ad units.
                addStoredUserToken();
                addUnits();
                adsCreated = true;
            };

            // We want to add padding to the bottom of the page when the anchor is visible.
            document.addEventListener('nitroAds.anchorVisibility', (event) => {
                const { id, location } = (event as unknown as { detail: { id: string, location: string } }).detail;

                // The event happens slightly before the element is visible or when it's being hidden.
                // So we need to wait a bit before we can get the correct height.
                setTimeout(() => {
                    const element = document.getElementById(id);
                    const rect = element?.getBoundingClientRect();

                    // We currently only use a bottom anchor
                    if (location === "bottom") {
                        if (rect) {
                            // Set the CSS variable to the ad's height
                            document.documentElement.style.setProperty('--nitro-ad-height', `${rect.height}px`);
                        } else {
                            // Reset if the ad is hidden or element is gone
                            document.documentElement.style.setProperty('--nitro-ad-height', '0px');
                        }
                    }
                }, 100);
            });
        } else {
            adsCreated = true;
            syncStoredUserToken();
        }

        // Custom event handles this tab; storage handles the same value changing in another tab.
        const onNitroHashedEmailUpdated = () => {
            if (adsCreated) {
                syncStoredUserToken();
            }
        };
        const onStorage = (event: StorageEvent) => {
            if (event.key === NITRO_HASHED_EMAIL_HASH_KEY) {
                onNitroHashedEmailUpdated();
            }
        }

        window.addEventListener(NITRO_HASHED_EMAIL_UPDATED, onNitroHashedEmailUpdated);
        window.addEventListener('storage', onStorage);

        return () => {
            window.removeEventListener(NITRO_HASHED_EMAIL_UPDATED, onNitroHashedEmailUpdated);
            window.removeEventListener('storage', onStorage);
        }
    }, [demo]);

    return null;
};

export default Nitro;
