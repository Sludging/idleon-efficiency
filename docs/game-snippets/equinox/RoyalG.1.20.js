/**
 * Game formula snippet — idleon-efficiency formula research.
 * Function: _customBlock_RoyalG (from scripts.ActorEvents_579)
 * Game version: 1.20 ("Royal_Guardian")
 * Captured: 2026-09-05 via game-debug-tool (findFunction + toString)
 * Case reference: #372
 */
function (e, t, i) {
                            if ("StatueUpgOdds" == e)
                                return 0 == a.engine.getGameAttribute("RoyalG")[0][0 | t]
                                    ? 1 / c.asNumber("25 50 100 250 500 1000 2500 10000".split(" ")[0 | t])
                                    : 1 / (10 * Math.ceil(((25 + 15 * Math.pow(t, 2)) * Math.max(1, 1 + (c.asNumber(a.engine.getGameAttribute("RoyalG")[0][0 | t]) - 1) / 4)) / 10));
                            if ("Statue_CanAfford" == e)
                                return 0 == a.engine.getGameAttribute("RoyalG")[0][0 | t]
                                    ? c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[5].behaviors.getBehavior("ActorEvents_232"), Oa)._ItemsAndStorageOWNED.h["RGshard" + t]) >= m._customBlock_RoyalG("Statue_Cost", 0, 0)
                                        ? 1
                                        : 0
                                    : c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[5].behaviors.getBehavior("ActorEvents_232"), Oa)._ItemsAndStorageOWNED.h.RGenh) >= m._customBlock_RoyalG("Statue_Cost", 0, 0)
                                      ? 1
                                      : 0;
                            if ("Statue_Cost" == e) return 1;
                            if ("StatueBon" == e)
                                return 0 == a.engine.getGameAttribute("RoyalG")[0][0 | t]
                                    ? 0
                                    : (1 + m._customBlock_RoyalG("ArmoryUpgBonus", 45, 0) / 100) *
                                          (c.asNumber(a.engine.getGameAttribute("CustomLists").h.Research[41][0 | t]) +
                                              c.asNumber(a.engine.getGameAttribute("CustomLists").h.Research[42][0 | t]) * Math.max(0, c.asNumber(a.engine.getGameAttribute("RoyalG")[0][0 | t]) - 1));
                            if ("SF_unlocked" == e) return 1 <= m._customBlock_RoyalG("ArmoryUpgBonus", 78, 0) ? 1 : 0;
                            if ("SF_maxLV" == e) return 3;
                            if ("SF_costo" == e) return 10 * (t + 1) * Math.pow(5, c.asNumber(a.engine.getGameAttribute("RoyalG")[22][0 | t]));
                            if ("SF_weOwn" == e) {
                                var s = n.__cast(a.engine.getGameAttribute("PixelHelperActor")[5].behaviors.getBehavior("ActorEvents_232"), Oa)._ItemsAndStorageOWNED,
                                    r = "RGshard" + c.asNumber(a.engine.getGameAttribute("CustomLists").h.StatueInfo[0 | t][4]);
                                return c.asNumber(s.h[r]);
                            }
                            if ("SF_bonus" == e)
                                return (
                                    2 *
                                    (300 * c.asNumber(a.engine.getGameAttribute("RoyalG")[22][0 | t]) +
                                        (100 * Math.floor(c.asNumber(a.engine.getGameAttribute("RoyalG")[22][0 | t]) / 2) + 200 * Math.floor(c.asNumber(a.engine.getGameAttribute("RoyalG")[22][0 | t]) / 3)))
                                );
                            if ("StatueEXPmulti" == e) return 1 + m._customBlock_RoyalG("SF_bonus", t, 0) / 100;
                            if ("ArmoryUpgUNLOCKED" == e) {
                                for (e = a.engine.getGameAttribute("DNSM").h.rArmoryDN = 0, i = a.engine.getGameAttribute("CustomLists").h.ArmoryUpg.length; e < i;) {
                                    var _ = e++;
                                    if (m._customBlock_RoyalG("ArmoryUpgTotal", 0, 0) >= c.asNumber(a.engine.getGameAttribute("CustomLists").h.ArmoryUpg[_][6])) {
                                        s = a.engine.getGameAttribute("DNSM");
                                        var o = c.asNumber(a.engine.getGameAttribute("DNSM").h.rArmoryDN) + 1;
                                        s.h.rArmoryDN = o;
                                    }
                                }
                                return Math.round(Math.min(c.asNumber(a.engine.getGameAttribute("DNSM").h.rArmoryDN), a.engine.getGameAttribute("CustomLists").h.Research[43].length));
                            }
                            if ("ArmoryUpgTotal" == e) {
                                if (((s = a.engine.getGameAttribute("DNSM")), !Object.prototype.hasOwnProperty.call(s.h, "rArmoryTotLV")))
                                    for (e = a.engine.getGameAttribute("DNSM").h.rArmoryTotLV = 0, i = a.engine.getGameAttribute("CustomLists").h.ArmoryUpg.length; e < i;)
                                        ((_ = e++),
                                            (s = a.engine.getGameAttribute("DNSM")),
                                            (o = c.asNumber(a.engine.getGameAttribute("DNSM").h.rArmoryTotLV) + c.asNumber(a.engine.getGameAttribute("RoyalG")[2][_])),
                                            (s.h.rArmoryTotLV = o));
                                return a.engine.getGameAttribute("DNSM").h.rArmoryTotLV;
                            }
                            if ("ArmoryUpgCost" == e)
                                return (3 > c.asNumber(a.engine.getGameAttribute("RoyalG")[2][46]) && 46 == c.asNumber(a.engine.getGameAttribute("CustomLists").h.Research[43][0 | t])) ||
                                    (1 > c.asNumber(a.engine.getGameAttribute("RoyalG")[2][58]) && 58 == c.asNumber(a.engine.getGameAttribute("CustomLists").h.Research[43][0 | t]))
                                    ? 46 == c.asNumber(a.engine.getGameAttribute("CustomLists").h.Research[43][0 | t])
                                        ? 2
                                        : 3
                                    : 25 *
                                          m._customBlock_Summoning("AllMasterclassCostRedux", 0, 0) *
                                          Math.pow(1.24, t) *
                                          (3 + 5 * t) *
                                          c.asNumber(a.engine.getGameAttribute("CustomLists").h.ArmoryUpg[0 | c.asNumber(a.engine.getGameAttribute("CustomLists").h.Research[43][0 | t])][1]) *
                                          Math.pow(
                                              c.asNumber(a.engine.getGameAttribute("CustomLists").h.ArmoryUpg[0 | c.asNumber(a.engine.getGameAttribute("CustomLists").h.Research[43][0 | t])][2]),
                                              c.asNumber(a.engine.getGameAttribute("RoyalG")[2][Math.round(c.asNumber(a.engine.getGameAttribute("CustomLists").h.Research[43][0 | t]))])
                                          );
                            if ("ArmoryUpgBonus" == e) return c.asNumber(a.engine.getGameAttribute("RoyalG")[2][0 | t]) * c.asNumber(a.engine.getGameAttribute("CustomLists").h.ArmoryUpg[0 | t][5]);
                            if ("RatResp" == e) return Math.max(5, 60 / (1 + (m._customBlock_RoyalG("ArmoryUpgBonus", 33, 0) + m._customBlock_RoyalG("ArmoryUpgBonus", 34, 0)) / 100));
                            if ("RatDMG" == e) return (10 + m._customBlock_RoyalG("ArmoryUpgBonus", 35, 0)) * (1 + m._customBlock_RoyalG("ArmoryUpgBonus", 36, 0) / 100);
                            if ("ParchmentDrop" == e)
                                return 1 <= m._customBlock_RoyalG("ArmoryUpgBonus", 37, 0)
                                    ? 0.001 * (1 + (m._customBlock_RoyalG("ArmoryUpgBonus", 38, 0) + (m._customBlock_Thingies("OrbletMarketBonus", 9, 0) + m._customBlock_Companions(172))) / 100)
                                    : 0.001;
                            if ("ParchmentDouble" == e) return m._customBlock_RoyalG("ArmoryUpgBonus", 39, 0) / 100;
                            if ("ParchmentRecycle" == e) return Math.min(0.75, m._customBlock_RoyalG("ArmoryUpgBonus", 40, 0) / 100);
                            if ("MarbleDrop" == e)
                                return (
                                    (1 / (1e3 + 300 * Math.pow(t, 2))) *
                                    Math.max(1, p._customBlock_getbonus2(1, 232, -1)) *
                                    (1 +
                                        (m._customBlock_RoyalG("ArmoryUpgBonus", 41, 0) +
                                            (m._customBlock_SushiStuff("RoG_BonusQTY", 62, 0) + (p._customBlock_ArcadeBonus(71) + (m._customBlock_Companions(172) + v._customBlock_EtcBonuses("107"))))) /
                                            100) *
                                    (1 + (50 * m._customBlock_Spelunk("DoWeHaveLoreN1", 9, 0)) / 100)
                                );
                            if ("GuardianRoyalRadius" == e) return 180;
                            if ("RI_chance" == e) return (k._customBlock_GetTalentNumber(1, 229) / 100) * (1 + m._customBlock_Thingies("OrbletMarketBonus", 5, 0) / 100);
                            if ("RI_mobs" == e)
                                return Math.floor(k._customBlock_GetTalentNumber(2, 229) + (10 * m._customBlock_RoyalG("isMapPurified", a.engine.getGameAttribute("CurrentMap"), 0) + m._customBlock_SushiStuff("RoG_BonusQTY", 61, 0)));
                            if ("OrbletMultiDrop" == e) return k._customBlock_GetTalentNumber(1, 234) + m._customBlock_SushiStuff("RoG_BonusQTY", 59, 0);
                            if ("KingdomEnabled" == e) return 16 == a.engine.getGameAttribute("CharacterClass") ? 1 : 0;
                            if ("Yi_OutpostInfo" == e) return Math.round(68 - 6 * m._customBlock_RoyalG("MapOutpostBarUnlockedTot", 0, 0));
                            if ("HasOutpost" == e)
                                return (
                                    120 != t && 216 != t && 306 != t && 41 != t && 39 != t && 43 != t && 8 != t && 9 != t && 0 != t % 50
                                        ? ((s = a.engine.getGameAttribute("CustomMaps").h.NonAFKscreens), (t = Object.prototype.hasOwnProperty.call(s.h, "" + t) || 9999 == a.engine.getGameAttribute("CustomLists").h.MapDetails[0 | t][2][0]))
                                        : (t = !0),
                                    t ? 0 : 1
                                );
                            if ("OutpostKillsReq" == e)
                                return (
                                    (s = a.engine.getGameAttribute("CustomMaps").h.RG_KillReq),
                                    Object.prototype.hasOwnProperty.call(s.h, "" + t)
                                        ? a.engine.getGameAttribute("CustomMaps").h.RG_KillReq.h["" + t]
                                        : 3 *
                                          (25 +
                                              5 * t +
                                              c.asNumber(a.engine.getGameAttribute("CustomLists").h.MapDetails[0 | t][0][0]) *
                                                  Math.pow(1.3 - 0.01 * Math.floor(t / 50), 0.2 * (t - 50 * Math.floor(t / 50))) *
                                                  Math.pow(4, Math.floor(t / 50)) *
                                                  (1 + 29 * Math.min(1, Math.floor(t / 50))))
                                );
                            if ("OutpostTypesUnlocked" == e) return Math.round(1 + (Math.min(1, m._customBlock_RoyalG("ArmoryUpgBonus", 42, 0)) + Math.min(1, m._customBlock_RoyalG("ArmoryUpgBonus", 44, 0))));
                            if ("OutpostTypesAllowed" == e) return 1 == t ? Math.round(m._customBlock_RoyalG("ArmoryUpgBonus", 42, 0)) : 2 == t ? Math.round(m._customBlock_RoyalG("ArmoryUpgBonus", 44, 0)) : 999;
                            if ("OutpostROGbon" == e)
                                return a.engine.getGameAttribute("RoyalG")[3][2] == t
                                    ? 0 == t
                                        ? 1 + (Math.max(1, m._customBlock_RoyalG("TotalStatz", 4, 0) - 6) / (40 + Math.max(1, m._customBlock_RoyalG("TotalStatz", 4, 0) - 6))) * 10
                                        : 1 == t
                                          ? 1 + (Math.max(1, m._customBlock_RoyalG("TotalStatz", 4, 0) - 6) / (40 + Math.max(1, m._customBlock_RoyalG("TotalStatz", 4, 0) - 6))) * 2
                                          : 2 == t
                                            ? 1 + Math.max(1, m._customBlock_RoyalG("TotalStatz", 4, 0) - 6) / (40 + Math.max(1, m._customBlock_RoyalG("TotalStatz", 4, 0) - 6))
                                            : 3 == t
                                              ? 1 + (Math.max(1, m._customBlock_RoyalG("TotalStatz", 4, 0) - 6) / (40 + Math.max(1, m._customBlock_RoyalG("TotalStatz", 4, 0) - 6))) * 4
                                              : 1
                                    : 1;
                            if ("SupportEXP" == e || "SupportCollection" == e) return 200 * (1 + m._customBlock_RoyalG("ArmoryUpgBonus", 43, 0) / 100);
                            if ("SavageCollection" == e) return 5 * (1 + m._customBlock_RoyalG("ArmoryUpgBonus", 69, 0) / 100);
                            if ("XtraClearKillz" == e) return Math.max(1, p._customBlock_getbonus2(1, 231, -1)) * (1 + (m._customBlock_Thingies("OrbletMarketBonus", 3, 0) + m._customBlock_Spelunk("BigFishBonuses", 6, 0)) / 100);
                            if ("BarExpRate_Base" == e)
                                return (
                                    (s = a.engine.getGameAttribute("DNSM")),
                                    (o = 1 + m._customBlock_Thingies("OrbletMarketBonus", 6, 0) / 100),
                                    (s.h.rBarXPdn = o),
                                    4 == t && ((s = a.engine.getGameAttribute("DNSM")), (o = c.asNumber(a.engine.getGameAttribute("DNSM").h.rBarXPdn) * (1 + m._customBlock_Spelunk("ShopUpgBonus", 65, 0) / 100)), (s.h.rBarXPdn = o)),
                                    1 <= m._customBlock_Spelunk("ShopUpgBonus", 77, 0) &&
                                        t == a.engine.getGameAttribute("RoyalG")[3][7] &&
                                        ((s = a.engine.getGameAttribute("DNSM")), (o = c.asNumber(a.engine.getGameAttribute("DNSM").h.rBarXPdn) * (1 + m._customBlock_Spelunk("ShopUpgBonus", 77, 0) / 100)), (s.h.rBarXPdn = o)),
                                    (1 + m._customBlock_RoyalG("UnitSpecEffect", c.asNumber(["1", "3", "5", "6", "7"][0 | t]), 0) / 100) * c.asNumber(a.engine.getGameAttribute("DNSM").h.rBarXPdn)
                                );
                            if ("BarExpRate" == e)
                                return (
                                    (a.engine.getGameAttribute("DNSM").h.rBarXPdn2 = 1),
                                    3 < a.engine.getGameAttribute("RoyalMaps")[0 | i].length &&
                                        1 <= c.asNumber(a.engine.getGameAttribute("RoyalMaps")[0 | i][12]) &&
                                        ((s = a.engine.getGameAttribute("DNSM")), (o = 2 * c.asNumber(a.engine.getGameAttribute("DNSM").h.rBarXPdn2)), (s.h.rBarXPdn2 = o)),
                                    m._customBlock_RoyalG("BarExpRate_Base", t, 1) *
                                        c.asNumber(a.engine.getGameAttribute("DNSM").h.rBarXPdn2) *
                                        (1 + (200 * m._customBlock_RoyalG("isMapPurified", t, 0)) / 100) *
                                        (1 + (m._customBlock_RoyalG("OutpostEXPrank", i, 1) * m._customBlock_RoyalG("ArmoryUpgBonus", 72, 0)) / 100) *
                                        (1 + (m._customBlock_RoyalG("SupportEXP", 0, 0) * m._customBlock_RoyalG("TotalSupports", i, 0)) / 100)
                                );
                            if ("MapOutpostBarUnlockedTot" == e) {
                                for (e = a.engine.getGameAttribute("DNSM").h.rArmoryDN = 0; 10 > e;)
                                    ((_ = e++),
                                        (s = a.engine.getGameAttribute("DNSM")),
                                        (o = Math.round(c.asNumber(a.engine.getGameAttribute("DNSM").h.rArmoryDN) + m._customBlock_RoyalG("MapOutpostBarUnlocked", _, 0))),
                                        (s.h.rArmoryDN = o));
                                return a.engine.getGameAttribute("DNSM").h.rArmoryDN;
                            }
                            if ("OutpostEXPformula" == e) return 4 == i ? 1e5 * Math.pow(10, t) : 2 == i ? (50 + 50 * t) * Math.pow(1.6, t) : (10 + 5 * t) * Math.pow(1.3, t);
                            if ("OutpostEXPreq" == e) {
                                for (
                                    a.engine.getGameAttribute("DNSM").h.rArmoryDN = 0;
                                    c.asNumber(a.engine.getGameAttribute("RoyalMaps")[0 | t][Math.round(3 + i)]) >= m._customBlock_RoyalG("OutpostEXPformula", c.asNumber(a.engine.getGameAttribute("DNSM").h.rArmoryDN), i);
                                )
                                    ((s = a.engine.getGameAttribute("DNSM")), (o = Math.round(c.asNumber(a.engine.getGameAttribute("DNSM").h.rArmoryDN) + 1)), (s.h.rArmoryDN = o));
                                return m._customBlock_RoyalG("OutpostEXPformula", c.asNumber(a.engine.getGameAttribute("DNSM").h.rArmoryDN), i);
                            }
                            if ("OutpostEXPreqPREV" == e) {
                                for (
                                    a.engine.getGameAttribute("DNSM").h.rArmoryDN = 0;
                                    c.asNumber(a.engine.getGameAttribute("RoyalMaps")[0 | t][Math.round(3 + i)]) >= m._customBlock_RoyalG("OutpostEXPformula", c.asNumber(a.engine.getGameAttribute("DNSM").h.rArmoryDN), i);
                                )
                                    ((s = a.engine.getGameAttribute("DNSM")), (o = Math.round(c.asNumber(a.engine.getGameAttribute("DNSM").h.rArmoryDN) + 1)), (s.h.rArmoryDN = o));
                                return 0 == a.engine.getGameAttribute("DNSM").h.rArmoryDN ? 0 : m._customBlock_RoyalG("OutpostEXPformula", Math.round(c.asNumber(a.engine.getGameAttribute("DNSM").h.rArmoryDN) - 1), i);
                            }
                            if ("OutpostEXPrank" == e) {
                                for (
                                    a.engine.getGameAttribute("DNSM").h.rArmoryDN = 0;
                                    c.asNumber(a.engine.getGameAttribute("RoyalMaps")[0 | t][Math.round(3 + i)]) >= m._customBlock_RoyalG("OutpostEXPformula", c.asNumber(a.engine.getGameAttribute("DNSM").h.rArmoryDN), i);
                                )
                                    ((s = a.engine.getGameAttribute("DNSM")), (o = Math.round(c.asNumber(a.engine.getGameAttribute("DNSM").h.rArmoryDN) + 1)), (s.h.rArmoryDN = o));
                                return a.engine.getGameAttribute("DNSM").h.rArmoryDN;
                            }
                            if ("OutpostPTSleft" == e)
                                return (
                                    (a.engine.getGameAttribute("DNSM").h.rArmoryPTS = 0),
                                    3 < a.engine.getGameAttribute("RoyalMaps")[0 | t].length &&
                                        ((s = a.engine.getGameAttribute("DNSM")),
                                        (o = 2 + (m._customBlock_RoyalG("ArmoryUpgBonus", Math.round(9 + Math.floor(t / 50)), 0) + m._customBlock_RoyalG("OutpostEXPrank", t, 0))),
                                        (s.h.rArmoryPTS = o),
                                        1 <= m._customBlock_RoyalG("ArmoryUpgBonus", 71, 0) &&
                                            ((s = a.engine.getGameAttribute("DNSM")),
                                            (o = c.asNumber(a.engine.getGameAttribute("DNSM").h.rArmoryPTS) + Math.floor(m._customBlock_RoyalG("OutpostEXPrank", t, 0) / (11 - m._customBlock_RoyalG("ArmoryUpgBonus", 71, 0)))),
                                            (s.h.rArmoryPTS = o)),
                                        1 <= c.asNumber(a.engine.getGameAttribute("RoyalMaps")[0 | t][12]) &&
                                            ((s = a.engine.getGameAttribute("DNSM")), (o = c.asNumber(a.engine.getGameAttribute("DNSM").h.rArmoryPTS) + 10), (s.h.rArmoryPTS = o)),
                                        (s = a.engine.getGameAttribute("DNSM")),
                                        (o = Math.round(c.asNumber(a.engine.getGameAttribute("DNSM").h.rArmoryPTS) - c.asNumber(a.engine.getGameAttribute("RoyalMaps")[0 | t][0]) * m._customBlock_RoyalG("OutpostCost", t, 0))),
                                        (s.h.rArmoryPTS = o),
                                        (s = a.engine.getGameAttribute("DNSM")),
                                        (o = Math.round(c.asNumber(a.engine.getGameAttribute("DNSM").h.rArmoryPTS) - c.asNumber(a.engine.getGameAttribute("RoyalMaps")[0 | t][1]) * m._customBlock_RoyalG("OutpostCost", t, 1))),
                                        (s.h.rArmoryPTS = o),
                                        (s = a.engine.getGameAttribute("DNSM")),
                                        (o = Math.round(c.asNumber(a.engine.getGameAttribute("DNSM").h.rArmoryPTS) - c.asNumber(a.engine.getGameAttribute("RoyalMaps")[0 | t][2]) * m._customBlock_RoyalG("OutpostCost", t, 2))),
                                        (s.h.rArmoryPTS = o)),
                                    a.engine.getGameAttribute("DNSM").h.rArmoryPTS
                                );
                            if ("OutpostCost" == e) return 0 == i ? 12 : 1 == i ? 2 : 1;
                            if ("OutpostLV_Bonuses" == e) return 0 == t ? 1 : 1 == t ? (0 == i ? 5 : 250) : 2 == t ? 10 : 1;
                            if ("UnitSpecEffect" == e)
                                return 0 == t
                                    ? 50 + m._customBlock_RoyalG("ArmoryUpgBonus", 19, 0)
                                    : 1 == t
                                      ? m._customBlock_RoyalG("ArmoryUpgBonus", 20, 0)
                                      : 2 == t
                                        ? 25 + m._customBlock_RoyalG("ArmoryUpgBonus", 21, 0)
                                        : 3 == t
                                          ? m._customBlock_RoyalG("ArmoryUpgBonus", 22, 0)
                                          : 4 == t
                                            ? 4e3 * (1 + m._customBlock_RoyalG("ArmoryUpgBonus", 23, 0) / 100) * m._customBlock_RoyalG("XtraClearKillz", 0, 0)
                                            : 5 == t
                                              ? m._customBlock_RoyalG("ArmoryUpgBonus", 24, 0)
                                              : 6 == t
                                                ? m._customBlock_RoyalG("ArmoryUpgBonus", 25, 0)
                                                : 7 == t
                                                  ? m._customBlock_RoyalG("ArmoryUpgBonus", 26, 0)
                                                  : 0;
                            if ("isMapPurified" == e) return 2 > a.engine.getGameAttribute("RoyalMaps")[0 | t].length ? 0 : Math.min(m._customBlock_RoyalG("OutpostEXPrank", t, 4), 1);
                            if ("OutpostResourceRate" == e)
                                return (
                                    125 *
                                    (1 + m._customBlock_Companions(141)) *
                                    (1 +
                                        (m._customBlock_Thingies("OrbletMarketBonus", 1, 0) +
                                            (m._customBlock_SushiStuff("RoG_BonusQTY", 60, 0) +
                                                (Math.min(50, c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.W14)) + (p._customBlock_ArcadeBonus(70) + m._customBlock_RoyalG("ArmoryUpgBonus", 70, 0))))) /
                                            100) *
                                    (1 + (m._customBlock_RoyalG("OutpostPurifyBonus", 0, 0) * m._customBlock_RoyalG("isMapPurified", t, 0)) / 100) *
                                    (1 + (m._customBlock_RoyalG("SupportCollection", 0, 0) * m._customBlock_RoyalG("TotalSupports", t, 0)) / 100) *
                                    (1 + (m._customBlock_RoyalG("OutpostLV_Bonuses", 1, 0) * c.asNumber(a.engine.getGameAttribute("RoyalMaps")[0 | t][1])) / 100) *
                                    (1 + (m._customBlock_RoyalG("OutpostEXPrank", t, 2) * m._customBlock_RoyalG("ArmoryUpgBonus", 73, 0)) / 100) *
                                    (1 + (m._customBlock_RoyalG("TotalStatz", 0, 0) * m._customBlock_RoyalG("ArmoryUpgBonus", 18, 0)) / 100) *
                                    (1 + (m._customBlock_RoyalG("TotalStatz", 1, 0) * m._customBlock_RoyalG("ArmoryUpgBonus", 50, 0)) / 100) *
                                    (1 + (m._customBlock_RoyalG("TotalStatz", 2, 0) * m._customBlock_RoyalG("ArmoryUpgBonus", 51, 0)) / 100) *
                                    (1 + (Math.floor(Math.max(0, c.asNumber(a.engine.getGameAttribute("Lv0")[0]) - 1e3) / 100) * m._customBlock_RoyalG("ArmoryUpgBonus", 52, 0)) / 100) *
                                    (1 + (m._customBlock_RoyalG("UnitSpecEffect", 0, 0) * m._customBlock_RoyalG("TotalUnitsz", t, 0)) / 100) *
                                    (1 + (p._customBlock_getbonus2(1, 225, -1) + p._customBlock_getbonus2(1, 226, -1)) / 100) *
                                    Math.max(1, p._customBlock_getbonus2(1, 230, -1)) *
                                    (1 + (m._customBlock_RoyalG("TotalStatz", 3, 0) * m._customBlock_RoyalG("ArmoryUpgBonus", 53, 0)) / 100) *
                                    (1 + m._customBlock_Thingies("ZenithMarketBonus", 10, 0) / 100) *
                                    Math.min(5, 1 + (10 * Math.max(0, Math.round(c.asNumber(a.engine.getGameAttribute("RoyalMaps")[0 | t][0]) - 5))) / 100)
                                );
                            if ("OutpostRange" == e)
                                return Math.floor(
                                    Math.min(
                                        999,
                                        80 +
                                            m._customBlock_Thingies("OrbletMarketBonus", 8, 0) +
                                            (m._customBlock_RoyalG("OutpostLV_Bonuses", 1, 1) * (c.asNumber(a.engine.getGameAttribute("RoyalMaps")[0 | t][1]) / (c.asNumber(a.engine.getGameAttribute("RoyalMaps")[0 | t][1]) + 100)) +
                                                (m._customBlock_RoyalG("UnitSpecEffect", 2, 0) * m._customBlock_RoyalG("TotalUnitsz", t, 2) + m._customBlock_RoyalG("OutpostEXPrank", t, 3) * m._customBlock_RoyalG("ArmoryUpgBonus", 74, 0)))
                                    )
                                );
                            if ("OutpostPurifyBonus" == e) return 200 + m._customBlock_RoyalG("ArmoryUpgBonus", 1, 0);
                            if ("MapOutpostBarUnlocked" == e)
                                return 0 == t
                                    ? 1 <= c.asNumber(a.engine.getGameAttribute("RoyalG")[2][27])
                                        ? 1
                                        : 0
                                    : 1 == t
                                      ? 1 <= c.asNumber(a.engine.getGameAttribute("RoyalG")[2][29])
                                          ? 1
                                          : 0
                                      : 2 == t
                                        ? 1 <= c.asNumber(a.engine.getGameAttribute("RoyalG")[2][73])
                                            ? 1
                                            : 0
                                        : 3 == t
                                          ? 1 <= c.asNumber(a.engine.getGameAttribute("RoyalG")[2][74])
                                              ? 1
                                              : 0
                                          : 4 == t && 1 <= c.asNumber(a.engine.getGameAttribute("RoyalG")[2][75])
                                            ? 1
                                            : 0;
                            if ("MapWorldsUnlocked" == e)
                                return Math.round(
                                    1 +
                                        (m._customBlock_RoyalG("ArmoryUpgBonus", 2, 0) +
                                            (m._customBlock_RoyalG("ArmoryUpgBonus", 3, 0) +
                                                (m._customBlock_RoyalG("ArmoryUpgBonus", 4, 0) +
                                                    (m._customBlock_RoyalG("ArmoryUpgBonus", 5, 0) +
                                                        (m._customBlock_RoyalG("ArmoryUpgBonus", 6, 0) + (m._customBlock_RoyalG("ArmoryUpgBonus", 7, 0) + m._customBlock_RoyalG("ArmoryUpgBonus", 8, 0)))))))
                                );
                            if ("MapButtonsUnlock" == e)
                                return (0 == t && 1 == m._customBlock_RoyalG("ArmoryUpgBonus", 30, 0)) || (1 == t && 1 == m._customBlock_RoyalG("ArmoryUpgBonus", 31, 0)) || (2 == t && 1 == m._customBlock_RoyalG("ArmoryUpgBonus", 32, 0))
                                    ? 1
                                    : 0;
                            if ("CanWeDoubleConnect" == e) return 1;
                            if ("UnitsUnlocked" == e)
                                return 0 == t
                                    ? Math.round(
                                          Math.min(
                                              4,
                                              1 + (Math.min(1, m._customBlock_RoyalG("ArmoryUpgBonus", 27, 0)) + Math.min(1, m._customBlock_RoyalG("ArmoryUpgBonus", 28, 0)) + Math.min(1, m._customBlock_RoyalG("ArmoryUpgBonus", 29, 0)))
                                          )
                                      )
                                    : 0;
                            if ("GEDunlocked" == e) return 1 <= m._customBlock_RoyalG("ArmoryUpgBonus", 57, 0) ? 1 : 0;
                            if ("ActiveKillClear" == e) return 1 <= m._customBlock_RoyalG("ArmoryUpgBonus", 58, 0) ? (1 + m._customBlock_RoyalG("ArmoryUpgBonus", 58, 0) / 100) * m._customBlock_RoyalG("XtraClearKillz", 0, 0) : 0;
                            if ("OutpostUnitSlots" == e) return Math.min(9, Math.min(6, 1 + c.asNumber(a.engine.getGameAttribute("RoyalMaps")[0 | t][0])));
                            if ("ResNodeQTYmax" == e)
                                return 5 * c.asNumber(a.engine.getGameAttribute("CustomLists").h.RoyalResources[0 | t][2]) * Math.pow(1.5, c.asNumber(a.engine.getGameAttribute("RoyalG")[5][0 | t])) * Math.pow(5, Math.floor(t / 20));
                            if ("ResNodes_LVUP" == e) return 1 <= m._customBlock_RoyalG("ArmoryUpgBonus", 0, 0) ? 1 : 0;
                            if ("ResNodes_LVUPbon" == e) return 25;
                            if ("PassiveUnitsz" == e)
                                return 0 == i
                                    ? Math.floor(Math.max(0, m._customBlock_RoyalG("OutpostEXPrank", t, 2)) / 4) + Math.min(1, c.asNumber(a.engine.getGameAttribute("RoyalMaps")[0 | t][12]))
                                    : 1 == i
                                      ? Math.floor(Math.max(0, m._customBlock_RoyalG("OutpostEXPrank", t, 2) - 1) / 4)
                                      : 2 == i
                                        ? Math.floor(Math.max(0, m._customBlock_RoyalG("OutpostEXPrank", t, 2) - 2) / 4)
                                        : 3 == i
                                          ? Math.floor(Math.max(0, m._customBlock_RoyalG("OutpostEXPrank", t, 2) - 3) / 4)
                                          : 0;
                            if ("TotalSupports" == e) {
                                if (((s = a.engine.getGameAttribute("DNSM")), !Object.prototype.hasOwnProperty.call(s.h, "RG_suppo")))
                                    for (s = a.engine.getGameAttribute("DNSM"), o = new l(), s.h.RG_suppo = o, e = 0, i = a.engine.getGameAttribute("RoyalMaps").length; e < i;)
                                        if (((_ = e++), 3 <= a.engine.getGameAttribute("RoyalMaps")[_].length && 1 == a.engine.getGameAttribute("RoyalMaps")[_][10])) {
                                            ((s = a.engine.getGameAttribute("DNSM").h.RG_suppo), (r = "" + Math.round(c.asNumber(a.engine.getGameAttribute("RoyalMaps")[_][8]) - 1e3)), (o = a.engine.getGameAttribute("DNSM").h.RG_suppo));
                                            var u = "" + Math.round(c.asNumber(a.engine.getGameAttribute("RoyalMaps")[_][8]) - 1e3);
                                            ((o = c.asNumber(o.h[u]) + 1),
                                                (s.h[r] = o),
                                                (s = a.engine.getGameAttribute("DNSM").h.RG_suppo),
                                                (r = "" + Math.round(c.asNumber(a.engine.getGameAttribute("RoyalMaps")[_][9]) - 1e3)),
                                                (o = a.engine.getGameAttribute("DNSM").h.RG_suppo),
                                                (_ = "" + Math.round(c.asNumber(a.engine.getGameAttribute("RoyalMaps")[_][9]) - 1e3)),
                                                (_ = c.asNumber(o.h[_]) + 1),
                                                (s.h[r] = _));
                                        }
                                return ((s = a.engine.getGameAttribute("DNSM").h.RG_suppo), Object.prototype.hasOwnProperty.call(s.h, "" + t) ? a.engine.getGameAttribute("DNSM").h.RG_suppo.h["" + t] : 0);
                            }
                            if ("TotalUnitsz" == e) {
                                if (
                                    ((s = a.engine.getGameAttribute("DNSM")),
                                    Object.prototype.hasOwnProperty.call(s.h, "TotUnitzAllMapz") || ((s = a.engine.getGameAttribute("DNSM")), (o = new l()), (s.h.TotUnitzAllMapz = o)),
                                    (s = a.engine.getGameAttribute("DNSM").h.TotUnitzAllMapz),
                                    !Object.prototype.hasOwnProperty.call(s.h, "" + t))
                                ) {
                                    for (
                                        o = [],
                                            (s = a.engine.getGameAttribute("DNSM")).h.TUAM_DL = o,
                                            a.engine.getGameAttribute("DNSM").h.TUAM_DL.push(0),
                                            a.engine.getGameAttribute("DNSM").h.TUAM_DL.push(0),
                                            a.engine.getGameAttribute("DNSM").h.TUAM_DL.push(0),
                                            a.engine.getGameAttribute("DNSM").h.TUAM_DL.push(0),
                                            e = 0;
                                        9 > e;
                                    )
                                        ((_ = e++),
                                            0 <= Math.round(c.asNumber(("" + h.string(a.engine.getGameAttribute("RoyalMaps")[0 | t][11])).charAt(_)) - 2) &&
                                                (a.engine.getGameAttribute("DNSM").h.TUAM_DL[Math.round(c.asNumber(("" + h.string(a.engine.getGameAttribute("RoyalMaps")[0 | t][11])).charAt(_)) - 2)] = Math.round(
                                                    c.asNumber(a.engine.getGameAttribute("DNSM").h.TUAM_DL[Math.round(c.asNumber(("" + h.string(a.engine.getGameAttribute("RoyalMaps")[0 | t][11])).charAt(_)) - 2)]) + 1
                                                )));
                                    ((a.engine.getGameAttribute("DNSM").h.TUAM_DL[0] = Math.round(c.asNumber(a.engine.getGameAttribute("DNSM").h.TUAM_DL[0]) + m._customBlock_RoyalG("PassiveUnitsz", t, 0))),
                                        (a.engine.getGameAttribute("DNSM").h.TUAM_DL[1] = Math.round(c.asNumber(a.engine.getGameAttribute("DNSM").h.TUAM_DL[1]) + m._customBlock_RoyalG("PassiveUnitsz", t, 1))),
                                        (a.engine.getGameAttribute("DNSM").h.TUAM_DL[2] = Math.round(c.asNumber(a.engine.getGameAttribute("DNSM").h.TUAM_DL[2]) + m._customBlock_RoyalG("PassiveUnitsz", t, 2))),
                                        (a.engine.getGameAttribute("DNSM").h.TUAM_DL[3] = Math.round(c.asNumber(a.engine.getGameAttribute("DNSM").h.TUAM_DL[3]) + m._customBlock_RoyalG("PassiveUnitsz", t, 3))),
                                        (s = a.engine.getGameAttribute("DNSM").h.TotUnitzAllMapz),
                                        (o = a.engine.getGameAttribute("DNSM").h.TUAM_DL),
                                        (s.h["" + t] = o));
                                }
                                return a.engine.getGameAttribute("DNSM").h.TotUnitzAllMapz.h["" + t][0 | i];
                            }
                            if ("TotalStatz" == e) {
                                if (
                                    ((s = a.engine.getGameAttribute("DNSM")),
                                    Object.prototype.hasOwnProperty.call(s.h, "TotKngdSt") || ((s = a.engine.getGameAttribute("DNSM")), (o = new l()), (s.h.TotKngdSt = o)),
                                    (s = a.engine.getGameAttribute("DNSM").h.TotKngdSt),
                                    !Object.prototype.hasOwnProperty.call(s.h, "" + t))
                                ) {
                                    if (((a.engine.getGameAttribute("DNSM").h.TKnS_DN = 0), 0 == t))
                                        for (e = 0, i = a.engine.getGameAttribute("RoyalG")[5].length; e < i;)
                                            ((_ = e++), (s = a.engine.getGameAttribute("DNSM")), (o = c.asNumber(a.engine.getGameAttribute("DNSM").h.TKnS_DN) + c.asNumber(a.engine.getGameAttribute("RoyalG")[5][_])), (s.h.TKnS_DN = o));
                                    else if (1 == t)
                                        for (e = 0, i = a.engine.getGameAttribute("RoyalMaps").length; e < i;)
                                            ((_ = e++),
                                                3 <= a.engine.getGameAttribute("RoyalMaps")[_].length &&
                                                    ((s = a.engine.getGameAttribute("DNSM")),
                                                    (o =
                                                        c.asNumber(a.engine.getGameAttribute("DNSM").h.TKnS_DN) +
                                                        (c.asNumber(a.engine.getGameAttribute("RoyalMaps")[_][0]) + (c.asNumber(a.engine.getGameAttribute("RoyalMaps")[_][1]) + c.asNumber(a.engine.getGameAttribute("RoyalMaps")[_][2])))),
                                                    (s.h.TKnS_DN = o)));
                                    else if (2 == t)
                                        for (e = 0, i = a.engine.getGameAttribute("RoyalMaps").length; e < i;)
                                            ((_ = e++),
                                                3 <= a.engine.getGameAttribute("RoyalMaps")[_].length &&
                                                    1 <= m._customBlock_RoyalG("OutpostEXPrank", _, 4) &&
                                                    ((s = a.engine.getGameAttribute("DNSM")), (o = c.asNumber(a.engine.getGameAttribute("DNSM").h.TKnS_DN) + 1), (s.h.TKnS_DN = o)));
                                    else if (3 == t)
                                        for (e = 0; 8 > e;)
                                            ((_ = e++),
                                                (s = a.engine.getGameAttribute("DNSM")),
                                                (o = c.asNumber(a.engine.getGameAttribute("DNSM").h.TKnS_DN) + k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("RoyalG")[1][10 * _]))),
                                                (s.h.TKnS_DN = o));
                                    else if (4 == t)
                                        for (e = 0, i = a.engine.getGameAttribute("RoyalMaps").length; e < i;)
                                            ((_ = e++),
                                                3 <= a.engine.getGameAttribute("RoyalMaps")[_].length && ((s = a.engine.getGameAttribute("DNSM")), (o = c.asNumber(a.engine.getGameAttribute("DNSM").h.TKnS_DN) + 1), (s.h.TKnS_DN = o)));
                                    ((s = a.engine.getGameAttribute("DNSM").h.TotKngdSt), (o = a.engine.getGameAttribute("DNSM").h.TKnS_DN), (s.h["" + t] = o));
                                }
                                return a.engine.getGameAttribute("DNSM").h.TotKngdSt.h["" + t];
                            }
                            return 69;
                        }