/**
 * Game formula snippet — idleon-efficiency formula research.
 * Function: _customBlock_CauldronStats (from scripts.ActorEvents_189)
 * Game version: 1.19 ("Summer_Event")
 * Captured: 2026-08-21 via game-debug-tool (findFunction + toString)
 * Case reference: #356
 */
function (e, t, i, s) {
                            if ("BubbleBonus" == e)
                                return (
                                    (e = a.engine.getGameAttribute("DNSM")),
                                    (s = a.engine.getGameAttribute("CustomLists").h.AlchemyDescription[0 | t][0 | i]),
                                    (e.h.CauldStatDL1 = s),
                                    1 == r._customBlock_CauldronStats("isBubbleSuperr", t, i, 0)
                                        ? Math.max(1, m._customBlock_ArcaneType("PrismaBonusMult", 0, 0)) *
                                          x._customBlock_ArbitraryCode5Inputs(
                                              "" + h.string(a.engine.getGameAttribute("DNSM").h.CauldStatDL1[3]),
                                              c.asNumber(a.engine.getGameAttribute("DNSM").h.CauldStatDL1[1]),
                                              c.asNumber(a.engine.getGameAttribute("DNSM").h.CauldStatDL1[2]),
                                              c.asNumber(a.engine.getGameAttribute("CauldronInfo")[0 | t][0 | i]),
                                              0,
                                              0
                                          )
                                        : x._customBlock_ArbitraryCode5Inputs(
                                              "" + h.string(a.engine.getGameAttribute("DNSM").h.CauldStatDL1[3]),
                                              c.asNumber(a.engine.getGameAttribute("DNSM").h.CauldStatDL1[1]),
                                              c.asNumber(a.engine.getGameAttribute("DNSM").h.CauldStatDL1[2]),
                                              c.asNumber(a.engine.getGameAttribute("CauldronInfo")[0 | t][0 | i]),
                                              0,
                                              0
                                          )
                                );
                            if ("isBubbleSuperr" == e) return -1 != ("" + h.string(a.engine.getGameAttribute("OptionsListAccount")[384])).indexOf(h.string(a.engine.getGameAttribute("Number2Letter")[0 | t]) + (Math.round(i) + ",")) ? 1 : 0;
                            if ("VialBonus" == e)
                                return (
                                    (e = a.engine.getGameAttribute("DNSM")),
                                    (s = a.engine.getGameAttribute("CustomLists").h.AlchemyDescription[0 | t][0 | i]),
                                    (e.h.CauldStatDL1 = s),
                                    34 < c.asNumber(a.engine.getGameAttribute("Rift")[0])
                                        ? ((e = a.engine.getGameAttribute("DNSM")),
                                          (s = 2 * c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[8].behaviors.getBehavior("ActorEvents_481"), qa)._GenINFO[108])),
                                          (e.h.CauldStatDNzz = s))
                                        : (a.engine.getGameAttribute("DNSM").h.CauldStatDNzz = 0),
                                    (e = a.engine.getGameAttribute("DNSM")),
                                    (s = c.asNumber(a.engine.getGameAttribute("DNSM").h.CauldStatDNzz) + m._customBlock_Summoning("VaultUpgBonus", 42, 0)),
                                    (e.h.CauldStatDNzz = s),
                                    2 == p._customBlock_MainframeBonus(10)
                                        ? 2 *
                                          (1 + c.asNumber(a.engine.getGameAttribute("DNSM").h.CauldStatDNzz) / 100) *
                                          (1 + m._customBlock_Summoning2("MeritocBonusz", 20, 0) / 100) *
                                          x._customBlock_ArbitraryCode5Inputs(
                                              "" + h.string(a.engine.getGameAttribute("DNSM").h.CauldStatDL1[3]),
                                              c.asNumber(a.engine.getGameAttribute("DNSM").h.CauldStatDL1[1]),
                                              c.asNumber(a.engine.getGameAttribute("DNSM").h.CauldStatDL1[2]),
                                              c.asNumber(a.engine.getGameAttribute("CauldronInfo")[0 | t][0 | i]),
                                              0,
                                              0
                                          )
                                        : (1 + c.asNumber(a.engine.getGameAttribute("DNSM").h.CauldStatDNzz) / 100) *
                                          (1 + m._customBlock_Summoning2("MeritocBonusz", 20, 0) / 100) *
                                          x._customBlock_ArbitraryCode5Inputs(
                                              "" + h.string(a.engine.getGameAttribute("DNSM").h.CauldStatDL1[3]),
                                              c.asNumber(a.engine.getGameAttribute("DNSM").h.CauldStatDL1[1]),
                                              c.asNumber(a.engine.getGameAttribute("DNSM").h.CauldStatDL1[2]),
                                              c.asNumber(a.engine.getGameAttribute("CauldronInfo")[0 | t][0 | i]),
                                              0,
                                              0
                                          )
                                );
                            if ("CauldronCosts" == e)
                                return 1 == n.__cast(a.engine.getGameAttribute("PixelHelperActor")[5].behaviors.getBehavior("ActorEvents_232"), Sa)._GenINFO[17]
                                    ? Math.round(
                                          c.asNumber(a.engine.getGameAttribute("CustomLists").h.AlchemyDescription[0 | t][0 | i][(11 + s) | 0]) *
                                              Math.pow(c.asNumber(a.engine.getGameAttribute("CustomLists").h.AlchemyDescription[0 | t][0 | i][4]), c.asNumber(a.engine.getGameAttribute("CauldronInfo")[10][0 | c.asNumber(i)]))
                                      )
                                    : "Liquid" ==
                                        ("" + h.string(a.engine.getGameAttribute("CustomLists").h.AlchemyDescription[0 | t][0 | i][(5 + s) | 0])).substring(
                                            0,
                                            Math.round(("" + h.string(a.engine.getGameAttribute("CustomLists").h.AlchemyDescription[0 | t][0 | i][(5 + s) | 0])).length - 1)
                                        )
                                      ? c.asNumber(a.engine.getGameAttribute("CustomLists").h.AlchemyDescription[0 | t][0 | i][(11 + s) | 0]) + Math.floor(c.asNumber(a.engine.getGameAttribute("CauldronInfo")[0 | t][0 | i]) / 20)
                                      : "Bits" == a.engine.getGameAttribute("CustomLists").h.AlchemyDescription[0 | t][0 | i][(5 + s) | 0]
                                        ? c.asNumber(a.engine.getGameAttribute("CustomLists").h.AlchemyDescription[0 | t][0 | i][(11 + s) | 0]) *
                                          Math.pow(2, c.asNumber(a.engine.getGameAttribute("CauldronInfo")[0 | t][0 | i])) *
                                          Math.max(0.1, Math.pow(0.75, c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[62]))) *
                                          Math.max(0.9, 1 - 0.1 * p._customBlock_AchieveStatus(108))
                                        : (14 < i
                                              ? ((e = a.engine.getGameAttribute("DNSM")),
                                                (s =
                                                    c.asNumber(a.engine.getGameAttribute("CustomLists").h.AlchemyDescription[0 | t][0 | i][(11 + s) | 0]) *
                                                    Math.pow(
                                                        1.37 - (0.28 * c.asNumber(a.engine.getGameAttribute("CauldronInfo")[0 | t][0 | i])) / (60 + c.asNumber(a.engine.getGameAttribute("CauldronInfo")[0 | t][0 | i])),
                                                        c.asNumber(a.engine.getGameAttribute("CauldronInfo")[0 | t][0 | i])
                                                    )))
                                              : ((e = a.engine.getGameAttribute("DNSM")),
                                                (s =
                                                    c.asNumber(a.engine.getGameAttribute("CustomLists").h.AlchemyDescription[0 | t][0 | i][(11 + s) | 0]) *
                                                    Math.pow(
                                                        1.35 - (0.3 * c.asNumber(a.engine.getGameAttribute("CauldronInfo")[0 | t][0 | i])) / (50 + c.asNumber(a.engine.getGameAttribute("CauldronInfo")[0 | t][0 | i])),
                                                        c.asNumber(a.engine.getGameAttribute("CauldronInfo")[0 | t][0 | i])
                                                    ))),
                                          (e.h.CauldStatDN1 = s),
                                          0 == t
                                              ? ((e = a.engine.getGameAttribute("DNSM")),
                                                (s = c.asNumber(a.engine.getGameAttribute("DNSM").h.CauldStatDN1) * Math.max(0.05, 1 - c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.BubbleCostOr) / 100)))
                                              : 1 == t
                                                ? ((e = a.engine.getGameAttribute("DNSM")),
                                                  (s = c.asNumber(a.engine.getGameAttribute("DNSM").h.CauldStatDN1) * Math.max(0.05, 1 - c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.BubbleCostGr) / 100)))
                                                : 2 == t
                                                  ? ((e = a.engine.getGameAttribute("DNSM")),
                                                    (s = c.asNumber(a.engine.getGameAttribute("DNSM").h.CauldStatDN1) * Math.max(0.05, 1 - c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.BubbleCostPu) / 100)))
                                                  : ((e = a.engine.getGameAttribute("DNSM")),
                                                    (s = c.asNumber(a.engine.getGameAttribute("DNSM").h.CauldStatDN1) * Math.max(0.05, 1 - c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.BubbleCostYe) / 100))),
                                          (e.h.CauldStatDN1 = s),
                                          (e = a.engine.getGameAttribute("DNSM")),
                                          (s =
                                              c.asNumber(a.engine.getGameAttribute("DNSM").h.CauldStatDN1) *
                                              Math.max(0.1, 1 - r._customBlock_CauldronStats("CauldronLvsBrewBonus", t, 2, 0) / 100) *
                                              Math.max(0.05, 1 - (c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchVials.h.AlchBubbleCost) + c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.BubbleCost)) / 100) *
                                              Math.max(0.1, Math.pow(0.75, c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[62]))) *
                                              Math.max(0.9, 1 - 0.1 * p._customBlock_AchieveStatus(108))),
                                          (e.h.CauldStatDN1 = s),
                                          1e9 < c.asNumber(a.engine.getGameAttribute("DNSM").h.CauldStatDN1) && (a.engine.getGameAttribute("DNSM").h.CauldStatDN1 = 1e9),
                                          1 > c.asNumber(a.engine.getGameAttribute("DNSM").h.CauldStatDN1) && (a.engine.getGameAttribute("DNSM").h.CauldStatDN1 = 1),
                                          Math.round(c.asNumber(a.engine.getGameAttribute("DNSM").h.CauldStatDN1)));
                            if ("VialCosts" == e)
                                return 0 == i
                                    ? a.engine.getGameAttribute("CustomLists").h.AlchemyVialQTYreq[0 | c.asNumber(a.engine.getGameAttribute("CauldronInfo")[4][0 | t])]
                                    : 3 * (c.asNumber(a.engine.getGameAttribute("CauldronInfo")[4][0 | t]) - 1 + 1);
                            if ("ResearchSpeed" == e) {
                                if (((e = a.engine.getGameAttribute("PlayerDATABASE")), (i = "" + h.string(a.engine.getGameAttribute("GetPlayersUsernames")[0 | t])), Object.prototype.hasOwnProperty.call(e.h, i))) {
                                    if (
                                        "gimmeBrewSPDnonLiquid" != a.engine.getGameAttribute("DummyText3") &&
                                        (3 < c.asNumber(a.engine.getGameAttribute("CauldronJobs")[1][0 | t]) ||
                                            (-1 == a.engine.getGameAttribute("CauldronJobs")[1][0 | t] &&
                                                (1 == n.__cast(a.engine.getGameAttribute("PixelHelperActor")[5].behaviors.getBehavior("ActorEvents_232"), Sa)._GenINFO[17] ||
                                                    3 == n.__cast(a.engine.getGameAttribute("PixelHelperActor")[5].behaviors.getBehavior("ActorEvents_232"), Sa)._GenINFO[17])))
                                    )
                                        return 99.9 < c.asNumber(a.engine.getGameAttribute("CauldronJobs")[1][0 | t]) ||
                                            (-1 == a.engine.getGameAttribute("CauldronJobs")[1][0 | t] && 3 == n.__cast(a.engine.getGameAttribute("PixelHelperActor")[5].behaviors.getBehavior("ActorEvents_232"), Sa)._GenINFO[17])
                                            ? Math.round(10 * p._customBlock_Labb("SigilBonusSpeed", "Blank", 0, 0)) / 10
                                            : ((e = a.engine.getGameAttribute("PlayerDATABASE")), (i = "" + h.string(a.engine.getGameAttribute("GetPlayersUsernames")[0 | t])), Math.pow(2 * (c.asNumber(e.h[i].h.Lv0[5]) + 2), 0.65));
                                    ((e = a.engine.getGameAttribute("DNSM")), (s = r._customBlock_cauldronp2wbonuses("CauldronBonus", 3, 0, "0")));
                                    var _ = a.engine.getGameAttribute("PlayerDATABASE");
                                    i = "" + h.string(a.engine.getGameAttribute("GetPlayersUsernames")[0 | t]);
                                    var o = s * c.asNumber(_.h[i].h.Lv0[5]);
                                    return (
                                        (e.h.CauldStatDN7 = o),
                                        a.engine.getGameAttribute("GetPlayersUsernames")[0 | t] == a.engine.getGameAttribute("UserInfo")[0]
                                            ? ((e = a.engine.getGameAttribute("DNSM")),
                                              (s = c.asNumber(a.engine.getGameAttribute("DNSM").h.CauldStatDN7) * (1 + x._customBlock_RunCodeOfTypeXforThingY("Stat2num", "" + x._customBlock_TotalStats("WIS")) / 0.6)),
                                              (e.h.CauldStatDN7 = s),
                                              (e = a.engine.getGameAttribute("DNSM")),
                                              (s = c.asNumber(a.engine.getGameAttribute("DNSM").h.CauldStatDN7) * (1 + (k._customBlock_GetTalentNumber(1, 491) + x._customBlock_SkillStats("TownProdSpeedPCT")) / 100)),
                                              (e.h.CauldStatDN7 = s))
                                            : ((e = a.engine.getGameAttribute("DNSM")),
                                              (s = c.asNumber(a.engine.getGameAttribute("DNSM").h.CauldStatDN7)),
                                              (_ = a.engine.getGameAttribute("PlayerDATABASE")),
                                              (i = "" + h.string(a.engine.getGameAttribute("GetPlayersUsernames")[0 | t])),
                                              (o = 1 + c.asNumber(_.h[i].h.SkillLevels[491]) / 100),
                                              (_ = a.engine.getGameAttribute("PlayerDATABASE")),
                                              (i = "" + h.string(a.engine.getGameAttribute("GetPlayersUsernames")[0 | t])),
                                              (s *= o * (1 + x._customBlock_RunCodeOfTypeXforThingY("Stat2num", "" + h.string(_.h[i].h.PersonalValuesMap.h.StatList[2])) / 0.6)),
                                              (e.h.CauldStatDN7 = s)),
                                        (e = a.engine.getGameAttribute("PlayerDATABASE")),
                                        (i = "" + h.string(a.engine.getGameAttribute("GetPlayersUsernames")[0 | t])),
                                        Math.round(Math.pow(c.asNumber(e.h[i].h.Lv0[5]), 0.8)) *
                                            (1 +
                                                (k._customBlock_StampBonusOfTypeX("AlchSpd") +
                                                    p._customBlock_GuildBonuses(5) +
                                                    (c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.BrewSpd) + c.asNumber(a.engine.getGameAttribute("DNSM").h.BoxRewards.h.BrewSpeed))) /
                                                    100) *
                                            (1 + c.asNumber(a.engine.getGameAttribute("DNSM").h.CauldStatDN7) / 100) *
                                            (1 + m._customBlock_Companions(46) / 100)
                                    );
                                }
                                return 0;
                            }
                            if ("NumBubblesUnlocked" == e) {
                                for (i = a.engine.getGameAttribute("DNSM").h.CauldStatDN3 = 0, e = a.engine.getGameAttribute("CauldronInfo")[0 | t].length; i < e && ((s = i++), 0 != a.engine.getGameAttribute("CauldronInfo")[0 | t][s]); )
                                    a.engine.getGameAttribute("DNSM").h.CauldStatDN3 = s + 1;
                                return a.engine.getGameAttribute("DNSM").h.CauldStatDN3;
                            }
                            if ("MaxCauldronQTY" == e)
                                return (
                                    (e = a.engine.getGameAttribute("DNSM")),
                                    (s = r._customBlock_CauldronStats("NumBubblesUnlocked", t, 0, 0)),
                                    (e.h.CauldStatDN1 = s),
                                    0 == a.engine.getGameAttribute("DNSM").h.CauldStatDN1
                                        ? 0.01
                                        : 1 == a.engine.getGameAttribute("DNSM").h.CauldStatDN1
                                          ? 0.15
                                          : 2 == a.engine.getGameAttribute("DNSM").h.CauldStatDN1
                                            ? 0.75
                                            : 3 == a.engine.getGameAttribute("DNSM").h.CauldStatDN1
                                              ? 5
                                              : 4 == a.engine.getGameAttribute("DNSM").h.CauldStatDN1
                                                ? 20
                                                : 1 + Math.pow(3 * (c.asNumber(a.engine.getGameAttribute("DNSM").h.CauldStatDN1) - 3), 2.2) * Math.pow(1.3, c.asNumber(a.engine.getGameAttribute("DNSM").h.CauldStatDN1) - 3)
                                );
                            if ("PctChanceNewBubble" == e)
                                return (
                                    (e = a.engine.getGameAttribute("DNSM")),
                                    (s = r._customBlock_CauldronStats("NumBubblesUnlocked", t, 0, 0)),
                                    (e.h.CauldStatDN1 = s),
                                    (e = a.engine.getGameAttribute("DNSM")),
                                    (s = (139 * Math.pow(0.73, c.asNumber(a.engine.getGameAttribute("DNSM").h.CauldStatDN1) + 1)) / Math.max(0.1 * c.asNumber(a.engine.getGameAttribute("DNSM").h.CauldStatDN1) + 1, 1)),
                                    (e.h.CauldStatDN2 = s),
                                    (e = a.engine.getGameAttribute("DNSM")),
                                    (s =
                                        c.asNumber(a.engine.getGameAttribute("DNSM").h.CauldStatDN2) *
                                        r._customBlock_CauldronStats("CauldronLvsBrewBonus", t, 1, 0) *
                                        Math.max(r._customBlock_cauldronp2wbonuses("CauldronBonus", 0, t, "1"), 1) *
                                        (1 + k._customBlock_GetTalentNumber(2, 492) / 100)),
                                    (e.h.CauldStatDN2 = s),
                                    "1" == ("" + h.string(a.engine.getGameAttribute("OptionsListAccount")[32])).charAt(0 | t) &&
                                        ((e = a.engine.getGameAttribute("DNSM")), (s = 1.5 * c.asNumber(a.engine.getGameAttribute("DNSM").h.CauldStatDN2)), (e.h.CauldStatDN2 = s)),
                                    a.engine.getGameAttribute("DNSM").h.CauldStatDN2
                                );
                            if ("CauldronLvsBrewREQ" == e)
                                return (
                                    (e = a.engine.getGameAttribute("DNSM")),
                                    (s = c.asNumber(a.engine.getGameAttribute("CauldronInfo")[8][0 | t][0 | i][1]) + 1),
                                    (e.h.CauldStatDN4 = s),
                                    (e = a.engine.getGameAttribute("DNSM")),
                                    (s = Math.max((100 - r._customBlock_cauldronp2wbonuses("CauldronBonus", 0, t, "2")) / 100, 0.05)),
                                    (e.h.CauldStatDN5 = s),
                                    4 > t
                                        ? Math.floor(
                                              1 +
                                                  Math.pow(1.5 * c.asNumber(a.engine.getGameAttribute("DNSM").h.CauldStatDN4), 1.6) *
                                                      Math.pow(1.073, c.asNumber(a.engine.getGameAttribute("DNSM").h.CauldStatDN4)) *
                                                      2 *
                                                      c.asNumber(a.engine.getGameAttribute("DNSM").h.CauldStatDN5)
                                          )
                                        : Math.floor(1.6 + Math.pow(1.25 * c.asNumber(a.engine.getGameAttribute("DNSM").h.CauldStatDN4), 1.8))
                                );
                            if ("CauldronLvsBrewBonus" == e)
                                return 4 > t
                                    ? 0 == i
                                        ? Math.round(5 * c.asNumber(a.engine.getGameAttribute("CauldronInfo")[8][0 | t][0][1]))
                                        : 1 == i
                                          ? Math.round(10 * (1 + 0.05 * c.asNumber(a.engine.getGameAttribute("CauldronInfo")[8][0 | t][1][1]))) / 10
                                          : 2 == i
                                            ? Math.round(10 * x._customBlock_ArbitraryCode5Inputs("decay", 90, 100, c.asNumber(a.engine.getGameAttribute("CauldronInfo")[8][0 | t][2][1]), 0, 0)) / 10
                                            : Math.round(2 * c.asNumber(a.engine.getGameAttribute("CauldronInfo")[8][0 | t][3][1]))
                                    : 2 == i
                                      ? Math.round(c.asNumber(a.engine.getGameAttribute("CauldronInfo")[8][0 | t][0 | i][1]))
                                      : Math.round(2 * c.asNumber(a.engine.getGameAttribute("CauldronInfo")[8][0 | t][0 | i][1]));
                            if ("SpecificSpdBonuses" == e)
                                return (
                                    0 == t
                                        ? ((e = a.engine.getGameAttribute("DNSM")),
                                          (s = (1 + c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchVials.h.OrangeBrew) / 100) * (1 + r._customBlock_cauldronp2wbonuses("CauldronBonus", 0, 0, "0") / 100)),
                                          (e.h.CauldStatDN1 = s))
                                        : 1 == t
                                          ? ((e = a.engine.getGameAttribute("DNSM")),
                                            (s = (1 + c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchVials.h.GreenBrew) / 100) * (1 + r._customBlock_cauldronp2wbonuses("CauldronBonus", 0, 1, "0") / 100)),
                                            (e.h.CauldStatDN1 = s))
                                          : 2 == t
                                            ? ((e = a.engine.getGameAttribute("DNSM")),
                                              (s = (1 + c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchVials.h.PurpleBrew) / 100) * (1 + r._customBlock_cauldronp2wbonuses("CauldronBonus", 0, 2, "0") / 100)),
                                              (e.h.CauldStatDN1 = s))
                                            : 3 == t
                                              ? ((e = a.engine.getGameAttribute("DNSM")),
                                                (s = (1 + c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchVials.h.YellowBrew) / 100) * (1 + r._customBlock_cauldronp2wbonuses("CauldronBonus", 0, 3, "0") / 100)),
                                                (e.h.CauldStatDN1 = s))
                                              : (a.engine.getGameAttribute("DNSM").h.CauldStatDN1 = 1),
                                    "1" == ("" + h.string(a.engine.getGameAttribute("OptionsListAccount")[32])).charAt(0 | t) &&
                                        ((e = a.engine.getGameAttribute("DNSM")), (s = 1.5 * c.asNumber(a.engine.getGameAttribute("DNSM").h.CauldStatDN1)), (e.h.CauldStatDN1 = s)),
                                    (1 + r._customBlock_CauldronStats("CauldronLvsBrewBonus", t, 0, 0) / 100) * c.asNumber(a.engine.getGameAttribute("DNSM").h.CauldStatDN1)
                                );
                            if ("LiquidCap" == e)
                                return (
                                    (e = a.engine.getGameAttribute("DNSM")),
                                    (s = r._customBlock_CauldronStats("CauldronLvsBrewBonus", t + 4, 2, 0)),
                                    (e.h.CauldStatDN1 = s),
                                    c.asNumber(a.engine.getGameAttribute("GemItemsPurchased")[106]) > t
                                        ? ((e = a.engine.getGameAttribute("DNSM")), (s = 0.5 + p._customBlock_SaltLick(5) / 100), (e.h.CauldStatDN1bb = s))
                                        : (a.engine.getGameAttribute("DNSM").h.CauldStatDN1bb = 0),
                                    c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[123]) > t &&
                                        (0 == a.engine.getGameAttribute("DNSM").h.CauldStatDN1bb
                                            ? (a.engine.getGameAttribute("DNSM").h.CauldStatDN1bb = 1)
                                            : ((e = a.engine.getGameAttribute("DNSM")), (s = p._customBlock_SaltLick(5) / 100 + 2), (e.h.CauldStatDN1bb = s))),
                                    (e = a.engine.getGameAttribute("DNSM")),
                                    (s =
                                        c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.LqdCap) *
                                        Math.max(Math.pow(c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[5].behaviors.getBehavior("ActorEvents_232"), Sa)._GenINFO[87]) / 25, 0.3), 0)),
                                    (e.h.CauldStatDNh20 = s),
                                    0 == t
                                        ? (1 + (c.asNumber(a.engine.getGameAttribute("DNSM").h.CauldStatDN1bb) + (r._customBlock_MealBonus("Liquid12") + 5 * m._customBlock_RiftStuff("RiftSkillBonus,4", 1)) / 100)) *
                                          p._customBlock_MainframeBonus(6) *
                                          (10 +
                                              (c.asNumber(a.engine.getGameAttribute("DNSM").h.CauldStatDN1) +
                                                  (c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchVials.h.Liquid1Cap) +
                                                      (r._customBlock_cauldronp2wbonuses("CauldronBonus", 1, 0, "1") +
                                                          (c.asNumber(a.engine.getGameAttribute("DNSM").h.CauldStatDNh20) + (k._customBlock_StampBonusOfTypeX("LiquidCap") + Math.ceil(p._customBlock_ArcadeBonus(7))))))))
                                        : 1 == t
                                          ? 2 <= c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[5].behaviors.getBehavior("ActorEvents_232"), Sa)._GenINFO[56])
                                              ? (1 + (c.asNumber(a.engine.getGameAttribute("DNSM").h.CauldStatDN1bb) + (r._customBlock_MealBonus("Liquid12") + 5 * m._customBlock_RiftStuff("RiftSkillBonus,4", 1)) / 100)) *
                                                p._customBlock_MainframeBonus(6) *
                                                (10 +
                                                    c.asNumber(a.engine.getGameAttribute("DNSM").h.CauldStatDN1) +
                                                    (c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchVials.h.Liquid2Cap) +
                                                        (r._customBlock_cauldronp2wbonuses("CauldronBonus", 1, 1, "1") +
                                                            (c.asNumber(a.engine.getGameAttribute("DNSM").h.CauldStatDNh20) + (k._customBlock_StampBonusOfTypeX("LiquidCap") + Math.ceil(p._customBlock_ArcadeBonus(7)))))))
                                              : 0
                                          : 2 == t
                                            ? 3 <= c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[5].behaviors.getBehavior("ActorEvents_232"), Sa)._GenINFO[56])
                                                ? (1 + (c.asNumber(a.engine.getGameAttribute("DNSM").h.CauldStatDN1bb) + (r._customBlock_MealBonus("Liquid34") + 5 * m._customBlock_RiftStuff("RiftSkillBonus,4", 1)) / 100)) *
                                                  p._customBlock_MainframeBonus(6) *
                                                  (10 +
                                                      c.asNumber(a.engine.getGameAttribute("DNSM").h.CauldStatDN1) +
                                                      (r._customBlock_cauldronp2wbonuses("CauldronBonus", 1, 2, "1") +
                                                          c.asNumber(a.engine.getGameAttribute("DNSM").h.CauldStatDNh20) +
                                                          (k._customBlock_StampBonusOfTypeX("LiquidCap") + (Math.ceil(p._customBlock_ArcadeBonus(7)) + c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchVials.h.Liquid3Cap)))))
                                                : 0
                                            : 4 <= c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[5].behaviors.getBehavior("ActorEvents_232"), Sa)._GenINFO[56])
                                              ? (1 + (c.asNumber(a.engine.getGameAttribute("DNSM").h.CauldStatDN1bb) + (r._customBlock_MealBonus("Liquid34") + 5 * m._customBlock_RiftStuff("RiftSkillBonus,4", 1)) / 100)) *
                                                p._customBlock_MainframeBonus(6) *
                                                (10 +
                                                    (c.asNumber(a.engine.getGameAttribute("DNSM").h.CauldStatDN1) +
                                                        (r._customBlock_cauldronp2wbonuses("CauldronBonus", 1, 3, "1") +
                                                            c.asNumber(a.engine.getGameAttribute("DNSM").h.CauldStatDNh20) +
                                                            (k._customBlock_StampBonusOfTypeX("LiquidCap") + Math.ceil(p._customBlock_ArcadeBonus(7))))))
                                              : 0
                                );
                            if ("LiquidHRrate" == e) {
                                for (
                                    0 == t
                                        ? ((e = a.engine.getGameAttribute("DNSM")), (s = r._customBlock_CauldronStats("CauldronLvsBrewBonus", 4, 3, 0) + r._customBlock_cauldronp2wbonuses("CauldronBonus", 1, 0, "0")), (e.h.CauldStatDN1 = s))
                                        : 1 == t
                                          ? 19 < c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[5].behaviors.getBehavior("ActorEvents_232"), Sa)._GenINFO[86])
                                              ? ((e = a.engine.getGameAttribute("DNSM")),
                                                (s = r._customBlock_CauldronStats("CauldronLvsBrewBonus", 5, 3, 0) + r._customBlock_cauldronp2wbonuses("CauldronBonus", 1, 1, "0")),
                                                (e.h.CauldStatDN1 = s))
                                              : (a.engine.getGameAttribute("DNSM").h.CauldStatDN1 = 0)
                                          : 2 == t
                                            ? 34 < c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[5].behaviors.getBehavior("ActorEvents_232"), Sa)._GenINFO[86])
                                                ? ((e = a.engine.getGameAttribute("DNSM")),
                                                  (s = r._customBlock_CauldronStats("CauldronLvsBrewBonus", 6, 3, 0) + r._customBlock_cauldronp2wbonuses("CauldronBonus", 1, 2, "0")),
                                                  (e.h.CauldStatDN1 = s))
                                                : (a.engine.getGameAttribute("DNSM").h.CauldStatDN1 = 0)
                                            : 119 < c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[5].behaviors.getBehavior("ActorEvents_232"), Sa)._GenINFO[86])
                                              ? ((e = a.engine.getGameAttribute("DNSM")),
                                                (s = r._customBlock_CauldronStats("CauldronLvsBrewBonus", 7, 3, 0) + r._customBlock_cauldronp2wbonuses("CauldronBonus", 1, 3, "0")),
                                                (e.h.CauldStatDN1 = s))
                                              : (a.engine.getGameAttribute("DNSM").h.CauldStatDN1 = 0),
                                        e = a.engine.getGameAttribute("DNSM"),
                                        s = c.asNumber(a.engine.getGameAttribute("DNSM").h.CauldStatDN1) + c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchVials.h.LiquidRegen),
                                        e.h.CauldStatDN1 = s,
                                        i = a.engine.getGameAttribute("DNSM").h.CauldStatDN2 = 0;
                                    4 > i;
                                )
                                    ((s = i++),
                                        -1 != a.engine.getGameAttribute("CauldronJobs")[0][(t + 4) | 0][s] &&
                                            ((e = a.engine.getGameAttribute("DNSM")),
                                            (s = c.asNumber(a.engine.getGameAttribute("DNSM").h.CauldStatDN2) + r._customBlock_CauldronStats("ResearchSpeed", c.asNumber(a.engine.getGameAttribute("CauldronJobs")[0][(t + 4) | 0][s]), 0, 0)),
                                            (e.h.CauldStatDN2 = s)));
                                return c.asNumber(a.engine.getGameAttribute("GemItemsPurchased")[106]) > t
                                    ? c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[123]) > t
                                        ? 1.9500000000000002 *
                                          (1 + c.asNumber(a.engine.getGameAttribute("DNSM").h.CauldStatDN1) / 100) *
                                          (1 +
                                              (c.asNumber(a.engine.getGameAttribute("DNSM").h.CauldStatDN2) +
                                                  (k._customBlock_StampBonusOfTypeX("LiquidSpd") + (p._customBlock_SaltLick(5) + (p._customBlock_Labb("SigilBonus", "Blank", 20, 0) + m._customBlock_Summoning("VaultUpgBonus", 38, 0))))) /
                                                  100) *
                                          (1 - (7.5 * (p._customBlock_MainframeBonus(6) - 1)) / 100) *
                                          (1 + m._customBlock_Summoning("VotingBonusz", 12, 0) / 100)
                                        : 1.5 *
                                          (1 + c.asNumber(a.engine.getGameAttribute("DNSM").h.CauldStatDN1) / 100) *
                                          (1 +
                                              (c.asNumber(a.engine.getGameAttribute("DNSM").h.CauldStatDN2) +
                                                  (k._customBlock_StampBonusOfTypeX("LiquidSpd") + (p._customBlock_SaltLick(5) + (p._customBlock_Labb("SigilBonus", "Blank", 20, 0) + m._customBlock_Summoning("VaultUpgBonus", 38, 0))))) /
                                                  100) *
                                          (1 - (7.5 * (p._customBlock_MainframeBonus(6) - 1)) / 100) *
                                          (1 + m._customBlock_Summoning("VotingBonusz", 12, 0) / 100)
                                    : (1 + c.asNumber(a.engine.getGameAttribute("DNSM").h.CauldStatDN1) / 100) *
                                          (1 +
                                              (c.asNumber(a.engine.getGameAttribute("DNSM").h.CauldStatDN2) +
                                                  (k._customBlock_StampBonusOfTypeX("LiquidSpd") + (p._customBlock_SaltLick(5) + (p._customBlock_Labb("SigilBonus", "Blank", 20, 0) + m._customBlock_Summoning("VaultUpgBonus", 38, 0))))) /
                                                  100) *
                                          (1 - (7.5 * (p._customBlock_MainframeBonus(6) - 1)) / 100) *
                                          (1 + m._customBlock_Summoning("VotingBonusz", 12, 0) / 100);
                            }
                            return "ExpPerPtBrewed" == e
                                ? -1 == a.engine.getGameAttribute("CauldronJobs")[1][0 | t]
                                    ? 0
                                    : ((a.engine.getGameAttribute("DNSM").h.CauldStatDN1 = 1),
                                      3 < c.asNumber(a.engine.getGameAttribute("CauldronJobs")[1][0 | t]) && (a.engine.getGameAttribute("DNSM").h.CauldStatDN1 = 2),
                                      15 * x._customBlock_ExpMulti(5) * c.asNumber(a.engine.getGameAttribute("DNSM").h.CauldStatDN1))
                                : 1;
                        }
