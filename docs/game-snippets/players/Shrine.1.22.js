/**
 * Game formula snippet — idleon-efficiency formula research.
 * Function: _customBlock_Shrine (from ActorEvents_345)
 * Game version: 1.22 ("Jelly_Operator")
 * Captured: 2026-10-13 via game-debug-tool (findFunction + toString)
 * Case reference: correctness case issue 450
 */
function(e){if(-1!=c.getCurrentSceneName().indexOf("PlayerSelect"))return 0;var t=a.engine.getGameAttribute("DNSM");if(Object.prototype.hasOwnProperty.call(t.h,"ShrineStuffz723")&&-1!=e)return a.engine.getGameAttribute("DNSM").h.ShrineStuffz723[0|e];for((t=a.engine.getGameAttribute("DNSM")).h.ShrineStuffz723=[],e=0;9>e;)t=e++,a.engine.getGameAttribute("DNSM").h.ShrineStuffz723.push(0),(1<=m._customBlock_Sailing("ArtifactBonus",0,0)||a.engine.getGameAttribute("CurrentMap")==a.engine.getGameAttribute("ShrineInfo")[t][0]||1==p._customBlock_MainframeBonus(5)&&Math.floor(a.engine.getGameAttribute("CurrentMap")/50)==Math.floor(c.asNumber(a.engine.getGameAttribute("ShrineInfo")[t][0])/50))&&.5<c.asNumber(a.engine.getGameAttribute("ShrineInfo")[t][3])&&(a.engine.getGameAttribute("DNSM").h.ShrineStuffz723[t]=(1+5*x._customBlock_RunCodeOfTypeXforThingY("CardLv","Boss3B")/100)*((c.asNumber(a.engine.getGameAttribute("ShrineInfo")[t][3])-1)*c.asNumber(a.engine.getGameAttribute("CustomLists").h.ShrineInfo[t][3])+c.asNumber(a.engine.getGameAttribute("CustomLists").h.ShrineInfo[t][2])));return 0}
