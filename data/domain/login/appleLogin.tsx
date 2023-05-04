export interface CodeReqResponse {
    user_code: string
    verification_url: string
    device_code: string
}

export interface PollAuthResponse {
    error?: string
    id_token?: string
}

declare const window: Window &
    typeof globalThis & {
        AppleID: any
    }


export class AppleLogin {
    static initAuth = () => {
        if (window.AppleID !== 'undefined') {
            window.AppleID.auth.init({
                clientId : 'com.lavaflame.idleon.service.signin',
                redirectURI : 'https://www.idleonefficiency.com',
                usePopup : true,
            });
        }

        document.addEventListener("AppleIDSignInOnSuccess", (event) => {
            console.log(event);
        });
        
        document.addEventListener("AppleIDSignInOnFailure", (event) => {
             console.log(event);
        });
    }

    static signIn = async () => {
        if (window.AppleID !== 'undefined') {
            try {
                const signInResult = await window.AppleID.auth.signIn();
                console.log(signInResult);
            } catch (e) {
                console.error(e);
            }
        }

        // const params = new URLSearchParams({
        //     client_id: "com.lavaflame.idleon.service.signin",
        //     redirect_uri: "https://us-central1-idlemmo.cloudfunctions.net/xapsi",
        //     response_mode: "fragment",
        //     response_type: "code id_token",
        //   })
        // const windowRes = window.open(`https://appleid.apple.com/auth/authorize?${params.toString()}`, '_blank', 'popup');
        // console.log(windowRes);
        // console.log(windowRes?.location);
    }
}