/**
 * Game formula snippet — idleon-efficiency formula research.
 * Function: _customBlock_GetTalentNumber (from scripts.ActorEvents_124)
 * Game version: 1.20 ("Royal_Guardian")
 * Captured: 2026-08-29 via game-debug-tool (findFunction + toString)
 * Case reference: #354
 */
function (e, t) {
                            return 0 >= c.asNumber(a.engine.getGameAttribute("SkillLevels")[0 | t])
                                ? 0
                                : 0 < p._customBlock_Dungon()
                                  ? 1 == e
                                      ? x._customBlock_ArbitraryCode5Inputs(
                                            "" + h.string(a.engine.getGameAttribute("CustomLists").h.TalentDescriptions[0 | t][1][2]),
                                            c.asNumber(a.engine.getGameAttribute("CustomLists").h.TalentDescriptions[0 | t][1][0]),
                                            c.asNumber(a.engine.getGameAttribute("CustomLists").h.TalentDescriptions[0 | t][1][1]),
                                            50,
                                            0,
                                            0
                                        )
                                      : x._customBlock_ArbitraryCode5Inputs(
                                            "" + h.string(a.engine.getGameAttribute("CustomLists").h.TalentDescriptions[0 | t][1][5]),
                                            c.asNumber(a.engine.getGameAttribute("CustomLists").h.TalentDescriptions[0 | t][1][3]),
                                            c.asNumber(a.engine.getGameAttribute("CustomLists").h.TalentDescriptions[0 | t][1][4]),
                                            50,
                                            0,
                                            0
                                        )
                                  : 1 == e
                                    ? x._customBlock_ArbitraryCode5Inputs(
                                          "" + h.string(a.engine.getGameAttribute("CustomLists").h.TalentDescriptions[0 | t][1][2]),
                                          c.asNumber(a.engine.getGameAttribute("CustomLists").h.TalentDescriptions[0 | t][1][0]),
                                          c.asNumber(a.engine.getGameAttribute("CustomLists").h.TalentDescriptions[0 | t][1][1]),
                                          x._customBlock_RunCodeOfTypeXforThingY("AllTalentLV", "" + t) + c.asNumber(a.engine.getGameAttribute("SkillLevels")[0 | t]),
                                          0,
                                          0
                                      )
                                    : x._customBlock_ArbitraryCode5Inputs(
                                          "" + h.string(a.engine.getGameAttribute("CustomLists").h.TalentDescriptions[0 | t][1][5]),
                                          c.asNumber(a.engine.getGameAttribute("CustomLists").h.TalentDescriptions[0 | t][1][3]),
                                          c.asNumber(a.engine.getGameAttribute("CustomLists").h.TalentDescriptions[0 | t][1][4]),
                                          x._customBlock_RunCodeOfTypeXforThingY("AllTalentLV", "" + t) + c.asNumber(a.engine.getGameAttribute("SkillLevels")[0 | t]),
                                          0,
                                          0
                                      );
                        }