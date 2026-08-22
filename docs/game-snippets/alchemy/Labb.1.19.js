/**
 * Game formula snippet — idleon-efficiency formula research.
 * Function: _customBlock_Labb (from scripts.ActorEvents_345)
 * Game version: 1.19 ("Summer_Event")
 * Captured: 2026-08-21 via game-debug-tool (findFunction + toString)
 * Case reference: #342
 */
function (e, t, i, s) {
                            if ("Dist" == e) {
                                if ("Gem" == t)
                                    return 9 == i || 19 == i
                                        ? 80
                                        : 21 == i || 22 == i || 23 == i
                                          ? 100
                                          : Math.floor(
                                                80 * (1 + (p._customBlock_MainframeBonus(109) + p._customBlock_MainframeBonus(13)) / 100) +
                                                    (c.asNumber(a.engine.getGameAttribute("CustomLists").h.TaskShopDesc[3][4][11]) * c.asNumber(a.engine.getGameAttribute("Tasks")[2][3][4]) +
                                                        (c.asNumber(a.engine.getGameAttribute("Dream")[8]) + m._customBlock_Summoning("WinBonus", 4, 0)))
                                            );
                                if ("Bonus" == t)
                                    return 13 == i || 8 == i
                                        ? 80
                                        : Math.floor(
                                              80 * (1 + (p._customBlock_MainframeBonus(109) + p._customBlock_MainframeBonus(13)) / 100) +
                                                  (c.asNumber(a.engine.getGameAttribute("CustomLists").h.TaskShopDesc[3][4][11]) * c.asNumber(a.engine.getGameAttribute("Tasks")[2][3][4]) +
                                                      (c.asNumber(a.engine.getGameAttribute("Dream")[8]) + m._customBlock_Summoning("WinBonus", 4, 0)))
                                          );
                                if (
                                    (a.engine.getGameAttribute("UserInfo")[0] == a.engine.getGameAttribute("GetPlayersUsernames")[0 | i]
                                        ? ((e = a.engine.getGameAttribute("DNSM")), (t = 50 + 2 * c.asNumber(a.engine.getGameAttribute("Lv0")[12])))
                                        : ((e = a.engine.getGameAttribute("DNSM")),
                                          (s = a.engine.getGameAttribute("PlayerDATABASE")),
                                          (t = "" + h.string(a.engine.getGameAttribute("GetPlayersUsernames")[0 | i])),
                                          (t = 50 + 2 * c.asNumber(s.h[t].h.Lv0[12]))),
                                    (e.h.LabzzDist = t),
                                    1 == a.engine.getGameAttribute("Lab")[14][5] &&
                                        150 >
                                            k._customBlock_DistanceEqn(
                                                p._customBlock_Labb("Player", "X", i, 0),
                                                p._customBlock_Labb("Player", "Y", i, 0),
                                                c.asNumber(a.engine.getGameAttribute("CustomLists").h.JewelDesc[5][0]),
                                                c.asNumber(a.engine.getGameAttribute("CustomLists").h.JewelDesc[5][1])
                                            ) &&
                                        ((e = a.engine.getGameAttribute("DNSM")), (t = 1.25 * c.asNumber(a.engine.getGameAttribute("DNSM").h.LabzzDist)), (e.h.LabzzDist = t)),
                                    a.engine.getGameAttribute("UserInfo")[0] == a.engine.getGameAttribute("GetPlayersUsernames")[0 | i])
                                )
                                    return Math.floor(
                                        (c.asNumber(a.engine.getGameAttribute("DNSM").h.LabzzDist) + (r._customBlock_MealBonus("PxLine") + Math.min(2 * x._customBlock_RunCodeOfTypeXforThingY("CardLv", "Crystal3"), 50))) *
                                            (1 +
                                                (p._customBlock_Labb("BubonicPurple", "0", i, 0) +
                                                    r._customBlock_MealBonus("LinePct") +
                                                    (r._customBlock_chipBonuses("linewidth") +
                                                        (20 * p._customBlock_Breeding("PetArenaBonus", "0", 13, 0) + (p._customBlock_Labb("BonusLineWidth", "0", i, 0) + p._customBlock_Breeding("ShinyBonusS", "Nah", 19, -1))))) /
                                                    100)
                                    );
                                if (D.contains(a.engine.getGameAttribute("Lab")[(1 + i) | 0], 6)) {
                                    for (s = a.engine.getGameAttribute("DNSM").h.LabzzDist2 = 0; 7 > s; )
                                        ((e = s++),
                                            6 == a.engine.getGameAttribute("Lab")[(1 + i) | 0][e] && ((e = a.engine.getGameAttribute("DNSM")), (t = c.asNumber(a.engine.getGameAttribute("DNSM").h.LabzzDist2) + 1), (e.h.LabzzDist2 = t)));
                                    return Math.floor(
                                        (c.asNumber(a.engine.getGameAttribute("DNSM").h.LabzzDist) + (r._customBlock_MealBonus("PxLine") + Math.min(2 * x._customBlock_RunCodeOfTypeXforThingY("CardLv", "Crystal3"), 50))) *
                                            (1 +
                                                (p._customBlock_Labb("BubonicPurple", "0", i, 0) +
                                                    r._customBlock_MealBonus("LinePct") +
                                                    (c.asNumber(a.engine.getGameAttribute("DNSM").h.LabzzDist2) * c.asNumber(a.engine.getGameAttribute("CustomLists").h.ChipDesc[6][11]) +
                                                        (20 * p._customBlock_Breeding("PetArenaBonus", "0", 13, 0) + (p._customBlock_Labb("BonusLineWidth", "0", i, 0) + p._customBlock_Breeding("ShinyBonusS", "Nah", 19, -1))))) /
                                                    100)
                                    );
                                }
                                return Math.floor(
                                    (c.asNumber(a.engine.getGameAttribute("DNSM").h.LabzzDist) + (r._customBlock_MealBonus("PxLine") + Math.min(2 * x._customBlock_RunCodeOfTypeXforThingY("CardLv", "Crystal3"), 50))) *
                                        (1 +
                                            (p._customBlock_Labb("BubonicPurple", "0", i, 0) +
                                                r._customBlock_MealBonus("LinePct") +
                                                (20 * p._customBlock_Breeding("PetArenaBonus", "0", 13, 0) + p._customBlock_Labb("BonusLineWidth", "0", i, 0) + p._customBlock_Breeding("ShinyBonusS", "Nah", 19, -1))) /
                                                100)
                                );
                            }
                            if ("BonusLineWidth" == e)
                                return D.contains(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[22].behaviors.getBehavior("ActorEvents_548"), jb)._GenINFO[114], i)
                                    ? n.__cast(a.engine.getGameAttribute("PixelHelperActor")[22].behaviors.getBehavior("ActorEvents_548"), jb)._GenINFO[114].indexOf(i) < 2 * c.asNumber(a.engine.getGameAttribute("GemItemsPurchased")[123])
                                        ? 30
                                        : 0
                                    : i < 2 * c.asNumber(a.engine.getGameAttribute("GemItemsPurchased")[123]) && 1 == m._customBlock_Divinity("Bonus_MAJOR", i, 2)
                                      ? 30
                                      : 0;
                            if ("VIPmembership" == e)
                                return (
                                    r._customBlock_MealBonus("VIP") +
                                    (25 * p._customBlock_Breeding("PetArenaBonus", "0", 1, 0) + (60 * p._customBlock_Breeding("PetArenaBonus", "0", 10, 0) + p._customBlock_Labb("SigilBonus", "Blank", 15, 0)))
                                );
                            if ("VIPlibbooksowned" == e) {
                                for (s = a.engine.getGameAttribute("DNSM").h.LabzzDist2 = 0, i = 0 | Math.min(7, a.engine.getGameAttribute("CustomLists").h.RANDOlist[57].length); s < i; )
                                    ((e = s++), p._customBlock_Labb("VIPmembership", "0", 0, 0) >= c.asNumber(a.engine.getGameAttribute("CustomLists").h.RANDOlist[57][e]) && (a.engine.getGameAttribute("DNSM").h.LabzzDist2 = e + 1));
                                return a.engine.getGameAttribute("DNSM").h.LabzzDist2;
                            }
                            if ("filler" == e) return 80;
                            if ("BubonicPurple" == e)
                                return c.asNumber(a.engine.getGameAttribute("Lab")[0][(2 * i) | 0]) >=
                                    c.asNumber(a.engine.getGameAttribute("Lab")[0][(2 * c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[22].behaviors.getBehavior("ActorEvents_548"), jb)._GenINFO[121])) | 0])
                                    ? n.__cast(a.engine.getGameAttribute("PixelHelperActor")[22].behaviors.getBehavior("ActorEvents_548"), jb)._GenINFO[119]
                                    : 0;
                            if ("BubonicGreen" == e)
                                return c.asNumber(a.engine.getGameAttribute("Lab")[0][(2 * i) | 0]) <=
                                    c.asNumber(a.engine.getGameAttribute("Lab")[0][(2 * c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[22].behaviors.getBehavior("ActorEvents_548"), jb)._GenINFO[121])) | 0])
                                    ? n.__cast(a.engine.getGameAttribute("PixelHelperActor")[22].behaviors.getBehavior("ActorEvents_548"), jb)._GenINFO[120]
                                    : 0;
                            if ("GeneSpiralQTY" == e) return Math.ceil(Math.pow(i, 0.6) * (1 + k._customBlock_StampBonusOfTypeX("DNAsplice") / 100));
                            if ("Player" == e) return "X" == t ? a.engine.getGameAttribute("Lab")[0][(2 * i) | 0] : "Y" == t ? a.engine.getGameAttribute("Lab")[0][(1 + 2 * i) | 0] : 35;
                            if ("ChipRepoCHIP" == e)
                                return "QTYowned" == t
                                    ? ((e = n.__cast(a.engine.getGameAttribute("PixelHelperActor")[5].behaviors.getBehavior("ActorEvents_232"), Sa)._ItemsAndStorageOWNED),
                                      (t = a.engine.getGameAttribute("CustomLists").h.ChipDesc[0 | i]),
                                      c.asNumber(e.h["" + h.string(t[Math.round(3 + 2 * s)])]))
                                    : "Cost" == t
                                      ? c.asNumber(a.engine.getGameAttribute("CustomLists").h.ChipDesc[0 | i][Math.round(4 + 2 * s)])
                                      : 1;
                            if ("ChipRepoJEWEL" == e)
                                return "QTYowned" == t
                                    ? ((e = n.__cast(a.engine.getGameAttribute("PixelHelperActor")[5].behaviors.getBehavior("ActorEvents_232"), Sa)._ItemsAndStorageOWNED),
                                      (t = a.engine.getGameAttribute("CustomLists").h.JewelDesc[0 | i]),
                                      c.asNumber(e.h["" + h.string(t[Math.round(5 + 2 * s)])]))
                                    : "Cost" == t
                                      ? c.asNumber(a.engine.getGameAttribute("CustomLists").h.JewelDesc[0 | i][Math.round(6 + 2 * s)])
                                      : 1;
                            if ("SigilBonusSpeed" == e)
                                return (
                                    (1 +
                                        (p._customBlock_AchieveStatus(112) +
                                            (p._customBlock_Labb("SigilBonus", "Blank", 12, 0) +
                                                (20 * c.asNumber(a.engine.getGameAttribute("GemItemsPurchased")[110]) +
                                                    (c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchVials.h.SigSpd) + k._customBlock_StampBonusOfTypeX("SigilCharge"))))) /
                                            100) *
                                    (1 + m._customBlock_Summoning("WinBonus", 7, 0) / 100) *
                                    (1 + m._customBlock_SushiStuff("RoG_BonusQTY", 41, 0) / 100) *
                                    (1 + p._customBlock_ArcadeBonus(43) / 100) *
                                    (1 + c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchVials.h["6turtle"]) / 100) *
                                    (1 + m._customBlock_Summoning("VotingBonusz", 17, 0) / 100) *
                                    (1 + m._customBlock_GamingStatType("PaletteBonus", 20, 0) / 100) *
                                    (1 + m._customBlock_Thingies("LegendPTS_bonus", 31, 0) / 100)
                                );
                            if ("TotalPurpleSigils" == e) {
                                if (((e = a.engine.getGameAttribute("DNSM")), !Object.prototype.hasOwnProperty.call(e.h, "SigTotPup")))
                                    for (s = a.engine.getGameAttribute("DNSM").h.SigTotPup = 0; 24 > s; )
                                        ((e = s++),
                                            3 <= c.asNumber(a.engine.getGameAttribute("CauldronP2W")[4][1 + 2 * e]) &&
                                                ((e = a.engine.getGameAttribute("DNSM")), (t = Math.round(c.asNumber(a.engine.getGameAttribute("DNSM").h.SigTotPup) + 1)), (e.h.SigTotPup = t)));
                                return Math.round(c.asNumber(a.engine.getGameAttribute("DNSM").h.SigTotPup));
                            }
                            if ("TotalGreenSigils" == e) {
                                if (((e = a.engine.getGameAttribute("DNSM")), !Object.prototype.hasOwnProperty.call(e.h, "SigTotPup2")))
                                    for (s = a.engine.getGameAttribute("DNSM").h.SigTotPup2 = 0; 24 > s; )
                                        ((e = s++),
                                            4 <= c.asNumber(a.engine.getGameAttribute("CauldronP2W")[4][1 + 2 * e]) &&
                                                ((e = a.engine.getGameAttribute("DNSM")), (t = Math.round(c.asNumber(a.engine.getGameAttribute("DNSM").h.SigTotPup2) + 1)), (e.h.SigTotPup2 = t)));
                                return Math.round(c.asNumber(a.engine.getGameAttribute("DNSM").h.SigTotPup2));
                            }
                            return "SigilBonus" == e
                                ? -1 == c.getCurrentSceneName().indexOf("Tutorial")
                                    ? -0.1 > c.asNumber(a.engine.getGameAttribute("CauldronP2W")[4][(1 + 2 * i) | 0])
                                        ? 0
                                        : 0.5 > c.asNumber(a.engine.getGameAttribute("CauldronP2W")[4][(1 + 2 * i) | 0])
                                          ? c.asNumber(a.engine.getGameAttribute("CustomLists").h.SigilDesc[0 | i][3]) * (1 + m._customBlock_Sailing("ArtifactBonus", 16, 0)) * (1 + m._customBlock_Summoning2("MeritocBonusz", 21, 0) / 100)
                                          : 1.5 > c.asNumber(a.engine.getGameAttribute("CauldronP2W")[4][(1 + 2 * i) | 0])
                                            ? c.asNumber(a.engine.getGameAttribute("CustomLists").h.SigilDesc[0 | i][4]) * (1 + m._customBlock_Sailing("ArtifactBonus", 16, 0)) * (1 + m._customBlock_Summoning2("MeritocBonusz", 21, 0) / 100)
                                            : 2.5 > c.asNumber(a.engine.getGameAttribute("CauldronP2W")[4][(1 + 2 * i) | 0])
                                              ? c.asNumber(a.engine.getGameAttribute("CustomLists").h.SigilDesc[0 | i][8]) *
                                                (1 + m._customBlock_Sailing("ArtifactBonus", 16, 0)) *
                                                (1 + m._customBlock_Summoning2("MeritocBonusz", 21, 0) / 100)
                                              : 3.5 > c.asNumber(a.engine.getGameAttribute("CauldronP2W")[4][(1 + 2 * i) | 0])
                                                ? c.asNumber(a.engine.getGameAttribute("CustomLists").h.SigilDesc[0 | i][10]) *
                                                  (1 + m._customBlock_Sailing("ArtifactBonus", 16, 0)) *
                                                  (1 + m._customBlock_Summoning2("MeritocBonusz", 21, 0) / 100)
                                                : c.asNumber(a.engine.getGameAttribute("CustomLists").h.SigilDesc[0 | i][12]) *
                                                  (1 + m._customBlock_Sailing("ArtifactBonus", 16, 0)) *
                                                  (1 + m._customBlock_Summoning2("MeritocBonusz", 21, 0) / 100)
                                    : 0
                                : 50;
                        }
