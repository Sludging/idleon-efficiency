export class Stat {
    max?: number
    value: number = 0
    sources: {
        name: string,
        value: number
    }[] = []

    constructor(public name: string, public suffix?: string, public prefix?: string) {}
}