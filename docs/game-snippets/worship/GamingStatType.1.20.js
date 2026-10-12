/**
 * Game formula snippet — idleon-efficiency formula research.
 * Function: _customBlock_GamingStatType (from scripts.ActorEvents_579)
 * Game version: 1.20 ("Royal_Guardian")
 * Captured: 2026-09-04 via game-debug-tool (findFunction + toString)
 * Case reference: #350
 */
function (e, t, i) {
                            if ("FertilizerUpgCosts" == e)
                                return 0 == t
                                    ? (1 + (3 * c.asNumber(a.engine.getGameAttribute("Gaming")[1]) + Math.pow(c.asNumber(a.engine.getGameAttribute("Gaming")[1]), 2))) *
                                          Math.pow(
                                              Math.min(1.25, Math.max(1.13, 1 + u.getServerVarLoad("GamingFertCostExpA") / 1e3)) +
                                                  Math.max(0, Math.min(0.15, (0.18 * (c.asNumber(a.engine.getGameAttribute("Gaming")[1]) - 50)) / (c.asNumber(a.engine.getGameAttribute("Gaming")[1]) + 100))),
                                              c.asNumber(a.engine.getGameAttribute("Gaming")[1])
                                          )
                                    : 1 == t
                                      ? (2 + (5 * c.asNumber(a.engine.getGameAttribute("Gaming")[2]) + Math.pow(c.asNumber(a.engine.getGameAttribute("Gaming")[2]), 2))) * Math.pow(1.22, c.asNumber(a.engine.getGameAttribute("Gaming")[2]))
                                      : 2 == t
                                        ? 11 > c.asNumber(a.engine.getGameAttribute("Gaming")[3])
                                            ? (25 * (c.asNumber(a.engine.getGameAttribute("Gaming")[3]) + 1) + Math.pow(c.asNumber(a.engine.getGameAttribute("Gaming")[3]) + 1, 3)) *
                                              Math.pow(5 + 3.7 * c.asNumber(a.engine.getGameAttribute("Gaming")[3]), c.asNumber(a.engine.getGameAttribute("Gaming")[3]))
                                            : 9999 * Math.pow(10, 39 + 2 * c.asNumber(a.engine.getGameAttribute("Gaming")[3]))
                                        : 69420;
                            if ("TotalSelectorSlots" == e) return Math.round(2 + (m._customBlock_GamingStatType("SuperBitType", 42, 0) + m._customBlock_Ninja("EmporiumBonus", 41, 0)));
                            if ("PaletteLuck" == e)
                                return (
                                    (1 + m._customBlock_GamingStatType("SuperBitType", 42, 0)) *
                                    (1 + m._customBlock_SushiStuff("RoG_BonusQTY", 42, 0) / 100) *
                                    (1 + m._customBlock_Summoning2("MeritocBonusz", 8, 0) / 100) *
                                    (1 + m._customBlock_GamingStatType("RatShopBonuses", 1, 0) / 100) *
                                    (1 + 0.3 * m._customBlock_GamingStatType("SuperBitType", 65, 0)) *
                                    (1 +
                                        (m._customBlock_GamingStatType("PaletteBonus", 3, 0) +
                                            ((4 * c.asNumber(a.engine.getGameAttribute("Lv0")[15]) * m._customBlock_Spelunk("DoWeHaveLoreN1", 8, 0) +
                                                m._customBlock_GamingStatType("PaletteBonus", 37, 0) +
                                                m._customBlock_Thingies("LoreEpiBon", 5, 0)) *
                                                m._customBlock_GamingStatType("SuperBitType", 38, 0) +
                                                (Math.max(0, 3 * (c.asNumber(a.engine.getGameAttribute("Lv0")[15]) - 200) * m._customBlock_GamingStatType("SuperBitType", 45, 0)) +
                                                    (20 * Math.max(0, c.asNumber(a.engine.getGameAttribute("GamingSprout")[32][1]) - 25) * m._customBlock_GamingStatType("SuperBitType", 28, 0) +
                                                        (m._customBlock_GamingStatType("AcornShopBonus", 2, 0) +
                                                            m._customBlock_FarmingStuffs("ExoticBonusQTY", 44, 0) +
                                                            (100 * m._customBlock_Ninja("EmporiumBonus", 41, 0) + (p._customBlock_ArcadeBonus(58) + m._customBlock_ResearchStuff("Grid_Bonus", 107, 2)))))))) /
                                            100)
                                );
                            if ("PaletteBonus" == e) {
                                if (((e = a.engine.getGameAttribute("DNSM")), !Object.prototype.hasOwnProperty.call(e.h, "PaletteBonz") || -1 == t)) {
                                    ((i = []), ((e = a.engine.getGameAttribute("DNSM")).h.PaletteBonz = i));
                                    for (var s = (a.engine.getGameAttribute("DNSM").h.PaletteDNz = 0); 37 > s;) {
                                        var r = s++;
                                        (1 == c.asNumber(a.engine.getGameAttribute("CustomLists").h.GamingPalette[r][5])
                                            ? a.engine
                                                  .getGameAttribute("DNSM")
                                                  .h.PaletteBonz.push(
                                                      (c.asNumber(a.engine.getGameAttribute("Spelunk")[9][r]) / (c.asNumber(a.engine.getGameAttribute("Spelunk")[9][r]) + 25)) *
                                                          c.asNumber(a.engine.getGameAttribute("CustomLists").h.GamingPalette[r][4])
                                                  )
                                            : a.engine.getGameAttribute("DNSM").h.PaletteBonz.push(c.asNumber(a.engine.getGameAttribute("Spelunk")[9][r]) * c.asNumber(a.engine.getGameAttribute("CustomLists").h.GamingPalette[r][4])),
                                            (e = a.engine.getGameAttribute("DNSM")),
                                            (i = c.asNumber(a.engine.getGameAttribute("DNSM").h.PaletteDNz) + c.asNumber(a.engine.getGameAttribute("Spelunk")[9][r])),
                                            (e.h.PaletteDNz = i),
                                            ((1 == m._customBlock_GamingStatType("SuperBitType", 49, 0) && 25 == r) ||
                                                (1 == m._customBlock_GamingStatType("SuperBitType", 51, 0) && 13 == r) ||
                                                (1 == m._customBlock_GamingStatType("SuperBitType", 52, 0) && 31 == r) ||
                                                (1 == m._customBlock_GamingStatType("SuperBitType", 54, 0) && 18 == r) ||
                                                (1 == m._customBlock_GamingStatType("SuperBitType", 58, 0) && 3 == r) ||
                                                (1 == m._customBlock_GamingStatType("SuperBitType", 61, 0) && 12 == r)) &&
                                                (a.engine.getGameAttribute("DNSM").h.PaletteBonz[r] = c.asNumber(a.engine.getGameAttribute("DNSM").h.PaletteBonz[r]) * (2 + 0.5 * m._customBlock_GamingStatType("SuperBitType", 59, 0))),
                                            (a.engine.getGameAttribute("DNSM").h.PaletteBonz[r] =
                                                c.asNumber(a.engine.getGameAttribute("DNSM").h.PaletteBonz[r]) * (1 + m._customBlock_Thingies("LegendPTS_bonus", 10, 0) / 100) * (1 + 0.5 * m._customBlock_Spelunk("DoWeHaveLoreN1", 8, 0))));
                                    }
                                    (a.engine.getGameAttribute("DNSM").h.PaletteBonz.push(Math.round(c.asNumber(a.engine.getGameAttribute("DNSM").h.PaletteDNz))),
                                        (e = a.engine.getGameAttribute("DNSM")),
                                        Object.prototype.hasOwnProperty.call(e.h, "PaletteDNz") && delete e.h.PaletteDNz);
                                }
                                return -1 == t ? 0 : a.engine.getGameAttribute("DNSM").h.PaletteBonz[0 | t];
                            }
                            if ("LVupChance" == e)
                                return (
                                    m._customBlock_GamingStatType("PaletteLuck", 0, 0) *
                                    (1 /
                                        (c.asNumber(a.engine.getGameAttribute("CustomLists").h.GamingPalette[0 | t][6]) *
                                            Math.pow(Math.max(1.2, c.asNumber(a.engine.getGameAttribute("CustomLists").h.GamingPalette[0 | t][7]) - 0.05), c.asNumber(a.engine.getGameAttribute("Spelunk")[9][0 | t]))))
                                );
                            if ("PalUnlockChance" == e) return m._customBlock_GamingStatType("PaletteLuck", 0, 0) * (1 / c.asNumber(a.engine.getGameAttribute("CustomLists").h.GamingPalette[0 | t][8]));
                            if ("ExtraLuckFromEvo" == e) return c.asNumber("1 1.5 2 3 5 10 25 100".split(" ")[0 | Math.min(7, Math.max(0, t))]);
                            if ("RatBitMulti" == e)
                                return Math.max(
                                    1,
                                    Math.pow(1.13, a.engine.getGameAttribute("Research")[11].length) +
                                        (100 * Math.min(10, a.engine.getGameAttribute("Research")[11].length) + 50 * Math.max(0, a.engine.getGameAttribute("Research")[11].length - 10)) / 100
                                );
                            if ("RatCrownOdds" == e)
                                return Math.min(
                                    1,
                                    0.05 *
                                        (1 + 0.5 * m._customBlock_GamingStatType("SuperBitType", 60, 0)) *
                                        (1 + m._customBlock_SushiStuff("RoG_BonusQTY", 31, 0) / 100) *
                                        (1 + (m._customBlock_GamingStatType("RatShopBonuses", 2, 0) + (c.asNumber(a.engine.getGameAttribute("GamingSprout")[33][0]) + p._customBlock_ArcadeBonus(65))) / 100) *
                                        Math.pow(1.5, t)
                                );
                            if ("RatCurrencyGain" == e)
                                return 0 == m._customBlock_ResearchStuff("KingRatUnlocked", 0, 0)
                                    ? 0
                                    : (1 + 0.5 * m._customBlock_GamingStatType("SuperBitType", 50, 0)) *
                                          (1 + (m._customBlock_GamingStatType("PaletteBonus", 34, 0) + m._customBlock_ResearchStuff("Grid_Bonus", 108, 0)) / 100) *
                                          (1 + a.engine.getGameAttribute("Research")[11].length / 100) *
                                          (1 + m._customBlock_GamingStatType("RatShopBonuses", 0, 0) / 100);
                            if ("RatShopCost" == e) return 2 * (Math.pow(1.15, c.asNumber(a.engine.getGameAttribute("GamingSprout")[33][Math.round(t + 1)])) + c.asNumber(a.engine.getGameAttribute("GamingSprout")[33][Math.round(t + 1)]));
                            if ("RatShopBonuses" == e)
                                return 0 == t
                                    ? 5 * c.asNumber(a.engine.getGameAttribute("GamingSprout")[33][Math.round(t + 1)])
                                    : 1 == t
                                      ? 3 * c.asNumber(a.engine.getGameAttribute("GamingSprout")[33][Math.round(t + 1)])
                                      : 2 * c.asNumber(a.engine.getGameAttribute("GamingSprout")[33][Math.round(t + 1)]);
                            if ("SnailStuff" == e)
                                return 0 == t
                                    ? 24 < c.asNumber(a.engine.getGameAttribute("GamingSprout")[32][1])
                                        ? Math.min(
                                              1,
                                              (1 - 0.6 * Math.pow(c.asNumber(a.engine.getGameAttribute("GamingSprout")[32][1]) - 24, 0.16)) *
                                                  (1 + m._customBlock_Holes("B_UPG", 53, 0) / 100) *
                                                  (1 + (50 * c.asNumber(a.engine.getGameAttribute("GamingSprout")[32][2])) / (3 + c.asNumber(a.engine.getGameAttribute("GamingSprout")[32][2])) / 100)
                                          )
                                        : Math.min(
                                              1,
                                              (1 - 0.1 * Math.pow(c.asNumber(a.engine.getGameAttribute("GamingSprout")[32][1]), 0.71)) *
                                                  (1 + m._customBlock_Holes("B_UPG", 53, 0) / 100) *
                                                  (1 + (110 * c.asNumber(a.engine.getGameAttribute("GamingSprout")[32][2])) / (25 + c.asNumber(a.engine.getGameAttribute("GamingSprout")[32][2])) / 100)
                                          )
                                    : 1 == t
                                      ? 24 < c.asNumber(a.engine.getGameAttribute("GamingSprout")[32][1])
                                          ? Math.max(
                                                0,
                                                (Math.pow(c.asNumber(a.engine.getGameAttribute("GamingSprout")[32][1]) + -24, 0.19) - 0.9) /
                                                    (1 + (60 * c.asNumber(a.engine.getGameAttribute("GamingSprout")[32][2])) / (3 + c.asNumber(a.engine.getGameAttribute("GamingSprout")[32][2])) / 100)
                                            )
                                          : Math.max(
                                                0,
                                                (Math.pow(c.asNumber(a.engine.getGameAttribute("GamingSprout")[32][1]) + 1, 0.07) - 1) /
                                                    (1 + (300 * c.asNumber(a.engine.getGameAttribute("GamingSprout")[32][2])) / (100 + c.asNumber(a.engine.getGameAttribute("GamingSprout")[32][2])) / 100)
                                            )
                                      : 2 == t
                                        ? Math.pow(2, Math.max(0, Math.min(25, c.asNumber(a.engine.getGameAttribute("GamingSprout")[32][1])))) *
                                          Math.pow(1.5, Math.max(0, Math.min(25, c.asNumber(a.engine.getGameAttribute("GamingSprout")[32][1]) - 25)))
                                        : 3 == t
                                          ? 25 > c.asNumber(a.engine.getGameAttribute("GamingSprout")[32][1]) || 25 == m._customBlock_GamingStatType("MaxSnailLV", 0, 0)
                                              ? Math.round(3 - 2 * i)
                                              : Math.round(5 + 25 * i)
                                          : 0;
                            if ("LogCoordX" == e)
                                return 98 < t
                                    ? Math.round(45 + 44.55 * (i - 15 * Math.floor(i / 15)))
                                    : 84 < t || 72 < t
                                      ? Math.round(45 + 47.92 * (i - 14 * Math.floor(i / 14)))
                                      : 66 < t
                                        ? Math.round(45 + 56.7 * (i - 12 * Math.floor(i / 12)))
                                        : Math.round(53 + 60 * (i - 11 * Math.floor(i / 11)));
                            if ("LogCoordY" == e)
                                return 98 < t
                                    ? Math.round(92 + 50 * Math.floor(i / 15))
                                    : 84 < t
                                      ? Math.round(92 + 50 * Math.floor(i / 14))
                                      : 72 < t
                                        ? Math.round(92 + 60 * Math.floor(i / 14))
                                        : 66 < t
                                          ? Math.round(92 + 60 * Math.floor(i / 12))
                                          : Math.round(92 + 60 * Math.floor(i / 11));
                            if ("SproutCapacity" == e) return Math.round(Math.min(24, 3 + c.asNumber(a.engine.getGameAttribute("Gaming")[3]) + c.asNumber(a.engine.getGameAttribute("GemItemsPurchased")[133])));
                            if ("MutateUpgCosts" == e)
                                return (
                                    (25 + (10 * (c.asNumber(a.engine.getGameAttribute("Gaming")[7]) + 1) + Math.pow(c.asNumber(a.engine.getGameAttribute("Gaming")[7]) + 1, 2))) *
                                    Math.pow(1.3, c.asNumber(a.engine.getGameAttribute("Gaming")[7]))
                                );
                            if ("LogBookBitBonus" == e) return Math.max(1, Math.pow(1.08, t) + (c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.Y3) * t) / 100);
                            if ("LogGameMulti" == e) return Math.max(1, Math.pow(1.2, c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[497]) - 1));
                            if ("GamingExpPCT" == e)
                                return (
                                    k._customBlock_StampBonusOfTypeX("GamingExp") +
                                    (q._customBlock_MealBonus("GamingExp") +
                                        (c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchVials.h.GameXP) +
                                            (p._customBlock_getbonus2(1, 176, -1) +
                                                (k._customBlock_GetTalentNumber(1, 104) +
                                                    (10 * c.asNumber(a.engine.getGameAttribute("Tasks")[2][4][4]) +
                                                        (25 * m._customBlock_RiftStuff("RiftSkillBonus,14", 0) + (p._customBlock_GuildBonuses(14) + m._customBlock_Summoning("VaultUpgBonus", 69, 0))))))))
                                );
                            if ("SproutValueBase" == e) return (1 + 4 * c.asNumber(a.engine.getGameAttribute("Gaming")[1])) * Math.pow(1.065, c.asNumber(a.engine.getGameAttribute("Gaming")[1]));
                            if ("SproutValueTOTAL" == e) {
                                if (
                                    ((a.engine.getGameAttribute("DNSM").h.SproutzEvo = 3),
                                    (a.engine.getGameAttribute("DNSM").h.SproutzVal = 1),
                                    3 == a.engine.getGameAttribute("GamingSprout")[0 | t][1] && ((e = a.engine.getGameAttribute("DNSM")), (i = c.asNumber(a.engine.getGameAttribute("DNSM").h.SproutzEvo) + 1), (e.h.SproutzEvo = i)),
                                    2 == a.engine.getGameAttribute("GamingSprout")[0 | t][1])
                                )
                                    a.engine.getGameAttribute("DNSM").h.SproutzVal = 3;
                                else if (5 == a.engine.getGameAttribute("GamingSprout")[0 | t][1]) a.engine.getGameAttribute("DNSM").h.SproutzVal = 2;
                                else if (7 == a.engine.getGameAttribute("GamingSprout")[0 | t][1]) a.engine.getGameAttribute("DNSM").h.SproutzVal = 7;
                                else if (8 == a.engine.getGameAttribute("GamingSprout")[0 | t][1])
                                    for (a.engine.getGameAttribute("DNSM").h.SproutzVal = 1, s = 0; 7 > s && ((r = s++), c.randomFloat() < 0.7 - 0.08 * r);) a.engine.getGameAttribute("DNSM").h.SproutzVal = Math.pow(2, r + 1);
                                return (
                                    (a.engine.getGameAttribute("DNSM").h.SproutzDNz = 1),
                                    131 < n.__cast(a.engine.getGameAttribute("PixelHelperActor")[23].behaviors.getBehavior("ActorEvents_577"), Ba)._GenINFO.length &&
                                        1 == m._customBlock_GamingStatType("SuperBitType", 0, 0) &&
                                        ((e = a.engine.getGameAttribute("DNSM")),
                                        (i = Math.pow(1.03, c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[23].behaviors.getBehavior("ActorEvents_577"), Ba)._GenINFO[131]))),
                                        (e.h.SproutzDNz = i)),
                                    m._customBlock_GamingStatType("SproutValueBase", 0, 0) *
                                        m._customBlock_GamingStatType("SproutValueNonPlantMulti", 0, 0) *
                                        c.asNumber(a.engine.getGameAttribute("DNSM").h.SproutzVal) *
                                        Math.pow(c.asNumber(a.engine.getGameAttribute("DNSM").h.SproutzEvo), c.asNumber(a.engine.getGameAttribute("GamingSprout")[0 | t][3])) *
                                        (1 / (1 + 2 * c.asNumber(a.engine.getGameAttribute("GamingSprout")[29][1]))) *
                                        c.asNumber(a.engine.getGameAttribute("DNSM").h.SproutzDNz)
                                );
                            }
                            if ("SproutValueNonPlantMulti" == e)
                                return (
                                    (1 + 99 * c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[411])) *
                                    (1 + m._customBlock_ResearchStuff("Grid_Bonus", 87, 0) / 100) *
                                    (1 + m._customBlock_SushiStuff("RoG_BonusQTY", 29, 0) / 100) *
                                    (1 + m._customBlock_Sailing("ArtifactBonus", 20, 0) / 100) *
                                    Math.max(1, 1 + m._customBlock_Companions(53)) *
                                    (1 + c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchVials.h["7bits"]) / 100) *
                                    (1 + m._customBlock_Sailing("ArtifactBonus", 23, 0) / 100) *
                                    (1 + m._customBlock_Holes("MonumentROGbonuses", 0, 4) / 100) *
                                    (1 + (15 * m._customBlock_RiftStuff("RiftSkillBonus,14", 1)) / 100) *
                                    (1 + m._customBlock_GamingStatType("MSA_Bonus", 3, 0) / 100) *
                                    Math.max(1, m._customBlock_GamingStatType("SnailStuff", 2, 0)) *
                                    (1 + (20 * x._customBlock_RunCodeOfTypeXforThingY("CardLv", "w7b2")) / 100) *
                                    Math.max(1, m._customBlock_GamingStatType("AcornShopBonus", 0, 0)) *
                                    Math.max(1, c.asNumber(a.engine.getGameAttribute("Gaming")[8])) *
                                    (1 + (c.asNumber(a.engine.getGameAttribute("GamingSprout")[28][2]) * m._customBlock_GamingStatType("ImportItemBonus", 3, 0)) / 100) *
                                    Math.max(
                                        1,
                                        c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[23].behaviors.getBehavior("ActorEvents_577"), Ba)._GenINFO[73]) *
                                            m._customBlock_GamingStatType("LogGameMulti", 0, 0) *
                                            m._customBlock_GamingStatType("RatBitMulti", 0, 0)
                                    ) *
                                    (1 + (q._customBlock_MealBonus("GamingBits") + c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchVials.h.GameBits)) / 100) *
                                    (1 + (p._customBlock_getbonus2(1, 177, -1) * c.asNumber(a.engine.getGameAttribute("Lv0")[15])) / 100) *
                                    Math.max(1, Math.min(25, m._customBlock_GamingStatType("GamingPOINGmulti", 0, 0))) *
                                    (1 + (p._customBlock_AchieveStatus(296) + p._customBlock_AchieveStatus(307)) / 20) *
                                    (1 + m._customBlock_Summoning("WinBonus", 16, 0) / 100) *
                                    (1 + m._customBlock_Holes("LampBonuses", 1, 1) / 100) *
                                    (1 + m._customBlock_Thingies("EmperorBon", 7, 0) / 100) *
                                    (1 + m._customBlock_GamingStatType("PaletteBonus", 7, 0) / 100) *
                                    (1 + m._customBlock_GamingStatType("PaletteBonus", 18, 0) / 100) *
                                    (1 + m._customBlock_Summoning2("MeritocBonusz", 1, 0) / 100) *
                                    (1 + m._customBlock_FarmingStuffs("StickerBonus", 3, 0) / 100) *
                                    (1 + m._customBlock_Summoning("VaultUpgBonus", 68, 0) / 100)
                                );
                            if ("SuperBitType" == e) return -1 != ("" + h.string(a.engine.getGameAttribute("Gaming")[12])).indexOf("" + h.string(a.engine.getGameAttribute("Number2Letter")[0 | t])) ? 1 : 0;
                            if ("MSA_Bonus" == e) {
                                if (114 < n.__cast(a.engine.getGameAttribute("PixelHelperActor")[8].behaviors.getBehavior("ActorEvents_481"), na)._GenINFO.length) {
                                    if (0 == t && 1 == m._customBlock_GamingStatType("SuperBitType", 7, 0))
                                        return Math.floor(c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[8].behaviors.getBehavior("ActorEvents_481"), na)._GenINFO[114]) / 10);
                                    if (1 == t && 1 == m._customBlock_GamingStatType("SuperBitType", 13, 0))
                                        return 13 * Math.floor(c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[8].behaviors.getBehavior("ActorEvents_481"), na)._GenINFO[114]) / 10);
                                    if (2 == t && 1 == m._customBlock_GamingStatType("SuperBitType", 3, 0))
                                        return Math.floor(c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[8].behaviors.getBehavior("ActorEvents_481"), na)._GenINFO[114]) / 10);
                                    if (3 == t && 1 == m._customBlock_GamingStatType("SuperBitType", 20, 0))
                                        return 50 * Math.floor(c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[8].behaviors.getBehavior("ActorEvents_481"), na)._GenINFO[114]) / 10);
                                    if (4 == t && 1 == m._customBlock_GamingStatType("SuperBitType", 11, 0))
                                        return 1.12 * Math.floor(c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[8].behaviors.getBehavior("ActorEvents_481"), na)._GenINFO[114]) / 10);
                                    if (5 == t && 1 == m._customBlock_GamingStatType("SuperBitType", 16, 0))
                                        return Math.floor(c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[8].behaviors.getBehavior("ActorEvents_481"), na)._GenINFO[114]) / 10);
                                    if (6 == t && 1 == m._customBlock_Ninja("EmporiumBonus", 12, 0))
                                        return 1.75 * Math.floor(c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[8].behaviors.getBehavior("ActorEvents_481"), na)._GenINFO[114]) / 10);
                                    if (7 == t && 1 == m._customBlock_Ninja("EmporiumBonus", 13, 0))
                                        return 2 * Math.floor(c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[8].behaviors.getBehavior("ActorEvents_481"), na)._GenINFO[114]) / 10);
                                    if (8 == t && 1 == m._customBlock_Ninja("EmporiumBonus", 14, 0))
                                        return 1.5 * Math.floor(c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[8].behaviors.getBehavior("ActorEvents_481"), na)._GenINFO[114]) / 10);
                                    if (9 == t && 1 == m._customBlock_GamingStatType("SuperBitType", 27, 0))
                                        return 2.5 * Math.max(0, Math.floor((c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[8].behaviors.getBehavior("ActorEvents_481"), na)._GenINFO[114]) - 300) / 10));
                                    if (10 == t && 1 == m._customBlock_GamingStatType("SuperBitType", 44, 0))
                                        return 0.3 * Math.max(0, Math.floor((c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[8].behaviors.getBehavior("ActorEvents_481"), na)._GenINFO[114]) - 300) / 10));
                                    11 == t && m._customBlock_GamingStatType("SuperBitType", 46, 0);
                                }
                                return 0;
                            }
                            return "NewMutantChanceDEC" == e
                                ? 0 == a.engine.getGameAttribute("Gaming")[4]
                                    ? Math.min(0.8, ((7 * c.asNumber(a.engine.getGameAttribute("Gaming")[5])) / (100 + c.asNumber(a.engine.getGameAttribute("Gaming")[5]))) * (1 + m._customBlock_Summoning("VotingBonusz", 21, 0) / 100))
                                    : Math.min(
                                          0.99,
                                          ((42 * c.asNumber(a.engine.getGameAttribute("Gaming")[5])) / (100 + c.asNumber(a.engine.getGameAttribute("Gaming")[5]))) *
                                              Math.pow(0.31, c.asNumber(a.engine.getGameAttribute("Gaming")[4])) *
                                              (1 + m._customBlock_Summoning("VotingBonusz", 21, 0) / 100) *
                                              (1 +
                                                  10 *
                                                      Math.pow(
                                                          Math.max(
                                                              0,
                                                              c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[342]) /
                                                                  (70 * Math.pow(1.7, c.asNumber(a.engine.getGameAttribute("Gaming")[4])) + c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[342]))
                                                          ),
                                                          2
                                                      ))
                                      )
                                : "SproutGrowthTime" == e
                                  ? (5e3 * (1 + 99 * c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[411]))) /
                                    ((1 + (2 * c.asNumber(a.engine.getGameAttribute("Gaming")[2])) / 100) *
                                        (1 + m._customBlock_GamingStatType("PaletteBonus", 8, 0) / 100) *
                                        (1 + m._customBlock_GamingStatType("PaletteBonus", 11, 0) / 100) *
                                        (1 + (m._customBlock_GamingStatType("AcornShopBonus", 1, 0) + m._customBlock_Divinity("Bonus_Minor", -1, 6)) / 100) *
                                        (1 + (3 + m._customBlock_GamingStatType("ImportItemBonus", 4, 0) / 100) * c.asNumber(a.engine.getGameAttribute("GamingSprout")[29][1])))
                                  : "SproutGrowthCHANCEperMUT" == e
                                    ? 0.13 + (0.11 * c.asNumber(a.engine.getGameAttribute("Gaming")[7])) / (150 + c.asNumber(a.engine.getGameAttribute("Gaming")[7]))
                                    : "SproutGrowthCHANCE" == e
                                      ? -1 == t
                                          ? Math.min(1, m._customBlock_GamingStatType("SproutGrowthCHANCEperMUT", 0, 0) * Math.max(1, m._customBlock_FarmingStuffs("CropSCbonus", 1, 0)))
                                          : 8 == a.engine.getGameAttribute("GamingSprout")[0 | t][3]
                                            ? Math.min(
                                                  1,
                                                  Math.pow(m._customBlock_GamingStatType("SproutGrowthCHANCEperMUT", 0, 0), c.asNumber(a.engine.getGameAttribute("GamingSprout")[0 | t][3]) + 1) *
                                                      (Math.max(1, m._customBlock_FarmingStuffs("CropSCbonus", 1, 0)) / (1e7 * (1 + 2 * Math.floor(c.asNumber(a.engine.getGameAttribute("GamingSprout")[0 | t][1]) / 10))))
                                              )
                                            : 7 == a.engine.getGameAttribute("GamingSprout")[0 | t][3]
                                              ? Math.min(
                                                    1,
                                                    Math.pow(m._customBlock_GamingStatType("SproutGrowthCHANCEperMUT", 0, 0), c.asNumber(a.engine.getGameAttribute("GamingSprout")[0 | t][3]) + 1) *
                                                        (Math.max(1, m._customBlock_FarmingStuffs("CropSCbonus", 1, 0)) / (25e4 * (1 + 5 * Math.floor(c.asNumber(a.engine.getGameAttribute("GamingSprout")[0 | t][1]) / 10))))
                                                )
                                              : 6 == a.engine.getGameAttribute("GamingSprout")[0 | t][3]
                                                ? Math.min(
                                                      1,
                                                      Math.pow(m._customBlock_GamingStatType("SproutGrowthCHANCEperMUT", 0, 0), c.asNumber(a.engine.getGameAttribute("GamingSprout")[0 | t][3]) + 1) *
                                                          (Math.max(1, m._customBlock_FarmingStuffs("CropSCbonus", 1, 0)) / (5e4 * (1 + 100 * Math.floor(c.asNumber(a.engine.getGameAttribute("GamingSprout")[0 | t][1]) / 10))))
                                                  )
                                                : 5 == a.engine.getGameAttribute("GamingSprout")[0 | t][3]
                                                  ? Math.min(
                                                        1,
                                                        Math.pow(m._customBlock_GamingStatType("SproutGrowthCHANCEperMUT", 0, 0), c.asNumber(a.engine.getGameAttribute("GamingSprout")[0 | t][3]) + 1) *
                                                            (Math.max(1, m._customBlock_FarmingStuffs("CropSCbonus", 1, 0)) / (5e3 * (1 + 200 * Math.floor(c.asNumber(a.engine.getGameAttribute("GamingSprout")[0 | t][1]) / 10))))
                                                    )
                                                  : 4 == a.engine.getGameAttribute("GamingSprout")[0 | t][3]
                                                    ? Math.min(
                                                          1,
                                                          Math.pow(m._customBlock_GamingStatType("SproutGrowthCHANCEperMUT", 0, 0), c.asNumber(a.engine.getGameAttribute("GamingSprout")[0 | t][3]) + 1) *
                                                              (Math.max(1, m._customBlock_FarmingStuffs("CropSCbonus", 1, 0)) / (250 * (1 + 500 * Math.floor(c.asNumber(a.engine.getGameAttribute("GamingSprout")[0 | t][1]) / 10))))
                                                      )
                                                    : 3 == a.engine.getGameAttribute("GamingSprout")[0 | t][3]
                                                      ? Math.min(
                                                            1,
                                                            Math.pow(m._customBlock_GamingStatType("SproutGrowthCHANCEperMUT", 0, 0), c.asNumber(a.engine.getGameAttribute("GamingSprout")[0 | t][3]) + 1) *
                                                                (Math.max(1, m._customBlock_FarmingStuffs("CropSCbonus", 1, 0)) / (20 * (1 + 1e3 * Math.floor(c.asNumber(a.engine.getGameAttribute("GamingSprout")[0 | t][1]) / 10))))
                                                        )
                                                      : Math.min(
                                                            1,
                                                            Math.pow(m._customBlock_GamingStatType("SproutGrowthCHANCEperMUT", 0, 0), c.asNumber(a.engine.getGameAttribute("GamingSprout")[0 | t][3]) + 1) *
                                                                (Math.max(1, m._customBlock_FarmingStuffs("CropSCbonus", 1, 0)) / (1 + 2e3 * Math.floor(c.asNumber(a.engine.getGameAttribute("GamingSprout")[0 | t][1]) / 10)))
                                                        )
                                      : "SproutMaxEvo" == e
                                        ? Math.min(
                                              9,
                                              m._customBlock_GamingStatType("SuperBitType", 48, 0) +
                                                  m._customBlock_GamingStatType("SuperBitType", 57, 0) +
                                                  Math.min(
                                                      Math.round(
                                                          3 +
                                                              (m._customBlock_GamingStatType("SuperBitType", 1, 0) +
                                                                  (m._customBlock_GamingStatType("SuperBitType", 5, 0) + (m._customBlock_GamingStatType("SuperBitType", 18, 0) + m._customBlock_Ninja("EmporiumBonus", 6, 0))))
                                                      ),
                                                      7
                                                  )
                                          )
                                        : "SuperbitCost" == e
                                          ? c.asNumber(a.engine.getGameAttribute("CustomLists").h.GamingUpg[0 | t][1]) * Math.pow(10, c.asNumber(a.engine.getGameAttribute("CustomLists").h.GamingUpg[0 | t][2]))
                                          : "GamingPOINGmulti" == e
                                            ? Math.max(1 + Math.pow(c.asNumber(a.engine.getGameAttribute("Gaming")[10]), 0.5) / 100, 1)
                                            : "SaveSprinkler" == e
                                              ? 1 == a.engine.getGameAttribute("GemItemsPurchased")[131]
                                                  ? 0.3
                                                  : 2 == a.engine.getGameAttribute("GemItemsPurchased")[131]
                                                    ? 0.43
                                                    : 3 == a.engine.getGameAttribute("GemItemsPurchased")[131]
                                                      ? 0.53
                                                      : 4 == a.engine.getGameAttribute("GemItemsPurchased")[131]
                                                        ? 0.6
                                                        : 0
                                              : "BoxCost" == e
                                                ? c.asNumber(a.engine.getGameAttribute("CustomLists").h.GamingBoxes[0 | t][1]) * Math.pow(10, c.asNumber(a.engine.getGameAttribute("CustomLists").h.GamingBoxes[0 | t][2]))
                                                : "ImportItemBonus" == e
                                                  ? 1 == t
                                                      ? Math.floor(
                                                            10 *
                                                                (1 +
                                                                    Math.pow(
                                                                        (60 * c.asNumber(a.engine.getGameAttribute("GamingSprout")[(25 + t) | 0][0])) / (250 + c.asNumber(a.engine.getGameAttribute("GamingSprout")[(25 + t) | 0][0])),
                                                                        1.7
                                                                    ))
                                                        ) / 10
                                                      : 2 == t
                                                        ? Math.round(5 * c.asNumber(a.engine.getGameAttribute("GamingSprout")[(25 + t) | 0][0]))
                                                        : 5 == t
                                                          ? Math.floor(((60 * c.asNumber(a.engine.getGameAttribute("GamingSprout")[(25 + t) | 0][0])) / (100 + c.asNumber(a.engine.getGameAttribute("GamingSprout")[(25 + t) | 0][0]))) * 10) /
                                                            10
                                                          : Math.round(c.asNumber(a.engine.getGameAttribute("GamingSprout")[(25 + t) | 0][0]))
                                                  : "ImportItemCOST" == e
                                                    ? ((c.asNumber(a.engine.getGameAttribute("CustomLists").h.GamingBoxes[0 | t][1]) * Math.pow(10, c.asNumber(a.engine.getGameAttribute("CustomLists").h.GamingBoxes[0 | t][2]))) / 4) *
                                                      Math.pow(1.4, c.asNumber(a.engine.getGameAttribute("GamingSprout")[(25 + t) | 0][0]))
                                                    : "AcornShopCost" == e
                                                      ? 2 == t
                                                          ? 4 + c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[415]) + 3 * Math.max(0, c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[415]) - 5)
                                                          : 1 + c.asNumber(a.engine.getGameAttribute("GamingSprout")[27][(2 + t) | 0]) + 2 * Math.max(0, c.asNumber(a.engine.getGameAttribute("GamingSprout")[27][(2 + t) | 0]) - 5)
                                                      : "AcornShopBonus" == e
                                                        ? 0 == t
                                                            ? 1 + (8 * c.asNumber(a.engine.getGameAttribute("GamingSprout")[27][2])) / (250 + c.asNumber(a.engine.getGameAttribute("GamingSprout")[27][2]))
                                                            : 1 == t
                                                              ? Math.pow(3 * c.asNumber(a.engine.getGameAttribute("GamingSprout")[27][3]), 0.8)
                                                              : Math.pow(c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[415]), 0.8)
                                                        : "ShellRankREQ" == e
                                                          ? 0 >= t
                                                              ? 0
                                                              : (15 * t + Math.pow(5 * t, 1.2)) * Math.pow(1.25, t) - 17
                                                          : "LVreq" == e
                                                            ? 0 == t
                                                                ? -1
                                                                : 1 == t
                                                                  ? 10
                                                                  : 2 == t
                                                                    ? 20
                                                                    : 3 == t
                                                                      ? 40
                                                                      : 4 == t
                                                                        ? 150
                                                                        : 99999
                                                            : "PongScore" == e
                                                              ? ((e = a.engine.getGameAttribute("DNSM")),
                                                                (i = n.__cast(a.engine.getGameAttribute("PixelHelperActor")[23].behaviors.getBehavior("ActorEvents_577"), Ba)._GenINFO[62]),
                                                                (e.h.RallyHitsP = i),
                                                                (e = a.engine.getGameAttribute("DNSM")),
                                                                (i = n.__cast(a.engine.getGameAttribute("PixelHelperActor")[23].behaviors.getBehavior("ActorEvents_577"), Ba)._GenINFO[65]),
                                                                (e.h.GoalsP = i),
                                                                0 == t
                                                                    ? 5 * (1 + c.asNumber(a.engine.getGameAttribute("DNSM").h.GoalsP))
                                                                    : 1 == t
                                                                      ? 2 * (1 + c.asNumber(a.engine.getGameAttribute("DNSM").h.GoalsP))
                                                                      : 2 == t || 2 == t
                                                                        ? 50 * (1 + c.asNumber(a.engine.getGameAttribute("DNSM").h.GoalsP))
                                                                        : 0)
                                                              : "MaxSnailLV" == e
                                                                ? Math.round(
                                                                      10 * m._customBlock_GamingStatType("SuperBitType", 29, 0) +
                                                                          (5 * m._customBlock_GamingStatType("SuperBitType", 30, 0) + 10 * m._customBlock_GamingStatType("SuperBitType", 40, 0)) +
                                                                          25
                                                                  )
                                                                : 69420;
                        }