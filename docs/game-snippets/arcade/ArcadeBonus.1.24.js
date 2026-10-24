/**
 * Game formula snippet — idleon-efficiency formula research.
 * Function: _customBlock_ArcadeBonus (from scripts.ActorEvents_345)
 * Game version: 1.24 ("Halloween_Event")
 * Captured: 2026-10-23 via offline game-debug-tool (findFunction + toString)
 * Work reference: #479/#488/#490 current-version source alignment
 */
function(e){var t=a.engine.getGameAttribute("DNSM"),i=a.engine.getGameAttribute("CustomLists").h.ArcadeShopInfo[0|e];return t.h.ArcadBonDL=i,a.engine.getGameAttribute("DNSM").h.ArcadBonDNz=1,101==a.engine.getGameAttribute("ArcadeUpg")[0|e]?(t=a.engine.getGameAttribute("DNSM"),i=2*c.asNumber(a.engine.getGameAttribute("DNSM").h.ArcadBonDNz),t.h.ArcadBonDNz=i):102==a.engine.getGameAttribute("ArcadeUpg")[0|e]&&(t=a.engine.getGameAttribute("DNSM"),i=6*c.asNumber(a.engine.getGameAttribute("DNSM").h.ArcadBonDNz),t.h.ArcadBonDNz=i),1==m._customBlock_Companions(27)&&(t=a.engine.getGameAttribute("DNSM"),i=2*c.asNumber(a.engine.getGameAttribute("DNSM").h.ArcadBonDNz),t.h.ArcadBonDNz=i),c.asNumber(a.engine.getGameAttribute("DNSM").h.ArcadBonDNz)*x._customBlock_ArbitraryCode5Inputs(""+h.string(a.engine.getGameAttribute("DNSM").h.ArcadBonDL[3]),c.asNumber(a.engine.getGameAttribute("DNSM").h.ArcadBonDL[1]),c.asNumber(a.engine.getGameAttribute("DNSM").h.ArcadBonDL[2]),c.asNumber(a.engine.getGameAttribute("ArcadeUpg")[0|e]),0,0)}
