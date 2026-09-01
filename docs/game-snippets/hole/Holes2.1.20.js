/**
 * Game formula snippet — idleon-efficiency formula research.
 * Function: _customBlock_Holes2 (from scripts.ActorEvents_579)
 * Game version: 1.20 ("Royal_Guardian")
 * Captured: 2026-08-27 via game-debug-tool (findFunction + toString)
 * Case reference: #364
 */
function (e, t, i) {
                            if ("JarRupieTypeGiven" == e)
                                return 0 == t
                                    ? 1e3 <= c.asNumber(a.engine.getGameAttribute("Holes")[9][21])
                                        ? c.randomInt(0, 2)
                                        : 100 <= c.asNumber(a.engine.getGameAttribute("Holes")[9][20])
                                          ? c.randomInt(0, 1)
                                          : 0
                                    : 3 == t
                                      ? 5e5 <= c.asNumber(a.engine.getGameAttribute("Holes")[9][24])
                                          ? c.randomInt(3, 5)
                                          : 1e4 <= c.asNumber(a.engine.getGameAttribute("Holes")[9][23])
                                            ? c.randomInt(3, 4)
                                            : 3
                                      : 5 == t
                                        ? 10
                                        : 6 == t
                                          ? 5e7 <= c.asNumber(a.engine.getGameAttribute("Holes")[9][27])
                                              ? c.randomInt(6, 8)
                                              : 6e6 <= c.asNumber(a.engine.getGameAttribute("Holes")[9][26])
                                                ? c.randomInt(6, 7)
                                                : 6
                                          : 8 == t
                                            ? 11
                                            : 9;
                            if ("CanWeBreakAll" == e) return 1 == m._customBlock_Holes("B_UPG", 69, 1) ? 1 : 0;
                            if ("JarCollectibleBonus" == e)
                                return (
                                    c.asNumber(a.engine.getGameAttribute("Holes")[24][0 | t]) *
                                    c.asNumber(("" + h.string(a.engine.getGameAttribute("CustomLists").h.HolesInfo[67][0 | t])).split("|")[1]) *
                                    (1 + m._customBlock_Thingies("LegendPTS_bonus", 29, 0) / 100)
                                );
                            if ("W_attempts" == e)
                                return 1 == n.__cast(a.engine.getGameAttribute("PixelHelperActor")[25].behaviors.getBehavior("ActorEvents_670"), Ha)._GenINFO[210]
                                    ? 30
                                    : Math.round(
                                          5 +
                                              m._customBlock_Holes("StudyBolaiaBonuses", 12, 0) +
                                              (4 * m._customBlock_Holes("MonumentHRbonuses", 2, 4) + Math.floor(2 * k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("Holes")[14][4]))))
                                      );
                            if ("W_attemptsGainPerRound" == e)
                                return 1 == n.__cast(a.engine.getGameAttribute("PixelHelperActor")[25].behaviors.getBehavior("ActorEvents_670"), Ha)._GenINFO[210]
                                    ? 0
                                    : Math.round(2 * m._customBlock_Holes("MonumentHRbonuses", 2, 1) + m._customBlock_Holes("MonumentHRbonuses", 2, 6));
                            if ("W_timePerMatch" == e) return 1 == n.__cast(a.engine.getGameAttribute("PixelHelperActor")[25].behaviors.getBehavior("ActorEvents_670"), Ha)._GenINFO[210] ? 1e3 : 12.6;
                            if ("W_instamatches" == e)
                                return 1 == n.__cast(a.engine.getGameAttribute("PixelHelperActor")[25].behaviors.getBehavior("ActorEvents_670"), Ha)._GenINFO[210]
                                    ? 0
                                    : Math.round(4 * m._customBlock_Holes("MonumentHRbonuses", 2, 3) + 5 * m._customBlock_Holes("MonumentHRbonuses", 2, 7));
                            if ("Wisdom_OpalRewardChanceDEC" == e) return Math.min(0.5, Math.pow(0.5, c.asNumber(a.engine.getGameAttribute("Holes")[7][12])) * (1 + m._customBlock_Holes("MonumentROGbonuses", 2, 5) / 100));
                            if ("GambitPTSmulti" == e)
                                return (
                                    1 +
                                    (m._customBlock_Holes("MeasurementBonusTOTAL", 13, 0) +
                                        m._customBlock_Holes("StudyBolaiaBonuses", 13, 0) +
                                        (m._customBlock_Holes("B_UPG", 78, 10) +
                                            (m._customBlock_Holes("MonumentROGbonuses", 2, 7) +
                                                (m._customBlock_Holes("JarCollectibleBonus", 23, 0) + (m._customBlock_Holes("JarCollectibleBonus", 30, 0) + m._customBlock_ArcaneType("ArcaneUpgBonus", 47, 0)))))) /
                                        100
                                );
                            if ("GambitChallengeUnlocked" == e) return 0 == t || 1 == m._customBlock_Holes("B_UPG", Math.round(88 + t), 1) ? 1 : 0;
                            if ("GambitPts" == e)
                                return 99 == t
                                    ? m._customBlock_Holes("GambitPts", 0, 0) +
                                          (m._customBlock_Holes("GambitPts", 1, 0) +
                                              (m._customBlock_Holes("GambitPts", 2, 0) + (m._customBlock_Holes("GambitPts", 3, 0) + (m._customBlock_Holes("GambitPts", 4, 0) + m._customBlock_Holes("GambitPts", 5, 0)))))
                                    : 777 == t
                                      ? m._customBlock_Holes("GambitPts", 99, 0) * m._customBlock_Holes("GambitPTSmulti", 0, 0)
                                      : 0 == t
                                        ? 100 *
                                          (c.asNumber(a.engine.getGameAttribute("Holes")[11][Math.round(t + 65)]) +
                                              (3 * Math.floor(c.asNumber(a.engine.getGameAttribute("Holes")[11][Math.round(t + 65)]) / 10) + 10 * Math.floor(c.asNumber(a.engine.getGameAttribute("Holes")[11][Math.round(t + 65)]) / 60)))
                                        : 200 *
                                          (c.asNumber(a.engine.getGameAttribute("Holes")[11][Math.round(t + 65)]) +
                                              (3 * Math.floor(c.asNumber(a.engine.getGameAttribute("Holes")[11][Math.round(t + 65)]) / 10) + 10 * Math.floor(c.asNumber(a.engine.getGameAttribute("Holes")[11][Math.round(t + 65)]) / 60)));
                            if ("GambitPtsREQ" == e) return 2e3 + 1e3 * (t + 1) * (1 + t / 5) * Math.pow(1.26, t);
                            if ("GambitBonuses" == e)
                                return -1 != c.getCurrentSceneName().indexOf("Tutorial") || m._customBlock_Holes("GambitPts", 777, 0) < m._customBlock_Holes("GambitPtsREQ", t, 0)
                                    ? 0
                                    : 0 == t
                                      ? Math.max(1, Math.ceil(k._customBlock_Log2(m._customBlock_Holes("GambitPts", 777, 0)) - 8 + (k._customBlock_getLOG(m._customBlock_Holes("GambitPts", 777, 0)) - 1)))
                                      : 1 == c.asNumber(("" + h.string(a.engine.getGameAttribute("CustomLists").h.HolesInfo[71][0 | t])).split("|")[1])
                                        ? c.asNumber(("" + h.string(a.engine.getGameAttribute("CustomLists").h.HolesInfo[71][0 | t])).split("|")[0]) * k._customBlock_getLOG(m._customBlock_Holes("GambitPts", 777, 0))
                                        : c.asNumber(("" + h.string(a.engine.getGameAttribute("CustomLists").h.HolesInfo[71][0 | t])).split("|")[0]);
                            if ("Gambit_SummoningDoublersLeft" == e) {
                                e = a.engine.getGameAttribute("DNSM").h.HoleozDNSumDumb = 0;
                                for (var s = a.engine.getGameAttribute("Holes")[28].length; e < s;) {
                                    var r = e++;
                                    if (-1 != a.engine.getGameAttribute("Holes")[28][r]) {
                                        var _ = a.engine.getGameAttribute("DNSM");
                                        ((r = Math.round(c.asNumber(a.engine.getGameAttribute("DNSM").h.HoleozDNSumDumb) + 1)), (_.h.HoleozDNSumDumb = r));
                                    }
                                }
                                return Math.max(0, Math.round(m._customBlock_Holes("GambitBonuses", 0, 0) + 10 * m._customBlock_Summoning("EventShopOwned", 15, 0) - c.asNumber(a.engine.getGameAttribute("DNSM").h.HoleozDNSumDumb)));
                            }
                            if ("TempleTorchCost" == e)
                                return 0 == t
                                    ? 3 * Math.pow(1.075, c.asNumber(a.engine.getGameAttribute("Holes")[11][57])) + c.asNumber(a.engine.getGameAttribute("Holes")[11][57])
                                    : 1 == t
                                      ? Math.max(5, c.asNumber(a.engine.getGameAttribute("Holes")[11][56]) / 4)
                                      : 10 * Math.pow(1.1, c.asNumber(a.engine.getGameAttribute("Holes")[11][59])) + 2 * c.asNumber(a.engine.getGameAttribute("Holes")[11][59]);
                            if ("CanWeAffordTemple" == e) return c.asNumber(a.engine.getGameAttribute("Holes")[11][56]) >= m._customBlock_Holes("TempleTorchCost", t, 0) ? 1 : 0;
                            if ("TempleTorchBonuses" == e)
                                return 0 == t
                                    ? 1 + (10 * c.asNumber(a.engine.getGameAttribute("Holes")[11][57])) / 100
                                    : 1 == t
                                      ? 0.05 *
                                        m._customBlock_Holes("TempleTorchBonuses", 0, 0) *
                                        Math.pow(0.7, c.asNumber(a.engine.getGameAttribute("Holes")[11][55])) *
                                        k._customBlock_Log2(Math.max(5, c.asNumber(a.engine.getGameAttribute("Holes")[11][56]) / 4))
                                      : 5 * c.asNumber(a.engine.getGameAttribute("Holes")[11][59]);
                            if ("TempleExtraTorches" == e) return m._customBlock_Holes("BellBonuss", 5, 0) + (m._customBlock_Holes("StudyBolaiaBonuses", 14, 0) + m._customBlock_Holes("B_UPG", 77, 25));
                            if ("StudyReqForBolaia" == e) return 4e3 * Math.pow(1.25, c.asNumber(a.engine.getGameAttribute("Holes")[26][0 | t])) * Math.pow(1.5, Math.floor(t / 5));
                            if ("StudyBolaiaBonuses" == e)
                                return -1 != c.getCurrentSceneName().indexOf("Tutorial")
                                    ? 0
                                    : 99 == i
                                      ? 1 <= c.asNumber(a.engine.getGameAttribute("Holes")[26][0 | t])
                                          ? 1
                                          : 0
                                      : 9 == t
                                        ? 1 <= c.asNumber(a.engine.getGameAttribute("Holes")[26][0 | t])
                                            ? 50 + c.asNumber(a.engine.getGameAttribute("Holes")[26][0 | t]) * c.asNumber(a.engine.getGameAttribute("CustomLists").h.HolesInfo[70][0 | t])
                                            : 0
                                        : 3 == t
                                          ? 1 <= c.asNumber(a.engine.getGameAttribute("Holes")[26][0 | t])
                                              ? Math.min(32, 12 + c.asNumber(a.engine.getGameAttribute("Holes")[26][0 | t]) * c.asNumber(a.engine.getGameAttribute("CustomLists").h.HolesInfo[70][0 | t]))
                                              : 0
                                          : c.asNumber(a.engine.getGameAttribute("Holes")[26][0 | t]) * c.asNumber(a.engine.getGameAttribute("CustomLists").h.HolesInfo[70][0 | t]);
                            if ("XtraMushKillz" == e) return 1 + m._customBlock_Holes("StudyBolaiaBonuses", 8, 0) / 100;
                            if ("LeastOpalsInVillager" == e) {
                                for (_ = a.engine.getGameAttribute("DNSM"), r = a.engine.getGameAttribute("Holes")[3][0], _.h.holzLestOpz = r, e = 0, s = a.engine.getGameAttribute("Holes")[1].length; e < s;)
                                    ((r = e++),
                                        1 <= c.asNumber(a.engine.getGameAttribute("Holes")[1][r]) &&
                                            c.asNumber(a.engine.getGameAttribute("Holes")[3][r]) < c.asNumber(a.engine.getGameAttribute("DNSM").h.holzLestOpz) &&
                                            ((_ = a.engine.getGameAttribute("DNSM")), (r = a.engine.getGameAttribute("Holes")[3][r]), (_.h.holzLestOpz = r)));
                                return a.engine.getGameAttribute("DNSM").h.holzLestOpz;
                            }
                            if ("CanWeAfford_Fountain" == e)
                                return c.asNumber(a.engine.getGameAttribute("Holes")[9][Math.round(30 + Math.min(9, Math.floor(c.asNumber(a.engine.getGameAttribute("Holes")[7][15]) / 5)))]) >= m._customBlock_Holes("Fountain_OpalCost", 0, 0)
                                    ? 1
                                    : 0;
                            if ("Fountain_OpalCost" == e) return 100 * Math.pow(1 + c.asNumber(a.engine.getGameAttribute("Holes")[7][15]), 1.5) * Math.pow(4.8, c.asNumber(a.engine.getGameAttribute("Holes")[7][15]));
                            if ("Fountain_UpgUnlocked" == e)
                                return -1 == c.asNumber(a.engine.getGameAttribute("CustomLists").h.HoleFountUPG[0 | t][0 | i][1]) ||
                                    10 <= c.asNumber(a.engine.getGameAttribute("Holes")[31][0 | t][0 | c.asNumber(a.engine.getGameAttribute("CustomLists").h.HoleFountUPG[0 | t][0 | i][1])]) ||
                                    (0 == t && (14 == i || 2 == i) && 1 <= c.asNumber(a.engine.getGameAttribute("Holes")[31][0 | t][0 | c.asNumber(a.engine.getGameAttribute("CustomLists").h.HoleFountUPG[0 | t][0 | i][1])]))
                                    ? 1
                                    : 0;
                            if ("Cost_FountainUPG" == e)
                                return 1 == c.asNumber(a.engine.getGameAttribute("CustomLists").h.HoleFountUPG[0 | t][0 | i][4])
                                    ? (c.asNumber(a.engine.getGameAttribute("Holes")[31][0 | t][0 | i]) + c.asNumber(a.engine.getGameAttribute("CustomLists").h.HoleFountUPG[0 | t][0 | i][4])) *
                                          Math.pow(c.asNumber(a.engine.getGameAttribute("CustomLists").h.HoleFountUPG[0 | t][0 | i][5]), c.asNumber(a.engine.getGameAttribute("Holes")[31][0 | t][0 | i]))
                                    : c.asNumber(a.engine.getGameAttribute("CustomLists").h.HoleFountUPG[0 | t][0 | i][4]) *
                                          Math.pow(c.asNumber(a.engine.getGameAttribute("CustomLists").h.HoleFountUPG[0 | t][0 | i][5]), c.asNumber(a.engine.getGameAttribute("Holes")[31][0 | t][0 | i]));
                            if ("CanWeAfford_FountainUPG" == e)
                                return c.asNumber(a.engine.getGameAttribute("Holes")[9][Math.round(30 + c.asNumber(a.engine.getGameAttribute("CustomLists").h.HoleFountUPG[0 | t][0 | i][3]))]) >=
                                    m._customBlock_Holes2("Cost_FountainUPG", t, i)
                                    ? 1
                                    : 0;
                            if ("FountainBar_REQ" == e) return 0 == t ? 7200 : 1 == t ? 36e3 : 9e4;
                            if ("FountainBar_Speed" == e) return 0 == t ? (1 + m._customBlock_Holes2("Fountain_BonTOT", 0, 9) / 100) * (1 + p._customBlock_ArcadeBonus(68) / 100) : 1;
                            if ("FountainBar_ActiveSpdMulti" == e) return 1 + Math.min(4, 4 * m._customBlock_Holes2("Fountain_BonTOT", 0, 12)) + m._customBlock_Holes2("Fountain_BonTOT", 0, 12) / 100;
                            if ("Fount_CurrencyKEEP" == e) return 0.1 + (m._customBlock_Holes2("Fountain_BonTOT", 0, 8) / (100 + m._customBlock_Holes2("Fountain_BonTOT", 0, 8))) * 0.5;
                            if ("HolezBucketGoldOwned" == e) return Math.round(Math.max(0, Math.min(1, m._customBlock_Holes2("Fountain_BonTOT", 0, 15))) + Math.min(m._customBlock_Holes("B_UPG", 104, 1), 1));
                            if ("HolezBucketGoldMult" == e) return 1 + m._customBlock_Holes2("Fountain_BonTOT", 0, 15) / 100;
                            if ("FountainBar_DoWeHave" == e)
                                return 0 == t
                                    ? 15 <= m._customBlock_Holes("CavernsOwned", 0, 0)
                                        ? 1
                                        : 0
                                    : 1 == t
                                      ? 1 <= m._customBlock_Holes2("Fountain_BonTOT", 1, 10)
                                          ? 1
                                          : 0
                                      : 1 <= m._customBlock_Holes2("Fountain_BonTOT", 2, 12)
                                        ? 1
                                        : 0;
                            if ("Fountain_WatersOwned" == e)
                                return Math.min(
                                    2,
                                    Math.min(1, c.asNumber(a.engine.getGameAttribute("Holes")[31][0][0])) +
                                        (Math.min(1, c.asNumber(a.engine.getGameAttribute("Holes")[31][1][0])) + Math.min(1, c.asNumber(a.engine.getGameAttribute("Holes")[31][2][0])))
                                );
                            if ("Fountain_BonTOT" == e) {
                                if (((_ = a.engine.getGameAttribute("DNSM")), !Object.prototype.hasOwnProperty.call(_.h, "FountBonT") || -1 == t))
                                    for (
                                        r = [],
                                            (_ = a.engine.getGameAttribute("DNSM")).h.FountBonT = r,
                                            a.engine.getGameAttribute("DNSM").h.FountBonT.push([]),
                                            a.engine.getGameAttribute("DNSM").h.FountBonT.push([]),
                                            a.engine.getGameAttribute("DNSM").h.FountBonT.push([]),
                                            a.engine.getGameAttribute("DNSM").h.FountBonT.push([]),
                                            a.engine.getGameAttribute("DNSM").h.FountBonT.push([]),
                                            e = 0;
                                        3 > e;
                                    )
                                        for (r = e++, a.engine.getGameAttribute("DNSM").h.FountBonTdn = r, s = 0; 20 > s;)
                                            ((_ = s++),
                                                a.engine
                                                    .getGameAttribute("DNSM")
                                                    .h.FountBonT[0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.FountBonTdn)].push(
                                                        m._customBlock_Holes2("Fountain_MarbleBon", c.asNumber(a.engine.getGameAttribute("DNSM").h.FountBonTdn), _) *
                                                            c.asNumber(a.engine.getGameAttribute("Holes")[31][0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.FountBonTdn)][_]) *
                                                            c.asNumber(a.engine.getGameAttribute("CustomLists").h.HoleFountUPG[0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.FountBonTdn)][_][6])
                                                    ));
                                return -1 == t ? 0 : Math.round(c.asNumber(a.engine.getGameAttribute("DNSM").h.FountBonT[0 | t][0 | i]));
                            }
                            if ("Fount_SpaceXY" == e)
                                return 0 == i
                                    ? 4 > t
                                        ? 131 + 69 * Math.round(t)
                                        : 8 > t
                                          ? 615 + 69 * Math.round(t - 4)
                                          : 12 > t
                                            ? 95 + 69 * Math.round(t - 8)
                                            : 648 + 69 * Math.round(t - 12)
                                    : 2 == i
                                      ? 484
                                      : 8 > t
                                        ? Math.round(375 + m._customBlock_Holes2("Fount_SpaceXY", 0, 2))
                                        : Math.round(389 + m._customBlock_Holes2("Fount_SpaceXY", 0, 2));
                            if ("SpacesOwned" == e) return Math.min(16, 1 + m._customBlock_Holes2("Fountain_BonTOT", 0, 10));
                            if ("MaxStackSize" == e) return Math.min(50, 3 + m._customBlock_Holes("B_UPG", 97, 3) + (m._customBlock_Holes2("Fountain_BonTOT", 0, 11) + m._customBlock_Holes("CosmoBonusQTY", 0, 4)));
                            if ("MaxCoinz" == e) return Math.round(m._customBlock_Holes2("SpacesOwned", 0, 0) * m._customBlock_Holes2("MaxStackSize", 0, 0));
                            if ("Fount_GenerateCoin" == e) {
                                for (
                                    r = [],
                                        (_ = a.engine.getGameAttribute("DNSM")).h.FountDL1 = r,
                                        a.engine.getGameAttribute("DNSM").h.FountDL1.push(0),
                                        1 <= m._customBlock_Holes2("Fountain_UpgUnlocked", 0, 3) && a.engine.getGameAttribute("DNSM").h.FountDL1.push(1),
                                        1 <= m._customBlock_Holes2("Fountain_UpgUnlocked", 0, 4) && a.engine.getGameAttribute("DNSM").h.FountDL1.push(2),
                                        1 <= m._customBlock_Holes2("Fountain_UpgUnlocked", 1, 2) && a.engine.getGameAttribute("DNSM").h.FountDL1.push(3),
                                        1 <= m._customBlock_Holes2("Fountain_UpgUnlocked", 1, 3) && a.engine.getGameAttribute("DNSM").h.FountDL1.push(4),
                                        1 <= m._customBlock_Holes2("Fountain_UpgUnlocked", 1, 4) && a.engine.getGameAttribute("DNSM").h.FountDL1.push(5),
                                        1 <= m._customBlock_Holes2("Fountain_UpgUnlocked", 2, 2) && a.engine.getGameAttribute("DNSM").h.FountDL1.push(6),
                                        1 <= m._customBlock_Holes2("Fountain_UpgUnlocked", 2, 3) && a.engine.getGameAttribute("DNSM").h.FountDL1.push(7),
                                        1 <= m._customBlock_Holes2("Fountain_UpgUnlocked", 2, 4) && a.engine.getGameAttribute("DNSM").h.FountDL1.push(8),
                                        e = 0;
                                    10 > e;
                                )
                                    ((r = e++),
                                        -1 != ("" + h.string(a.engine.getGameAttribute("Holes")[11][83])).indexOf("" + h.string(a.engine.getGameAttribute("Number2Letter")[r])) && ca.remove(a.engine.getGameAttribute("DNSM").h.FountDL1, r));
                                return (
                                    0 == a.engine.getGameAttribute("DNSM").h.FountDL1.length && a.engine.getGameAttribute("DNSM").h.FountDL1.push(0),
                                    0 < a.engine.getGameAttribute("DNSM").h.FountDL1.length ? a.engine.getGameAttribute("DNSM").h.FountDL1[c.randomInt(0, Math.round(a.engine.getGameAttribute("DNSM").h.FountDL1.length - 1))] : 0
                                );
                            }
                            return "Fount_CurrencyALLmulti" == e
                                ? (1 + m._customBlock_Holes2("Fountain_BonTOT", 0, 0) / 100) *
                                      (1 + m._customBlock_Holes2("Cglunko_upgBon", 14, 0) / 100) *
                                      (1 +
                                          (m._customBlock_Holes2("Fountain_BonTOT", 0, 1) +
                                              (m._customBlock_Holes2("Fountain_BonTOT", 1, 1) + (m._customBlock_Holes2("Fountain_BonTOT", 2, 1) + m._customBlock_Holes2("Fountain_BonTOT", 1, 12)))) /
                                              100) *
                                      Math.max(1, m._customBlock_Holes("B_UPG", 94, 1) * Math.pow(1.1, c.asNumber(a.engine.getGameAttribute("Holes")[11][7]))) *
                                      (1 + m._customBlock_Holes2("Fountain_BonTOT", 1, 0) / 100) *
                                      (1 + m._customBlock_Holes2("Fountain_BonTOT", 2, 0) / 100) *
                                      (1 + (25 * m._customBlock_Holes("CosmoBonusQTY", 0, 4)) / 100) *
                                      (1 + m._customBlock_Holes("LampBonuses", 99, 0) / 400) *
                                      (1 + m._customBlock_Holes("MeasurementBonusTOTAL", 16, 0) / 100) *
                                      (1 + m._customBlock_Holes("BellBonuss", 6, 0) / 100)
                                : "Fount_CurrencyBaseValue" == e
                                  ? 0 == t
                                      ? 1 +
                                        m._customBlock_Holes2("Fountain_BonTOT", 0, 2) *
                                            (1 + m._customBlock_Holes2("Fountain_BonTOT", 0, 2) / 100) *
                                            (1 + (k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("Holes")[9][3])) * m._customBlock_Holes2("Fountain_BonTOT", 0, 19)) / 100)
                                      : 1 == t
                                        ? 1 +
                                          m._customBlock_Holes2("Fountain_BonTOT", 0, 3) *
                                              (1 + m._customBlock_Holes2("Fountain_BonTOT", 0, 5) / 100) *
                                              (1 + (k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("Holes")[9][3])) * m._customBlock_Holes2("Fountain_BonTOT", 0, 19)) / 100)
                                        : 2 == t
                                          ? 1 +
                                            m._customBlock_Holes2("Fountain_BonTOT", 0, 4) *
                                                (1 + m._customBlock_Holes2("Fountain_BonTOT", 0, 6) / 100) *
                                                (1 + (k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("Holes")[9][3])) * m._customBlock_Holes2("Fountain_BonTOT", 0, 19)) / 100)
                                          : 3 == t
                                            ? 1 +
                                              m._customBlock_Holes2("Fountain_BonTOT", 1, 2) *
                                                  (1 + m._customBlock_Holes2("Fountain_BonTOT", 0, 7) / 100) *
                                                  (1 + (k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("Holes")[9][16])) * m._customBlock_Holes2("Fountain_BonTOT", 1, 19)) / 100)
                                            : 4 == t
                                              ? 1 +
                                                m._customBlock_Holes2("Fountain_BonTOT", 1, 3) *
                                                    (1 + m._customBlock_Holes2("Fountain_BonTOT", 1, 5) / 100) *
                                                    (1 + (k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("Holes")[9][16])) * m._customBlock_Holes2("Fountain_BonTOT", 1, 19)) / 100)
                                              : 5 == t
                                                ? 1 +
                                                  m._customBlock_Holes2("Fountain_BonTOT", 1, 4) *
                                                      (1 + m._customBlock_Holes2("Fountain_BonTOT", 1, 6) / 100) *
                                                      (1 + (k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("Holes")[9][16])) * m._customBlock_Holes2("Fountain_BonTOT", 1, 19)) / 100)
                                                : 6 == t
                                                  ? 1 +
                                                    m._customBlock_Holes2("Fountain_BonTOT", 2, 2) *
                                                        (1 + m._customBlock_Holes2("Fountain_BonTOT", 1, 7) / 100) *
                                                        (1 + (k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("Holes")[9][20])) * m._customBlock_Holes2("Fountain_BonTOT", 2, 19)) / 100)
                                                  : 7 == t
                                                    ? 1 +
                                                      m._customBlock_Holes2("Fountain_BonTOT", 2, 3) *
                                                          (1 + m._customBlock_Holes2("Fountain_BonTOT", 2, 5) / 100) *
                                                          (1 + (k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("Holes")[9][20])) * m._customBlock_Holes2("Fountain_BonTOT", 2, 19)) / 100)
                                                    : 8 == t
                                                      ? 1 +
                                                        m._customBlock_Holes2("Fountain_BonTOT", 2, 4) *
                                                            (1 + m._customBlock_Holes2("Fountain_BonTOT", 2, 6) / 100) *
                                                            (1 + (k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("Holes")[9][20])) * m._customBlock_Holes2("Fountain_BonTOT", 2, 19)) / 100)
                                                      : 1 + m._customBlock_Holes2("Fountain_BonTOT", 2, 7) / 100
                                  : "Fount_CurrencyTotValue" == e
                                    ? t == a.engine.getGameAttribute("Holes")[11][82]
                                        ? 6 <= t
                                            ? Math.pow(m._customBlock_Holes2("Fount_DesireMulti", 0, 0) * m._customBlock_Holes2("Fount_CurrencyBaseValue", t, 0) * m._customBlock_Holes2("Fount_CurrencyALLmulti", 0, 0), 0.5) *
                                              m._customBlock_Holes2("Fount_LuckyCoinValue", t, 0) *
                                              m._customBlock_Holes2("Fount_DuckMulti", 0, 0)
                                            : m._customBlock_Holes2("Fount_DesireMulti", 0, 0) *
                                              m._customBlock_Holes2("Fount_CurrencyBaseValue", t, 0) *
                                              m._customBlock_Holes2("Fount_CurrencyALLmulti", 0, 0) *
                                              m._customBlock_Holes2("Fount_LuckyCoinValue", t, 0) *
                                              m._customBlock_Holes2("Fount_DuckMulti", 0, 0)
                                        : 6 <= t
                                          ? Math.pow(m._customBlock_Holes2("Fount_DesireMulti", 0, 0) * m._customBlock_Holes2("Fount_CurrencyBaseValue", t, 0) * m._customBlock_Holes2("Fount_CurrencyALLmulti", 0, 0), 0.5) *
                                            m._customBlock_Holes2("Fount_LuckyCoinValue", t, 0) *
                                            m._customBlock_Holes2("Fount_DuckMulti", 0, 0)
                                          : m._customBlock_Holes2("Fount_CurrencyBaseValue", t, 0) *
                                            m._customBlock_Holes2("Fount_CurrencyALLmulti", 0, 0) *
                                            m._customBlock_Holes2("Fount_LuckyCoinValue", t, 0) *
                                            m._customBlock_Holes2("Fount_DuckMulti", 0, 0)
                                    : "Fount_DesireMulti" == e
                                      ? 1 + m._customBlock_Holes2("Fountain_BonTOT", 1, 11) / 100
                                      : "Fount_LuckyCoinChance" == e
                                        ? 0 == m._customBlock_Holes2("Fountain_BonTOT", 2, 8)
                                            ? 0
                                            : 0.001 * (1 + (m._customBlock_Holes2("Fountain_BonTOT", 2, 8) + m._customBlock_Holes2("Fountain_BonTOT", 2, 10)) / 100) * Math.pow(0.25, c.asNumber(a.engine.getGameAttribute("Holes")[30][0 | t]))
                                        : "Fount_LuckyCoinValue" == e
                                          ? 1 + (c.asNumber(a.engine.getGameAttribute("Holes")[30][0 | t]) * m._customBlock_Holes2("Fount_LuckyCoinValuePER", 0, 0)) / 100
                                          : "Fount_LuckyCoinValuePER" == e
                                            ? 25 + m._customBlock_Holes2("Fountain_BonTOT", 2, 9)
                                            : "Fount_DuckChance" == e
                                              ? 0.3333333333333333 *
                                                (1 + (m._customBlock_Holes2("Fountain_BonTOT", 2, 12) + m._customBlock_Holes2("Fountain_BonTOT", 2, 10)) / 100) *
                                                Math.pow(0.2, c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[601]))
                                              : "Fount_DuckMulti" == e
                                                ? Math.pow(1 + m._customBlock_Holes2("Fountain_BonTOT", 2, 11) / 100, c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[601]))
                                                : "Fount_RoyalChance" == e
                                                  ? 0.0033333333333333335 * (1 + m._customBlock_Holes2("Fountain_BonTOT", 1, 8) / 100)
                                                  : "Fount_RoyalMulti" == e
                                                    ? 5 + m._customBlock_Holes2("Fountain_BonTOT", 1, 9) / 100
                                                    : "Fount_MarblePerFill" == e
                                                      ? 100 *
                                                        (1 + m._customBlock_Holes2("Fountain_BonTOT", 1, 10) / 100) *
                                                        (1 + m._customBlock_Holes("StudyBolaiaBonuses", 15, 0) / 100) *
                                                        (1 + (10 * m._customBlock_Holes("CosmoBonusQTY", 0, 4)) / 100)
                                                      : "Fount_MarbleizeCost" == e
                                                        ? 2 <= t
                                                            ? 25e4 * Math.pow(2 * (5 + c.asNumber(a.engine.getGameAttribute("Holes")[32][0 | t][0 | i])), c.asNumber(a.engine.getGameAttribute("Holes")[32][0 | t][0 | i]))
                                                            : 13 == i
                                                              ? 1500 * Math.pow(10 + 5 * c.asNumber(a.engine.getGameAttribute("Holes")[32][0 | t][0 | i]), c.asNumber(a.engine.getGameAttribute("Holes")[32][0 | t][0 | i]))
                                                              : 500 * Math.pow(5 + c.asNumber(a.engine.getGameAttribute("Holes")[32][0 | t][0 | i]), c.asNumber(a.engine.getGameAttribute("Holes")[32][0 | t][0 | i]))
                                                        : "CanWeBUY_Marbleize" == e
                                                          ? D.contains(a.engine.getGameAttribute("CustomLists").h.HolesInfo[76], t + ("_" + i))
                                                              ? 0
                                                              : 1
                                                          : "CanWeAfford_Marbleize" == e
                                                            ? c.asNumber(a.engine.getGameAttribute("Holes")[11][81]) >= m._customBlock_Holes2("Fount_MarbleizeCost", t, i)
                                                                ? 1
                                                                : 0
                                                            : "Fountain_MarbleBonNEXT" == e
                                                              ? 1.5 + 0.5 * (c.asNumber(a.engine.getGameAttribute("Holes")[32][0 | t][0 | i]) + 1)
                                                              : "Fountain_MarbleBon" == e
                                                                ? 0 == a.engine.getGameAttribute("Holes")[32][0 | t][0 | i]
                                                                    ? 1
                                                                    : 1.5 + 0.5 * c.asNumber(a.engine.getGameAttribute("Holes")[32][0 | t][0 | i])
                                                                : "Cglunko_DR" == e
                                                                  ? (1 + (m._customBlock_Holes2("Cglunko_upgBon", 1, 0) + (m._customBlock_Holes2("Cglunko_upgBon", 17, 0) + m._customBlock_Holes2("Cglunko_upgBon", 21, 0))) / 100) *
                                                                    (1 + m._customBlock_Holes2("Cglunko_upgBon", 3, 0) / 100) *
                                                                    (1 + m._customBlock_Holes2("Cglunko_upgBon", 12, 0) / 100) *
                                                                    (1 + (m._customBlock_Holes2("Cglunko_upgBon", 10, 0) * m._customBlock_Holes2("Cglunko_Bdig", 0, 0)) / 100) *
                                                                    (1 + (m._customBlock_Holes2("Cglunko_upgBon", 22, 0) * m._customBlock_Holes2("Cglunko_Pdig", 0, 0)) / 100) *
                                                                    (1 + (m._customBlock_Holes2("Cglunko_upgBon", 4, 0) * Math.ceil(k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[668])))) / 100) *
                                                                    (1 + (m._customBlock_Holes2("Cglunko_upgBon", 18, 0) * Math.ceil(k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[200])))) / 100)
                                                                  : "Cglunko_Bdig" == e
                                                                    ? Math.ceil(k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[654]))) +
                                                                      (Math.ceil(k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[655]))) +
                                                                          (Math.ceil(k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[656]))) +
                                                                              (Math.ceil(k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[657]))) +
                                                                                  (Math.ceil(k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[658]))) +
                                                                                      Math.ceil(k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[659])))))))
                                                                    : "Cglunko_Pdig" == e
                                                                      ? Math.ceil(k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[660]))) +
                                                                        (Math.ceil(k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[661]))) +
                                                                            (Math.ceil(k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[662]))) +
                                                                                (Math.ceil(k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[663]))) +
                                                                                    (Math.ceil(k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[664]))) +
                                                                                        Math.ceil(k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[665])))))))
                                                                      : "Cglunko_AFKgains" == e
                                                                        ? (10 + (m._customBlock_Holes2("Cglunko_upgBon", 8, 0) + m._customBlock_Holes2("Cglunko_upgBon", 13, 0))) / 100
                                                                        : "Cglunko_MKtier" == e
                                                                          ? m._customBlock_Holes2("Cglunko_upgBon", 6, 0)
                                                                          : "Cglunko_Respawn" == e
                                                                            ? m._customBlock_Holes2("Cglunko_upgBon", 2, 0)
                                                                            : "Cglunko_MKbase" == e
                                                                              ? m._customBlock_Holes2("Cglunko_upgBon", 15, 0)
                                                                              : "Cglunko_DoublePickup" == e
                                                                                ? Math.min((m._customBlock_Holes("B_UPG", 101, 10) + (m._customBlock_Holes("B_UPG", 103, 10) + m._customBlock_Holes("B_UPG", 105, 10))) / 100, 3)
                                                                                : "Cglunko_upgBon" == e
                                                                                  ? c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[Math.round(630 + t)]) *
                                                                                    c.asNumber(a.engine.getGameAttribute("CustomLists").h.RandoListo2[13][0 | t])
                                                                                  : "Cglunko_upgCost" == e
                                                                                    ? ((_ = a.engine.getGameAttribute("DNSM")),
                                                                                      (r =
                                                                                          (Math.pow(
                                                                                              c.asNumber(a.engine.getGameAttribute("CustomLists").h.RandoListo2[14][0 | t]),
                                                                                              c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[Math.round(630 + t)])
                                                                                          ) +
                                                                                              c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[Math.round(630 + t)])) *
                                                                                          (1 / (1 + m._customBlock_Holes2("Cglunko_upgBon", 7, 0) / 100))),
                                                                                      (_.h.Cglunko_upgCost = r),
                                                                                      1 == t % 2 &&
                                                                                          ((_ = a.engine.getGameAttribute("DNSM")), (r = 5 * c.asNumber(a.engine.getGameAttribute("DNSM").h.Cglunko_upgCost)), (_.h.Cglunko_upgCost = r)),
                                                                                      Math.round(c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[604])) < m._customBlock_Holes("StudyBolaiaBonuses", 17, 0) &&
                                                                                          ((_ = a.engine.getGameAttribute("DNSM")), (r = 0.85 * c.asNumber(a.engine.getGameAttribute("DNSM").h.Cglunko_upgCost)), (_.h.Cglunko_upgCost = r)),
                                                                                      1e6 > c.asNumber(a.engine.getGameAttribute("DNSM").h.Cglunko_upgCost)
                                                                                          ? Math.floor(Math.max(1, c.asNumber(a.engine.getGameAttribute("DNSM").h.Cglunko_upgCost)))
                                                                                          : a.engine.getGameAttribute("DNSM").h.Cglunko_upgCost)
                                                                                    : 69;
                        }
