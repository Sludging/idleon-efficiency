/**
 * Game formula snippet — idleon-efficiency formula research.
 * Function: _customBlock_TalentCalc (from scripts.ActorEvents_124)
 * Game version: 1.19 ("Summer_Event")
 * Captured: 2026-08-21 via game-debug-tool (findFunction + toString)
 * Case reference: #343
 */
function (e) {
                            var t = a.engine.getGameAttribute("DNSM");
                            if (!Object.prototype.hasOwnProperty.call(t.h, "TotStatMAP")) {
                                t = a.engine.getGameAttribute("DNSM");
                                var i = new l();
                                t.h.TotStatMAP = i;
                            }
                            if (
                                ((t = a.engine.getGameAttribute("DNSM")),
                                Object.prototype.hasOwnProperty.call(t.h, "TotalStatsETCmap") || ((t = a.engine.getGameAttribute("DNSM")), (i = new l()), (t.h.TotalStatsETCmap = i)),
                                (t = a.engine.getGameAttribute("DNSM")),
                                Object.prototype.hasOwnProperty.call(t.h, "AlchBubbles") || ((t = a.engine.getGameAttribute("DNSM")), (i = new l()), (t.h.AlchBubbles = i)),
                                (t = a.engine.getGameAttribute("DNSM")),
                                Object.prototype.hasOwnProperty.call(t.h, "AlchVials") || ((t = a.engine.getGameAttribute("DNSM")), (i = new l()), (t.h.AlchVials = i)),
                                (t = a.engine.getGameAttribute("DNSM")),
                                Object.prototype.hasOwnProperty.call(t.h, "BoxRewards") || ((t = a.engine.getGameAttribute("DNSM")), (i = new l()), (t.h.BoxRewards = i)),
                                (t = a.engine.getGameAttribute("DNSM")),
                                Object.prototype.hasOwnProperty.call(t.h, "FamBonusQTYs") || ((t = a.engine.getGameAttribute("DNSM")), (i = new l()), (t.h.FamBonusQTYs = i)),
                                (t = a.engine.getGameAttribute("DNSM")),
                                Object.prototype.hasOwnProperty.call(t.h, "CardBonusS") || ((t = a.engine.getGameAttribute("DNSM")), (i = new l()), (t.h.CardBonusS = i)),
                                (t = a.engine.getGameAttribute("DNSM")),
                                Object.prototype.hasOwnProperty.call(t.h, "MealBonusesS") || ((t = a.engine.getGameAttribute("DNSM")), (i = new l()), (t.h.MealBonusesS = i)),
                                (t = a.engine.getGameAttribute("DNSM")),
                                Object.prototype.hasOwnProperty.call(t.h, "LabMFbonuses") || ((t = a.engine.getGameAttribute("DNSM")), (i = new l()), (t.h.LabMFbonuses = i)),
                                (t = a.engine.getGameAttribute("DNSM")),
                                Object.prototype.hasOwnProperty.call(t.h, "StampBonuses_Map_Of_Val") || ((t = a.engine.getGameAttribute("DNSM")), (i = new l()), (t.h.StampBonuses_Map_Of_Val = i)),
                                (t = a.engine.getGameAttribute("DNSM")),
                                !Object.prototype.hasOwnProperty.call(t.h, "CalcTalentMAP"))
                            ) {
                                ((t = a.engine.getGameAttribute("DNSM")),
                                    (i = new l()),
                                    (t.h.CalcTalentMAP = i),
                                    (i = []),
                                    ((t = a.engine.getGameAttribute("DNSM")).h.CalcTalentDLz = i),
                                    (i = []),
                                    ((t = a.engine.getGameAttribute("DNSM")).h.CalcTalentDL2z = i));
                                for (var s = 0; 9 > s; ) (s++, a.engine.getGameAttribute("DNSM").h.CalcTalentDLz.push(0), a.engine.getGameAttribute("DNSM").h.CalcTalentDL2z.push(0));
                                ((t = a.engine.getGameAttribute("DNSM").h.CalcTalentMAP),
                                    (i = a.engine.getGameAttribute("DNSM").h.CalcTalentDLz),
                                    (t.h[42] = i),
                                    (t = a.engine.getGameAttribute("DNSM").h.CalcTalentMAP),
                                    (i = a.engine.getGameAttribute("DNSM").h.CalcTalentDL2z),
                                    (t.h[43] = i));
                            }
                            if (-7044.5 != e) {
                                if (1 != c.getCurrentSceneName().indexOf("utorial")) {
                                    if (0 >= e) {
                                        for (t = a.engine.getGameAttribute("DNSM"), i = new l(), t.h.CalcTalentMAP = i, s = a.engine.getGameAttribute("DNSM").h.CalcTalentMAP.h.arena = 0; 16 > s; ) {
                                            var _ = s++;
                                            if (!(c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[89]) >= c.asNumber(a.engine.getGameAttribute("CustomLists").h.RANDOlist[53][_]))) break;
                                            a.engine.getGameAttribute("DNSM").h.CalcTalentMAP.h.arena = _ + 1;
                                        }
                                        for (a.engine.getGameAttribute("DNSM").h.CalcTalentDN1 = 1e3, s = 0; 9 > s; )
                                            (!(8 < (_ = s++)) || 1 > c.asNumber(a.engine.getGameAttribute("KillsLeft2Advance")[100][0])) &&
                                                c.asNumber(a.engine.getGameAttribute("Lv0")[_ + 1]) < c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1) &&
                                                ((t = a.engine.getGameAttribute("DNSM")), (i = a.engine.getGameAttribute("Lv0")[_ + 1]), (t.h.CalcTalentDN1 = i));
                                        for (
                                            t = a.engine.getGameAttribute("DNSM").h.CalcTalentMAP,
                                                i = a.engine.getGameAttribute("DNSM").h.CalcTalentDN1,
                                                t.h[31] = i,
                                                a.engine.getGameAttribute("DNSM").h.CalcTalentDN1 = 0,
                                                i = [],
                                                (t = a.engine.getGameAttribute("DNSM")).h.CalcTalentDLz = i,
                                                i = [],
                                                (t = a.engine.getGameAttribute("DNSM")).h.CalcTalentDL2z = i,
                                                s = 0;
                                            9 > s;
                                        )
                                            (s++, a.engine.getGameAttribute("DNSM").h.CalcTalentDLz.push(0), a.engine.getGameAttribute("DNSM").h.CalcTalentDL2z.push(0));
                                        a.engine.getGameAttribute("DNSM").h.CalcTalentDT1 = "No";
                                        for (var o = a.engine.getGameAttribute("PlayerDATABASE").h, g = (o = Object.keys(o)).length, d = 0; d < g; ) {
                                            var b = o[d++];
                                            3 <= c.asNumber(a.engine.getGameAttribute("PlayerDATABASE").h["" + b].h.CharacterClass) &&
                                                6 > c.asNumber(a.engine.getGameAttribute("PlayerDATABASE").h["" + b].h.CharacterClass) &&
                                                (a.engine.getGameAttribute("DNSM").h.CalcTalentDT1 = b);
                                        }
                                        if ("No" != a.engine.getGameAttribute("DNSM").h.CalcTalentDT1 && a.engine.getGameAttribute("DNSM").h.CalcTalentDT1 != a.engine.getGameAttribute("UserInfo")[0])
                                            for (s = 0; 9 > s; ) {
                                                _ = s++;
                                                var N = c.asNumber(a.engine.getGameAttribute("Lv0")[_ + 1]);
                                                t = a.engine.getGameAttribute("PlayerDATABASE");
                                                var y = "" + h.string(a.engine.getGameAttribute("DNSM").h.CalcTalentDT1);
                                                if (N < c.asNumber(t.h[y].h.Lv0[_ + 1])) {
                                                    ((o = a.engine.getGameAttribute("DNSM").h.CalcTalentDLz),
                                                        (g = "" + h.string(a.engine.getGameAttribute("CustomLists").h.TalentDescriptions[42][1][2])),
                                                        (d = c.asNumber(a.engine.getGameAttribute("CustomLists").h.TalentDescriptions[42][1][0])),
                                                        (b = c.asNumber(a.engine.getGameAttribute("CustomLists").h.TalentDescriptions[42][1][1])));
                                                    var R = a.engine.getGameAttribute("PlayerDATABASE");
                                                    ((N = "" + h.string(a.engine.getGameAttribute("DNSM").h.CalcTalentDT1)),
                                                        (o[_] = x._customBlock_ArbitraryCode5Inputs(g, d, b, c.asNumber(R.h[N].h.SkillLevels[42]), 0, 0)),
                                                        (o = a.engine.getGameAttribute("DNSM").h.CalcTalentDL2z),
                                                        (g = "" + h.string(a.engine.getGameAttribute("CustomLists").h.TalentDescriptions[43][1][2])),
                                                        (d = c.asNumber(a.engine.getGameAttribute("CustomLists").h.TalentDescriptions[43][1][0])),
                                                        (b = c.asNumber(a.engine.getGameAttribute("CustomLists").h.TalentDescriptions[43][1][1])),
                                                        (t = a.engine.getGameAttribute("PlayerDATABASE")),
                                                        (y = "" + h.string(a.engine.getGameAttribute("DNSM").h.CalcTalentDT1)),
                                                        (o[_] = x._customBlock_ArbitraryCode5Inputs(g, d, b, c.asNumber(t.h[y].h.SkillLevels[43]), 0, 0)));
                                                }
                                            }
                                        else if (
                                            a.engine.getGameAttribute("DNSM").h.CalcTalentDT1 == a.engine.getGameAttribute("UserInfo")[0] &&
                                            3 <= a.engine.getGameAttribute("CharacterClass") &&
                                            6 > a.engine.getGameAttribute("CharacterClass")
                                        )
                                            for (s = 0; 9 > s; )
                                                ((_ = s++),
                                                    1 == m._customBlock_TalentEnh(42) &&
                                                        ((N = a.engine.getGameAttribute("DNSM").h.CalcTalentDLz),
                                                        (o = "" + h.string(a.engine.getGameAttribute("CustomLists").h.TalentDescriptions[42][1][2])),
                                                        (g = c.asNumber(a.engine.getGameAttribute("CustomLists").h.TalentDescriptions[42][1][0])),
                                                        (d = c.asNumber(a.engine.getGameAttribute("CustomLists").h.TalentDescriptions[42][1][1])),
                                                        (t = a.engine.getGameAttribute("PlayerDATABASE")),
                                                        (y = "" + h.string(a.engine.getGameAttribute("DNSM").h.CalcTalentDT1)),
                                                        (N[_] = 2 * x._customBlock_ArbitraryCode5Inputs(o, g, d, c.asNumber(t.h[y].h.SkillLevels[42]), 0, 0))),
                                                    1 == m._customBlock_TalentEnh(43) &&
                                                        ((b = a.engine.getGameAttribute("DNSM").h.CalcTalentDL2z),
                                                        (o = "" + h.string(a.engine.getGameAttribute("CustomLists").h.TalentDescriptions[43][1][2])),
                                                        (g = c.asNumber(a.engine.getGameAttribute("CustomLists").h.TalentDescriptions[43][1][0])),
                                                        (d = c.asNumber(a.engine.getGameAttribute("CustomLists").h.TalentDescriptions[43][1][1])),
                                                        (R = a.engine.getGameAttribute("PlayerDATABASE")),
                                                        (N = "" + h.string(a.engine.getGameAttribute("DNSM").h.CalcTalentDT1)),
                                                        (b[_] = 2 * x._customBlock_ArbitraryCode5Inputs(o, g, d, c.asNumber(R.h[N].h.SkillLevels[43]), 0, 0))));
                                        for (
                                            t = a.engine.getGameAttribute("DNSM").h.CalcTalentMAP,
                                                i = a.engine.getGameAttribute("DNSM").h.CalcTalentDLz,
                                                t.h[42] = i,
                                                t = a.engine.getGameAttribute("DNSM").h.CalcTalentMAP,
                                                i = a.engine.getGameAttribute("DNSM").h.CalcTalentDL2z,
                                                t.h[43] = i,
                                                a.engine.getGameAttribute("DNSM").h.CalcTalentDN1 = 0,
                                                o = a.engine.getGameAttribute("PlayerDATABASE").h,
                                                g = (o = Object.keys(o)).length,
                                                d = 0;
                                            d < g;
                                        )
                                            ((b = o[d++]),
                                                6 > c.asNumber(a.engine.getGameAttribute("PlayerDATABASE").h["" + b].h.CharacterClass) &&
                                                    c.asNumber(a.engine.getGameAttribute("PlayerDATABASE").h["" + b].h.Lv0[7]) + c.asNumber(a.engine.getGameAttribute("PlayerDATABASE").h["" + b].h.Lv0[9]) >
                                                        c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1) &&
                                                    ((t = a.engine.getGameAttribute("DNSM")),
                                                    (i = c.asNumber(a.engine.getGameAttribute("PlayerDATABASE").h["" + b].h.Lv0[7]) + c.asNumber(a.engine.getGameAttribute("PlayerDATABASE").h["" + b].h.Lv0[9])),
                                                    (t.h.CalcTalentDN1 = i)));
                                        for (
                                            t = a.engine.getGameAttribute("DNSM").h.CalcTalentMAP,
                                                i = Math.max(0, c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1) - 100),
                                                t.h[57] = i,
                                                s = a.engine.getGameAttribute("DNSM").h.CalcTalentDN1 = 0,
                                                b = a.engine.getGameAttribute("Meals")[0].length;
                                            s < b;
                                        )
                                            ((_ = s++),
                                                (t = a.engine.getGameAttribute("DNSM")),
                                                (i = c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1) + c.asNumber(a.engine.getGameAttribute("Meals")[0][_])),
                                                (t.h.CalcTalentDN1 = i));
                                        for (
                                            t = a.engine.getGameAttribute("DNSM").h.CalcTalentMAP,
                                                i = Math.max(0, c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1)),
                                                t.h[59] = i,
                                                a.engine.getGameAttribute("DNSM").h.CalcTalentDN1 = 0,
                                                a.engine.getGameAttribute("DNSM").h.CalcTalentDN2 = 0,
                                                a.engine.getGameAttribute("DNSM").h.CalcTalentDN3 = 0,
                                                a.engine.getGameAttribute("DNSM").h.CalcTalentDN4 = 0,
                                                a.engine.getGameAttribute("DNSM").h.CalcTalentDT1 = "No",
                                                o = a.engine.getGameAttribute("PlayerDATABASE").h,
                                                g = (o = Object.keys(o)).length,
                                                d = 0;
                                            d < g;
                                        )
                                            ((b = o[d++]),
                                                10 == x._customBlock_ReturnClasses(c.asNumber(a.engine.getGameAttribute("PlayerDATABASE").h["" + b].h.CharacterClass))[3] &&
                                                    ("No" == a.engine.getGameAttribute("DNSM").h.CalcTalentDT1 ||
                                                        a.engine.getGameAttribute("GetPlayersUsernames").indexOf(b) > a.engine.getGameAttribute("GetPlayersUsernames").indexOf(a.engine.getGameAttribute("DNSM").h.CalcTalentDT1)) &&
                                                    (a.engine.getGameAttribute("DNSM").h.CalcTalentDT1 = b));
                                        for (s = 0, b = a.engine.getGameAttribute("CustomLists").h.MapAFKtarget.length; s < b; )
                                            if (
                                                ((_ = s++),
                                                (t = a.engine.getGameAttribute("MonsterDefinitionsGET")),
                                                (y = "" + h.string(a.engine.getGameAttribute("CustomLists").h.MapAFKtarget[_])),
                                                Object.prototype.hasOwnProperty.call(t.h, y))
                                            ) {
                                                if (!(_ < a.engine.getGameAttribute("KillsLeft2Advance").length)) break;
                                                if (((R = a.engine.getGameAttribute("MonsterDefinitionsGET")), (N = "" + h.string(a.engine.getGameAttribute("CustomLists").h.MapAFKtarget[_])), "FIGHTING" == R.h[N].h.AFKtype)) {
                                                    if (
                                                        (1e5 <= c.asNumber(a.engine.getGameAttribute("CustomLists").h.MapDetails[_][0][0]) - c.asNumber(a.engine.getGameAttribute("KillsLeft2Advance")[_][0]) &&
                                                            ((t = a.engine.getGameAttribute("DNSM")), (i = c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1) + 1), (t.h.CalcTalentDN1 = i)),
                                                        1e6 <= c.asNumber(a.engine.getGameAttribute("CustomLists").h.MapDetails[_][0][0]) - c.asNumber(a.engine.getGameAttribute("KillsLeft2Advance")[_][0]))
                                                    ) {
                                                        R = a.engine.getGameAttribute("DNSM");
                                                        var A = c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2) + 1;
                                                        R.h.CalcTalentDN2 = A;
                                                    }
                                                    if ("No" != a.engine.getGameAttribute("DNSM").h.CalcTalentDT1) {
                                                        N = c.asNumber(a.engine.getGameAttribute("CustomLists").h.MapDetails[_][0][0]);
                                                        var G = a.engine.getGameAttribute("PlayerDATABASE");
                                                        ((y = "" + h.string(a.engine.getGameAttribute("DNSM").h.CalcTalentDT1)),
                                                            1e8 <= N - c.asNumber(G.h[y].h.KillsLeft2Advance[_][0]) &&
                                                                ((R = a.engine.getGameAttribute("DNSM")), (i = c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN3) + 1), (R.h.CalcTalentDN3 = i)),
                                                            (o = c.asNumber(a.engine.getGameAttribute("CustomLists").h.MapDetails[_][0][0])),
                                                            (y = a.engine.getGameAttribute("PlayerDATABASE")),
                                                            (A = "" + h.string(a.engine.getGameAttribute("DNSM").h.CalcTalentDT1)),
                                                            1e9 <= o - c.asNumber(y.h[A].h.KillsLeft2Advance[_][0]) &&
                                                                ((R = a.engine.getGameAttribute("DNSM")), (N = c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN4) + 1), (R.h.CalcTalentDN4 = N)));
                                                    }
                                                }
                                            }
                                        for (
                                            t = a.engine.getGameAttribute("DNSM").h.CalcTalentMAP,
                                                i = Math.min(c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1), k._customBlock_GetTalentNumber(2, 110)),
                                                t.h[110] = i,
                                                t = a.engine.getGameAttribute("DNSM").h.CalcTalentMAP,
                                                i = Math.min(c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2), k._customBlock_GetTalentNumber(2, 146)),
                                                t.h[146] = i,
                                                t = a.engine.getGameAttribute("DNSM").h.CalcTalentMAP,
                                                i = a.engine.getGameAttribute("DNSM").h.CalcTalentDN4,
                                                t.h[209] = i,
                                                t = a.engine.getGameAttribute("DNSM").h.CalcTalentMAP,
                                                i = a.engine.getGameAttribute("DNSM").h.CalcTalentDN3,
                                                t.h["49_4"] = i,
                                                t = a.engine.getGameAttribute("DNSM"),
                                                i = u.deepCopyList(a.engine.getGameAttribute("Cards")[1]),
                                                t.h.CalcTalentDL1 = i,
                                                s = 0,
                                                b = a.engine.getGameAttribute("DNSM").h.CalcTalentDL1.length;
                                            s < b;
                                        )
                                            ((_ = s++),
                                                (0 == ("" + h.string(a.engine.getGameAttribute("DNSM").h.CalcTalentDL1[(_ - c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1)) | 0])).indexOf("Gem") ||
                                                    0 == ("" + h.string(a.engine.getGameAttribute("DNSM").h.CalcTalentDL1[(_ - c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1)) | 0])).indexOf("Cards")) &&
                                                    (ba.remove(a.engine.getGameAttribute("DNSM").h.CalcTalentDL1, a.engine.getGameAttribute("DNSM").h.CalcTalentDL1[(_ - c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1)) | 0]),
                                                    (t = a.engine.getGameAttribute("DNSM")),
                                                    (i = c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1) + 1),
                                                    (t.h.CalcTalentDN1 = i)));
                                        for (
                                            t = a.engine.getGameAttribute("DNSM").h.CalcTalentMAP,
                                                i = a.engine.getGameAttribute("DNSM").h.CalcTalentDL1.length,
                                                t.h[305] = i,
                                                s = a.engine.getGameAttribute("DNSM").h.CalcTalentDN1 = 0,
                                                b = a.engine.getGameAttribute("Ninja")[103].length;
                                            s < b;
                                        )
                                            ((_ = s++),
                                                (t = a.engine.getGameAttribute("DNSM")),
                                                (i = c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1) + c.asNumber(a.engine.getGameAttribute("Ninja")[103][_])),
                                                (t.h.CalcTalentDN1 = i));
                                        for (t = a.engine.getGameAttribute("DNSM").h.CalcTalentMAP, i = a.engine.getGameAttribute("DNSM").h.CalcTalentDN1, t.h[430] = i, s = a.engine.getGameAttribute("DNSM").h.CalcTalentDN1 = 0; 3 > s; )
                                            for (
                                                _ = s++, a.engine.getGameAttribute("DNSM").h.CalcTalentDN2 = _, b = 0, _ = a.engine.getGameAttribute("StampLevelMAX")[0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2)].length;
                                                b < _;
                                            ) {
                                                var I = b++;
                                                0.5 < c.asNumber(a.engine.getGameAttribute("StampLevelMAX")[0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2)][I]) &&
                                                    ((t = a.engine.getGameAttribute("DNSM")), (i = c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1) + 1), (t.h.CalcTalentDN1 = i));
                                            }
                                        for (
                                            t = a.engine.getGameAttribute("DNSM").h.CalcTalentMAP,
                                                i = a.engine.getGameAttribute("DNSM").h.CalcTalentDN1,
                                                t.h[470] = i,
                                                s = a.engine.getGameAttribute("DNSM").h.CalcTalentDN1 = 0,
                                                b = a.engine.getGameAttribute("CauldronInfo")[4].length;
                                            s < b;
                                        )
                                            ((_ = s++),
                                                3 < c.asNumber(a.engine.getGameAttribute("CauldronInfo")[4][_]) &&
                                                    ((t = a.engine.getGameAttribute("DNSM")), (i = c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1) + 1), (t.h.CalcTalentDN1 = i)));
                                        for (
                                            t = a.engine.getGameAttribute("DNSM").h.CalcTalentMAP,
                                                i = a.engine.getGameAttribute("DNSM").h.CalcTalentDN1,
                                                t.h[485] = i,
                                                s = a.engine.getGameAttribute("DNSM").h.CalcTalentDN1 = 0,
                                                b = a.engine.getGameAttribute("Summon")[0].length;
                                            s < b;
                                        )
                                            ((_ = s++),
                                                (t = a.engine.getGameAttribute("DNSM")),
                                                (i = c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1) + c.asNumber(a.engine.getGameAttribute("Summon")[0][_])),
                                                (t.h.CalcTalentDN1 = i));
                                        for (
                                            t = a.engine.getGameAttribute("DNSM").h.CalcTalentMAP,
                                                i = a.engine.getGameAttribute("DNSM").h.CalcTalentDN1,
                                                t.h[595] = i,
                                                a.engine.getGameAttribute("DNSM").h.CalcTalentMAP.h[616] = 0,
                                                a.engine.getGameAttribute("DNSM").h.CalcTalentMAP.h[620] = 0,
                                                o = a.engine.getGameAttribute("PlayerDATABASE").h,
                                                g = (o = Object.keys(o)).length,
                                                d = 0;
                                            d < g;
                                        )
                                            ((b = o[d++]),
                                                6 > c.asNumber(a.engine.getGameAttribute("PlayerDATABASE").h["" + b].h.CharacterClass) &&
                                                    c.asNumber(a.engine.getGameAttribute("PlayerDATABASE").h["" + b].h.Lv0[0]) > c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentMAP.h[616]) &&
                                                    ((t = a.engine.getGameAttribute("DNSM").h.CalcTalentMAP), (i = a.engine.getGameAttribute("PlayerDATABASE").h["" + b].h.Lv0[0]), (t.h[616] = i)),
                                                c.asNumber(a.engine.getGameAttribute("PlayerDATABASE").h["" + b].h.Lv0[0]) > c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentMAP.h[620]) &&
                                                    ((R = a.engine.getGameAttribute("DNSM").h.CalcTalentMAP), (A = a.engine.getGameAttribute("PlayerDATABASE").h["" + b].h.Lv0[0]), (R.h[620] = A)));
                                        for (
                                            a.engine.getGameAttribute("DNSM").h.CalcTalentMAP.h[643] = -11,
                                                t = a.engine.getGameAttribute("DNSM").h.CalcTalentMAP,
                                                i = c.asNumber(a.engine.getGameAttribute("Lv0")[10]) / 10,
                                                t.h[644] = i,
                                                a.engine.getGameAttribute("DNSM").h.CalcTalentMAP.h[645] = -11,
                                                s = a.engine.getGameAttribute("DNSM").h.CalcTalentMAP.h[650] = 0;
                                            5 > s;
                                        )
                                            for (
                                                _ = s++,
                                                    a.engine.getGameAttribute("DNSM").h.CalcTalentDN1 = _,
                                                    b = 0,
                                                    _ = a.engine.getGameAttribute("CustomLists").h.RANDOlist[(82 + c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1)) | 0].length;
                                                b < _;
                                            )
                                                ((I = b++),
                                                    D.contains(a.engine.getGameAttribute("Cards")[1], a.engine.getGameAttribute("CustomLists").h.RANDOlist[(82 + c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1)) | 0][I]) &&
                                                        ((t = a.engine.getGameAttribute("DNSM").h.CalcTalentMAP), (i = c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentMAP.h[650]) + 1), (t.h[650] = i)));
                                        if (((a.engine.getGameAttribute("DNSM").h.CalcTalentMAP.h[656] = 0), -1 == c.getCurrentSceneName().indexOf("Tutorial")))
                                            for (s = 0, b = a.engine.getGameAttribute("CustomLists").h.DreamChallenge.length; s < b; )
                                                ((_ = s++),
                                                    -1 == c.asNumber(a.engine.getGameAttribute("WeeklyBoss").h["d_" + _]) &&
                                                        ((t = a.engine.getGameAttribute("DNSM").h.CalcTalentMAP), (i = c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentMAP.h[656]) + 1), (t.h[656] = i)));
                                        for (t = a.engine.getGameAttribute("DNSM"), i = new l(), t.h.BoxRewards = i, s = 0, b = a.engine.getGameAttribute("CustomLists").h.PostOffUpgradeInfo.length; s < b; )
                                            for (_ = s++, a.engine.getGameAttribute("DNSM").h.CalcTalentDN3 = _, _ = 0; 3 > _; )
                                                ((I = _++),
                                                    (t = a.engine.getGameAttribute("DNSM").h.BoxRewards),
                                                    (y = "" + h.string(a.engine.getGameAttribute("CustomLists").h.PostOffUpgradeInfo[0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN3)][16 + I])),
                                                    (i = r._customBlock_PostOfficeINFO("BonusAmount", c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN3), "" + I)),
                                                    (R = a.engine.getGameAttribute("DNSM").h.BoxRewards),
                                                    (N = "" + h.string(a.engine.getGameAttribute("CustomLists").h.PostOffUpgradeInfo[0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN3)][16 + I])),
                                                    (A = i + c.asNumber(R.h[N])),
                                                    (t.h[y] = A));
                                        if (-2 == e) {
                                            for (t = a.engine.getGameAttribute("DNSM"), i = new l(), t.h.AlchBubbles = i, s = 0; 4 > s; )
                                                for (
                                                    _ = s++,
                                                        a.engine.getGameAttribute("DNSM").h.CalcTalentDN2 = _,
                                                        b = 0,
                                                        _ = a.engine.getGameAttribute("CustomLists").h.AlchemyDescription[0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2)].length;
                                                    b < _;
                                                )
                                                    ((I = b++),
                                                        (R = a.engine),
                                                        (i = "" + h.string(a.engine.getGameAttribute("CustomLists").h.AlchemyDescription[0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2)][I][15])),
                                                        (R.gameAttributes.h.DummyText = i),
                                                        (1 == m._customBlock_Companions(4) ||
                                                            (-1 != a.engine.getGameAttribute("DummyText").indexOf("ACTIVE") &&
                                                                D.contains(
                                                                    a.engine.getGameAttribute("CauldronBubbles")[a.engine.getGameAttribute("GetPlayersUsernames").indexOf(a.engine.getGameAttribute("UserInfo")[0])],
                                                                    h.string(a.engine.getGameAttribute("Number2Letter")[0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2)]) + ("" + I)
                                                                )) ||
                                                            -1 == a.engine.getGameAttribute("DummyText").indexOf("ACTIVE")) &&
                                                            0 < c.asNumber(a.engine.getGameAttribute("CauldronInfo")[0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2)][I]) &&
                                                            ((t = a.engine.getGameAttribute("DNSM").h.AlchBubbles),
                                                            (y = a.engine.getGameAttribute("DummyText")),
                                                            (A = r._customBlock_CauldronStats("BubbleBonus", c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2), I, 0)),
                                                            (t.h[y] = A),
                                                            "MinEff" == a.engine.getGameAttribute("DummyText") &&
                                                                ((R = a.engine.getGameAttribute("DNSM").h.AlchBubbles),
                                                                (N = a.engine.getGameAttribute("DummyText")),
                                                                (t = a.engine.getGameAttribute("DNSM").h.AlchBubbles),
                                                                (y = a.engine.getGameAttribute("DummyText")),
                                                                (i = c.asNumber(t.h[y]) * k._customBlock_getLOG(x._customBlock_PlayerHPmax())),
                                                                (R.h[N] = i)),
                                                            "ChopEff" == a.engine.getGameAttribute("DummyText") &&
                                                                ((R = a.engine.getGameAttribute("DNSM").h.AlchBubbles),
                                                                (A = a.engine.getGameAttribute("DummyText")),
                                                                (G = a.engine.getGameAttribute("DNSM").h.AlchBubbles),
                                                                (t = a.engine.getGameAttribute("DummyText")),
                                                                (N = c.asNumber(G.h[t]) * k._customBlock_getLOG(x._customBlock_PlayerMPmax())),
                                                                (R.h[A] = N)),
                                                            -1 == a.engine.getGameAttribute("DummyText").indexOf("passz") &&
                                                                -1 == a.engine.getGameAttribute("DummyText").indexOf("ACTIVE") &&
                                                                -1 == a.engine.getGameAttribute("DummyText").indexOf("AllCharz") &&
                                                                (6 < a.engine.getGameAttribute("CharacterClass") &&
                                                                    16 != I &&
                                                                    30 > I &&
                                                                    (0 == a.engine.getGameAttribute("DNSM").h.CalcTalentDN2 && 18 > a.engine.getGameAttribute("CharacterClass") && "Construction" != a.engine.getGameAttribute("DummyText")
                                                                        ? ((R = a.engine.getGameAttribute("DNSM").h.AlchBubbles),
                                                                          (N = a.engine.getGameAttribute("DummyText")),
                                                                          (y = a.engine.getGameAttribute("DNSM").h.AlchBubbles),
                                                                          (I = a.engine.getGameAttribute("DummyText")),
                                                                          (G = c.asNumber(y.h[I]) * Math.max(1, c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.Opassz))),
                                                                          (R.h[N] = G))
                                                                        : 1 == a.engine.getGameAttribute("DNSM").h.CalcTalentDN2 && 30 > a.engine.getGameAttribute("CharacterClass") && 18 <= a.engine.getGameAttribute("CharacterClass")
                                                                          ? ((R = a.engine.getGameAttribute("DNSM").h.AlchBubbles),
                                                                            (t = a.engine.getGameAttribute("DummyText")),
                                                                            (N = a.engine.getGameAttribute("DNSM").h.AlchBubbles),
                                                                            (I = a.engine.getGameAttribute("DummyText")),
                                                                            (i = c.asNumber(N.h[I]) * Math.max(1, c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.Gpassz))),
                                                                            (R.h[t] = i))
                                                                          : 2 == a.engine.getGameAttribute("DNSM").h.CalcTalentDN2 &&
                                                                            42 > a.engine.getGameAttribute("CharacterClass") &&
                                                                            30 <= a.engine.getGameAttribute("CharacterClass") &&
                                                                            ((R = a.engine.getGameAttribute("DNSM").h.AlchBubbles),
                                                                            (N = a.engine.getGameAttribute("DummyText")),
                                                                            (t = a.engine.getGameAttribute("DNSM").h.AlchBubbles),
                                                                            (I = a.engine.getGameAttribute("DummyText")),
                                                                            (I = c.asNumber(t.h[I]) * Math.max(1, c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.Ppassz))),
                                                                            (R.h[N] = I))),
                                                                3 == a.engine.getGameAttribute("DNSM").h.CalcTalentDN2 &&
                                                                    ((N = a.engine.getGameAttribute("DNSM").h.AlchBubbles),
                                                                    (y = a.engine.getGameAttribute("DummyText")),
                                                                    (t = a.engine.getGameAttribute("DNSM").h.AlchBubbles),
                                                                    (R = a.engine.getGameAttribute("DummyText")),
                                                                    (i = c.asNumber(t.h[R])),
                                                                    (N.h[y] = 1 * i)))));
                                            for (s = 0; 4 > s; )
                                                for (
                                                    _ = s++,
                                                        a.engine.getGameAttribute("DNSM").h.CalcTalentDN2 = _,
                                                        b = 0,
                                                        _ = a.engine.getGameAttribute("CustomLists").h.AlchemyDescription[0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2)].length;
                                                    b < _;
                                                )
                                                    ((I = b++),
                                                        (R = a.engine),
                                                        (i = "" + h.string(a.engine.getGameAttribute("CustomLists").h.AlchemyDescription[0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2)][I][15])),
                                                        (R.gameAttributes.h.DummyText = i),
                                                        0 == a.engine.getGameAttribute("DNSM").h.CalcTalentDN2
                                                            ? (0 != I && 2 != I && 4 != I && 7 != I && 14 != I) ||
                                                              ((t = a.engine.getGameAttribute("DNSM").h.AlchBubbles),
                                                              (y = a.engine.getGameAttribute("DummyText")),
                                                              (R = a.engine.getGameAttribute("DNSM").h.AlchBubbles),
                                                              (N = a.engine.getGameAttribute("DummyText")),
                                                              (A = c.asNumber(R.h[N]) * Math.max(1, c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.MultiOr))),
                                                              (t.h[y] = A))
                                                            : 1 == a.engine.getGameAttribute("DNSM").h.CalcTalentDN2
                                                              ? (0 != I && 6 != I && 9 != I && 12 != I && 14 != I) ||
                                                                ((t = a.engine.getGameAttribute("DNSM").h.AlchBubbles),
                                                                (y = a.engine.getGameAttribute("DummyText")),
                                                                (R = a.engine.getGameAttribute("DNSM").h.AlchBubbles),
                                                                (A = a.engine.getGameAttribute("DummyText")),
                                                                (i = c.asNumber(R.h[A]) * Math.max(1, c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.MultiGr))),
                                                                (t.h[y] = i))
                                                              : 2 != a.engine.getGameAttribute("DNSM").h.CalcTalentDN2 ||
                                                                (0 != I && 2 != I && 6 != I && 12 != I && 14 != I) ||
                                                                ((G = a.engine.getGameAttribute("DNSM").h.AlchBubbles),
                                                                (t = a.engine.getGameAttribute("DummyText")),
                                                                (R = a.engine.getGameAttribute("DNSM").h.AlchBubbles),
                                                                (N = a.engine.getGameAttribute("DummyText")),
                                                                (N = c.asNumber(R.h[N]) * Math.max(1, c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.MultiPu))),
                                                                (G.h[t] = N)));
                                            for (s = a.engine.getGameAttribute("DNSM").h.CalcTalentDN2 = 0, b = a.engine.getGameAttribute("Meals")[0].length; s < b; )
                                                ((_ = s++),
                                                    11 <= c.asNumber(a.engine.getGameAttribute("Meals")[0][_]) &&
                                                        ((t = a.engine.getGameAttribute("DNSM")), (i = c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2) + 1), (t.h.CalcTalentDN2 = i)));
                                            for (
                                                t = a.engine.getGameAttribute("DNSM").h.AlchBubbles,
                                                    i = Math.pow(c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.MealSpdz), c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2)),
                                                    t.h.MealSpdz = i,
                                                    t = a.engine.getGameAttribute("DNSM"),
                                                    i = Math.floor(a.engine.getGameAttribute("Cards")[1].length / 100),
                                                    t.h.CalcTalentDN2 = i,
                                                    s = 0;
                                                2 > s;
                                            )
                                                ((_ = s++),
                                                    (t = a.engine.getGameAttribute("DNSM").h.AlchBubbles),
                                                    (y = "W" + Math.round(2 * (1 + _))),
                                                    (i = c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h["W" + Math.round(2 * (1 + _))]) * c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2)),
                                                    (t.h[y] = i),
                                                    (R = a.engine.getGameAttribute("DNSM").h.AlchBubbles),
                                                    (N = "A" + Math.round(2 * (1 + _))),
                                                    (A = c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h["A" + Math.round(2 * (1 + _))]) * c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2)),
                                                    (R.h[N] = A),
                                                    (t = a.engine.getGameAttribute("DNSM").h.AlchBubbles),
                                                    (y = "M" + Math.round(2 * (1 + _))),
                                                    (i = c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h["M" + Math.round(2 * (1 + _))]) * c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2)),
                                                    (t.h[y] = i));
                                            for (
                                                t = a.engine.getGameAttribute("DNSM"),
                                                    i = Math.floor(Math.max(0, (c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[4].behaviors.getBehavior("ActorEvents_229"), ob)._GenInfo[84]) - 5e3) / 2e3)),
                                                    t.h.CalcTalentDN2 = i,
                                                    t = a.engine.getGameAttribute("DNSM").h.AlchBubbles,
                                                    i =
                                                        c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.W8) *
                                                        c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2) *
                                                        (1 + (m._customBlock_Summoning("GrimoireUpgBonus", 17, 0) + m._customBlock_GetSetBonus("TROLL_SET", "Bonus", 0, 0)) / 100),
                                                    t.h.W8 = i,
                                                    t = a.engine.getGameAttribute("DNSM").h.AlchBubbles,
                                                    i =
                                                        c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.A9) *
                                                        c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2) *
                                                        (1 + (m._customBlock_Summoning("GrimoireUpgBonus", 17, 0) + m._customBlock_GetSetBonus("TROLL_SET", "Bonus", 0, 0)) / 100),
                                                    t.h.A9 = i,
                                                    t = a.engine.getGameAttribute("DNSM").h.AlchBubbles,
                                                    i =
                                                        c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.M9) *
                                                        c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2) *
                                                        (1 + (m._customBlock_Summoning("GrimoireUpgBonus", 17, 0) + m._customBlock_GetSetBonus("TROLL_SET", "Bonus", 0, 0)) / 100),
                                                    t.h.M9 = i,
                                                    t = a.engine.getGameAttribute("DNSM").h.AlchBubbles,
                                                    i = c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.W10AllCharz) * c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2),
                                                    t.h.W10AllCharz = i,
                                                    t = a.engine.getGameAttribute("DNSM").h.AlchBubbles,
                                                    i = c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.A10AllCharz) * c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2),
                                                    t.h.A10AllCharz = i,
                                                    t = a.engine.getGameAttribute("DNSM").h.AlchBubbles,
                                                    i = c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.M10AllCharz) * c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2),
                                                    t.h.M10AllCharz = i,
                                                    t = a.engine.getGameAttribute("DNSM"),
                                                    i = Math.max(1, Math.floor((c.asNumber(a.engine.getGameAttribute("Lv0")[0]) - 500) / 10)),
                                                    t.h.CalcTalentDN2 = i,
                                                    t = a.engine.getGameAttribute("DNSM").h.AlchBubbles,
                                                    i = c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.W7) * c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2),
                                                    t.h.W7 = i,
                                                    t = a.engine.getGameAttribute("DNSM").h.AlchBubbles,
                                                    i = c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.A8) * c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2),
                                                    t.h.A8 = i,
                                                    t = a.engine.getGameAttribute("DNSM").h.AlchBubbles,
                                                    i = c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.M7) * c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2),
                                                    t.h.M7 = i,
                                                    a.engine.getGameAttribute("DNSM").h.CalcTalentDN1 = 0,
                                                    a.engine.getGameAttribute("DNSM").h.CalcTalentDN2 = 0,
                                                    a.engine.getGameAttribute("DNSM").h.CalcTalentDN3 = 0,
                                                    o = a.engine.getGameAttribute("PlayerDATABASE").h,
                                                    g = (o = Object.keys(o)).length,
                                                    d = 0;
                                                d < g;
                                            )
                                                ((b = o[d++]),
                                                    6 > c.asNumber(a.engine.getGameAttribute("PlayerDATABASE").h["" + b].h.CharacterClass) ||
                                                        (18 > c.asNumber(a.engine.getGameAttribute("PlayerDATABASE").h["" + b].h.CharacterClass)
                                                            ? ((t = a.engine.getGameAttribute("DNSM")),
                                                              (i = c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1) + c.asNumber(a.engine.getGameAttribute("PlayerDATABASE").h["" + b].h.Lv0[0])),
                                                              (t.h.CalcTalentDN1 = i))
                                                            : 30 > c.asNumber(a.engine.getGameAttribute("PlayerDATABASE").h["" + b].h.CharacterClass)
                                                              ? ((R = a.engine.getGameAttribute("DNSM")),
                                                                (A = c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2) + c.asNumber(a.engine.getGameAttribute("PlayerDATABASE").h["" + b].h.Lv0[0])),
                                                                (R.h.CalcTalentDN2 = A))
                                                              : 42 > c.asNumber(a.engine.getGameAttribute("PlayerDATABASE").h["" + b].h.CharacterClass) &&
                                                                ((t = a.engine.getGameAttribute("DNSM")),
                                                                (i = c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN3) + c.asNumber(a.engine.getGameAttribute("PlayerDATABASE").h["" + b].h.Lv0[0])),
                                                                (t.h.CalcTalentDN3 = i))));
                                            for (
                                                t = a.engine.getGameAttribute("DNSM").h.AlchBubbles,
                                                    i =
                                                        c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.W9AllCharz) *
                                                        (1 + (4 * c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1)) / (c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1) + 1e3)),
                                                    t.h.W9AllCharz = i,
                                                    t = a.engine.getGameAttribute("DNSM").h.AlchBubbles,
                                                    i =
                                                        c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.A7AllCharz) *
                                                        (1 + (4 * c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2)) / (c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2) + 1e3)),
                                                    t.h.A7AllCharz = i,
                                                    t = a.engine.getGameAttribute("DNSM").h.AlchBubbles,
                                                    i =
                                                        c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.M8AllCharz) *
                                                        (1 + (4 * c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN3)) / (c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN3) + 1e3)),
                                                    t.h.M8AllCharz = i,
                                                    7 > a.engine.getGameAttribute("CharacterClass")
                                                        ? ((a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.W1 = 0),
                                                          (a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.A1 = 0),
                                                          (a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.A5 = 0),
                                                          (a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.M5 = 0))
                                                        : 18 > a.engine.getGameAttribute("CharacterClass")
                                                          ? ((a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.A1 = 0),
                                                            (a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.A5 = 0),
                                                            (a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.A6 = 0),
                                                            (a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.M1 = 0),
                                                            (a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.M5 = 0),
                                                            (a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.M6 = 0))
                                                          : 30 > a.engine.getGameAttribute("CharacterClass")
                                                            ? ((a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.M1 = 0),
                                                              (a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.M5 = 0),
                                                              (a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.M6 = 0),
                                                              (a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.W1 = 0),
                                                              (a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.W5 = 0),
                                                              (a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.W6 = 0))
                                                            : ((a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.W1 = 0),
                                                              (a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.W5 = 0),
                                                              (a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.W6 = 0),
                                                              (a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.A1 = 0),
                                                              (a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.A5 = 0),
                                                              (a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.A6 = 0)),
                                                    a.engine.getGameAttribute("DNSM").h.CalcTalentDN1 = 0,
                                                    o = a.engine.getGameAttribute("PlayerDATABASE").h,
                                                    g = (o = Object.keys(o)).length,
                                                    d = 0;
                                                d < g;
                                            )
                                                for (b = o[d++], s = 0; 13 > s; )
                                                    ((_ = s++),
                                                        1 > c.asNumber(a.engine.getGameAttribute("PlayerDATABASE").h["" + b].h.KillsLeft2Advance[251 + _][0]) &&
                                                            ((t = a.engine.getGameAttribute("DNSM")), (i = c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1) + 1), (t.h.CalcTalentDN1 = i)));
                                            for (
                                                t = a.engine.getGameAttribute("DNSM").h.AlchBubbles,
                                                    i = c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.Y6) * c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1),
                                                    t.h.Y6 = i,
                                                    t = a.engine.getGameAttribute("DNSM"),
                                                    i = new l(),
                                                    t.h.AlchVials = i,
                                                    s = 0,
                                                    b = a.engine.getGameAttribute("CustomLists").h.AlchemyDescription[4].length;
                                                s < b;
                                            )
                                                ((_ = s++),
                                                    (t = a.engine.getGameAttribute("DNSM").h.AlchVials),
                                                    (y = "" + h.string(a.engine.getGameAttribute("CustomLists").h.AlchemyDescription[4][_][11])),
                                                    (i = r._customBlock_CauldronStats("VialBonus", 4, _, 0)),
                                                    (R = a.engine.getGameAttribute("DNSM").h.AlchVials),
                                                    (N = "" + h.string(a.engine.getGameAttribute("CustomLists").h.AlchemyDescription[4][_][11])),
                                                    (A = i + c.asNumber(R.h[N])),
                                                    (t.h[y] = A));
                                        }
                                        if (-3 == e)
                                            for (t = a.engine.getGameAttribute("DNSM"), i = new l(), t.h.FamBonusQTYs = i, o = a.engine.getGameAttribute("PlayerDATABASE").h, g = (o = Object.keys(o)).length, d = 0; d < g; )
                                                for (
                                                    b = o[d++],
                                                        a.engine.getGameAttribute("DNSM").h.CalcTalentDT1 = b,
                                                        a.engine.getGameAttribute("DNSM").h.CalcTalentDT1 == a.engine.getGameAttribute("UserInfo")[0]
                                                            ? ((t = a.engine.getGameAttribute("DNSM")),
                                                              (i = a.engine.getGameAttribute("Lv0")[0]),
                                                              (t.h.CalcTalentDN1 = i),
                                                              (R = a.engine.getGameAttribute("DNSM")),
                                                              (A = x._customBlock_ReturnClasses(c.asNumber(a.engine.getGameAttribute("CharacterClass")))),
                                                              (R.h.CalcTalentDL1 = A))
                                                            : ((t = a.engine.getGameAttribute("DNSM")),
                                                              (R = a.engine.getGameAttribute("PlayerDATABASE")),
                                                              (y = "" + h.string(a.engine.getGameAttribute("DNSM").h.CalcTalentDT1)),
                                                              (t.h.CalcTalentDN1 = R.h[y].h.Lv0[0]),
                                                              (G = a.engine.getGameAttribute("DNSM")),
                                                              (R = a.engine.getGameAttribute("PlayerDATABASE")),
                                                              (N = "" + h.string(a.engine.getGameAttribute("DNSM").h.CalcTalentDT1)),
                                                              (i = x._customBlock_ReturnClasses(c.asNumber(R.h[N].h.CharacterClass))),
                                                              (G.h.CalcTalentDL1 = i)),
                                                        s = 0,
                                                        b = a.engine.getGameAttribute("DNSM").h.CalcTalentDL1.length;
                                                    s < b;
                                                )
                                                    for (_ = s++, a.engine.getGameAttribute("DNSM").h.CalcTalentDN2 = _, _ = 0; 2 > _; )
                                                        ((I = _++),
                                                            (y = a.engine.getGameAttribute("DNSM")),
                                                            (N = w._customBlock_FamilyBonsuesREAL(
                                                                c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDL1[0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2)]),
                                                                I,
                                                                c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1)
                                                            )),
                                                            (y.h.CalcTalentDN3 = N),
                                                            (N = c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN3)),
                                                            (R = a.engine.getGameAttribute("DNSM").h.FamBonusQTYs),
                                                            (y = "" + Math.round(2 * c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDL1[0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2)]) + I)),
                                                            N > c.asNumber(R.h[y]) &&
                                                                ((N = a.engine.getGameAttribute("DNSM").h.FamBonusQTYs),
                                                                (A = "" + Math.round(2 * c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDL1[0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2)]) + I)),
                                                                (G = a.engine.getGameAttribute("DNSM").h.CalcTalentDN3),
                                                                (N.h[A] = G),
                                                                0 < k._customBlock_GetTalentNumber(1, 144) &&
                                                                    a.engine.getGameAttribute("DNSM").h.CalcTalentDT1 == a.engine.getGameAttribute("UserInfo")[0] &&
                                                                    ((R = a.engine.getGameAttribute("DNSM").h.FamBonusQTYs),
                                                                    (t = "" + Math.round(2 * c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDL1[0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2)]) + I)),
                                                                    (i = c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN3) * (1 + k._customBlock_GetTalentNumber(1, 144) / 100)),
                                                                    (R.h[t] = i)),
                                                                ("24" != "" + Math.round(2 * c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDL1[0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2)]) + I) &&
                                                                    "44" != "" + Math.round(2 * c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDL1[0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2)]) + I)) ||
                                                                    ((t = a.engine.getGameAttribute("DNSM").h.FamBonusQTYs),
                                                                    (N = "" + Math.round(2 * c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDL1[0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2)]) + I)),
                                                                    (I = c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN3) * (1 + p._customBlock_getbonus2(1, 144, -1) / 100)),
                                                                    (t.h[N] = I)),
                                                                (i = []),
                                                                ((N = a.engine.getGameAttribute("DNSM")).h.CalcTalentDL2 = i),
                                                                a.engine.getGameAttribute("DNSM").h.CalcTalentDL2.push(a.engine.getGameAttribute("DNSM").h.CalcTalentDT1),
                                                                a.engine.getGameAttribute("DNSM").h.CalcTalentDL2.push(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1),
                                                                (t = a.engine.getGameAttribute("DNSM").h.FamBonusQTYs),
                                                                (I = Math.round(2 * c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDL1[0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2)])) + "list"),
                                                                (N = a.engine.getGameAttribute("DNSM").h.CalcTalentDL2),
                                                                (t.h[I] = N)));
                                        if (
                                            -4 == e &&
                                            ((t = a.engine.getGameAttribute("DNSM")),
                                            (i = new l()),
                                            (t.h.CardBonusS = i),
                                            (i = []),
                                            ((t = a.engine.getGameAttribute("DNSM")).h.CardBonusSdl = i),
                                            null != a.engine.getGameAttribute("Cards")[2] && null != n.__cast(a.engine.getGameAttribute("PixelHelperActor")[6].behaviors.getBehavior("ActorEvents_312"), Xa)._GenINFO[45])
                                        ) {
                                            for (s = 0; 10 > s; )
                                                ((_ = s++),
                                                    "B" != a.engine.getGameAttribute("Cards")[2][_] &&
                                                        ((t = a.engine.getGameAttribute("DNSM")),
                                                        (R = n.__cast(a.engine.getGameAttribute("PixelHelperActor")[6].behaviors.getBehavior("ActorEvents_312"), Xa)._GenINFO[45]),
                                                        (y = "" + h.string(a.engine.getGameAttribute("Cards")[2][_])),
                                                        (t.h.CardBonusSdl = R.h[y]),
                                                        (0 == _ && 1 == r._customBlock_chipBonuses("card1")) || (7 == _ && 1 == r._customBlock_chipBonuses("card2"))
                                                            ? ((t = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                              (N = "" + h.string(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3])),
                                                              (i =
                                                                  2 *
                                                                  (1 + m._customBlock_Thingies("LegendPTS_bonus", 21, 0) / 100) *
                                                                  x._customBlock_RunCodeOfTypeXforThingY("CardLv", "" + h.string(a.engine.getGameAttribute("Cards")[2][_])) *
                                                                  c.asNumber(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[4])),
                                                              (R = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                              (y = "" + h.string(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3])),
                                                              (A = i + c.asNumber(R.h[y])),
                                                              (t.h[N] = A))
                                                            : ((G = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                              (A = "" + h.string(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3])),
                                                              (i =
                                                                  (1 + m._customBlock_Thingies("LegendPTS_bonus", 21, 0) / 100) *
                                                                  x._customBlock_RunCodeOfTypeXforThingY("CardLv", "" + h.string(a.engine.getGameAttribute("Cards")[2][_])) *
                                                                  c.asNumber(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[4])),
                                                              (R = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                              (t = "" + h.string(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3])),
                                                              (N = i + c.asNumber(R.h[t])),
                                                              (G.h[A] = N))));
                                            for (
                                                t = a.engine.getGameAttribute("DNSM"),
                                                    i = u.deepCopyMap(a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                    t.h.CardBonusS_old = i,
                                                    0.1 < m._customBlock_RiftStuff("RiftSkillBonus,0", 2) &&
                                                        ((t = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                        (y = "" + h.string(a.engine.getGameAttribute("CustomMaps").h.IDforCardBonus.h[24])),
                                                        (t.h[y] = 0),
                                                        (t = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                        (y = "" + h.string(a.engine.getGameAttribute("CustomMaps").h.IDforCardBonus.h[25])),
                                                        (t.h[y] = 0),
                                                        (t = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                        (y = "" + h.string(a.engine.getGameAttribute("CustomMaps").h.IDforCardBonus.h[33])),
                                                        (t.h[y] = 0),
                                                        (t = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                        (y = "" + h.string(a.engine.getGameAttribute("CustomMaps").h.IDforCardBonus.h[34])),
                                                        (t.h[y] = 0)),
                                                    0.1 < m._customBlock_RiftStuff("RiftSkillBonus,2", 2) &&
                                                        ((t = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                        (y = "" + h.string(a.engine.getGameAttribute("CustomMaps").h.IDforCardBonus.h[27])),
                                                        (t.h[y] = 0),
                                                        (t = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                        (y = "" + h.string(a.engine.getGameAttribute("CustomMaps").h.IDforCardBonus.h[28])),
                                                        (t.h[y] = 0),
                                                        (t = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                        (y = "" + h.string(a.engine.getGameAttribute("CustomMaps").h.IDforCardBonus.h[36])),
                                                        (t.h[y] = 0),
                                                        (t = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                        (y = "" + h.string(a.engine.getGameAttribute("CustomMaps").h.IDforCardBonus.h[37])),
                                                        (t.h[y] = 0)),
                                                    0.1 < m._customBlock_RiftStuff("RiftSkillBonus,3", 2) &&
                                                        ((t = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                        (y = "" + h.string(a.engine.getGameAttribute("CustomMaps").h.IDforCardBonus.h[30])),
                                                        (t.h[y] = 0),
                                                        (t = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                        (y = "" + h.string(a.engine.getGameAttribute("CustomMaps").h.IDforCardBonus.h[31])),
                                                        (t.h[y] = 0),
                                                        (t = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                        (y = "" + h.string(a.engine.getGameAttribute("CustomMaps").h.IDforCardBonus.h[39])),
                                                        (t.h[y] = 0),
                                                        (t = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                        (y = "" + h.string(a.engine.getGameAttribute("CustomMaps").h.IDforCardBonus.h[45])),
                                                        (t.h[y] = 0)),
                                                    0.1 < m._customBlock_RiftStuff("RiftSkillBonus,5", 2) &&
                                                        ((t = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                        (y = "" + h.string(a.engine.getGameAttribute("CustomMaps").h.IDforCardBonus.h[32])),
                                                        (t.h[y] = 0),
                                                        (t = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                        (y = "" + h.string(a.engine.getGameAttribute("CustomMaps").h.IDforCardBonus.h[40])),
                                                        (t.h[y] = 0),
                                                        (t = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                        (y = "" + h.string(a.engine.getGameAttribute("CustomMaps").h.IDforCardBonus.h[41])),
                                                        (t.h[y] = 0),
                                                        (t = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                        (y = "" + h.string(a.engine.getGameAttribute("CustomMaps").h.IDforCardBonus.h[75])),
                                                        (t.h[y] = 0)),
                                                    0.1 < m._customBlock_RiftStuff("RiftSkillBonus,6", 2) &&
                                                        ((t = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                        (y = "" + h.string(a.engine.getGameAttribute("CustomMaps").h.IDforCardBonus.h[53])),
                                                        (t.h[y] = 0),
                                                        (t = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                        (y = "" + h.string(a.engine.getGameAttribute("CustomMaps").h.IDforCardBonus.h[57])),
                                                        (t.h[y] = 0),
                                                        (t = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                        (y = "" + h.string(a.engine.getGameAttribute("CustomMaps").h.IDforCardBonus.h[58])),
                                                        (t.h[y] = 0)),
                                                    0.1 < m._customBlock_RiftStuff("RiftSkillBonus,8", 2) &&
                                                        ((t = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                        (y = "" + h.string(a.engine.getGameAttribute("CustomMaps").h.IDforCardBonus.h[54])),
                                                        (t.h[y] = 0),
                                                        (t = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                        (y = "" + h.string(a.engine.getGameAttribute("CustomMaps").h.IDforCardBonus.h[55])),
                                                        (t.h[y] = 0),
                                                        (t = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                        (y = "" + h.string(a.engine.getGameAttribute("CustomMaps").h.IDforCardBonus.h[52])),
                                                        (t.h[y] = 0)),
                                                    0.1 < m._customBlock_RiftStuff("RiftSkillBonus,18", 2) &&
                                                        ((t = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                        (y = "" + h.string(a.engine.getGameAttribute("CustomMaps").h.IDforCardBonus.h[97])),
                                                        (t.h[y] = 0),
                                                        (t = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                        (y = "" + h.string(a.engine.getGameAttribute("CustomMaps").h.IDforCardBonus.h[98])),
                                                        (t.h[y] = 0),
                                                        (t = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                        (y = "" + h.string(a.engine.getGameAttribute("CustomMaps").h.IDforCardBonus.h[99])),
                                                        (t.h[y] = 0)),
                                                    0.1 < m._customBlock_Summoning("VaultUpgBonus", 44, 0) &&
                                                        ((t = a.engine.getGameAttribute("DNSM").h.CardBonusS), (y = "" + h.string(a.engine.getGameAttribute("CustomMaps").h.IDforCardBonus.h[12])), (t.h[y] = 0)),
                                                    o = n.__cast(a.engine.getGameAttribute("PixelHelperActor")[6].behaviors.getBehavior("ActorEvents_312"), Xa)._GenINFO[45].h,
                                                    g = (o = Object.keys(o)).length,
                                                    d = 0;
                                                d < g;
                                            )
                                                ((b = o[d++]),
                                                    (t = a.engine.getGameAttribute("DNSM")),
                                                    (i = n.__cast(a.engine.getGameAttribute("PixelHelperActor")[6].behaviors.getBehavior("ActorEvents_312"), Xa)._GenINFO[45].h["" + b]),
                                                    (t.h.CardBonusSdl = i),
                                                    -1 != ("" + h.string(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3])).indexOf("Mining") && 0.1 < m._customBlock_RiftStuff("RiftSkillBonus,0", 2)
                                                        ? ((R = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                          (y = "" + h.string(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3])),
                                                          (A = x._customBlock_RunCodeOfTypeXforThingY("CardLv", "" + b) * c.asNumber(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[4])),
                                                          (t = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                          (N = "" + h.string(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3])),
                                                          (i = A + c.asNumber(t.h[N])),
                                                          (R.h[y] = i))
                                                        : -1 != ("" + h.string(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3])).indexOf("Choppin") && 0.1 < m._customBlock_RiftStuff("RiftSkillBonus,2", 2)
                                                          ? ((R = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                            (y = "" + h.string(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3])),
                                                            (N = x._customBlock_RunCodeOfTypeXforThingY("CardLv", "" + b) * c.asNumber(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[4])),
                                                            (G = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                            (A = "" + h.string(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3])),
                                                            (G = N + c.asNumber(G.h[A])),
                                                            (R.h[y] = G))
                                                          : -1 != ("" + h.string(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3])).indexOf("Fishing") && 0.1 < m._customBlock_RiftStuff("RiftSkillBonus,3", 2)
                                                            ? ((R = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                              (t = "" + h.string(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3])),
                                                              (i = x._customBlock_RunCodeOfTypeXforThingY("CardLv", "" + b) * c.asNumber(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[4])),
                                                              (y = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                              (N = "" + h.string(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3])),
                                                              (I = i + c.asNumber(y.h[N])),
                                                              (R.h[t] = I))
                                                            : -1 != ("" + h.string(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3])).indexOf("Catching") && 0.1 < m._customBlock_RiftStuff("RiftSkillBonus,5", 2)
                                                              ? ((R = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                                (I = "" + h.string(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3])),
                                                                (i = x._customBlock_RunCodeOfTypeXforThingY("CardLv", "" + b) * c.asNumber(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[4])),
                                                                (N = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                                (t = "" + h.string(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3])),
                                                                (N = i + c.asNumber(N.h[t])),
                                                                (R.h[I] = N))
                                                              : (-1 != ("" + h.string(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3])).indexOf("Trapping") ||
                                                                      "+{%_Shiny_Critter_Chance" == a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3]) &&
                                                                  0.1 < m._customBlock_RiftStuff("RiftSkillBonus,6", 2)
                                                                ? ((R = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                                  (I = "" + h.string(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3])),
                                                                  (s = x._customBlock_RunCodeOfTypeXforThingY("CardLv", "" + b) * c.asNumber(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[4])),
                                                                  (t = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                                  (N = "" + h.string(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3])),
                                                                  (s += c.asNumber(t.h[N])),
                                                                  (R.h[I] = s))
                                                                : ("+{%_Charge_Rate" == a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3] ||
                                                                        "+{_Starting_Pts_in_Worship" == a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3] ||
                                                                        "+{%_Max_Charge" == a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3]) &&
                                                                    0.1 < m._customBlock_RiftStuff("RiftSkillBonus,8", 2)
                                                                  ? ((N = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                                    (I = "" + h.string(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3])),
                                                                    (s = x._customBlock_RunCodeOfTypeXforThingY("CardLv", "" + b) * c.asNumber(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[4])),
                                                                    (t = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                                    (y = "" + h.string(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3])),
                                                                    (s += c.asNumber(t.h[y])),
                                                                    (N.h[I] = s))
                                                                  : -1 != ("" + h.string(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3])).indexOf("Spelunking") && 0.1 < m._customBlock_RiftStuff("RiftSkillBonus,18", 2)
                                                                    ? ((s = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                                      (R = "" + h.string(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3])),
                                                                      (b = x._customBlock_RunCodeOfTypeXforThingY("CardLv", "" + b) * c.asNumber(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[4])),
                                                                      (_ = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                                      (I = "" + h.string(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3])),
                                                                      (b += c.asNumber(_.h[I])),
                                                                      (s.h[R] = b))
                                                                    : "+{%_Card_Drop_Chance" == a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3] &&
                                                                      0.1 < m._customBlock_Summoning("VaultUpgBonus", 44, 0) &&
                                                                      ((s = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                                      (_ = "" + h.string(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3])),
                                                                      (b = x._customBlock_RunCodeOfTypeXforThingY("CardLv", "" + b) * c.asNumber(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[4])),
                                                                      (R = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                                      (I = "" + h.string(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3])),
                                                                      (b += c.asNumber(R.h[I])),
                                                                      (s.h[_] = b)));
                                        }
                                        if (-6 == e)
                                            for (t = a.engine.getGameAttribute("DNSM"), i = new l(), t.h.MealBonusesS = i, s = 0; 74 > s; )
                                                ((_ = s++),
                                                    "PxLine" == a.engine.getGameAttribute("CustomLists").h.MealINFO[_][5]
                                                        ? ((t = a.engine.getGameAttribute("DNSM").h.MealBonusesS),
                                                          (y = "" + h.string(a.engine.getGameAttribute("CustomLists").h.MealINFO[_][5])),
                                                          (i = c.asNumber(a.engine.getGameAttribute("Meals")[0][_]) * c.asNumber(a.engine.getGameAttribute("CustomLists").h.MealINFO[_][2])),
                                                          (R = a.engine.getGameAttribute("DNSM").h.MealBonusesS),
                                                          (N = "" + h.string(a.engine.getGameAttribute("CustomLists").h.MealINFO[_][5])),
                                                          (A = i + c.asNumber(R.h[N])),
                                                          (t.h[y] = A))
                                                        : ((t = a.engine.getGameAttribute("DNSM").h.MealBonusesS),
                                                          (y = "" + h.string(a.engine.getGameAttribute("CustomLists").h.MealINFO[_][5])),
                                                          (i =
                                                              m._customBlock_Summoning2("BonusMultiCook", _, 0) *
                                                              p._customBlock_CookingR("CookingMealBonusMultioo", 0, 0) *
                                                              m._customBlock_Summoning("RibbonBonus", c.asNumber(a.engine.getGameAttribute("Ribbon")[Math.round(28 + _)]), 0) *
                                                              c.asNumber(a.engine.getGameAttribute("Meals")[0][_]) *
                                                              c.asNumber(a.engine.getGameAttribute("CustomLists").h.MealINFO[_][2])),
                                                          (R = a.engine.getGameAttribute("DNSM").h.MealBonusesS),
                                                          (A = "" + h.string(a.engine.getGameAttribute("CustomLists").h.MealINFO[_][5])),
                                                          (N = i + c.asNumber(R.h[A])),
                                                          (t.h[y] = N)));
                                        if (-7 == e) {
                                            for (
                                                t = a.engine.getGameAttribute("DNSM"),
                                                    i = new l(),
                                                    t.h.LabMFbonuses = i,
                                                    t = a.engine.getGameAttribute("DNSM").h.LabMFbonuses,
                                                    i = p._customBlock_MainframeBonus(100),
                                                    t.h[100] = i,
                                                    s = 0,
                                                    b = a.engine.getGameAttribute("CustomLists").h.JewelDesc.length;
                                                s < b;
                                            )
                                                ((_ = s++), (t = a.engine.getGameAttribute("DNSM").h.LabMFbonuses), (i = p._customBlock_MainframeBonus(100 + _)), (t.h["" + (100 + _)] = i));
                                            for (s = 0, b = a.engine.getGameAttribute("CustomLists").h.LabMainBonus.length; s < b; )
                                                ((_ = s++), (t = a.engine.getGameAttribute("DNSM").h.LabMFbonuses), (i = p._customBlock_MainframeBonus(_)), (t.h["" + _] = i));
                                            if (((a.engine.getGameAttribute("DNSM").h.LabMFbonuses.h.YES = 1), 0 < c.asNumber(a.engine.getGameAttribute("DNSM").h.LabMFbonuses.h[114]))) {
                                                for (
                                                    s = a.engine.getGameAttribute("DNSM").h.CalcTalentDN2 = 0;
                                                    10 > s && ((_ = s++), (a.engine.getGameAttribute("DNSM").h.CalcTalentDN1 = _), 0 != a.engine.getGameAttribute("Cooking")[_][0]);
                                                )
                                                    ((t = a.engine.getGameAttribute("DNSM")),
                                                        (i =
                                                            c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2) +
                                                            c.asNumber(a.engine.getGameAttribute("Cooking")[0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1)][6])),
                                                        (t.h.CalcTalentDN2 = i),
                                                        (R = a.engine.getGameAttribute("DNSM")),
                                                        (A =
                                                            c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2) +
                                                            c.asNumber(a.engine.getGameAttribute("Cooking")[0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1)][7])),
                                                        (R.h.CalcTalentDN2 = A),
                                                        (t = a.engine.getGameAttribute("DNSM")),
                                                        (i =
                                                            c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2) +
                                                            c.asNumber(a.engine.getGameAttribute("Cooking")[0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1)][8])),
                                                        (t.h.CalcTalentDN2 = i));
                                                ((t = a.engine.getGameAttribute("DNSM").h.LabMFbonuses),
                                                    (i = c.asNumber(a.engine.getGameAttribute("DNSM").h.LabMFbonuses.h[114]) * Math.floor((c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2) + 0.5) / 25)),
                                                    (t.h[114] = i));
                                            }
                                            if (0 < c.asNumber(a.engine.getGameAttribute("DNSM").h.LabMFbonuses.h[9])) {
                                                if (
                                                    ((R = a.engine),
                                                    (i = a.engine.getGameAttribute("CustomLists").h.MapAFKtarget.indexOf("mushG")),
                                                    (R.gameAttributes.h.DummyNumber3 = i),
                                                    (a.engine.gameAttributes.h.DummyNumber4 = 0),
                                                    0 <= a.engine.getGameAttribute("DummyNumber3"))
                                                )
                                                    for (
                                                        R = a.engine,
                                                            i =
                                                                c.asNumber(a.engine.getGameAttribute("CustomLists").h.MapDetails[0 | a.engine.getGameAttribute("DummyNumber3")][0][0]) -
                                                                c.asNumber(a.engine.getGameAttribute("KillsLeft2Advance")[0 | a.engine.getGameAttribute("DummyNumber3")][0]),
                                                            R.gameAttributes.h.DummyNumber4 = i,
                                                            o = a.engine.getGameAttribute("PlayerDATABASE").h,
                                                            g = (o = Object.keys(o)).length,
                                                            d = 0;
                                                        d < g;
                                                    )
                                                        ((b = o[d++]),
                                                            a.engine.getGameAttribute("UserInfo")[0] != b &&
                                                                ((R = a.engine),
                                                                (i =
                                                                    a.engine.getGameAttribute("DummyNumber4") +
                                                                    (c.asNumber(a.engine.getGameAttribute("CustomLists").h.MapDetails[0 | a.engine.getGameAttribute("DummyNumber3")][0][0]) -
                                                                        c.asNumber(a.engine.getGameAttribute("PlayerDATABASE").h["" + b].h.KillsLeft2Advance[0 | a.engine.getGameAttribute("DummyNumber3")][0]))),
                                                                (R.gameAttributes.h.DummyNumber4 = i)));
                                                (1e8 > a.engine.getGameAttribute("DummyNumber4") / 1e6
                                                    ? ((t = a.engine.getGameAttribute("DNSM").h.LabMFbonuses),
                                                      (i = c.asNumber(a.engine.getGameAttribute("DNSM").h.LabMFbonuses.h[9]) * Math.floor(a.engine.getGameAttribute("DummyNumber4") / 1e6)))
                                                    : ((t = a.engine.getGameAttribute("DNSM").h.LabMFbonuses), (i = c.asNumber(a.engine.getGameAttribute("DNSM").h.LabMFbonuses.h[9]) * (a.engine.getGameAttribute("DummyNumber4") / 1e6))),
                                                    (t.h[9] = i));
                                            }
                                            ((a.engine.getGameAttribute("DNSM").h.LabMFbonuses.h.GrStk = 0),
                                                0 < c.asNumber(a.engine.getGameAttribute("DNSM").h.LabMFbonuses.h[11]) &&
                                                    ((t = a.engine.getGameAttribute("DNSM").h.LabMFbonuses), (i = a.engine.getGameAttribute("GreenStacks").length), (t.h.GrStk = i)),
                                                (t = a.engine.getGameAttribute("DNSM").h.LabMFbonuses),
                                                (i = c.asNumber(a.engine.getGameAttribute("DNSM").h.LabMFbonuses.h[11]) * a.engine.getGameAttribute("GreenStacks").length),
                                                (t.h[11] = i));
                                        }
                                        -9 == e &&
                                            ((t = a.engine.getGameAttribute("DNSM")),
                                            (i = m._customBlock_Sailing("ArtifactBonus", -1, 0)),
                                            (t.h.InitArtiBonz = i),
                                            (t = a.engine.getGameAttribute("DNSM")),
                                            (i = m._customBlock_TalentEnh(-1)),
                                            (t.h.random39 = i),
                                            (t = a.engine.getGameAttribute("DNSM")),
                                            (i = m._customBlock_RiftStuff("skillLvRanks", 0)),
                                            (t.h.random39 = i));
                                    }
                                    if (31 == e) return k._customBlock_GetTalentNumber(1, 31) * Math.floor(c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentMAP.h[31]) / 5);
                                    if (57 == e) return p._customBlock_getbonus2(1, 57, -1) * c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentMAP.h[57]);
                                    if (59 == e)
                                        return 0 < k._customBlock_GetTalentNumber(1, 59)
                                            ? Math.pow(Math.min(1.012, 1 + k._customBlock_GetTalentNumber(1, 59) / 100), c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentMAP.h[59]))
                                            : Math.pow(Math.min(1.012, 1 + p._customBlock_getbonus2(1, 59, -1) / 100), c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentMAP.h[59]));
                                    if (110 == e) return k._customBlock_GetTalentNumber(1, 110) * c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentMAP.h[110]);
                                    if (125 == e) {
                                        if (
                                            ((a.engine.getGameAttribute("DNSM").h.CalcTalentDN1 = 0),
                                            (N = x._customBlock_PlayerAccTot()),
                                            (t = a.engine.getGameAttribute("MonsterDefinitionsGET")),
                                            (y = a.engine.getGameAttribute("AFKtarget")),
                                            N >= 2.25 * c.asNumber(t.h[y].h.Defence))
                                        ) {
                                            for (s = 0; 6 > s; )
                                                ((_ = s++),
                                                    (t = a.engine.getGameAttribute("DNSM")),
                                                    (i = c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1) + c.asNumber(a.engine.getGameAttribute("Refinery")[3 + _][1])),
                                                    (t.h.CalcTalentDN1 = i));
                                            return a.engine.getGameAttribute("DNSM").h.CalcTalentDN1;
                                        }
                                        return 0;
                                    }
                                    if (146 == e) return k._customBlock_GetTalentNumber(1, 146) * c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentMAP.h[146]);
                                    if (209 == e) return k._customBlock_GetTalentNumber(1, 209) * c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentMAP.h[209]);
                                    if (305 == e) return k._customBlock_GetTalentNumber(1, 305) * c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentMAP.h[305]);
                                    if (430 == e)
                                        return 0 < k._customBlock_GetTalentNumber(1, 430)
                                            ? k._customBlock_GetTalentNumber(1, 430) * Math.floor(c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentMAP.h[430]) / 10)
                                            : p._customBlock_getbonus2(1, 430, -1) * Math.floor(c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentMAP.h[430]) / 10);
                                    if (470 == e) return k._customBlock_GetTalentNumber(1, 470) * c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentMAP.h[470]);
                                    if (485 == e) return k._customBlock_GetTalentNumber(1, 485) * c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentMAP.h[485]);
                                    if (493 == e) {
                                        for (s = a.engine.getGameAttribute("DNSM").h.CalcTalentDN1 = 0, b = a.engine.getGameAttribute("GetPlayersUsernames").length; s < b; )
                                            ((_ = s++),
                                                a.engine.getGameAttribute("GetPlayersUsernames")[_] == a.engine.getGameAttribute("UserInfo")[0]
                                                    ? ((t = a.engine.getGameAttribute("DNSM")), (i = c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1) + k._customBlock_GetTalentNumber(1, 493)), (t.h.CalcTalentDN1 = i))
                                                    : c.asNumber(a.engine.getGameAttribute("CauldronJobs")[1][_]) + 1 ==
                                                          c.asNumber(a.engine.getGameAttribute("CauldronJobs")[1][a.engine.getGameAttribute("GetPlayersUsernames").indexOf(a.engine.getGameAttribute("UserInfo")[0])]) + 1 &&
                                                      ((R = a.engine.getGameAttribute("DNSM")),
                                                      (A = c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1)),
                                                      (i = "" + h.string(a.engine.getGameAttribute("CustomLists").h.TalentDescriptions[493][1][2])),
                                                      (N = c.asNumber(a.engine.getGameAttribute("CustomLists").h.TalentDescriptions[493][1][0])),
                                                      (G = c.asNumber(a.engine.getGameAttribute("CustomLists").h.TalentDescriptions[493][1][1])),
                                                      (t = a.engine.getGameAttribute("PlayerDATABASE")),
                                                      (y = "" + h.string(a.engine.getGameAttribute("GetPlayersUsernames")[_])),
                                                      (i = A + x._customBlock_ArbitraryCode5Inputs(i, N, G, c.asNumber(t.h[y].h.SkillLevels[493]), 0, 0)),
                                                      (R.h.CalcTalentDN1 = i)));
                                        return a.engine.getGameAttribute("DNSM").h.CalcTalentDN1;
                                    }
                                    return 616 == e
                                        ? Math.min(k._customBlock_GetTalentNumber(1, 616), Math.floor(c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentMAP.h[616]) / 10))
                                        : 620 == e
                                          ? Math.min(k._customBlock_GetTalentNumber(1, 620), Math.floor(c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentMAP.h[620]) / 10))
                                          : 656 == e
                                            ? k._customBlock_GetTalentNumber(1, 656) * c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentMAP.h[656])
                                            : 643 == e || 644 == e || 645 == e
                                              ? (643 == e && -11 == a.engine.getGameAttribute("DNSM").h.CalcTalentMAP.h["" + e]
                                                    ? ((t = a.engine.getGameAttribute("DNSM").h.CalcTalentMAP), (i = x._customBlock_RunCodeOfTypeXforThingY("OverkillStuffs", "2")), (t.h[643] = i))
                                                    : 645 == e &&
                                                      -11 == a.engine.getGameAttribute("DNSM").h.CalcTalentMAP.h["" + e] &&
                                                      ((a.engine.getGameAttribute("DNSM").h.CalcTalentDN1 = 0),
                                                      (N = Math.floor(x._customBlock_PlayerAccTot())),
                                                      (t = a.engine.getGameAttribute("MonsterDefinitionsGET")),
                                                      (y = a.engine.getGameAttribute("AFKtarget")),
                                                      N > 1.5 * c.asNumber(t.h[y].h.Defence) &&
                                                          ((t = a.engine.getGameAttribute("DNSM")),
                                                          (i = x._customBlock_PlayerAccTot()),
                                                          (R = a.engine.getGameAttribute("MonsterDefinitionsGET")),
                                                          (y = a.engine.getGameAttribute("AFKtarget")),
                                                          (A = k._customBlock_getLOG(i - 1.5 * c.asNumber(R.h[y].h.Defence))),
                                                          (t.h.CalcTalentDN1 = A)),
                                                      (t = a.engine.getGameAttribute("DNSM").h.CalcTalentMAP),
                                                      (i = a.engine.getGameAttribute("DNSM").h.CalcTalentDN1),
                                                      (t.h[645] = i)),
                                                k._customBlock_GetTalentNumber(1, e) * c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentMAP.h["" + e]))
                                              : 650 == e
                                                ? k._customBlock_GetTalentNumber(1, 650) * c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentMAP.h[650])
                                                : 1;
                                }
                                return 1;
                            }
                            if (((t = a.engine.getGameAttribute("DNSM")), !Object.prototype.hasOwnProperty.call(t.h, "ItemzzSellPricesz"))) {
                                if (
                                    ((t = a.engine.getGameAttribute("CustomLists")),
                                    Object.prototype.hasOwnProperty.call(t.h, "ItemToCraftNAME") || ((t = a.engine.getGameAttribute("CustomLists")), (i = ka.ItemToCraftNAME()), (t.h.ItemToCraftNAME = i)),
                                    (t = a.engine.getGameAttribute("CustomLists")),
                                    Object.prototype.hasOwnProperty.call(t.h, "ItemToCraftCostTYPE") || ((t = a.engine.getGameAttribute("CustomLists")), (i = ka.ItemToCraftCostTYPE()), (t.h.ItemToCraftCostTYPE = i)),
                                    0 == D.mapCount(a.engine.getGameAttribute("ItemDefinitionsGET")))
                                ) {
                                    for (
                                        R = a.engine,
                                            i = u.deepCopyMap(O.get()),
                                            R.gameAttributes.h.ItemDefinitionsGET = i,
                                            R = a.engine,
                                            i = u.deepCopyMap(Q.get()),
                                            R.gameAttributes.h.DummyMap = i,
                                            o = a.engine.getGameAttribute("DummyMap").h,
                                            g = (o = Object.keys(o)).length,
                                            d = 0;
                                        d < g;
                                    )
                                        ((b = o[d++]), (t = a.engine.getGameAttribute("ItemDefinitionsGET")), (i = a.engine.getGameAttribute("DummyMap").h["" + b]), (t.h["" + b] = i));
                                    for (
                                        R = a.engine,
                                            i = new l(),
                                            R.gameAttributes.h.DummyMap = i,
                                            R = a.engine,
                                            i = u.deepCopyMap(T.get()),
                                            R.gameAttributes.h.DummyMap = i,
                                            o = a.engine.getGameAttribute("DummyMap").h,
                                            g = (o = Object.keys(o)).length,
                                            d = 0;
                                        d < g;
                                    )
                                        ((b = o[d++]), (t = a.engine.getGameAttribute("ItemDefinitionsGET")), (i = a.engine.getGameAttribute("DummyMap").h["" + b]), (t.h["" + b] = i));
                                    ((R = a.engine), (i = new l()), (R.gameAttributes.h.DummyMap = i), p._customBlock_ActionBlock("InitItemDefinitions", "no", 0, 0));
                                }
                                if (0 <= m._customBlock_Language())
                                    for (t = a.engine.getGameAttribute("CustomLists"), i = gd.ItemNamesLANG(), t.h.ItemNamesLANG = i, o = a.engine.getGameAttribute("ItemDefinitionsGET").h, g = (o = Object.keys(o)).length, d = 0; d < g; )
                                        ((b = o[d++]),
                                            (t = a.engine.getGameAttribute("DNSM")),
                                            (i = a.engine.getGameAttribute("CustomLists").h.ItemNamesLANG[0].indexOf(a.engine.getGameAttribute("ItemDefinitionsGET").h["" + b].h.displayName)),
                                            (t.h.ItemLangNameDN = i),
                                            0 <= c.asNumber(a.engine.getGameAttribute("DNSM").h.ItemLangNameDN) &&
                                                ((R = a.engine.getGameAttribute("ItemDefinitionsGET").h["" + b]),
                                                (A = a.engine.getGameAttribute("CustomLists").h.ItemNamesLANG[(m._customBlock_Language() + 1) | 0][0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.ItemLangNameDN)]),
                                                (R.h.displayName = A)));
                                for (t = a.engine.getGameAttribute("DNSM"), i = new l(), t.h.ItemzzSellPricesz = i, s = 0, b = a.engine.getGameAttribute("CustomLists").h.ItemToCraftNAME.length; s < b; )
                                    for (
                                        _ = s++,
                                            a.engine.getGameAttribute("DNSM").h.CalcTalentDN1 = _,
                                            _ = 0,
                                            e = a.engine.getGameAttribute("CustomLists").h.ItemToCraftNAME[0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1)].length;
                                        _ < e;
                                    ) {
                                        for (
                                            I = _++,
                                                a.engine.getGameAttribute("DNSM").h.CalcTalentDN2 = I,
                                                a.engine.getGameAttribute("DNSM").h.CalcTalentDN3 = 0,
                                                t = a.engine.getGameAttribute("DNSM"),
                                                i =
                                                    a.engine.getGameAttribute("CustomLists").h.ItemToCraftCostTYPE[0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1)][
                                                        0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2)
                                                    ],
                                                t.h.CalcTalentDL1 = i,
                                                o = 0,
                                                g = a.engine.getGameAttribute("DNSM").h.CalcTalentDL1.length;
                                            o < g;
                                        )
                                            ((d = o++),
                                                (R = a.engine.getGameAttribute("DNSM")),
                                                (A =
                                                    c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN3) +
                                                    x._customBlock_RunCodeOfTypeXforThingY("SellPrice", "" + h.string(a.engine.getGameAttribute("DNSM").h.CalcTalentDL1[d][0])) *
                                                        c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDL1[d][1])),
                                                (R.h.CalcTalentDN3 = A));
                                        ((t = a.engine.getGameAttribute("DNSM").h.ItemzzSellPricesz),
                                            (y =
                                                "" +
                                                h.string(
                                                    a.engine.getGameAttribute("CustomLists").h.ItemToCraftNAME[0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1)][
                                                        0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2)
                                                    ]
                                                )),
                                            (i = a.engine.getGameAttribute("DNSM").h.CalcTalentDN3),
                                            (t.h[y] = i));
                                    }
                            }
                            return 1;
                        }