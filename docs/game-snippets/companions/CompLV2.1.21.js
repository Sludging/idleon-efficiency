/**
 * Game formula snippet — idleon-efficiency formula research.
 * Function: _customBlock_CompLV2 (from scripts.ActorEvents_579)
 * Game version: 1.21 ("World_7_Taskmaster")
 * Captured: 2026-09-12 via game-debug-tool (findFunction + toString)
 * Case reference: #385
 */
function (e) {
                            var t = a.engine.getGameAttribute("DNSM");
                            return Object.prototype.hasOwnProperty.call(t.h, "CompanionBon")
                                ? ((t = a.engine.getGameAttribute("DNSM")), Object.prototype.hasOwnProperty.call(t.h, "CompanionLVz") && 1 <= c.asNumber(a.engine.getGameAttribute("DNSM").h.CompanionLVz.h["" + e]) ? 1 : 0)
                                : 0;
                        }