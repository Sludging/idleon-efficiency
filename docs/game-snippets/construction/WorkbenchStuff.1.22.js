/**
 * Game formula snippet — idleon-efficiency formula research.
 * Function: _customBlock_WorkbenchStuff (from scripts.ActorEvents_345)
 * Game version: 1.22 ("Jelly_Operator")
 * Captured: 2026-09-22 via game-debug-tool (findFunction + toString)
 * Case reference: correctness case issue 398
 * Printer growth research, checked against version 1.24:
 * King of the Remembered is the only recipient-dependent factor in AdditionExtraPrinting.
 * Evaluate account candidates with each real recipient's shared talent inputs, then use the highest attainable bonus.
 * ExtraPrinting keeps each character's actual Laboratory and Harriep multipliers.
 */
function (e, t, i) {
                            if ("FlagReq" == e)
                                return 96 > t
                                    ? 25 * c.asNumber(a.engine.getGameAttribute("CustomLists").h.FlagReqs[0 | t])
                                    : 5e6 * (1 + Math.min(9, 9 * Math.round(t - 96)) + Math.max(0, 10 * Math.round(t - 97))) * Math.pow(4, Math.round(t - 96));
                            if ("TotalFlags" == e) return 4;
                            if ("TotalGildedSlots" == e)
                                return Math.round(
                                    Math.min(
                                        8,
                                        Math.min(1, m._customBlock_Minehead("BonusQTY", 18, 0)) +
                                            (Math.ceil(p._customBlock_MainframeBonus(103) / 5) +
                                                (Math.min(c.asNumber(a.engine.getGameAttribute("Atoms")[6]), 1) +
                                                    Math.min(1, m._customBlock_Thingies("LegendPTS_bonus", 33, 0)) +
                                                    (m._customBlock_Holes("GambitBonuses", 9, 0) + m._customBlock_Summoning("EventShopOwned", 14, 0))))
                                    )
                                );
                            if ("TotalGildedBoostio" == e) return (3 + m._customBlock_AtomCollider("AtomBonuses", 6, 0) / 100) * (1 + m._customBlock_Thingies("LegendPTS_bonus", 33, 0) / 100);
                            if ("CogSlots" == e)
                                return Math.round(
                                    Math.min(120, 23 + q._customBlock_GetBribeBonus("16") + (c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchVials.h.CogInv) + 4 * c.asNumber(a.engine.getGameAttribute("GemItemsPurchased")[116])))
                                );
                            if ("PrayerMaxLv" == e) return c.asNumber(a.engine.getGameAttribute("CustomLists").h.PrayerInfo[0 | t][9]);
                            if ("ConstMasteryBonus" == e)
                                return 40 > c.asNumber(a.engine.getGameAttribute("Rift")[0]) || 113 > n.__cast(a.engine.getGameAttribute("PixelHelperActor")[8].behaviors.getBehavior("ActorEvents_481"), ma)._GenINFO.length
                                    ? 0
                                    : 0 == t
                                      ? Math.max(0, Math.floor(c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[8].behaviors.getBehavior("ActorEvents_481"), ma)._GenINFO[111]) / 10))
                                      : 1 == t
                                        ? Math.max(
                                              0,
                                              2 *
                                                  Math.floor(
                                                      (c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[8].behaviors.getBehavior("ActorEvents_481"), ma)._GenINFO[111]) -
                                                          c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[8].behaviors.getBehavior("ActorEvents_481"), ma)._GenINFO[112][2])) /
                                                          10
                                                  )
                                          )
                                        : 2 == t
                                          ? Math.max(
                                                0,
                                                5 *
                                                    Math.floor(
                                                        (c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[8].behaviors.getBehavior("ActorEvents_481"), ma)._GenINFO[111]) -
                                                            c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[8].behaviors.getBehavior("ActorEvents_481"), ma)._GenINFO[112][4])) /
                                                            10
                                                    )
                                            )
                                          : 3 == t &&
                                              c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[8].behaviors.getBehavior("ActorEvents_481"), ma)._GenINFO[111]) >=
                                                  c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[8].behaviors.getBehavior("ActorEvents_481"), ma)._GenINFO[112][1])
                                            ? 35
                                            : (4 == t &&
                                                    c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[8].behaviors.getBehavior("ActorEvents_481"), ma)._GenINFO[111]) >=
                                                        c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[8].behaviors.getBehavior("ActorEvents_481"), ma)._GenINFO[112][3])) ||
                                                (5 == t &&
                                                    c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[8].behaviors.getBehavior("ActorEvents_481"), ma)._GenINFO[111]) >=
                                                        c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[8].behaviors.getBehavior("ActorEvents_481"), ma)._GenINFO[112][5]))
                                              ? 100
                                              : 6 == t &&
                                                  c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[8].behaviors.getBehavior("ActorEvents_481"), ma)._GenINFO[111]) >=
                                                      c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[8].behaviors.getBehavior("ActorEvents_481"), ma)._GenINFO[112][6])
                                                ? 30
                                                : 0;
                            if ("ExtraMaxLvAtom" == e)
                                return 50 == t
                                    ? Math.round(2 * c.asNumber(a.engine.getGameAttribute("Atoms")[5]) + (p._customBlock_WorkbenchStuff("ConstMasteryBonus", 6, 0) + 100 * m._customBlock_Holes("GambitBonuses", 9, 0)))
                                    : 101 == t
                                      ? p._customBlock_WorkbenchStuff("ConstMasteryBonus", 4, 0)
                                      : 100 == t
                                        ? 18 <= i && c.asNumber(a.engine.getGameAttribute("Spelunk")[4][6]) > i - 18
                                            ? Math.round(p._customBlock_WorkbenchStuff("ConstMasteryBonus", 5, 0) + 100 + m._customBlock_SushiStuff("RoG_BonusQTY", 58, 0))
                                            : Math.round(p._customBlock_WorkbenchStuff("ConstMasteryBonus", 5, 0) + m._customBlock_SushiStuff("RoG_BonusQTY", 58, 0))
                                        : 15 == t
                                          ? p._customBlock_WorkbenchStuff("ConstMasteryBonus", 3, 0)
                                          : 0;
                            if ("DeathNoteRank" == e)
                                return 7842 == i
                                    ? 100 > t
                                        ? 0
                                        : 250 > t
                                          ? 1
                                          : 1e3 > t
                                            ? 2
                                            : 5e3 > t
                                              ? 3
                                              : 25e3 > t
                                                ? 4
                                                : 1e5 > t
                                                  ? 5
                                                  : 1e6 > t
                                                    ? 7
                                                    : 10
                                    : 25e3 > t
                                      ? 0
                                      : 1e5 > t
                                        ? 1
                                        : 25e4 > t
                                          ? 2
                                          : 5e5 > t
                                            ? 3
                                            : 1e6 > t
                                              ? 4
                                              : 5e6 > t
                                                ? 5
                                                : 1e8 > t
                                                  ? 7
                                                  : 1e9 < t && 1 == m._customBlock_RiftStuff("riftBonus", 3)
                                                    ? 20
                                                    : 10;
                            if ("MultiKill_perTier" == e) {
                                e = a.engine.getGameAttribute("DNSM");
                                var s =
                                    p._customBlock_WorkbenchStuff("OverkillQTY", Math.floor(a.engine.getGameAttribute("CurrentMap") / 50), 0) +
                                    (p._customBlock_WorkbenchStuff("OverkillQTY", 7, 0) +
                                        (c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchVials.h.Overkill) +
                                            (x._customBlock_GetBuffBonuses(46, 2) + p._customBlock_getbonus2(1, 58, -1) * Math.floor(c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[158]) / 5)) +
                                            (p._customBlock_ArcadeBonus(8) +
                                                (m._customBlock_Sailing("ArtifactBonus", 26, 0) + x._customBlock_GetBuffBonuses(469, 2)) +
                                                (q._customBlock_chipBonuses("mkill") +
                                                    (w._customBlock_EtcBonuses("71") +
                                                        m._customBlock_Holes("MeasurementBonusTOTAL", 9, 0) +
                                                        (w._customBlock_CardBonusREAL(80) + c.asNumber(a.engine.getGameAttribute("DNSM").h.StarSigns.h[78])) +
                                                        (p._customBlock_prayersReal(16, 0) + p._customBlock_Breeding("ShinyBonusS", "Nah", 4, -1)))) +
                                                (c.asNumber(a.engine.getGameAttribute("DNSM").h.BoxRewards.h["13b"]) +
                                                    (c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.MKtierACTIVE) + p._customBlock_CardSetBonuses(0, "11"))))));
                                return (
                                    (e.h.MKtzioDN = s),
                                    300 <= a.engine.getGameAttribute("CurrentMap") &&
                                        8675309 != i &&
                                        (250 <= c.asNumber(a.engine.getGameAttribute("DNSM").h.MKtzioDN)
                                            ? ((e = a.engine.getGameAttribute("DNSM")), (s = 98.14 + (c.asNumber(a.engine.getGameAttribute("DNSM").h.MKtzioDN) - 250) / 50), (e.h.MKtzioDN = s))
                                            : 200 <= c.asNumber(a.engine.getGameAttribute("DNSM").h.MKtzioDN)
                                              ? ((e = a.engine.getGameAttribute("DNSM")), (s = 95.6 + (c.asNumber(a.engine.getGameAttribute("DNSM").h.MKtzioDN) - 200) / 20), (e.h.MKtzioDN = s))
                                              : 150 <= c.asNumber(a.engine.getGameAttribute("DNSM").h.MKtzioDN)
                                                ? ((e = a.engine.getGameAttribute("DNSM")), (s = 90.6 + (c.asNumber(a.engine.getGameAttribute("DNSM").h.MKtzioDN) - 150) / 10), (e.h.MKtzioDN = s))
                                                : 100 <= c.asNumber(a.engine.getGameAttribute("DNSM").h.MKtzioDN)
                                                  ? ((e = a.engine.getGameAttribute("DNSM")), (s = 80.6 + (c.asNumber(a.engine.getGameAttribute("DNSM").h.MKtzioDN) - 100) / 5), (e.h.MKtzioDN = s))
                                                  : 50 <= c.asNumber(a.engine.getGameAttribute("DNSM").h.MKtzioDN)
                                                    ? ((e = a.engine.getGameAttribute("DNSM")), (s = 47.3 + (c.asNumber(a.engine.getGameAttribute("DNSM").h.MKtzioDN) - 50) / 1.5), (e.h.MKtzioDN = s))
                                                    : 20 <= c.asNumber(a.engine.getGameAttribute("DNSM").h.MKtzioDN) &&
                                                      ((e = a.engine.getGameAttribute("DNSM")), (s = 20 + (c.asNumber(a.engine.getGameAttribute("DNSM").h.MKtzioDN) - 20) / 1.1), (e.h.MKtzioDN = s))),
                                    216 == a.engine.getGameAttribute("CurrentMap") &&
                                        17 == a.engine.getGameAttribute("Holes")[0][a.engine.getGameAttribute("GetPlayersUsernames").indexOf(a.engine.getGameAttribute("UserInfo")[0])] &&
                                        ((e = a.engine.getGameAttribute("DNSM")), (s = m._customBlock_Holes2("Cglunko_MKtier", 0, 0)), (e.h.MKtzioDN = s)),
                                    a.engine.getGameAttribute("DNSM").h.MKtzioDN
                                );
                            }
                            if ("MultiKill_base" == e)
                                return (
                                    (e = a.engine.getGameAttribute("DNSM")),
                                    (s =
                                        c.asNumber(a.engine.getGameAttribute("DNSM").h.StarSigns.h.MultiKill) +
                                        p._customBlock_SaltLick(8) +
                                        (k._customBlock_StampBonusOfTypeX("Overkill") + 2 * c.asNumber(a.engine.getGameAttribute("TowerInfo")[2])) +
                                        (w._customBlock_EtcBonuses("29") +
                                            (Math.min(5, p._customBlock_AchieveStatus(148)) +
                                                (6 * p._customBlock_AchieveStatus(122) + (2 * p._customBlock_AchieveStatus(123) + x._customBlock_ArbitraryCode("StatueOnyxOwned") * k._customBlock_GetTalentNumber(1, 654)))))),
                                    (e.h.MKtzioDN2 = s),
                                    300 <= a.engine.getGameAttribute("CurrentMap") &&
                                        (250 <= c.asNumber(a.engine.getGameAttribute("DNSM").h.MKtzioDN2)
                                            ? ((e = a.engine.getGameAttribute("DNSM")), (s = 98.14 + (c.asNumber(a.engine.getGameAttribute("DNSM").h.MKtzioDN2) - 250) / 50), (e.h.MKtzioDN2 = s))
                                            : 200 <= c.asNumber(a.engine.getGameAttribute("DNSM").h.MKtzioDN2)
                                              ? ((e = a.engine.getGameAttribute("DNSM")), (s = 95.6 + (c.asNumber(a.engine.getGameAttribute("DNSM").h.MKtzioDN2) - 200) / 20), (e.h.MKtzioDN2 = s))
                                              : 150 <= c.asNumber(a.engine.getGameAttribute("DNSM").h.MKtzioDN2)
                                                ? ((e = a.engine.getGameAttribute("DNSM")), (s = 90.6 + (c.asNumber(a.engine.getGameAttribute("DNSM").h.MKtzioDN2) - 150) / 10), (e.h.MKtzioDN2 = s))
                                                : 100 <= c.asNumber(a.engine.getGameAttribute("DNSM").h.MKtzioDN2)
                                                  ? ((e = a.engine.getGameAttribute("DNSM")), (s = 80.6 + (c.asNumber(a.engine.getGameAttribute("DNSM").h.MKtzioDN2) - 100) / 5), (e.h.MKtzioDN2 = s))
                                                  : 50 <= c.asNumber(a.engine.getGameAttribute("DNSM").h.MKtzioDN2)
                                                    ? ((e = a.engine.getGameAttribute("DNSM")), (s = 47.3 + (c.asNumber(a.engine.getGameAttribute("DNSM").h.MKtzioDN2) - 50) / 1.5), (e.h.MKtzioDN2 = s))
                                                    : 20 <= c.asNumber(a.engine.getGameAttribute("DNSM").h.MKtzioDN2) &&
                                                      ((e = a.engine.getGameAttribute("DNSM")), (s = 20 + (c.asNumber(a.engine.getGameAttribute("DNSM").h.MKtzioDN2) - 20) / 1.1), (e.h.MKtzioDN2 = s))),
                                    216 == a.engine.getGameAttribute("CurrentMap") &&
                                        17 == a.engine.getGameAttribute("Holes")[0][a.engine.getGameAttribute("GetPlayersUsernames").indexOf(a.engine.getGameAttribute("UserInfo")[0])] &&
                                        ((e = a.engine.getGameAttribute("DNSM")), (s = m._customBlock_Holes2("Cglunko_MKbase", 0, 0)), (e.h.MKtzioDN2 = s)),
                                    a.engine.getGameAttribute("DNSM").h.MKtzioDN2
                                );
                            if ("MultiKillTOTAL" == e)
                                return Math.floor(p._customBlock_WorkbenchStuff("MultiKill_base", 0, 0) + x._customBlock_RunCodeOfTypeXforThingY("OverkillStuffs", "2") * p._customBlock_WorkbenchStuff("MultiKill_perTier", 0, 0));
                            if ("OverkillQTY" == e) {
                                if (((a.engine.getGameAttribute("DNSM").h.OKqtyZZdn1 = 0), (e = a.engine.getGameAttribute("DNSM")), Object.prototype.hasOwnProperty.call(e.h, "OKqtyZZ") && -1 != t))
                                    return a.engine.getGameAttribute("DNSM").h.OKqtyZZ[0 | t];
                                for (s = [], (e = a.engine.getGameAttribute("DNSM")).h.OKqtyZZ = s, e = 0; 8 > e;) {
                                    if (7 == (i = e++))
                                        for (t = a.engine.gameAttributes.h.DummyNumber5 = 0, i = a.engine.getGameAttribute("CustomLists").h.NinjaInfo[30].length; t < i;) {
                                            s = t++;
                                            var r = a.engine;
                                            ((s = c.asNumber(a.engine.getGameAttribute("Ninja")[105][s])),
                                                (r.gameAttributes.h.DummyNumber4 = s),
                                                (s = a.engine),
                                                (r = a.engine.getGameAttribute("DummyNumber5") + p._customBlock_WorkbenchStuff("DeathNoteRank", a.engine.getGameAttribute("DummyNumber4"), 7842)),
                                                (s.gameAttributes.h.DummyNumber5 = r));
                                        }
                                    else
                                        for (
                                            a.engine.getGameAttribute("DNSM").h.OKqtyZZdn1 = i,
                                                t = a.engine.gameAttributes.h.DummyNumber5 = 0,
                                                i = a.engine.getGameAttribute("CustomLists").h.DeathNoteMobs[0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.OKqtyZZdn1)].length;
                                            t < i;
                                        ) {
                                            ((r = t++), (s = a.engine));
                                            var _ = a.engine
                                                .getGameAttribute("CustomLists")
                                                .h.MapAFKtarget.indexOf(a.engine.getGameAttribute("CustomLists").h.DeathNoteMobs[0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.OKqtyZZdn1)][r]);
                                            if (((s.gameAttributes.h.DummyNumber3 = _), (a.engine.gameAttributes.h.DummyNumber4 = 0), 0 <= a.engine.getGameAttribute("DummyNumber3"))) {
                                                s = a.engine;
                                                var o =
                                                    c.asNumber(a.engine.getGameAttribute("CustomLists").h.MapDetails[0 | a.engine.getGameAttribute("DummyNumber3")][0][0]) -
                                                    c.asNumber(a.engine.getGameAttribute("KillsLeft2Advance")[0 | a.engine.getGameAttribute("DummyNumber3")][0]);
                                                for (s.gameAttributes.h.DummyNumber4 = o, s = a.engine.getGameAttribute("PlayerDATABASE").h, _ = (r = Object.keys(s)).length, o = 0; o < _;)
                                                    if (((s = r[o++]), a.engine.getGameAttribute("UserInfo")[0] != s)) {
                                                        var u = a.engine;
                                                        ((s =
                                                            a.engine.getGameAttribute("DummyNumber4") +
                                                            (c.asNumber(a.engine.getGameAttribute("CustomLists").h.MapDetails[0 | a.engine.getGameAttribute("DummyNumber3")][0][0]) -
                                                                c.asNumber(a.engine.getGameAttribute("PlayerDATABASE").h["" + s].h.KillsLeft2Advance[0 | a.engine.getGameAttribute("DummyNumber3")][0]))),
                                                            (u.gameAttributes.h.DummyNumber4 = s));
                                                    }
                                            }
                                            ((s = a.engine),
                                                (r = a.engine.getGameAttribute("DummyNumber5") + p._customBlock_WorkbenchStuff("DeathNoteRank", a.engine.getGameAttribute("DummyNumber4"), 0)),
                                                (s.gameAttributes.h.DummyNumber5 = r));
                                        }
                                    a.engine.getGameAttribute("DNSM").h.OKqtyZZ.push(a.engine.getGameAttribute("DummyNumber5"));
                                }
                                return 0;
                            }
                            if ("FlagSpeed" == e)
                                return null != n.__cast(a.engine.getGameAttribute("PixelHelperActor")[8].behaviors.getBehavior("ActorEvents_481"), ma)._GenINFO[12]
                                    ? n.__cast(a.engine.getGameAttribute("PixelHelperActor")[8].behaviors.getBehavior("ActorEvents_481"), ma)._GenINFO[12][2]
                                    : 0;
                            if ("CogBuildSpdBonus" == e)
                                return 5 == a.engine.getGameAttribute("OptionsListAccount")[406] && 120 > c.asNumber(a.engine.getGameAttribute("TowerInfo")[62])
                                    ? 900
                                    : 1 +
                                          (c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.CogMakeSpd) +
                                              (c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchVials.h.CogSpd) + Math.min(8 * x._customBlock_RunCodeOfTypeXforThingY("CardLv", "Boss3A"), 50))) /
                                              100;
                            if ("CogBuildReq" == e) return 0 > i ? 0 : c.asNumber(a.engine.getGameAttribute("CustomLists").h.RANDOlist[12][0 | t]) * Math.pow(2 + t, i);
                            if ("CogBuildClaims" == e) {
                                for (e = a.engine.getGameAttribute("DNSM").h.ConstructDN1 = 0; 100 > e && ((i = e++), c.asNumber(a.engine.getGameAttribute("TowerInfo")[(62 + t) | 0]) >= p._customBlock_WorkbenchStuff("CogBuildReq", t, i));)
                                    a.engine.getGameAttribute("DNSM").h.ConstructDN1 = i + 1;
                                return a.engine.getGameAttribute("DNSM").h.ConstructDN1;
                            }
                            if ("ExtraBuildSPDmulti" == e) return (1 + m._customBlock_ResearchStuff("SmallCogBonusTOTAL", 1, 0) / 100) * (1 + m._customBlock_Companions(157) / 100) * Math.max(1, m._customBlock_RoyalG("OutpostROGbon", 0, 0));
                            if ("ExtraFlaggyRatemulti" == e)
                                return (
                                    (1 + m._customBlock_ResearchStuff("SmallCogBonusTOTAL", 0, 0) / 100) *
                                    (1 + m._customBlock_ResearchStuff("Grid_Bonus", 89, 0) / 100) *
                                    (1 + (10 * x._customBlock_RunCodeOfTypeXforThingY("CardLv", "w7b3")) / 100)
                                );
                            if ("PlayerBuildSpd" == e) {
                                if (0 <= t) {
                                    if (null != n.__cast(a.engine.getGameAttribute("PixelHelperActor")[5].behaviors.getBehavior("ActorEvents_232"), Na)._ItemsAndStorageOWNED) {
                                        ((e = a.engine.getGameAttribute("PlayerDATABASE")),
                                            (i = "" + h.string(a.engine.getGameAttribute("GetPlayersUsernames")[0 | t])),
                                            (s = 3 * Math.pow(c.asNumber(e.h[i].h.Lv0[8]) / 2 + 0.7, 1.6)),
                                            (e = a.engine.getGameAttribute("PlayerDATABASE")),
                                            (i = "" + h.string(a.engine.getGameAttribute("GetPlayersUsernames")[0 | t])),
                                            (r = 1 + (c.asNumber(e.h[i].h.Lv0[8]) * c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.Construction)) / 100),
                                            (_ = k._customBlock_StampBonusOfTypeX("BuildProd")),
                                            (e = a.engine.getGameAttribute("PlayerDATABASE")),
                                            (i = "" + h.string(a.engine.getGameAttribute("GetPlayersUsernames")[0 | t])),
                                            (o =
                                                1 +
                                                (_ +
                                                    0.25 * c.asNumber(e.h[i].h.PostOfficeInfo[17][0]) +
                                                    (p._customBlock_GuildBonuses(5) +
                                                        (w._customBlock_EtcBonuses("30") +
                                                            (Math.min(5, 5 * p._customBlock_AchieveStatus(153)) +
                                                                (p._customBlock_WorkbenchStuff("ConstMasteryBonus", 2, 0) +
                                                                    (c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchVials.h.Contspd) +
                                                                        p._customBlock_ArcadeBonus(44) +
                                                                        (m._customBlock_Summoning("VotingBonusz", 18, 0) +
                                                                            (m._customBlock_Summoning("VaultUpgBonus", 48, 0) * m._customBlock_Summoning("VaultKillzTotal", 11, 0) +
                                                                                m._customBlock_Bubbastuff("BubbaRoG_Bonuses", 1, 0))))))))) /
                                                    100),
                                            (_ =
                                                (1 + m._customBlock_Summoning("WinBonus", 13, 0) / 100) *
                                                (1 + m._customBlock_GamingStatType("PaletteBonus", 25, 0) / 100) *
                                                (1 + c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchVials.h["6turtle"]) / 100)),
                                            (u = "" + h.string(a.engine.getGameAttribute("CustomLists").h.TalentDescriptions[131][1][2])));
                                        var g = c.asNumber(a.engine.getGameAttribute("CustomLists").h.TalentDescriptions[131][1][0]),
                                            l = c.asNumber(a.engine.getGameAttribute("CustomLists").h.TalentDescriptions[131][1][1]);
                                        return (
                                            (e = a.engine.getGameAttribute("PlayerDATABASE")),
                                            (i = "" + h.string(a.engine.getGameAttribute("GetPlayersUsernames")[0 | t])),
                                            s *
                                                r *
                                                o *
                                                _ *
                                                (1 +
                                                    (x._customBlock_ArbitraryCode5Inputs(u, g, l, c.asNumber(e.h[i].h.SkillLevels[131]), 0, 0) *
                                                        (m._customBlock_AtomCollider("AtomBonuses", 1, 0) +
                                                            k._customBlock_getLOG(c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[5].behaviors.getBehavior("ActorEvents_232"), Na)._ItemsAndStorageOWNED.h.Refinery1)))) /
                                                        100)
                                        );
                                    }
                                    return (
                                        (e = a.engine.getGameAttribute("PlayerDATABASE")),
                                        (i = "" + h.string(a.engine.getGameAttribute("GetPlayersUsernames")[0 | t])),
                                        (s = 3 * Math.pow(c.asNumber(e.h[i].h.Lv0[8]) / 2 + 0.7, 1.6)),
                                        (e = a.engine.getGameAttribute("PlayerDATABASE")),
                                        (i = "" + h.string(a.engine.getGameAttribute("GetPlayersUsernames")[0 | t])),
                                        (r = 1 + (c.asNumber(e.h[i].h.Lv0[8]) * c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.Construction)) / 100),
                                        (_ = k._customBlock_StampBonusOfTypeX("BuildProd")),
                                        (e = a.engine.getGameAttribute("PlayerDATABASE")),
                                        (i = "" + h.string(a.engine.getGameAttribute("GetPlayersUsernames")[0 | t])),
                                        s *
                                            r *
                                            (1 +
                                                (_ +
                                                    (0.25 * c.asNumber(e.h[i].h.PostOfficeInfo[17][0]) +
                                                        (p._customBlock_GuildBonuses(5) +
                                                            (w._customBlock_EtcBonuses("30") +
                                                                (Math.min(5, 5 * p._customBlock_AchieveStatus(153)) +
                                                                    (p._customBlock_WorkbenchStuff("ConstMasteryBonus", 2, 0) + (c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchVials.h.Contspd) + p._customBlock_ArcadeBonus(44)))))))) /
                                                    100)
                                    );
                                }
                                return 1;
                            }
                            return "PlayerConExp" == e
                                ? 0 <= t
                                    ? a.engine.getGameAttribute("UserInfo")[0] == a.engine.getGameAttribute("GetPlayersUsernames")[0 | t]
                                        ? (Math.pow(p._customBlock_WorkbenchStuff("PlayerBuildSpd", t, 0), 0.7) / 2 + (2 + 6 * c.asNumber(a.engine.getGameAttribute("Lv0")[8]))) *
                                          (1 +
                                              (c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.conEXPACTIVE) +
                                                  (k._customBlock_GetTalentNumber(1, 132) +
                                                      k._customBlock_GetTalentNumber(1, 104) +
                                                      (c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchVials.h.ConsExp) +
                                                          (x._customBlock_ArbitraryCode("StatueBonusGiven18") +
                                                              (k._customBlock_StampBonusOfTypeX("ConstructionExp") +
                                                                  m._customBlock_Summoning("VotingBonusz", 18, 0) +
                                                                  (c.asNumber(a.engine.getGameAttribute("DNSM").h.StarSigns.h.ConstExp) + Math.max(0, 0.5 * (c.asNumber(a.engine.getGameAttribute("PostOfficeInfo")[3][17][0]) - 100)))))))) /
                                                  100) *
                                          (1 + m._customBlock_ResearchStuff("SmallCogBonusTOTAL", 2, 0) / 100)
                                        : ((a.engine.getGameAttribute("DNSM").h.ConstructDN2 = 0),
                                          (D.contains(a.engine.getGameAttribute("CauldronBubbles")[0 | t], "_11") || 1 == m._customBlock_Companions(4)) &&
                                              ((e = a.engine.getGameAttribute("PlayerDATABASE")),
                                              (i = "" + h.string(a.engine.getGameAttribute("GetPlayersUsernames")[0 | t])),
                                              18 > c.asNumber(e.h[i].h.CharacterClass)
                                                  ? ((e = a.engine.getGameAttribute("DNSM")),
                                                    (s =
                                                        q._customBlock_CauldronStats("BubbleBonus", 0, 11, 0) * Math.max(1, c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.Opassz)) +
                                                        c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchVials.h.ConsExp)))
                                                  : ((e = a.engine.getGameAttribute("DNSM")), (s = q._customBlock_CauldronStats("BubbleBonus", 0, 11, 0) + c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchVials.h.ConsExp))),
                                              (e.h.ConstructDN2 = s)),
                                          (e = a.engine.getGameAttribute("DNSM")),
                                          (s = c.asNumber(a.engine.getGameAttribute("DNSM").h.ConstructDN2)),
                                          (r = "" + h.string(a.engine.getGameAttribute("CustomLists").h.TalentDescriptions[132][1][2])),
                                          (_ = c.asNumber(a.engine.getGameAttribute("CustomLists").h.TalentDescriptions[132][1][0])),
                                          (o = c.asNumber(a.engine.getGameAttribute("CustomLists").h.TalentDescriptions[132][1][1])),
                                          (u = a.engine.getGameAttribute("PlayerDATABASE")),
                                          (i = "" + h.string(a.engine.getGameAttribute("GetPlayersUsernames")[0 | t])),
                                          (s += x._customBlock_ArbitraryCode5Inputs(r, _, o, c.asNumber(u.h[i].h.SkillLevels[132]), 0, 0)),
                                          (e.h.ConstructDN2 = s),
                                          (e = a.engine.getGameAttribute("DNSM")),
                                          (s = c.asNumber(a.engine.getGameAttribute("DNSM").h.ConstructDN2)),
                                          (u = a.engine.getGameAttribute("PlayerDATABASE")),
                                          (i = "" + h.string(a.engine.getGameAttribute("GetPlayersUsernames")[0 | t])),
                                          (r = c.asNumber(u.h[i].h.StatueLevels[18][0]) * c.asNumber(a.engine.getGameAttribute("CustomLists").h.StatueInfo[18][3])),
                                          (_ = k._customBlock_StampBonusOfTypeX("ConstructionExp") + m._customBlock_Summoning("VotingBonusz", 18, 0)),
                                          (u = a.engine.getGameAttribute("PlayerDATABASE")),
                                          (i = "" + h.string(a.engine.getGameAttribute("GetPlayersUsernames")[0 | t])),
                                          (o = (1 + (s + (r + (_ + Math.max(0, 0.5 * (c.asNumber(u.h[i].h.PostOfficeInfo[17][0]) - 100))))) / 100) * (1 + m._customBlock_ResearchStuff("SmallCogBonusTOTAL", 2, 0) / 100)),
                                          (e.h.ConstructDN2 = o),
                                          (e = a.engine.getGameAttribute("PlayerDATABASE")),
                                          (i = "" + h.string(a.engine.getGameAttribute("GetPlayersUsernames")[0 | t])),
                                          D.contains(e.h[i].h.PersonalValuesMap.h.StarSign, "45") && ((e = a.engine.getGameAttribute("DNSM")), (s = c.asNumber(a.engine.getGameAttribute("DNSM").h.ConstructDN2) + 25), (e.h.ConstructDN2 = s)),
                                          (s = Math.pow(p._customBlock_WorkbenchStuff("PlayerBuildSpd", t, 0), 0.7) / 2),
                                          (e = a.engine.getGameAttribute("PlayerDATABASE")),
                                          (i = "" + h.string(a.engine.getGameAttribute("GetPlayersUsernames")[0 | t])),
                                          (s + (2 + 6 * c.asNumber(e.h[i].h.Lv0[8]))) * c.asNumber(a.engine.getGameAttribute("DNSM").h.ConstructDN2))
                                    : 1
                                : "TowerBuildReq" == e
                                  ? 0 == t
                                      ? 2 * Math.pow(c.asNumber(a.engine.getGameAttribute("TowerInfo")[0 | t]) + 1, 2) * Math.pow(1.3, c.asNumber(a.engine.getGameAttribute("TowerInfo")[0 | t]) + 1)
                                      : c.asNumber(a.engine.getGameAttribute("CustomLists").h.RANDOlist[13][0 | t]) *
                                        Math.pow(c.asNumber(a.engine.getGameAttribute("CustomLists").h.TowerInfo[0 | t][9]), c.asNumber(a.engine.getGameAttribute("TowerInfo")[0 | t]))
                                  : "TowerSaltCost" == e
                                    ? Math.floor(
                                          Math.max(
                                              0.2,
                                              1 -
                                                  (Math.min(0.1, 0.1 * Math.floor((c.asNumber(a.engine.getGameAttribute("TowerInfo")[5]) + 999) / 1e3)) +
                                                      (Math.max(0, c.asNumber(a.engine.getGameAttribute("TowerInfo")[5]) - 1) * c.asNumber(a.engine.getGameAttribute("CustomLists").h.TowerInfo[5][2])) / 100)
                                          ) *
                                              c.asNumber(a.engine.getGameAttribute("CustomLists").h.TowerInfo[0 | t][6]) *
                                              (c.asNumber(a.engine.getGameAttribute("TowerInfo")[0 | t]) + 1)
                                      )
                                    : "TowerMatCost" == e
                                      ? Math.floor(
                                            Math.min(
                                                1e7,
                                                Math.max(
                                                    0.2,
                                                    1 -
                                                        (Math.min(0.1, 0.1 * Math.floor((c.asNumber(a.engine.getGameAttribute("TowerInfo")[5]) + 999) / 1e3)) +
                                                            (Math.max(0, c.asNumber(a.engine.getGameAttribute("TowerInfo")[5]) - 1) * c.asNumber(a.engine.getGameAttribute("CustomLists").h.TowerInfo[5][2])) / 100)
                                                ) *
                                                    c.asNumber(a.engine.getGameAttribute("CustomLists").h.TowerInfo[0 | t][7]) *
                                                    Math.pow(
                                                        c.asNumber(a.engine.getGameAttribute("CustomLists").h.TowerInfo[0 | t][9]) +
                                                            0.03 -
                                                            ((c.asNumber(a.engine.getGameAttribute("CustomLists").h.TowerInfo[0 | t][9]) + 0.03 - 1.05) * c.asNumber(a.engine.getGameAttribute("TowerInfo")[0 | t])) /
                                                                (c.asNumber(a.engine.getGameAttribute("CustomLists").h.TowerInfo[0 | t][8]) / 2 + c.asNumber(a.engine.getGameAttribute("TowerInfo")[0 | t])),
                                                        c.asNumber(a.engine.getGameAttribute("TowerInfo")[0 | t])
                                                    )
                                            )
                                        )
                                      : "TowerBuildSlots" == e
                                        ? Math.round(2 + (c.asNumber(a.engine.getGameAttribute("GemItemsPurchased")[117]) + Math.ceil(c.asNumber(a.engine.getGameAttribute("Tasks")[2][2][0]) / 2)))
                                        : "CogRewardPsuffix" == e
                                          ? 2 < t
                                              ? 4
                                              : 1.75 < t
                                                ? 3
                                                : 1.5 < t
                                                  ? 2
                                                  : 1.25 < t
                                                    ? 1
                                                    : 0
                                          : "SampleSizeBONUS" == e
                                            ? Math.min(
                                                  0.9,
                                                  (k._customBlock_GetTalentNumber(1, 635) +
                                                      (p._customBlock_SaltLick(0) + w._customBlock_EtcBonuses("60")) +
                                                      (c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.SampleSize) +
                                                          (k._customBlock_GetTalentNumber(1, 133) +
                                                              Math.min(1, p._customBlock_AchieveStatus(158)) +
                                                              (c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchVials.h.SampleSize) +
                                                                  (p._customBlock_prayersReal(9, 0) +
                                                                      (k._customBlock_StampBonusOfTypeX("SampleRate") +
                                                                          (Math.min(5, 0.5 * c.asNumber(a.engine.getGameAttribute("Tasks")[2][2][4])) +
                                                                              (Math.min(5, c.asNumber(a.engine.getGameAttribute("DNSM").h.FamBonusQTYs.h[6])) +
                                                                                  (p._customBlock_ArcadeBonus(5) + c.asNumber(a.engine.getGameAttribute("DNSM").h.BoxRewards.h["13a"])))))))))) /
                                                      100
                                              )
                                            : "PrinterSampleSlots" == e
                                              ? Math.round(4 + c.asNumber(a.engine.getGameAttribute("GemItemsPurchased")[112]))
                                              : "PrinterBigSlots" == e
                                                ? Math.round(1 + c.asNumber(a.engine.getGameAttribute("GemItemsPurchased")[111]))
                                                : "AdditionExtraPrinting" == e
                                                  ? (1 + (c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[125]) * (2 + m._customBlock_Sailing("ArtifactBonus", 4, 1))) / 100) *
                                                    (1 + (p._customBlock_getbonus2(1, 178, -1) * k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[138]))) / 100) *
                                                    (1 + (m._customBlock_RiftStuff("RiftSkillETC", 3) + m._customBlock_Ninja("PristineBon", 15, 0)) / 100) *
                                                    (1 + m._customBlock_Summoning("VotingBonusz", 11, 0) / 100) *
                                                    (1 + (2 * c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[323]) * m._customBlock_Summoning("EventShopOwned", 4, 0)) / 100) *
                                                    (1 + (c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[354]) * m._customBlock_Companions(17)) / 100) *
                                                    (1 + (c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[364]) * m._customBlock_Windwalker("CompassBonus", 43, 0)) / 100)
                                                  : "AdditionExtraEXPnDR" == e
                                                    ? 1 + (p._customBlock_getbonus2(1, 328, -1) * k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[139]))) / 100
                                                    : "AdditionExtraDMG" == e
                                                      ? (1 + (p._customBlock_getbonus2(1, 508, -1) * k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[152]))) / 100) *
                                                        (1 + (p._customBlock_getbonus2(1, 208, -1) * k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[329]))) / 100)
                                                      : "ExtraPrinting" == e
                                                        ? (2 == p._customBlock_MainframeBonus(1)
                                                              ? ((e = a.engine.getGameAttribute("PlayerDATABASE")),
                                                                (i = "" + h.string(a.engine.getGameAttribute("GetPlayersUsernames")[0 | t])),
                                                                (s = "Laboratory" == e.h[i].h.AFKtarget || 1 == m._customBlock_Divinity("Bonus_MAJOR", t, 2)))
                                                              : (s = !1),
                                                          s
                                                              ? 1 == m._customBlock_Divinity("Bonus_MAJOR", t, 3)
                                                                  ? 6 * p._customBlock_WorkbenchStuff("AdditionExtraPrinting", 0, 0)
                                                                  : 2 * p._customBlock_WorkbenchStuff("AdditionExtraPrinting", 0, 0)
                                                              : 1 == m._customBlock_Divinity("Bonus_MAJOR", t, 3)
                                                                ? 3 * p._customBlock_WorkbenchStuff("AdditionExtraPrinting", 0, 0)
                                                                : p._customBlock_WorkbenchStuff("AdditionExtraPrinting", 0, 0))
                                                        : "ShrineExpBonus" == e
                                                          ? (1 + (50 * m._customBlock_GamingStatType("SuperBitType", 8, 0)) / 100) *
                                                            (1 + (m._customBlock_Sailing("ArtifactBonus", 0, 1) + 15 * m._customBlock_RiftStuff("RiftSkillBonus,7", 1)) / 100) *
                                                            (1 + m._customBlock_Summoning("VotingBonusz", 19, 0) / 100) *
                                                            (1 + (10 * c.asNumber(a.engine.getGameAttribute("TowerInfo")[(t + 18) | 0])) / 100) *
                                                            (1 +
                                                                (p._customBlock_Shrine(2) +
                                                                    (c.asNumber(a.engine.getGameAttribute("DNSM").h.BoxRewards.h["17b"]) +
                                                                        (q._customBlock_GoldFoodBonuses("ShrineEffect") + (k._customBlock_GetTalentNumber(1, 639) + c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchVials.h.ShrineSpd))))) /
                                                                    100)
                                                          : "ShrineHrREQ" == e
                                                            ? 20 > t
                                                                ? Math.floor(20 * (t - 1) + 6 * t * Math.pow(1.63, t - 1))
                                                                : 20 * (t - 1) + 6 * t * Math.pow(1.63, t - 1)
                                                            : "BookReqTime" == e
                                                              ? Math.round(
                                                                    (3600 /
                                                                        ((1 + q._customBlock_MealBonus("Lib") / 100) *
                                                                            (1 + m._customBlock_AtomCollider("AtomBonuses", 7, 0) / 100) *
                                                                            (1 +
                                                                                (5 * c.asNumber(a.engine.getGameAttribute("TowerInfo")[1]) +
                                                                                    c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.booksSpeed) +
                                                                                    (c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchVials.h.TalBookSpd) +
                                                                                        (k._customBlock_StampBonusOfTypeX("BookSpd") +
                                                                                            Math.min(30, Math.max(0, 30 * p._customBlock_AchieveStatus(145))) +
                                                                                            m._customBlock_GamingStatType("SuperBitType", 12, 0) * c.asNumber(a.engine.getGameAttribute("Lv0")[15])))) /
                                                                                    100))) *
                                                                        4 *
                                                                        (1 + (10 * Math.pow(c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[55]), 1.4)) / 100)
                                                                )
                                                              : "minBookLv" == e
                                                                ? Math.round(
                                                                      101 + 5 * c.asNumber(a.engine.getGameAttribute("GemItemsPurchased")[113]) + (q._customBlock_GetBribeBonus("18") + c.asNumber(a.engine.getGameAttribute("Atoms")[7]))
                                                                  )
                                                                : "maxBookLv" == e
                                                                  ? Math.round(
                                                                        125 +
                                                                            m._customBlock_Sailing("ArtifactBonus", 21, 0) +
                                                                            m._customBlock_Summoning("WinBonus", 19, 0) +
                                                                            10 * Math.min(c.asNumber(a.engine.getGameAttribute("Atoms")[7]), 1) +
                                                                            (Math.min(5, Math.max(0, 5 * p._customBlock_AchieveStatus(145))) +
                                                                                p._customBlock_SaltLick(4) +
                                                                                c.asNumber(a.engine.getGameAttribute("CustomLists").h.TaskShopDesc[2][2][11]) * c.asNumber(a.engine.getGameAttribute("Tasks")[2][2][2]))
                                                                    )
                                                                  : "ConstructHUDhideText" == e
                                                                    ? 5 > t - 9 * Math.floor(t / 9)
                                                                        ? (i >= t - 9 * Math.floor(t / 18) + 1 && i <= t - 9 * Math.floor(t / 18) + 4) || (i >= t - 9 * Math.floor(t / 18) + 10 && i <= t - 9 * Math.floor(t / 18) + 13)
                                                                            ? 1
                                                                            : 0
                                                                        : (i >= t - 9 * Math.floor(t / 18) - 4 && i <= t - 9 * Math.floor(t / 18) - 1) || (i >= t - 9 * Math.floor(t / 18) + 5 && i <= t - 9 * Math.floor(t / 18) + 8)
                                                                          ? 1
                                                                          : 0
                                                                    : 1;
                        }
