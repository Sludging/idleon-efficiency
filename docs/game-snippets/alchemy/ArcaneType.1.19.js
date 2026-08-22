/**
 * Game formula snippet — idleon-efficiency formula research.
 * Function: _customBlock_ArcaneType (from scripts.ActorEvents_579)
 * Game version: 1.19 ("Summer_Event")
 * Captured: 2026-08-21 via game-debug-tool (findFunction + toString)
 * Case reference: #342
 */
function (e, t, i) {
                            if ("TesseractArcanist" == e)
                                return 0.1 <= x._customBlock_GetBuffBonuses(585, 1) &&
                                    1 == a.engine.getGameAttribute("NONdummies")[68] &&
                                    100 < c.asNumber(a.engine.getGameAttribute("BuffsActive")[n.__cast(a.engine.getGameAttribute("PixelHelperActor")[2].behaviors.getBehavior("ActorEvents_167"), Cb)._BuffIDsOn.indexOf(585)][1])
                                    ? 1
                                    : 0;
                            if ("ArcaneUpgUNLOCKED" == e) {
                                t = a.engine.getGameAttribute("DNSM").h.ArcaneDN = 0;
                                for (var s = a.engine.getGameAttribute("CustomLists").h.ArcaneUpg.length; t < s; )
                                    ((i = t++),
                                        m._customBlock_ArcaneType("ArcaneUpgTotal", 0, 0) >= c.asNumber(a.engine.getGameAttribute("CustomLists").h.ArcaneUpg[i][6]) &&
                                            ((e = a.engine.getGameAttribute("DNSM")), (i = c.asNumber(a.engine.getGameAttribute("DNSM").h.ArcaneDN) + 1), (e.h.ArcaneDN = i)));
                                return a.engine.getGameAttribute("DNSM").h.ArcaneDN;
                            }
                            if ("ArcaneUpgTotal" == e) {
                                if (((e = a.engine.getGameAttribute("DNSM")), !Object.prototype.hasOwnProperty.call(e.h, "ArcaneTotLV")))
                                    for (t = a.engine.getGameAttribute("DNSM").h.ArcaneTotLV = 0, s = a.engine.getGameAttribute("CustomLists").h.ArcaneUpg.length; t < s; )
                                        ((i = t++), (e = a.engine.getGameAttribute("DNSM")), (i = c.asNumber(a.engine.getGameAttribute("DNSM").h.ArcaneTotLV) + c.asNumber(a.engine.getGameAttribute("Arcane")[i])), (e.h.ArcaneTotLV = i));
                                return a.engine.getGameAttribute("DNSM").h.ArcaneTotLV;
                            }
                            return "ArcaneUpgBonus" == e
                                ? 3 == t || 7 == t || 8 == t || 10 == t || 13 == t || 16 == t || 20 == t || 25 == t || 26 == t || 28 == t || 33 == t || 35 == t || 39 == t || 40 == t || 43 == t || 45 == t || 48 == t || 57 == t || 58 == t
                                    ? 999 == i
                                        ? 0
                                        : c.asNumber(a.engine.getGameAttribute("Arcane")[0 | t]) * c.asNumber(a.engine.getGameAttribute("CustomLists").h.ArcaneUpg[0 | t][5])
                                    : 999 == i
                                      ? 69.42
                                      : c.asNumber(a.engine.getGameAttribute("Arcane")[0 | t]) * c.asNumber(a.engine.getGameAttribute("CustomLists").h.ArcaneUpg[0 | t][5]) * (1 + m._customBlock_ArcaneType("ArcaneUpgBonus", 39, 0) / 100)
                                : "ArcaneUpgCost" == e
                                  ? m._customBlock_Summoning("First3MC_CostRedux", 0, 0) *
                                    m._customBlock_Summoning("AllMasterclassCostRedux", 0, 0) *
                                    3 *
                                    (1 / (1 + (m._customBlock_ArcaneType("ArcaneUpgBonus", 49, 0) * k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[392]))) / 100)) *
                                    Math.pow(1.04, t) *
                                    (c.asNumber(a.engine.getGameAttribute("Arcane")[Math.round(t)]) +
                                        (c.asNumber(a.engine.getGameAttribute("CustomLists").h.ArcaneUpg[0 | t][1]) + c.asNumber(a.engine.getGameAttribute("Arcane")[Math.round(t)])) *
                                            Math.pow(c.asNumber(a.engine.getGameAttribute("CustomLists").h.ArcaneUpg[0 | t][2]) + 0.01, c.asNumber(a.engine.getGameAttribute("Arcane")[Math.round(t)])))
                                  : "PrismaBubDropChance" == e
                                    ? 0 == m._customBlock_ArcaneType("ArcaneUpgBonus", 3, 0)
                                        ? 0
                                        : (1 /
                                              (1e3 *
                                                  Math.pow(
                                                      1.27,
                                                      c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[395]) +
                                                          c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[26].behaviors.getBehavior("ActorEvents_713"), pb)._GenINFO[43])
                                                  ))) *
                                          Math.max(1, (x._customBlock_TotalStats("Drop_Rarity") - 1) * (m._customBlock_ArcaneType("ArcaneUpgBonus", 51, 0) / 100)) *
                                          Math.max(1, k._customBlock_GetTalentNumber(1, 594) * Math.pow(1.5, Math.floor(a.engine.getGameAttribute("CurrentMap") / 50)))
                                    : "PrismaBonusMult" == e
                                      ? Math.min(
                                            4,
                                            2 +
                                                (m._customBlock_ArcaneType("ArcaneUpgBonus", 45, 0) +
                                                    (p._customBlock_ArcadeBonus(54) +
                                                        m._customBlock_SushiStuff("RoG_BonusQTY", 23, 0) +
                                                        (m._customBlock_Thingies("HaveW6Trophy", 0, 0) +
                                                            (m._customBlock_GamingStatType("PaletteBonus", 28, 0) + (0.2 * p._customBlock_Labb("TotalPurpleSigils", "0", 0, 0) + m._customBlock_FarmingStuffs("ExoticBonusQTY", 48, 0))))) +
                                                    (m._customBlock_Thingies("LegendPTS_bonus", 36, 0) + 50 * m._customBlock_Companions(88))) /
                                                    100
                                        )
                                      : "ArcaneMapMulti" == e
                                        ? 1 > t
                                            ? 0
                                            : (2 * Math.max(0, k._customBlock_getLOG(t) - 3.5) + Math.max(0, k._customBlock_Log2(t) - 12)) * (k._customBlock_getLOG(t) / 2.5) +
                                              (Math.min(2, t / 1e3) + Math.max(5 * (k._customBlock_getLOG(t) - 5), 0))
                                        : "ArcaneMobSpawnQTY" == e
                                          ? Math.round(k._customBlock_GetTalentNumber(1, 588) + Math.floor(Math.min(3, c.randomFloat() + m._customBlock_ArcaneType("ArcaneUpgBonus", 26, 0) / 100)))
                                          : "CrystalChargeReq" == e
                                            ? Math.ceil(Math.max(50, 200 - (Math.min(100, m._customBlock_ArcaneType("ArcaneUpgBonus", 13, 0)) + Math.min(10, k._customBlock_GetTalentNumber(2, 599)))))
                                            : "ArcaneMapMulti_bon" == e
                                              ? 3 > a.engine.getGameAttribute("MapBon")[0 | a.engine.getGameAttribute("CurrentMap")].length
                                                  ? 0
                                                  : ((e = a.engine.getGameAttribute("DNSM")),
                                                    (Object.prototype.hasOwnProperty.call(e.h, "ArcMultBon") && 99 != i) ||
                                                        ((i = []),
                                                        ((e = a.engine.getGameAttribute("DNSM")).h.ArcMultBon = i),
                                                        a.engine
                                                            .getGameAttribute("DNSM")
                                                            .h.ArcMultBon.push(
                                                                Math.min(
                                                                    m._customBlock_ArcaneType("ArcaneMapMulti_bonMAX", 0, 0),
                                                                    m._customBlock_ArcaneType("ArcaneMapMulti", c.asNumber(a.engine.getGameAttribute("MapBon")[0 | a.engine.getGameAttribute("CurrentMap")][0]), 0)
                                                                )
                                                            ),
                                                        a.engine
                                                            .getGameAttribute("DNSM")
                                                            .h.ArcMultBon.push(
                                                                Math.min(
                                                                    m._customBlock_ArcaneType("ArcaneMapMulti_bonMAX", 0, 0),
                                                                    m._customBlock_ArcaneType("ArcaneMapMulti", c.asNumber(a.engine.getGameAttribute("MapBon")[0 | a.engine.getGameAttribute("CurrentMap")][1]), 0)
                                                                )
                                                            ),
                                                        a.engine
                                                            .getGameAttribute("DNSM")
                                                            .h.ArcMultBon.push(
                                                                Math.min(
                                                                    m._customBlock_ArcaneType("ArcaneMapMulti_bonMAX", 0, 0),
                                                                    m._customBlock_ArcaneType("ArcaneMapMulti", c.asNumber(a.engine.getGameAttribute("MapBon")[0 | a.engine.getGameAttribute("CurrentMap")][2]), 0)
                                                                )
                                                            )),
                                                    a.engine.getGameAttribute("DNSM").h.ArcMultBon[0 | t])
                                              : "ArcaneMapMulti_bonMAX" == e
                                                ? 100 * (p._customBlock_getbonus2(1, 589, -1) - 1) + Math.min(10, m._customBlock_ArcaneType("ArcaneUpgBonus", 58, 0))
                                                : "Arcane_HP" == e
                                                  ? 1
                                                  : "Arcane_DMG" == e
                                                    ? ((a.engine.getGameAttribute("DNSM").h.ACzWepAtk = 0),
                                                      -1 != ("" + h.string(a.engine.getGameAttribute("EquipmentOrder")[0][1])).indexOf("EquipmentWandsArc") &&
                                                          ((e = a.engine.getGameAttribute("DNSM")),
                                                          (t = a.engine.getGameAttribute("ItemDefinitionsGET")),
                                                          (i = "" + h.string(a.engine.getGameAttribute("EquipmentOrder")[0][1])),
                                                          (i = c.asNumber(t.h[i].h.Weapon_Power) + c.asNumber(a.engine.getGameAttribute("EquipmentMap")[0][1].h.Weapon_Power)),
                                                          (e.h.ACzWepAtk = i)),
                                                      (5 +
                                                          (m._customBlock_ArcaneType("ArcaneUpgBonus", 0, 0) +
                                                              (m._customBlock_ArcaneType("ArcaneUpgBonus", 6, 0) +
                                                                  (m._customBlock_ArcaneType("ArcaneUpgBonus", 15, 0) + (m._customBlock_ArcaneType("ArcaneUpgBonus", 36, 0) + m._customBlock_ArcaneType("ArcaneUpgBonus", 50, 0)))))) *
                                                          (1 + (k._customBlock_GetTalentNumber(1, 590) * (m._customBlock_ArcaneType("ArcaneUpgTotal", 0, 0) / 100)) / 100) *
                                                          Math.pow(1.04, Math.max(0, c.asNumber(a.engine.getGameAttribute("DNSM").h.ACzWepAtk))) *
                                                          (1 + k._customBlock_GetTalentNumber(1, 585) / 100) *
                                                          (1 +
                                                              (m._customBlock_ArcaneType("ArcaneUpgBonus", 12, 0) * k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[388])) +
                                                                  (m._customBlock_ArcaneType("ArcaneUpgBonus", 4, 0) +
                                                                      (m._customBlock_ArcaneType("ArcaneUpgBonus", 24, 0) +
                                                                          (m._customBlock_ArcaneType("ArcaneUpgBonus", 31, 0) + (m._customBlock_ArcaneType("ArcaneUpgBonus", 42, 0) + m._customBlock_ArcaneType("ArcaneUpgBonus", 53, 0)))))) /
                                                                  100) *
                                                          (1 + w._customBlock_EtcBonuses("93") / 100))
                                                    : "Arcane_ACC" == e
                                                      ? (2 +
                                                            (m._customBlock_ArcaneType("ArcaneUpgBonus", 1, 0) +
                                                                (m._customBlock_ArcaneType("ArcaneUpgBonus", 9, 0) +
                                                                    (m._customBlock_ArcaneType("ArcaneUpgBonus", 19, 0) + (m._customBlock_ArcaneType("ArcaneUpgBonus", 38, 0) + m._customBlock_ArcaneType("ArcaneUpgBonus", 52, 0)))))) *
                                                        (1 + (k._customBlock_GetTalentNumber(1, 591) * (m._customBlock_ArcaneType("ArcaneUpgTotal", 0, 0) / 100)) / 100) *
                                                        (1 + (m._customBlock_ArcaneType("ArcaneUpgBonus", 22, 0) + (m._customBlock_ArcaneType("ArcaneUpgBonus", 44, 0) + m._customBlock_ArcaneType("ArcaneUpgBonus", 55, 0))) / 100) *
                                                        (1 + (m._customBlock_ArcaneType("ArcaneUpgBonus", 27, 0) * k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[389]))) / 100) *
                                                        (1 + w._customBlock_EtcBonuses("94") / 100)
                                                      : "Arcane_DEF" == e
                                                        ? (m._customBlock_ArcaneType("ArcaneUpgBonus", 2, 0) +
                                                              (m._customBlock_ArcaneType("ArcaneUpgBonus", 11, 0) + (m._customBlock_ArcaneType("ArcaneUpgBonus", 29, 0) + m._customBlock_ArcaneType("ArcaneUpgBonus", 46, 0)))) *
                                                          (1 + (k._customBlock_GetTalentNumber(1, 591) * (m._customBlock_ArcaneType("ArcaneUpgTotal", 0, 0) / 100)) / 100) *
                                                          (1 + (m._customBlock_ArcaneType("ArcaneUpgBonus", 22, 0) + (m._customBlock_ArcaneType("ArcaneUpgBonus", 44, 0) + m._customBlock_ArcaneType("ArcaneUpgBonus", 55, 0))) / 100) *
                                                          (1 + (m._customBlock_ArcaneType("ArcaneUpgBonus", 41, 0) * k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[391]))) / 100)
                                                        : "Arcane_MASTERY" == e
                                                          ? 0.25
                                                          : "Arcane_CRITPCT" == e
                                                            ? 5 + m._customBlock_ArcaneType("ArcaneUpgBonus", 8, 0) + k._customBlock_GetTalentNumber(1, 592) * Math.floor(c.asNumber(a.engine.getGameAttribute("Lv0")[12]) / 10)
                                                            : "Arcane_CRITDMG" == e
                                                              ? 1 + (20 + m._customBlock_ArcaneType("ArcaneUpgBonus", 14, 0)) / 100
                                                              : "Arcane_AttackSpdPCT" == e
                                                                ? k._customBlock_GetTalentNumber(2, 590) * (m._customBlock_ArcaneType("ArcaneUpgTotal", 0, 0) / 100) + m._customBlock_ArcaneType("ArcaneUpgBonus", 21, 0)
                                                                : "WepDropChance" == e
                                                                  ? 1 / (300 * (1 + c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[396]) / 100))
                                                                  : "WepDropQuality" == e
                                                                    ? m._customBlock_ArcaneType("ArcaneUpgBonus", 5, 0)
                                                                    : "RingDropChance" == e
                                                                      ? 1 / (500 * (1 + c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[397]) / 100))
                                                                      : "RingDropQuality" == e
                                                                        ? m._customBlock_ArcaneType("ArcaneUpgBonus", 23, 0)
                                                                        : "TenteyeclePCT" == e
                                                                          ? 1 == m._customBlock_ArcaneType("TesseractArcanist", 0, 0)
                                                                              ? Math.min(m._customBlock_ArcaneType("ArcaneUpgBonus", 7, 0), k._customBlock_GetTalentNumber(1, 483))
                                                                              : k._customBlock_GetTalentNumber(1, 483)
                                                                          : "DoubleItemDropz" == e
                                                                            ? 0 == t
                                                                                ? m._customBlock_ArcaneType("ArcaneUpgBonus", 18, 0) +
                                                                                  (k._customBlock_GetTalentNumber(1, 647) +
                                                                                      (m._customBlock_GamingStatType("PaletteBonus", 19, 0) + Math.min(10, m._customBlock_Divinity("Bonus_Minor", -1, 8))))
                                                                                : 1 == t
                                                                                  ? m._customBlock_ArcaneType("ArcaneUpgBonus", 30, 0) + (m._customBlock_GamingStatType("PaletteBonus", 24, 0) + m._customBlock_Spelunk("BigFishBonuses", 5, 0))
                                                                                  : 0
                                                                            : "NaNaTestTestNah" == e
                                                                              ? 1
                                                                              : "ArcaneMultishotPCT" == e
                                                                                ? 0
                                                                                : "TimeLeft" == e
                                                                                  ? c.asNumber("360 270 230 210 200 190 180 180".split(" ")[Math.floor(a.engine.getGameAttribute("CurrentMap") / 50)])
                                                                                  : "KillsReq" == e
                                                                                    ? 25 > a.engine.getGameAttribute("CurrentMap")
                                                                                        ? 5
                                                                                        : 159 == a.engine.getGameAttribute("CurrentMap")
                                                                                          ? 30
                                                                                          : 151 == a.engine.getGameAttribute("CurrentMap")
                                                                                            ? 45
                                                                                            : c.asNumber("10 20 40 70 80 100 250 250".split(" ")[Math.floor(a.engine.getGameAttribute("CurrentMap") / 50)])
                                                                                    : "ExtraTachyon" == e
                                                                                      ? (1 +
                                                                                            (m._customBlock_ArcaneType("ArcaneUpgBonus", 17, 0) +
                                                                                                (k._customBlock_GetTalentNumber(1, 586) +
                                                                                                    (m._customBlock_ArcaneType("ArcaneUpgBonus", 34, 0) *
                                                                                                        k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[390])) +
                                                                                                        (m._customBlock_ArcaneType("ArcaneUpgBonus", 56, 0) *
                                                                                                            k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[393])) +
                                                                                                            (w._customBlock_EtcBonuses("95") +
                                                                                                                (p._customBlock_MainframeBonus(123) +
                                                                                                                    (p._customBlock_ArcadeBonus(50) +
                                                                                                                        (m._customBlock_GamingStatType("PaletteBonus", 29, 0) + m._customBlock_FarmingStuffs("ExoticBonusQTY", 55, 0))))))))) /
                                                                                                100) *
                                                                                        (1 + (m._customBlock_Thingies("EmperorBon", 6, 0) + c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.M13)) / 100) *
                                                                                        m._customBlock_Summoning("AllMasterclassDropz", 0, 0) *
                                                                                        (1 + m._customBlock_Summoning2("MeritocBonusz", 25, 0) / 100) *
                                                                                        (1 + m._customBlock_Thingies("LoreEpiBon", 6, 0) / 100) *
                                                                                        (1 + m._customBlock_Ninja("PristineBon", 22, 0) / 100) *
                                                                                        Math.max(1, k._customBlock_GetTalentNumber(1, 599)) *
                                                                                        m._customBlock_ArcaneType("ExtraTachyonMulti", 0, 0)
                                                                                      : "ExtraTachyonMulti" == e
                                                                                        ? 1 == a.engine.getGameAttribute("BundlesReceived").h.bun_x
                                                                                            ? 1.2
                                                                                            : 1
                                                                                        : "is_NBLB_on" == e
                                                                                          ? 0.5 < p._customBlock_MainframeBonus(3) ||
                                                                                            1 == a.engine.getGameAttribute("BundlesReceived").h.bun_s ||
                                                                                            1 == m._customBlock_Summoning("EventShopOwned", 2, 0)
                                                                                              ? 1
                                                                                              : 0
                                                                                          : "NBLB_bubbleQTY" == e
                                                                                            ? Math.min(
                                                                                                  10,
                                                                                                  Math.max(
                                                                                                      3,
                                                                                                      Math.round(
                                                                                                          Math.min(4, p._customBlock_MainframeBonus(3) + 2) +
                                                                                                              (m._customBlock_Sailing("ArtifactBonus", 12, 0) +
                                                                                                                  (m._customBlock_Sailing("ArtifactBonus", 12, 1) +
                                                                                                                      (c.asNumber(a.engine.getGameAttribute("Tasks")[2][3][6]) +
                                                                                                                          Math.floor(
                                                                                                                              Math.min(1, c.randomFloatBetween(0, t)) +
                                                                                                                                  (0.2 * m._customBlock_GamingStatType("SuperBitType", 4, 0) +
                                                                                                                                      0.3 * m._customBlock_GamingStatType("SuperBitType", 22, 0))
                                                                                                                          ))))
                                                                                                      )
                                                                                                  )
                                                                                              )
                                                                                            : "NBLB_bubbleLVrangeDisp" == e
                                                                                              ? ((e = a.engine),
                                                                                                (i = Math.max(1, p._customBlock_MainframeBonus(3) - 1)),
                                                                                                (e.gameAttributes.h.DummyNumber = i),
                                                                                                0 != t &&
                                                                                                    ((e = a.engine),
                                                                                                    (i = Math.round(a.engine.getGameAttribute("DummyNumber") + 1)),
                                                                                                    (e.gameAttributes.h.DummyNumber = i),
                                                                                                    1 == a.engine.getGameAttribute("BundlesReceived").h.bun_s &&
                                                                                                        ((e = a.engine),
                                                                                                        (i = Math.round(a.engine.getGameAttribute("DummyNumber") + 3)),
                                                                                                        (e.gameAttributes.h.DummyNumber = i),
                                                                                                        0.5 < p._customBlock_MainframeBonus(3) &&
                                                                                                            ((e = a.engine), (i = Math.round(a.engine.getGameAttribute("DummyNumber") + 1)), (e.gameAttributes.h.DummyNumber = i))),
                                                                                                    1 == m._customBlock_Summoning("EventShopOwned", 2, 0) &&
                                                                                                        ((e = a.engine), (i = Math.round(a.engine.getGameAttribute("DummyNumber") + 2)), (e.gameAttributes.h.DummyNumber = i)),
                                                                                                    1 <= p._customBlock_getbonus2(1, 598, -1) &&
                                                                                                        ((e = a.engine), (i = Math.round(a.engine.getGameAttribute("DummyNumber") + 3)), (e.gameAttributes.h.DummyNumber = i))),
                                                                                                Math.round(a.engine.getGameAttribute("DummyNumber")))
                                                                                              : "ArcaneTachyonType" == e
                                                                                                ? 5e5 == t
                                                                                                    ? 5
                                                                                                    : 12500 == t || 4e5 == t
                                                                                                      ? 4
                                                                                                      : 2500 == t || 1850 == t
                                                                                                        ? 3
                                                                                                        : 770 == t || 1500 == t || 870 == t || 22e3 == t || 23e4 == t
                                                                                                          ? 2
                                                                                                          : 6e3 == t || 2e5 == t
                                                                                                            ? 1
                                                                                                            : 8500 == t || 17e3 == t || 175e3 == t
                                                                                                              ? 0
                                                                                                              : 1e4 <= t
                                                                                                                ? Math.min(Math.floor(t / 71) % 6, 5)
                                                                                                                : 4e3 <= t
                                                                                                                  ? Math.min(Math.floor(t / 71) % 5, 4)
                                                                                                                  : 2750 <= t
                                                                                                                    ? Math.min(Math.floor(t / 35) % 4, 3)
                                                                                                                    : 800 <= t
                                                                                                                      ? Math.min(Math.floor(t / 35) % 3, 2)
                                                                                                                      : 250 <= t
                                                                                                                        ? Math.min(Math.floor(t / 35) % 2, 1)
                                                                                                                        : 0
                                                                                                : "ArcaneTachyonQTYbase" == e
                                                                                                  ? 5 <= m._customBlock_ArcaneType("ArcaneTachyonType", t, 0)
                                                                                                      ? Math.pow(Math.max(1, t - 9999) / 8, 0.83)
                                                                                                      : 4 <= m._customBlock_ArcaneType("ArcaneTachyonType", t, 0)
                                                                                                        ? Math.pow(Math.max(1, t - 3999) / 6, 0.87)
                                                                                                        : 3 <= m._customBlock_ArcaneType("ArcaneTachyonType", t, 0)
                                                                                                          ? 1850 == t
                                                                                                              ? 40
                                                                                                              : 2500 == t
                                                                                                                ? 80
                                                                                                                : Math.max(5, Math.pow(Math.max(1, t - 2749) / 5, 0.9))
                                                                                                          : 2 <= m._customBlock_ArcaneType("ArcaneTachyonType", t, 0)
                                                                                                            ? Math.max(3, Math.pow(Math.max(1, t - 799) / 3, 0.9))
                                                                                                            : 1 <= m._customBlock_ArcaneType("ArcaneTachyonType", t, 0)
                                                                                                              ? Math.pow(Math.max(1, t - 249) / 2, 0.9)
                                                                                                              : Math.pow(Math.max(1, t) / 2, 0.9)
                                                                                                  : 0;
                        }
