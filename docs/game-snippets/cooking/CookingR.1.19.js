/**
 * Game formula snippet — idleon-efficiency formula research.
 * Function: _customBlock_CookingR (from scripts.ActorEvents_345)
 * Game version: 1.19 ("Summer_Event")
 * Captured: 2026-08-21 via game-debug-tool (findFunction + toString)
 * Case reference: #354
 */
function (e, t, i) {
 if ("PossibleRecipes" == e)
  return p._customBlock_CookingR("PossibleRecipes2", c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[21].behaviors.getBehavior("ActorEvents_510"), bc)._GenINFO[62]), 0);
 if ("PossibleRecipes2" == e) {
  var s = a.engine.getGameAttribute("DNSM"),
   _ = [];
  if (((s.h.CookinPossibleRecps = _), -1 != t)) {
   for (e = 0; 4 > e;)
    ((i = e++),
     (s = a.engine.getGameAttribute("DNSM")),
     (_ = a.engine.getGameAttribute("Cooking")[0 | t][2 + i]),
     (s.h.CookinPossibleRecpsDN1 = _),
     -1 != a.engine.getGameAttribute("DNSM").h.CookinPossibleRecpsDN1 &&
     a.engine
      .getGameAttribute("DNSM")
      .h.CookinPossibleRecps.push(c.asNumber(a.engine.getGameAttribute("CustomLists").h.RANDOlist[49][0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.CookinPossibleRecpsDN1)])));
   for (a.engine.getGameAttribute("DNSM").h.CookinPossibleRecpsDN1 = 0, e = a.engine.getGameAttribute("DNSM").h.CookinPossibleRecpsDN3 = 0; 4 > e;)
    ((i = e++),
     (s = a.engine.getGameAttribute("DNSM")),
     (_ = c.asNumber(a.engine.getGameAttribute("DNSM").h.CookinPossibleRecpsDN1) + Math.max(0, c.asNumber(a.engine.getGameAttribute("Cooking")[0 | t][2 + i]))),
     (s.h.CookinPossibleRecpsDN1 = _),
     -1 != a.engine.getGameAttribute("Cooking")[0 | t][2 + i] &&
     ((i = a.engine.getGameAttribute("DNSM")), (s = c.asNumber(a.engine.getGameAttribute("DNSM").h.CookinPossibleRecpsDN3) + 1), (i.h.CookinPossibleRecpsDN3 = s)));
   if (
    (71 > c.asNumber(a.engine.getGameAttribute("DNSM").h.CookinPossibleRecpsDN1)
     ? ((s = a.engine.getGameAttribute("DNSM")), (_ = Math.min(55, c.asNumber(a.engine.getGameAttribute("DNSM").h.CookinPossibleRecpsDN1))))
     : 87 > c.asNumber(a.engine.getGameAttribute("DNSM").h.CookinPossibleRecpsDN1)
      ? ((s = a.engine.getGameAttribute("DNSM")), (_ = Math.min(65, Math.round(c.asNumber(a.engine.getGameAttribute("DNSM").h.CookinPossibleRecpsDN1) - 14))))
      : ((s = a.engine.getGameAttribute("DNSM")), (_ = Math.round(c.asNumber(a.engine.getGameAttribute("DNSM").h.CookinPossibleRecpsDN1) - 22))),
     (s.h.CookinPossibleRecpsDN1 = _),
     0.5 < c.asNumber(a.engine.getGameAttribute("DNSM").h.CookinPossibleRecpsDN1))
   )
    for (
     s = a.engine.getGameAttribute("DNSM"),
     _ = Math.min(c.asNumber(a.engine.getGameAttribute("DNSM").h.CookinPossibleRecpsDN3), 3),
     s.h.CookinPossibleRecpsDN2 = _,
     e = 0,
     t = 0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.CookinPossibleRecpsDN2);
     e < t;
    )
     ((i = e++),
      D.contains(
       a.engine.getGameAttribute("DNSM").h.CookinPossibleRecps,
       Math.round(
        Math.min(
         73,
         Math.max(
          0,
          c.asNumber(a.engine.getGameAttribute("DNSM").h.CookinPossibleRecpsDN1) + (i - Math.floor((c.asNumber(a.engine.getGameAttribute("DNSM").h.CookinPossibleRecpsDN2) - 1) / 2))
         )
        )
       )
      ) ||
      D.contains(
       a.engine.getGameAttribute("CustomLists").h.RANDOlist[49],
       "" +
       Math.round(
        Math.min(
         73,
         Math.max(
          0,
          c.asNumber(a.engine.getGameAttribute("DNSM").h.CookinPossibleRecpsDN1) +
          (i - Math.floor((c.asNumber(a.engine.getGameAttribute("DNSM").h.CookinPossibleRecpsDN2) - 1) / 2))
         )
        )
       )
      ) ||
      (74 >
       Math.round(
        Math.min(
         73,
         Math.max(
          0,
          c.asNumber(a.engine.getGameAttribute("DNSM").h.CookinPossibleRecpsDN1) + (i - Math.floor((c.asNumber(a.engine.getGameAttribute("DNSM").h.CookinPossibleRecpsDN2) - 1) / 2))
         )
        )
       ) &&
       a.engine
        .getGameAttribute("DNSM")
        .h.CookinPossibleRecps.push(
         Math.round(
          Math.min(
           73,
           Math.max(
            0,
            c.asNumber(a.engine.getGameAttribute("DNSM").h.CookinPossibleRecpsDN1) +
            (i - Math.floor((c.asNumber(a.engine.getGameAttribute("DNSM").h.CookinPossibleRecpsDN2) - 1) / 2))
           )
          )
         )
        )));
  }
  for (_ = [], (s = a.engine.getGameAttribute("DNSM")).h.CookinPossibleRecps2 = _, e = 0, t = a.engine.getGameAttribute("DNSM").h.CookinPossibleRecps.length; e < t;) {
   for (e++, a.engine.getGameAttribute("DNSM").h.CookinPossibleRecpsDN1 = 99999, i = 0, s = n.__cast(a.engine.getGameAttribute("DNSM").h.CookinPossibleRecps, Array); i < s.length;)
    ((_ = s[i]),
     ++i,
     c.asNumber(_) < c.asNumber(a.engine.getGameAttribute("DNSM").h.CookinPossibleRecpsDN1) &&
     !D.contains(a.engine.getGameAttribute("DNSM").h.CookinPossibleRecps2, _) &&
     (a.engine.getGameAttribute("DNSM").h.CookinPossibleRecpsDN1 = _));
   a.engine.getGameAttribute("DNSM").h.CookinPossibleRecps2.push(a.engine.getGameAttribute("DNSM").h.CookinPossibleRecpsDN1);
  }
  return ((n.__cast(a.engine.getGameAttribute("PixelHelperActor")[21].behaviors.getBehavior("ActorEvents_510"), bc)._GenINFO[69] = a.engine.getGameAttribute("DNSM").h.CookinPossibleRecps2), 0);
 }
 if ("CookingReqToCook" == e) return c.asNumber(a.engine.getGameAttribute("CustomLists").h.MealINFO[0 | t][1]);
 if ("CookingMealBonusMultioo" == e)
  return (
   (1 + (p._customBlock_MainframeBonus(116) + p._customBlock_Breeding("ShinyBonusS", "Nah", 20, -1)) / 100) *
   (1 + m._customBlock_Summoning("WinBonus", 26, 0) / 100) *
   (1 + (25 * m._customBlock_Companions(162)) / 100)
  );
 if ("CookingSPEED" == e)
  return (
   (a.engine.getGameAttribute("DNSM").h.CookinzzDN1 = 0),
   c.asNumber(a.engine.getGameAttribute("GemItemsPurchased")[120]) > t && (a.engine.getGameAttribute("DNSM").h.CookinzzDN1 = 2),
   10 *
   (1 + k._customBlock_TalentCalc(59) / 100) *
   Math.max(1, m._customBlock_FarmingStuffs("CropSCbonus", 3, 0)) *
   Math.max(1, m._customBlock_TalentEnh(146)) *
   (1 + c.asNumber(a.engine.getGameAttribute("DNSM").h.CookinzzDN1)) *
   (1 + m._customBlock_Summoning("VotingBonusz", 13, 0) / 100) *
   (1 + m._customBlock_Summoning("VaultUpgBonus", 54, 0) / 100) *
   (1 + (r._customBlock_MealBonus("zMealFarm") * Math.ceil((c.asNumber(a.engine.getGameAttribute("Lv0")[16]) + 1) / 50)) / 100) *
   Math.max(1, c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.MealSpdz)) *
   Math.max(1, m._customBlock_AtomCollider("AtomBonuses", 8, 0)) *
   (1 + m._customBlock_GamingStatType("MSA_Bonus", 1, 0) / 100) *
   (1 + c.asNumber(a.engine.getGameAttribute("Cooking")[0 | t][6]) / 10) *
   (1 + m._customBlock_Sailing("ArtifactBonus", 13, 0) / 100) *
   (1 + m._customBlock_Minehead("Button_Bonuses", 7, 0) / 100) *
   (1 + p._customBlock_ArcadeBonus(28) / 100) *
   (1 + c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchVials.h["6turtle"]) / 100) *
   (1 + c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchVials.h.MealCook) / 100) *
   (1 + (k._customBlock_StampBonusOfTypeX("MealCook") + Math.max(0, p._customBlock_MainframeBonus(114))) / 100) *
   (1 + r._customBlock_MealBonus("Mcook") / 100) *
   (1 + c.asNumber(a.engine.getGameAttribute("DNSM").h.StarSigns.h[58]) / 100) *
   (1 + m._customBlock_Summoning("WinBonus", 15, 0) / 100) *
   (1 + m._customBlock_Holes("MonumentROGbonuses", 0, 2) / 100) *
   Math.max(1, m._customBlock_Holes("B_UPG", 56, 0)) *
   (1 + (5 * x._customBlock_RunCodeOfTypeXforThingY("CardLv", "w6c1")) / 100) *
   (1 + m._customBlock_Holes("LampBonuses", 0, 0) / 100) *
   (1 + c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchVials.h["6CookSpd"]) / 100) *
   Math.max(1, p._customBlock_MainframeBonus(100)) *
   (1 + Math.min(6 * x._customBlock_RunCodeOfTypeXforThingY("CardLv", "Boss4A") + (20 * p._customBlock_AchieveStatus(225) + 10 * p._customBlock_AchieveStatus(224)), 100) / 100) *
   (1 +
    (r._customBlock_MealBonus("KitchenEff") *
     Math.floor(
      (c.asNumber(a.engine.getGameAttribute("Cooking")[0 | t][6]) + (c.asNumber(a.engine.getGameAttribute("Cooking")[0 | t][7]) + c.asNumber(a.engine.getGameAttribute("Cooking")[0 | t][8]))) /
      10
     )) /
    100)
  );
 if ("CookingFIRE" == e)
  return (
   (a.engine.getGameAttribute("DNSM").h.CookinzzDN1 = 0),
   c.asNumber(a.engine.getGameAttribute("GemItemsPurchased")[120]) > t && (a.engine.getGameAttribute("DNSM").h.CookinzzDN1 = 1),
   5 *
   (1 + c.asNumber(a.engine.getGameAttribute("DNSM").h.CookinzzDN1)) *
   (1 + m._customBlock_Summoning("VotingBonusz", 13, 0) / 100) *
   Math.max(1, c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.MealSpdz)) *
   Math.max(1, m._customBlock_AtomCollider("AtomBonuses", 8, 0)) *
   (1 + m._customBlock_GamingStatType("MSA_Bonus", 1, 0) / 100) *
   (1 + c.asNumber(a.engine.getGameAttribute("Cooking")[0 | t][7]) / 10) *
   (1 + c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchVials.h.RecCook) / 100) *
   (1 + k._customBlock_StampBonusOfTypeX("RecipeCook") / 100) *
   (1 + r._customBlock_MealBonus("Rcook") / 100) *
   (1 + Math.min(6 * x._customBlock_RunCodeOfTypeXforThingY("CardLv", "Boss4A"), 50) / 100) *
   (1 +
    (r._customBlock_MealBonus("KitchenEff") *
     Math.floor(
      (c.asNumber(a.engine.getGameAttribute("Cooking")[0 | t][6]) + (c.asNumber(a.engine.getGameAttribute("Cooking")[0 | t][7]) + c.asNumber(a.engine.getGameAttribute("Cooking")[0 | t][8]))) /
      10
     )) /
    100)
  );
 if ("CookingLUCK" == e) return 1 + Math.pow(5 * c.asNumber(a.engine.getGameAttribute("Cooking")[0 | t][8]), 0.85) / 100;
 if ("CookingUpgSpiceCostType" == e) return Math.floor(2 * t + i);
 if ("CookingUpgSpiceCostQty" == e)
  return (
   (a.engine.getGameAttribute("DNSM").h.CookinzzDN1 = 0),
   c.asNumber(a.engine.getGameAttribute("GemItemsPurchased")[120]) > t && (a.engine.getGameAttribute("DNSM").h.CookinzzDN1 = 40),
   1 +
   (1 /
    ((1 + (c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchVials.h.Kcosts) + p._customBlock_Labb("SigilBonus", "Blank", 18, 0)) / 100) *
     (1 + (30 * m._customBlock_RandomEvent("FractalIslandBonus", 2, 999)) / 100) *
     (1 + r._customBlock_MealBonus("KitchC") / 100) *
     (1 + c.asNumber(a.engine.getGameAttribute("DNSM").h.CookinzzDN1) / 100) *
     (1 + 0.5 * p._customBlock_Breeding("PetArenaBonus", "0", 7, 0)))) *
   (c.asNumber(a.engine.getGameAttribute("Cooking")[0 | t][(6 + i) | 0]) +
    1 +
    Math.floor(Math.max(0, c.asNumber(a.engine.getGameAttribute("Cooking")[0 | t][(6 + i) | 0]) - 10) / 2) +
    Math.pow(Math.max(0, c.asNumber(a.engine.getGameAttribute("Cooking")[0 | t][(6 + i) | 0]) - 30), 1.2)) *
   Math.pow(1.02, Math.max(0, c.asNumber(a.engine.getGameAttribute("Cooking")[0 | t][(6 + i) | 0]) - 60))
  );
 if ("CookingFireREQ" == e)
  return (
   (s = a.engine.getGameAttribute("DNSM")),
   (_ = p._customBlock_CookingR("PossibleRecipes2", t, 0)),
   (s.h.CookinPossibleRecps = _),
   (s = a.engine.getGameAttribute("DNSM")),
   (_ = a.engine.getGameAttribute("DNSM").h.CookinPossibleRecps2),
   (s.h.CookinPossibleRecps = _),
   (s = a.engine.getGameAttribute("DNSM")),
   (_ = a.engine.getGameAttribute("DNSM").h.CookinPossibleRecps[a.engine.getGameAttribute("DNSM").h.CookinPossibleRecps.length - 1]),
   (s.h.CookinPossibleRecpsDN1 = _),
   2 *
   c.asNumber(a.engine.getGameAttribute("CustomLists").h.MealINFO[0 | Math.min(66, c.asNumber(a.engine.getGameAttribute("DNSM").h.CookinPossibleRecpsDN1))][1]) *
   Math.pow(25, Math.max(0, c.asNumber(a.engine.getGameAttribute("DNSM").h.CookinPossibleRecpsDN1) - 66))
  );
 if ("CookingFireREQlv" == e) {
  for (
   s = a.engine.getGameAttribute("DNSM"), _ = p._customBlock_CookingR("CookingFireREQ", t, 0), s.h.CookinPossibleRecpsDN1 = _, e = a.engine.getGameAttribute("DNSM").h.CookinPossibleRecpsDN2 = 0;
   100 > e && (e++, c.asNumber(a.engine.getGameAttribute("Cooking")[0 | t][10]) >= c.asNumber(a.engine.getGameAttribute("DNSM").h.CookinPossibleRecpsDN1));
  )
   ((s = a.engine.getGameAttribute("DNSM")),
    (_ = c.asNumber(a.engine.getGameAttribute("DNSM").h.CookinPossibleRecpsDN1) * p._customBlock_CookingR("CookingFireREQlvMULTI", 0, 0)),
    (s.h.CookinPossibleRecpsDN1 = _),
    (i = a.engine.getGameAttribute("DNSM")),
    (s = c.asNumber(a.engine.getGameAttribute("DNSM").h.CookinPossibleRecpsDN2) + 1),
    (i.h.CookinPossibleRecpsDN2 = s));
  return a.engine.getGameAttribute("DNSM").h.CookinPossibleRecpsDN2;
 }
 return "CookingFireREQlvMULTI" == e
  ? 3
  : "CookingMenuMealCosts" == e
   ? Math.max(0.001, 1 / Math.max(1, 5 * m._customBlock_Companions(162))) *
   Math.pow(10, 22 * Math.floor((c.asNumber(a.engine.getGameAttribute("Meals")[0][0 | t]) + 1e3) / 1111)) *
   (1 / Math.min(5, Math.max(1, 1 + (10 * p._customBlock_AchieveStatus(233)) / 100))) *
   Math.max(
    0.001,
    Math.pow(
     Math.max(0.58, 0.8 - 0.22 * m._customBlock_Dreamstuff("CloudBonus", 33)),
     Math.min(c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[193]), c.asNumber(a.engine.getGameAttribute("Dream")[11]))
    )
   ) *
   (10 + (c.asNumber(a.engine.getGameAttribute("Meals")[0][0 | t]) + Math.pow(c.asNumber(a.engine.getGameAttribute("Meals")[0][0 | t]), 2))) *
   Math.pow(1.2 + 0.05 * c.asNumber(a.engine.getGameAttribute("Meals")[0][0 | t]), c.asNumber(a.engine.getGameAttribute("Meals")[0][0 | t])) *
   Math.pow(1 + 0.4 * Math.floor((c.asNumber(a.engine.getGameAttribute("Meals")[0][0 | t]) + 1e3) / 1111), c.asNumber(a.engine.getGameAttribute("Meals")[0][0 | t]))
   : "CookingNewRecipeOdds" == e
    ? 0 >= c.asNumber(a.engine.getGameAttribute("Meals")[0][0 | c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[21].behaviors.getBehavior("ActorEvents_510"), bc)._GenINFO[69][0 | t])])
     ? c.asNumber(a.engine.getGameAttribute("CustomLists").h.RANDOlist[50][0 | t]) * p._customBlock_CookingR("CookingLUCK", i, 0) * Math.pow(1.5, p._customBlock_CookingR("CookingFireREQlv", i, 0))
     : c.asNumber(a.engine.getGameAttribute("CustomLists").h.RANDOlist[50][0 | t])
    : "CookingNewKitchenCoinCost" == e
     ? 1 == t
      ? 82e5
      : 2 == t
       ? 75e6
       : 3 == t
        ? 4e8
        : 4 == t
         ? 8e9
         : 5 == t
          ? 5e10
          : 6 == t
           ? 213e10
           : 7 == t
            ? 6e13
            : 8 == t
             ? 2e15
             : 1e17
     : "CookingMealMaxLVlol" == e
      ? Math.round(
       30 +
       (m._customBlock_Sailing("ArtifactBonus", 17, 0) +
        (10 * m._customBlock_Ninja("EmporiumBonus", 20, 0) +
         (10 * m._customBlock_Ninja("EmporiumBonus", 21, 0) + 30 * m._customBlock_Spelunk("DoWeHaveLoreN1", 5, 0)) +
         Math.min(20, m._customBlock_Summoning("GrimoireUpgBonus", 26, 0))))
      )
      : "RibbonsMaxLV" == e
       ? 25
       : 0;
}
