export default class LavaRand {

    seed: number
    seed2: number

    hash = (a: number, b: number = 5381) => {
        a = Math.imul(a, -862048943)
        a = Math.imul((a << 15) | (a >>> 17), 461845907)
        b ^= a
        b = (Math.imul((b << 13) | (b >>> 19), 5) + -430675100) | 0
        b = Math.imul(b ^ (b >> 16), -2048144789);
        b = Math.imul(b ^ (b >> 13), -1028477387);
        return b ^ (b >> 16); 
    }

    inlineHash = (a: number, b: number) => {
        a = Math.imul(a, -862048943);
        a = Math.imul((a << 15) | (a >>> 17), 461845907);
        b ^= a;
        b = (Math.imul((b << 13) | (b >>> 19), 5) + -430675100) | 0;
        b = Math.imul(b ^ (b >> 16), -2048144789);
        b = Math.imul(b ^ (b >> 13), -1028477387);
        return b ^ (b >> 16);
    }

    constructor(seed: number) {
        this.seed = seed;
        this.seed2 = this.hash(seed);
        0 == this.seed && (this.seed = 1);
        0 == this.seed2 && (this.seed2 = 1);
    }

    random = (a: number) => {
        this.seed = 36969 * (this.seed & 65535) + (this.seed >> 16);
        this.seed2 = 18e3 * (this.seed2 & 65535) + (this.seed2 >> 16);
        return ((((this.seed << 16) + this.seed2) | 0) & 1073741823) % a;
    }

    rand =  () => {
        this.seed = 36969 * (this.seed & 65535) + (this.seed >> 16);
        this.seed2 = 18e3 * (this.seed2 & 65535) + (this.seed2 >> 16);
        return (((((this.seed << 16) + this.seed2) | 0) & 1073741823) % 10007) / 10007;
    }

}
            // Kl.prototype = {
                
            //     shuffle: function (a) {
            //         for (var b = a.length, d = 0; d < b; ) {
            //             d++;
            //             this.seed = 36969 * (this.seed & 65535) + (this.seed >> 16);
            //             this.seed2 = 18e3 * (this.seed2 & 65535) + (this.seed2 >> 16);
            //             var e = ((((this.seed << 16) + this.seed2) | 0) & 1073741823) % b;
            //             this.seed = 36969 * (this.seed & 65535) + (this.seed >> 16);
            //             this.seed2 = 18e3 * (this.seed2 & 65535) + (this.seed2 >> 16);
            //             var g = ((((this.seed << 16) + this.seed2) | 0) & 1073741823) % b,
            //                 h = a[e];
            //             a[e] = a[g];
            //             a[g] = h;
            //         }
            //     },
            //     srand: function (a) {
            //         null == a && (a = 1);
            //         this.seed = 36969 * (this.seed & 65535) + (this.seed >> 16);
            //         this.seed2 = 18e3 * (this.seed2 & 65535) + (this.seed2 >> 16);
            //         return (((((this.seed << 16) + this.seed2) | 0) % 10007) / 10007) * a;
            //     },
            //     int: function () {
            //         this.seed = 36969 * (this.seed & 65535) + (this.seed >> 16);
            //         this.seed2 = 18e3 * (this.seed2 & 65535) + (this.seed2 >> 16);
            //         return ((this.seed << 16) + this.seed2) | 0;
            //     },
            //     uint: function () {
            //         this.seed = 36969 * (this.seed & 65535) + (this.seed >> 16);
            //         this.seed2 = 18e3 * (this.seed2 & 65535) + (this.seed2 >> 16);
            //         return (((this.seed << 16) + this.seed2) | 0) & 1073741823;
            //     },
            //     __class__: Kl,
            // };