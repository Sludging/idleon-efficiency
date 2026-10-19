/**
 * Game formula snippet — idleon-efficiency formula research.
 * Function: _customBlock_Companions (from ActorEvents_579)
 * Game version: 1.23 ("Luminous_Menagerie")
 * Captured: 2026-10-17 via game-debug-tool (findFunction + toString)
 * Work reference: Menagerie Lumi helper input mapping
 */
function(e){if(918==e)return 0;var t=a.engine.getGameAttribute("DNSM");return Object.prototype.hasOwnProperty.call(t.h,"CompanionBon")?(t=a.engine.getGameAttribute("DNSM").h.CompanionBon,Object.prototype.hasOwnProperty.call(t.h,""+e)?0==e&&2>c.asNumber(a.engine.getGameAttribute("Lv0")[14])?0:a.engine.getGameAttribute("DNSM").h.CompanionBon.h[""+e]:0):0}
