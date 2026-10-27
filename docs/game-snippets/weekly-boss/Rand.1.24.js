/**
 * Source-only game evidence; not a runtime capture.
 * Complete Rand class definition and prototype.
 * Game version: 1.24 (Halloween_Event).
 * Source: IdleonWikiBot/codefiles/idleon1.24.txt:1313-1378.
 * Captured: 2026-10-27. Runtime assets independently report 1.24.
 */
                    var cc = function (e) {
                        this.init(e);
                    };
                    ((A.Rand = cc),
                        (cc.__name__ = "Rand"),
                        (cc.hash = function (e, t) {
                            return (
                                null == t && (t = 5381),
                                (e = ag._mul(e, -862048943)),
                                (t ^= e = ag._mul((e << 15) | (e >>> 17), 461845907)),
                                (t = (ag._mul((t << 13) | (t >>> 19), 5) + -430675100) | 0),
                                (t = ag._mul(t ^ (t >> 16), -2048144789)),
                                (t = ag._mul(t ^ (t >> 13), -1028477387)) ^ (t >> 16)
                            );
                        }),
                        (cc.inlineHash = function (e, t) {
                            return (
                                (e = ag._mul(e, -862048943)),
                                (t ^= e = ag._mul((e << 15) | (e >>> 17), 461845907)),
                                (t = (ag._mul((t << 13) | (t >>> 19), 5) + -430675100) | 0),
                                (t = ag._mul(t ^ (t >> 16), -2048144789)),
                                (t = ag._mul(t ^ (t >> 13), -1028477387)) ^ (t >> 16)
                            );
                        }),
                        (cc.prototype = {
                            seed: null,
                            seed2: null,
                            init: function (e) {
                                ((this.seed = e), (this.seed2 = cc.hash(e)), 0 == this.seed && (this.seed = 1), 0 == this.seed2 && (this.seed2 = 1));
                            },
                            random: function (e) {
                                return ((this.seed = 36969 * (65535 & this.seed) + (this.seed >> 16)), (this.seed2 = 18e3 * (65535 & this.seed2) + (this.seed2 >> 16)), (1073741823 & (((this.seed << 16) + this.seed2) | 0)) % e);
                            },
                            shuffle: function (e) {
                                for (var t = e.length, i = 0; i < t;) {
                                    (i++, (this.seed = 36969 * (65535 & this.seed) + (this.seed >> 16)), (this.seed2 = 18e3 * (65535 & this.seed2) + (this.seed2 >> 16)));
                                    var n = (1073741823 & (((this.seed << 16) + this.seed2) | 0)) % t;
                                    ((this.seed = 36969 * (65535 & this.seed) + (this.seed >> 16)), (this.seed2 = 18e3 * (65535 & this.seed2) + (this.seed2 >> 16)));
                                    var a = (1073741823 & (((this.seed << 16) + this.seed2) | 0)) % t,
                                        s = e[n];
                                    ((e[n] = e[a]), (e[a] = s));
                                }
                            },
                            rand: function () {
                                return (
                                    (this.seed = 36969 * (65535 & this.seed) + (this.seed >> 16)),
                                    (this.seed2 = 18e3 * (65535 & this.seed2) + (this.seed2 >> 16)),
                                    ((1073741823 & (((this.seed << 16) + this.seed2) | 0)) % 10007) / 10007
                                );
                            },
                            srand: function (e) {
                                return (
                                    null == e && (e = 1),
                                    (this.seed = 36969 * (65535 & this.seed) + (this.seed >> 16)),
                                    (this.seed2 = 18e3 * (65535 & this.seed2) + (this.seed2 >> 16)),
                                    (((((this.seed << 16) + this.seed2) | 0) % 10007) / 10007) * e
                                );
                            },
                            int: function () {
                                return ((this.seed = 36969 * (65535 & this.seed) + (this.seed >> 16)), (this.seed2 = 18e3 * (65535 & this.seed2) + (this.seed2 >> 16)), ((this.seed << 16) + this.seed2) | 0);
                            },
                            uint: function () {
                                return ((this.seed = 36969 * (65535 & this.seed) + (this.seed >> 16)), (this.seed2 = 18e3 * (65535 & this.seed2) + (this.seed2 >> 16)), 1073741823 & (((this.seed << 16) + this.seed2) | 0));
                            },
                            __class__: cc,
                        }));
