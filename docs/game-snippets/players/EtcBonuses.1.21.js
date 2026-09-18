/**
 * Game formula snippet — idleon-efficiency formula research.
 * Function: _customBlock_EtcBonuses (from scripts.ActorEvents_266)
 * Game version: 1.21 ("World_7_Taskmaster")
 * Captured: 2026-09-16 via game-debug-tool (findFunction + toString)
 * Case reference: correctness case issue 376
 */
function (e) {
                            var t = a.engine.getGameAttribute("DNSM").h.TotalStatsETCmap,
                                i = "" + h.string(a.engine.getGameAttribute("CustomMaps").h.IDforETCbonus.h[e]);
                            return Object.prototype.hasOwnProperty.call(t.h, i) ? ((t = a.engine.getGameAttribute("DNSM").h.TotalStatsETCmap), (i = "" + h.string(a.engine.getGameAttribute("CustomMaps").h.IDforETCbonus.h[e])), t.h[i]) : 0;
                        }
