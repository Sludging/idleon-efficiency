'use client'

import { useCallback, useEffect, useRef } from 'react'
import { AuthStatus } from '../data/firebase/authContext'
import { isSubDomain } from '../data/utility'
import { hashEmailForAds } from '../lib/hashEmail'
import {
    isNitroHashedEmailOptedOut,
    NITRO_HASHED_EMAIL_CONSENT_CHANGED,
    NITRO_HASHED_EMAIL_OPT_OUT_KEY,
} from '../lib/nitroHashedEmailConsent'
import { addNitroHashedEmailToken, clearNitroHashedEmailTokens } from '../lib/nitroTokens'
import { useAuthStore } from '../lib/providers/authStoreProvider'
import { useShallow } from 'zustand/react/shallow'

export function NitroHashedEmail() {
    const { user, authStatus } = useAuthStore(
        useShallow((state) => ({
            user: state.user,
            authStatus: state.authStatus,
        })),
    )
    const tokenActive = useRef(false)

    const syncToken = useCallback(async () => {
        if (authStatus === AuthStatus.Loading) {
            return
        }
        const demoAds = process.env.NEXT_PUBLIC_DEMO_ADS === 'true'
        const eligible =
            !demoAds &&
            !isSubDomain() &&
            authStatus === AuthStatus.Valid &&
            !!user?.email &&
            user.emailVerified &&
            !isNitroHashedEmailOptedOut()

        if (eligible) {
            const hash = await hashEmailForAds(user!.email!)
            addNitroHashedEmailToken(hash)
            tokenActive.current = true
            return
        }

        if (tokenActive.current) {
            clearNitroHashedEmailTokens()
            tokenActive.current = false
        }
    }, [user, authStatus])

    useEffect(() => {
        void syncToken()
    }, [syncToken])

    useEffect(() => {
        const onConsentChange = () => {
            void syncToken()
        }
        const onStorage = (event: StorageEvent) => {
            if (event.key === NITRO_HASHED_EMAIL_OPT_OUT_KEY) {
                void syncToken()
            }
        }

        window.addEventListener(NITRO_HASHED_EMAIL_CONSENT_CHANGED, onConsentChange)
        window.addEventListener('storage', onStorage)

        return () => {
            window.removeEventListener(NITRO_HASHED_EMAIL_CONSENT_CHANGED, onConsentChange)
            window.removeEventListener('storage', onStorage)
        }
    }, [syncToken])

    return null
}
