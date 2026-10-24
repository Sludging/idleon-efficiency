/**
 * Game formula snippet — idleon-efficiency formula research.
 * Function: _customBlock_MealBonus (from scripts.ActorEvents_189)
 * Game version: 1.24 ("Halloween_Event")
 * Captured: 2026-10-23 via game-debug-tool (findFunction + toString)
 * Work reference: Correctness #488 — Divinity Points and EXP gain
 */
function(e){var t=a.engine.getGameAttribute("DNSM");if(!Object.prototype.hasOwnProperty.call(t.h,"MealBonusesS")){t=a.engine;var i=k._customBlock_TalentCalc(-6);t.gameAttributes.h.DummyNumber4=i}return c.asNumber(a.engine.getGameAttribute("DNSM").h.MealBonusesS.h[e])}
