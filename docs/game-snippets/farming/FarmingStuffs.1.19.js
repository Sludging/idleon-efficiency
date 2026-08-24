// Function: FarmingStuffs
// Source script: scripts.ActorEvents_579
// Game version: 1.19
// Patch title: Summer_Event
// Captured: 2026-08-24
// Case: #355

function (e, t, i) {
                            if ("GrowthReq" == e)
                                return 6 == a.engine.getGameAttribute("FarmPlot")[0 | t][0] ? 25200 * m._customBlock_FarmingStuffs("GrowthRate", 0, 0) : 14400 * Math.pow(1.5, c.asNumber(a.engine.getGameAttribute("FarmPlot")[0 | t][0]));
                            if ("TotalStickers" == e) {
                                if (((e = a.engine.getGameAttribute("DNSM")), !Object.prototype.hasOwnProperty.call(e.h, "TotStickrz")))
                                    for (var s = (a.engine.getGameAttribute("DNSM").h.TotStickrz = 0), _ = a.engine.getGameAttribute("Research")[9].length; s < _; ) {
                                        ((i = s++), (e = a.engine.getGameAttribute("DNSM")));
                                        var o = Math.round(c.asNumber(a.engine.getGameAttribute("DNSM").h.TotStickrz) + c.asNumber(a.engine.getGameAttribute("Research")[9][i]));
                                        e.h.TotStickrz = o;
                                    }
                                return Math.round(c.asNumber(a.engine.getGameAttribute("DNSM").h.TotStickrz));
                            }
                            if ("StickerDMGmulti" == e)
                                return 1 == m._customBlock_ResearchStuff("FarmingStickerDMG_unlocked", 0, 0) ? 1 + (m._customBlock_ResearchStuff("Grid_Bonus", 47, 0) * m._customBlock_FarmingStuffs("TotalStickers", 0, 0)) / 100 : 1;
                            if ("StickersPerRow" == e) {
                                for (a.engine.getGameAttribute("DNSM").h.StickerDN = 18; m._customBlock_FarmingStuffs("TotalStickers", 0, 0) > 4 * c.asNumber(a.engine.getGameAttribute("DNSM").h.StickerDN); )
                                    ((e = a.engine.getGameAttribute("DNSM")), (o = Math.floor(2.25 * c.asNumber(a.engine.getGameAttribute("DNSM").h.StickerDN))), (e.h.StickerDN = o));
                                return a.engine.getGameAttribute("DNSM").h.StickerDN;
                            }
                            if ("NumberOfBigStickers" == e) return 7;
                            if ("StickerOdds" == e)
                                return (
                                    m._customBlock_FarmingStuffs("StickerOddsMulti", 0, 0) /
                                    (5e3 * Math.pow(7, t) * Math.pow(Math.max(10 - c.asNumber(a.engine.getGameAttribute("Research")[9][0 | t]), 5), c.asNumber(a.engine.getGameAttribute("Research")[9][0 | t])))
                                );
                            if ("StickerOddsMulti" == e)
                                return (
                                    Math.max(1, Math.pow(2, Math.min(12, c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[607]))) + 1500 * Math.max(0, c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[607]) - 11)) *
                                    (1 + m._customBlock_ResearchStuff("Grid_Bonus", 67, 2) / 100) *
                                    (1 + m._customBlock_ResearchStuff("Grid_Bonus", 88, 0) / 100) *
                                    (1 + m._customBlock_FarmingStuffs("StickerBonus", 5, 0) / 100) *
                                    (1 + p._customBlock_ArcadeBonus(64) / 100) *
                                    (1 + 0.02 * m._customBlock_GamingStatType("SuperBitType", 55, 0) * Math.max(0, c.asNumber(a.engine.getGameAttribute("Lv0")[16]) - 300)) *
                                    (1 + m._customBlock_SushiStuff("RoG_BonusQTY", 55, 0) / 100)
                                );
                            if ("StickerBonus" == e)
                                return (
                                    (1 + (m._customBlock_ResearchStuff("Grid_Bonus", 68, 2) + 30 * m._customBlock_Summoning("EventShopOwned", 37, 0)) / 100) *
                                    (1 + (20 * m._customBlock_GamingStatType("SuperBitType", 62, 0)) / 100) *
                                    c.asNumber(a.engine.getGameAttribute("Research")[9][0 | t]) *
                                    c.asNumber(a.engine.getGameAttribute("CustomLists").h.Research[25][0 | t])
                                );
                            if ("AttemptMegacropGrowth" == e) return 1 == m._customBlock_ResearchStuff("FarmingStickersUnlocked", 0, 0) && c.randomFloat() < m._customBlock_FarmingStuffs("StickerOdds", t, 0) * Math.max(1, i) ? 1 : 0;
                            if ("MedalSeedsAvailable" == e) return Math.min(50, m._customBlock_Spelunk("DoWeHaveLoreN1", 3, 0));
                            if ("OGunlocked" == e) return 1 <= c.asNumber(a.engine.getGameAttribute("FarmUpg")[10]) ? 1 : 0;
                            if ("LankRankEXPreq" == e)
                                return (
                                    (7 * c.asNumber(a.engine.getGameAttribute("FarmRank")[0][0 | t]) + 25 * Math.floor(c.asNumber(a.engine.getGameAttribute("FarmRank")[0][0 | t]) / 5) + 10) *
                                    Math.pow(1.11, c.asNumber(a.engine.getGameAttribute("FarmRank")[0][0 | t]))
                                );
                            if ("LandRank5thColumnMaxLV" == e)
                                return Math.round(1 + (m._customBlock_Summoning("GrimoireUpgBonus", 9, 0) + Math.ceil(m._customBlock_FarmingStuffs("ExoticBonusQTY", 15, 0))) + m._customBlock_Thingies("LegendPTS_bonus", 3, 0));
                            if ("LankRankPTSleft" == e) {
                                for (s = a.engine.getGameAttribute("DNSM").h.FarmiDNm = 0; 36 > s; )
                                    ((i = s++),
                                        (e = a.engine.getGameAttribute("DNSM")),
                                        (o = Math.round(c.asNumber(a.engine.getGameAttribute("DNSM").h.FarmiDNm) + c.asNumber(a.engine.getGameAttribute("FarmRank")[0][i]))),
                                        (e.h.FarmiDNm = o));
                                for (s = 0; 20 > s; )
                                    ((i = s++),
                                        (e = a.engine.getGameAttribute("DNSM")),
                                        (o = Math.round(c.asNumber(a.engine.getGameAttribute("DNSM").h.FarmiDNm) - c.asNumber(a.engine.getGameAttribute("FarmRank")[2][i]))),
                                        (e.h.FarmiDNm = o));
                                return a.engine.getGameAttribute("DNSM").h.FarmiDNm;
                            }
                            if ("LandRankUpgBonusTOTAL" == e)
                                return 0 == t
                                    ? (1 + m._customBlock_FarmingStuffs("LankRankUpgBonus", 3, 0) / 100) *
                                          (1 + m._customBlock_FarmingStuffs("LankRankUpgBonus", 10, 0) / 100) *
                                          (1 + m._customBlock_FarmingStuffs("LankRankUpgBonus", 15, 0) / 100)
                                    : 1 == t
                                      ? m._customBlock_FarmingStuffs("LankRankUpgBonus", 8, 0) + m._customBlock_FarmingStuffs("LankRankUpgBonus", 17, 0)
                                      : 2 == t
                                        ? m._customBlock_FarmingStuffs("LankRankUpgBonus", 6, 0) + m._customBlock_FarmingStuffs("LankRankUpgBonus", 13, 0)
                                        : 3 == t
                                          ? m._customBlock_FarmingStuffs("LankRankUpgBonus", 7, 0) + (m._customBlock_FarmingStuffs("LankRankUpgBonus", 11, 0) + m._customBlock_FarmingStuffs("LankRankUpgBonus", 18, 0))
                                          : 4 == t
                                            ? m._customBlock_FarmingStuffs("LankRankUpgBonus", 5, 0) + (m._customBlock_FarmingStuffs("LankRankUpgBonus", 12, 0) + m._customBlock_FarmingStuffs("LankRankUpgBonus", 16, 0))
                                            : 1;
                            if ("LankRankUpgBonus" == e)
                                return 4 == t || 9 == t || 14 == t || 19 == t
                                    ? Math.max(1, p._customBlock_getbonus2(1, 207, -1)) *
                                          (1 + m._customBlock_FarmingStuffs("ExoticBonusQTY", 14, 0) / 100) *
                                          c.asNumber(a.engine.getGameAttribute("CustomLists").h.NinjaInfo[36][0 | t]) *
                                          c.asNumber(a.engine.getGameAttribute("FarmRank")[2][0 | t])
                                    : Math.max(1, p._customBlock_getbonus2(1, 207, -1)) *
                                          (1 + m._customBlock_FarmingStuffs("ExoticBonusQTY", 14, 0) / 100) *
                                          ((1.7 * c.asNumber(a.engine.getGameAttribute("CustomLists").h.NinjaInfo[36][0 | t]) * c.asNumber(a.engine.getGameAttribute("FarmRank")[2][0 | t])) /
                                              (c.asNumber(a.engine.getGameAttribute("FarmRank")[2][0 | t]) + 80));
                            if ("NextOGchance" == e)
                                return (
                                    Math.pow(0.4, c.asNumber(a.engine.getGameAttribute("FarmPlot")[0 | t][5]) + 1) *
                                    Math.max(1, m._customBlock_FarmingStuffs("BasketUpgQTY", 1, 3)) *
                                    (1 + m._customBlock_Ninja("PristineBon", 11, 0) / 100) *
                                    (1 + c.asNumber(a.engine.getGameAttribute("DNSM").h.StarSigns.h[67]) / 100) *
                                    (1 + (2 * c.asNumber(a.engine.getGameAttribute("Tasks")[2][5][2])) / 100) *
                                    (1 + (15 * p._customBlock_AchieveStatus(365)) / 100) *
                                    (1 + m._customBlock_FarmingStuffs("LandRankUpgBonusTOTAL", 3, 0) / 100) *
                                    (1 + m._customBlock_FarmingStuffs("ExoticBonusQTY", 26, 0) / 100) *
                                    (1 + m._customBlock_FarmingStuffs("ExoticBonusQTY", 27, 0) / 100)
                                );
                            if ("OGmulti" == e) return Math.min(1e9, Math.max(1, Math.pow(2, c.asNumber(a.engine.getGameAttribute("FarmPlot")[0 | t][5]))));
                            if ("PlotOwned" == e)
                                return Math.round(
                                    Math.min(
                                        36,
                                        1 + (m._customBlock_FarmingStuffs("BasketUpgQTY", 0, 0) + (c.asNumber(a.engine.getGameAttribute("GemItemsPurchased")[135]) + Math.min(3, c.asNumber(a.engine.getGameAttribute("Tasks")[2][5][2]))))
                                    )
                                );
                            if ("CropSCbonMulti" == e)
                                return (
                                    (1 + p._customBlock_MainframeBonus(17) / 100) *
                                    (1 + (m._customBlock_Summoning("GrimoireUpgBonus", 22, 0) + (m._customBlock_FarmingStuffs("ExoticBonusQTY", 40, 0) + m._customBlock_Summoning("VaultUpgBonus", 79, 0))) / 100)
                                );
                            if ("CropSCbonus" == e)
                                return 0 == t && 1 == m._customBlock_Ninja("EmporiumBonus", 27, 0)
                                    ? 20 * Math.round(D.mapCount(a.engine.getGameAttribute("FarmCrop"))) * m._customBlock_FarmingStuffs("CropSCbonMulti", 0, 0)
                                    : 1 == t && 1 == m._customBlock_Ninja("EmporiumBonus", 24, 0)
                                      ? Math.pow(1.02, Math.round(D.mapCount(a.engine.getGameAttribute("FarmCrop")))) * m._customBlock_FarmingStuffs("CropSCbonMulti", 0, 0)
                                      : 2 == t && 1 == m._customBlock_Ninja("EmporiumBonus", 25, 0)
                                        ? 8 * Math.round(D.mapCount(a.engine.getGameAttribute("FarmCrop"))) * m._customBlock_FarmingStuffs("CropSCbonMulti", 0, 0)
                                        : 3 == t && 1 == m._customBlock_Ninja("EmporiumBonus", 26, 0)
                                          ? Math.pow(1.1, Math.round(D.mapCount(a.engine.getGameAttribute("FarmCrop")))) * m._customBlock_FarmingStuffs("CropSCbonMulti", 0, 0)
                                          : 4 == t && 1 == m._customBlock_Ninja("EmporiumBonus", 23, 0)
                                            ? 15 * Math.round(D.mapCount(a.engine.getGameAttribute("FarmCrop"))) * m._customBlock_FarmingStuffs("CropSCbonMulti", 0, 0)
                                            : 5 == t && 1 == m._customBlock_Ninja("EmporiumBonus", 28, 0)
                                              ? 7 * Math.round(D.mapCount(a.engine.getGameAttribute("FarmCrop"))) * m._customBlock_FarmingStuffs("CropSCbonMulti", 0, 0)
                                              : 6 == t && 1 == m._customBlock_Ninja("EmporiumBonus", 29, 0)
                                                ? 0.1 * Math.round(D.mapCount(a.engine.getGameAttribute("FarmCrop"))) * m._customBlock_FarmingStuffs("CropSCbonMulti", 0, 0)
                                                : 7 == t && 1 == m._customBlock_Ninja("EmporiumBonus", 38, 0)
                                                  ? Math.round(Math.max(0, D.mapCount(a.engine.getGameAttribute("FarmCrop")) - 100)) * m._customBlock_FarmingStuffs("CropSCbonMulti", 0, 0)
                                                  : 8 == t && 1 == m._customBlock_Ninja("EmporiumBonus", 40, 0)
                                                    ? 5 * Math.round(Math.max(0, D.mapCount(a.engine.getGameAttribute("FarmCrop")) - 200)) * m._customBlock_FarmingStuffs("CropSCbonMulti", 0, 0)
                                                    : 9 == t && 1 == m._customBlock_Ninja("EmporiumBonus", 44, 0)
                                                      ? Math.round(Math.max(0, Math.floor((D.mapCount(a.engine.getGameAttribute("FarmCrop")) - 200) / 10))) * m._customBlock_FarmingStuffs("CropSCbonMulti", 0, 0)
                                                      : 0;
                            if ("CropType" == e)
                                return Math.round(
                                    c.asNumber(a.engine.getGameAttribute("CustomLists").h.SeedInfo[0 | Math.max(0, c.asNumber(a.engine.getGameAttribute("FarmPlot")[0 | t][0]))][2]) +
                                        c.asNumber(a.engine.getGameAttribute("FarmPlot")[0 | t][2])
                                );
                            if ("MarketUpgUnlocked" == e) {
                                if (3 == t) return 8;
                                for (a.engine.getGameAttribute("DNSM").h.FarmiDN = 8, s = 0; 8 > s; )
                                    if (((i = s++), m._customBlock_FarmingStuffs("CropsFound", 1, 0) < c.asNumber(a.engine.getGameAttribute("CustomLists").h.MarketInfo[Math.round(i + 8 * t)][6]))) {
                                        a.engine.getGameAttribute("DNSM").h.FarmiDN = i;
                                        break;
                                    }
                                return a.engine.getGameAttribute("DNSM").h.FarmiDN;
                            }
                            if ("MarketCostType" == e)
                                return (
                                    0 == i && 0 == t
                                        ? ((e = a.engine.getGameAttribute("DNSM")),
                                          (o =
                                              c.asNumber(a.engine.getGameAttribute("CustomLists").h.MarketInfo[0][2]) +
                                              c.asNumber(a.engine.getGameAttribute("CustomLists").h.MarketInfo[0][3]) *
                                                  (c.asNumber(a.engine.getGameAttribute("FarmUpg")[2]) +
                                                      (2 * Math.floor(c.asNumber(a.engine.getGameAttribute("FarmUpg")[2]) / 3) + Math.floor(c.asNumber(a.engine.getGameAttribute("FarmUpg")[2]) / 4)))))
                                        : 3 == t
                                          ? ((e = a.engine.getGameAttribute("DNSM")),
                                            (o = c.asNumber(
                                                a.engine.getGameAttribute("CustomLists").h.MarketExoticInfo[
                                                    0 | c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[24].behaviors.getBehavior("ActorEvents_623"), xa)._GenINFO[181][0 | i])
                                                ][2]
                                            )))
                                          : ((e = a.engine.getGameAttribute("DNSM")),
                                            (o =
                                                c.asNumber(a.engine.getGameAttribute("CustomLists").h.MarketInfo[Math.round(i + 8 * t)][2]) +
                                                c.asNumber(a.engine.getGameAttribute("CustomLists").h.MarketInfo[Math.round(i + 8 * t)][3]) * c.asNumber(a.engine.getGameAttribute("FarmUpg")[Math.round(2 + i + 8 * t)]))),
                                    (e.h.FarmiDNmct = o),
                                    1e8 > c.asNumber(a.engine.getGameAttribute("DNSM").h.FarmiDNmct) ? Math.floor(c.asNumber(a.engine.getGameAttribute("DNSM").h.FarmiDNmct)) : a.engine.getGameAttribute("DNSM").h.FarmiDNmct
                                );
                            if ("MarketCostQTY" == e)
                                return (
                                    (e = a.engine.getGameAttribute("DNSM")),
                                    (o =
                                        Math.max(0.001, 1 - m._customBlock_Thingies("EmperorBon", 2, 0) / (m._customBlock_Thingies("EmperorBon", 2, 0) + 100)) *
                                        c.asNumber(a.engine.getGameAttribute("CustomLists").h.MarketInfo[Math.round(i + 8 * t)][4]) *
                                        Math.pow(c.asNumber(a.engine.getGameAttribute("CustomLists").h.MarketInfo[Math.round(i + 8 * t)][5]), c.asNumber(a.engine.getGameAttribute("FarmUpg")[Math.round(2 + i + 8 * t)]))),
                                    (e.h.FarmiDNmcqty = o),
                                    0 == t &&
                                        ((e = a.engine.getGameAttribute("DNSM")),
                                        (o =
                                            c.asNumber(a.engine.getGameAttribute("DNSM").h.FarmiDNmcqty) *
                                            Math.max(0.1, 1 - m._customBlock_FarmingStuffs("ExoticBonusQTY", 34, 0) / 100) *
                                            Math.max(0.1, 1 - m._customBlock_FarmingStuffs("ExoticBonusQTY", 35, 0) / 100)),
                                        (e.h.FarmiDNmcqty = o)),
                                    1 == t &&
                                        ((e = a.engine.getGameAttribute("DNSM")),
                                        (o =
                                            c.asNumber(a.engine.getGameAttribute("DNSM").h.FarmiDNmcqty) *
                                            Math.max(0.1, 1 - m._customBlock_FarmingStuffs("ExoticBonusQTY", 36, 0) / 100) *
                                            Math.max(0.1, 1 - m._customBlock_FarmingStuffs("ExoticBonusQTY", 37, 0) / 100)),
                                        (e.h.FarmiDNmcqty = o)),
                                    1e8 > c.asNumber(a.engine.getGameAttribute("DNSM").h.FarmiDNmcqty) ? Math.floor(c.asNumber(a.engine.getGameAttribute("DNSM").h.FarmiDNmcqty)) : a.engine.getGameAttribute("DNSM").h.FarmiDNmcqty
                                );
                            if ("ExoticPurchasesAllowed" == e)
                                return Math.round(
                                    4 +
                                        (m._customBlock_Minehead("BonusQTY", 8, 0) +
                                            (8 * m._customBlock_Summoning("EventShopOwned", 43, 0) + (m._customBlock_SushiStuff("RoG_BonusQTY", 33, 0) + 3 * m._customBlock_Dreamstuff("CloudBonus", 66))))
                                );
                            if ("PCTofExoticPurchasesFREE" == e) return Math.min(80, 30 * m._customBlock_Summoning("EventShopOwned", 43, 0)) + Math.min(25, 25 * m._customBlock_Minehead("BonusQTY", 8, 0));
                            if ("ExoticLVQTY" == e)
                                return Math.ceil((k._customBlock_Log2(t) / 2 + k._customBlock_getLOG(t)) * (1 + m._customBlock_FarmingStuffs("ExoticBonusQTY", 38, 0) / 100) * (1 + m._customBlock_Thingies("LegendPTS_bonus", 8, 0) / 100));
                            if ("ExoticBonusQTY" == e) {
                                if (((e = a.engine.getGameAttribute("DNSM")), !Object.prototype.hasOwnProperty.call(e.h, "ExoticFarmBon") || -1 == t)) {
                                    for (o = [], (e = a.engine.getGameAttribute("DNSM")).h.ExoticFarmBon = o, s = a.engine.getGameAttribute("DNSM").h.ExoticFarmDN = 0; 80 > s; )
                                        ((i = s++),
                                            (e = a.engine.getGameAttribute("DNSM")),
                                            (o = c.asNumber(a.engine.getGameAttribute("DNSM").h.ExoticFarmDN) + Math.ceil(c.asNumber(a.engine.getGameAttribute("FarmUpg")[Math.round(20 + i)]))),
                                            (e.h.ExoticFarmDN = o),
                                            1 == c.asNumber(a.engine.getGameAttribute("CustomLists").h.MarketExoticInfo[i][4])
                                                ? a.engine
                                                      .getGameAttribute("DNSM")
                                                      .h.ExoticFarmBon.push(
                                                          c.asNumber(a.engine.getGameAttribute("CustomLists").h.MarketExoticInfo[i][3]) *
                                                              (c.asNumber(a.engine.getGameAttribute("FarmUpg")[Math.round(20 + i)]) / (1e3 + c.asNumber(a.engine.getGameAttribute("FarmUpg")[Math.round(20 + i)])))
                                                      )
                                                : a.engine
                                                      .getGameAttribute("DNSM")
                                                      .h.ExoticFarmBon.push(c.asNumber(a.engine.getGameAttribute("CustomLists").h.MarketExoticInfo[i][3]) * c.asNumber(a.engine.getGameAttribute("FarmUpg")[Math.round(20 + i)])));
                                    (a.engine.getGameAttribute("DNSM").h.ExoticFarmBon.push(a.engine.getGameAttribute("DNSM").h.ExoticFarmDN),
                                        (e = a.engine.getGameAttribute("DNSM")),
                                        Object.prototype.hasOwnProperty.call(e.h, "ExoticFarmDN") && delete e.h.ExoticFarmDN);
                                }
                                return -1 == t ? 0 : 99 == t ? a.engine.getGameAttribute("DNSM").h.ExoticFarmBon[80] : a.engine.getGameAttribute("DNSM").h.ExoticFarmBon[0 | t];
                            }
                            if ("MarketMaxLV" == e)
                                return 0 == i || (1 == t && 5 == i)
                                    ? Math.floor(c.asNumber(a.engine.getGameAttribute("CustomLists").h.MarketInfo[Math.round(i + 8 * t)][7]))
                                    : Math.floor(m._customBlock_ResearchStuff("Grid_Bonus", 171, 0) + c.asNumber(a.engine.getGameAttribute("CustomLists").h.MarketInfo[Math.round(i + 8 * t)][7]));
                            if ("NextCropChance" == e)
                                return 2 > c.asNumber(a.engine.getGameAttribute("Lv0")[16])
                                    ? 0
                                    : 99 == t
                                      ? (1 + m._customBlock_FarmingStuffs("BasketUpgQTY", 0, 4) / 100) *
                                        (1 + m._customBlock_Summoning("WinBonus", 10, 0) / 100) *
                                        (1 + m._customBlock_Holes("LampBonuses", 2, 0) / 100) *
                                        (1 + m._customBlock_SushiStuff("RoG_BonusQTY", 35, 0) / 100) *
                                        (1 + c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.W10AllCharz) / 100) *
                                        (1 + c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.Y6) / 100) *
                                        (1 + c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchVials.h["6FarmEvo"]) / 100) *
                                        (1 + (50 * x._customBlock_RunCodeOfTypeXforThingY("CardLv", "w7b5")) / 100) *
                                        (1 + r._customBlock_MealBonus("zCropEvo") / 100) *
                                        (1 + m._customBlock_Summoning("VaultUpgBonus", 78, 0) / 100) *
                                        (1 + m._customBlock_Holes("MonumentROGbonuses", 2, 4) / 100) *
                                        (1 + k._customBlock_StampBonusOfTypeX("CropEvo") / 100) *
                                        (1 + m._customBlock_Summoning("GrimoireUpgBonus", 14, 0) / 100) *
                                        (1 + (r._customBlock_MealBonus("zCropEvoSumm") * Math.ceil((c.asNumber(a.engine.getGameAttribute("Lv0")[18]) + 1) / 50)) / 100) *
                                        (1 + (5 * p._customBlock_AchieveStatus(355)) / 100) *
                                        Math.max(1, m._customBlock_RandomEvent("KillroyBonuses", 1, 0)) *
                                        Math.max(1, m._customBlock_FarmingStuffs("BasketUpgQTY", 99, 1)) *
                                        (1 + (15 * m._customBlock_RiftStuff("RiftSkillBonus,15", 1)) / 100) *
                                        (1 + (c.asNumber(a.engine.getGameAttribute("DNSM").h.StarSigns.h[65]) * c.asNumber(a.engine.getGameAttribute("Lv0")[16])) / 100) *
                                        Math.max(1, m._customBlock_FarmingStuffs("LandRankUpgBonusTOTAL", 0, 0)) *
                                        Math.max(1, p._customBlock_getbonus2(1, 205, -1)) *
                                        (1 + (m._customBlock_FarmingStuffs("LankRankUpgBonus", 0, 0) * c.asNumber(a.engine.getGameAttribute("FarmRank")[0][0]) + m._customBlock_Summoning("VotingBonusz", 29, 0)) / 100) *
                                        (1 + m._customBlock_FarmingStuffs("ExoticBonusQTY", 0, 0) / 100) *
                                        (1 + m._customBlock_Minehead("Button_Bonuses", 5, 0) / 100) *
                                        (1 + m._customBlock_FarmingStuffs("ExoticBonusQTY", 1, 0) / 100) *
                                        (1 + m._customBlock_FarmingStuffs("StickerBonus", 4, 0) / 100) *
                                        (1 + m._customBlock_FarmingStuffs("ExoticBonusQTY", 2, 0) / 100) *
                                        (1 + m._customBlock_FarmingStuffs("ExoticBonusQTY", 3, 0) / 100) *
                                        (1 +
                                            (Math.max(0, c.asNumber(a.engine.getGameAttribute("Lv0")[16]) - 50) * m._customBlock_FarmingStuffs("ExoticBonusQTY", 4, 0) +
                                                (Math.max(0, c.asNumber(a.engine.getGameAttribute("Lv0")[16]) - 100) * m._customBlock_FarmingStuffs("ExoticBonusQTY", 5, 0) +
                                                    (Math.max(0, c.asNumber(a.engine.getGameAttribute("Lv0")[16]) - 150) * m._customBlock_FarmingStuffs("ExoticBonusQTY", 6, 0) +
                                                        (Math.max(0, c.asNumber(a.engine.getGameAttribute("Lv0")[16]) - 200) * m._customBlock_FarmingStuffs("ExoticBonusQTY", 7, 0) +
                                                            Math.max(0, c.asNumber(a.engine.getGameAttribute("Lv0")[16]) - 250) * m._customBlock_FarmingStuffs("ExoticBonusQTY", 8, 0))))) /
                                                100)
                                      : m._customBlock_FarmingStuffs("CropType", t, 0) == c.asNumber(a.engine.getGameAttribute("CustomLists").h.SeedInfo[0 | c.asNumber(a.engine.getGameAttribute("FarmPlot")[0 | t][0])][3])
                                        ? 0
                                        : (1 + m._customBlock_FarmingStuffs("BasketUpgQTY", 0, 4) / 100) *
                                          (1 + m._customBlock_Summoning("WinBonus", 10, 0) / 100) *
                                          (1 + m._customBlock_Holes("LampBonuses", 2, 0) / 100) *
                                          (1 + m._customBlock_SushiStuff("RoG_BonusQTY", 35, 0) / 100) *
                                          (1 + c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.W10AllCharz) / 100) *
                                          (1 + c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.Y6) / 100) *
                                          (1 + c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchVials.h["6FarmEvo"]) / 100) *
                                          (1 + (50 * x._customBlock_RunCodeOfTypeXforThingY("CardLv", "w7b5")) / 100) *
                                          (1 + r._customBlock_MealBonus("zCropEvo") / 100) *
                                          (1 + m._customBlock_Summoning("VaultUpgBonus", 78, 0) / 100) *
                                          (1 + m._customBlock_Holes("MonumentROGbonuses", 2, 4) / 100) *
                                          (1 + k._customBlock_StampBonusOfTypeX("CropEvo") / 100) *
                                          (1 + m._customBlock_Summoning("GrimoireUpgBonus", 14, 0) / 100) *
                                          (1 + (r._customBlock_MealBonus("zCropEvoSumm") * Math.ceil((c.asNumber(a.engine.getGameAttribute("Lv0")[18]) + 1) / 50)) / 100) *
                                          (1 + (5 * p._customBlock_AchieveStatus(355)) / 100) *
                                          Math.max(1, m._customBlock_RandomEvent("KillroyBonuses", 1, 0)) *
                                          Math.max(1, m._customBlock_FarmingStuffs("BasketUpgQTY", 99, 1)) *
                                          (1 + (15 * m._customBlock_RiftStuff("RiftSkillBonus,15", 1)) / 100) *
                                          (1 + (c.asNumber(a.engine.getGameAttribute("DNSM").h.StarSigns.h[65]) * c.asNumber(a.engine.getGameAttribute("Lv0")[16])) / 100) *
                                          Math.max(1, m._customBlock_FarmingStuffs("LandRankUpgBonusTOTAL", 0, 0)) *
                                          Math.max(1, p._customBlock_getbonus2(1, 205, -1)) *
                                          (1 + (m._customBlock_FarmingStuffs("LankRankUpgBonus", 0, 0) * c.asNumber(a.engine.getGameAttribute("FarmRank")[0][0 | t]) + m._customBlock_Summoning("VotingBonusz", 29, 0)) / 100) *
                                          (1 + m._customBlock_FarmingStuffs("ExoticBonusQTY", 0, 0) / 100) *
                                          (1 + m._customBlock_Minehead("Button_Bonuses", 5, 0) / 100) *
                                          (1 + m._customBlock_FarmingStuffs("ExoticBonusQTY", 1, 0) / 100) *
                                          (1 + m._customBlock_FarmingStuffs("StickerBonus", 4, 0) / 100) *
                                          (1 + m._customBlock_FarmingStuffs("ExoticBonusQTY", 2, 0) / 100) *
                                          (1 + m._customBlock_FarmingStuffs("ExoticBonusQTY", 3, 0) / 100) *
                                          (1 +
                                              (Math.max(0, c.asNumber(a.engine.getGameAttribute("Lv0")[16]) - 50) * m._customBlock_FarmingStuffs("ExoticBonusQTY", 4, 0) +
                                                  (Math.max(0, c.asNumber(a.engine.getGameAttribute("Lv0")[16]) - 100) * m._customBlock_FarmingStuffs("ExoticBonusQTY", 5, 0) +
                                                      (Math.max(0, c.asNumber(a.engine.getGameAttribute("Lv0")[16]) - 150) * m._customBlock_FarmingStuffs("ExoticBonusQTY", 6, 0) +
                                                          (Math.max(0, c.asNumber(a.engine.getGameAttribute("Lv0")[16]) - 200) * m._customBlock_FarmingStuffs("ExoticBonusQTY", 7, 0) +
                                                              Math.max(0, c.asNumber(a.engine.getGameAttribute("Lv0")[16]) - 250) * m._customBlock_FarmingStuffs("ExoticBonusQTY", 8, 0))))) /
                                                  100) *
                                          c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[24].behaviors.getBehavior("ActorEvents_623"), xa)._GenINFO[68][0 | c.asNumber(a.engine.getGameAttribute("FarmPlot")[0 | t][0])]) *
                                          Math.pow(
                                              m._customBlock_FarmingStuffs("NextCropChanceDENOM", c.asNumber(a.engine.getGameAttribute("CustomLists").h.SeedInfo[0 | c.asNumber(a.engine.getGameAttribute("FarmPlot")[0 | t][0])][6]), 0),
                                              c.asNumber(a.engine.getGameAttribute("FarmPlot")[0 | t][2])
                                          );
                            if ("NextCropChanceDENOM" == e) return 6942e-8 == t ? 1 / Math.pow(10, 110) : t;
                            if ("CropsBonusValue" == e)
                                return 69420 == i
                                    ? Math.min(
                                          1e4 * (1 + (m._customBlock_FarmingStuffs("ExoticBonusQTY", 23, 0) + (m._customBlock_FarmingStuffs("ExoticBonusQTY", 24, 0) + m._customBlock_FarmingStuffs("ExoticBonusQTY", 25, 0))) / 100),
                                          Math.round(
                                              (1 + m._customBlock_FarmingStuffs("LandRankUpgBonusTOTAL", 1, 0) / 100) *
                                                  Math.max(1, m._customBlock_FarmingStuffs("BasketUpgQTY", 99, 6)) *
                                                  (1 + (m._customBlock_FarmingStuffs("LankRankUpgBonus", 1, 0) * c.asNumber(a.engine.getGameAttribute("FarmRank")[0][0 | t]) + m._customBlock_Summoning("VotingBonusz", 29, 0)) / 100)
                                          )
                                      )
                                    : Math.min(
                                          1e4 * (1 + (m._customBlock_FarmingStuffs("ExoticBonusQTY", 23, 0) + (m._customBlock_FarmingStuffs("ExoticBonusQTY", 24, 0) + m._customBlock_FarmingStuffs("ExoticBonusQTY", 25, 0))) / 100),
                                          Math.round(
                                              Math.max(
                                                  1,
                                                  Math.floor(
                                                      1 +
                                                          (c.randomFloat() +
                                                              (m._customBlock_FarmingStuffs("BasketUpgQTY", 0, 5) + (m._customBlock_FarmingStuffs("ExoticBonusQTY", 28, 0) + m._customBlock_FarmingStuffs("ExoticBonusQTY", 29, 0))) / 100)
                                                  )
                                              ) *
                                                  (1 + m._customBlock_FarmingStuffs("LandRankUpgBonusTOTAL", 1, 0) / 100) *
                                                  Math.max(1, m._customBlock_FarmingStuffs("BasketUpgQTY", 99, 6)) *
                                                  (1 + (m._customBlock_FarmingStuffs("LankRankUpgBonus", 1, 0) * c.asNumber(a.engine.getGameAttribute("FarmRank")[0][0 | t]) + m._customBlock_Summoning("VotingBonusz", 29, 0)) / 100)
                                          )
                                      );
                            if ("CropsOnVine" == e)
                                return Math.floor(
                                    1 +
                                        (c.randomFloat() +
                                            (m._customBlock_FarmingStuffs("BasketUpgQTY", 0, 1) +
                                                (20 * c.asNumber(a.engine.getGameAttribute("GemItemsPurchased")[139]) +
                                                    (m._customBlock_FarmingStuffs("ExoticBonusQTY", 31, 0) + m._customBlock_FarmingStuffs("ExoticBonusQTY", 32, 0) + m._customBlock_FarmingStuffs("ExoticBonusQTY", 33, 0)))) /
                                                100)
                                );
                            if ("GrowthRate" == e)
                                return (
                                    Math.max(1, m._customBlock_FarmingStuffs("BasketUpgQTY", 99, 2)) *
                                    (1 + (m._customBlock_FarmingStuffs("BasketUpgQTY", 0, 2) + (c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchVials.h["6FarmSpd"]) + m._customBlock_FarmingStuffs("ExoticBonusQTY", 30, 0))) / 100) *
                                    (1 + m._customBlock_Summoning("WinBonus", 2, 0) / 100)
                                );
                            if ("FarmingEXP" == e)
                                return (
                                    Math.max(1, m._customBlock_FarmingStuffs("BasketUpgQTY", 99, 4)) *
                                    x._customBlock_SkillStats("AllSkillxpMULTI") *
                                    (1 +
                                        (m._customBlock_FarmingStuffs("BasketUpgQTY", 0, 3) +
                                            (m._customBlock_GamingStatType("MSA_Bonus", 6, 0) +
                                                25 * m._customBlock_RiftStuff("RiftSkillBonus,15", 0) +
                                                (r._customBlock_MealBonus("zFarmExp") + (p._customBlock_ArcadeBonus(36) + (m._customBlock_FarmingStuffs("ExoticBonusQTY", 21, 0) + m._customBlock_Summoning("VaultUpgBonus", 77, 0)))))) /
                                            100) *
                                    (1 + m._customBlock_FarmingStuffs("ExoticBonusQTY", 22, 0) / 100) *
                                    (1 + m._customBlock_Summoning("WinBonus", 8, 0) / 100) *
                                    (1 +
                                        (c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchVials.h["6FarmEXP"]) +
                                            (x._customBlock_ArbitraryCode("StatueBonusGiven25") + (2 * x._customBlock_RunCodeOfTypeXforThingY("CardLv", "w6b2") + m._customBlock_Ninja("PristineBon", 9, 0))) +
                                            (p._customBlock_MainframeBonus(16) +
                                                (c.asNumber(a.engine.getGameAttribute("DNSM").h.StarSigns.h[66]) +
                                                    (p._customBlock_GuildBonuses(14) + (10 * p._customBlock_AchieveStatus(360) + (15 * p._customBlock_AchieveStatus(356) + m._customBlock_Summoning("VotingBonusz", 29, 0))))))) /
                                            100) *
                                    (1 + (p._customBlock_Breeding("ShinyBonusS", "Nah", 24, -1) + 2 * c.asNumber(a.engine.getGameAttribute("Tasks")[2][5][2])) / 100) *
                                    (1 + m._customBlock_FarmingStuffs("LandRankUpgBonusTOTAL", 4, 0) / 100) *
                                    (1 + p._customBlock_getbonus2(1, 206, -1) / 100)
                                );
                            if ("BeanTradeQTY" == e) {
                                ((a.engine.getGameAttribute("DNSM").h.FarmiBeanDN = 0), (e = a.engine.getGameAttribute("FarmCrop").h));
                                for (var u = (t = Object.keys(e)).length, h = 0; h < u; ) {
                                    var g = t[h++];
                                    for (e = a.engine.getGameAttribute("DNSM"), o = c.asNumber(g), e.h.FarmiBeanDN2 = o, s = 0, _ = a.engine.getGameAttribute("CustomLists").h.SeedInfo.length; s < _; )
                                        if (((i = s++), c.asNumber(a.engine.getGameAttribute("DNSM").h.FarmiBeanDN2) <= c.asNumber(a.engine.getGameAttribute("CustomLists").h.SeedInfo[i][3]))) {
                                            ((e = a.engine.getGameAttribute("DNSM")),
                                                (i =
                                                    c.asNumber(a.engine.getGameAttribute("DNSM").h.FarmiBeanDN) +
                                                    c.asNumber(a.engine.getGameAttribute("FarmCrop").h["" + g]) *
                                                        Math.pow(2.5, i) *
                                                        Math.pow(1.08, c.asNumber(a.engine.getGameAttribute("DNSM").h.FarmiBeanDN2) - c.asNumber(a.engine.getGameAttribute("CustomLists").h.SeedInfo[i][2]))),
                                                (e.h.FarmiBeanDN = i));
                                            break;
                                        }
                                }
                                return (
                                    Math.pow(c.asNumber(a.engine.getGameAttribute("DNSM").h.FarmiBeanDN), 0.5) *
                                    (1 + m._customBlock_FarmingStuffs("BasketUpgQTY", 0, 6) / 100) *
                                    (1 +
                                        (25 * m._customBlock_Ninja("EmporiumBonus", 15, 0) +
                                            (5 * p._customBlock_AchieveStatus(363) +
                                                (m._customBlock_FarmingStuffs("ExoticBonusQTY", 16, 0) +
                                                    (m._customBlock_FarmingStuffs("ExoticBonusQTY", 17, 0) + (m._customBlock_FarmingStuffs("ExoticBonusQTY", 18, 0) + m._customBlock_Summoning("VaultUpgBonus", 85, 0)))))) /
                                            100) *
                                    (1 + m._customBlock_FarmingStuffs("ExoticBonusQTY", 19, 0) / 100) *
                                    (1 + m._customBlock_FarmingStuffs("ExoticBonusQTY", 20, 0) / 100)
                                );
                            }
                            return "PlotRankGain" == e
                                ? (1 + p._customBlock_getbonus2(1, 206, -1) / 100) *
                                      (1 +
                                          (m._customBlock_FarmingStuffs("BasketUpgQTY", 0, 7) +
                                              (m._customBlock_FarmingStuffs("ExoticBonusQTY", 9, 0) + m._customBlock_FarmingStuffs("ExoticBonusQTY", 10, 0)) +
                                              m._customBlock_FarmingStuffs("ExoticBonusQTY", 11, 0)) /
                                              100) *
                                      (1 + m._customBlock_FarmingStuffs("ExoticBonusQTY", 12, 0) / 100) *
                                      (1 + m._customBlock_FarmingStuffs("ExoticBonusQTY", 13, 0) / 100)
                                : "NewPlotUnlocked" == e
                                  ? 0
                                  : "CropsFound" == e
                                    ? D.mapCount(a.engine.getGameAttribute("FarmCrop"))
                                    : "BasketUpgQTY" == e
                                      ? 0 == t
                                          ? c.asNumber(a.engine.getGameAttribute("FarmUpg")[Math.round(2 + i + 8 * Math.min(1, t))]) * c.asNumber(a.engine.getGameAttribute("CustomLists").h.MarketInfo[Math.round(i + 8 * Math.min(1, t))][8])
                                          : 99 == t
                                            ? 7 == i
                                                ? 1 +
                                                  (c.asNumber(a.engine.getGameAttribute("FarmUpg")[Math.round(2 + i + 8)]) *
                                                      c.asNumber(a.engine.getGameAttribute("CustomLists").h.MarketInfo[Math.round(i + 8)][8]) *
                                                      c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[24].behaviors.getBehavior("ActorEvents_623"), xa)._GenINFO[71][Math.round(Math.floor(i / 2) + Math.floor(i / 7))])) /
                                                      100
                                                : 1 == i
                                                  ? Math.max(1, m._customBlock_FarmingStuffs("BasketUpgQTY", 99, 7)) *
                                                    Math.pow(
                                                        1 + (c.asNumber(a.engine.getGameAttribute("FarmUpg")[Math.round(2 + i + 8)]) * c.asNumber(a.engine.getGameAttribute("CustomLists").h.MarketInfo[Math.round(i + 8)][8])) / 100,
                                                        c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[24].behaviors.getBehavior("ActorEvents_623"), xa)._GenINFO[71][Math.round(Math.floor(i / 2) + Math.floor(i / 7))])
                                                    )
                                                  : 5 == i
                                                    ? 1 <= c.asNumber(a.engine.getGameAttribute("FarmUpg")[Math.round(2 + i + 8)])
                                                        ? 1
                                                        : 0
                                                    : Math.max(1, m._customBlock_FarmingStuffs("BasketUpgQTY", 99, 7)) *
                                                      (1 +
                                                          (c.asNumber(a.engine.getGameAttribute("FarmUpg")[Math.round(2 + i + 8)]) *
                                                              c.asNumber(a.engine.getGameAttribute("CustomLists").h.MarketInfo[Math.round(i + 8)][8]) *
                                                              c.asNumber(
                                                                  n.__cast(a.engine.getGameAttribute("PixelHelperActor")[24].behaviors.getBehavior("ActorEvents_623"), xa)._GenINFO[71][Math.round(Math.floor(i / 2) + Math.floor(i / 7))]
                                                              )) /
                                                              100)
                                            : 1 == i || 3 == i
                                              ? 1 + (c.asNumber(a.engine.getGameAttribute("FarmUpg")[Math.round(2 + i + 8 * t)]) * c.asNumber(a.engine.getGameAttribute("CustomLists").h.MarketInfo[Math.round(i + 8 * t)][8])) / 100
                                              : c.asNumber(a.engine.getGameAttribute("FarmUpg")[Math.round(2 + i + 8 * t)]) * c.asNumber(a.engine.getGameAttribute("CustomLists").h.MarketInfo[Math.round(i + 8 * t)][8])
                                      : 420.69;
                        }