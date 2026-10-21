/**
 * Game formula snippet — idleon-efficiency formula research.
 * Function: _customBlock_TotalFoodBonuses (from scripts.ActorEvents_189)
 * Game version: 1.22 ("Jelly_Operator")
 * Captured: 2026-10-12 via offline game-debug-tool (findFunction + toString)
 * Case reference: #450
 */
function(e){for(var t=a.engine.getGameAttribute("DNSM").h.playHPbasePOT2=0,i=0|a.engine.getGameAttribute("FoodSlotsOwned");t<i;){var n=t++;if("Blank"!=a.engine.getGameAttribute("EquipmentOrder")[2][n]&&0!=a.engine.getGameAttribute("EquipmentQuantity")[2][n]){var s=a.engine.getGameAttribute("ItemDefinitionsGET"),r=""+h.string(a.engine.getGameAttribute("EquipmentOrder")[2][n]);s.h[r].h.Effect==e&&(s=a.engine.getGameAttribute("DNSM"),r=a.engine.getGameAttribute("ItemDefinitionsGET"),n=""+h.string(a.engine.getGameAttribute("EquipmentOrder")[2][n]),s.h.playHPbasePOT1=r.h[n],n=a.engine.getGameAttribute("DNSM"),s=c.asNumber(a.engine.getGameAttribute("DNSM").h.playHPbasePOT2)+c.asNumber(a.engine.getGameAttribute("DNSM").h.playHPbasePOT1.h.Amount)*x._customBlock_FoodBonuses(h.string(a.engine.getGameAttribute("DNSM").h.playHPbasePOT1.h.Effect)+"EffectBonus"),n.h.playHPbasePOT2=s)}}return a.engine.getGameAttribute("DNSM").h.playHPbasePOT2}