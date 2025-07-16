"use client"

import { useEffect, useState } from 'react'

function SteamLogin() {
    const [steamData, setSteamData] = useState<Record<string, string> | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Extract OpenID parameters from URL
        const params = new URLSearchParams(window.location.search)
        
        // Create an object to store all OpenID parameters
        const openIdParams: Record<string, string> = {}
        
        // Iterate through all parameters and extract ones starting with 'openid.'
        params.forEach((value, key) => {
            if (key.startsWith('openid.')) {
                openIdParams[key] = value
            }
        })
        
        // Extract the Steam ID from the claimed_id or identity parameter
        let steamId = null
        const claimedId = openIdParams['openid.claimed_id'] || ''
        if (claimedId) {
            // The Steam ID is the last part of the claimed_id URL
            const matches = claimedId.match(/\/id\/(\d+)$/)
            if (matches && matches[1]) {
                steamId = matches[1]
                openIdParams['steamId'] = steamId
            }
        }
        
        setSteamData(openIdParams)
        setLoading(false)
        getFirebaseToken(openIdParams)
    }, [])

    const getFirebaseToken = async (openIdParams: Record<string, string>) => {
        // No point in running without steamData
        if (!openIdParams) {
            console.error("Triggered before steam data was set");
            return;
        }

        const target_function = "https://us-central1-idlemmo.cloudfunctions.net/asil"
        
        // Create a proper object structure instead of using Map
        const requestData = {
            data: {
                claimedId: openIdParams.steamId,
                nonce: openIdParams["openid.response_nonce"],
                assocHandle: openIdParams["openid.assoc_handle"],
                sig: openIdParams["openid.sig"],
                signed: openIdParams["openid.signed"]
            }
        };
        

        try {
            const response = await fetch(target_function, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching Firebase token:", error);
        }
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Steam Login</h1>
            
            {loading ? (
                <p>Loading authentication data...</p>
            ) : steamData ? (
                <div className="bg-slate-100 p-4 rounded-md">
                    <h2 className="text-xl font-semibold mb-2">Authentication Successful</h2>
                    <p className="mb-4">Steam ID: <span className="font-mono">{steamData.steamId}</span></p>
                    
                    <h3 className="text-lg font-semibold mb-2">OpenID Parameters:</h3>
                    <div className="bg-white p-3 rounded overflow-auto max-h-96">
                        <pre className="text-sm">
                            {JSON.stringify(steamData, null, 2)}
                        </pre>
                    </div>
                </div>
            ) : (
                <p className="text-red-500">No authentication data found</p>
            )}
        </div>
    )
}

export default SteamLogin;
