/**
 * Game formula snippet — idleon-efficiency formula research.
 * Function: _customBlock_WorshipStuff (from scripts.ActorEvents_345)
 * Game version: 1.20 ("Royal_Guardian")
 * Captured: 2026-09-04 via game-debug-tool (findFunction + toString)
 * Case reference: #350
 */
function (e, t) {
                            return "NextWaveCountdown" == e
                                ? 0 == t % 10 && 0 != t
                                    ? 9999
                                    : 19 < Math.floor(t / 10)
                                      ? 25 + 5 * Math.floor((t - 10) / 10)
                                      : 9 < t
                                        ? 25
                                        : 4 < t
                                          ? 20
                                          : 0.5 < t
                                            ? 15
                                            : 6
                                : "TotemHPtotal" == e
                                  ? 5 * m._customBlock_GamingStatType("SuperBitType", 6, 0) + 10 * m._customBlock_GamingStatType("SuperBitType", 15, 0) + 5
                                  : "waveAdjustment" == e
                                    ? Math.round(
                                          t -
                                              Math.floor(
                                                  Math.max(
                                                      t -
                                                          (a.engine.getGameAttribute("CustomLists").h.WorshipInfo[0 | p._customBlock_WorshipStuff("TrialType", a.engine.getGameAttribute("CurrentMap"))].length -
                                                              c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[7].behaviors.getBehavior("ActorEvents_340"), ma)._GenINFO[62])),
                                                      0
                                                  ) / c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[7].behaviors.getBehavior("ActorEvents_340"), ma)._GenINFO[62])
                                              ) *
                                                  c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[7].behaviors.getBehavior("ActorEvents_340"), ma)._GenINFO[62])
                                      )
                                    : "waveAdjustmentTIER" == e
                                      ? Math.floor(
                                            Math.max(
                                                t -
                                                    (a.engine.getGameAttribute("CustomLists").h.WorshipInfo[0 | p._customBlock_WorshipStuff("TrialType", a.engine.getGameAttribute("CurrentMap"))].length -
                                                        c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[7].behaviors.getBehavior("ActorEvents_340"), ma)._GenINFO[62])),
                                                0
                                            ) / c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[7].behaviors.getBehavior("ActorEvents_340"), ma)._GenINFO[62])
                                        )
                                      : "NewTowerCost" == e
                                        ? Math.floor(
                                              p._customBlock_TowerStats("BaseTowerCost", t, 1) *
                                                  Math.ceil((n.__cast(a.engine.getGameAttribute("PixelHelperActor")[7].behaviors.getBehavior("ActorEvents_340"), ma)._GenINFO[56].length + 1) / 3) +
                                                  2 *
                                                      Math.pow(
                                                          1.3 + 0.03 * n.__cast(a.engine.getGameAttribute("PixelHelperActor")[7].behaviors.getBehavior("ActorEvents_340"), ma)._GenINFO[56].length,
                                                          n.__cast(a.engine.getGameAttribute("PixelHelperActor")[7].behaviors.getBehavior("ActorEvents_340"), ma)._GenINFO[56].length
                                                      )
                                          )
                                        : "isTowerUnlocked?" == e
                                          ? 1 <= c.asNumber(a.engine.getGameAttribute("TowerInfo")[(9 + t) | 0])
                                              ? 1
                                              : 0
                                          : "TrialType" == e
                                            ? 100 == a.engine.getGameAttribute("CurrentMap") && -1 != n.__cast(a.engine.getGameAttribute("PixelHelperActor")[8].behaviors.getBehavior("ActorEvents_481"), na)._GenINFO[57]
                                                ? n.__cast(a.engine.getGameAttribute("PixelHelperActor")[8].behaviors.getBehavior("ActorEvents_481"), na)._GenINFO[57]
                                                : ((e = a.engine.getGameAttribute("CustomMaps").h.WorshipMapType), Object.prototype.hasOwnProperty.call(e.h, "" + t) ? a.engine.getGameAttribute("CustomMaps").h.WorshipMapType.h["" + t] : 0)
                                            : "ExpRewards" == e
                                              ? Math.floor(
                                                    15 *
                                                        Math.pow(p._customBlock_WorshipStuff("TrialType", a.engine.getGameAttribute("CurrentMap")) + 1, 2) *
                                                        x._customBlock_skillstats2("WorshipEXPmulti") *
                                                        Math.pow(p._customBlock_WorshipStuff("WaveMultiplier", 0), 0.9)
                                                )
                                              : "SoulRewards" == e
                                                ? Math.floor(
                                                      5 *
                                                          (1 + p._customBlock_WorshipStuff("EfficiencyBonusQTY", 0) / 100) *
                                                          p._customBlock_WorshipStuff("WaveMultiplier", 0) *
                                                          (1 +
                                                              (q._customBlock_TotalFoodBonuses("WorshipSoulBoosts") + (m._customBlock_GetSetBonus("DEMENTIA_SET", "Bonus", 0, 0) + m._customBlock_Bubbastuff("BubbaRoG_Bonuses", 3, 0))) /
                                                                  100) *
                                                          (1 + k._customBlock_TalentCalc(57) / 100) *
                                                          (1 + p._customBlock_ArcadeBonus(24) / 100) *
                                                          (1 + m._customBlock_Summoning("VaultUpgBonus", 50, 0) / 100)
                                                  )
                                                : "WaveMultiplier" == e
                                                  ? 0 == a.engine.getGameAttribute("TotemInfo")[0][0 | p._customBlock_WorshipStuff("TrialType", a.engine.getGameAttribute("CurrentMap"))]
                                                      ? 0
                                                      : Math.pow((5 + c.asNumber(a.engine.getGameAttribute("TotemInfo")[0][0 | p._customBlock_WorshipStuff("TrialType", a.engine.getGameAttribute("CurrentMap"))])) / 10, 2.6)
                                                  : "EfficiencyBonusQTY" == e
                                                    ? x._customBlock_skillstats2("WorshipEfficiency") >=
                                                      c.asNumber(a.engine.getGameAttribute("CustomLists").h.WorshipBASEinfos[0 | p._customBlock_WorshipStuff("TrialType", a.engine.getGameAttribute("CurrentMap"))][7])
                                                        ? Math.floor(
                                                              100 *
                                                                  Math.pow(
                                                                      x._customBlock_skillstats2("WorshipEfficiency") /
                                                                          (10 *
                                                                              c.asNumber(
                                                                                  a.engine.getGameAttribute("CustomLists").h.WorshipBASEinfos[0 | p._customBlock_WorshipStuff("TrialType", a.engine.getGameAttribute("CurrentMap"))][7]
                                                                              )),
                                                                      0.25
                                                                  )
                                                          )
                                                        : 0
                                                    : "SkullPts" == e
                                                      ? 4 == t
                                                          ? 8
                                                          : 3 == t
                                                            ? 5
                                                            : 2 == t
                                                              ? 3
                                                              : 1 == t
                                                                ? 2
                                                                : 1
                                                      : "SkullCurrency" == e
                                                        ? 6 <= t
                                                            ? Math.floor(
                                                                  (250 * Math.pow(Math.round(t - 6), 1.5) +
                                                                      Math.floor(c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[7].behaviors.getBehavior("ActorEvents_340"), ma)._GenINFO[8]) / 1)) *
                                                                      (1 + p._customBlock_SaltLick(6) / 100)
                                                              )
                                                            : 5 == t
                                                              ? Math.floor(
                                                                    (150 + Math.floor(c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[7].behaviors.getBehavior("ActorEvents_340"), ma)._GenINFO[8]) / 1)) *
                                                                        (1 + p._customBlock_SaltLick(6) / 100)
                                                                )
                                                              : 4 == t
                                                                ? Math.floor(
                                                                      (70 + Math.floor(c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[7].behaviors.getBehavior("ActorEvents_340"), ma)._GenINFO[8]) / 1)) *
                                                                          (1 + p._customBlock_SaltLick(6) / 100)
                                                                  )
                                                                : 3 == t
                                                                  ? Math.floor(
                                                                        (25 + Math.floor(c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[7].behaviors.getBehavior("ActorEvents_340"), ma)._GenINFO[8]) / 2)) *
                                                                            (1 + p._customBlock_SaltLick(6) / 100)
                                                                    )
                                                                  : 2 == t
                                                                    ? Math.round(
                                                                          (10 + Math.floor(c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[7].behaviors.getBehavior("ActorEvents_340"), ma)._GenINFO[8]) / 3)) *
                                                                              (1 + p._customBlock_SaltLick(6) / 100)
                                                                      )
                                                                    : 1 == t
                                                                      ? Math.round(
                                                                            (5 + Math.floor(c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[7].behaviors.getBehavior("ActorEvents_340"), ma)._GenINFO[8]) / 4)) *
                                                                                (1 + p._customBlock_SaltLick(6) / 100)
                                                                        )
                                                                      : Math.round(
                                                                            (2 + Math.floor(c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[7].behaviors.getBehavior("ActorEvents_340"), ma)._GenINFO[8]) / 5)) *
                                                                                (1 + p._customBlock_SaltLick(6) / 100)
                                                                        )
                                                        : "SkullTypeHP" == e
                                                          ? 500 < t
                                                              ? 4
                                                              : 100 < t
                                                                ? 3
                                                                : 20 < t
                                                                  ? 2
                                                                  : 4 < t
                                                                    ? 1
                                                                    : 0
                                                          : "TowerCritDmg" == e
                                                            ? 1.5
                                                            : "PrayerCost" == e
                                                              ? 6 > c.asNumber(a.engine.getGameAttribute("PrayersUnlocked")[0 | t])
                                                                  ? Math.round(
                                                                        c.asNumber(a.engine.getGameAttribute("CustomLists").h.PrayerInfo[0 | t][6]) * (1 + (4 + t / 25) * c.asNumber(a.engine.getGameAttribute("PrayersUnlocked")[0 | t]))
                                                                    )
                                                                  : 9 == t
                                                                    ? Math.round(
                                                                          Math.min(
                                                                              2e9,
                                                                              c.asNumber(a.engine.getGameAttribute("CustomLists").h.PrayerInfo[0 | t][6]) *
                                                                                  (1 + (2 + t / 20) * c.asNumber(a.engine.getGameAttribute("PrayersUnlocked")[0 | t])) *
                                                                                  Math.pow(1.3, c.asNumber(a.engine.getGameAttribute("PrayersUnlocked")[0 | t]) - 5)
                                                                          )
                                                                      )
                                                                    : Math.round(
                                                                          Math.min(
                                                                              2e9,
                                                                              c.asNumber(a.engine.getGameAttribute("CustomLists").h.PrayerInfo[0 | t][6]) *
                                                                                  (1 + (1 + t / 20) * c.asNumber(a.engine.getGameAttribute("PrayersUnlocked")[0 | t])) *
                                                                                  Math.pow(1.12, c.asNumber(a.engine.getGameAttribute("PrayersUnlocked")[0 | t]) - 5)
                                                                          )
                                                                      )
                                                              : 69420;
                        }