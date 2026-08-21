/**
 * Game formula snippet — idleon-efficiency formula research.
 * Function: _customBlock_MealBonus (from scripts.ActorEvents_189)
 * Game version: 1.19 ("Summer_Event")
 * Captured: 2026-08-21 via game-debug-tool (findFunction + toString)
 * Case reference: #343
 */
function (e) {
 var t = a.engine.getGameAttribute("DNSM");
 if (!Object.prototype.hasOwnProperty.call(t.h, "MealBonusesS")) {
  t = a.engine;
  var i = k._customBlock_TalentCalc(-6);
  t.gameAttributes.h.DummyNumber4 = i;
 }
 return c.asNumber(a.engine.getGameAttribute("DNSM").h.MealBonusesS.h[e]);
}