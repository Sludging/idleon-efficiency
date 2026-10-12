/**
 * Game formula snippet — idleon-efficiency formula research.
 * Function: _customBlock_PlayerHPmax (from scripts.ActorEvents_12)
 * Game version: 1.22 ("Jelly_Operator")
 * Captured: 2026-09-24 via game-debug-tool (findFunction + toString)
 * Case reference: #356
 */
function () {
                            if (-1 != p._customBlock_Dungon()) return p._customBlock_DungeonStat("HP");
                            if (1 == m._customBlock_Summoning("GrimoireWraith", 0, 0)) return m._customBlock_Summoning("Grimoire_HP", 0, 0);
                            if (1 == m._customBlock_Windwalker("CompassTempest", 0, 0)) return m._customBlock_Windwalker("Compass_HP", 0, 0);
                            var e = a.engine.getGameAttribute("DummyNumbersStatManager"),
                                t = [];
                            return (
                                (e.h.PlayerHPmaxLIST = t),
                                (a.engine.getGameAttribute("DummyNumbersStatManager").h.PlayerHPmaxDN = 0),
                                (e = a.engine.getGameAttribute("DummyNumbersStatManager")),
                                (t = c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.PlayerHPmaxDN) + (q._customBlock_TotalFoodBonuses("HpBaseBoosts") + x._customBlock_ArbitraryCode("StatueBonusGiven4"))),
                                (e.h.PlayerHPmaxDN = t),
                                a.engine
                                    .getGameAttribute("DummyNumbersStatManager")
                                    .h.PlayerHPmaxLIST.push(
                                        15 +
                                            w._customBlock_CardBonusREAL(1) +
                                            c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.BaseHP) +
                                            (k._customBlock_StampBonusOfTypeX("BaseHP") + c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.PlayerHPmaxDN)) +
                                            (c.asNumber(a.engine.getGameAttribute("DNSM").h.BoxRewards.h.baseHP) +
                                                (k._customBlock_GetTalentNumber(1, 0) + k._customBlock_GetTalentNumber(1, 642)) +
                                                Math.pow(x._customBlock_TotalStats("STR") * (1 + k._customBlock_GetTalentNumber(1, 95) / 100), 1.05))
                                    ),
                                (a.engine.getGameAttribute("DummyNumbersStatManager").h.PlayerHPmaxDN = 0),
                                a.engine
                                    .getGameAttribute("DummyNumbersStatManager")
                                    .h.PlayerHPmaxLIST.push(
                                        (1 + (k._customBlock_GetTalentNumber(1, 92) + (k._customBlock_GetTalentNumber(1, 272) + w._customBlock_EtcBonuses("15"))) / 100) *
                                            (1 + p._customBlock_Shrine(1) / 100) *
                                            q._customBlock_GoldFoodBonuses("MaxHPpct") *
                                            (1 + c.asNumber(a.engine.getGameAttribute("DNSM").h.BoxRewards.h.pctHP) / 100) *
                                            (1 - x._customBlock_GetBuffBonuses(108, 1) / 100) *
                                            (1 + (c.asNumber(a.engine.getGameAttribute("DNSM").h.FamBonusQTYs.h[18]) + w._customBlock_CardBonusREAL(8)) / 100) *
                                            (1 + c.asNumber(a.engine.getGameAttribute("DNSM").h.StarSigns.h.TotalHP) / 100)
                                    ),
                                a.engine.getGameAttribute("DummyNumbersStatManager").h.PlayerHPmaxLIST.push(1),
                                19 < a.engine.getGameAttribute("CurrentMap") && 24 > a.engine.getGameAttribute("CurrentMap") && (a.engine.getGameAttribute("DummyNumbersStatManager").h.PlayerHPmaxLIST[2] = 164),
                                0 == a.engine.getGameAttribute("QuestComplete").h.Cactolyte3 &&
                                    2 == a.engine.getGameAttribute("CharacterClass") &&
                                    1 <= c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[0].behaviors.getBehavior("ActorEvents_29"), C)._ItemsOwnedMap.h.Quest47) &&
                                    ((a.engine.getGameAttribute("DummyNumbersStatManager").h.PlayerHPmaxLIST[0] = 1),
                                    (a.engine.getGameAttribute("DummyNumbersStatManager").h.PlayerHPmaxLIST[1] = 1),
                                    (a.engine.getGameAttribute("DummyNumbersStatManager").h.PlayerHPmaxLIST[2] = 1)),
                                c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.PlayerHPmaxLIST[0]) *
                                    c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.PlayerHPmaxLIST[1]) *
                                    c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.PlayerHPmaxLIST[2])
                            );
                        }
