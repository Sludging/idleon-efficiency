/**
 * SOURCE-ONLY EXCERPT. Not a standalone function or runtime capture.
 * Game version: 1.24 (Halloween_Event).
 * Source: IdleonWikiBot/codefiles/idleon1.24.txt:254547-254659.
 * Captured: 2026-10-27. Contains complete weekly generation sequence.
 */
                                    (s = Math.floor(c.asNumber(a.engine.getGameAttribute("TimeAway").h.GlobalTime) / 604800 + c.asNumber(a.engine.getGameAttribute("WeeklyBoss").h.testinglmao))),
                                    (i.gameAttributes.h.DummyNumber = s),
                                    a.engine.getGameAttribute("OptionsListAccount")[191] != a.engine.getGameAttribute("DummyNumber"))
                                ) {
                                    (5 == a.engine.getGameAttribute("OptionsListAccount")[187] && (this._DN1 = m._customBlock_Dreamstuff("CloudProgressTOTAL,6", 1)),
                                        (a.engine.getGameAttribute("OptionsListAccount")[185] = 0),
                                        (this._GenINFO[28] = a.engine.getGameAttribute("OptionsListAccount")[185]),
                                        (this._WeekHP = a.engine.getGameAttribute("OptionsListAccount")[186] = 0),
                                        (a.engine.getGameAttribute("OptionsListAccount")[187] = 0),
                                        (a.engine.getGameAttribute("OptionsListAccount")[189] = 0),
                                        (a.engine.getGameAttribute("OptionsListAccount")[190] = 0),
                                        (i = a.engine.getGameAttribute("WeeklyBoss").h));
                                    for (var _ = (r = Object.keys(i)).length, o = 0; o < _;)
                                        ((s = r[o++]),
                                            D.contains(a.engine.getGameAttribute("Number2Letter"), s) && ((i = a.engine.getGameAttribute("WeeklyBoss")), (s = "" + s), Object.prototype.hasOwnProperty.call(i.h, s) && delete i.h[s]));
                                }
                                if (
                                    ((a.engine.getGameAttribute("OptionsListAccount")[191] = a.engine.getGameAttribute("DummyNumber")),
                                    u.makeRandom(Math.round(a.engine.getGameAttribute("DummyNumber"))),
                                    this._GenINFO.push(Math.floor(1e3 * u.getRandom())),
                                    (this._DL1 = []),
                                    -1 == c.getCurrentSceneName().indexOf("Tutorial"))
                                )
                                    for (i = 0; 15 > i;)
                                        ((r = i++),
                                            u.makeRandom(Math.round(c.asNumber(this._GenINFO[37]) + 3 * r)),
                                            (this._DN1 = Math.max(0, Math.min(2, Math.floor(3 * u.getRandom())))),
                                            this._DL1.push(c.asNumber(a.engine.getGameAttribute("CustomLists").h.WeeklyBOSS[0 | m._customBlock_WeeklyBoss("BossID", 0)][(this._DN1 + 1) | 0])));
                                for (
                                    this._GenINFO.push(this._DL1),
                                        c.runLater(
                                            100,
                                            function (e) {
                                                50 == a.engine.getGameAttribute("CurrentMap") &&
                                                    60 <= m._customBlock_Summoning("HighestLvPlayer", 0, 0) &&
                                                    ((a.engine.gameAttributes.h.DummyNumber5 = 0),
                                                    (a.engine.gameAttributes.h.DummyText3 = "WeeklyTown"),
                                                    c.createRecycledActor(
                                                        c.getActorType(358),
                                                        Math.round(690 + c.asNumber(a.engine.getGameAttribute("CustomLists").h.WeeklyBOSS[0 | m._customBlock_WeeklyBoss("BossID", 0)][6])),
                                                        Math.round(54 + c.asNumber(a.engine.getGameAttribute("CustomLists").h.WeeklyBOSS[0 | m._customBlock_WeeklyBoss("BossID", 0)][7])),
                                                        1
                                                    ));
                                            },
                                            this.actor
                                        ),
                                        this._GenINFO.push(0),
                                        this._GenINFO.push(0),
                                        this._DL1 = [],
                                        u.makeRandom(Math.round(c.asNumber(this._GenINFO[37]) + 36)),
                                        this._DL1.push(Math.max(0, Math.min(a.engine.getGameAttribute("CustomLists").h.WeeklySHOP[0].length - 1, Math.floor(u.getRandom() * a.engine.getGameAttribute("CustomLists").h.WeeklySHOP[0].length)))),
                                        u.makeRandom(Math.round(c.asNumber(this._GenINFO[37]) + 72)),
                                        this._DL1.push(Math.max(0, Math.min(a.engine.getGameAttribute("CustomLists").h.WeeklySHOP[0].length - 1, Math.floor(u.getRandom() * a.engine.getGameAttribute("CustomLists").h.WeeklySHOP[0].length)))),
                                        this._DN3 = 0;
                                    this._DL1[0] == this._DL1[1];
                                )
                                    ((this._DN3 += 1),
                                        u.makeRandom(Math.round(c.asNumber(this._GenINFO[37]) + this._DN3)),
                                        (this._DL1[1] = Math.max(
                                            0,
                                            Math.min(a.engine.getGameAttribute("CustomLists").h.WeeklySHOP[0].length - 1, Math.floor(u.getRandom() * a.engine.getGameAttribute("CustomLists").h.WeeklySHOP[0].length))
                                        )));
                                for (
                                    u.makeRandom(Math.round(c.asNumber(this._GenINFO[37]) + 10)),
                                        this._DL1.push(Math.max(0, Math.min(a.engine.getGameAttribute("CustomLists").h.WeeklySHOP[1].length - 1, Math.floor(u.getRandom() * a.engine.getGameAttribute("CustomLists").h.WeeklySHOP[1].length)))),
                                        u.makeRandom(Math.round(c.asNumber(this._GenINFO[37]) + 20)),
                                        this._DL1.push(Math.max(0, Math.min(a.engine.getGameAttribute("CustomLists").h.WeeklySHOP[1].length - 1, Math.floor(u.getRandom() * a.engine.getGameAttribute("CustomLists").h.WeeklySHOP[1].length)))),
                                        this._DN3 = 0;
                                    this._DL1[2] == this._DL1[3];
                                )
                                    ((this._DN3 += 71),
                                        u.makeRandom(Math.round(c.asNumber(this._GenINFO[37]) + this._DN3)),
                                        (this._DL1[3] = Math.max(
                                            0,
                                            Math.min(a.engine.getGameAttribute("CustomLists").h.WeeklySHOP[1].length - 1, Math.floor(u.getRandom() * a.engine.getGameAttribute("CustomLists").h.WeeklySHOP[1].length))
                                        )));
                                if (
                                    (this._GenINFO.push(this._DL1),
                                    this._GenINFO.push(0),
                                    (a.engine.gameAttributes.h.DummyNumber2 = 1),
                                    0 >= c.asNumber(a.engine.getGameAttribute("KillsLeft2Advance")[0][0]) && (a.engine.gameAttributes.h.DummyNumber2 = 2),
                                    0 >= c.asNumber(a.engine.getGameAttribute("KillsLeft2Advance")[50][0]) && (a.engine.gameAttributes.h.DummyNumber2 = 3),
                                    0 >= c.asNumber(a.engine.getGameAttribute("KillsLeft2Advance")[100][0]) && (a.engine.gameAttributes.h.DummyNumber2 = 4),
                                    0 >= c.asNumber(a.engine.getGameAttribute("KillsLeft2Advance")[150][0]) && (a.engine.gameAttributes.h.DummyNumber2 = 5),
                                    this._GenINFO.push(Math.max(1, Math.min(10, Math.floor((c.asNumber(this._GenINFO[37]) / 1e3) * (3 + 2 * a.engine.getGameAttribute("DummyNumber2")))))),
                                    this._GenINFO.push(Math.max(1, Math.min(25, Math.floor((c.asNumber(this._GenINFO[37]) / 1e3) * (10 + 4 * a.engine.getGameAttribute("DummyNumber2")))))),
                                    (this._DL1 = []),
                                    this._GenINFO.push(this._DL1),
                                    (this._DL1 = []),
                                    -1 == c.getCurrentSceneName().indexOf("Tutorial"))
                                )
                                    for (i = 0; 15 > i;) {
                                        for (r = i++, this._DL2 = [], s = 0; 3 > s;) {
                                            for (
                                                r = s++,
                                                    this._DN3 += 1e3,
                                                    u.makeRandom(Math.round(c.asNumber(this._GenINFO[37]) + this._DN3)),
                                                    this._DN1 = Math.max(
                                                        0,
                                                        Math.min(a.engine.getGameAttribute("CustomLists").h.WeeklyACTION.length - 1, Math.floor(u.getRandom() * a.engine.getGameAttribute("CustomLists").h.WeeklyACTION.length))
                                                    );
                                                D.contains(this._GenINFO[45], this._DN1);
                                            )
                                                ((this._DN3 += 1e3),
                                                    u.makeRandom(Math.round(c.asNumber(this._GenINFO[37]) + this._DN3)),
                                                    (this._DN1 = Math.max(
                                                        0,
                                                        Math.min(a.engine.getGameAttribute("CustomLists").h.WeeklyACTION.length - 1, Math.floor(u.getRandom() * a.engine.getGameAttribute("CustomLists").h.WeeklyACTION.length))
                                                    )));
                                            (this._DL2.push(this._DN1), this._GenINFO[45].splice(0, 0, this._DN1), 9 < this._GenINFO[45].length && this._GenINFO[45].splice(9, 1));
                                        }
                                        this._DL1.push(this._DL2);
                                    }
