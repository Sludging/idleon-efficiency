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
                redirectURI : 'https://preview.idleonefficiency.com',
                usePopup : true,
            });
        }
    }

    static signIn = async (): Promise<string> => {
        if (window.AppleID !== 'undefined') {
            try {
                const signInResult = await window.AppleID.auth.signIn();
                console.log(signInResult);
                return signInResult.authorization.id_token as string;
            } catch (e) {
                console.error(e);
                throw e
            }
        }

        throw Error("Missing Apple script, login failed.");
    }
}