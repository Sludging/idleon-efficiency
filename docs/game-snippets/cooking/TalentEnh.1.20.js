/**
 * Game formula snippet — idleon-efficiency formula research.
 * Function: _customBlock_TalentEnh (from scripts.ActorEvents_579)
 * Game version: 1.20 ("Royal_Guardian")
 * Captured: 2026-08-29 via game-debug-tool (findFunction + toString)
 * Case reference: #354
 */
function (e) {
                            if (-1 == e) {
                                var t = a.engine.getGameAttribute("DNSM"),
                                    i = new l();
                                ((t.h.TalENHNC = i),
                                    25 <= p._customBlock_getbonus2(1, 49, -1) && (a.engine.getGameAttribute("DNSM").h.TalENHNC.h[42] = 1),
                                    50 <= p._customBlock_getbonus2(1, 49, -1) && (a.engine.getGameAttribute("DNSM").h.TalENHNC.h[318] = 1),
                                    75 <= p._customBlock_getbonus2(1, 49, -1) && (a.engine.getGameAttribute("DNSM").h.TalENHNC.h[497] = 1),
                                    100 <= p._customBlock_getbonus2(1, 49, -1) && ((t = a.engine.getGameAttribute("DNSM").h.TalENHNC), (i = k._customBlock_GetTalentNumber(1, 79)), (t.h[79] = i)),
                                    125 <= p._customBlock_getbonus2(1, 49, -1) &&
                                        ((t = a.engine.getGameAttribute("DNSM").h.CalcTalentMAP),
                                        Object.prototype.hasOwnProperty.call(t.h, "49_4") || (a.engine.getGameAttribute("DNSM").h.CalcTalentMAP.h["49_4"] = 0),
                                        (t = a.engine.getGameAttribute("DNSM").h.TalENHNC),
                                        (i = Math.pow(1.1, c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentMAP.h["49_4"]))),
                                        (t.h[146] = i)),
                                    150 <= p._customBlock_getbonus2(1, 49, -1) && (a.engine.getGameAttribute("DNSM").h.TalENHNC.h[362] = 1),
                                    175 <= p._customBlock_getbonus2(1, 49, -1) && (a.engine.getGameAttribute("DNSM").h.TalENHNC.h[43] = 1),
                                    200 <= p._customBlock_getbonus2(1, 49, -1) && ((t = a.engine.getGameAttribute("DNSM").h.TalENHNC), (i = p._customBlock_getbonus2(1, 536, -1)), (t.h[536] = i)),
                                    225 <= p._customBlock_getbonus2(1, 49, -1) && (a.engine.getGameAttribute("DNSM").h.TalENHNC.h[165] = 1),
                                    250 <= p._customBlock_getbonus2(1, 49, -1) &&
                                        0 < k._customBlock_GetTalentNumber(1, 35) &&
                                        ((t = a.engine.getGameAttribute("DNSM")),
                                        (i = x._customBlock_TotalStats("LUK")),
                                        (t.h.ExpGainLUK = i),
                                        1e3 > c.asNumber(a.engine.getGameAttribute("DNSM").h.ExpGainLUK)
                                            ? ((t = a.engine.getGameAttribute("DNSM")), (i = (Math.pow(c.asNumber(a.engine.getGameAttribute("DNSM").h.ExpGainLUK) + 1, 0.37) - 1) / 30))
                                            : ((t = a.engine.getGameAttribute("DNSM")),
                                              (i = ((c.asNumber(a.engine.getGameAttribute("DNSM").h.ExpGainLUK) - 1e3) / (c.asNumber(a.engine.getGameAttribute("DNSM").h.ExpGainLUK) + 2500)) * 0.8 + 0.3963)),
                                        (t.h.ExpGainLUK = i),
                                        (t = a.engine.getGameAttribute("DNSM").h.TalENHNC),
                                        (i = (c.asNumber(a.engine.getGameAttribute("DNSM").h.ExpGainLUK) * (1 + k._customBlock_GetTalentNumber(1, 35) / 100)) / 1.8),
                                        (t.h[35] = i)));
                            }
                            return (
                                (t = a.engine.getGameAttribute("DNSM")),
                                Object.prototype.hasOwnProperty.call(t.h, "TalENHNC")
                                    ? ((t = a.engine.getGameAttribute("DNSM").h.TalENHNC), Object.prototype.hasOwnProperty.call(t.h, "" + e) ? a.engine.getGameAttribute("DNSM").h.TalENHNC.h["" + e] : 0)
                                    : 0
                            );
                        }