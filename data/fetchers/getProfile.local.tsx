"use client"

import data from '@local-save';

export const fetcher = async (profileName: string): Promise<{ data: Map<string, any> | undefined, charNames: string[] | undefined, domain: string }> => {
    if (profileName !== "") {
        const jsonData = JSON.parse(JSON.stringify(data));
        const charNames = jsonData["playerNames"] ?? [...Array(10)].map((_, index) => `Player_${index}`);
        return {
            data: jsonData as Map<string, any>,
            charNames,
            domain: profileName
        };
    }

    return { data: new Map(), charNames: undefined, domain: "" };
};
