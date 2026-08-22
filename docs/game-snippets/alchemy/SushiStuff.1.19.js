/**
 * Game formula snippet — idleon-efficiency formula research.
 * Function: _customBlock_SushiStuff (from scripts.ActorEvents_579)
 * Game version: 1.19 ("Summer_Event")
 * Captured: 2026-08-21 via game-debug-tool (findFunction + toString)
 * Case reference: #342
 */
function (e, t, i) {
                            if ("UpgLvREQ" == e) return Math.floor(1 + (Math.min(2, t) + Math.min(4, t) + (3 * t - Math.max(0, t - 4) - Math.max(0, t - 8) + (Math.floor(t / 6) + Math.floor(t / 17)))));
                            if ("UpgradeQTY" == e) return c.asNumber(a.engine.getGameAttribute("CustomLists").h.SushiUPG[0 | t][3]) * c.asNumber(a.engine.getGameAttribute("Sushi")[2][0 | t]);
                            if ("UpgCost" == e) {
                                if (
                                    ((a.engine.getGameAttribute("DNSM").h.Sushi7zUpgCostDN = 1),
                                    0 != c.asNumber(a.engine.getGameAttribute("CustomLists").h.SushiUPG[0 | c.asNumber(a.engine.getGameAttribute("CustomLists").h.Research[32][0 | t])][4]))
                                ) {
                                    e = a.engine.getGameAttribute("DNSM");
                                    var n = c.asNumber(a.engine.getGameAttribute("CustomLists").h.SushiUPG[0 | c.asNumber(a.engine.getGameAttribute("CustomLists").h.Research[32][0 | t])][4]);
                                    e.h.Sushi7zUpgCostDN = n;
                                }
                                return (
                                    Math.max(0.1, c.asNumber(a.engine.getGameAttribute("DNSM").h.Sushi7zUpgCostDN)) *
                                    (5 + t + Math.pow(Math.max(0, t - 1), 2)) *
                                    Math.pow(1.5 + Math.max(0, t - 3) / 16, Math.max(0, t - 4)) *
                                    Math.pow(1.3, Math.max(0, t - 20)) *
                                    (1 / (1 + m._customBlock_SushiStuff("UpgradeQTY", 36, 0) / 100)) *
                                    Math.max(0.1, 1 - Math.max(m._customBlock_SushiStuff("RoG_BonusQTY", 26, 0), m._customBlock_SushiStuff("RoG_BonusQTY", 44, 0)) / 100) *
                                    (1 / (1 + m._customBlock_SushiStuff("KnowledgeBonusTOT", 6, 0) / 100)) *
                                    Math.pow(
                                        c.asNumber(a.engine.getGameAttribute("CustomLists").h.SushiUPG[0 | c.asNumber(a.engine.getGameAttribute("CustomLists").h.Research[32][0 | t])][2]),
                                        c.asNumber(a.engine.getGameAttribute("Sushi")[2][0 | c.asNumber(a.engine.getGameAttribute("CustomLists").h.Research[32][0 | t])])
                                    )
                                );
                            }
                            if ("CanWeBuyUpg" == e)
                                return (1 <= c.asNumber(a.engine.getGameAttribute("Sushi")[2][0 | c.asNumber(a.engine.getGameAttribute("CustomLists").h.Research[32][0 | Math.max(0, Math.round(t - 1))])]) || 0 == t) &&
                                    c.asNumber(a.engine.getGameAttribute("Sushi")[4][3]) >= m._customBlock_SushiStuff("UpgCost", t, 0) &&
                                    (c.asNumber(a.engine.getGameAttribute("Sushi")[2][0 | c.asNumber(a.engine.getGameAttribute("CustomLists").h.Research[32][0 | t])]) <
                                        c.asNumber(a.engine.getGameAttribute("CustomLists").h.SushiUPG[0 | c.asNumber(a.engine.getGameAttribute("CustomLists").h.Research[32][0 | t])][1]) ||
                                        998 < c.asNumber(a.engine.getGameAttribute("CustomLists").h.SushiUPG[0 | c.asNumber(a.engine.getGameAttribute("CustomLists").h.Research[32][0 | t])][1]))
                                    ? 1
                                    : 0;
                            if ("SlotsOwned" == e)
                                return 99 == i
                                    ? Math.min(
                                          120,
                                          m._customBlock_SushiStuff("SlotsOwned", 0, 0) + (m._customBlock_SushiStuff("SlotsOwned", 1, 0) + (m._customBlock_SushiStuff("SlotsOwned", 2, 0) + m._customBlock_SushiStuff("SlotsOwned", 3, 0)))
                                      )
                                    : 0 == t
                                      ? 10
                                      : 0;
                            if ("FuelCost" == e) return 5 == t ? 176 : 10 * Math.pow(1.83, t) - Math.pow(t, 2);
                            if ("FuelGen" == e)
                                return (
                                    50 *
                                    (1 + Math.min(1, c.asNumber(a.engine.getGameAttribute("BundlesReceived").h.bon_v))) *
                                    (1 +
                                        (m._customBlock_SushiStuff("UpgradeQTY", 8, 0) +
                                            (m._customBlock_SushiStuff("UpgradeQTY", 9, 0) +
                                                (m._customBlock_SushiStuff("UpgradeQTY", 10, 0) + (m._customBlock_SushiStuff("UpgradeQTY", 11, 0) + m._customBlock_SushiStuff("UpgradeQTY", 12, 0))))) /
                                            100) *
                                    (1 + c.asNumber(a.engine.getGameAttribute("DNSM").h.OrngSushSumz) / 100) *
                                    (1 + m._customBlock_SushiStuff("KnowledgeBonusTOT", 4, 0) / 100) *
                                    (1 + m._customBlock_SushiStuff("KnowledgeBonusSpecific", 27, 0) / 100) *
                                    (1 + m._customBlock_SushiStuff("KnowledgeBonusSpecific", 36, 0) / 100) *
                                    (1 + m._customBlock_SushiStuff("KnowledgeBonusSpecific", 45, 0) / 100) *
                                    (1 + c.asNumber(a.engine.getGameAttribute("Sushi")[2][9]) / 100) *
                                    (1 + c.asNumber(a.engine.getGameAttribute("Sushi")[2][10]) / 100) *
                                    (1 + c.asNumber(a.engine.getGameAttribute("Sushi")[2][11]) / 100) *
                                    (1 + c.asNumber(a.engine.getGameAttribute("Sushi")[2][12]) / 100)
                                );
                            if ("FuelCap" == e)
                                return (
                                    (200 + m._customBlock_SushiStuff("KnowledgeBonusTOT", 3, 0)) *
                                    (1 + Math.min(1, c.asNumber(a.engine.getGameAttribute("BundlesReceived").h.bon_v))) *
                                    (1 +
                                        (m._customBlock_SushiStuff("UpgradeQTY", 1, 0) +
                                            (m._customBlock_SushiStuff("UpgradeQTY", 2, 0) +
                                                (m._customBlock_SushiStuff("UpgradeQTY", 3, 0) + (m._customBlock_SushiStuff("UpgradeQTY", 4, 0) + m._customBlock_SushiStuff("UpgradeQTY", 5, 0))))) /
                                            100) *
                                    (1 + c.asNumber(a.engine.getGameAttribute("Sushi")[2][2]) / 100) *
                                    (1 + c.asNumber(a.engine.getGameAttribute("Sushi")[2][3]) / 100) *
                                    (1 + c.asNumber(a.engine.getGameAttribute("Sushi")[2][4]) / 100) *
                                    (1 + c.asNumber(a.engine.getGameAttribute("Sushi")[2][5]) / 100)
                                );
                            if ("MaxCookTier" == e) return Math.round(m._customBlock_SushiStuff("UpgradeQTY", 6, 0));
                            if ("BonusCookTierPCT" == e) return m._customBlock_SushiStuff("UpgradeQTY", 7, 0) + m._customBlock_SushiStuff("KnowledgeBonusTOT", 2, 0);
                            if ("MaxTier" == e) return 58;
                            if ("OvertunedMulti" == e) return 5 * k._customBlock_Log2(c.asNumber(a.engine.getGameAttribute("Sushi")[4][1]) / 1e6) + 10 * k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("Sushi")[4][1]) / 1e6);
                            if ("CurrencyMulti" == e)
                                return (
                                    (1 + p._customBlock_ArcadeBonus(67) / 100) *
                                    (1 + (100 * m._customBlock_Summoning("EventShopOwned", 45, 0)) / 100) *
                                    Math.pow(1.1, m._customBlock_SushiStuff("UniqueSushi", 0, 0)) *
                                    (1 + Math.min(1, c.asNumber(a.engine.getGameAttribute("BundlesReceived").h.bon_v))) *
                                    (1 +
                                        (m._customBlock_SushiStuff("UpgradeQTY", 30, 0) +
                                            (m._customBlock_SushiStuff("UpgradeQTY", 31, 0) +
                                                (m._customBlock_SushiStuff("UpgradeQTY", 32, 0) +
                                                    (m._customBlock_SushiStuff("UpgradeQTY", 33, 0) + (m._customBlock_SushiStuff("UpgradeQTY", 34, 0) + 100 * m._customBlock_GamingStatType("SuperBitType", 67, 0)))))) /
                                            100) *
                                    (1 + m._customBlock_SushiStuff("KnowledgeBonusTOT", 0, 0) / 100) *
                                    (1 + m._customBlock_Minehead("Button_Bonuses", 2, 0) / 100) *
                                    (1 + m._customBlock_ResearchStuff("Grid_Bonus", 189, 0) / 100) *
                                    (1 + m._customBlock_SushiStuff("UpgradeQTY", 40, 0) / 100) *
                                    Math.max(1, Math.min(1.25, 1 + m._customBlock_Minehead("BonusQTY", 11, 0) / 100)) *
                                    (1 + (m._customBlock_SushiStuff("UpgradeQTY", 41, 0) + m._customBlock_SushiStuff("UpgradeQTY", 43, 0)) / 100) *
                                    (1 + m._customBlock_SushiStuff("OvertunedMulti", 0, 0) / 100) *
                                    (1 + m._customBlock_AtomCollider("AtomBonuses", 14, 0) / 100) *
                                    (1 + (100 * c.asNumber(a.engine.getGameAttribute("Sailing")[3][39])) / 100)
                                );
                            if ("CurrencyPerTier" == e) return 10 > t ? c.asNumber("1 3 8 20 50 115 250 560 1220 2650 2650".split(" ")[0 | t]) : 16 > t ? Math.pow(2.46 - t / 100, t) + (5 * t + Math.pow(t, 2)) : Math.pow(2.31, t);
                            if ("CurrencyPerSlot" == e)
                                return (
                                    (a.engine.getGameAttribute("DNSM").h.Sushi7zDN = 1),
                                    1 == a.engine.getGameAttribute("Sushi")[1][0 | t] &&
                                        ((e = a.engine.getGameAttribute("DNSM")), (n = c.asNumber(a.engine.getGameAttribute("DNSM").h.Sushi7zDN) * (1 + m._customBlock_SushiStuff("SlotEffect", 1, 0) / 100)), (e.h.Sushi7zDN = n)),
                                    1 == a.engine.getGameAttribute("Sushi")[3][(t % 15) | 0] &&
                                        ((e = a.engine.getGameAttribute("DNSM")), (n = c.asNumber(a.engine.getGameAttribute("DNSM").h.Sushi7zDN) * (1 + m._customBlock_SushiStuff("FireplaceEffect", 1, 0) / 100)), (e.h.Sushi7zDN = n)),
                                    c.asNumber(a.engine.getGameAttribute("DNSM").h.Sushi7zDN) *
                                        m._customBlock_SushiStuff("CurrencyMulti", 0, 0) *
                                        m._customBlock_SushiStuff("CurrencyPerTier", c.asNumber(a.engine.getGameAttribute("Sushi")[0][0 | t]), 0)
                                );
                            if ("CurrencyperHR" == e) {
                                if (((e = a.engine.getGameAttribute("DNSM")), !Object.prototype.hasOwnProperty.call(e.h, "TotBuckzGen") || -1 == t))
                                    for (i = a.engine.getGameAttribute("DNSM").h.TotBuckzGen = 0; 120 > i; )
                                        ((n = i++),
                                            0 <= c.asNumber(a.engine.getGameAttribute("Sushi")[0][n]) &&
                                                ((e = a.engine.getGameAttribute("DNSM")), (n = c.asNumber(a.engine.getGameAttribute("DNSM").h.TotBuckzGen) + m._customBlock_SushiStuff("CurrencyPerSlot", n, 0)), (e.h.TotBuckzGen = n)));
                                return a.engine.getGameAttribute("DNSM").h.TotBuckzGen;
                            }
                            if ("OrangeFireSum" == e) {
                                if (((e = a.engine.getGameAttribute("DNSM")), !Object.prototype.hasOwnProperty.call(e.h, "OrngSushSumz") || -1 == t))
                                    for (i = a.engine.getGameAttribute("DNSM").h.OrngSushSumz = 0; 120 > i; )
                                        ((n = i++),
                                            0 <= c.asNumber(a.engine.getGameAttribute("Sushi")[0][n]) &&
                                                0 == a.engine.getGameAttribute("Sushi")[3][n % 15] &&
                                                ((e = a.engine.getGameAttribute("DNSM")),
                                                (n = c.asNumber(a.engine.getGameAttribute("DNSM").h.OrngSushSumz) + (c.asNumber(a.engine.getGameAttribute("Sushi")[0][n]) + 1) * m._customBlock_SushiStuff("FireplaceEffect", 0, 0)),
                                                (e.h.OrngSushSumz = n)));
                                return a.engine.getGameAttribute("DNSM").h.OrngSushSumz;
                            }
                            if ("CurrencyGain" == e) return m._customBlock_SushiStuff("CurrencyperHR", 0, 0);
                            if ("KnowledgeXP_req" == e) return (3 + (t + Math.pow(t, 1.5))) * Math.pow(1.5, Math.max(0, t - 2));
                            if ("KnowledgeXP_base" == e) return 1 + m._customBlock_SushiStuff("UpgradeQTY", 37, 0) / 10;
                            if ("KnowledgeXP_multi" == e)
                                return (
                                    (a.engine.getGameAttribute("DNSM").h.Sushi7zDN = 0),
                                    3 == a.engine.getGameAttribute("Sushi")[3][(t % 15) | 0] && ((e = a.engine.getGameAttribute("DNSM")), (n = m._customBlock_SushiStuff("FireplaceEffect", 3, 0)), (e.h.Sushi7zDN = n)),
                                    (1 + m._customBlock_SushiStuff("UpgradeQTY", 38, 0) / 100) * (1 + c.asNumber(a.engine.getGameAttribute("DNSM").h.Sushi7zDN) / 100) * (1 + m._customBlock_SushiStuff("KnowledgeBonusTOT", 1, 0) / 100)
                                );
                            if ("KnowledgeBonusSpecific" == e)
                                return Math.max(
                                    0,
                                    c.asNumber(a.engine.getGameAttribute("CustomLists").h.Research[35][0 | c.asNumber(a.engine.getGameAttribute("CustomLists").h.Research[33][0 | t])]) *
                                        c.asNumber(a.engine.getGameAttribute("Sushi")[7][0 | t]) *
                                        Math.min(2, 1 + c.asNumber(a.engine.getGameAttribute("Sushi")[5][0 | t])) *
                                        (1 + t / 30)
                                );
                            if ("KnowledgeBonusTOT" == e) {
                                if (((e = a.engine.getGameAttribute("DNSM")), !Object.prototype.hasOwnProperty.call(e.h, "KNWLG_sushtot") || -1 == i)) {
                                    for (n = [], (e = a.engine.getGameAttribute("DNSM")).h.KNWLG_sushtot = n, i = 0, e = a.engine.getGameAttribute("CustomLists").h.Research[34].length; i < e; )
                                        (i++, a.engine.getGameAttribute("DNSM").h.KNWLG_sushtot.push(0));
                                    for (i = 0, e = Math.round(m._customBlock_SushiStuff("MaxTier", 0, 0) + 1); i < e; )
                                        ((n = i++),
                                            (a.engine.getGameAttribute("DNSM").h.KNWLG_sushtot[0 | c.asNumber(a.engine.getGameAttribute("CustomLists").h.Research[33][n])] =
                                                c.asNumber(a.engine.getGameAttribute("DNSM").h.KNWLG_sushtot[0 | c.asNumber(a.engine.getGameAttribute("CustomLists").h.Research[33][n])]) +
                                                m._customBlock_SushiStuff("KnowledgeBonusSpecific", n, 0)));
                                }
                                return a.engine.getGameAttribute("DNSM").h.KNWLG_sushtot[0 | t];
                            }
                            if ("FreeShaker" == e) return Math.min(0.6, (m._customBlock_SushiStuff("UpgradeQTY", 21, 0) + (m._customBlock_SushiStuff("KnowledgeBonusTOT", 5, 0) + m._customBlock_ResearchStuff("Grid_Bonus", 188, 0))) / 100);
                            if ("PerfectOdds" == e) return ((0.6 * Math.pow(0.81, t)) / (1 + t / 8)) * (1 + m._customBlock_SushiStuff("KnowledgeBonusTOT", 10, 0) / 100);
                            if ("SaffronHRS" == e) return Math.round(1 + m._customBlock_SushiStuff("UpgradeQTY", 22, 0));
                            if ("NewSushiInstaMoney" == e) return Math.round(m._customBlock_SushiStuff("UpgradeQTY", 22, 0) / 60);
                            if ("SlotEffect" == e)
                                return 1 == t
                                    ? 50 * m._customBlock_SushiStuff("SlotEffect", 99, 0)
                                    : 2 == t
                                      ? 0.2 * m._customBlock_SushiStuff("SlotEffect", 99, 0)
                                      : 3 == t
                                        ? m._customBlock_SushiStuff("SlotEffect", 99, 0)
                                        : 99 == t
                                          ? 1 + m._customBlock_SushiStuff("KnowledgeBonusTOT", 8, 0) / 100
                                          : 0;
                            if ("FireTypesUnlocked" == e)
                                return Math.round(
                                    Math.min(1, m._customBlock_SushiStuff("UpgradeQTY", 24, 0)) +
                                        (Math.min(1, m._customBlock_SushiStuff("UpgradeQTY", 25, 0)) + (Math.min(1, m._customBlock_SushiStuff("UpgradeQTY", 26, 0)) + Math.min(1, m._customBlock_SushiStuff("UpgradeQTY", 27, 0))))
                                );
                            if ("FireplaceSparkMulti" == e) return 0.2 * k._customBlock_Log2(c.asNumber(a.engine.getGameAttribute("Sushi")[4][2])) + k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("Sushi")[4][2]));
                            if ("FireplaceEffect" == e)
                                return 0 == t
                                    ? m._customBlock_SushiStuff("FireplaceEffect", 99, 0)
                                    : 1 == t
                                      ? 150 * m._customBlock_SushiStuff("FireplaceEffect", 99, 0)
                                      : 2 == t
                                        ? 20 * m._customBlock_SushiStuff("FireplaceEffect", 99, 0)
                                        : 3 == t
                                          ? 100 * m._customBlock_SushiStuff("FireplaceEffect", 99, 0)
                                          : 99 == t
                                            ? (1 + m._customBlock_SushiStuff("KnowledgeBonusTOT", 9, 0) / 100) * (1 + m._customBlock_SushiStuff("FireplaceSparkMulti", 0, 0) / 100)
                                            : 0;
                            if ("isButtonUnlocked" == e)
                                return 0 == t
                                    ? 0 < m._customBlock_SushiStuff("UpgradeQTY", 42, 0)
                                        ? 1
                                        : 0
                                    : 1 == t
                                      ? 0 < m._customBlock_SushiStuff("UpgradeQTY", 17, 0)
                                          ? 1
                                          : 0
                                      : 2 == t
                                        ? 0 < m._customBlock_SushiStuff("UpgradeQTY", 18, 0)
                                            ? 1
                                            : 0
                                        : 0 < m._customBlock_SushiStuff("UpgradeQTY", 19, 0)
                                          ? 1
                                          : 0;
                            if ("MoneyHRdispUnlocked" == e) return 0 < m._customBlock_SushiStuff("UpgradeQTY", 41, 0) ? 1 : 0;
                            if ("ViewTiersUnlocked" == e) return 0 < m._customBlock_SushiStuff("UpgradeQTY", 43, 0) ? 1 : 0;
                            if ("KnowledgeLVunlocked" == e) return 0 < m._customBlock_SushiStuff("UpgradeQTY", 13, 0) ? 1 : 0;
                            if ("UniqueSushi" == e) {
                                if (((e = a.engine.getGameAttribute("DNSM")), !Object.prototype.hasOwnProperty.call(e.h, "UNQ_sushi") || -1 == t))
                                    for (
                                        i = a.engine.getGameAttribute("DNSM").h.UNQ_sushi = 0, e = Math.round(m._customBlock_SushiStuff("MaxTier", 0, 0) + 1);
                                        i < e && ((n = i++), 0 <= c.asNumber(a.engine.getGameAttribute("Sushi")[5][n]));
                                    )
                                        a.engine.getGameAttribute("DNSM").h.UNQ_sushi = n + 1;
                                return Math.round(c.asNumber(a.engine.getGameAttribute("DNSM").h.UNQ_sushi));
                            }
                            return "RoG_BonusQTY" == e ? (m._customBlock_SushiStuff("UniqueSushi", 0, 0) > t || 99 == i ? c.asNumber(a.engine.getGameAttribute("CustomLists").h.Research[37][0 | t]) : 0) : 1;
                        }
