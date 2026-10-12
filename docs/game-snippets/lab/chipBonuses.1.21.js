/**
 * Game formula snippet — idleon-efficiency formula research.
 * Function: _customBlock_chipBonuses (from scripts.ActorEvents_189)
 * Game version: 1.21 ("World_7_Taskmaster")
 * Captured: 2026-09-16 via game-debug-tool (findFunction + toString)
 * Case reference: correctness case issue 379
 */
function (e) {
                            var t = a.engine.getGameAttribute("DNSM");
                            return Object.prototype.hasOwnProperty.call(t.h, "ChipBbonusz")
                                ? a.engine.getGameAttribute("UserInfo")[0] != a.engine.getGameAttribute("DNSM").h.ChipBbonusz.h.PlayerNAME
                                    ? (p._customBlock_ActionBlock("RecalcChipBonuses", "0", 0, 0),
                                      (t = a.engine.getGameAttribute("DNSM")),
                                      Object.prototype.hasOwnProperty.call(t.h, "ChipBbonusz") ? c.asNumber(a.engine.getGameAttribute("DNSM").h.ChipBbonusz.h[e]) : 0)
                                    : c.asNumber(a.engine.getGameAttribute("DNSM").h.ChipBbonusz.h[e])
                                : (p._customBlock_ActionBlock("RecalcChipBonuses", "0", 0, 0),
                                  (t = a.engine.getGameAttribute("DNSM")),
                                  Object.prototype.hasOwnProperty.call(t.h, "ChipBbonusz") ? c.asNumber(a.engine.getGameAttribute("DNSM").h.ChipBbonusz.h[e]) : 0);
                        }
