/**
 * Game formula snippet — idleon-efficiency formula research.
 * Function: _customBlock_FamilyBonsuesREAL (from scripts.ActorEvents_266)
 * Game version: 1.22 ("Jelly_Operator")
 * Captured: 2026-09-20 via game-debug-tool (findFunction + toString)
 * Case reference: correctness case issue 377
 */
function (e, t, i) {
                            var n = a.engine.getGameAttribute("DNSM"),
                                s = a.engine.getGameAttribute("CustomLists").h.ClassFamilyBonuses[0 | e];
                            return (
                                (n.h.FamBonusLz = s),
                                0 == t
                                    ? x._customBlock_ArbitraryCode5Inputs(
                                          "" + h.string(a.engine.getGameAttribute("DNSM").h.FamBonusLz[3]),
                                          c.asNumber(a.engine.getGameAttribute("DNSM").h.FamBonusLz[1]),
                                          c.asNumber(a.engine.getGameAttribute("DNSM").h.FamBonusLz[2]),
                                          Math.max(0, Math.round(i - c.asNumber(a.engine.getGameAttribute("CustomLists").h.ClassAccountBonus[0 | e][1]))),
                                          0,
                                          0
                                      )
                                    : x._customBlock_ArbitraryCode5Inputs(
                                          "" + h.string(a.engine.getGameAttribute("DNSM").h.FamBonusLz[6]),
                                          c.asNumber(a.engine.getGameAttribute("DNSM").h.FamBonusLz[4]),
                                          c.asNumber(a.engine.getGameAttribute("DNSM").h.FamBonusLz[5]),
                                          Math.max(0, Math.round(i - c.asNumber(a.engine.getGameAttribute("CustomLists").h.ClassAccountBonus[0 | e][1]))),
                                          0,
                                          0
                                      )
                            );
                        }
