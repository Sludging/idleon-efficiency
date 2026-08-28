/**
 * Game formula snippet — idleon-efficiency formula research.
 * Function: _customBlock_Dreamstuff (from scripts.ActorEvents_579)
 * Game version: 1.20 ("Royal_Guardian")
 * Captured: 2026-08-28 via game-debug-tool (findFunction + toString)
 * Case reference: #366
 */
function (e, t) {
                            if ("CloudX" == e) return 152 * t + 13 * Math.floor(t / 2) + 43;
                            if ("AllShimmerBonuses" == e) return Math.max(1, Math.min(4, 1 + (100 * m._customBlock_Sailing("ArtifactBonus", 31, 0)) / 100));
                            if ("CloudBonus" == e) return -1 == a.engine.getGameAttribute("WeeklyBoss").h["d_" + t] ? 1 : 0;
                            if ("CloudY" == e) return 14 + 105 * (t - 2 * Math.floor(t / 2));
                            if ("UpgUnlocked" == e)
                                return Math.round(
                                    1 +
                                        (m._customBlock_Dreamstuff("CloudBonus", 0) +
                                            (m._customBlock_Dreamstuff("CloudBonus", 2) +
                                                (m._customBlock_Dreamstuff("CloudBonus", 5) +
                                                    (m._customBlock_Dreamstuff("CloudBonus", 7) +
                                                        (m._customBlock_Dreamstuff("CloudBonus", 10) +
                                                            (m._customBlock_Dreamstuff("CloudBonus", 13) +
                                                                (m._customBlock_Dreamstuff("CloudBonus", 17) +
                                                                    (m._customBlock_Dreamstuff("CloudBonus", 20) +
                                                                        (m._customBlock_Dreamstuff("CloudBonus", 23) +
                                                                            (m._customBlock_Dreamstuff("CloudBonus", 28) + (m._customBlock_Dreamstuff("CloudBonus", 31) + m._customBlock_Dreamstuff("CloudBonus", 36))))))))))))
                                );
                            if ("CloudsOwned" == e) return Math.round(Math.min(5, c.asNumber(a.engine.getGameAttribute("Dream")[2])));
                            if ("UpgMaxLV" == e)
                                return 3 == t
                                    ? Math.round(c.asNumber(a.engine.getGameAttribute("CustomLists").h.DreamUpg[0 | t][2]) + (3 * m._customBlock_Dreamstuff("CloudBonus", 6) + 4 * m._customBlock_Dreamstuff("CloudBonus", 15)))
                                    : 4 == t
                                      ? Math.round(
                                            c.asNumber(a.engine.getGameAttribute("CustomLists").h.DreamUpg[0 | t][2]) +
                                                (m._customBlock_Summoning("WinBonus", 24, 0) +
                                                    10 * m._customBlock_GamingStatType("SuperBitType", 35, 0) +
                                                    (5 * m._customBlock_Dreamstuff("CloudBonus", 12) +
                                                        (10 * m._customBlock_Dreamstuff("CloudBonus", 18) + (10 * m._customBlock_Dreamstuff("CloudBonus", 34) + 10 * m._customBlock_Dreamstuff("CloudBonus", 39)))))
                                        )
                                      : 5 == t
                                        ? Math.round(
                                              c.asNumber(a.engine.getGameAttribute("CustomLists").h.DreamUpg[0 | t][2]) +
                                                  (m._customBlock_Summoning("WinBonus", 24, 0) + 10 * m._customBlock_GamingStatType("SuperBitType", 35, 0) + 6 * m._customBlock_Dreamstuff("CloudBonus", 32))
                                          )
                                        : 8 == t
                                          ? Math.round(
                                                c.asNumber(a.engine.getGameAttribute("CustomLists").h.DreamUpg[0 | t][2]) +
                                                    (m._customBlock_Summoning("WinBonus", 24, 0) +
                                                        10 * m._customBlock_GamingStatType("SuperBitType", 35, 0) +
                                                        (5 * m._customBlock_Dreamstuff("CloudBonus", 21) + 10 * m._customBlock_Dreamstuff("CloudBonus", 26)))
                                            )
                                          : 9 == t
                                            ? Math.round(
                                                  c.asNumber(a.engine.getGameAttribute("CustomLists").h.DreamUpg[0 | t][2]) +
                                                      (m._customBlock_Summoning("WinBonus", 24, 0) + 10 * m._customBlock_GamingStatType("SuperBitType", 35, 0) + 4 * m._customBlock_Dreamstuff("CloudBonus", 25))
                                              )
                                            : 10 == t
                                              ? Math.round(
                                                    c.asNumber(a.engine.getGameAttribute("CustomLists").h.DreamUpg[0 | t][2]) +
                                                        (m._customBlock_Summoning("WinBonus", 24, 0) + 10 * m._customBlock_GamingStatType("SuperBitType", 35, 0) + 4 * m._customBlock_Dreamstuff("CloudBonus", 30))
                                                )
                                              : 11 == t
                                                ? Math.round(
                                                      c.asNumber(a.engine.getGameAttribute("CustomLists").h.DreamUpg[0 | t][2]) +
                                                          (m._customBlock_Summoning("WinBonus", 24, 0) + 10 * m._customBlock_GamingStatType("SuperBitType", 35, 0) + 15 * m._customBlock_Dreamstuff("CloudBonus", 35))
                                                  )
                                                : 7 == t
                                                  ? Math.round(
                                                        c.asNumber(a.engine.getGameAttribute("CustomLists").h.DreamUpg[0 | t][2]) + (m._customBlock_Summoning("WinBonus", 24, 0) + 10 * m._customBlock_GamingStatType("SuperBitType", 35, 0))
                                                    )
                                                  : 12 == t
                                                    ? Math.round(
                                                          c.asNumber(a.engine.getGameAttribute("CustomLists").h.DreamUpg[0 | t][2]) +
                                                              (m._customBlock_Summoning("WinBonus", 24, 0) +
                                                                  (5 * m._customBlock_Dreamstuff("CloudBonus", 37) +
                                                                      (5 * m._customBlock_Dreamstuff("CloudBonus", 42) +
                                                                          (5 * m._customBlock_Dreamstuff("CloudBonus", 43) +
                                                                              (5 * m._customBlock_Dreamstuff("CloudBonus", 47) +
                                                                                  (5 * m._customBlock_Dreamstuff("CloudBonus", 50) +
                                                                                      (5 * m._customBlock_Dreamstuff("CloudBonus", 55) +
                                                                                          (6 * m._customBlock_Dreamstuff("CloudBonus", 58) +
                                                                                              (6 * m._customBlock_Dreamstuff("CloudBonus", 61) +
                                                                                                  (7 * m._customBlock_Dreamstuff("CloudBonus", 64) + 8 * m._customBlock_Dreamstuff("CloudBonus", 75)))))))))))
                                                      )
                                                    : Math.round(c.asNumber(a.engine.getGameAttribute("CustomLists").h.DreamUpg[0 | t][2]));
                            if ("CloudsTask" == e) {
                                var i = a.engine.getGameAttribute("DNSM"),
                                    n = [];
                                for (i.h.DreamDL = n, e = 0, i = a.engine.getGameAttribute("CustomLists").h.DreamChallenge.length; e < i;)
                                    ((n = e++), -1 != c.asNumber(a.engine.getGameAttribute("WeeklyBoss").h["d_" + n]) && a.engine.getGameAttribute("DNSM").h.DreamDL.push(n));
                                return t < a.engine.getGameAttribute("DNSM").h.DreamDL.length && (36 > c.asNumber(a.engine.getGameAttribute("DNSM").h.DreamDL[0 | t]) || 1 <= m._customBlock_ResearchStuff("Grid_Bonus", 86, 1))
                                    ? Math.round(c.asNumber(a.engine.getGameAttribute("DNSM").h.DreamDL[0 | t]))
                                    : -1;
                            }
                            if ("BarFillReq" == e) {
                                for (e = a.engine.getGameAttribute("DNSM").h.DreamDN1 = 0; 14 > e;)
                                    ((n = e++),
                                        (i = a.engine.getGameAttribute("DNSM")),
                                        (n = c.asNumber(a.engine.getGameAttribute("DNSM").h.DreamDN1) + c.asNumber(a.engine.getGameAttribute("Dream")[Math.round(2 + n)])),
                                        (i.h.DreamDN1 = n));
                                return (120 + 40 * c.asNumber(a.engine.getGameAttribute("DNSM").h.DreamDN1)) * Math.pow(1.02, c.asNumber(a.engine.getGameAttribute("DNSM").h.DreamDN1));
                            }
                            return "BarFillRate" == e
                                ? 60 *
                                      (1 + Math.max(0, Math.min(0.5, 0.5 * c.asNumber(a.engine.getGameAttribute("BundlesReceived").h.bun_q)))) *
                                      (1 + m._customBlock_Summoning("VotingBonusz", 32, 0) / 100) *
                                      (1 + m._customBlock_ResearchStuff("Grid_Bonus", 86, 0) / 100) *
                                      (1 + m._customBlock_Thingies("LoreEpiBon", 8, 0) / 100) *
                                      (1 + m._customBlock_Companions(15)) *
                                      (1 + m._customBlock_Holes("CosmoBonusQTY", 2, 5) / 100) *
                                      (1 + 0.5 * m._customBlock_Summoning("EventShopOwned", 3, 0)) *
                                      (1 + c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[320]) / 10) *
                                      (1 + m._customBlock_ArcaneType("ArcaneUpgBonus", 37, 0) / 100) *
                                      (1 + m._customBlock_RoyalG("ArmoryUpgBonus", 76, 0) / 100) *
                                      (1 + (3 * m._customBlock_Dreamstuff("CloudBonus", 45)) / 100) *
                                      (1 + (5 * m._customBlock_Dreamstuff("CloudBonus", 49)) / 100) *
                                      (1 + (6 * m._customBlock_Dreamstuff("CloudBonus", 52)) / 100) *
                                      (1 + (7 * m._customBlock_Dreamstuff("CloudBonus", 59)) / 100) *
                                      (1 + (7 * m._customBlock_Dreamstuff("CloudBonus", 67)) / 100) *
                                      (1 +
                                          (c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchVials.h.EqBar) +
                                              (10 * m._customBlock_Dreamstuff("CloudBonus", 3) +
                                                  (15 * m._customBlock_Dreamstuff("CloudBonus", 9) +
                                                      (20 * m._customBlock_Dreamstuff("CloudBonus", 14) +
                                                          (25 * m._customBlock_Dreamstuff("CloudBonus", 19) +
                                                              (30 * m._customBlock_Dreamstuff("CloudBonus", 22) +
                                                                  (35 * m._customBlock_Dreamstuff("CloudBonus", 24) +
                                                                      (40 * m._customBlock_Dreamstuff("CloudBonus", 29) +
                                                                          (p._customBlock_ArcadeBonus(41) +
                                                                              (m._customBlock_Thingies("EmperorBon", 5, 0) +
                                                                                  (60 * m._customBlock_Dreamstuff("CloudBonus", 38) +
                                                                                      (65 * m._customBlock_Dreamstuff("CloudBonus", 40) +
                                                                                          (75 * m._customBlock_Dreamstuff("CloudBonus", 44) +
                                                                                              (90 * m._customBlock_Dreamstuff("CloudBonus", 46) +
                                                                                                  (100 * m._customBlock_Dreamstuff("CloudBonus", 48) +
                                                                                                      (120 * m._customBlock_Dreamstuff("CloudBonus", 51) +
                                                                                                          (150 * m._customBlock_Dreamstuff("CloudBonus", 54) +
                                                                                                              (160 * m._customBlock_Dreamstuff("CloudBonus", 56) +
                                                                                                                  (170 * m._customBlock_Dreamstuff("CloudBonus", 57) +
                                                                                                                      (185 * m._customBlock_Dreamstuff("CloudBonus", 60) +
                                                                                                                          (190 * m._customBlock_Dreamstuff("CloudBonus", 62) +
                                                                                                                              (195 * m._customBlock_Dreamstuff("CloudBonus", 63) +
                                                                                                                                  (200 * m._customBlock_Dreamstuff("CloudBonus", 65) +
                                                                                                                                      (220 * m._customBlock_Dreamstuff("CloudBonus", 68) +
                                                                                                                                          250 * m._customBlock_Dreamstuff("CloudBonus", 74))))))))))))))))))))))))) /
                                              100)
                                : "IsBarFULL" == e
                                  ? c.asNumber(a.engine.getGameAttribute("Dream")[0]) >= m._customBlock_Dreamstuff("BarFillReq", 0)
                                      ? 1
                                      : 0
                                  : (0 == e.indexOf("CloudProgressTOTAL,") &&
                                        ((i = a.engine.getGameAttribute("WeeklyBoss")),
                                        (n = "d_" + y.replace(e, "CloudProgressTOTAL,", "")),
                                        -1 != c.asNumber(i.h[n]) &&
                                            ((i = a.engine.getGameAttribute("WeeklyBoss")),
                                            (n = "d_" + y.replace(e, "CloudProgressTOTAL,", "")),
                                            t > c.asNumber(i.h[n]) && ((i = a.engine.getGameAttribute("WeeklyBoss")), (n = "d_" + y.replace(e, "CloudProgressTOTAL,", "")), (i.h[n] = Math.floor(t))))),
                                    0);
                        }
