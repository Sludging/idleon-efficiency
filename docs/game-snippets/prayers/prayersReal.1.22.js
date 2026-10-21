/**
 * Game formula snippet — idleon-efficiency formula research.
 * Function: _customBlock_prayersReal (from ActorEvents_345)
 * Game version: 1.22 ("Jelly_Operator")
 * Captured: 2026-10-15 via game-debug-tool (findFunction + idleon.allScripts toString)
 * Case reference: #451
 */
function(e,t){var i=a.engine.getGameAttribute("DNSM");if(!Object.prototype.hasOwnProperty.call(i.h,"PrayNonEq")){i=a.engine.getGameAttribute("DNSM").h.PrayNonEq=0;for(var n=a.engine.getGameAttribute("PrayersActive").length;i<n;){var s=i++;if(-1!=a.engine.getGameAttribute("PrayersActive")[s])break;s==a.engine.getGameAttribute("PrayersActive").length-1&&(a.engine.getGameAttribute("DNSM").h.PrayNonEq=1)}}return 1!=m._customBlock_GamingStatType("SuperBitType",9,0)&&1!=m._customBlock_GamingStatType("SuperBitType",39,0)||1!=a.engine.getGameAttribute("DNSM").h.PrayNonEq?-1!=a.engine.getGameAttribute("PrayersActive").indexOf(e)?Math.round(c.asNumber(a.engine.getGameAttribute("CustomLists").h.PrayerInfo[0|e][3+t|0])*Math.max(1,1+(c.asNumber(a.engine.getGameAttribute("PrayersUnlocked")[0|e])-1)/10)):0:5!=e&&1!=t&&.5<c.asNumber(a.engine.getGameAttribute("PrayersUnlocked")[0|e])?Math.round((.2*m._customBlock_GamingStatType("SuperBitType",9,0)+(.2*m._customBlock_GamingStatType("SuperBitType",39,0)+.2*m._customBlock_GamingStatType("SuperBitType",53,0)))*c.asNumber(a.engine.getGameAttribute("CustomLists").h.PrayerInfo[0|e][3])*Math.max(1,1+(c.asNumber(a.engine.getGameAttribute("PrayersUnlocked")[0|e])-1)/10)):0}
