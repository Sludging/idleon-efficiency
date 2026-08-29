/**
 * Function: _customBlock_Holes
 * Source script: scripts.ActorEvents_579
 * Game version: 1.20 ("Royal_Guardian")
 * Captured: 2026-08-29 via game-debug-tool (findFunction + toString)
 * Case reference: #357
 */
function (e, t, i) {
                            if ("VillagersOwned" == e)
                                return (
                                    (a.engine.getGameAttribute("DNSM").h.HoleozDN = 1),
                                    1 <= c.asNumber(a.engine.getGameAttribute("Holes")[1][0]) && (a.engine.getGameAttribute("DNSM").h.HoleozDN = 1),
                                    1 <= c.asNumber(a.engine.getGameAttribute("Holes")[1][1]) && (a.engine.getGameAttribute("DNSM").h.HoleozDN = 2),
                                    1 <= c.asNumber(a.engine.getGameAttribute("Holes")[1][2]) && (a.engine.getGameAttribute("DNSM").h.HoleozDN = 3),
                                    1 <= c.asNumber(a.engine.getGameAttribute("Holes")[1][3]) && (a.engine.getGameAttribute("DNSM").h.HoleozDN = 4),
                                    1 <= c.asNumber(a.engine.getGameAttribute("Holes")[1][4]) && (a.engine.getGameAttribute("DNSM").h.HoleozDN = 5),
                                    Math.round(Math.max(1, c.asNumber(a.engine.getGameAttribute("DNSM").h.HoleozDN)))
                                );
                            if ("PreventUI" == e)
                                return 216 == a.engine.getGameAttribute("CurrentMap") &&
                                    (0 != n.__cast(a.engine.getGameAttribute("PixelHelperActor")[25].behaviors.getBehavior("ActorEvents_670"), Ha)._GenINFO[79] ||
                                        0 != n.__cast(a.engine.getGameAttribute("PixelHelperActor")[25].behaviors.getBehavior("ActorEvents_670"), Ha)._GenINFO[139] ||
                                        1.6 > c.asNumber(a.engine.getGameAttribute("Holes")[11][18]))
                                    ? 1
                                    : 0;
                            if ("VillagerLV" == e) return a.engine.getGameAttribute("Holes")[1][0 | t];
                            if ("PocketDivOwned" == e)
                                return (c.asNumber(a.engine.getGameAttribute("CustomLists").h.GodsInfo[0 | c.asNumber(a.engine.getGameAttribute("Holes")[11][29])][13]) == t && 0 < m._customBlock_Holes("CosmoBonusQTY", 2, 0)) ||
                                    (c.asNumber(a.engine.getGameAttribute("CustomLists").h.GodsInfo[0 | c.asNumber(a.engine.getGameAttribute("Holes")[11][30])][13]) == t && 1 < m._customBlock_Holes("CosmoBonusQTY", 2, 0))
                                    ? 1
                                    : 0;
                            if ("VillagerExpREQ" == e)
                                return 1 == m._customBlock_Holes("VillagerLV", t, 0) && 0 == t
                                    ? 5
                                    : 0 == t
                                      ? 10 *
                                        ((10 + 7 * Math.pow(m._customBlock_Holes("VillagerLV", t, 0), 2.1)) *
                                            Math.pow(2.1, m._customBlock_Holes("VillagerLV", t, 0)) *
                                            (1 + 0.75 * Math.max(0, m._customBlock_Holes("VillagerLV", t, 0) - 4)) *
                                            Math.pow(3.4, Math.min(1, Math.max(0, Math.floor((1e5 + a.engine.getGameAttribute("DoOnceREAL")) / 100247.3))) * Math.max(0, m._customBlock_Holes("VillagerLV", t, 0) - 12)) -
                                            1.5)
                                      : 1 == t
                                        ? 30 * (10 + 6 * Math.pow(m._customBlock_Holes("VillagerLV", t, 0), 1.8)) * Math.pow(1.57, m._customBlock_Holes("VillagerLV", t, 0))
                                        : 2 == t
                                          ? 50 * (10 + 5 * Math.pow(m._customBlock_Holes("VillagerLV", t, 0), 1.7)) * Math.pow(1.4, m._customBlock_Holes("VillagerLV", t, 0))
                                          : 3 == t
                                            ? 120 * (30 + 10 * Math.pow(m._customBlock_Holes("VillagerLV", t, 0), 2)) * Math.pow(2, m._customBlock_Holes("VillagerLV", t, 0))
                                            : 4 == t
                                              ? 500 * (10 + 5 * Math.pow(m._customBlock_Holes("VillagerLV", t, 0), 1.3)) * Math.pow(1.13, m._customBlock_Holes("VillagerLV", t, 0))
                                              : 10 * Math.pow(10, 20);
                            if ("VillagerExpPerHour" == e) {
                                if (0 == t && 13 > m._customBlock_Holes("CavernsOwned", 0, 0)) {
                                    e = a.engine.getGameAttribute("DNSM");
                                    var s = Math.pow(1.5, c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[355]));
                                    e.h.HoleozDxp = s;
                                } else a.engine.getGameAttribute("DNSM").h.HoleozDxp = 1;
                                return (
                                    2 == t && ((e = a.engine.getGameAttribute("DNSM")), (s = 1 + m._customBlock_Holes2("Fountain_BonTOT", 0, 14) / 100), (e.h.HoleozDxp = s)),
                                    Math.max(1, c.asNumber(a.engine.getGameAttribute("DNSM").h.HoleozDxp)) *
                                        (100 + m._customBlock_Holes("B_UPG", 0, 25)) *
                                        Math.max(
                                            1,
                                            (1 + m._customBlock_Windwalker("CompassBonus", 59, 0) / 100) *
                                                (1 + m._customBlock_Thingies("LegendPTS_bonus", 12, 0) / 100) *
                                                (1 + m._customBlock_Ninja("PristineBon", 21, 0) / 100) *
                                                (1 + 2 * m._customBlock_Companions(13)) *
                                                (1 + x._customBlock_ArbitraryCode("StatueBonusGiven28") / 100) *
                                                (1 +
                                                    (m._customBlock_Holes("JarCollectibleBonus", 4, 0) +
                                                        (m._customBlock_Holes("JarCollectibleBonus", 10, 0) +
                                                            (m._customBlock_Holes("JarCollectibleBonus", 12, 0) +
                                                                (m._customBlock_Holes("JarCollectibleBonus", 22, 0) + (m._customBlock_Holes("JarCollectibleBonus", 29, 0) + m._customBlock_Holes("JarCollectibleBonus", 35, 0)))))) /
                                                        100) *
                                                (1 + (25 * m._customBlock_Summoning("EventShopOwned", 6, 0)) / 100) *
                                                (1 + m._customBlock_Thingies("LoreEpiBon", 1, 0) / 100) *
                                                (1 + (50 * c.asNumber(a.engine.getGameAttribute("BundlesReceived").h.bun_u)) / 100)
                                        ) *
                                        c.asNumber(a.engine.getGameAttribute("Holes")[3][0 | t]) *
                                        (1 + c.asNumber(a.engine.getGameAttribute("Holes")[23][0 | t])) *
                                        (1 + m._customBlock_FarmingStuffs("ExoticBonusQTY", 51, 0) / 100) *
                                        (1 + p._customBlock_ArcadeBonus(38) / 100) *
                                        (1 + m._customBlock_Summoning("GrimoireUpgBonus", 29, 0) / 100) *
                                        (1 + m._customBlock_ArcaneType("ArcaneUpgBonus", 32, 0) / 100) *
                                        (1 + (m._customBlock_Holes("CosmoBonusQTY", 1, 5) * Math.floor(m._customBlock_Holes("LeastOpalsInVillager", 0, 0) / 5)) / 100) *
                                        (1 +
                                            (m._customBlock_Holes("MonumentROGbonuses", 0, 3) +
                                                (m._customBlock_Holes("MonumentROGbonuses", 1, 3) +
                                                    m._customBlock_Holes("MonumentROGbonuses", 2, 3) +
                                                    (m._customBlock_Holes("MeasurementBonusTOTAL", 7, 0) +
                                                        (Math.floor(c.asNumber(a.engine.getGameAttribute("Holes")[3][0 | t]) / 10) * m._customBlock_Holes("CosmoBonusQTY", 1, 0) +
                                                            (m._customBlock_Holes("CosmoBonusQTY", 1, 1) * m._customBlock_Holes("CosSchBlt", 0, 0) +
                                                                (m._customBlock_Holes("CosmoBonusQTY", 1, 2) +
                                                                    (m._customBlock_Holes("B_UPG", 48, 0) +
                                                                        (Math.min(4 * x._customBlock_RunCodeOfTypeXforThingY("CardLv", "caveB"), 50) +
                                                                            (m._customBlock_Holes("BellBonuss", 1, 0) +
                                                                                (m._customBlock_Holes("MeasurementBonusTOTAL", 0, 0) +
                                                                                    (m._customBlock_Summoning("WinBonus", 21, 0) + m._customBlock_Summoning("VaultUpgBonus", 73, 0)))))))))))) /
                                                100)
                                );
                            }
                            if ("OpalsOwnedToInvest" == e) return n.__cast(a.engine.getGameAttribute("PixelHelperActor")[25].behaviors.getBehavior("ActorEvents_670"), Ha)._GenINFO[69];
                            if ("createOpal" == e)
                                return (
                                    (n.__cast(a.engine.getGameAttribute("PixelHelperActor")[25].behaviors.getBehavior("ActorEvents_670"), Ha)._TRIGGEREDtext = "d"),
                                    a.engine.getGameAttribute("PixelHelperActor")[25].shout("_customEvent_CavernStuffz"),
                                    (a.engine.gameAttributes.h.PopupType = 0),
                                    (a.engine.gameAttributes.h.DummyText2 = "OpalFound"),
                                    (a.engine.gameAttributes.h.DummyNumber2 = 0),
                                    c.createRecycledActor(c.getActorType(262), t, i, 0),
                                    0
                                );
                            if ("CavernsOwned" == e) return Math.min(18, m._customBlock_Holes("VillagerLV", 0, 0));
                            if ("B_UPG" == e) {
                                if (0 == a.engine.getGameAttribute("Holes").length || 0 == a.engine.getGameAttribute("Holes")[13][0 | t]) return 0;
                                if (14 == t) {
                                    if (((e = a.engine.getGameAttribute("DNSM")), !Object.prototype.hasOwnProperty.call(e.h, "HoleozDNb14"))) {
                                        for (t = a.engine.getGameAttribute("DNSM").h.HoleozDNb14 = 0; 10 > t;)
                                            ((s = t++),
                                                (e = a.engine.getGameAttribute("DNSM")),
                                                (s = c.asNumber(a.engine.getGameAttribute("DNSM").h.HoleozDNb14) + c.asNumber(a.engine.getGameAttribute("Holes")[8][s])),
                                                (e.h.HoleozDNb14 = s));
                                        ((e = a.engine.getGameAttribute("DNSM")), (s = c.asNumber(a.engine.getGameAttribute("DNSM").h.HoleozDNb14) * (20 + m._customBlock_Holes("StudyBolaiaBonuses", 0, 0))), (e.h.HoleozDNb14 = s));
                                    }
                                    return a.engine.getGameAttribute("DNSM").h.HoleozDNb14;
                                }
                                if (45 == t) {
                                    if (((e = a.engine.getGameAttribute("DNSM")), !Object.prototype.hasOwnProperty.call(e.h, "HoleozDNb45"))) {
                                        t = a.engine.getGameAttribute("DNSM").h.HoleozDNb45 = 0;
                                        for (var r = a.engine.getGameAttribute("Holes")[16].length; t < r;)
                                            ((s = t++),
                                                (e = a.engine.getGameAttribute("DNSM")),
                                                (s = c.asNumber(a.engine.getGameAttribute("DNSM").h.HoleozDNb45) + c.asNumber(a.engine.getGameAttribute("Holes")[16][s])),
                                                (e.h.HoleozDNb45 = s));
                                    }
                                    return Math.max(1, Math.pow(1.1, Math.floor(c.asNumber(a.engine.getGameAttribute("DNSM").h.HoleozDNb45) / 25)));
                                }
                                return 46 == t
                                    ? 5 * c.asNumber(a.engine.getGameAttribute("Holes")[11][26])
                                    : 47 == t
                                      ? 25 * c.asNumber(a.engine.getGameAttribute("Holes")[11][26])
                                      : 48 == t
                                        ? 10 * c.asNumber(a.engine.getGameAttribute("Holes")[11][26])
                                        : 49 == t
                                          ? i *
                                            (c.asNumber(a.engine.getGameAttribute("Holes")[11][1]) +
                                                (c.asNumber(a.engine.getGameAttribute("Holes")[11][3]) * m._customBlock_Holes("B_UPG", 50, 1) +
                                                    (c.asNumber(a.engine.getGameAttribute("Holes")[11][5]) * m._customBlock_Holes("B_UPG", 79, 1) +
                                                        c.asNumber(a.engine.getGameAttribute("Holes")[11][7]) * m._customBlock_Holes("B_UPG", 98, 1))))
                                          : 52 == t
                                            ? 60 * Math.floor(k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("Holes")[9][0])))
                                            : 53 == t
                                              ? 4 * Math.floor(k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("Holes")[9][13])))
                                              : 54 == t
                                                ? Math.pow(1.2, Math.floor(k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("Holes")[9][15]))))
                                                : 55 == t
                                                  ? 10 * Math.floor(k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("Holes")[9][11])))
                                                  : 56 == t
                                                    ? Math.pow(1.3, Math.floor(k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("Holes")[9][2]))))
                                                    : 57 == t
                                                      ? 20 * Math.floor(k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("Holes")[9][1])))
                                                      : 58 == t
                                                        ? 5 * k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("Holes")[11][32]))
                                                        : 59 == t
                                                          ? ((c.asNumber(a.engine.getGameAttribute("Holes")[11][33]) +
                                                                (c.asNumber(a.engine.getGameAttribute("Holes")[11][34]) + (c.asNumber(a.engine.getGameAttribute("Holes")[11][35]) + c.asNumber(a.engine.getGameAttribute("Holes")[11][36])))) /
                                                                100) *
                                                            10
                                                          : 82 == t || 83 == t || 84 == t
                                                            ? i * c.asNumber(a.engine.getGameAttribute("Holes")[11][55])
                                                            : i;
                            }
                            if ("CanWeAffordCreate" == e)
                                return -1 == t || 1 == a.engine.getGameAttribute("Holes")[13][0 | c.asNumber(a.engine.getGameAttribute("CustomLists").h.HolesInfo[40][0 | t])]
                                    ? 0
                                    : c.asNumber(
                                            a.engine.getGameAttribute("Holes")[9][0 | c.asNumber(a.engine.getGameAttribute("CustomLists").h.HolesBuildings[0 | c.asNumber(a.engine.getGameAttribute("CustomLists").h.HolesInfo[40][0 | t])][2])]
                                        ) >= m._customBlock_Holes("BuildCost", t, 0)
                                      ? 1
                                      : 0;
                            if ("SchematicsAvailable" == e)
                                return Math.min(
                                    Math.min(105, Math.round(1 + 3 * c.asNumber(a.engine.getGameAttribute("Holes")[1][1]) + Math.floor(c.asNumber(a.engine.getGameAttribute("Holes")[1][1]) / 5))),
                                    a.engine.getGameAttribute("CustomLists").h.HolesBuildings.length
                                );
                            if ("BuildCost" == e)
                                return "1" == a.engine.getGameAttribute("CustomLists").h.HolesBuildings[0 | c.asNumber(a.engine.getGameAttribute("CustomLists").h.HolesInfo[40][0 | t])][4]
                                    ? Math.max(0.01, Math.pow(0.85, c.asNumber(a.engine.getGameAttribute("Holes")[21][5]))) *
                                          c.asNumber(a.engine.getGameAttribute("CustomLists").h.HolesBuildings[0 | c.asNumber(a.engine.getGameAttribute("CustomLists").h.HolesInfo[40][0 | t])][3])
                                    : 10 > c.asNumber(a.engine.getGameAttribute("CustomLists").h.HolesBuildings[0 | c.asNumber(a.engine.getGameAttribute("CustomLists").h.HolesInfo[40][0 | t])][2])
                                      ? 50 * Math.max(0.01, Math.pow(0.85, c.asNumber(a.engine.getGameAttribute("Holes")[21][5]))) * Math.pow(1.28, t + Math.floor(t / 2.7))
                                      : 20 > c.asNumber(a.engine.getGameAttribute("CustomLists").h.HolesBuildings[0 | c.asNumber(a.engine.getGameAttribute("CustomLists").h.HolesInfo[40][0 | t])][2])
                                        ? 50 *
                                          Math.max(0.01, Math.pow(0.85, c.asNumber(a.engine.getGameAttribute("Holes")[21][5]))) *
                                          Math.pow(1.28, t - 16 + Math.floor((t - 16) / 2.7)) *
                                          Math.pow(1.23, Math.min(Math.max(0, (t - 16) / 2), 14))
                                        : 40 *
                                          Math.max(0.01, Math.pow(0.85, c.asNumber(a.engine.getGameAttribute("Holes")[21][5]))) *
                                          Math.pow(1.34, t - 54 + Math.floor((t - 54) / 2.7)) *
                                          Math.pow(1.26, Math.min(Math.max(0, (t - 54) / 2), 14));
                            if ("CosmoPtsLeft" == e) {
                                for (e = a.engine.getGameAttribute("DNSM"), s = Math.round(m._customBlock_Holes("VillagerLV", 2, 0) + c.asNumber(a.engine.getGameAttribute("GemItemsPurchased")[4])), e.h.HoleozDN = s, t = 0; 3 > t;)
                                    for (
                                        s = t++,
                                            a.engine.getGameAttribute("DNSM").h.HoleozDN1 = s,
                                            r = 0,
                                            i = a.engine.getGameAttribute("CustomLists").h.HolesInfo[Math.round(2 + c.asNumber(a.engine.getGameAttribute("DNSM").h.HoleozDN1))].length;
                                        r < i;
                                    )
                                        ((s = r++),
                                            (e = a.engine.getGameAttribute("DNSM")),
                                            (s = c.asNumber(a.engine.getGameAttribute("DNSM").h.HoleozDN) - c.asNumber(a.engine.getGameAttribute("Holes")[Math.round(4 + c.asNumber(a.engine.getGameAttribute("DNSM").h.HoleozDN1))][s])),
                                            (e.h.HoleozDN = s));
                                return Math.round(c.asNumber(a.engine.getGameAttribute("DNSM").h.HoleozDN));
                            }
                            if ("CosSchBlt" == e) {
                                if (((e = a.engine.getGameAttribute("DNSM")), !Object.prototype.hasOwnProperty.call(e.h, "CosSchBlt") || -1 == t))
                                    for (t = a.engine.getGameAttribute("DNSM").h.CosSchBlt = 0, r = a.engine.getGameAttribute("Holes")[13].length; t < r;)
                                        ((s = t++),
                                            1 == a.engine.getGameAttribute("Holes")[13][s] && ((e = a.engine.getGameAttribute("DNSM")), (s = Math.round(c.asNumber(a.engine.getGameAttribute("DNSM").h.CosSchBlt) + 1)), (e.h.CosSchBlt = s)));
                                return a.engine.getGameAttribute("DNSM").h.CosSchBlt;
                            }
                            if ("CosmoUpgCoded" == e) return 0 == t ? 5 : 7;
                            if ("CanWeEnhanceCosmo" == e) return 1 <= c.asNumber(a.engine.getGameAttribute("Holes")[5][2]) ? 1 : 0;
                            if ("EnhanceMaxLV" == e) return c.asNumber(a.engine.getGameAttribute("CustomLists").h.HolesInfo[Math.round(56 + t)][0 | i]);
                            if ("CosmoBonusQTY" == e)
                                return 2 == t && 1 == i
                                    ? Math.floor(Math.max(1, Math.pow(3, c.asNumber(a.engine.getGameAttribute("Holes")[Math.round(4 + t)][0 | i]))))
                                    : Math.floor(c.asNumber(a.engine.getGameAttribute("CustomLists").h.CosmoUpgrades[0 | t][0 | i][0]) * c.asNumber(a.engine.getGameAttribute("Holes")[Math.round(4 + t)][0 | i]));
                            if ("MeasurementsOwned" == e) return Math.min(c.asNumber(a.engine.getGameAttribute("Holes")[1][3]), 17);
                            if ("CanWeAffordMeasurement" == e)
                                return c.asNumber(a.engine.getGameAttribute("Holes")[9][0 | c.asNumber(a.engine.getGameAttribute("CustomLists").h.HolesInfo[50][0 | t])]) >= m._customBlock_Holes("MeasurementCost", t, 0) ? 1 : 0;
                            if ("MeasurementCost" == e)
                                return (
                                    (1 / (1 + m._customBlock_Holes2("Fountain_BonTOT", 2, 14) / 100)) *
                                    (250 + 50 * c.asNumber(a.engine.getGameAttribute("Holes")[22][0 | t])) *
                                    Math.pow(1.6, t - 6 * Math.floor(t / 10)) *
                                    Math.pow(1.1, c.asNumber(a.engine.getGameAttribute("Holes")[22][0 | t]))
                                );
                            if ("MeasurementBaseBonus" == e)
                                return -1 != ("" + h.string(a.engine.getGameAttribute("CustomLists").h.HolesInfo[55][0 | t])).indexOf("TOT")
                                    ? (1 + m._customBlock_Holes("CosmoBonusQTY", 1, 3) / 100) *
                                          ((c.asNumber(y.replace("" + h.string(a.engine.getGameAttribute("CustomLists").h.HolesInfo[55][0 | t]), "TOT", "")) * c.asNumber(a.engine.getGameAttribute("Holes")[22][0 | t])) /
                                              (100 + c.asNumber(a.engine.getGameAttribute("Holes")[22][0 | t])))
                                    : (1 + m._customBlock_Holes("CosmoBonusQTY", 1, 3) / 100) * c.asNumber(a.engine.getGameAttribute("CustomLists").h.HolesInfo[55][0 | t]) * c.asNumber(a.engine.getGameAttribute("Holes")[22][0 | t]);
                            if ("MeasurementQTYfound" == e) {
                                if (0 == t)
                                    return (
                                        (e = a.engine.getGameAttribute("DNSM")),
                                        (s = a.engine.getGameAttribute("Holes")[11][28]),
                                        (e.h.HoleozDNm = s),
                                        99 == i ? k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("DNSM").h.HoleozDNm)) : a.engine.getGameAttribute("DNSM").h.HoleozDNm
                                    );
                                if (1 == t)
                                    return (
                                        (e = a.engine.getGameAttribute("DNSM")),
                                        (s = D.mapCount(a.engine.getGameAttribute("FarmCrop"))),
                                        (e.h.HoleozDNm = s),
                                        99 == i ? c.asNumber(a.engine.getGameAttribute("DNSM").h.HoleozDNm) / 14 : a.engine.getGameAttribute("DNSM").h.HoleozDNm
                                    );
                                if (2 == t)
                                    return (
                                        (e = a.engine.getGameAttribute("DNSM")),
                                        Object.prototype.hasOwnProperty.call(e.h, "TomeQTY")
                                            ? ((e = a.engine.getGameAttribute("DNSM")),
                                              (s = a.engine.getGameAttribute("DNSM").h.TomeQTY[5]),
                                              (e.h.HoleozDNm = s),
                                              99 == i ? c.asNumber(a.engine.getGameAttribute("DNSM").h.HoleozDNm) / 500 : a.engine.getGameAttribute("DNSM").h.HoleozDNm)
                                            : 0
                                    );
                                if (3 == t)
                                    return (
                                        (e = a.engine.getGameAttribute("DNSM")),
                                        (s = n.__cast(a.engine.getGameAttribute("PixelHelperActor")[4].behaviors.getBehavior("ActorEvents_229"), ob)._GenInfo[84]),
                                        (e.h.HoleozDNm = s),
                                        99 == i ? c.asNumber(a.engine.getGameAttribute("DNSM").h.HoleozDNm) / 2500 : a.engine.getGameAttribute("DNSM").h.HoleozDNm
                                    );
                                if (4 == t)
                                    return (
                                        (e = a.engine.getGameAttribute("DNSM")),
                                        Object.prototype.hasOwnProperty.call(e.h, "TomeQTY")
                                            ? ((e = a.engine.getGameAttribute("DNSM")),
                                              (s = a.engine.getGameAttribute("DNSM").h.TomeQTY[11]),
                                              (e.h.HoleozDNm = s),
                                              99 == i
                                                  ? c.asNumber(a.engine.getGameAttribute("DNSM").h.HoleozDNm) / 5e3 + Math.max(0, c.asNumber(a.engine.getGameAttribute("DNSM").h.HoleozDNm) - 18e3) / 1500
                                                  : a.engine.getGameAttribute("DNSM").h.HoleozDNm)
                                            : 0
                                    );
                                if (5 == t) return 0;
                                if (6 == t)
                                    return (
                                        (e = a.engine.getGameAttribute("DNSM")),
                                        (s =
                                            p._customBlock_WorkbenchStuff("OverkillQTY", 0, 0) +
                                            (p._customBlock_WorkbenchStuff("OverkillQTY", 1, 0) +
                                                (p._customBlock_WorkbenchStuff("OverkillQTY", 2, 0) +
                                                    (p._customBlock_WorkbenchStuff("OverkillQTY", 3, 0) +
                                                        (p._customBlock_WorkbenchStuff("OverkillQTY", 4, 0) + (p._customBlock_WorkbenchStuff("OverkillQTY", 5, 0) + p._customBlock_WorkbenchStuff("OverkillQTY", 6, 0))))))),
                                        (e.h.HoleozDNm = s),
                                        99 == i ? c.asNumber(a.engine.getGameAttribute("DNSM").h.HoleozDNm) / 125 : a.engine.getGameAttribute("DNSM").h.HoleozDNm
                                    );
                                if (7 == t)
                                    return (
                                        (e = a.engine.getGameAttribute("DNSM")),
                                        (s = a.engine.getGameAttribute("Tasks")[0][1][0]),
                                        (e.h.HoleozDNm = s),
                                        99 == i ? k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("DNSM").h.HoleozDNm)) / 2 : a.engine.getGameAttribute("DNSM").h.HoleozDNm
                                    );
                                if (8 == t)
                                    return (
                                        (e = a.engine.getGameAttribute("DNSM")),
                                        (s = a.engine.getGameAttribute("Cards")[1].length),
                                        (e.h.HoleozDNm = s),
                                        99 == i ? c.asNumber(a.engine.getGameAttribute("DNSM").h.HoleozDNm) / 150 : a.engine.getGameAttribute("DNSM").h.HoleozDNm
                                    );
                                if (9 == t) {
                                    for (t = a.engine.getGameAttribute("DNSM").h.HoleozDNm = 0, r = a.engine.getGameAttribute("Holes")[26].length; t < r;)
                                        ((s = t++), (e = a.engine.getGameAttribute("DNSM")), (s = c.asNumber(a.engine.getGameAttribute("DNSM").h.HoleozDNm) + c.asNumber(a.engine.getGameAttribute("Holes")[26][s])), (e.h.HoleozDNm = s));
                                    return 99 == i ? c.asNumber(a.engine.getGameAttribute("DNSM").h.HoleozDNm) / 6 : a.engine.getGameAttribute("DNSM").h.HoleozDNm;
                                }
                                return 10 == t
                                    ? ((e = a.engine.getGameAttribute("DNSM")),
                                      (s = a.engine.getGameAttribute("Holes")[11][63]),
                                      (e.h.HoleozDNm = s),
                                      99 == i ? Math.max(0, k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("DNSM").h.HoleozDNm)) - 2) : a.engine.getGameAttribute("DNSM").h.HoleozDNm)
                                    : 0;
                            }
                            if ("MeasurementMulti" == e)
                                return 5 > m._customBlock_Holes("MeasurementQTYfound", t, 99)
                                    ? 1 + (18 * m._customBlock_Holes("MeasurementQTYfound", t, 99)) / 100
                                    : 1 + (18 * m._customBlock_Holes("MeasurementQTYfound", t, 99) + 8 * (m._customBlock_Holes("MeasurementQTYfound", t, 99) - 5)) / 100;
                            if ("MeasurementBonusTOTAL" == e)
                                return m._customBlock_Holes("MeasurementBaseBonus", t, 0) * m._customBlock_Holes("MeasurementMulti", c.asNumber(a.engine.getGameAttribute("CustomLists").h.HolesInfo[52][0 | t]), 0);
                            if ("BolaiaStudyRate" == e)
                                return (
                                    100 *
                                    (1 + m._customBlock_Holes2("Fountain_BonTOT", 1, 14) / 100) *
                                    (1 +
                                        ((5 + (m._customBlock_Holes("B_UPG", 85, 2) + (m._customBlock_Holes("B_UPG", 87, 3) + (m._customBlock_Holes("B_UPG", 88, 5) + m._customBlock_Holes("B_UPG", 99, 5))))) *
                                            m._customBlock_Holes("VillagerLV", 4, 0)) /
                                            100) *
                                    (1 + (m._customBlock_Holes("JarCollectibleBonus", 16, 0) + (k._customBlock_StampBonusOfTypeX("VillageStudy") + m._customBlock_Holes("CosmoBonusQTY", 1, 4))) / 100)
                                );
                            if ("BucketsOwned" == e)
                                return Math.round(
                                    1 +
                                        (m._customBlock_Holes("B_UPG", 3, 1) +
                                            (m._customBlock_Holes("B_UPG", 4, 1) +
                                                (m._customBlock_Holes("B_UPG", 5, 1) +
                                                    (m._customBlock_Holes("B_UPG", 6, 1) +
                                                        (m._customBlock_Holes("B_UPG", 7, 1) +
                                                            (m._customBlock_Holes("B_UPG", 8, 1) + (m._customBlock_Holes("B_UPG", 9, 1) + (m._customBlock_Holes("B_UPG", 10, 1) + m._customBlock_Holes("B_UPG", 11, 1)))))))))
                                );
                            if ("SedimentMax" == e) return 100 * Math.pow(1.5, c.asNumber(a.engine.getGameAttribute("Holes")[8][0 | t])) * (1 + c.asNumber(a.engine.getGameAttribute("CustomLists").h.HolesInfo[21][0 | t]) / 100);
                            if ("BucketFillRate" == e)
                                return (
                                    (a.engine.getGameAttribute("DNSM").h.HoleBktFr = 1),
                                    t < m._customBlock_Holes2("HolezBucketGoldOwned", 0, 0) && ((e = a.engine.getGameAttribute("DNSM")), (s = Math.max(1, m._customBlock_Holes2("HolezBucketGoldMult", 0, 0))), (e.h.HoleBktFr = s)),
                                    c.asNumber(a.engine.getGameAttribute("DNSM").h.HoleBktFr) *
                                        (m._customBlock_Holes("B_UPG", 58, 0) +
                                            m._customBlock_Holes("B_UPG", 59, 0) +
                                            (10 + (m._customBlock_Holes("B_UPG", 1, 5) + m._customBlock_Holes("B_UPG", 26, 5))) *
                                                (1 + m._customBlock_Holes("B_UPG", 14, 0) / 100) *
                                                (1 + c.asNumber(a.engine.getGameAttribute("GemItemsPurchased")[2]) / 2) *
                                                (1 + m._customBlock_Holes("MonumentROGbonuses", 0, 1) / 100) *
                                                (1 + m._customBlock_Holes("LampBonuses", 99, 0) / 100) *
                                                (1 + m._customBlock_Holes("GambitBonuses", 3, 0) / 100) *
                                                Math.max(1, m._customBlock_Holes("B_UPG", 15, 1) * Math.pow(1.1, c.asNumber(a.engine.getGameAttribute("Holes")[11][1]))) *
                                                (1 + m._customBlock_Holes("MeasurementBonusTOTAL", 5, 0) / 100) *
                                                (1 + m._customBlock_Holes("BellBonuss", 0, 0) / 100) *
                                                (1 + m._customBlock_Holes("JarCollectibleBonus", 8, 0) / 100) *
                                                (1 + k._customBlock_StampBonusOfTypeX("CavernRes") / 100) *
                                                (1 + m._customBlock_Holes2("Cglunko_upgBon", 14, 0) / 100))
                                );
                            if ("CanWeAfford_Well" == e) return c.asNumber(a.engine.getGameAttribute("Holes")[9][0]) >= m._customBlock_Holes("WellOpal_cost", 0, 0) ? 1 : 0;
                            if ("WellOpal_cost" == e)
                                return (
                                    (e = a.engine.getGameAttribute("DNSM")),
                                    (s =
                                        (1 + (3 * c.asNumber(a.engine.getGameAttribute("Holes")[11][9]) + Math.pow(c.asNumber(a.engine.getGameAttribute("Holes")[11][9]), 2))) *
                                        Math.pow(3.5 + c.asNumber(a.engine.getGameAttribute("Holes")[11][9]) / 10, c.asNumber(a.engine.getGameAttribute("Holes")[11][9]))),
                                    (e.h.HoleozWellOpz = s),
                                    1e9 > c.asNumber(a.engine.getGameAttribute("DNSM").h.HoleozWellOpz)
                                        ? 1 == a.engine.getGameAttribute("Holes")[11][9]
                                            ? 6
                                            : 2 == a.engine.getGameAttribute("Holes")[11][9]
                                              ? 60
                                              : Math.floor(c.asNumber(a.engine.getGameAttribute("DNSM").h.HoleozWellOpz))
                                        : a.engine.getGameAttribute("DNSM").h.HoleozWellOpz
                                );
                            if ("TotalOreREQ" == e)
                                return (
                                    (1 + 99 * Math.floor(t / 3)) *
                                    ((200 * Math.pow(2.2, 1 + c.asNumber(a.engine.getGameAttribute("Holes")[11][Math.round(1 + 2 * t)]))) /
                                        (1 +
                                            (m._customBlock_Holes("JarCollectibleBonus", 5, 0) +
                                                m._customBlock_Holes("StudyBolaiaBonuses", 1, 0) * c.asNumber(a.engine.getGameAttribute("Holes")[11][1]) +
                                                m._customBlock_Holes("StudyBolaiaBonuses", 7, 0) * c.asNumber(a.engine.getGameAttribute("Holes")[11][3]) +
                                                (m._customBlock_Holes("StudyBolaiaBonuses", 11, 0) * c.asNumber(a.engine.getGameAttribute("Holes")[11][5]) +
                                                    m._customBlock_Holes("StudyBolaiaBonuses", 16, 0) * c.asNumber(a.engine.getGameAttribute("Holes")[11][7]))) /
                                                100))
                                );
                            if ("MotherlodeEffBase" == e) return 2e4 * (1 + 99 * Math.floor(t / 3)) * Math.pow(1.8, 1 + c.asNumber(a.engine.getGameAttribute("Holes")[11][Math.round(1 + 2 * t)]));
                            if ("HoundNextOpalScoreReq" == e)
                                return 12 * (150 + (30 + c.asNumber(a.engine.getGameAttribute("Holes")[7][2])) * c.asNumber(a.engine.getGameAttribute("Holes")[7][2])) * Math.pow(1.5, c.asNumber(a.engine.getGameAttribute("Holes")[7][2]));
                            if ("AmpStonesOwned" == e)
                                return Math.round(
                                    1 +
                                        (m._customBlock_Holes("B_UPG", 16, 1) +
                                            (m._customBlock_Holes("B_UPG", 17, 1) +
                                                (m._customBlock_Holes("B_UPG", 18, 1) +
                                                    (m._customBlock_Holes("B_UPG", 19, 1) + (m._customBlock_Holes("B_UPG", 20, 1) + (m._customBlock_Holes("B_UPG", 21, 1) + m._customBlock_Holes("B_UPG", 22, 1)))))))
                                );
                            if ("AmpStoneMAX" == e) return 2 == t ? 20 : 4 == t ? 30 : 5 == t ? 20 : 6 == t ? 24 : 7 == t ? 40 : 100;
                            if ("AmpMulti" == e) {
                                for (t = a.engine.getGameAttribute("DNSM").h.HoleozDNamptot = 0; 8 > t;)
                                    ((s = t++),
                                        (e = a.engine.getGameAttribute("DNSM")),
                                        (s = c.asNumber(a.engine.getGameAttribute("DNSM").h.HoleozDNamptot) + c.asNumber(a.engine.getGameAttribute("Holes")[12][s])),
                                        (e.h.HoleozDNamptot = s));
                                return (
                                    0.5 * m._customBlock_Holes("B_UPG", 23, 1) * Math.floor(c.asNumber(a.engine.getGameAttribute("DNSM").h.HoleozDNamptot) / 10) +
                                    (11 * c.asNumber(a.engine.getGameAttribute("Holes")[12][0]) +
                                        (9 * c.asNumber(a.engine.getGameAttribute("Holes")[12][1]) +
                                            (8 * c.asNumber(a.engine.getGameAttribute("Holes")[12][2]) +
                                                (10 * c.asNumber(a.engine.getGameAttribute("Holes")[12][3]) +
                                                    (8 * c.asNumber(a.engine.getGameAttribute("Holes")[12][4]) +
                                                        (7 * c.asNumber(a.engine.getGameAttribute("Holes")[12][5]) +
                                                            (10 * c.asNumber(a.engine.getGameAttribute("Holes")[12][6]) + 7 * c.asNumber(a.engine.getGameAttribute("Holes")[12][7])))))))) /
                                        100 +
                                    1
                                );
                            }
                            if ("AmpDebuff" == e)
                                return 0 == t
                                    ? (5e3 + 800 * c.asNumber(a.engine.getGameAttribute("Holes")[12][0])) * Math.pow(1.25, c.asNumber(a.engine.getGameAttribute("Holes")[12][0]))
                                    : 1 == t
                                      ? (6e3 + 4e3 * c.asNumber(a.engine.getGameAttribute("Holes")[12][1])) * Math.pow(1.3, c.asNumber(a.engine.getGameAttribute("Holes")[12][1]))
                                      : 2 == t
                                        ? 5 * c.asNumber(a.engine.getGameAttribute("Holes")[12][2])
                                        : 3 == t
                                          ? (1 + c.asNumber(a.engine.getGameAttribute("Holes")[12][3])) * Math.pow(1.05, c.asNumber(a.engine.getGameAttribute("Holes")[12][3]))
                                          : 4 == t
                                            ? (1 + c.asNumber(a.engine.getGameAttribute("Holes")[12][4])) * Math.pow(1.07, c.asNumber(a.engine.getGameAttribute("Holes")[12][4]))
                                            : 5 == t
                                              ? 1 + c.asNumber(a.engine.getGameAttribute("Holes")[12][5])
                                              : 6 == t
                                                ? 4 * c.asNumber(a.engine.getGameAttribute("Holes")[12][6])
                                                : c.asNumber(a.engine.getGameAttribute("Holes")[12][7]) / 10;
                            if ("MPcostboost" == e)
                                return 216 == a.engine.getGameAttribute("CurrentMap") && 2 == a.engine.getGameAttribute("Holes")[0][a.engine.getGameAttribute("GetPlayersUsernames").indexOf(a.engine.getGameAttribute("UserInfo")[0])]
                                    ? m._customBlock_Holes("AmpDebuff", 4, 0)
                                    : 1;
                            if ("FearMAX" == e) return 50;
                            if ("MonumentRewardMulti" == e)
                                return (
                                    (Math.min(c.asNumber(a.engine.getGameAttribute("Holes")[11][Math.round(11 + t)]), m._customBlock_Holes("MonumentRewardMulti_MaxLinearTime", t, 0)) / 72e3 +
                                        (Math.pow(1 + Math.max(0, c.asNumber(a.engine.getGameAttribute("Holes")[11][Math.round(11 + t)]) - m._customBlock_Holes("MonumentRewardMulti_MaxLinearTime", t, 0)) / 72e3, 0.3) - 1)) *
                                    (1 + m._customBlock_Summoning2("MeritocBonusz", 7, 0) / 100) *
                                    (1 + m._customBlock_Thingies("LegendPTS_bonus", 27, 0) / 100)
                                );
                            if ("MonumentRewardMulti_MaxLinearTime" == e)
                                return 1 == t
                                    ? 86400 *
                                          (2 +
                                              (m._customBlock_Holes("B_UPG", 70, 2) + m._customBlock_Holes("B_UPG", 96, 2) + 10 * m._customBlock_GamingStatType("SuperBitType", 31, 0)) +
                                              (14 * m._customBlock_Holes("StudyBolaiaBonuses", 9, 99) + m._customBlock_Thingies("LegendPTS_bonus", 27, 0) / 24))
                                    : 86400 *
                                          (2 +
                                              (m._customBlock_Holes("B_UPG", 70, 2) +
                                                  m._customBlock_Holes("B_UPG", 96, 2) +
                                                  (10 * m._customBlock_GamingStatType("SuperBitType", 31, 0) + m._customBlock_Thingies("LegendPTS_bonus", 27, 0) / 24)));
                            if ("MonumentHRbonuses" == e) return c.asNumber(a.engine.getGameAttribute("Holes")[14][Math.round(1 + 2 * t)]) > i ? 1 : 0;
                            if ("MonumentROGbonuses" == e)
                                return (
                                    (a.engine.getGameAttribute("DNSM").h.HoleozDN = 1),
                                    9 != i &&
                                        ((e = a.engine.getGameAttribute("DNSM")),
                                        (s = 1 + m._customBlock_Holes("MonumentROGbonuses", t, 9) / 100),
                                        (e.h.HoleozDN = s),
                                        (e = a.engine.getGameAttribute("DNSM")),
                                        (s = c.asNumber(a.engine.getGameAttribute("DNSM").h.HoleozDN) + m._customBlock_Holes("CosmoBonusQTY", 0, 0) / 100),
                                        (e.h.HoleozDN = s)),
                                    0 == t && ((e = a.engine.getGameAttribute("DNSM")), (s = c.asNumber(a.engine.getGameAttribute("DNSM").h.HoleozDN) * (1 + m._customBlock_Holes2("Fountain_BonTOT", 0, 13) / 100)), (e.h.HoleozDN = s)),
                                    1 == t && ((e = a.engine.getGameAttribute("DNSM")), (s = c.asNumber(a.engine.getGameAttribute("DNSM").h.HoleozDN) * (1 + m._customBlock_Holes2("Fountain_BonTOT", 1, 13) / 100)), (e.h.HoleozDN = s)),
                                    2 == t && ((e = a.engine.getGameAttribute("DNSM")), (s = c.asNumber(a.engine.getGameAttribute("DNSM").h.HoleozDN) * (1 + m._customBlock_Holes2("Fountain_BonTOT", 2, 13) / 100)), (e.h.HoleozDN = s)),
                                    30 > c.asNumber(a.engine.getGameAttribute("CustomLists").h.HolesInfo[37][Math.round(10 * t + i)])
                                        ? c.asNumber(a.engine.getGameAttribute("Holes")[15][Math.round(10 * t + i)]) *
                                          c.asNumber(a.engine.getGameAttribute("CustomLists").h.HolesInfo[37][Math.round(10 * t + i)]) *
                                          Math.max(1, c.asNumber(a.engine.getGameAttribute("DNSM").h.HoleozDN))
                                        : 0.1 *
                                          Math.ceil(
                                              (c.asNumber(a.engine.getGameAttribute("Holes")[15][Math.round(10 * t + i)]) / (250 + c.asNumber(a.engine.getGameAttribute("Holes")[15][Math.round(10 * t + i)]))) *
                                                  10 *
                                                  c.asNumber(a.engine.getGameAttribute("CustomLists").h.HolesInfo[37][Math.round(10 * t + i)]) *
                                                  Math.max(1, c.asNumber(a.engine.getGameAttribute("DNSM").h.HoleozDN))
                                          )
                                );
                            if ("MonumentHRbonusPCT" == e)
                                return (
                                    m._customBlock_Holes("MonumentROGbonuses", 0, 8) +
                                    (m._customBlock_Holes("MonumentROGbonuses", 1, 8) +
                                        m._customBlock_Holes("MonumentROGbonuses", 2, 8) +
                                        (m._customBlock_Summoning("WinBonus", 25, 0) +
                                            (m._customBlock_Holes("JarCollectibleBonus", 19, 0) / 1 +
                                                (m._customBlock_Holes("B_UPG", 81, 20) +
                                                    (m._customBlock_Holes("MeasurementBonusTOTAL", 11, 0) + (p._customBlock_ArcadeBonus(42) + (10 * p._customBlock_AchieveStatus(311) + m._customBlock_Windwalker("CompassBonus", 55, 0))))))))
                                );
                            if ("MonumentHRbonusMULTI" == e) return 1 + m._customBlock_Minehead("BonusQTY", 19, 0) / 100;
                            if ("Bravery_MinDMG" == e)
                                return (
                                    3 +
                                    Math.floor(c.asNumber(a.engine.getGameAttribute("Holes")[14][0]) / 6) * m._customBlock_Holes("B_UPG", 24, 1) +
                                    (m._customBlock_Holes("StudyBolaiaBonuses", 3, 0) / 100) * m._customBlock_Holes("Bravery_MaxDMG", 0, 0)
                                );
                            if ("Bravery_MaxDMG" == e)
                                return (
                                    (25 + 10 * Math.floor(c.asNumber(a.engine.getGameAttribute("Holes")[14][0]) / 6) * m._customBlock_Holes("B_UPG", 24, 1)) *
                                    (1 + m._customBlock_Holes("MeasurementBonusTOTAL", 1, 0) / 100) *
                                    (1 + (m._customBlock_Holes("B_UPG", 40, 10) * c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[25].behaviors.getBehavior("ActorEvents_670"), Ha)._GenINFO[89])) / 100) *
                                    (1 + (10 * c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[25].behaviors.getBehavior("ActorEvents_670"), Ha)._GenINFO[127])) / 100)
                                );
                            if ("Bravery_SwordsOwned" == e)
                                return Math.round(
                                    Math.min(
                                        9,
                                        3 +
                                            (2 * m._customBlock_Holes("MonumentHRbonuses", 0, 1) +
                                                (m._customBlock_Holes("MonumentHRbonuses", 0, 3) + (m._customBlock_Holes("MonumentHRbonuses", 0, 5) + m._customBlock_Holes("MonumentHRbonuses", 0, 7))))
                                    )
                                );
                            if ("MaxRerolls" == e) return Math.round(5 * m._customBlock_Holes("MonumentHRbonuses", 0, 2) + 10 * m._customBlock_Holes("MonumentHRbonuses", 0, 6));
                            if ("MaxRevisions" == e) return m._customBlock_Holes("MonumentHRbonuses", 0, 4);
                            if ("Bravery_MonsterHP" == e)
                                return (
                                    (10 + 15 * c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[25].behaviors.getBehavior("ActorEvents_670"), Ha)._GenINFO[76])) *
                                    Math.pow(1.3, c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[25].behaviors.getBehavior("ActorEvents_670"), Ha)._GenINFO[76]))
                                );
                            if ("Bravery_OpalRewardChanceDEC" == e) return Math.min(0.5, Math.pow(0.5, c.asNumber(a.engine.getGameAttribute("Holes")[7][3])) * (1 + m._customBlock_Holes("MonumentROGbonuses", 0, 5) / 100));
                            if ("Bravery_BlueChestChanceDEC" == e) return 0.001 * (1 + m._customBlock_SushiStuff("RoG_BonusQTY", 52, 0) / 100);
                            if ("AllMonuments_BonusLVs" == e) return Math.max(1, 1 + m._customBlock_Companions(135) / 100);
                            if ("BellTypesOwned" == e) return 3;
                            if ("BellUpgAfford" == e)
                                return (
                                    0 == t
                                        ? ((e = a.engine.getGameAttribute("DNSM")), (s = a.engine.getGameAttribute("Money")), (e.h.HoleozDN = s))
                                        : 1 == t
                                          ? ((e = a.engine.getGameAttribute("DNSM")), (s = a.engine.getGameAttribute("Holes")[9][3]), (e.h.HoleozDN = s))
                                          : 2 == t
                                            ? ((e = a.engine.getGameAttribute("DNSM")), (s = a.engine.getGameAttribute("Gaming")[0]), (e.h.HoleozDN = s))
                                            : 3 == t
                                              ? ((e = a.engine.getGameAttribute("DNSM")), (s = a.engine.getGameAttribute("Holes")[9][14]), (e.h.HoleozDN = s))
                                              : 4 == t
                                                ? ((e = a.engine.getGameAttribute("DNSM")), (s = a.engine.getGameAttribute("Divinity")[39]), (e.h.HoleozDN = s))
                                                : 5 == t && ((e = a.engine.getGameAttribute("DNSM")), (s = a.engine.getGameAttribute("Holes")[9][25]), (e.h.HoleozDN = s)),
                                    c.asNumber(a.engine.getGameAttribute("DNSM").h.HoleozDN) >= m._customBlock_Holes("BellCosts", t, 0) ? 1 : 0
                                );
                            if ("BellCosts" == e)
                                return 0 == t
                                    ? c.asNumber(a.engine.getGameAttribute("CustomLists").h.HolesInfo[42][0 | t]) * Math.pow(1.25, c.asNumber(a.engine.getGameAttribute("Holes")[16][0 | t]))
                                    : 2 == t
                                      ? c.asNumber(a.engine.getGameAttribute("CustomLists").h.HolesInfo[42][0 | t]) * Math.pow(1.5, c.asNumber(a.engine.getGameAttribute("Holes")[16][0 | t]))
                                      : c.asNumber(a.engine.getGameAttribute("CustomLists").h.HolesInfo[42][0 | t]) * Math.pow(1.1, c.asNumber(a.engine.getGameAttribute("Holes")[16][0 | t]));
                            if ("BellBonuss" == e) return c.asNumber(a.engine.getGameAttribute("Holes")[17][0 | t]) * c.asNumber(a.engine.getGameAttribute("CustomLists").h.HolesInfo[59][Math.round(2 * t + 1)]);
                            if ("RingExtraLVdec" == e) return 0.8 < m._customBlock_Holes("B_UPG", 60, 1) * c.randomFloat() ? 2 : (m._customBlock_Holes("B_UPG", 42, 30) + m._customBlock_Holes("B_UPG", 60, 30)) / 100;
                            if ("BellMethodsOwned" == e) return Math.min(6, c.asNumber(a.engine.getGameAttribute("Holes")[18][5]) + 1);
                            if ("BellMethodsNewODDS" == e)
                                return Math.min(
                                    (0.6 / Math.max(1, 0.8 * c.asNumber(a.engine.getGameAttribute("Holes")[18][5]) + 1)) * (1 + (m._customBlock_Holes("B_UPG", 43, 25) * c.asNumber(a.engine.getGameAttribute("Holes")[11][31])) / 100),
                                    0.9
                                );
                            if ("BellMethodsQTY" == e)
                                return 2 * c.asNumber(a.engine.getGameAttribute("Holes")[16][0 | t]) * Math.max(1, m._customBlock_Holes("B_UPG", 45, 0) * c.asNumber(a.engine.getGameAttribute("CustomLists").h.HolesInfo[61][0 | t]));
                            if ("BellExpPerHR" == e)
                                return 0 == t
                                    ? 10 *
                                          (1 + m._customBlock_Holes("MonumentROGbonuses", 0, 7) / 100) *
                                          (1 + m._customBlock_Holes("MeasurementBonusTOTAL", 2, 0) / 100) *
                                          (1 +
                                              (m._customBlock_Holes("BellMethodsQTY", 0, 0) + (m._customBlock_Holes("BellMethodsQTY", 2, 0) + (m._customBlock_Holes("BellMethodsQTY", 4, 0) + m._customBlock_Holes("BellMethodsQTY", 5, 0)))) /
                                                  100) *
                                          (1 + m._customBlock_Holes("JarCollectibleBonus", 11, 0) / 100) *
                                          (1 + m._customBlock_Holes("JarCollectibleBonus", 36, 0) / 100)
                                    : 1 == t
                                      ? 10 * (1 + m._customBlock_Holes("MonumentROGbonuses", 0, 7) / 100) * (1 + m._customBlock_Holes("MeasurementBonusTOTAL", 2, 0) / 100) * (1 + m._customBlock_Holes("BellMethodsQTY", 3, 0) / 100)
                                      : 2 == t
                                        ? 10 * (1 + m._customBlock_Holes("BellMethodsQTY", 1, 0) / 100)
                                        : 10;
                            if ("BellEXPreq" == e)
                                return 0 == t
                                    ? (5 + 3 * c.asNumber(a.engine.getGameAttribute("Holes")[18][1])) * Math.pow(1.05, c.asNumber(a.engine.getGameAttribute("Holes")[18][1]))
                                    : 1 == t
                                      ? (10 + (10 * c.asNumber(a.engine.getGameAttribute("Holes")[18][3]) + Math.pow(c.asNumber(a.engine.getGameAttribute("Holes")[18][3]), 2.5))) *
                                        Math.pow(1.75, c.asNumber(a.engine.getGameAttribute("Holes")[18][3]))
                                      : 2 == t
                                        ? 100 * Math.pow(3, c.asNumber(a.engine.getGameAttribute("Holes")[18][5]))
                                        : 25;
                            if ("StringSlots" == e)
                                return Math.min(
                                    15,
                                    Math.round(
                                        1 +
                                            m._customBlock_Holes("CosmoBonusQTY", 0, 1) +
                                            (m._customBlock_Holes("B_UPG", 32, 1) +
                                                (m._customBlock_Holes("B_UPG", 33, 1) + (m._customBlock_Holes("B_UPG", 34, 1) + (m._customBlock_Holes("B_UPG", 35, 1) + m._customBlock_Holes("B_UPG", 36, 1)))))
                                    )
                                );
                            if ("StringTypesOwned" == e)
                                return Math.round(
                                    Math.min(
                                        7,
                                        Math.min(1, c.asNumber(a.engine.getGameAttribute("Holes")[19][0])) +
                                            (Math.min(1, c.asNumber(a.engine.getGameAttribute("Holes")[19][2])) +
                                                (Math.min(1, c.asNumber(a.engine.getGameAttribute("Holes")[19][4])) +
                                                    (Math.min(1, c.asNumber(a.engine.getGameAttribute("Holes")[19][6])) +
                                                        (Math.min(1, c.asNumber(a.engine.getGameAttribute("Holes")[19][8])) +
                                                            (Math.min(1, c.asNumber(a.engine.getGameAttribute("Holes")[19][10])) + Math.min(1, c.asNumber(a.engine.getGameAttribute("Holes")[19][12])))))))
                                    )
                                );
                            if ("StringXpos" == e)
                                return 8 > m._customBlock_Holes("StringSlots", 0, 0)
                                    ? Math.round(496 - 26 * (m._customBlock_Holes("StringSlots", 0, 0) - 1) + 52 * t)
                                    : 12 > m._customBlock_Holes("StringSlots", 0, 0)
                                      ? Math.round(496 - 22 * (m._customBlock_Holes("StringSlots", 0, 0) - 1) + 44 * t)
                                      : Math.round(496 - 18 * (m._customBlock_Holes("StringSlots", 0, 0) - 1) + 36 * t);
                            if ("HarpStringExpREQ" == e) return (4 + c.asNumber(a.engine.getGameAttribute("Holes")[19][Math.round(2 * t)])) * Math.pow(1.15, c.asNumber(a.engine.getGameAttribute("Holes")[19][Math.round(2 * t)]));
                            if ("CanWeAfford_Harp" == e)
                                return 9 > c.asNumber(a.engine.getGameAttribute("Holes")[11][20]) &&
                                    c.asNumber(a.engine.getGameAttribute("Holes")[9][Math.round(10 + c.asNumber(a.engine.getGameAttribute("Holes")[11][20]))]) >= m._customBlock_Holes("HarpNewNote_Cost", 0, 0)
                                    ? 1
                                    : 0;
                            if ("HarpNewNote_Cost" == e) return 150 * Math.pow(1 + c.asNumber(a.engine.getGameAttribute("Holes")[11][20]), 1.5) * Math.pow(4.5, c.asNumber(a.engine.getGameAttribute("Holes")[11][20]));
                            if ("HarpStringAllBonus" == e)
                                return (
                                    1 +
                                    (m._customBlock_Holes("B_UPG", 39, 15) +
                                        (m._customBlock_Holes("B_UPG", 37, 20) * c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[25].behaviors.getBehavior("ActorEvents_670"), Ha)._GenINFO[128]) +
                                            m._customBlock_Holes("B_UPG", 38, 30) * c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[25].behaviors.getBehavior("ActorEvents_670"), Ha)._GenINFO[129]))) /
                                        100
                                );
                            if ("HarpNoteProduced" == e)
                                return (
                                    ((c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[25].behaviors.getBehavior("ActorEvents_670"), Ha)._GenINFO[112]) / 100) *
                                        m._customBlock_Holes("HarpStringAllBonus", 0, 0) *
                                        Math.max(1, m._customBlock_Holes("B_UPG", 41, 1) * Math.pow(1.1, c.asNumber(a.engine.getGameAttribute("Holes")[11][3]))) *
                                        (1 + (m._customBlock_Holes("HarpStringLVbonus", 0, 0) + (m._customBlock_Holes("HarpStringLVbonus", 3, 0) + m._customBlock_Holes("HarpStringLVbonus", 5, 0))) / 100) *
                                        (1 + m._customBlock_Holes("HarpStringLVbonus", 1, 0) / 100) *
                                        (1 + m._customBlock_Holes("LampBonuses", 99, 0) / 100) *
                                        (1 + m._customBlock_Holes("GambitBonuses", 3, 0) / 100) *
                                        (1 + m._customBlock_Holes("MonumentROGbonuses", 1, 1) / 100) *
                                        (1 + m._customBlock_Holes("MeasurementBonusTOTAL", 3, 0) / 100) *
                                        (1 + m._customBlock_Holes("MeasurementBonusTOTAL", 8, 0) / 100) *
                                        (1 + m._customBlock_Holes("BellBonuss", 2, 0) / 100) *
                                        (1 + c.asNumber(a.engine.getGameAttribute("GemItemsPurchased")[2]) / 2) *
                                        (1 + m._customBlock_Holes("JarCollectibleBonus", 20, 0) / 100) *
                                        (1 + k._customBlock_StampBonusOfTypeX("CavernRes") / 100) *
                                        (1 + m._customBlock_Holes2("Cglunko_upgBon", 14, 0) / 100)) /
                                    Math.pow(4, t)
                                );
                            if ("HarpOpalOdds" == e)
                                return Math.min(
                                    1,
                                    m._customBlock_Holes("HarpStringAllBonus", 0, 0) *
                                        (1 -
                                            Math.pow(
                                                1 - Math.pow(0.2, c.asNumber(a.engine.getGameAttribute("Holes")[7][5]) + 1),
                                                Math.max(1, c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[25].behaviors.getBehavior("ActorEvents_670"), Ha)._GenINFO[112]) / 100)
                                            ))
                                );
                            if ("HarpStringLVbonus" == e) return c.asNumber(a.engine.getGameAttribute("CustomLists").h.HolesInfo[47][0 | t]) * c.asNumber(a.engine.getGameAttribute("Holes")[19][Math.round(2 * t)]);
                            if ("HarpEXPgain" == e)
                                return 0.01 > c.randomFloat() && 1 == m._customBlock_Holes("StudyBolaiaBonuses", 5, 99)
                                    ? (1 + m._customBlock_Holes("StudyBolaiaBonuses", 5, 0)) *
                                          (1 + m._customBlock_Holes("StudyBolaiaBonuses", 5, 99)) *
                                          (c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[25].behaviors.getBehavior("ActorEvents_670"), Ha)._GenINFO[112]) / 100) *
                                          m._customBlock_Holes("HarpStringAllBonus", 0, 0) *
                                          (1 + m._customBlock_Holes("HarpStringLVbonus", 4, 0) / 100) *
                                          (1 + m._customBlock_Holes("MeasurementBonusTOTAL", 6, 0) / 100) *
                                          (1 + c.asNumber(a.engine.getGameAttribute("GemItemsPurchased")[2]) / 2) *
                                          (1 + m._customBlock_Holes2("Fountain_BonTOT", 1, 15) / 100)
                                    : (1 + m._customBlock_Holes("StudyBolaiaBonuses", 5, 99)) *
                                          (c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[25].behaviors.getBehavior("ActorEvents_670"), Ha)._GenINFO[112]) / 100) *
                                          m._customBlock_Holes("HarpStringAllBonus", 0, 0) *
                                          (1 + m._customBlock_Holes("HarpStringLVbonus", 4, 0) / 100) *
                                          (1 + m._customBlock_Holes("MeasurementBonusTOTAL", 6, 0) / 100) *
                                          (1 + c.asNumber(a.engine.getGameAttribute("GemItemsPurchased")[2]) / 2) *
                                          (1 + m._customBlock_Holes2("Fountain_BonTOT", 1, 15) / 100);
                            if ("HarpPOWperHR" == e) return 200 * (1 + m._customBlock_Holes("HarpStringLVbonus", 2, 0) / 100);
                            if ("LampWishCost" == e)
                                return 0 == t
                                    ? 11 > c.asNumber(a.engine.getGameAttribute("Holes")[21][0 | t])
                                        ? Math.floor(1 + (2 * c.asNumber(a.engine.getGameAttribute("Holes")[21][0 | t]) + Math.pow(c.asNumber(a.engine.getGameAttribute("Holes")[21][0 | t]), 2)))
                                        : 999999
                                    : 2 == t
                                      ? Math.floor(1 + (2 * c.asNumber(a.engine.getGameAttribute("Holes")[21][0 | t]) + Math.pow(c.asNumber(a.engine.getGameAttribute("Holes")[21][0 | t]), 1.7)))
                                      : Math.floor(
                                            c.asNumber(a.engine.getGameAttribute("Holes")[21][0 | t]) * c.asNumber(a.engine.getGameAttribute("CustomLists").h.LampWishes[0 | t][2]) +
                                                c.asNumber(a.engine.getGameAttribute("CustomLists").h.LampWishes[0 | t][1])
                                        );
                            if ("LampWishPerDay" == e)
                                return 6 > m._customBlock_Holes("CavernsOwned", 0, 0)
                                    ? 0
                                    : 1 +
                                          (m._customBlock_Holes("MeasurementBonusTOTAL", 4, 0) +
                                              (m._customBlock_Holes("CosmoBonusQTY", 0, 2) +
                                                  (m._customBlock_Holes("BellBonuss", 3, 0) + (m._customBlock_Holes("MonumentROGbonuses", 1, 7) + 100 * m._customBlock_Holes("StudyBolaiaBonuses", 6, 0))))) /
                                              100;
                            if ("LampBonuses" == e)
                                return 99 == t
                                    ? 25 * c.asNumber(a.engine.getGameAttribute("Holes")[21][7]) * (1 + m._customBlock_Thingies("ZenithMarketBonus", 2, 0) / 100)
                                    : ((a.engine.getGameAttribute("DNSM").h.HoleozDT = "25,10,8;15,40,10;20,35,12;5,1,1;2,2,2"),
                                      c.asNumber(("" + ("" + h.string(a.engine.getGameAttribute("DNSM").h.HoleozDT)).split(";")[0 | t]).split(",")[0 | i]) *
                                          c.asNumber(a.engine.getGameAttribute("Holes")[21][0 | Math.min(11, Math.round(4 + 2 * t))]) *
                                          (1 + m._customBlock_Thingies("ZenithMarketBonus", 2, 0) / 100));
                            if ("CanFightMatriarch" == e) return 0 >= m._customBlock_Holes("MushKillsLeft", 0, 0) ? 1 : 0;
                            if ("MonarchHP" == e) return 1e11 * Math.pow(7.5, c.asNumber(a.engine.getGameAttribute("Holes")[11][26]));
                            if ("MushKillsLeft" == e) return Math.max(0, 5e3 * Math.pow(3.4, c.asNumber(a.engine.getGameAttribute("Holes")[11][26])) - c.asNumber(a.engine.getGameAttribute("Holes")[11][27]));
                            if ("J_StartCoins" == e)
                                return Math.round(
                                    (5 + k._customBlock_Log2(c.asNumber(a.engine.getGameAttribute("Holes")[14][2])) * m._customBlock_Holes("B_UPG", 61, 1)) *
                                        (0.5 * m._customBlock_Holes("MonumentHRbonuses", 1, 3) + 1.5 * m._customBlock_Holes("MonumentHRbonuses", 1, 6) + 1)
                                );
                            if ("J_Happiness" == e) return Math.round(3 + 7 * m._customBlock_Holes("MonumentHRbonuses", 1, 5));
                            if ("J_Dismissals" == e) return Math.round(m._customBlock_Holes("MonumentHRbonuses", 1, 2) + (m._customBlock_Holes("MonumentHRbonuses", 1, 4) + 2 * m._customBlock_Holes("MonumentHRbonuses", 1, 7)));
                            if ("J_StartHealth" == e) return Math.round(1 + (m._customBlock_Holes("MonumentHRbonuses", 1, 1) + (m._customBlock_Holes("MonumentHRbonuses", 1, 4) + 2 * m._customBlock_Holes("MonumentHRbonuses", 1, 7))));
                            if ("Justice_OpalRewardChanceDEC" == e)
                                return Math.min(
                                    0.5,
                                    Math.pow(0.5, c.asNumber(a.engine.getGameAttribute("Holes")[7][9])) * (1 + m._customBlock_Holes("MonumentROGbonuses", 1, 5) / 100) * (1 + m._customBlock_Holes("StudyBolaiaBonuses", 9, 0) / 100)
                                );
                            if ("Justice_BlueChestChanceDEC" == e) return 0.001 * (1 + m._customBlock_SushiStuff("RoG_BonusQTY", 52, 0) / 100);
                            if ("JarAesthetic" == e)
                                return Math.round(
                                    Math.min(
                                        m._customBlock_Holes("B_UPG", 62, 1) +
                                            (m._customBlock_Holes("B_UPG", 63, 1) +
                                                (m._customBlock_Holes("B_UPG", 64, 1) +
                                                    (m._customBlock_Holes("B_UPG", 65, 1) + (m._customBlock_Holes("B_UPG", 66, 1) + (m._customBlock_Holes("B_UPG", 67, 1) + m._customBlock_Holes("B_UPG", 68, 1)))))),
                                        7
                                    )
                                );
                            if ("JarPosition" == e) {
                                if (0 == t) {
                                    for (
                                        e = a.engine.getGameAttribute("DNSM"), s = c.randomInt(90, 810), e.h.HoleozDN = s;
                                        492 < c.asNumber(a.engine.getGameAttribute("DNSM").h.HoleozDN) && 607 > c.asNumber(a.engine.getGameAttribute("DNSM").h.HoleozDN);
                                    )
                                        ((e = a.engine.getGameAttribute("DNSM")), (s = c.randomInt(90, 810)), (e.h.HoleozDN = s));
                                    return a.engine.getGameAttribute("DNSM").h.HoleozDN;
                                }
                                return 1 == t ? (366 < i && 537 > i ? c.randomInt(323, 330) : c.randomInt(312, 330)) : 2 == t ? 484 : 0;
                            }
                            if ("JarExtraUI" == e) return 1 == t ? (2 <= c.asNumber(a.engine.getGameAttribute("Holes")[11][37]) ? 1 : 0) : 2 == t && 1 <= m._customBlock_Holes("B_UPG", 75, 1) ? 1 : 0;
                            if ("JarProductionSlots" == e) return 1 == m._customBlock_Holes("B_UPG", 66, 1) ? 3 : 1 == m._customBlock_Holes("B_UPG", 63, 1) ? 2 : 1;
                            if ("JarTypesOwned" == e) return Math.round(c.asNumber(a.engine.getGameAttribute("Holes")[11][37]));
                            if ("JarProductionREQ" == e)
                                return (
                                    (1e3 + 2e3 * t) /
                                    ((1 + m._customBlock_Holes("B_UPG", 67, 30) / 100) *
                                        (1 + (m._customBlock_Holes("B_UPG", 74, 5) * k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("Holes")[11][Math.round(Math.max(0, t - 1) + 40)]))) / 100))
                                );
                            if ("JarBreakAllUnlocked" == e) return 0;
                            if ("CanWeAfford_Jar" == e)
                                return 9 > c.asNumber(a.engine.getGameAttribute("Holes")[11][37]) &&
                                    c.asNumber(a.engine.getGameAttribute("Holes")[9][Math.round(20 + c.asNumber(a.engine.getGameAttribute("Holes")[11][37]))]) >= m._customBlock_Holes("JarNewJar_Cost", 0, 0)
                                    ? 1
                                    : 0;
                            if ("JarNewJar_Cost" == e) return 50 * Math.pow(1 + c.asNumber(a.engine.getGameAttribute("Holes")[11][37]), 1.5) * Math.pow(4.8, c.asNumber(a.engine.getGameAttribute("Holes")[11][37]));
                            if ("JarOpalChance" == e)
                                return (
                                    0.25 *
                                    Math.pow(0.43, c.asNumber(a.engine.getGameAttribute("Holes")[7][10])) *
                                    (1 + m._customBlock_Holes("JarCollectibleBonus", 2, 0) / 100) *
                                    (1 + m._customBlock_Holes("JarCollectibleBonus", 14, 0) / 100) *
                                    (1 + m._customBlock_Holes("JarCollectibleBonus", 27, 0) / 100)
                                );
                            if ("JarNewCollectibleChance" == e) {
                                for (a.engine.getGameAttribute("DNSM").h.HoleozDN = 0, t = a.engine.getGameAttribute("DNSM").h.HoleozDN3 = 0; 10 > t;)
                                    ((s = t++),
                                        1 == m._customBlock_Holes("B_UPG", 76, 1) &&
                                            ((e = a.engine.getGameAttribute("DNSM")),
                                            (s = c.asNumber(a.engine.getGameAttribute("DNSM").h.HoleozDN3) + Math.ceil(k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("Holes")[9][Math.round(20 + s)])))),
                                            (e.h.HoleozDN3 = s)));
                                for (
                                    e = a.engine.getGameAttribute("DNSM"),
                                        s =
                                            (1 + m._customBlock_Holes("JarCollectibleBonus", 7, 0) / 100) *
                                            Math.max(1, Math.pow(1.02, c.asNumber(a.engine.getGameAttribute("DNSM").h.HoleozDN3))) *
                                            (1 + m._customBlock_Holes("JarCollectibleBonus", 25, 0) / 100) *
                                            (1 + m._customBlock_GamingStatType("PaletteBonus", 2, 0) / 100) *
                                            (1 + m._customBlock_FarmingStuffs("ExoticBonusQTY", 52, 0) / 100) *
                                            Math.max(1, Math.pow(1.05, a.engine.getGameAttribute("Spelunk")[6].length) * m._customBlock_GamingStatType("SuperBitType", 32, 0)),
                                        e.h.HoleozDN2 = s,
                                        t = 0;
                                    40 > t;
                                )
                                    ((s = t++),
                                        1 <= c.asNumber(a.engine.getGameAttribute("Holes")[24][s]) && ((e = a.engine.getGameAttribute("DNSM")), (s = c.asNumber(a.engine.getGameAttribute("DNSM").h.HoleozDN) + 1), (e.h.HoleozDN = s)));
                                return 0 == a.engine.getGameAttribute("DNSM").h.HoleozDN
                                    ? 0.25
                                    : 16 > c.asNumber(a.engine.getGameAttribute("DNSM").h.HoleozDN)
                                      ? (0.2 * c.asNumber(a.engine.getGameAttribute("DNSM").h.HoleozDN2)) / (1 + Math.pow(c.asNumber(a.engine.getGameAttribute("DNSM").h.HoleozDN), 1.9))
                                      : (0.2 * c.asNumber(a.engine.getGameAttribute("DNSM").h.HoleozDN2)) /
                                        ((1 + Math.pow(c.asNumber(a.engine.getGameAttribute("DNSM").h.HoleozDN), 1.9)) * Math.pow(1.5, Math.max(0, c.asNumber(a.engine.getGameAttribute("DNSM").h.HoleozDN) - 16)));
                            }
                            if ("JarEnchantChance" == e) {
                                for (t = a.engine.getGameAttribute("DNSM").h.HoleozDN = 0; 40 > t;)
                                    ((s = t++),
                                        2 <= c.asNumber(a.engine.getGameAttribute("Holes")[24][s]) &&
                                            ((e = a.engine.getGameAttribute("DNSM")), (s = c.asNumber(a.engine.getGameAttribute("DNSM").h.HoleozDN) + (c.asNumber(a.engine.getGameAttribute("Holes")[24][s]) - 1)), (e.h.HoleozDN = s)));
                                return (
                                    (0.35 / (1 + (Math.pow(c.asNumber(a.engine.getGameAttribute("DNSM").h.HoleozDN), 1.23) + Math.pow(1.1, c.asNumber(a.engine.getGameAttribute("DNSM").h.HoleozDN))))) *
                                    (1 + m._customBlock_Holes("JarCollectibleBonus", 9, 0) / 100) *
                                    Math.max(1, m._customBlock_Holes("B_UPG", 73, 1) * Math.pow(1.1, k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("Holes")[11][39])))) *
                                    (1 + m._customBlock_Holes("JarCollectibleBonus", 18, 0) / 100) *
                                    (1 + m._customBlock_Holes("StudyBolaiaBonuses", 10, 0) / 100) *
                                    (1 + m._customBlock_Holes("JarCollectibleBonus", 26, 0) / 100) *
                                    (1 + m._customBlock_Holes("JarCollectibleBonus", 34, 0) / 100) *
                                    (1 + m._customBlock_Holes2("Fountain_BonTOT", 2, 15) / 100)
                                );
                            }
                            return "JarProductionPerHR" == e
                                ? 36e3 *
                                      (1 +
                                          (m._customBlock_Holes("JarCollectibleBonus", 1, 0) +
                                              (m._customBlock_Holes("JarCollectibleBonus", 15, 0) + (m._customBlock_Holes("JarCollectibleBonus", 24, 0) + m._customBlock_Holes("MeasurementBonusTOTAL", 12, 0)))) /
                                              100) *
                                      (1 + (m._customBlock_Holes("B_UPG", 72, 10) * k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("Holes")[11][38]))) / 100)
                                : "JarRupieValue" == e
                                  ? (1 + (m._customBlock_Holes("B_UPG", 62, 1) + (m._customBlock_Holes("B_UPG", 65, 2) + m._customBlock_Holes("B_UPG", 68, 4)))) *
                                    Math.max(1, Math.pow(1.5, c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[355]))) *
                                    (1 + m._customBlock_Holes("LampBonuses", 99, 0) / 400) *
                                    (1 + m._customBlock_Holes("MonumentROGbonuses", 2, 1) / 100) *
                                    (1 + (m._customBlock_Holes("MeasurementBonusTOTAL", 10, 0) + m._customBlock_Holes("MeasurementBonusTOTAL", 14, 0)) / 100) *
                                    Math.max(1, m._customBlock_Holes("B_UPG", 80, 1) * Math.pow(1.1, c.asNumber(a.engine.getGameAttribute("Holes")[11][5]))) *
                                    (1 + c.asNumber(a.engine.getGameAttribute("Holes")[11][60]) / 100) *
                                    (1 + m._customBlock_Holes("JarCollectibleBonus", 3, 0) / 100) *
                                    (1 + m._customBlock_Holes("JarCollectibleBonus", 17, 0) / 100) *
                                    (1 + m._customBlock_Holes("JarCollectibleBonus", 28, 0) / 100) *
                                    (1 +
                                        (m._customBlock_Holes("JarCollectibleBonus", 0, 0) +
                                            (m._customBlock_Holes("JarCollectibleBonus", 6, 0) +
                                                (m._customBlock_Holes("JarCollectibleBonus", 13, 0) + (m._customBlock_Holes("JarCollectibleBonus", 21, 0) + m._customBlock_Holes("JarCollectibleBonus", 33, 0))))) /
                                            100) *
                                    (1 + k._customBlock_StampBonusOfTypeX("CavernRes") / 100) *
                                    (1 + m._customBlock_Holes2("Cglunko_upgBon", 14, 0) / 100)
                                  : "JarRupieExtraChance" == e
                                    ? (m._customBlock_Holes("BellBonuss", 4, 0) + (m._customBlock_Holes("CosmoBonusQTY", 0, 3) + m._customBlock_Holes("B_UPG", 64, 50))) / 100
                                    : m._customBlock_Holes2(e, t, i);
                        }
