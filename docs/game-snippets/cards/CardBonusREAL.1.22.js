/**
 * Game formula snippet — idleon-efficiency formula research.
 * Function: _customBlock_CardBonusREAL (from ActorEvents_266)
 * Game version: 1.22 (offline server, port 3101; user-provided version assertion)
 * Captured: 2026-10-13 via game-debug-tool (findFunction + toString)
 * Case reference: correctness case issue 460
 */
function(e){var t=a.engine.getGameAttribute("DNSM"),i=a.engine.getGameAttribute("DNSM").h.CardBonusS;return e=""+h.string(a.engine.getGameAttribute("CustomMaps").h.IDforCardBonus.h[""+e]),t.h.cdb8=i.h[e],null==a.engine.getGameAttribute("DNSM").h.cdb8?0:a.engine.getGameAttribute("DNSM").h.cdb8}
