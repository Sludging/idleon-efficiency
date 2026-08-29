/**
 * Game formula snippet — idleon-efficiency formula research.
 * Function: _customBlock_Minehead (from scripts.ActorEvents_579)
 * Game version: 1.20 ("Royal_Guardian")
 * Captured: 2026-08-27 via game-debug-tool (findFunction + toString)
 * Case reference: #359
 */
function (e, t, i) {
                            if ("UpgLvREQ" == e) return 1 + (3 * t + (Math.floor(t / 3) + Math.floor(t / 11)));
                            if ("UpgCost" == e)
                                return (
                                    (5 + t + Math.pow(Math.max(0, t - 2), 1.3)) *
                                    Math.pow(2, Math.max(0, t - 4)) *
                                    Math.pow(Math.max(1, u.getServerVarLoad("A_MineCost")), Math.max(0, t - 9)) *
                                    (1 / (1 + m._customBlock_Minehead("UpgradeQTY", 26, 0) / 100)) *
                                    Math.max(0.1, 1 - Math.max(m._customBlock_SushiStuff("RoG_BonusQTY", 1, 0), m._customBlock_SushiStuff("RoG_BonusQTY", 16, 0)) / 100) *
                                    Math.pow(c.asNumber(a.engine.getGameAttribute("CustomLists").h.MineheadUPG[0 | t][2]), c.asNumber(a.engine.getGameAttribute("Research")[8][0 | t]))
                                );
                            if ("DailyTries" == e) return Math.round(3 + m._customBlock_ResearchStuff("Grid_Bonus", 147, 1));
                            if ("MaxHP_You" == e) return Math.round(3 + m._customBlock_Minehead("UpgradeQTY", 6, 0));
                            if ("MaxHP_Opp" == e)
                                return (
                                    (5 + (2 * t + Math.pow(t, 2))) *
                                    Math.pow(1.8, t) *
                                    Math.pow(1.85, Math.floor(Math.max(0, t - 4) / 3)) *
                                    Math.pow(4, Math.floor(Math.max(0, t - 5) / 7)) *
                                    Math.pow(Math.max(1, u.getServerVarLoad("A_MineHP")), Math.max(0, t - 9))
                                );
                            if ("Mines_Opp" == e)
                                return Math.round(
                                    Math.min(
                                        40,
                                        Math.max(
                                            1,
                                            1 -
                                                (Math.min(1, m._customBlock_GamingStatType("SuperBitType", 66, 0)) + (Math.min(1, m._customBlock_Dreamstuff("CloudBonus", 41)) + m._customBlock_Ninja("EmporiumBonus", 45, 0))) +
                                                (Math.floor(t / 3) + (Math.floor(t / 7) + (Math.floor(t / 13) + Math.min(1, Math.floor(t / 15)) + Math.floor(t / 17))))
                                        )
                                    )
                                );
                            if ("CanWeBuyUpg" == e)
                                return c.asNumber(a.engine.getGameAttribute("Research")[7][5]) >= m._customBlock_Minehead("UpgCost", t, 0) &&
                                    (c.asNumber(a.engine.getGameAttribute("Research")[8][0 | t]) < c.asNumber(a.engine.getGameAttribute("CustomLists").h.MineheadUPG[0 | t][1]) ||
                                        998 < c.asNumber(a.engine.getGameAttribute("CustomLists").h.MineheadUPG[0 | t][1]))
                                    ? 1
                                    : 0;
                            if ("Tiles_RowCol" == e) return c.asNumber(("" + h.string(a.engine.getGameAttribute("CustomLists").h.Research[9][0 | c.asNumber(a.engine.getGameAttribute("Research")[8][2])])).split(",")[0 | t]);
                            if ("Tiles_XY" == e)
                                return 0 == i
                                    ? Math.round(483 - 29 * m._customBlock_Minehead("Tiles_RowCol", i, 0) + 58 * (t - Math.floor(t / m._customBlock_Minehead("Tiles_RowCol", 0, 0)) * m._customBlock_Minehead("Tiles_RowCol", 0, 0)))
                                    : Math.round(271 - 30 * m._customBlock_Minehead("Tiles_RowCol", i, 0) + 60 * Math.floor(t / m._customBlock_Minehead("Tiles_RowCol", 0, 0)));
                            if ("TotalTiles" == e)
                                return (
                                    c.asNumber(("" + h.string(a.engine.getGameAttribute("CustomLists").h.Research[9][0 | c.asNumber(a.engine.getGameAttribute("Research")[8][2])])).split(",")[0]) *
                                    c.asNumber(("" + h.string(a.engine.getGameAttribute("CustomLists").h.Research[9][0 | c.asNumber(a.engine.getGameAttribute("Research")[8][2])])).split(",")[1])
                                );
                            if ("GoldTilesTotal" == e) return m._customBlock_Minehead("UpgradeQTY", 8, 0);
                            if ("BlocksTotal" == e) return m._customBlock_Minehead("UpgradeQTY", 10, 0);
                            if ("BaseDMG" == e)
                                return (
                                    (1 + (m._customBlock_Minehead("UpgradeQTY", 0, 0) + (m._customBlock_Minehead("UpgradeQTY", 7, 0) + m._customBlock_Minehead("UpgradeQTY", 25, 0)))) *
                                    (1 + (m._customBlock_Minehead("UpgradeQTY", 4, 0) + (m._customBlock_Minehead("UpgradeQTY", 21, 0) + m._customBlock_Minehead("UpgradeQTY", 27, 0))) / 100) *
                                    (1 + m._customBlock_ResearchStuff("Grid_Bonus", 167, 0) / 100) *
                                    (1 + (50 * c.asNumber(a.engine.getGameAttribute("Sailing")[3][38])) / 100)
                                );
                            if ("BonusDMGperTilePCT" == e) return m._customBlock_Minehead("UpgradeQTY", 9, 0) + m._customBlock_ResearchStuff("Grid_Bonus", 146, 0);
                            if ("CurrentOutgoingDMG" == e) {
                                for (a.engine.getGameAttribute("DNSM").h.Mine_DMG_DN1 = 0, a.engine.getGameAttribute("DNSM").h.Mine_DMG_DN2 = 1, i = a.engine.getGameAttribute("DNSM").h.Mine_DMG_DN3 = 0; 72 > i;) {
                                    var s = i++;
                                    1 == n.__cast(a.engine.getGameAttribute("PixelHelperActor")[27].behaviors.getBehavior("ActorEvents_741"), we)._GenINFO[33][s] &&
                                        (1 <= c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[27].behaviors.getBehavior("ActorEvents_741"), we)._GenINFO[32][s]) &&
                                        10 > c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[27].behaviors.getBehavior("ActorEvents_741"), we)._GenINFO[32][s])
                                            ? ((e = a.engine.getGameAttribute("DNSM")),
                                              (s =
                                                  c.asNumber(a.engine.getGameAttribute("DNSM").h.Mine_DMG_DN1) +
                                                  c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[27].behaviors.getBehavior("ActorEvents_741"), we)._GenINFO[32][s])),
                                              (e.h.Mine_DMG_DN1 = s))
                                            : 10 <= c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[27].behaviors.getBehavior("ActorEvents_741"), we)._GenINFO[32][s]) &&
                                                19 > c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[27].behaviors.getBehavior("ActorEvents_741"), we)._GenINFO[32][s])
                                              ? ((t = a.engine.getGameAttribute("DNSM")),
                                                (e =
                                                    c.asNumber(a.engine.getGameAttribute("DNSM").h.Mine_DMG_DN1) +
                                                    (c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[27].behaviors.getBehavior("ActorEvents_741"), we)._GenINFO[32][s]) + 1)),
                                                (t.h.Mine_DMG_DN1 = e))
                                              : 19 == n.__cast(a.engine.getGameAttribute("PixelHelperActor")[27].behaviors.getBehavior("ActorEvents_741"), we)._GenINFO[32][s]
                                                ? ((t = a.engine.getGameAttribute("DNSM")), (e = c.asNumber(a.engine.getGameAttribute("DNSM").h.Mine_DMG_DN1) + -1), (t.h.Mine_DMG_DN1 = e))
                                                : 20 <= c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[27].behaviors.getBehavior("ActorEvents_741"), we)._GenINFO[32][s]) &&
                                                  29 > c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[27].behaviors.getBehavior("ActorEvents_741"), we)._GenINFO[32][s]) &&
                                                  ((t = a.engine.getGameAttribute("DNSM")),
                                                  (e =
                                                      c.asNumber(a.engine.getGameAttribute("DNSM").h.Mine_DMG_DN2) *
                                                      c.asNumber(
                                                          "1.2 1.4 1.6 2.0 3 4 5 6 7 8 1 1 1 1".split(" ")[
                                                              Math.round(c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[27].behaviors.getBehavior("ActorEvents_741"), we)._GenINFO[32][s]) - 20)
                                                          ]
                                                      )),
                                                  (t.h.Mine_DMG_DN2 = e)),
                                        (t = a.engine.getGameAttribute("DNSM")),
                                        (e = c.asNumber(a.engine.getGameAttribute("DNSM").h.Mine_DMG_DN3) + 1),
                                        (t.h.Mine_DMG_DN3 = e));
                                }
                                return (
                                    (e = a.engine.getGameAttribute("DNSM")),
                                    (s = c.asNumber(a.engine.getGameAttribute("DNSM").h.Mine_DMG_DN1) * m._customBlock_Minehead("BaseDMG", 0, 0)),
                                    (e.h.Mine_DMG_DN1 = s),
                                    (e = a.engine.getGameAttribute("DNSM")),
                                    (s = c.asNumber(a.engine.getGameAttribute("DNSM").h.Mine_DMG_DN1) * c.asNumber(a.engine.getGameAttribute("DNSM").h.Mine_DMG_DN2)),
                                    (e.h.Mine_DMG_DN1 = s),
                                    (e = a.engine.getGameAttribute("DNSM")),
                                    (s =
                                        c.asNumber(a.engine.getGameAttribute("DNSM").h.Mine_DMG_DN1) *
                                        (1 + c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[27].behaviors.getBehavior("ActorEvents_741"), we)._GenINFO[39]) / 100)),
                                    (e.h.Mine_DMG_DN1 = s),
                                    (e = a.engine.getGameAttribute("DNSM")),
                                    (s = c.asNumber(a.engine.getGameAttribute("DNSM").h.Mine_DMG_DN1) * (1 + (c.asNumber(a.engine.getGameAttribute("DNSM").h.Mine_DMG_DN3) * m._customBlock_Minehead("BonusDMGperTilePCT", 0, 0)) / 100)),
                                    (e.h.Mine_DMG_DN1 = s),
                                    (e = a.engine.getGameAttribute("DNSM")),
                                    (s =
                                        c.asNumber(a.engine.getGameAttribute("DNSM").h.Mine_DMG_DN1) *
                                        Math.pow(m._customBlock_Minehead("BluecrownMulti", 0, 0), c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[27].behaviors.getBehavior("ActorEvents_741"), we)._GenINFO[50]))),
                                    (e.h.Mine_DMG_DN1 = s),
                                    1 >= c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[27].behaviors.getBehavior("ActorEvents_741"), we)._GenINFO[30]) &&
                                        ((e = a.engine.getGameAttribute("DNSM")), (s = c.asNumber(a.engine.getGameAttribute("DNSM").h.Mine_DMG_DN1) * (1 + m._customBlock_Minehead("UpgradeQTY", 11, 0) / 100)), (e.h.Mine_DMG_DN1 = s)),
                                    a.engine.getGameAttribute("DNSM").h.Mine_DMG_DN1
                                );
                            }
                            if ("BonusQTY" == e) return c.asNumber(a.engine.getGameAttribute("Research")[7][4]) > t || 99 == i ? c.asNumber(a.engine.getGameAttribute("CustomLists").h.Research[20][0 | t]) : 0;
                            if ("WepPowDmgPCT" == e)
                                return (
                                    (t = m._customBlock_Minehead("BonusQTY", 4, 0)),
                                    (e = a.engine.getGameAttribute("ItemDefinitionsGET")),
                                    (i = "" + h.string(a.engine.getGameAttribute("EquipmentOrder")[0][1])),
                                    t * (c.asNumber(e.h[i].h.Weapon_Power) + c.asNumber(a.engine.getGameAttribute("EquipmentMap")[0][1].h.Weapon_Power))
                                );
                            if ("CurrencyGain" == e)
                                return (
                                    m._customBlock_ResearchStuff("Grid_Bonus", 129, 0) *
                                    (1 + (100 * m._customBlock_Summoning("EventShopOwned", 44, 0)) / 100) *
                                    (1 + m._customBlock_ResearchStuff("Grid_Bonus", 148, 0) / 100) *
                                    Math.max(1, m._customBlock_RoyalG("OutpostROGbon", 3, 0)) *
                                    (1 + m._customBlock_SushiStuff("RoG_BonusQTY", 12, 0) / 100) *
                                    Math.max(1, Math.min(2, m._customBlock_Companions(143)) + m._customBlock_CompLV2(143)) *
                                    Math.min(3, 1 + m._customBlock_Minehead("BonusQTY", 6, 0) / 100) *
                                    (1 +
                                        (m._customBlock_Minehead("UpgradeQTY", 5, 0) +
                                            (m._customBlock_Minehead("UpgradeQTY", 22, 0) +
                                                (m._customBlock_Minehead("UpgradeQTY", 28, 0) * k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("Research")[7][6])) + p._customBlock_ArcadeBonus(62)))) /
                                            100) *
                                    (1 + m._customBlock_Minehead("Button_Bonuses", 1, 0) / 100) *
                                    (1 + m._customBlock_AtomCollider("AtomBonuses", 13, 0) / 100) *
                                    (1 + (m._customBlock_ResearchStuff("Grid_Bonus", 147, 0) + m._customBlock_ResearchStuff("Grid_Bonus", 166, 0) + c.asNumber(a.engine.getGameAttribute("DNSM").h.MealBonusesS.h.MineCurr)) / 100)
                                );
                            if ("UpgradeQTY" == e) return c.asNumber(a.engine.getGameAttribute("CustomLists").h.MineheadUPG[0 | t][3]) * c.asNumber(a.engine.getGameAttribute("Research")[8][0 | t]);
                            if ("BluecrownMulti" == e) return 1.5 + m._customBlock_Minehead("UpgradeQTY", 14, 0) / 100;
                            if ("BluecrownOdds" == e) return 0 == m._customBlock_Minehead("UpgradeQTY", 14, 0) ? 0 : Math.min(0.1, 0.06666666666666667 * (1 + m._customBlock_Minehead("UpgradeQTY", 15, 0) / 100));
                            if ("FlagsTotal" == e) return Math.round(m._customBlock_Minehead("UpgradeQTY", 20, 0));
                            if ("JackpotOdds" == e) return 0 == m._customBlock_Minehead("UpgradeQTY", 23, 0) ? 0 : 0.01 * (1 + m._customBlock_Minehead("UpgradeQTY", 23, 0) / 100);
                            if ("JackpotTiles" == e) return Math.round(3 + m._customBlock_Minehead("UpgradeQTY", 24, 0));
                            if ("InstaRevealsTotal" == e) return Math.round(m._customBlock_Minehead("UpgradeQTY", 16, 0));
                            if ("MineheadID" == e) return c.asNumber(a.engine.getGameAttribute("CustomLists").h.Research[10][0 | t]);
                            if ("Glimbo_Cost" == e)
                                return 1e9 >
                                    (1 + c.asNumber(a.engine.getGameAttribute("Research")[12][0 | t]) + 1.5 * c.asNumber(a.engine.getGameAttribute("Research")[12][0 | t])) *
                                        Math.pow(c.asNumber(a.engine.getGameAttribute("CustomLists").h.Research[28][0 | t]), c.asNumber(a.engine.getGameAttribute("Research")[12][0 | t])) *
                                        Math.max(0.1, 1 - (25 * m._customBlock_Summoning("EventShopOwned", 38, 0)) / 100)
                                    ? Math.floor(
                                          Math.max(
                                              1,
                                              (1 + c.asNumber(a.engine.getGameAttribute("Research")[12][0 | t]) + 1.5 * c.asNumber(a.engine.getGameAttribute("Research")[12][0 | t])) *
                                                  Math.pow(c.asNumber(a.engine.getGameAttribute("CustomLists").h.Research[28][0 | t]), c.asNumber(a.engine.getGameAttribute("Research")[12][0 | t])) *
                                                  Math.max(0.1, 1 - (25 * m._customBlock_Summoning("EventShopOwned", 38, 0)) / 100) *
                                                  Math.max(0.2, 1 - m._customBlock_Companions(57) / 100)
                                          )
                                      )
                                    : (1 + c.asNumber(a.engine.getGameAttribute("Research")[12][0 | t]) + 1.5 * c.asNumber(a.engine.getGameAttribute("Research")[12][0 | t])) *
                                          Math.pow(c.asNumber(a.engine.getGameAttribute("CustomLists").h.Research[28][0 | t]), c.asNumber(a.engine.getGameAttribute("Research")[12][0 | t])) *
                                          Math.max(0.1, 1 - (25 * m._customBlock_Summoning("EventShopOwned", 38, 0)) / 100) *
                                          Math.max(0.01, 1 - m._customBlock_Companions(57) / 100);
                            if ("Glimbo_CanAfford" == e)
                                return (
                                    (e = n.__cast(a.engine.getGameAttribute("PixelHelperActor")[5].behaviors.getBehavior("ActorEvents_232"), Pa)._ItemsAndStorageOWNED),
                                    (i = "" + h.string(a.engine.getGameAttribute("CustomLists").h.Research[27][0 | t])),
                                    c.asNumber(e.h[i]) >= m._customBlock_Minehead("Glimbo_Cost", t, 0) ? 1 : 0
                                );
                            if ("GlimboTotalTrades" == e) {
                                if (((e = a.engine.getGameAttribute("DNSM")), !Object.prototype.hasOwnProperty.call(e.h, "GlimboTOT") || -1 == t)) {
                                    i = a.engine.getGameAttribute("DNSM").h.GlimboTOT = 0;
                                    for (var r = a.engine.getGameAttribute("Research")[12].length; i < r;)
                                        ((s = i++),
                                            (e = a.engine.getGameAttribute("DNSM")),
                                            (s = Math.round(c.asNumber(a.engine.getGameAttribute("DNSM").h.GlimboTOT) + c.asNumber(a.engine.getGameAttribute("Research")[12][s]))),
                                            (e.h.GlimboTOT = s));
                                }
                                return Math.round(c.asNumber(a.engine.getGameAttribute("DNSM").h.GlimboTOT));
                            }
                            if ("GlimboDRmulti" == e) return 1 <= m._customBlock_ResearchStuff("Grid_Bonus", 168, 0) ? 1 + m._customBlock_ResearchStuff("Grid_Bonus", 168, 2) / 100 : 1;
                            if ("Button_Task" == e)
                                return Math.round(
                                    c.asNumber(
                                        a.engine.getGameAttribute("CustomLists").h.Research[39][
                                            Math.round(c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[594]) - 100 * Math.floor(c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[594]) / 100))
                                        ]
                                    ) -
                                        a.engine.getGameAttribute("CustomLists").h.ButtonTasks.length *
                                            Math.floor(
                                                c.asNumber(
                                                    a.engine.getGameAttribute("CustomLists").h.Research[39][
                                                        Math.round(c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[594]) - 100 * Math.floor(c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[594]) / 100))
                                                    ]
                                                ) / a.engine.getGameAttribute("CustomLists").h.ButtonTasks.length
                                            )
                                );
                            if ("Button_REQ" == e)
                                return "linear" == a.engine.getGameAttribute("CustomLists").h.ButtonTasks[0 | m._customBlock_Minehead("Button_Task", 0, 0)][2]
                                    ? Math.ceil(
                                          c.asNumber(a.engine.getGameAttribute("CustomLists").h.ButtonTasks[0 | m._customBlock_Minehead("Button_Task", 0, 0)][1]) +
                                              c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[594]) * c.asNumber(a.engine.getGameAttribute("CustomLists").h.ButtonTasks[0 | m._customBlock_Minehead("Button_Task", 0, 0)][3])
                                      )
                                    : "step" == a.engine.getGameAttribute("CustomLists").h.ButtonTasks[0 | m._customBlock_Minehead("Button_Task", 0, 0)][2]
                                      ? Math.ceil(
                                            c.asNumber(a.engine.getGameAttribute("CustomLists").h.ButtonTasks[0 | m._customBlock_Minehead("Button_Task", 0, 0)][1]) +
                                                c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[594]) / c.asNumber(a.engine.getGameAttribute("CustomLists").h.ButtonTasks[0 | m._customBlock_Minehead("Button_Task", 0, 0)][3])
                                        )
                                      : c.asNumber(a.engine.getGameAttribute("CustomLists").h.ButtonTasks[0 | m._customBlock_Minehead("Button_Task", 0, 0)][1]) *
                                        Math.pow(c.asNumber(a.engine.getGameAttribute("CustomLists").h.ButtonTasks[0 | m._customBlock_Minehead("Button_Task", 0, 0)][3]), c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[594]));
                            if ("Button_uHave" == e)
                                return 0 == t
                                    ? x._customBlock_TotalStats("STR")
                                    : 1 == t
                                      ? x._customBlock_TotalStats("AGI")
                                      : 2 == t
                                        ? x._customBlock_TotalStats("WIS")
                                        : 3 == t
                                          ? x._customBlock_TotalStats("LUK")
                                          : 4 == t
                                            ? a.engine.getGameAttribute("OptionsListAccount")[330]
                                            : 5 == t
                                              ? a.engine.getGameAttribute("OptionsListAccount")[358]
                                              : 6 == t
                                                ? a.engine.getGameAttribute("OptionsListAccount")[390]
                                                : 7 == t
                                                  ? a.engine.getGameAttribute("OptionsListAccount")[391]
                                                  : 8 == t
                                                    ? a.engine.getGameAttribute("StatueLevels")[29][0]
                                                    : 9 == t
                                                      ? a.engine.getGameAttribute("StatueLevels")[2][0]
                                                      : 10 == t
                                                        ? a.engine.getGameAttribute("StatueLevels")[6][0]
                                                        : 11 == t
                                                          ? a.engine.getGameAttribute("StatueLevels")[8][0]
                                                          : 12 == t
                                                            ? a.engine.getGameAttribute("StatueLevels")[9][0]
                                                            : 13 == t
                                                              ? a.engine.getGameAttribute("StatueLevels")[15][0]
                                                              : 14 == t
                                                                ? a.engine.getGameAttribute("StatueLevels")[16][0]
                                                                : 15 == t
                                                                  ? x._customBlock_ExpMulti(0)
                                                                  : 16 == t
                                                                    ? x._customBlock_TotalStats("Drop_Rarity")
                                                                    : 17 == t
                                                                      ? a.engine.getGameAttribute("StampLevel")[2][2]
                                                                      : 18 == t
                                                                        ? a.engine.getGameAttribute("CauldronInfo")[0][0]
                                                                        : 19 == t
                                                                          ? a.engine.getGameAttribute("CauldronInfo")[1][0]
                                                                          : 20 == t
                                                                            ? a.engine.getGameAttribute("CauldronInfo")[2][0]
                                                                            : 21 == t
                                                                              ? n.__cast(a.engine.getGameAttribute("PixelHelperActor")[8].behaviors.getBehavior("ActorEvents_481"), na)._GenINFO[12][0]
                                                                              : 22 == t
                                                                                ? 0 <= a.engine.getGameAttribute("Printer").indexOf("Copper")
                                                                                    ? a.engine.getGameAttribute("Printer")[Math.round(a.engine.getGameAttribute("Printer").indexOf("Copper") + 1)]
                                                                                    : 0
                                                                                : 23 == t
                                                                                  ? a.engine.getGameAttribute("OptionsListAccount")[253]
                                                                                  : 24 == t
                                                                                    ? c.asNumber(a.engine.getGameAttribute("TotemInfo")[0][0]) +
                                                                                      (c.asNumber(a.engine.getGameAttribute("TotemInfo")[0][1]) +
                                                                                          (c.asNumber(a.engine.getGameAttribute("TotemInfo")[0][2]) +
                                                                                              (c.asNumber(a.engine.getGameAttribute("TotemInfo")[0][3]) +
                                                                                                  (c.asNumber(a.engine.getGameAttribute("TotemInfo")[0][4]) +
                                                                                                      (c.asNumber(a.engine.getGameAttribute("TotemInfo")[0][5]) +
                                                                                                          (c.asNumber(a.engine.getGameAttribute("TotemInfo")[0][6]) + c.asNumber(a.engine.getGameAttribute("TotemInfo")[0][7])))))))
                                                                                    : 25 == t
                                                                                      ? a.engine.getGameAttribute("PetsStored")[0][2]
                                                                                      : 26 == t
                                                                                        ? p._customBlock_PetStuff("TotalTrekkingHR", "0", 5, 0)
                                                                                        : 27 == t
                                                                                          ? a.engine.getGameAttribute("Ribbon")[92]
                                                                                          : 28 == t
                                                                                            ? a.engine.getGameAttribute("Meals")[0][56]
                                                                                            : 29 == t
                                                                                              ? n.__cast(a.engine.getGameAttribute("PixelHelperActor")[4].behaviors.getBehavior("ActorEvents_229"), ob)._GenInfo[84]
                                                                                              : 30 == t
                                                                                                ? a.engine.getGameAttribute("Lv0")[12]
                                                                                                : 31 == t
                                                                                                  ? a.engine.getGameAttribute("Lv0")[17]
                                                                                                  : 32 == t
                                                                                                    ? a.engine.getGameAttribute("Lv0")[19]
                                                                                                    : 33 == t
                                                                                                      ? a.engine.getGameAttribute("Lv0")[1]
                                                                                                      : 34 == t
                                                                                                        ? a.engine.getGameAttribute("Lv0")[3]
                                                                                                        : 35 == t
                                                                                                          ? a.engine.getGameAttribute("Lv0")[14]
                                                                                                          : 36 == t
                                                                                                            ? a.engine.getGameAttribute("Divinity")[24]
                                                                                                            : 37 == t
                                                                                                              ? a.engine.getGameAttribute("Sailing")[1][0]
                                                                                                              : 38 == t
                                                                                                                ? m._customBlock_Sailing("BoatArtiMulti", 0, 0)
                                                                                                                : 39 == t
                                                                                                                  ? a.engine.getGameAttribute("Gaming")[0]
                                                                                                                  : 40 == t
                                                                                                                    ? a.engine.getGameAttribute("GamingSprout")[28][1]
                                                                                                                    : 41 == t
                                                                                                                      ? m._customBlock_GamingStatType("PaletteLuck", 0, 0)
                                                                                                                      : 42 == t
                                                                                                                        ? a.engine.getGameAttribute("Cards")[1].length
                                                                                                                        : 43 == t
                                                                                                                          ? a.engine.getGameAttribute("Summon")[2][0]
                                                                                                                          : 44 == t
                                                                                                                            ? n.__cast(a.engine.getGameAttribute("PixelHelperActor")[24].behaviors.getBehavior("ActorEvents_623"), xa)
                                                                                                                                  ._GenINFO[143][9]
                                                                                                                            : 45 == t
                                                                                                                              ? m._customBlock_FarmingStuffs("BeanTradeQTY", 0, 0)
                                                                                                                              : 46 == t
                                                                                                                                ? a.engine.getGameAttribute("Ninja")[102][1]
                                                                                                                                : 47 == t
                                                                                                                                  ? Math.max(0, 100 * (c.asNumber(a.engine.getGameAttribute("DNSM").h.GfoodBonusMULTI) - 1))
                                                                                                                                  : 48 == t
                                                                                                                                    ? Math.round(D.mapCount(a.engine.getGameAttribute("FarmCrop")))
                                                                                                                                    : 49 == t
                                                                                                                                      ? x._customBlock_DamageDealed("Max")
                                                                                                                                      : 50 == t
                                                                                                                                        ? m._customBlock_Spelunk("POW_base", 0, 0) * m._customBlock_Spelunk("POW_multi", 0, 0)
                                                                                                                                        : 51 == t
                                                                                                                                          ? a.engine.getGameAttribute("Spelunk")[1][4]
                                                                                                                                          : 52 == t
                                                                                                                                            ? a.engine.getGameAttribute("Money")
                                                                                                                                            : 53 == t
                                                                                                                                              ? c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[369]) + 1
                                                                                                                                              : 54 == t
                                                                                                                                                ? a.engine.getGameAttribute("Sushi")[4][3]
                                                                                                                                                : 55 == t
                                                                                                                                                  ? a.engine.getGameAttribute("OptionsListAccount")[267]
                                                                                                                                                  : 56 == t
                                                                                                                                                    ? a.engine.getGameAttribute("Bubba")[0][0]
                                                                                                                                                    : 57 == t || 58 == t || 59 == t
                                                                                                                                                      ? 1
                                                                                                                                                      : 0;
                            if ("Button_BonusPerTime" == e) return c.asNumber("2 3 2 2 4 5 4 25 5".split(" ")[0 | t]);
                            if ("Button_BonusMULTI" == e) return (1 + m._customBlock_Companions(147) / 100) * (1 + m._customBlock_ResearchStuff("Grid_Bonus", 125, 0) / 100);
                            if ("Button_Bonuses" == e) {
                                if (((e = a.engine.getGameAttribute("DNSM")), !Object.prototype.hasOwnProperty.call(e.h, "Button_Bonsuz") || -1 == i))
                                    for (
                                        s = [],
                                            (e = a.engine.getGameAttribute("DNSM")).h.Button_Bonsuz = s,
                                            a.engine.getGameAttribute("DNSM").h.Button_Bonsuz.push(0),
                                            a.engine.getGameAttribute("DNSM").h.Button_Bonsuz.push(0),
                                            a.engine.getGameAttribute("DNSM").h.Button_Bonsuz.push(0),
                                            a.engine.getGameAttribute("DNSM").h.Button_Bonsuz.push(0),
                                            a.engine.getGameAttribute("DNSM").h.Button_Bonsuz.push(0),
                                            a.engine.getGameAttribute("DNSM").h.Button_Bonsuz.push(0),
                                            a.engine.getGameAttribute("DNSM").h.Button_Bonsuz.push(0),
                                            a.engine.getGameAttribute("DNSM").h.Button_Bonsuz.push(0),
                                            a.engine.getGameAttribute("DNSM").h.Button_Bonsuz.push(0),
                                            i = 0,
                                            r = 0 | c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[594]);
                                        i < r;
                                    )
                                        ((s = i++),
                                            (a.engine.getGameAttribute("DNSM").h.Button_Bonsuz[Math.round(Math.floor(s / 5) - 9 * Math.floor(Math.floor(s / 5) / 9))] =
                                                c.asNumber(a.engine.getGameAttribute("DNSM").h.Button_Bonsuz[Math.round(Math.floor(s / 5) - 9 * Math.floor(Math.floor(s / 5) / 9))]) +
                                                m._customBlock_Minehead("Button_BonusPerTime", Math.floor(s / 5) - 9 * Math.floor(Math.floor(s / 5) / 9), 0) * m._customBlock_Minehead("Button_BonusMULTI", 0, 0)));
                                return a.engine.getGameAttribute("DNSM").h.Button_Bonsuz[0 | t];
                            }
                            return 0;
                        }
