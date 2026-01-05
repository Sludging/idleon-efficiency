"use client"

export interface CodeReqResponse {
    user_code: string
    verification_url: string
    device_code: string
}

export interface PollAuthResponse {
    error?: string
    id_token?: string
}

export class GoogleDeviceLogin {
    static getCode = async (): Promise<CodeReqResponse> => {
        const getCodeRes = await fetch("https://oauth2.googleapis.com/device/code", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: "client_id=267901585099-u6fjd75v6k9gefq7bcokcndv99riir5j&scope=email profile"
          });
        const codeReqRespone = await getCodeRes.json();
        return codeReqRespone;
    }

    static pollForAuth = async (deviceCode: string): Promise<PollAuthResponse | undefined> => {
        const getDeviceResult = `client_id=267901585099-u6fjd75v6k9gefq7bcokcndv99riir5j&client_secret=HzoZF-UKUNfFwBuz4vafwsaR&device_code=${deviceCode}&grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Adevice_code`
        const res = await fetch("https://oauth2.googleapis.com/token", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: getDeviceResult
        })
        const data = await res.json();
        return data;       
    }
}