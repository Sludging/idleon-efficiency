/**
 * Game formula snippet — idleon-efficiency formula research.
 * Function: _customBlock_EtcBonuses (from scripts.ActorEvents_266)
 * Game version: 1.22 ("Jelly_Operator")
 * Captured: 2026-09-19 via game-debug-tool (findFunction + toString)
 * Case reference: correctness case issue 376
 */
function (e) {
                            var t = a.engine.getGameAttribute("DNSM").h.TotalStatsETCmap,
                                i = "" + h.string(a.engine.getGameAttribute("CustomMaps").h.IDforETCbonus.h[e]);
                            return Object.prototype.hasOwnProperty.call(t.h, i) ? ((t = a.engine.getGameAttribute("DNSM").h.TotalStatsETCmap), (i = "" + h.string(a.engine.getGameAttribute("CustomMaps").h.IDforETCbonus.h[e])), t.h[i]) : 0;
                        }
