/**
 * Game formula snippet — idleon-efficiency formula research.
 * Function: _customBlock_MainframeBonus (from scripts.ActorEvents_345)
 * Game version: 1.19 ("Summer_Event")
 * Captured: 2026-08-25 via game-debug-tool (findFunction + toString)
 * Case reference: #358
 */
function (e) {
                            if (e >= a.engine.getGameAttribute("CustomLists").h.LabMainBonus.length && 99 > e) return 0;
                            var t = a.engine.getGameAttribute("DNSM");
                            return Object.prototype.hasOwnProperty.call(t.h, "LabMFbonuses")
                                ? 0 == D.mapCount(a.engine.getGameAttribute("DNSM").h.LabMFbonuses)
                                    ? 100 > e
                                        ? c.asNumber(a.engine.getGameAttribute("CustomLists").h.LabMainBonus[0 | e][4])
                                        : 0
                                    : ((t = a.engine.getGameAttribute("DNSM").h.LabMFbonuses),
                                      Object.prototype.hasOwnProperty.call(t.h, "YES")
                                          ? a.engine.getGameAttribute("DNSM").h.LabMFbonuses.h["" + e]
                                          : 100 > e
                                            ? 1 == n.__cast(a.engine.getGameAttribute("PixelHelperActor")[22].behaviors.getBehavior("ActorEvents_548"), jb)._GenINFO[92][0 | e]
                                                ? 9 == e
                                                    ? c.asNumber(a.engine.getGameAttribute("CustomLists").h.LabMainBonus[0 | e][5]) + p._customBlock_MainframeBonus(113)
                                                    : 0 == e
                                                      ? (c.asNumber(a.engine.getGameAttribute("CustomLists").h.LabMainBonus[0 | e][5]) + p._customBlock_MainframeBonus(101)) * p._customBlock_Breeding("TotPetsFound", "0", 0, 0)
                                                      : 3 == e
                                                        ? c.asNumber(a.engine.getGameAttribute("CustomLists").h.LabMainBonus[0 | e][5]) + p._customBlock_MainframeBonus(107)
                                                        : 11 == e
                                                          ? c.asNumber(a.engine.getGameAttribute("CustomLists").h.LabMainBonus[0 | e][5]) + p._customBlock_MainframeBonus(117)
                                                          : 13 == e
                                                            ? c.asNumber(a.engine.getGameAttribute("CustomLists").h.LabMainBonus[0 | e][5])
                                                            : 15 == e
                                                              ? c.asNumber(a.engine.getGameAttribute("CustomLists").h.LabMainBonus[0 | e][5]) + p._customBlock_MainframeBonus(118)
                                                              : 17 == e
                                                                ? c.asNumber(a.engine.getGameAttribute("CustomLists").h.LabMainBonus[0 | e][5]) + p._customBlock_MainframeBonus(120)
                                                                : 8 == e
                                                                  ? c.asNumber(a.engine.getGameAttribute("CustomLists").h.LabMainBonus[0 | e][5]) + p._customBlock_MainframeBonus(119) / 100
                                                                  : c.asNumber(a.engine.getGameAttribute("CustomLists").h.LabMainBonus[0 | e][5])
                                                : c.asNumber(a.engine.getGameAttribute("CustomLists").h.LabMainBonus[0 | e][4])
                                            : 1 ==
                                                n.__cast(a.engine.getGameAttribute("PixelHelperActor")[22].behaviors.getBehavior("ActorEvents_548"), jb)._GenINFO[92][
                                                    (e - 100 + a.engine.getGameAttribute("CustomLists").h.LabMainBonus.length) | 0
                                                ]
                                              ? 100 == e
                                                  ? 0 < p._customBlock_MainframeBonus(101) && 0 < p._customBlock_MainframeBonus(102)
                                                      ? 2 * c.asNumber(a.engine.getGameAttribute("CustomLists").h.JewelDesc[(e - 100) | 0][12]) * p._customBlock_MainframeBonus(8)
                                                      : c.asNumber(a.engine.getGameAttribute("CustomLists").h.JewelDesc[(e - 100) | 0][12]) * p._customBlock_MainframeBonus(8)
                                                  : 103 == e
                                                    ? 0 < p._customBlock_MainframeBonus(104) && 0 < p._customBlock_MainframeBonus(105) && 0 < p._customBlock_MainframeBonus(106)
                                                        ? 2 * c.asNumber(a.engine.getGameAttribute("CustomLists").h.JewelDesc[(e - 100) | 0][12]) * p._customBlock_MainframeBonus(8)
                                                        : c.asNumber(a.engine.getGameAttribute("CustomLists").h.JewelDesc[(e - 100) | 0][12]) * p._customBlock_MainframeBonus(8)
                                                    : 110 == e
                                                      ? 0 < p._customBlock_MainframeBonus(107) && 0 < p._customBlock_MainframeBonus(108) && 0 < p._customBlock_MainframeBonus(109)
                                                          ? 2 * c.asNumber(a.engine.getGameAttribute("CustomLists").h.JewelDesc[(e - 100) | 0][12]) * p._customBlock_MainframeBonus(8)
                                                          : c.asNumber(a.engine.getGameAttribute("CustomLists").h.JewelDesc[(e - 100) | 0][12]) * p._customBlock_MainframeBonus(8)
                                                      : 112 == e
                                                        ? 0 < p._customBlock_MainframeBonus(111) && 0 < p._customBlock_MainframeBonus(113) && 0 < p._customBlock_MainframeBonus(114) && 0 < p._customBlock_MainframeBonus(115)
                                                            ? 2 * c.asNumber(a.engine.getGameAttribute("CustomLists").h.JewelDesc[(e - 100) | 0][12]) * p._customBlock_MainframeBonus(8)
                                                            : c.asNumber(a.engine.getGameAttribute("CustomLists").h.JewelDesc[(e - 100) | 0][12]) * p._customBlock_MainframeBonus(8)
                                                        : 119 == e
                                                          ? c.asNumber(a.engine.getGameAttribute("CustomLists").h.JewelDesc[(e - 100) | 0][12])
                                                          : c.asNumber(a.engine.getGameAttribute("CustomLists").h.JewelDesc[(e - 100) | 0][12]) * p._customBlock_MainframeBonus(8)
                                              : 0)
                                : 100 > e
                                  ? c.asNumber(a.engine.getGameAttribute("CustomLists").h.LabMainBonus[0 | e][4])
                                  : 0;
                        }