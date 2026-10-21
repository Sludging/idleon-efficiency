/**
 * Game formula snippet — idleon-efficiency formula research.
 * Function: _customBlock_StampDetails (from scripts.ActorEvents_124)
 * Game version: 1.22 ("Jelly_Operator")
 * Captured: 2026-10-13 via offline game-debug-tool (findFunction + toString)
 * Case reference: #450
 */
function(e){return 0==Math.floor(e/1e3)?(""+h.string(a.engine.getGameAttribute("ItemDefinitionsGET").h["StampA"+Math.round(e-1e3*Math.floor(e/1e3)+1)].h.desc_line1)).split(","):1==Math.floor(e/1e3)?(""+h.string(a.engine.getGameAttribute("ItemDefinitionsGET").h["StampB"+Math.round(e-1e3*Math.floor(e/1e3)+1)].h.desc_line1)).split(","):(""+h.string(a.engine.getGameAttribute("ItemDefinitionsGET").h["StampC"+Math.round(e-1e3*Math.floor(e/1e3)+1)].h.desc_line1)).split(",")}
