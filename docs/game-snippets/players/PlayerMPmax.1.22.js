/**
 * Game formula snippet — idleon-efficiency formula research.
 * Function: _customBlock_PlayerMPmax (from scripts.ActorEvents_12)
 * Game version: 1.22 ("Jelly_Operator")
 * Captured: 2026-09-24 via game-debug-tool (findFunction + toString)
 * Case reference: #356
 */
function () {
                            return -1 != p._customBlock_Dungon()
                                ? p._customBlock_DungeonStat("MP")
                                : ((a.engine.getGameAttribute("DummyNumbersStatManager").h.PlayerMPmaxLIST = []),
                                  (a.engine.getGameAttribute("DummyNumbersStatManager").h.PlayerMPmaxDN = 1),
                                  a.engine
                                      .getGameAttribute("DummyNumbersStatManager")
                                      .h.PlayerMPmaxLIST.push(
                                          10 +
                                              w._customBlock_CardBonusREAL(3) +
                                              c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.BaseMP) +
                                              k._customBlock_StampBonusOfTypeX("BaseMP") +
                                              (k._customBlock_GetTalentNumber(1, 1) + (x._customBlock_TotalStats("WIS") + c.asNumber(a.engine.getGameAttribute("DNSM").h.BoxRewards.h.baseMP)))
                                      ),
                                  (a.engine.getGameAttribute("DummyNumbersStatManager").h.PlayerMPmaxDN = 1),
                                  a.engine
                                      .getGameAttribute("DummyNumbersStatManager")
                                      .h.PlayerMPmaxLIST.push(
                                          (1 + (k._customBlock_GetTalentNumber(1, 452) + k._customBlock_GetTalentNumber(1, 272)) / 100) *
                                              (1 + (c.asNumber(a.engine.getGameAttribute("DNSM").h.BoxRewards.h.pctMP) + w._customBlock_CardBonusREAL(29)) / 100)
                                      ),
                                  a.engine.getGameAttribute("DummyNumbersStatManager").h.PlayerMPmaxLIST.push(1),
                                  c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.PlayerMPmaxLIST[0]) *
                                      c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.PlayerMPmaxLIST[1]) *
                                      c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.PlayerMPmaxLIST[2]));
                        }
