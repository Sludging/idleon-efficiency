/**
 * Game formula snippet — idleon-efficiency formula research.
 * Function: _customBlock_Summoning2 (from scripts.ActorEvents_579)
 * Game version: 1.19 ("Summer_Event")
 * Captured: 2026-08-21 via game-debug-tool (findFunction + toString)
 * Case reference: #343
 */
function (e, t, i) {
                            if ("MeritocBonusz" == e)
                                return "GemShop" == c.getCurrentSceneName() || -1 != c.getCurrentSceneName().indexOf("Tutorial") || "PlayerSelect" == c.getCurrentSceneName()
                                    ? 0
                                    : t == a.engine.getGameAttribute("OptionsListAccount")[453]
                                      ? c.asNumber(a.engine.getGameAttribute("CustomLists").h.NinjaInfo[41][Math.round(1 + 3 * t)]) * m._customBlock_Summoning("MeritocBonuszMulti", 0, 0)
                                      : 0;
                            if ("MeritocCanVote" == e) return 1 == a.engine.getGameAttribute("OptionsListAccount")[472] ? 1 : 0;
                            if ("MeritocBonuszMulti" == e)
                                return 0 >= c.asNumber(a.engine.getGameAttribute("KillsLeft2Advance")[250][0])
                                    ? (1 + m._customBlock_Companions(161) / 100) *
                                          (Math.min(1, Math.max(0.25, 0.25 + m._customBlock_Summoning2("MeritocCanVote", 0, 0))) +
                                              (5 * m._customBlock_Thingies("ClamWorkBonus", 3, 0) +
                                                  (m._customBlock_Companions(39) +
                                                      (m._customBlock_Thingies("LegendPTS_bonus", 24, 0) +
                                                          (p._customBlock_ArcadeBonus(59) + (20 * m._customBlock_Summoning("EventShopOwned", 23, 0) + m._customBlock_SushiStuff("RoG_BonusQTY", 51, 0)))))) /
                                                  100)
                                    : 0;
                            if ("fillerio" == e) return 0;
                            if ("isMasteryUnlocked" == e) return 58 < c.asNumber(a.engine.getGameAttribute("Rift")[0]) || 0.1 < m._customBlock_Companions(87) ? 1 : 0;
                            if ("ExpReqCook" == e) return 100 * Math.pow(2.5, c.asNumber(a.engine.getGameAttribute("CookMaster")[1][0])) * Math.pow(5, Math.max(0, c.asNumber(a.engine.getGameAttribute("CookMaster")[1][0]) - 40));
                            if ("PtsLeftCook_P" == e) {
                                for (e = a.engine.getGameAttribute("DNSM").h.CookMastDN = 0, i = a.engine.getGameAttribute("CookMaster")[2].length; e < i; ) {
                                    var s = e++,
                                        _ = a.engine.getGameAttribute("DNSM"),
                                        o = Math.round(c.asNumber(a.engine.getGameAttribute("DNSM").h.CookMastDN) + c.asNumber(a.engine.getGameAttribute("CookMaster")[2][s]));
                                    _.h.CookMastDN = o;
                                }
                                return Math.max(0, Math.round(c.asNumber(a.engine.getGameAttribute("CookMaster")[1][0]) + (1 + 5 * m._customBlock_Companions(87)) - c.asNumber(a.engine.getGameAttribute("DNSM").h.CookMastDN)));
                            }
                            if ("PtsLeftCook_Y" == e) {
                                for (e = a.engine.getGameAttribute("DNSM").h.CookMastDN = 0, i = a.engine.getGameAttribute("CookMaster")[0].length; e < i; )
                                    ((s = e++),
                                        (_ = a.engine.getGameAttribute("DNSM")),
                                        (o = Math.round(c.asNumber(a.engine.getGameAttribute("DNSM").h.CookMastDN) + c.asNumber(a.engine.getGameAttribute("CookMaster")[0][s]))),
                                        (_.h.CookMastDN = o));
                                return Math.max(
                                    0,
                                    Math.round(
                                        c.asNumber(a.engine.getGameAttribute("CookMaster")[1][0]) +
                                            (1 + 5 * m._customBlock_Companions(87)) +
                                            m._customBlock_ResearchStuff("Grid_Bonus", 190, 1) -
                                            c.asNumber(a.engine.getGameAttribute("DNSM").h.CookMastDN)
                                    )
                                );
                            }
                            if ("ExpRateCook" == e)
                                return (
                                    2 *
                                    (1 + m._customBlock_Summoning2("BonusAmountcook", 0, 99) / 100) *
                                    (1 + m._customBlock_Summoning2("BonusAmountcook", 1, 99) / 100) *
                                    (1 + m._customBlock_Summoning2("BonusAmountcook", 2, 99) / 100) *
                                    (1 + m._customBlock_Summoning2("BonusAmountcook", 4, 99) / 100) *
                                    (1 + m._customBlock_ResearchStuff("Grid_Bonus", 190, 0) / 100) *
                                    (1 + (40 * m._customBlock_GamingStatType("SuperBitType", 68, 0)) / 100) *
                                    (1 + m._customBlock_Summoning2("BonusAmountcook", 5, 99) / 100) *
                                    (1 + 2 * m._customBlock_Companions(87)) *
                                    (1 + m._customBlock_Holes2("Fountain_BonTOT", 2, 17) / 100) *
                                    (1 + (c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchVials.h["7cookmastery"]) + (p._customBlock_ArcadeBonus(69) + p._customBlock_SaltLick(10))) / 100)
                                );
                            if ("BonusMultiCook" == e) return 1 + (100 * c.asNumber(a.engine.getGameAttribute("CookMaster")[0][0 | t])) / (c.asNumber(a.engine.getGameAttribute("CookMaster")[0][0 | t]) + 5) / 100;
                            if ("RankREQcook" == e) return c.asNumber("0 1 5 10 25 100 150 250 500".split(" ")[0 | t]);
                            if ("BonusAmountcook" == e) {
                                if (99 == i) {
                                    if (0 == t) return k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("CookMaster")[1][3])) * m._customBlock_Summoning2("BonusAmountcook", t, 0);
                                    if (1 == t) {
                                        if (((_ = a.engine.getGameAttribute("DNSM")), !Object.prototype.hasOwnProperty.call(_.h, "CkMst_AcLvT")))
                                            for (e = a.engine.getGameAttribute("DNSM").h.CkMst_AcLvT = 0, i = a.engine.getGameAttribute("GetPlayersUsernames").length; e < i; ) {
                                                ((s = e++), (_ = a.engine.getGameAttribute("DNSM")), (o = c.asNumber(a.engine.getGameAttribute("DNSM").h.CkMst_AcLvT)));
                                                var u = a.engine.getGameAttribute("PlayerDATABASE");
                                                ((s = "" + h.string(a.engine.getGameAttribute("GetPlayersUsernames")[s])), (o += c.asNumber(u.h[s].h.Lv0[10])), (_.h.CkMst_AcLvT = o));
                                            }
                                        return Math.max(0, c.asNumber(a.engine.getGameAttribute("DNSM").h.CkMst_AcLvT) - 1e3) * m._customBlock_Summoning2("BonusAmountcook", t, 0);
                                    }
                                    if (2 == t) return Math.max(0, c.asNumber(a.engine.getGameAttribute("Meals")[0][73]) - 75) * m._customBlock_Summoning2("BonusAmountcook", t, 0);
                                    if (3 == t) return (m._customBlock_Summoning2("BonusAmountcook", t, 0) / (25 + m._customBlock_Summoning2("BonusAmountcook", t, 0))) * 250;
                                    if (4 == t) {
                                        if (((_ = a.engine.getGameAttribute("DNSM")), !Object.prototype.hasOwnProperty.call(_.h, "CkMst_RbLvT")))
                                            for (e = a.engine.getGameAttribute("DNSM").h.CkMst_RbLvT = 0, i = a.engine.getGameAttribute("Ribbon").length - 28; e < i; )
                                                ((s = e++),
                                                    (_ = a.engine.getGameAttribute("DNSM")),
                                                    (o = c.asNumber(a.engine.getGameAttribute("DNSM").h.CkMst_RbLvT) + c.asNumber(a.engine.getGameAttribute("Ribbon")[28 + s])),
                                                    (_.h.CkMst_RbLvT = o));
                                        return c.asNumber(a.engine.getGameAttribute("DNSM").h.CkMst_RbLvT) * m._customBlock_Summoning2("BonusAmountcook", t, 0);
                                    }
                                    return (c.asNumber(a.engine.getGameAttribute("CookMaster")[1][0]) + 1) * m._customBlock_Summoning2("BonusAmountcook", t, 0);
                                }
                                return c.asNumber(a.engine.getGameAttribute("CustomLists").h.RandoListo2[8][0 | t]) * c.asNumber(a.engine.getGameAttribute("CookMaster")[2][0 | t]);
                            }
                            return "EnemySpd" == e
                                ? 2 == n.__cast(a.engine.getGameAttribute("PixelHelperActor")[24].behaviors.getBehavior("ActorEvents_623"), xa)._GenINFO[146]
                                    ? 5.7 + Math.floor(m._customBlock_Summoning("OpponentDifficulty", 0, 0) / 50)
                                    : 4 == n.__cast(a.engine.getGameAttribute("PixelHelperActor")[24].behaviors.getBehavior("ActorEvents_623"), xa)._GenINFO[146]
                                      ? 8.2 + Math.floor(m._customBlock_Summoning("OpponentDifficulty", 0, 0) / 50)
                                      : 9 == n.__cast(a.engine.getGameAttribute("PixelHelperActor")[24].behaviors.getBehavior("ActorEvents_623"), xa)._GenINFO[146]
                                        ? (7 + Math.floor(c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[319]) / 25)) *
                                          (1 + -0.4 * m._customBlock_Summoning("EndlessModifierID", 0, 99)) *
                                          (1 + 0.7 * m._customBlock_Summoning("EndlessModifierID", 1, 99))
                                        : 11 == n.__cast(a.engine.getGameAttribute("PixelHelperActor")[24].behaviors.getBehavior("ActorEvents_623"), xa)._GenINFO[146]
                                          ? 0.3
                                          : 7 + Math.floor(m._customBlock_Summoning("OpponentDifficulty", 0, 0) / 50)
                                : "SummRockUnlocked" == e
                                  ? 0 == t ||
                                    (1 == t && 1 <= c.asNumber(a.engine.getGameAttribute("Summon")[0][4])) ||
                                    (2 == t && 1 <= c.asNumber(a.engine.getGameAttribute("Summon")[0][13])) ||
                                    (3 == t && 1 <= c.asNumber(a.engine.getGameAttribute("Summon")[0][23])) ||
                                    (4 == t && 1 <= c.asNumber(a.engine.getGameAttribute("Summon")[0][33])) ||
                                    (5 == t && 1 <= c.asNumber(a.engine.getGameAttribute("Summon")[0][44])) ||
                                    (6 == t && 1 <= c.asNumber(a.engine.getGameAttribute("Summon")[0][53])) ||
                                    (7 == t && 1 == m._customBlock_Spelunk("DoWeHaveLoreN1", 4, 0))
                                      ? 1
                                      : 0
                                  : "EnemyDMG" == e
                                    ? 3 == n.__cast(a.engine.getGameAttribute("PixelHelperActor")[24].behaviors.getBehavior("ActorEvents_623"), xa)._GenINFO[146]
                                        ? 2.2 * (1 + m._customBlock_Summoning("OpponentDifficulty", 0, 0)) * Math.pow(1.11, m._customBlock_Summoning("OpponentDifficulty", 0, 0))
                                        : 1 == n.__cast(a.engine.getGameAttribute("PixelHelperActor")[24].behaviors.getBehavior("ActorEvents_623"), xa)._GenINFO[146]
                                          ? 0.8 * (1 + m._customBlock_Summoning("OpponentDifficulty", 0, 0)) * Math.pow(1.11, m._customBlock_Summoning("OpponentDifficulty", 0, 0))
                                          : 5 == n.__cast(a.engine.getGameAttribute("PixelHelperActor")[24].behaviors.getBehavior("ActorEvents_623"), xa)._GenINFO[146]
                                            ? (1 + m._customBlock_Summoning("OpponentDifficulty", 0, 0)) * Math.pow(1.115, m._customBlock_Summoning("OpponentDifficulty", 0, 0))
                                            : 6 == n.__cast(a.engine.getGameAttribute("PixelHelperActor")[24].behaviors.getBehavior("ActorEvents_623"), xa)._GenINFO[146]
                                              ? (1 + m._customBlock_Summoning("OpponentDifficulty", 0, 0)) * Math.pow(1.13, m._customBlock_Summoning("OpponentDifficulty", 0, 0))
                                              : 9 == n.__cast(a.engine.getGameAttribute("PixelHelperActor")[24].behaviors.getBehavior("ActorEvents_623"), xa)._GenINFO[146]
                                                ? 25e3 * Math.pow(1.12, c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[319])) * (1 + 2 * Math.floor(c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[319]) / 20))
                                                : 10 == n.__cast(a.engine.getGameAttribute("PixelHelperActor")[24].behaviors.getBehavior("ActorEvents_623"), xa)._GenINFO[146]
                                                  ? (1 + m._customBlock_Summoning("OpponentDifficulty", 0, 0)) *
                                                    Math.pow(1.14, m._customBlock_Summoning("OpponentDifficulty", 0, 0)) *
                                                    Math.pow(1.3, Math.floor(Math.min(5, c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[25].behaviors.getBehavior("ActorEvents_670"), Ga)._GenINFO[189]) / 30))) *
                                                    Math.pow(
                                                        1.05,
                                                        Math.floor(
                                                            Math.min(c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[25].behaviors.getBehavior("ActorEvents_670"), Ga)._GenINFO[189]) / 2.31, 60) +
                                                                Math.max(0, (c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[25].behaviors.getBehavior("ActorEvents_670"), Ga)._GenINFO[189]) - 138.6) / 4.91)
                                                        )
                                                    )
                                                  : 11 == n.__cast(a.engine.getGameAttribute("PixelHelperActor")[24].behaviors.getBehavior("ActorEvents_623"), xa)._GenINFO[146]
                                                    ? 0.8 *
                                                      c.asNumber(a.engine.getGameAttribute("CustomLists").h.SummonEnemies[13][0 | m._customBlock_Thingies("SumStoneType", 0, 0)]) *
                                                      Math.pow(4e3, m._customBlock_Thingies("SumStoneTrialz", m._customBlock_Thingies("SumStoneType", 0, 0), 0))
                                                    : (1 + m._customBlock_Summoning("OpponentDifficulty", 0, 0)) * Math.pow(1.11, m._customBlock_Summoning("OpponentDifficulty", 0, 0))
                                    : "EnemyHP" == e
                                      ? 1 == n.__cast(a.engine.getGameAttribute("PixelHelperActor")[24].behaviors.getBehavior("ActorEvents_623"), xa)._GenINFO[146]
                                          ? 2.3 * m._customBlock_Summoning("EnemyDMG", 0, 0)
                                          : 3 == n.__cast(a.engine.getGameAttribute("PixelHelperActor")[24].behaviors.getBehavior("ActorEvents_623"), xa)._GenINFO[146]
                                            ? 0.8 * m._customBlock_Summoning("EnemyDMG", 0, 0)
                                            : 9 == n.__cast(a.engine.getGameAttribute("PixelHelperActor")[24].behaviors.getBehavior("ActorEvents_623"), xa)._GenINFO[146]
                                              ? 2 * m._customBlock_Summoning("EnemyDMG", 0, 0)
                                              : 10 == n.__cast(a.engine.getGameAttribute("PixelHelperActor")[24].behaviors.getBehavior("ActorEvents_623"), xa)._GenINFO[146]
                                                ? 2.5 * m._customBlock_Summoning("EnemyDMG", 0, 0)
                                                : 11 == n.__cast(a.engine.getGameAttribute("PixelHelperActor")[24].behaviors.getBehavior("ActorEvents_623"), xa)._GenINFO[146]
                                                  ? 2 *
                                                    c.asNumber(a.engine.getGameAttribute("CustomLists").h.SummonEnemies[14][0 | m._customBlock_Thingies("SumStoneType", 0, 0)]) *
                                                    Math.pow(4e3, m._customBlock_Thingies("SumStoneTrialz", m._customBlock_Thingies("SumStoneType", 0, 0), 0))
                                                  : (1.5 + c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[24].behaviors.getBehavior("ActorEvents_623"), xa)._GenINFO[146]) / 10) * m._customBlock_Summoning("EnemyDMG", 0, 0)
                                      : "OpponentDifficulty" == e
                                        ? 9 == n.__cast(a.engine.getGameAttribute("PixelHelperActor")[24].behaviors.getBehavior("ActorEvents_623"), xa)._GenINFO[146]
                                            ? 40 + Math.floor(1.5 * c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[319]))
                                            : 10 == n.__cast(a.engine.getGameAttribute("PixelHelperActor")[24].behaviors.getBehavior("ActorEvents_623"), xa)._GenINFO[146]
                                              ? 42 + Math.floor(c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[25].behaviors.getBehavior("ActorEvents_670"), Ga)._GenINFO[189]) / 10)
                                              : c.asNumber(
                                                    a.engine.getGameAttribute("CustomLists").h.SummonEnemies[8][
                                                        0 | c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[24].behaviors.getBehavior("ActorEvents_623"), xa)._GenINFO[132])
                                                    ]
                                                )
                                        : "SummRockEssGen" == e
                                          ? ((_ = a.engine.getGameAttribute("DNSM")),
                                            (o =
                                                (1 + m._customBlock_Summoning("WinBonus", 5, 0) / 100) *
                                                (1 + m._customBlock_Holes("LampBonuses", 2, 2) / 100) *
                                                (1 + m._customBlock_Holes("GambitBonuses", 5, 0) / 100) *
                                                Math.pow(1.4, c.asNumber(a.engine.getGameAttribute("GemItemsPurchased")[137])) *
                                                (1 + m._customBlock_Ninja("PristineBon", 12, 0) / 100) *
                                                (1 + m._customBlock_Holes2("Fountain_BonTOT", 1, 17) / 100) *
                                                (1 + m._customBlock_Holes("MonumentROGbonuses", 1, 4) / 100) *
                                                (1 + (10 * m._customBlock_RiftStuff("RiftSkillBonus,17", 1)) / 100) *
                                                (1 + (m._customBlock_Summoning("SummUpgBonus", 62, 0) * c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[319])) / 100) *
                                                (1 +
                                                    (c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.M10AllCharz) +
                                                        (r._customBlock_MealBonus("zSumEss") + (m._customBlock_GamingStatType("MSA_Bonus", 8, 0) + m._customBlock_Sailing("SlabboBonus", 5, 0)))) /
                                                        100) *
                                                (1 + (5 * p._customBlock_AchieveStatus(372) + 5 * p._customBlock_AchieveStatus(374)) / 100) *
                                                (1 + m._customBlock_Summoning("VotingBonusz", 28, 0) / 100)),
                                            (_.h.SumAllEss = o),
                                            0 == m._customBlock_Summoning("SummRockUnlocked", t, 0)
                                                ? 0
                                                : 0 == t
                                                  ? 10 *
                                                    c.asNumber(a.engine.getGameAttribute("DNSM").h.SumAllEss) *
                                                    (1 + (m._customBlock_Summoning("SummUpgBonus", 65, 0) * c.asNumber(a.engine.getGameAttribute("Lv0")[18])) / 100) *
                                                    (1 + (m._customBlock_Summoning("SummVictories", 0, 0) * m._customBlock_Summoning("SummUpgBonus", 0, 0)) / 100) *
                                                    (1 +
                                                        (c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchVials.h["6WhiteEss"]) +
                                                            (x._customBlock_ArbitraryCode("StatueBonusGiven27") + (p._customBlock_ArcadeBonus(34) + m._customBlock_Summoning("VaultUpgBonus", 83, 0)))) /
                                                            100) *
                                                    (1 + k._customBlock_StampBonusOfTypeX("WhiteEss") / 100)
                                                  : 1 == t
                                                    ? 10 *
                                                      c.asNumber(a.engine.getGameAttribute("DNSM").h.SumAllEss) *
                                                      (1 + (m._customBlock_Summoning("SummUpgBonus", 66, 0) * c.asNumber(a.engine.getGameAttribute("Lv0")[18])) / 100) *
                                                      (1 + c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.A7AllCharz) / 100) *
                                                      (1 + (m._customBlock_Summoning("SummVictories", 1, 0) * m._customBlock_Summoning("SummUpgBonus", 11, 0)) / 100) *
                                                      (1 + m._customBlock_Summoning("SummUpgBonus", 4, 0) / 100) *
                                                      (1 + (k._customBlock_StampBonusOfTypeX("123Ess") + m._customBlock_Summoning("VaultUpgBonus", 87, 0)) / 100)
                                                    : 2 == t
                                                      ? 10 *
                                                        c.asNumber(a.engine.getGameAttribute("DNSM").h.SumAllEss) *
                                                        (1 + (m._customBlock_Summoning("SummUpgBonus", 67, 0) * c.asNumber(a.engine.getGameAttribute("Lv0")[18])) / 100) *
                                                        (1 + c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.Y7) / 100) *
                                                        (1 + (m._customBlock_Summoning("SummVictories", 2, 0) * m._customBlock_Summoning("SummUpgBonus", 18, 0)) / 100) *
                                                        (1 + m._customBlock_Summoning("SummUpgBonus", 13, 0) / 100) *
                                                        (1 + (k._customBlock_StampBonusOfTypeX("123Ess") + m._customBlock_Summoning("VaultUpgBonus", 87, 0)) / 100)
                                                      : 3 == t
                                                        ? 10 *
                                                          c.asNumber(a.engine.getGameAttribute("DNSM").h.SumAllEss) *
                                                          (1 + (m._customBlock_Summoning("SummUpgBonus", 30, 0) * c.asNumber(a.engine.getGameAttribute("Lv0")[18])) / 100) *
                                                          (1 + (m._customBlock_Summoning("SummVictories", 3, 0) * m._customBlock_Summoning("SummUpgBonus", 27, 0)) / 100) *
                                                          (1 + m._customBlock_Summoning("SummUpgBonus", 23, 0) / 100) *
                                                          (1 + (k._customBlock_StampBonusOfTypeX("123Ess") + m._customBlock_Summoning("VaultUpgBonus", 87, 0)) / 100)
                                                        : 4 == t
                                                          ? 10 *
                                                            c.asNumber(a.engine.getGameAttribute("DNSM").h.SumAllEss) *
                                                            (1 + (m._customBlock_Summoning("SummUpgBonus", 40, 0) * c.asNumber(a.engine.getGameAttribute("Lv0")[18])) / 100) *
                                                            (1 + c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.M8AllCharz) / 100) *
                                                            (1 + (m._customBlock_Summoning("SummVictories", 4, 0) * m._customBlock_Summoning("SummUpgBonus", 38, 0)) / 100) *
                                                            (1 + m._customBlock_Summoning("SummUpgBonus", 33, 0) / 100) *
                                                            (1 + (k._customBlock_StampBonusOfTypeX("456Ess") + m._customBlock_Summoning("VaultUpgBonus", 87, 0)) / 100)
                                                          : 5 == t
                                                            ? 10 *
                                                              c.asNumber(a.engine.getGameAttribute("DNSM").h.SumAllEss) *
                                                              (1 + (m._customBlock_Summoning("SummUpgBonus", 52, 0) * c.asNumber(a.engine.getGameAttribute("Lv0")[18])) / 100) *
                                                              (1 + c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.W9AllCharz) / 100) *
                                                              (1 + (m._customBlock_Summoning("SummVictories", 5, 0) * m._customBlock_Summoning("SummUpgBonus", 46, 0)) / 100) *
                                                              (1 + m._customBlock_Summoning("SummUpgBonus", 44, 0) / 100) *
                                                              (1 + (k._customBlock_StampBonusOfTypeX("456Ess") + m._customBlock_Summoning("VaultUpgBonus", 87, 0)) / 100)
                                                            : 6 == t
                                                              ? 10 *
                                                                c.asNumber(a.engine.getGameAttribute("DNSM").h.SumAllEss) *
                                                                (1 + (m._customBlock_Summoning("SummUpgBonus", 58, 0) * c.asNumber(a.engine.getGameAttribute("Lv0")[18])) / 100) *
                                                                (1 + (m._customBlock_Summoning("SummVictories", 6, 0) * m._customBlock_Summoning("SummUpgBonus", 54, 0)) / 100) *
                                                                (1 + m._customBlock_Summoning("SummUpgBonus", 53, 0) / 100) *
                                                                (1 + (k._customBlock_StampBonusOfTypeX("456Ess") + m._customBlock_Summoning("VaultUpgBonus", 87, 0)) / 100)
                                                              : 7 == t && 1 == m._customBlock_Spelunk("DoWeHaveLoreN1", 4, 0)
                                                                ? 10 *
                                                                  c.asNumber(a.engine.getGameAttribute("DNSM").h.SumAllEss) *
                                                                  (1 + (m._customBlock_Summoning("SummUpgBonus", 80, 0) * c.asNumber(a.engine.getGameAttribute("Lv0")[18])) / 100) *
                                                                  (1 + (m._customBlock_Summoning("SummVictories", 7, 0) * m._customBlock_Summoning("SummUpgBonus", 73, 0)) / 100) *
                                                                  (1 + m._customBlock_Summoning("VaultUpgBonus", 87, 0) / 100)
                                                                : 0)
                                          : "UnitTypeDraw" == e
                                            ? c.randomFloat() < 0.07 * (1 + m._customBlock_Summoning("SummUpgBonus", 19, 0) / 100) && 1 <= c.asNumber(a.engine.getGameAttribute("Summon")[0][9])
                                                ? 4
                                                : c.randomFloat() < 0.04 * (1 + m._customBlock_Summoning("SummUpgBonus", 19, 0) / 100) && 1 <= c.asNumber(a.engine.getGameAttribute("Summon")[0][17])
                                                  ? 3
                                                  : c.randomFloat() < 0.05 * (1 + m._customBlock_Summoning("SummUpgBonus", 19, 0) / 100) && 1 <= c.asNumber(a.engine.getGameAttribute("Summon")[0][26])
                                                    ? 5
                                                    : 0.03 > c.randomFloat() && 1 <= c.asNumber(a.engine.getGameAttribute("Summon")[0][36])
                                                      ? 2
                                                      : 0.05 > c.randomFloat() && 1 <= c.asNumber(a.engine.getGameAttribute("Summon")[0][45])
                                                        ? 1
                                                        : 0.04 > c.randomFloat() && 1 <= c.asNumber(a.engine.getGameAttribute("Summon")[0][69])
                                                          ? 6
                                                          : 0.02 > c.randomFloat() && 1 <= c.asNumber(a.engine.getGameAttribute("Summon")[0][71])
                                                            ? 7
                                                            : 0
                                            : "OwlMegafeather" == e
                                              ? c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[262]) > t
                                                  ? 9 == t
                                                      ? c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[262]) - 9
                                                      : 1
                                                  : 0
                                              : "OwlNextUpgReq" == e
                                                ? c.asNumber(
                                                      a.engine.getGameAttribute("CustomLists").h.Owlz[0 | c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[25].behaviors.getBehavior("ActorEvents_670"), Ga)._GenINFO[0])][3]
                                                  )
                                                : "OwlFeatherRate" == e
                                                  ? (1 + 9 * m._customBlock_Summoning("OwlMegafeather", 0, 0)) *
                                                    (1 + m._customBlock_Holes2("Fountain_BonTOT", 0, 18) / 100) *
                                                    (1 + m._customBlock_Summoning("VaultUpgBonus", 21, 0) / 100) *
                                                    (1 + m._customBlock_Summoning2("MeritocBonusz", 12, 0) / 100) *
                                                    (1 + m._customBlock_Holes("GambitBonuses", 8, 0) / 100) *
                                                    (c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[254]) +
                                                        (5 * c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[259]) +
                                                            (2 * m._customBlock_Summoning("OwlMegafeather", 4, 0) * c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[257]) +
                                                                4 * m._customBlock_Summoning("OwlMegafeather", 4, 0) * c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[261])))) *
                                                    (1 + (5 * c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[256])) / 100) *
                                                    Math.pow(3 + 2 * m._customBlock_Summoning("OwlMegafeather", 6, 0), c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[258])) *
                                                    (1 + (c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[264]) * c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[260])) / 100)
                                                  : "OwlBonuses" == e
                                                    ? (-1 != t ? ((_ = a.engine.getGameAttribute("DNSM")), (e = !Object.prototype.hasOwnProperty.call(_.h, "OwlBonus"))) : (e = !0),
                                                      e &&
                                                          ((o = []),
                                                          ((_ = a.engine.getGameAttribute("DNSM")).h.OwlBonus = o),
                                                          a.engine.getGameAttribute("DNSM").h.OwlBonus.push(0),
                                                          a.engine.getGameAttribute("DNSM").h.OwlBonus.push(0),
                                                          a.engine.getGameAttribute("DNSM").h.OwlBonus.push(0),
                                                          a.engine.getGameAttribute("DNSM").h.OwlBonus.push(0),
                                                          a.engine.getGameAttribute("DNSM").h.OwlBonus.push(0),
                                                          a.engine.getGameAttribute("DNSM").h.OwlBonus.push(0),
                                                          (_ = a.engine.getGameAttribute("DNSM")),
                                                          (o =
                                                              100 * m._customBlock_Summoning("OwlMegafeather", 1, 0) +
                                                              (100 * m._customBlock_Summoning("OwlMegafeather", 3, 0) +
                                                                  (100 * m._customBlock_Summoning("OwlMegafeather", 5, 0) +
                                                                      (100 * m._customBlock_Summoning("OwlMegafeather", 7, 0) +
                                                                          (100 * Math.min(1, m._customBlock_Summoning("OwlMegafeather", 9, 0)) + 50 * Math.max(0, m._customBlock_Summoning("OwlMegafeather", 9, 0) - 1)))))),
                                                          (_.h.OwlBonusAll = o),
                                                          (a.engine.getGameAttribute("DNSM").h.OwlBonus[0] =
                                                              5 *
                                                              (1 + m._customBlock_Thingies("LegendPTS_bonus", 26, 0) / 100) *
                                                              (1 + m._customBlock_Companions(51)) *
                                                              (1 + c.asNumber(a.engine.getGameAttribute("DNSM").h.OwlBonusAll) / 100) *
                                                              Math.max(0, Math.ceil(c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[255]) / 6))),
                                                          (a.engine.getGameAttribute("DNSM").h.OwlBonus[1] =
                                                              10 *
                                                              (1 + m._customBlock_Thingies("LegendPTS_bonus", 26, 0) / 100) *
                                                              (1 + m._customBlock_Companions(51)) *
                                                              (1 + c.asNumber(a.engine.getGameAttribute("DNSM").h.OwlBonusAll) / 100) *
                                                              Math.max(0, Math.ceil((c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[255]) - 1) / 6))),
                                                          (a.engine.getGameAttribute("DNSM").h.OwlBonus[2] =
                                                              2 *
                                                              (1 + m._customBlock_Thingies("LegendPTS_bonus", 26, 0) / 100) *
                                                              (1 + m._customBlock_Companions(51)) *
                                                              (1 + c.asNumber(a.engine.getGameAttribute("DNSM").h.OwlBonusAll) / 100) *
                                                              Math.max(0, Math.ceil((c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[255]) - 2) / 6))),
                                                          (a.engine.getGameAttribute("DNSM").h.OwlBonus[3] =
                                                              4 *
                                                              (1 + m._customBlock_Thingies("LegendPTS_bonus", 26, 0) / 100) *
                                                              (1 + m._customBlock_Companions(51)) *
                                                              (1 + c.asNumber(a.engine.getGameAttribute("DNSM").h.OwlBonusAll) / 100) *
                                                              Math.max(0, Math.ceil((c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[255]) - 3) / 6))),
                                                          (a.engine.getGameAttribute("DNSM").h.OwlBonus[4] =
                                                              (1 + m._customBlock_Thingies("LegendPTS_bonus", 26, 0) / 100) *
                                                              (1 + m._customBlock_Companions(51)) *
                                                              (1 + c.asNumber(a.engine.getGameAttribute("DNSM").h.OwlBonusAll) / 100) *
                                                              Math.max(0, Math.ceil((c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[255]) - 4) / 6))),
                                                          (a.engine.getGameAttribute("DNSM").h.OwlBonus[5] =
                                                              2 *
                                                              (1 + m._customBlock_Thingies("LegendPTS_bonus", 26, 0) / 100) *
                                                              (1 + m._customBlock_Companions(51)) *
                                                              (1 + c.asNumber(a.engine.getGameAttribute("DNSM").h.OwlBonusAll) / 100) *
                                                              Math.max(0, Math.ceil((c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[255]) - 5) / 6)))),
                                                      -1 == t ? 0 : a.engine.getGameAttribute("DNSM").h.OwlBonus[0 | t])
                                                    : "OwlFeatherShinyGen" == e
                                                      ? (0 < c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[260]) &&
                                                            1e-6 > c.randomFloat() * (Math.pow(1.1, c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[264])) / Math.max(1, m._customBlock_Summoning("OwlFeatherRate", 0, 0) * t)) &&
                                                            (a.engine.getGameAttribute("OptionsListAccount")[264] = c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[264]) + 1),
                                                        0)
                                                      : "VotingBonusz" == e
                                                        ? "GemShop" == c.getCurrentSceneName()
                                                            ? 0
                                                            : 1 == t
                                                              ? 1 == n.__cast(a.engine.getGameAttribute("PixelHelperActor")[25].behaviors.getBehavior("ActorEvents_670"), Ga)._GenINFO[36] ||
                                                                c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[3].behaviors.getBehavior("ActorEvents_201"), wb)._GenINFO[58]) <
                                                                    c.asNumber(
                                                                        a.engine.getGameAttribute("CustomLists").h.NinjaInfo[38][
                                                                            Math.round(2 + 3 * Math.max(1, c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[25].behaviors.getBehavior("ActorEvents_670"), Ga)._GenINFO[36])))
                                                                        ]
                                                                    )
                                                                  ? c.asNumber(a.engine.getGameAttribute("CustomLists").h.NinjaInfo[38][Math.round(1 + 3 * t)]) * m._customBlock_Summoning("VotingBonuszMulti", 0, 0)
                                                                  : 0
                                                              : t == n.__cast(a.engine.getGameAttribute("PixelHelperActor")[25].behaviors.getBehavior("ActorEvents_670"), Ga)._GenINFO[36]
                                                                ? c.asNumber(a.engine.getGameAttribute("CustomLists").h.NinjaInfo[38][Math.round(1 + 3 * t)]) * m._customBlock_Summoning("VotingBonuszMulti", 0, 0)
                                                                : 0
                                                        : "VotingBonuszMulti" == e
                                                          ? (1 + m._customBlock_Companions(161) / 100) *
                                                            (1 + m._customBlock_Summoning2("MeritocBonusz", 9, 0) / 100) *
                                                            (1 +
                                                                (m._customBlock_Companions(41) +
                                                                    c.asNumber(a.engine.getGameAttribute("Dream")[13]) +
                                                                    (m._customBlock_Holes("CosmoBonusQTY", 2, 3) +
                                                                        (m._customBlock_Summoning("WinBonus", 22, 0) +
                                                                            (17 * m._customBlock_Summoning("EventShopOwned", 7, 0) +
                                                                                13 * m._customBlock_Summoning("EventShopOwned", 16, 0) +
                                                                                (m._customBlock_Companions(19) +
                                                                                    (m._customBlock_GamingStatType("PaletteBonus", 32, 0) +
                                                                                        (m._customBlock_Thingies("LegendPTS_bonus", 22, 0) + m._customBlock_SushiStuff("RoG_BonusQTY", 50, 0)))))))) /
                                                                    100)
                                                          : "VotingButtonColour" == e
                                                            ? 1 == m._customBlock_Summoning("EventShopOwned", 16, 0)
                                                                ? 2
                                                                : 1 == m._customBlock_Summoning("EventShopOwned", 7, 0)
                                                                  ? 1
                                                                  : 0
                                                            : 69;
                        }