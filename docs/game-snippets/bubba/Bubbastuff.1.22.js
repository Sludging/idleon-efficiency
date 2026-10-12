/**
 * Game formula snippet — idleon-efficiency formula research.
 * Function: _customBlock_Bubbastuff (from scripts.ActorEvents_579)
 * Game version: 1.22 ("Jelly_Operator")
 * Captured: 2026-09-20 via game-debug-tool (findFunction + toString)
 * Case reference: correctness case issue 399
 */
function (e, t, i) {
                            if ("HappinessRank" == e) return Math.min(4, k._customBlock_getLOG(Math.pow(Math.max(1, c.asNumber(a.engine.getGameAttribute("Bubba")[0][1]) / 30 + 1), 1.5)));
                            if ("HappinessBonus" == e)
                                return (
                                    1 +
                                    (10 *
                                        (k._customBlock_Log2(c.asNumber(a.engine.getGameAttribute("Bubba")[0][1])) +
                                            25 * k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("Bubba")[0][1])) +
                                            Math.pow(c.asNumber(a.engine.getGameAttribute("Bubba")[0][1]), 0.75))) /
                                        100
                                );
                            if ("MeatsliceRate" == e)
                                return (
                                    (m._customBlock_Bubbastuff("TotUpgBonus", 0, 0) + (m._customBlock_Bubbastuff("TotUpgBonus", 7, 0) + m._customBlock_Bubbastuff("TotUpgBonus", 23, 0))) *
                                    (1 +
                                        (m._customBlock_Bubbastuff("TotUpgBonus", 2, 0) +
                                            (m._customBlock_Bubbastuff("TotUpgBonus", 11, 0) +
                                                (m._customBlock_Bubbastuff("TotUpgBonus", 19, 0) +
                                                    m._customBlock_Bubbastuff("TotUpgBonus", 24, 0) * k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[267]))))) /
                                            100) *
                                    m._customBlock_Bubbastuff("HappinessBonus", 0, 0) *
                                    m._customBlock_Bubbastuff("Dice_Multi", 0, 0) *
                                    m._customBlock_Bubbastuff("SmokeMeat_Multi", 0, 0) *
                                    (1 + m._customBlock_Bubbastuff("CharismaBonus", 0, 0) / 100) *
                                    (1 + m._customBlock_SushiStuff("RoG_BonusQTY", 39, 0) / 100) *
                                    (1 + q._customBlock_JellyOperation("RoG_BonusQTY", 58, 0) / 100) *
                                    (1 + (m._customBlock_Bubbastuff("MegafleshOwned", 0, 0) * m._customBlock_Bubbastuff("TotalQTYofLVs", 0, 0)) / 100) *
                                    (1 + m._customBlock_Bubbastuff("GiftPassiveBonus", 0, 999) / 100) *
                                    m._customBlock_Bubbastuff("SpareCoins_Multi", 0, 0) *
                                    (1 + m._customBlock_Summoning("VaultUpgBonus", 65, 0) / 100) *
                                    (1 + m._customBlock_Holes2("Fountain_BonTOT", 2, 18) / 100)
                                );
                            if ("TotalUpgTypesAvailable" == e) return Math.round(c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[26].behaviors.getBehavior("ActorEvents_713"), ob)._GenINFO[150]));
                            if ("TotalQTYofLVs" == e) {
                                if (((e = a.engine.getGameAttribute("DNSM")), !Object.prototype.hasOwnProperty.call(e.h, "Bubba_LVzAll") || 99 == i))
                                    for (t = a.engine.getGameAttribute("DNSM").h.Bubba_LVzAll = 0; 28 > t;)
                                        ((i = t++),
                                            (e = a.engine.getGameAttribute("DNSM")),
                                            (i = Math.round(c.asNumber(a.engine.getGameAttribute("DNSM").h.Bubba_LVzAll) + (c.asNumber(a.engine.getGameAttribute("Bubba")[1][i]) + c.asNumber(a.engine.getGameAttribute("Bubba")[2][i])))),
                                            (e.h.Bubba_LVzAll = i));
                                return a.engine.getGameAttribute("DNSM").h.Bubba_LVzAll;
                            }
                            if ("MeatProdREQ" == e) return 0 == t ? 0 : 50 * Math.pow(2.8 + t / 3.55, t - Math.min(1, Math.floor(t / 4)));
                            if ("UpgCost" == e)
                                return (
                                    (1 / (1 + m._customBlock_Minehead("BonusQTY", 5, 0) / 100)) *
                                    (1 / (1 + m._customBlock_Bubbastuff("TotUpgBonus", 4, 0) / 100)) *
                                    (1 / (1 + m._customBlock_Bubbastuff("TotUpgBonus", 18, 0) / 100)) *
                                    (1 / (1 + m._customBlock_Bubbastuff("TotUpgBonus", 26, 0) / 100)) *
                                    (1 / (1 + m._customBlock_Bubbastuff("CharismaBonus", 1, 0) / 100)) *
                                    (Math.pow(t + 1, 2) * c.asNumber(a.engine.getGameAttribute("Bubba")[1][0 | t]) +
                                        Math.pow(2.4 + t / 3.65, t) * Math.pow(c.asNumber(a.engine.getGameAttribute("CustomLists").h.BubbaUpg[0 | t][2]), c.asNumber(a.engine.getGameAttribute("Bubba")[1][0 | t]))) *
                                    c.asNumber(a.engine.getGameAttribute("CustomLists").h.BubbaUpg[0 | t][1])
                                );
                            if ("Xupg" == e) return 299 - 47.5 * Math.min(6, m._customBlock_Bubbastuff("TotalUpgTypesAvailable", 0, 0) - 1 - 7 * Math.floor(t / 7)) + 95 * (t - 7 * Math.floor(t / 7));
                            if ("Yupg" == e) return 212 - 36 * Math.floor(Math.max(0, m._customBlock_Bubbastuff("TotalUpgTypesAvailable", 0, 0) - 1) / 7) + 72 * Math.floor(t / 7);
                            if ("RealLV" == e) return Math.round(c.asNumber(a.engine.getGameAttribute("Bubba")[1][0 | t]) + c.asNumber(a.engine.getGameAttribute("Bubba")[2][0 | t]));
                            if ("DoubleLVchancePCT" == e) return m._customBlock_Bubbastuff("GiftPassiveBonus", 5, 999) + m._customBlock_Bubbastuff("CharismaBonus", 4, 0);
                            if ("DailyPetting" == e) return Math.ceil(k._customBlock_Log2(m._customBlock_Bubbastuff("RealLV", 1, 0)) + Math.min(m._customBlock_Bubbastuff("RealLV", 1, 0), 3));
                            if ("DailyPet_HappinessQTY" == e)
                                return (
                                    m._customBlock_Bubbastuff("TotUpgBonus", 1, 0) *
                                    (1 + (m._customBlock_Bubbastuff("TotUpgBonus", 20, 0) + (m._customBlock_Bubbastuff("CharismaBonus", 2, 0) + m._customBlock_Bubbastuff("GiftPassiveBonus", 1, 999))) / 100)
                                );
                            if ("DailyPet_HappinessFromUpg" == e)
                                return (
                                    (Math.min(1, m._customBlock_Bubbastuff("TotUpgBonus", 5, 0)) + (m._customBlock_Bubbastuff("TotUpgBonus", 5, 0) / (m._customBlock_Bubbastuff("TotUpgBonus", 5, 0) + 200)) * 2) *
                                    (1 + (m._customBlock_Bubbastuff("TotUpgBonus", 20, 0) + (m._customBlock_Bubbastuff("CharismaBonus", 2, 0) + m._customBlock_Bubbastuff("GiftPassiveBonus", 1, 999))) / 100)
                                );
                            if ("HappinessLoss" == e) return Math.max(1, c.asNumber(a.engine.getGameAttribute("Bubba")[0][1]) / 13);
                            if ("CharismaTraitSPD" == e) return (1 + m._customBlock_Bubbastuff("TotUpgBonus", 6, 0) / 100) * (1 + m._customBlock_Bubbastuff("GiftPassiveBonus", 2, 999) / 100);
                            if ("CharismaTraitREQ" == e) {
                                for (t = a.engine.getGameAttribute("DNSM").h.Bubba_CharismaTot = 0; 6 > t;)
                                    ((i = t++),
                                        (e = a.engine.getGameAttribute("DNSM")),
                                        (i = Math.round(c.asNumber(a.engine.getGameAttribute("DNSM").h.Bubba_CharismaTot) + c.asNumber(a.engine.getGameAttribute("Bubba")[3][i]))),
                                        (e.h.Bubba_CharismaTot = i));
                                return 20 * (1 + c.asNumber(a.engine.getGameAttribute("DNSM").h.Bubba_CharismaTot) / 20) * Math.pow(1.03, c.asNumber(a.engine.getGameAttribute("DNSM").h.Bubba_CharismaTot));
                            }
                            if ("CharismaBonus" == e)
                                return Math.round(t + 1) == a.engine.getGameAttribute("Bubba")[0][15]
                                    ? 3 * c.asNumber(a.engine.getGameAttribute("Bubba")[3][0 | t]) * c.asNumber(a.engine.getGameAttribute("CustomLists").h.Spelunky[37][0 | t]) * (1 + m._customBlock_Bubbastuff("TotUpgBonus", 13, 0) / 100)
                                    : c.asNumber(a.engine.getGameAttribute("Bubba")[3][0 | t]) * c.asNumber(a.engine.getGameAttribute("CustomLists").h.Spelunky[37][0 | t]) * (1 + m._customBlock_Bubbastuff("TotUpgBonus", 13, 0) / 100);
                            if ("DoWeNeedToSelectGift" == e)
                                return (1 <= m._customBlock_Bubbastuff("GiftSelectionOptions", 0, 0) && 0 == a.engine.getGameAttribute("Bubba")[0][2]) ||
                                    (2 <= m._customBlock_Bubbastuff("GiftSelectionOptions", 0, 0) && 1 == m._customBlock_Bubbastuff("MegafleshOwned", 2, 0) && 0 == a.engine.getGameAttribute("Bubba")[0][3])
                                    ? 1
                                    : 0;
                            if ("GiftSelectionOptions" == e) return Math.min(6, Math.round(m._customBlock_Bubbastuff("TotUpgBonus", 9, 0)));
                            if ("GiftPassiveBonus" == e)
                                return 999 == i && a.engine.getGameAttribute("Bubba")[0][2] != Math.round(t + 1) && a.engine.getGameAttribute("Bubba")[0][3] != Math.round(t + 1)
                                    ? 0
                                    : c.asNumber(a.engine.getGameAttribute("CustomLists").h.Spelunky[41][0 | t]) * Math.min(5, 1 + m._customBlock_Bubbastuff("TotUpgBonus", 17, 0) / 100);
                            if ("Dice_Result" == e)
                                return Math.max(
                                    1,
                                    Math.min(
                                        m._customBlock_Bubbastuff("Dice_MaxSides", 0, 0),
                                        Math.ceil(
                                            m._customBlock_Bubbastuff("Dice_MaxSides", 0, 0) *
                                                Math.pow(c.randomFloat(), Math.max(0.5, 1.4 - (m._customBlock_Bubbastuff("Dice_Luck", 0, 0) / (m._customBlock_Bubbastuff("Dice_Luck", 0, 0) + 200)) * 0.9))
                                        )
                                    )
                                );
                            if ("Dice_Rolled" == e) return Math.round(Math.min(8, Math.max(1, 1 + (m._customBlock_Bubbastuff("TotUpgBonus", 14, 0) + m._customBlock_Bubbastuff("MegafleshOwned", 4, 0)))));
                            if ("Dice_MaxSides" == e) return Math.round(Math.min(20, 6 + m._customBlock_Bubbastuff("TotUpgBonus", 16, 0) + 5 * m._customBlock_Bubbastuff("MegafleshOwned", 4, 0)));
                            if ("Dice_Luck" == e) return m._customBlock_Bubbastuff("CharismaBonus", 3, 0) + (m._customBlock_Bubbastuff("TotUpgBonus", 22, 0) + m._customBlock_Bubbastuff("GiftPassiveBonus", 3, 999));
                            if ("Dice_Multi" == e) {
                                if (((a.engine.getGameAttribute("DNSM").h.Bubba_Dice = 0), 99 == i))
                                    for (t = 0; 8 > t;)
                                        ((i = t++),
                                            0 < c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[26].behaviors.getBehavior("ActorEvents_713"), ob)._GenINFO[152][i]) &&
                                                ((e = a.engine.getGameAttribute("DNSM")),
                                                (i =
                                                    Math.max(1, c.asNumber(a.engine.getGameAttribute("DNSM").h.Bubba_Dice)) *
                                                    (Math.min(c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[26].behaviors.getBehavior("ActorEvents_713"), ob)._GenINFO[152][i]), 6) +
                                                        Math.max(c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[26].behaviors.getBehavior("ActorEvents_713"), ob)._GenINFO[152][i]) - 6, 0) / 2.5)),
                                                (e.h.Bubba_Dice = i)));
                                else
                                    for (t = 0; 8 > t;)
                                        ((i = t++),
                                            0 < c.asNumber(a.engine.getGameAttribute("Bubba")[4][i]) &&
                                                ((e = a.engine.getGameAttribute("DNSM")),
                                                (i =
                                                    Math.max(1, c.asNumber(a.engine.getGameAttribute("DNSM").h.Bubba_Dice)) *
                                                    (Math.min(c.asNumber(a.engine.getGameAttribute("Bubba")[4][i]), 6) + Math.max(c.asNumber(a.engine.getGameAttribute("Bubba")[4][i]) - 6, 0) / 2.5)),
                                                (e.h.Bubba_Dice = i)));
                                return 1 + c.asNumber(a.engine.getGameAttribute("DNSM").h.Bubba_Dice) / 100;
                            }
                            if ("SmokeMeat_Multi" == e) {
                                for (a.engine.getGameAttribute("DNSM").h.Bubba_SM = 1, t = 0; 5 > t;)
                                    ((i = t++),
                                        0 < c.asNumber(a.engine.getGameAttribute("Bubba")[5][i]) &&
                                            ((e = a.engine.getGameAttribute("DNSM")),
                                            (i =
                                                c.asNumber(a.engine.getGameAttribute("DNSM").h.Bubba_SM) *
                                                (1 + (c.asNumber(a.engine.getGameAttribute("Bubba")[5][i]) * c.asNumber(a.engine.getGameAttribute("CustomLists").h.Spelunky[34][i])) / 100)),
                                            (e.h.Bubba_SM = i)));
                                return a.engine.getGameAttribute("DNSM").h.Bubba_SM;
                            }
                            return "SmokeMeat_QTYproduced" == e
                                ? (1 + Math.floor(c.randomFloat() + m._customBlock_Bubbastuff("SmokeMeat_2xChancePCT", 0, 0) / 100)) *
                                      (1 + 9 * Math.min(1, Math.floor(c.randomFloat() + m._customBlock_Bubbastuff("SmokeMeat_10xChancePCT", 0, 0) / 100)))
                                : "SmokeMeat_2xChancePCT" == e
                                  ? m._customBlock_Bubbastuff("TotUpgBonus", 25, 0)
                                  : "SmokeMeat_10xChancePCT" == e
                                    ? m._customBlock_Bubbastuff("GiftPassiveBonus", 4, 999)
                                    : "SpareCoins_Multi" == e
                                      ? 1 +
                                        (c.asNumber(a.engine.getGameAttribute("Bubba")[0][9]) +
                                            (5 * c.asNumber(a.engine.getGameAttribute("Bubba")[0][10]) + (25 * c.asNumber(a.engine.getGameAttribute("Bubba")[0][11]) + 100 * c.asNumber(a.engine.getGameAttribute("Bubba")[0][12])))) /
                                            100
                                      : "SpareCoins_FindChance" == e
                                        ? m._customBlock_Bubbastuff("TotUpgBonus", 21, 0) / 100
                                        : "SpareCoins_QTYfound" == e
                                          ? Math.floor(1 + ((m._customBlock_Bubbastuff("TotUpgBonus", 27, 0) + m._customBlock_Bubbastuff("CharismaBonus", 5, 0)) / 100 + c.randomFloat()))
                                          : "SpareCoins_FoundOne" == e
                                            ? (c.randomFloat() < 0.001 * (1 + m._customBlock_Bubbastuff("MegafleshOwned", 10, 0))
                                                  ? (a.engine.getGameAttribute("Bubba")[0][12] = c.asNumber(a.engine.getGameAttribute("Bubba")[0][12]) + m._customBlock_Bubbastuff("SpareCoins_QTYfound", 0, 0))
                                                  : c.randomFloat() < 0.02 * (1 + m._customBlock_Bubbastuff("MegafleshOwned", 10, 0))
                                                    ? (a.engine.getGameAttribute("Bubba")[0][11] = c.asNumber(a.engine.getGameAttribute("Bubba")[0][11]) + m._customBlock_Bubbastuff("SpareCoins_QTYfound", 0, 0))
                                                    : c.randomFloat() < 0.25 * (1 + m._customBlock_Bubbastuff("MegafleshOwned", 10, 0))
                                                      ? (a.engine.getGameAttribute("Bubba")[0][10] = c.asNumber(a.engine.getGameAttribute("Bubba")[0][10]) + m._customBlock_Bubbastuff("SpareCoins_QTYfound", 0, 0))
                                                      : (a.engine.getGameAttribute("Bubba")[0][9] = c.asNumber(a.engine.getGameAttribute("Bubba")[0][9]) + m._customBlock_Bubbastuff("SpareCoins_QTYfound", 0, 0)),
                                              0)
                                            : "BubbaRoG_Bonuses" == e
                                              ? ((e = a.engine.getGameAttribute("DNSM")),
                                                (i =
                                                    20 * m._customBlock_Bubbastuff("MegafleshOwned", 1, 0) +
                                                    (20 * m._customBlock_Bubbastuff("MegafleshOwned", 3, 0) +
                                                        (20 * m._customBlock_Bubbastuff("MegafleshOwned", 6, 0) + (20 * m._customBlock_Bubbastuff("MegafleshOwned", 9, 0) + 20 * m._customBlock_Bubbastuff("MegafleshOwned", 11, 0))))),
                                                (e.h.Bubba_RoG_all = i),
                                                Math.max(
                                                    0,
                                                    (1 + c.asNumber(a.engine.getGameAttribute("DNSM").h.Bubba_RoG_all) / 100) *
                                                        (1 + m._customBlock_Companions(51)) *
                                                        c.asNumber(a.engine.getGameAttribute("CustomLists").h.Spelunky[33][Math.round(t)]) *
                                                        Math.ceil((c.asNumber(a.engine.getGameAttribute("Bubba")[1][3]) - (t - 1)) / 7)
                                                ))
                                              : "MegafleshOwned" == e
                                                ? c.asNumber(a.engine.getGameAttribute("Bubba")[1][8]) > t
                                                    ? 11 == t
                                                        ? c.asNumber(a.engine.getGameAttribute("Bubba")[1][8]) - 11
                                                        : 1
                                                    : 0
                                                : "TotUpgBonus" == e
                                                  ? m._customBlock_Bubbastuff("RealLV", t, 0) * c.asNumber(a.engine.getGameAttribute("CustomLists").h.BubbaUpg[0 | t][3])
                                                  : "T_FeatureUnlocked" == e
                                                    ? 0 == t
                                                        ? 0.1 <= m._customBlock_Bubbastuff("TotUpgBonus", 1, 0)
                                                            ? 1
                                                            : 0
                                                        : 1 == t
                                                          ? 0.1 <= m._customBlock_Bubbastuff("TotUpgBonus", 6, 0)
                                                              ? 1
                                                              : 0
                                                          : 2 == t
                                                            ? 0.1 <= m._customBlock_Bubbastuff("TotUpgBonus", 9, 0)
                                                                ? 1
                                                                : 0
                                                            : 3 == t
                                                              ? 0.1 <= m._customBlock_Bubbastuff("TotUpgBonus", 12, 0)
                                                                  ? 1
                                                                  : 0
                                                              : 4 == t
                                                                ? 0.1 <= m._customBlock_Bubbastuff("TotUpgBonus", 15, 0)
                                                                    ? 1
                                                                    : 0
                                                                : 5 == t && 0.1 <= m._customBlock_Bubbastuff("TotUpgBonus", 21, 0)
                                                                  ? 1
                                                                  : 0
                                                    : "BubbaUnlocked" == e && 0 >= c.asNumber(a.engine.getGameAttribute("KillsLeft2Advance")[50][0])
                                                      ? 1
                                                      : 0;
                        }