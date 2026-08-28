/**
 * Game formula snippet — idleon-efficiency formula research.
 * Function: _customBlock_ResearchStuff (from scripts.ActorEvents_579)
 * Game version: 1.20 ("Royal_Guardian")
 * Captured: 2026-08-27 via game-debug-tool (findFunction + toString)
 * Case reference: #366
 */
function (e, t, i) {
 if ("AFKgainsRatePCT" == e) return 100 * k._customBlock_AFKgainrates("Research");
 if ("OccurrencesToBeFound" == e)
  return 1 > c.asNumber(a.engine.getGameAttribute("Lv0")[20])
   ? 0
   : 0 == a.engine.getGameAttribute("Research")[2][0]
    ? 1
    : Math.min(
     43,
     5 * Math.floor((c.asNumber(a.engine.getGameAttribute("Lv0")[20]) + 10) / 10) -
     Math.floor(c.asNumber(a.engine.getGameAttribute("Lv0")[20]) / 20) -
     Math.floor(c.asNumber(a.engine.getGameAttribute("Lv0")[20]) / 30) -
     Math.floor(c.asNumber(a.engine.getGameAttribute("Lv0")[20]) / 50)
    );
 if ("TotalOccurrencesFound" == e) {
  var n = a.engine.getGameAttribute("DNSM");
  if (!Object.prototype.hasOwnProperty.call(n.h, "TotOccFnd") || -1 == t)
   for (i = a.engine.getGameAttribute("DNSM").h.TotOccFnd = 0, e = 0 | m._customBlock_ResearchStuff("OccurrencesToBeFound", 0, 0); i < e;) {
    var s = i++;
    if (1 <= c.asNumber(a.engine.getGameAttribute("Research")[2][s])) {
     n = a.engine.getGameAttribute("DNSM");
     var r = c.asNumber(a.engine.getGameAttribute("DNSM").h.TotOccFnd) + 1;
     n.h.TotOccFnd = r;
    }
   }
  return a.engine.getGameAttribute("DNSM").h.TotOccFnd;
 }
 if ("TotalObsLVs" == e) {
  if (((n = a.engine.getGameAttribute("DNSM")), !Object.prototype.hasOwnProperty.call(n.h, "TotOccLVz") || -1 == t))
   for (i = a.engine.getGameAttribute("DNSM").h.TotOccLVz = 0, e = 0 | m._customBlock_ResearchStuff("OccurrencesToBeFound", 0, 0); i < e;)
    ((s = i++),
     1 <= c.asNumber(a.engine.getGameAttribute("Research")[4][s]) &&
     ((n = a.engine.getGameAttribute("DNSM")), (r = c.asNumber(a.engine.getGameAttribute("DNSM").h.TotOccLVz) + c.asNumber(a.engine.getGameAttribute("Research")[4][s])), (n.h.TotOccLVz = r)));
  return a.engine.getGameAttribute("DNSM").h.TotOccLVz;
 }
 if ("MaxRoll" == e) return Math.floor(100 + (m._customBlock_ResearchStuff("Grid_Bonus", 51, 1) + m._customBlock_SushiStuff("RoG_BonusQTY", 30, 0)));
 if ("MinRoll" == e)
  return Math.floor(1 + Math.min(c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[514]) * m._customBlock_ResearchStuff("Grid_Bonus", 31, 1), m._customBlock_ResearchStuff("Grid_Bonus", 31, 2)));
 if ("RollsPerDay" == e) return Math.round(3 + (m._customBlock_ResearchStuff("Grid_Bonus", 90, 1) + (3 * m._customBlock_Summoning("EventShopOwned", 35, 0) + m._customBlock_SushiStuff("RoG_BonusQTY", 2, 0))));
 if ("CanWeLevelUpObservations" == e) return 1 <= m._customBlock_ResearchStuff("Grid_Bonus", 91, 1) ? 1 : 0;
 if ("OccurrenceYspacing" == e) return 65 > m._customBlock_ResearchStuff("OccurrencesToBeFound", 0, 0) ? 40 : 73 > m._customBlock_ResearchStuff("OccurrencesToBeFound", 0, 0) ? 37 : 33;
 if ("OpticalMonocleOwned" == e) return Math.round(m._customBlock_ResearchStuff("Grid_Bonus", 91, 1));
 if ("KaleidoscopeOwned" == e) return Math.round(m._customBlock_ResearchStuff("Grid_Bonus", 72, 1) + m._customBlock_Summoning("EventShopOwned", 33, 0));
 if ("MagnifiersOwned" == e)
  return Math.min(
   80,
   Math.round(
    1 +
    (m._customBlock_ResearchStuff("KaleidoscopeOwned", 0, 0) + m._customBlock_ResearchStuff("OpticalMonocleOwned", 0, 0)) +
    (m._customBlock_Minehead("BonusQTY", 2, 0) +
     (m._customBlock_Minehead("BonusQTY", 12, 0) +
      (m._customBlock_Minehead("BonusQTY", 20, 0) + (m._customBlock_Summoning("EventShopOwned", 34, 0) + (m._customBlock_Companions(153) + m._customBlock_SushiStuff("RoG_BonusQTY", 8, 0)))))) +
    (Math.min(1, Math.floor(c.asNumber(a.engine.getGameAttribute("Lv0")[20]) / 10)) +
     (Math.min(1, Math.floor(c.asNumber(a.engine.getGameAttribute("Lv0")[20]) / 100)) +
      (Math.min(1, Math.floor(c.asNumber(a.engine.getGameAttribute("Lv0")[20]) / 130)) + Math.min(1, Math.floor(c.asNumber(a.engine.getGameAttribute("Lv0")[20]) / 140)))))
   )
  );
 if ("MagnifiersPerSlot" == e)
  return Math.min(
   4,
   Math.round(
    1 +
    (Math.min(1, Math.floor(c.asNumber(a.engine.getGameAttribute("Lv0")[20]) / 40)) +
     (Math.min(1, Math.floor(c.asNumber(a.engine.getGameAttribute("Lv0")[20]) / 70)) + Math.min(1, Math.floor(c.asNumber(a.engine.getGameAttribute("Lv0")[20]) / 120))))
   )
  );
 if ("ResearchEXPrateObj" == e) {
  for (i = a.engine.getGameAttribute("DNSM").h.ResearchExpIndi2 = 0, e = Math.round(a.engine.getGameAttribute("Research")[5].length / 4); i < e;)
   ((s = i++),
    0 == a.engine.getGameAttribute("Research")[5][Math.round(4 * s + 3)] &&
    a.engine.getGameAttribute("Research")[5][Math.round(4 * s + 2)] == t &&
    ((n = a.engine.getGameAttribute("DNSM")), (r = c.asNumber(a.engine.getGameAttribute("DNSM").h.ResearchExpIndi2) + 1), (n.h.ResearchExpIndi2 = r)));
  return (
   (n = a.engine.getGameAttribute("DNSM")),
   (r = c.asNumber(a.engine.getGameAttribute("DNSM").h.ResearchExpIndi2)),
   (n.h.ResearchExpIndi = r * ((4 + (t / 2 + Math.floor(t / 4))) * (1 + Math.pow(t, 1 + (t / 15) * 0.4) / 10) + (Math.pow(t, 1.5) + 1.5 * t))),
   (n = a.engine.getGameAttribute("DNSM")),
   (r =
    c.asNumber(a.engine.getGameAttribute("DNSM").h.ResearchExpIndi) *
    (1 + (m._customBlock_ResearchStuff("Grid_Bonus", 93, 0) * c.asNumber(a.engine.getGameAttribute("Research")[4][0 | t])) / 100) *
    m._customBlock_ResearchStuff("Kalei_MultiTot", t, 0)),
   (n.h.ResearchExpIndi = r),
   a.engine.getGameAttribute("DNSM").h.ResearchExpIndi
  );
 }
 if ("ObservationInsightExpRate" == e) {
  for (i = a.engine.getGameAttribute("DNSM").h.ResearchInsightDN = 0, e = Math.round(a.engine.getGameAttribute("Research")[5].length / 4); i < e;)
   ((s = i++),
    1 == a.engine.getGameAttribute("Research")[5][Math.round(4 * s + 3)] &&
    a.engine.getGameAttribute("Research")[5][Math.round(4 * s + 2)] == t &&
    ((n = a.engine.getGameAttribute("DNSM")), (r = c.asNumber(a.engine.getGameAttribute("DNSM").h.ResearchInsightDN) + 1), (n.h.ResearchInsightDN = r)));
  return (
   (n = a.engine.getGameAttribute("DNSM")),
   (r =
    3 *
    c.asNumber(a.engine.getGameAttribute("DNSM").h.ResearchInsightDN) *
    (1 + (m._customBlock_ResearchStuff("Grid_Bonus", 92, 0) + m._customBlock_ResearchStuff("Grid_Bonus", 91, 0)) / 100) *
    (1 + (35 * m._customBlock_Ninja("EmporiumBonus", 46, 0)) / 100) *
    m._customBlock_ResearchStuff("Kalei_MultiTot", t, 0)),
   (n.h.ResearchInsightDN = r),
   a.engine.getGameAttribute("DNSM").h.ResearchInsightDN
  );
 }
 if ("ObservationInsightExpREQ" == e)
  return (2 + 0.7 * t) * Math.pow(1.75 + t / 200, c.asNumber(a.engine.getGameAttribute("Research")[4][0 | t])) * (1 + Math.pow(t, 2) / 100) + c.asNumber(a.engine.getGameAttribute("Research")[4][0 | t]);
 if ("ResearchEXPrateTOT" == e) {
  for (i = a.engine.getGameAttribute("DNSM").h.ResearchExpTOT = 0, e = 0 | m._customBlock_ResearchStuff("OccurrencesToBeFound", 0, 0); i < e;)
   ((s = i++),
    (n = a.engine.getGameAttribute("DNSM")),
    (r = c.asNumber(a.engine.getGameAttribute("DNSM").h.ResearchExpTOT) + m._customBlock_ResearchStuff("ResearchEXPrateObj", s, 99)),
    (n.h.ResearchExpTOT = r));
  return c.asNumber(a.engine.getGameAttribute("DNSM").h.ResearchExpTOT) * m._customBlock_ResearchStuff("ResearchEXPmulti", 0, 0);
 }
 if ("ResearchEXPmulti" == e)
  return (
   (1 +
    (m._customBlock_FarmingStuffs("StickerBonus", 1, 0) +
     (c.asNumber(a.engine.getGameAttribute("DNSM").h.MealBonusesS.h.ResearchXP) +
      (m._customBlock_Thingies("DancingCoralBonus", 4, 0) +
       (m._customBlock_FarmingStuffs("CropSCbonus", 9, 0) +
        (m._customBlock_ResearchStuff("Grid_Bonus", 50, 0) +
         (m._customBlock_ResearchStuff("Grid_Bonus", 90, 0) +
          (m._customBlock_ResearchStuff("Grid_Bonus", 110, 0) +
           (m._customBlock_ResearchStuff("Grid_Bonus", 112, 2) +
            (m._customBlock_Thingies("ZenithMarketBonus", 8, 0) +
             (m._customBlock_GamingStatType("MSA_Bonus", 10, 0) +
              (m._customBlock_Sailing("SlabboBonus", 7, 0) +
               (m._customBlock_Thingies("LoreEpiBon", 7, 0) +
                (Math.min(x._customBlock_RunCodeOfTypeXforThingY("CardLv", "w7b1"), 10) +
                 (Math.min(2 * x._customBlock_RunCodeOfTypeXforThingY("CardLv", "w7b4"), 15) +
                  (p._customBlock_ArcadeBonus(63) +
                   (Math.min(50, m._customBlock_GetSetBonus("PREHISTORIC_SET", "Bonus", 0, 0)) +
                    (m._customBlock_ResearchStuff("Grid_Bonus", 94, 2) +
                     (m._customBlock_ResearchStuff("Grid_Bonus", 31, 0) +
                      m._customBlock_ResearchStuff("Grid_Bonus", 51, 0) +
                      (Math.min(x._customBlock_RunCodeOfTypeXforThingY("CardLv", "w7a11"), 10) +
                       (Math.min(3 * x._customBlock_RunCodeOfTypeXforThingY("CardLv", "w7b8"), 20) +
                        m._customBlock_Spelunk("ShopUpgBonus", 63, 0))))))))))))))))))))) /
    100) *
   (1 + m._customBlock_ResearchStuff("Grid_Bonus", 70, 0) / 100) *
   (1 + (3 * c.asNumber(a.engine.getGameAttribute("Dream")[14])) / 100) *
   (1 + m._customBlock_Minehead("Button_Bonuses", 0, 0) / 100) *
   (1 + m._customBlock_RandomEvent("KillroyBonuses", 5, 0) / 100) *
   Math.max(1, (1 + m._customBlock_Companions(52)) * (1 + m._customBlock_Companions(153) + m._customBlock_CompLV2(153)) * (1 + 0.15 * m._customBlock_CompLV2(54))) *
   (1 + m._customBlock_SushiStuff("RoG_BonusQTY", 0, 0) / 100) *
   (1 + m._customBlock_Holes2("Cglunko_upgBon", 11, 0) / 100) *
   (1 + m._customBlock_Holes2("Fountain_BonTOT", 2, 16) / 100) *
   Math.max(1, m._customBlock_RoyalG("OutpostROGbon", 1, 0))
  );
 if ("Kalei_MultiBase" == e) return (30 + (m._customBlock_ResearchStuff("Grid_Bonus", 52, 0) + (m._customBlock_ResearchStuff("Grid_Bonus", 72, 0) + 6 * m._customBlock_Ninja("EmporiumBonus", 46, 0)))) / 100;
 if ("Kalei_MultiTot" == e) {
  if (((n = a.engine.getGameAttribute("DNSM")), !Object.prototype.hasOwnProperty.call(n.h, "ResearchKalMap") || 999 == i))
   for (n = a.engine.getGameAttribute("DNSM"), r = new l(), n.h.ResearchKalMap = r, i = 0, e = Math.round(a.engine.getGameAttribute("Research")[5].length / 4); i < e;)
    if (((s = i++), 2 == a.engine.getGameAttribute("Research")[5][Math.round(4 * s + 3)] && 0 <= c.asNumber(a.engine.getGameAttribute("Research")[5][Math.round(4 * s + 2)]))) {
     if (7 != c.asNumber(a.engine.getGameAttribute("Research")[5][Math.round(4 * s + 2)]) % 8) {
      n = a.engine.getGameAttribute("DNSM").h.ResearchKalMap;
      var _ = "" + (c.asNumber(a.engine.getGameAttribute("Research")[5][Math.round(4 * s + 2)]) + 1);
      r = a.engine.getGameAttribute("DNSM").h.ResearchKalMap;
      var o = "" + (c.asNumber(a.engine.getGameAttribute("Research")[5][Math.round(4 * s + 2)]) + 1);
      ((r = c.asNumber(r.h[o]) + 1), (n.h[_] = r));
     }
     (0 != c.asNumber(a.engine.getGameAttribute("Research")[5][Math.round(4 * s + 2)]) % 8 &&
      ((n = a.engine.getGameAttribute("DNSM").h.ResearchKalMap),
       (_ = "" + (c.asNumber(a.engine.getGameAttribute("Research")[5][Math.round(4 * s + 2)]) + -1)),
       (r = a.engine.getGameAttribute("DNSM").h.ResearchKalMap),
       (o = "" + (c.asNumber(a.engine.getGameAttribute("Research")[5][Math.round(4 * s + 2)]) + -1)),
       (r = c.asNumber(r.h[o]) + 1),
       (n.h[_] = r)),
      7 < c.asNumber(a.engine.getGameAttribute("Research")[5][Math.round(4 * s + 2)]) &&
      ((n = a.engine.getGameAttribute("DNSM").h.ResearchKalMap),
       (_ = "" + (c.asNumber(a.engine.getGameAttribute("Research")[5][Math.round(4 * s + 2)]) + -8)),
       (r = a.engine.getGameAttribute("DNSM").h.ResearchKalMap),
       (o = "" + (c.asNumber(a.engine.getGameAttribute("Research")[5][Math.round(4 * s + 2)]) + -8)),
       (r = c.asNumber(r.h[o]) + 1),
       (n.h[_] = r)),
      72 > c.asNumber(a.engine.getGameAttribute("Research")[5][Math.round(4 * s + 2)]) &&
      ((n = a.engine.getGameAttribute("DNSM").h.ResearchKalMap),
       (_ = "" + (c.asNumber(a.engine.getGameAttribute("Research")[5][Math.round(4 * s + 2)]) + 8)),
       (r = a.engine.getGameAttribute("DNSM").h.ResearchKalMap),
       (s = "" + (c.asNumber(a.engine.getGameAttribute("Research")[5][Math.round(4 * s + 2)]) + 8)),
       (s = c.asNumber(r.h[s]) + 1),
       (n.h[_] = s)));
    }
  return 1 + c.asNumber(a.engine.getGameAttribute("DNSM").h.ResearchKalMap.h["" + t]) * m._customBlock_ResearchStuff("Kalei_MultiBase", 0, 0);
 }
 if ("Grid_MaxLV" == e) return Math.round(c.asNumber(a.engine.getGameAttribute("CustomLists").h.ResGridSquares[0 | t][1]));
 if ("CanRotateShapes" == e) return 90 <= c.asNumber(a.engine.getGameAttribute("Lv0")[20]) ? 1 : 0;
 if ("ShapesOwned" == e)
  return Math.min(
   10,
   Math.round(
    m._customBlock_Summoning("EventShopOwned", 36, 0) +
    Math.min(1, Math.max(0, Math.floor(c.asNumber(a.engine.getGameAttribute("Lv0")[20]) / 20) * m._customBlock_Companions(54))) +
    Math.min(1, Math.floor(c.asNumber(a.engine.getGameAttribute("Lv0")[20]) / 20) * m._customBlock_Spelunk("DoWeHaveLoreN1", 7, 0)) +
    (Math.min(1, Math.floor(c.asNumber(a.engine.getGameAttribute("Lv0")[20]) / 20)) +
     (Math.min(1, Math.floor(c.asNumber(a.engine.getGameAttribute("Lv0")[20]) / 30)) +
      (Math.min(1, Math.floor(c.asNumber(a.engine.getGameAttribute("Lv0")[20]) / 50)) +
       (Math.min(1, Math.floor(c.asNumber(a.engine.getGameAttribute("Lv0")[20]) / 80)) + Math.min(1, Math.floor(c.asNumber(a.engine.getGameAttribute("Lv0")[20]) / 110))))))
   )
  );
 if ("PostyNotesOwned" == e) return Math.min(14, Math.floor(c.asNumber(a.engine.getGameAttribute("Lv0")[20]) / 10));
 if ("Grid_PTSearned" == e)
  return Math.floor(
   c.asNumber(a.engine.getGameAttribute("Lv0")[20]) +
   (10 * m._customBlock_Companions(153) +
    5 * m._customBlock_CompLV2(153) +
    (m._customBlock_SushiStuff("RoG_BonusQTY", 3, 0) + (m._customBlock_SushiStuff("RoG_BonusQTY", 13, 0) + Math.min(10, Math.round(c.asNumber(a.engine.getGameAttribute("Sailing")[3][37]))))) +
    Math.floor(c.asNumber(a.engine.getGameAttribute("Lv0")[20]) / 10) *
    Math.round(1 + (Math.min(1, Math.floor(c.asNumber(a.engine.getGameAttribute("Lv0")[20]) / 60)) + m._customBlock_ResearchStuff("Grid_Bonus", 50, 1))))
  );
 if ("Grid_PTSspent" == e) {
  if (((n = a.engine.getGameAttribute("DNSM")), !Object.prototype.hasOwnProperty.call(n.h, "Grid_PTSspent") || -1 == t))
   for (i = a.engine.getGameAttribute("DNSM").h.Grid_PTSspent = 0, e = a.engine.getGameAttribute("Research")[0].length; i < e;)
    ((s = i++),
     (n = a.engine.getGameAttribute("DNSM")),
     (r = Math.round(c.asNumber(a.engine.getGameAttribute("DNSM").h.Grid_PTSspent) + c.asNumber(a.engine.getGameAttribute("Research")[0][s]))),
     (n.h.Grid_PTSspent = r));
  return Math.round(c.asNumber(a.engine.getGameAttribute("DNSM").h.Grid_PTSspent));
 }
 if ("Grid_PTSavailable" == e) return Math.round(m._customBlock_ResearchStuff("Grid_PTSearned", 0, 0) - m._customBlock_ResearchStuff("Grid_PTSspent", 0, 0));
 if ("Grid_Bonus" == e)
  return 1 == i
   ? Math.round(c.asNumber(a.engine.getGameAttribute("Research")[0][0 | t]))
   : 2 == i
    ? 31 == t
     ? 25 * c.asNumber(a.engine.getGameAttribute("Research")[0][0 | t])
     : 67 == t || 68 == t || 107 == t
      ? m._customBlock_ResearchStuff("Grid_Bonus", t, 0) * a.engine.getGameAttribute("Research")[11].length
      : 94 == t
       ? m._customBlock_ResearchStuff("Grid_Bonus", t, 0) * m._customBlock_ResearchStuff("TotalObsLVs", 0, 0)
       : 112 == t
        ? m._customBlock_ResearchStuff("Grid_Bonus", t, 0) * m._customBlock_ResearchStuff("TotalOccurrencesFound", 0, 0)
        : 151 == t
         ? a.engine.getGameAttribute("OptionsListAccount")[500]
         : 168 == t
          ? m._customBlock_ResearchStuff("Grid_Bonus", t, 0) * Math.floor(m._customBlock_Minehead("GlimboTotalTrades", 0, 0) / 100)
          : m._customBlock_ResearchStuff("Grid_Bonus", t, 0)
    : -1 == a.engine.getGameAttribute("Research")[1][0 | t]
     ? c.asNumber(a.engine.getGameAttribute("CustomLists").h.ResGridSquares[0 | t][2]) *
     c.asNumber(a.engine.getGameAttribute("Research")[0][0 | t]) *
     Math.max(1, m._customBlock_ResearchStuff("Grid_Bonus_Allmulti", 0, 0))
     : c.asNumber(a.engine.getGameAttribute("CustomLists").h.ResGridSquares[0 | t][2]) *
     c.asNumber(a.engine.getGameAttribute("Research")[0][0 | t]) *
     (1 + c.asNumber(a.engine.getGameAttribute("CustomLists").h.Research[5][0 | c.asNumber(a.engine.getGameAttribute("Research")[1][0 | t])]) / 100) *
     Math.max(1, m._customBlock_ResearchStuff("Grid_Bonus_Allmulti", 0, 0));
 if ("Grid_Bonus_Allmulti" == e)
  return (
   1 +
   (m._customBlock_Companions(55) +
    (5 * Math.min(1, c.asNumber(a.engine.getGameAttribute("Research")[0][173]) * m._customBlock_Companions(0)) +
     (m._customBlock_Dreamstuff("CloudBonus", 71) + (m._customBlock_Dreamstuff("CloudBonus", 72) + (m._customBlock_Dreamstuff("CloudBonus", 76) + m._customBlock_SushiStuff("RoG_BonusQTY", 53, 0)))))) /
   100
  );
 if ("Grid_CanWeUseButton" == e)
  return 0 == t
   ? 10 <= c.asNumber(a.engine.getGameAttribute("Lv0")[20])
    ? 1
    : 0
   : 1 == t && (20 <= c.asNumber(a.engine.getGameAttribute("Lv0")[20]) || 1 <= m._customBlock_ResearchStuff("ShapesOwned", 0, 0))
    ? 1
    : 0;
 if ("Grid_CanWeUpgrade" == e)
  return 0 > t ? 0 : c.asNumber(a.engine.getGameAttribute("Research")[0][0 | t]) < m._customBlock_ResearchStuff("Grid_MaxLV", t, 0) && 0 < m._customBlock_ResearchStuff("Grid_PTSavailable", 0, 0) ? 1 : 0;
 if (-1 != e.indexOf("Grid_ShapeVertices"))
  return (
   (n = a.engine.getGameAttribute("DNSM")),
   (r = c.asNumber(y.replace(e, "Grid_ShapeVertices", ""))),
   (n.h.GridSV_DN = r),
   (n = a.engine.getGameAttribute("DNSM")),
   (r = c.asNumber(("" + h.string(a.engine.getGameAttribute("CustomLists").h.Research[1][0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.GridSV_DN)])).split(",")[0]) / 2),
   (n.h.GridSV_Xc = r),
   (n = a.engine.getGameAttribute("DNSM")),
   (r = c.asNumber(("" + h.string(a.engine.getGameAttribute("CustomLists").h.Research[1][0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.GridSV_DN)])).split(",")[1]) / 2),
   (n.h.GridSV_Yc = r),
   0 == i
    ? Math.round(
     c.asNumber(a.engine.getGameAttribute("DNSM").h.GridSV_Xc) +
     c.asNumber(a.engine.getGameAttribute("Research")[6][Math.round(4 * c.asNumber(a.engine.getGameAttribute("DNSM").h.GridSV_DN))]) +
     (c.asNumber(("" + ("" + h.string(a.engine.getGameAttribute("CustomLists").h.Research[0][0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.GridSV_DN)])).split(";")[0 | t]).split(",")[0]) -
      c.asNumber(a.engine.getGameAttribute("DNSM").h.GridSV_Xc)) *
     Math.cos(0.01745329251994278 * c.asNumber(a.engine.getGameAttribute("Research")[6][Math.round(2 + 4 * c.asNumber(a.engine.getGameAttribute("DNSM").h.GridSV_DN))])) -
     (c.asNumber(("" + ("" + h.string(a.engine.getGameAttribute("CustomLists").h.Research[0][0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.GridSV_DN)])).split(";")[0 | t]).split(",")[1]) -
      c.asNumber(a.engine.getGameAttribute("DNSM").h.GridSV_Yc)) *
     Math.sin(0.01745329251994278 * c.asNumber(a.engine.getGameAttribute("Research")[6][Math.round(2 + 4 * c.asNumber(a.engine.getGameAttribute("DNSM").h.GridSV_DN))]))
    )
    : Math.round(
     c.asNumber(a.engine.getGameAttribute("DNSM").h.GridSV_Yc) +
     c.asNumber(a.engine.getGameAttribute("Research")[6][Math.round(1 + 4 * c.asNumber(a.engine.getGameAttribute("DNSM").h.GridSV_DN))]) +
     (c.asNumber(("" + ("" + h.string(a.engine.getGameAttribute("CustomLists").h.Research[0][0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.GridSV_DN)])).split(";")[0 | t]).split(",")[0]) -
      c.asNumber(a.engine.getGameAttribute("DNSM").h.GridSV_Xc)) *
     Math.sin(0.01745329251994278 * c.asNumber(a.engine.getGameAttribute("Research")[6][Math.round(2 + 4 * c.asNumber(a.engine.getGameAttribute("DNSM").h.GridSV_DN))])) +
     (c.asNumber(("" + ("" + h.string(a.engine.getGameAttribute("CustomLists").h.Research[0][0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.GridSV_DN)])).split(";")[0 | t]).split(",")[1]) -
      c.asNumber(a.engine.getGameAttribute("DNSM").h.GridSV_Yc)) *
     Math.cos(0.01745329251994278 * c.asNumber(a.engine.getGameAttribute("Research")[6][Math.round(2 + 4 * c.asNumber(a.engine.getGameAttribute("DNSM").h.GridSV_DN))]))
    )
  );
 if ("Grid_CanWeSelect" == e)
  return 0 > t
   ? 0
   : (9 <= t % 20 && 10 >= t % 20 && 100 <= t && 140 >= t) || 1 <= c.asNumber(a.engine.getGameAttribute("Research")[0][0 | t])
    ? 1
    : "Name" == a.engine.getGameAttribute("CustomLists").h.ResGridSquares[0 | t][0]
     ? 0
     : ((a.engine.getGameAttribute("DNSM").h.Res_SqSel = 0),
      20 > t || (1 <= c.asNumber(a.engine.getGameAttribute("Research")[0][0 | Math.max(0, Math.min(239, Math.round(t - 20)))]) && (a.engine.getGameAttribute("DNSM").h.Res_SqSel = 1)),
      0 != t % 20 && 1 <= c.asNumber(a.engine.getGameAttribute("Research")[0][0 | Math.max(0, Math.min(239, Math.round(t - 1)))]) && (a.engine.getGameAttribute("DNSM").h.Res_SqSel = 1),
      19 != t % 20 && 1 <= c.asNumber(a.engine.getGameAttribute("Research")[0][0 | Math.max(0, Math.min(239, Math.round(t + 1)))]) && (a.engine.getGameAttribute("DNSM").h.Res_SqSel = 1),
      220 <= t || (1 <= c.asNumber(a.engine.getGameAttribute("Research")[0][0 | Math.max(0, Math.min(239, Math.round(t + 20)))]) && (a.engine.getGameAttribute("DNSM").h.Res_SqSel = 1)),
      1 == a.engine.getGameAttribute("DNSM").h.Res_SqSel ? 1 : 0);
 if ("TranscendentArtifactsUnlocked" == e) return 1 <= m._customBlock_ResearchStuff("Grid_Bonus", 109, 0) ? 1 : 0;
 if ("GreenSigilsUnlocked" == e) return 1 <= m._customBlock_ResearchStuff("Grid_Bonus", 128, 0) && 1 == m._customBlock_Spelunk("DoWeHaveLoreN1", 6, 0) ? 1 : 0;
 if ("GreenSigilTrueDMG" == e)
  return 1 == m._customBlock_ResearchStuff("GreenSigilsUnlocked", 0, 0) ? 1 + (m._customBlock_ResearchStuff("Grid_Bonus", 127, 0) * p._customBlock_Labb("TotalGreenSigils", "no", 0, 0)) / 100 : 1;
 if ("RefineryTab3Unlocked" == e) return 1 <= m._customBlock_ResearchStuff("Grid_Bonus", 49, 0) ? 1 : 0;
 if ("RefineryTabsOwned" == e) return Math.round(2 + m._customBlock_ResearchStuff("RefineryTab3Unlocked", 0, 0));
 if ("TinyCogsUnlocked" == e) return 1 <= m._customBlock_ResearchStuff("Grid_Bonus", 89, 0) ? 1 : 0;
 if ("TinyCogsPerDay" == e)
  return Math.round((m._customBlock_ResearchStuff("TinyCogsUnlocked", 0, 0) + m._customBlock_SushiStuff("RoG_BonusQTY", 40, 0)) * Math.max(1, 1 + m._customBlock_Summoning("EventShopOwned", 39, 0)));
 if ("FarmingStickersUnlocked" == e) return 1 <= m._customBlock_ResearchStuff("Grid_Bonus", 88, 0) ? 1 : 0;
 if ("FarmingStickerDMG_unlocked" == e) return 1 <= m._customBlock_ResearchStuff("Grid_Bonus", 47, 0) ? 1 : 0;
 if ("KingRatUnlocked" == e) return 1 <= m._customBlock_ResearchStuff("Grid_Bonus", 108, 0) ? 1 : 0;
 if ("ZuperBitsUnlocked" == e) return 1 <= m._customBlock_ResearchStuff("Grid_Bonus", 87, 0) ? 1 : 0;
 if ("SmallCogSlotsUnlocked" == e) return 1 == m._customBlock_ResearchStuff("TinyCogsUnlocked", 0, 0) ? 1 : 0;
 if ("TheMawIslandUnlocked" == e) return 1 <= m._customBlock_ResearchStuff("Grid_Bonus", 106, 0) ? 1 : 0;
 if ("MSA_BonusRewards" == e)
  return 1 <= m._customBlock_ResearchStuff("Grid_Bonus", 170, 0) && 0 == a.engine.getGameAttribute("OptionsListAccount")[501] ? 1 + m._customBlock_ResearchStuff("Grid_Bonus", 170, 0) / 100 : 1;
 if ("SmallCogBonus" == e)
  return 0 == t ? Math.round(2 * (25 + 25 * Math.pow(i, 2)) * (1 + i / 5)) : 1 == t ? Math.round(4 * (25 + 25 * Math.pow(i, 2)) * (1 + i / 5)) : Math.round((25 + 25 * Math.pow(i, 2)) * (1 + i / 5));
 if ("SmallCogBonusTOTAL" == e) {
  if (((n = a.engine.getGameAttribute("DNSM")), !Object.prototype.hasOwnProperty.call(n.h, "SCBcogTot") || -1 == t))
   for (
    r = [],
    (n = a.engine.getGameAttribute("DNSM")).h.SCBcogTot = r,
    a.engine.getGameAttribute("DNSM").h.SCBcogTot.push(0),
    a.engine.getGameAttribute("DNSM").h.SCBcogTot.push(0),
    a.engine.getGameAttribute("DNSM").h.SCBcogTot.push(0),
    i = 0;
    24 > i;
   )
    ((s = i++),
     -1 != ("" + h.string(a.engine.getGameAttribute("CogOrder")[Math.round(228 + s)])).indexOf("CogSm") &&
     (a.engine.getGameAttribute("DNSM").h.SCBcogTot[a.engine.getGameAttribute("Number2Letter").indexOf(("" + h.string(a.engine.getGameAttribute("CogOrder")[Math.round(228 + s)])).charAt(5))] =
      c.asNumber(
       a.engine.getGameAttribute("DNSM").h.SCBcogTot[a.engine.getGameAttribute("Number2Letter").indexOf(("" + h.string(a.engine.getGameAttribute("CogOrder")[Math.round(228 + s)])).charAt(5))]
      ) +
      m._customBlock_ResearchStuff(
       "SmallCogBonus",
       a.engine.getGameAttribute("Number2Letter").indexOf(("" + h.string(a.engine.getGameAttribute("CogOrder")[Math.round(228 + s)])).charAt(5)),
       Math.round(
        c.asNumber(
         ("" + h.string(a.engine.getGameAttribute("CogOrder")[Math.round(228 + s)])).substring(6, ("" + h.string(a.engine.getGameAttribute("CogOrder")[Math.round(228 + s)])).length)
        )
       )
      )));
  return -1 == t ? 0 : Math.round(c.asNumber(a.engine.getGameAttribute("DNSM").h.SCBcogTot[0 | t]));
 }
 return 0;
}
