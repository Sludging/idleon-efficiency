/**
 * Game formula snippet — idleon-efficiency formula research.
 * Function: _customBlock_RiftStuff (from ActorEvents_579)
 * Game version: 1.21 ("World_7_Taskmaster")
 * Captured: 2026-09-10 via game-debug-tool (findFunction + toString)
 * Case reference: #383
 */
function (e, t) {
                            if ("Mob" == e) return c.asNumber(a.engine.getGameAttribute("Rift")[0]) - 70 * Math.floor(c.asNumber(a.engine.getGameAttribute("Rift")[0]) / 70);
                            if ("mobHP" == e)
                                return (
                                    5e6 *
                                    Math.pow(
                                        1.11 +
                                            0.02 * Math.min(1, c.asNumber(a.engine.getGameAttribute("Rift")[0]) / 10) +
                                            (0.08 * Math.min(1, Math.max(0, c.asNumber(a.engine.getGameAttribute("Rift")[0]) - 10) / 20) + 0.18 * Math.min(1, Math.max(0, c.asNumber(a.engine.getGameAttribute("Rift")[0]) - 20) / 23)),
                                        c.asNumber(a.engine.getGameAttribute("Rift")[0])
                                    )
                                );
                            if ("Task" == e)
                                return c.asNumber(a.engine.getGameAttribute("CustomLists").h.RiftStuff[4][(c.asNumber(a.engine.getGameAttribute("Rift")[0]) - 100 * Math.floor(c.asNumber(a.engine.getGameAttribute("Rift")[0]) / 100)) | 0]);
                            if ("HoopsRewardType" == e) return 40 > c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[21].behaviors.getBehavior("ActorEvents_510"), dc)._GenINFO[99]) ? 0 : 6;
                            if ("KillroyXtra" == e) return 50 > c.asNumber(a.engine.getGameAttribute("Rift")[0]) ? 0 : 1;
                            if ("KillroyXtra2" == e) return 1 == m._customBlock_RiftStuff("KillroyXtra", 0) && 3 <= c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[466]) ? 1 : 0;
                            if ("5starCards" == e) return 45 > c.asNumber(a.engine.getGameAttribute("Rift")[0]) ? 0 : 1;
                            if ("RiftCompleted" == e) return c.asNumber(a.engine.getGameAttribute("Rift")[1]) >= c.asNumber(a.engine.getGameAttribute("CustomLists").h.RiftStuff[5][0 | m._customBlock_RiftStuff("Task", 0)]) ? 1 : 0;
                            if ("mobRespBase" == e) return 45;
                            if ("enabledStarSigns" == e) return 10 > c.asNumber(a.engine.getGameAttribute("Rift")[0]) ? 0 : 5 + p._customBlock_Breeding("ShinyBonusS", "Nah", 3, -1);
                            if ("gildedStampChance" == e)
                                return 25 > c.asNumber(a.engine.getGameAttribute("Rift")[0]) ? 0 : c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[8].behaviors.getBehavior("ActorEvents_481"), na)._GenINFO[106]) / 1e4;
                            if ("KillroyDMG" == e) {
                                var i = a.engine.getGameAttribute("DNSM");
                                if (!Object.prototype.hasOwnProperty.call(i.h, "KilRoDmg")) {
                                    for (e = a.engine.getGameAttribute("DNSM").h.KilRoDmg = 0, t = a.engine.getGameAttribute("CustomLists").h.DeathNoteMobs.length; e < t;) {
                                        var s = e++;
                                        ((a.engine.gameAttributes.h.DummyNumber3 = s), (s = 0));
                                        for (var r = a.engine.getGameAttribute("CustomLists").h.DeathNoteMobs[0 | a.engine.getGameAttribute("DummyNumber3")].length; s < r;) {
                                            var _ = s++;
                                            i = a.engine.getGameAttribute("DNSM");
                                            var o = c.asNumber(a.engine.getGameAttribute("DNSM").h.KilRoDmg),
                                                u = a.engine.getGameAttribute("KRbest");
                                            ((_ = "" + h.string(a.engine.getGameAttribute("CustomLists").h.DeathNoteMobs[0 | a.engine.getGameAttribute("DummyNumber3")][_])), (o += c.asNumber(u.h[_])), (i.h.KilRoDmg = o));
                                        }
                                    }
                                    ((i = a.engine.getGameAttribute("DNSM")), (o = Math.floor(Math.pow(c.asNumber(a.engine.getGameAttribute("DNSM").h.KilRoDmg), 0.4))), (i.h.KilRoDmg = o));
                                }
                                return a.engine.getGameAttribute("DNSM").h.KilRoDmg;
                            }
                            if ("eclipseSkulls" == e) {
                                if (((i = a.engine.getGameAttribute("DNSM")), !Object.prototype.hasOwnProperty.call(i.h, "EclipseSk")))
                                    for (e = a.engine.getGameAttribute("DNSM").h.EclipseSk = 0; 6 > e;)
                                        for (
                                            s = e++,
                                                a.engine.getGameAttribute("DNSM").h["5secDN"] = s,
                                                t = 0,
                                                s = a.engine.getGameAttribute("CustomLists").h.DeathNoteMobs[0 | c.asNumber(a.engine.getGameAttribute("DNSM").h["5secDN"])].length;
                                            t < s;
                                        ) {
                                            if (
                                                ((_ = t++),
                                                (i = a.engine),
                                                (o = a.engine
                                                    .getGameAttribute("CustomLists")
                                                    .h.MapAFKtarget.indexOf(a.engine.getGameAttribute("CustomLists").h.DeathNoteMobs[0 | c.asNumber(a.engine.getGameAttribute("DNSM").h["5secDN"])][_])),
                                                (i.gameAttributes.h.DummyNumber3 = o),
                                                (a.engine.gameAttributes.h.DummyNumber4 = 0),
                                                0 <= a.engine.getGameAttribute("DummyNumber3"))
                                            )
                                                for (
                                                    i = a.engine,
                                                        o =
                                                            c.asNumber(a.engine.getGameAttribute("CustomLists").h.MapDetails[0 | a.engine.getGameAttribute("DummyNumber3")][0][0]) -
                                                            c.asNumber(a.engine.getGameAttribute("KillsLeft2Advance")[0 | a.engine.getGameAttribute("DummyNumber3")][0]),
                                                        i.gameAttributes.h.DummyNumber4 = o,
                                                        i = a.engine.getGameAttribute("PlayerDATABASE").h,
                                                        u = (o = Object.keys(i)).length,
                                                        r = 0;
                                                    r < u;
                                                )
                                                    ((i = o[r++]),
                                                        a.engine.getGameAttribute("UserInfo")[0] != i &&
                                                            ((_ = a.engine),
                                                            (i =
                                                                a.engine.getGameAttribute("DummyNumber4") +
                                                                (c.asNumber(a.engine.getGameAttribute("CustomLists").h.MapDetails[0 | a.engine.getGameAttribute("DummyNumber3")][0][0]) -
                                                                    c.asNumber(a.engine.getGameAttribute("PlayerDATABASE").h["" + i].h.KillsLeft2Advance[0 | a.engine.getGameAttribute("DummyNumber3")][0]))),
                                                            (_.gameAttributes.h.DummyNumber4 = i)));
                                            15 <= p._customBlock_WorkbenchStuff("DeathNoteRank", a.engine.getGameAttribute("DummyNumber4"), 0) &&
                                                ((i = a.engine.getGameAttribute("DNSM")), (o = Math.round(c.asNumber(a.engine.getGameAttribute("DNSM").h.EclipseSk) + 1)), (i.h.EclipseSk = o));
                                        }
                                return 5 * c.asNumber(a.engine.getGameAttribute("DNSM").h.EclipseSk);
                            }
                            if ("riftBonus" == e) return c.asNumber(a.engine.getGameAttribute("Rift")[0]) >= 5 * (t + 1) ? 1 : 0;
                            if ("skillLvRanks" == e) {
                                for (o = [], (i = a.engine.getGameAttribute("DNSM")).h.skillLvTotals = o, o = [], (i = a.engine.getGameAttribute("DNSM")).h.skillLvRanks = o, e = 0; 24 > e;) {
                                    for (s = e++, a.engine.getGameAttribute("DNSM").h.skillLvRanksDN = 0, a.engine.getGameAttribute("DNSM").h.skillLvRanksDN2 = s, t = 0, s = a.engine.getGameAttribute("GetPlayersUsernames").length; t < s;)
                                        ((_ = t++),
                                            (i = a.engine.getGameAttribute("DNSM")),
                                            (o = c.asNumber(a.engine.getGameAttribute("DNSM").h.skillLvRanksDN)),
                                            (u = a.engine.getGameAttribute("PlayerDATABASE")),
                                            (_ = "" + h.string(a.engine.getGameAttribute("GetPlayersUsernames")[_])),
                                            (o += c.asNumber(u.h[_].h.Lv0[(c.asNumber(a.engine.getGameAttribute("DNSM").h.skillLvRanksDN2) + 1) | 0])),
                                            (i.h.skillLvRanksDN = o));
                                    (a.engine.getGameAttribute("DNSM").h.skillLvTotals.push(a.engine.getGameAttribute("DNSM").h.skillLvRanksDN),
                                        150 > c.asNumber(a.engine.getGameAttribute("DNSM").h.skillLvRanksDN)
                                            ? (a.engine.getGameAttribute("DNSM").h.skillLvRanksDN2 = 0)
                                            : 200 > c.asNumber(a.engine.getGameAttribute("DNSM").h.skillLvRanksDN)
                                              ? (a.engine.getGameAttribute("DNSM").h.skillLvRanksDN2 = 1)
                                              : 300 > c.asNumber(a.engine.getGameAttribute("DNSM").h.skillLvRanksDN)
                                                ? (a.engine.getGameAttribute("DNSM").h.skillLvRanksDN2 = 2)
                                                : 400 > c.asNumber(a.engine.getGameAttribute("DNSM").h.skillLvRanksDN)
                                                  ? (a.engine.getGameAttribute("DNSM").h.skillLvRanksDN2 = 3)
                                                  : 500 > c.asNumber(a.engine.getGameAttribute("DNSM").h.skillLvRanksDN)
                                                    ? (a.engine.getGameAttribute("DNSM").h.skillLvRanksDN2 = 4)
                                                    : 750 > c.asNumber(a.engine.getGameAttribute("DNSM").h.skillLvRanksDN)
                                                      ? (a.engine.getGameAttribute("DNSM").h.skillLvRanksDN2 = 5)
                                                      : 1e3 > c.asNumber(a.engine.getGameAttribute("DNSM").h.skillLvRanksDN)
                                                        ? (a.engine.getGameAttribute("DNSM").h.skillLvRanksDN2 = 6)
                                                        : (a.engine.getGameAttribute("DNSM").h.skillLvRanksDN2 = 7),
                                        a.engine.getGameAttribute("DNSM").h.skillLvRanks.push(a.engine.getGameAttribute("DNSM").h.skillLvRanksDN2));
                                }
                                return 0;
                            }
                            if (0 == e.indexOf("RiftSkillBonus"))
                                return (
                                    (i = a.engine.getGameAttribute("DNSM")),
                                    Object.prototype.hasOwnProperty.call(i.h, "skillLvRanks") || ((i = a.engine.getGameAttribute("DNSM")), (o = m._customBlock_RiftStuff("skillLvRanks", 0)), (i.h.skillLvRanksDN2 = o)),
                                    15 > c.asNumber(a.engine.getGameAttribute("Rift")[0]) ? 0 : c.asNumber(a.engine.getGameAttribute("DNSM").h.skillLvRanks[0 | c.asNumber(e.split(",")[1])]) > t ? 1 : 0
                                );
                            if ("RiftSkillETC" == e) {
                                for (a.engine.getGameAttribute("DNSM").h.skillLvRanksDN2 = 7, e = 0; 18 > e;)
                                    ((s = e++),
                                        1 == t
                                            ? ((i = a.engine.getGameAttribute("DNSM")),
                                              (o = c.asNumber(a.engine.getGameAttribute("DNSM").h.skillLvRanksDN2) + 10 * m._customBlock_RiftStuff("RiftSkillBonus," + s, Math.round(t + 2))),
                                              (i.h.skillLvRanksDN2 = o))
                                            : 3 == t
                                              ? ((u = a.engine.getGameAttribute("DNSM")),
                                                (o = c.asNumber(a.engine.getGameAttribute("DNSM").h.skillLvRanksDN2) + m._customBlock_RiftStuff("RiftSkillBonus," + s, Math.round(t + 2))),
                                                (u.h.skillLvRanksDN2 = o))
                                              : 4 == t
                                                ? ((o = a.engine.getGameAttribute("DNSM")),
                                                  (i = c.asNumber(a.engine.getGameAttribute("DNSM").h.skillLvRanksDN2) + 25 * m._customBlock_RiftStuff("RiftSkillBonus," + s, Math.round(t + 2))),
                                                  (o.h.skillLvRanksDN2 = i))
                                                : 0 != s &&
                                                  2 != s &&
                                                  3 != s &&
                                                  5 != s &&
                                                  6 != s &&
                                                  8 != s &&
                                                  8 != s &&
                                                  ((i = a.engine.getGameAttribute("DNSM")),
                                                  (o = c.asNumber(a.engine.getGameAttribute("DNSM").h.skillLvRanksDN2) + 5 * m._customBlock_RiftStuff("RiftSkillBonus," + s, Math.round(t + 2))),
                                                  (i.h.skillLvRanksDN2 = o)));
                                return a.engine.getGameAttribute("DNSM").h.skillLvRanksDN2;
                            }
                            return 0;
                        }
