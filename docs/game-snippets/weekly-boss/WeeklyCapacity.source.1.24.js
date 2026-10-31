/**
 * SOURCE-ONLY EXCERPTS. Not standalone functions or runtime captures.
 * Game version: 1.24 (Halloween_Event).
 * Source: IdleonWikiBot/codefiles/idleon1.24.txt:97389-97404,97492-97507.
 * Captured: 2026-10-27. Shared factors then turn-character material capacity.
 */
                            if ("AllCapBonuses" == e)
                                return (
                                    (1 + (p._customBlock_GuildBonuses(2) + k._customBlock_GetTalentNumber(1, 634)) / 100) *
                                    (1 + m._customBlock_Companions(18) / 100) *
                                    (1 + p._customBlock_Shrine(3) / 100) *
                                    Math.max(1 - p._customBlock_prayersReal(4, 1) / 100, 0.4) *
                                    (1 + (p._customBlock_prayersReal(12, 0) + (q._customBlock_GetBribeBonus("23") + 30 * m._customBlock_CompLV2(2))) / 100)
                                );
                            if ("AllCapBASE" == e)
                                return (
                                    m._customBlock_Summoning("VaultUpgBonus", 11, 0) +
                                    1e3 *
                                        (c.asNumber(a.engine.getGameAttribute("BundlesReceived").h.bon_w) +
                                            (c.asNumber(a.engine.getGameAttribute("BundlesReceived").h.bon_x) + c.asNumber(a.engine.getGameAttribute("BundlesReceived").h.bon_y)))
                                );
                            if ("HardCappy" == e) return 205e7;

// Source range 97492-97507 follows.
                            if ("bCraftOtherPlayer" == e) {
                                e = x._customBlock_MaxCapacity("HardCappy");
                                var t = a.engine.getGameAttribute("PlayerDATABASE"),
                                    i = "" + h.string(a.engine.getGameAttribute("GetPlayersUsernames")[0 | c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[185])]);
                                return Math.floor(
                                    Math.min(
                                        e,
                                        c.asNumber(t.h[i].h.MaxCarryCap.h.bCraft) *
                                            (1 + k._customBlock_StampBonusOfTypeX("MatCap") / 100) *
                                            (1 + (25 * c.asNumber(a.engine.getGameAttribute("GemItemsPurchased")[58])) / 100) *
                                            (1 + (k._customBlock_StampBonusOfTypeX("AllCarryCap") + c.asNumber(a.engine.getGameAttribute("DNSM").h.StarSigns.h.CarryCap)) / 100) *
                                            (1 + p._customBlock_getbonus2(1, 78, c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[185])) / 100) *
                                            x._customBlock_MaxCapacity("AllCapBonuses")
                                    )
                                );
                            }
