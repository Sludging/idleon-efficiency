/**
 * Game formula snippet — idleon-efficiency formula research.
 * Function: _customBlock_ForgeSpeeed (from ActorEvents_12)
 * Game version: 1.23 ("Luminous_Menagerie")
 * Captured: 2026-10-17 via game-debug-tool (findFunction + toString)
 * Work reference: Menagerie Part 1 rate/stat recipients.
 */
function(e){var t=a.engine.getGameAttribute("DummyNumbersStatManager"),i=Math.round(x._customBlock_ForgeStats(2))/100;t.h.ForgeSpeedzDN=i,t=a.engine.getGameAttribute("ItemDefinitionsGET");var n=""+h.string(a.engine.getGameAttribute("ForgeItemOrder")[3*e+1|0]);if("SpeedForge"==t.h[n].h.Effect){t=a.engine.getGameAttribute("DummyNumbersStatManager"),i=c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.ForgeSpeedzDN);var s=a.engine.getGameAttribute("ItemDefinitionsGET");n=""+h.string(a.engine.getGameAttribute("ForgeItemOrder")[3*e+1|0]);var r=c.asNumber(s.h[n].h.Amount);s=a.engine.getGameAttribute("ItemDefinitionsGET"),n=""+h.string(a.engine.getGameAttribute("ForgeItemOrder")[3*e+1|0]),i*=1+r*x._customBlock_FoodBonuses(h.string(s.h[n].h.Effect)+"EffectBonus")/100,t.h.ForgeSpeedzDN=i}return c.asNumber(a.engine.getGameAttribute("GemItemsPurchased")[104])>e&&(t=a.engine.getGameAttribute("DummyNumbersStatManager"),i=1.5*c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.ForgeSpeedzDN),t.h.ForgeSpeedzDN=i),.25*c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.ForgeSpeedzDN)}
