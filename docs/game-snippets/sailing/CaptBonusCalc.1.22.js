/**
 * Game formula snippet — idleon-efficiency formula research.
 * Function: _customBlock_CaptBonusCalc (from scripts.ActorEvents_579)
 * Game version: 1.22 ("Jelly_Operator")
 * Captured: 2026-09-20 via game-debug-tool (findFunction + toString)
 * Case reference: correctness case issue 394
 */
function (e, t) {
                            if (0 > t) return 0;
                            if (((a.engine.getGameAttribute("DNSM").h.CaptnBonuz = 0), a.engine.getGameAttribute("Captains")[0 | t][1] == e)) {
                                var i = a.engine.getGameAttribute("DNSM"),
                                    n = c.asNumber(a.engine.getGameAttribute("DNSM").h.CaptnBonuz) + c.asNumber(a.engine.getGameAttribute("Captains")[0 | t][3]) * c.asNumber(a.engine.getGameAttribute("Captains")[0 | t][5]);
                                i.h.CaptnBonuz = n;
                            }
                            return (
                                a.engine.getGameAttribute("Captains")[0 | t][2] == e &&
                                    ((i = a.engine.getGameAttribute("DNSM")),
                                    (n = c.asNumber(a.engine.getGameAttribute("DNSM").h.CaptnBonuz) + c.asNumber(a.engine.getGameAttribute("Captains")[0 | t][3]) * c.asNumber(a.engine.getGameAttribute("Captains")[0 | t][6])),
                                    (i.h.CaptnBonuz = n)),
                                a.engine.getGameAttribute("DNSM").h.CaptnBonuz
                            );
                        }
