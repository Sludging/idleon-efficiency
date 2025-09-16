export class Stat {
    max?: number
    value: number = 0
    sources: {
        name: string,
        value: number | string
        format?: string
    }[] = []

    constructor(public name: string, public suffix?: string, public prefix?: string) {}
}
