/**
 * Game formula snippet — idleon-efficiency formula research.
 * Function: _customBlock_TalentCalc (from scripts.ActorEvents_124)
 * Game version: 1.20 ("Royal_Guardian")
 * Captured: 2026-08-29 via game-debug-tool (findFunction + toString)
 * Case reference: #354
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
                                for (var s = 0; 9 > s;) (s++, a.engine.getGameAttribute("DNSM").h.CalcTalentDLz.push(0), a.engine.getGameAttribute("DNSM").h.CalcTalentDL2z.push(0));
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
                                        for (t = a.engine.getGameAttribute("DNSM"), i = new l(), t.h.CalcTalentMAP = i, s = a.engine.getGameAttribute("DNSM").h.CalcTalentMAP.h.arena = 0; 16 > s;) {
                                            var r = s++;
                                            if (!(c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[89]) >= c.asNumber(a.engine.getGameAttribute("CustomLists").h.RANDOlist[53][r]))) break;
                                            a.engine.getGameAttribute("DNSM").h.CalcTalentMAP.h.arena = r + 1;
                                        }
                                        for (a.engine.getGameAttribute("DNSM").h.CalcTalentDN1 = 1e3, s = 0; 9 > s;)
                                            (!(8 < (r = s++)) || 1 > c.asNumber(a.engine.getGameAttribute("KillsLeft2Advance")[100][0])) &&
                                                c.asNumber(a.engine.getGameAttribute("Lv0")[r + 1]) < c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1) &&
                                                ((t = a.engine.getGameAttribute("DNSM")), (i = a.engine.getGameAttribute("Lv0")[r + 1]), (t.h.CalcTalentDN1 = i));
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
                                        for (var _ = a.engine.getGameAttribute("PlayerDATABASE").h, o = (_ = Object.keys(_)).length, g = 0; g < o;) {
                                            var d = _[g++];
                                            3 <= c.asNumber(a.engine.getGameAttribute("PlayerDATABASE").h["" + d].h.CharacterClass) &&
                                                6 > c.asNumber(a.engine.getGameAttribute("PlayerDATABASE").h["" + d].h.CharacterClass) &&
                                                (a.engine.getGameAttribute("DNSM").h.CalcTalentDT1 = d);
                                        }
                                        if ("No" != a.engine.getGameAttribute("DNSM").h.CalcTalentDT1 && a.engine.getGameAttribute("DNSM").h.CalcTalentDT1 != a.engine.getGameAttribute("UserInfo")[0])
                                            for (s = 0; 9 > s;) {
                                                r = s++;
                                                var b = c.asNumber(a.engine.getGameAttribute("Lv0")[r + 1]);
                                                t = a.engine.getGameAttribute("PlayerDATABASE");
                                                var R = "" + h.string(a.engine.getGameAttribute("DNSM").h.CalcTalentDT1);
                                                if (b < c.asNumber(t.h[R].h.Lv0[r + 1])) {
                                                    ((_ = a.engine.getGameAttribute("DNSM").h.CalcTalentDLz),
                                                        (o = "" + h.string(a.engine.getGameAttribute("CustomLists").h.TalentDescriptions[42][1][2])),
                                                        (g = c.asNumber(a.engine.getGameAttribute("CustomLists").h.TalentDescriptions[42][1][0])),
                                                        (d = c.asNumber(a.engine.getGameAttribute("CustomLists").h.TalentDescriptions[42][1][1])));
                                                    var y = a.engine.getGameAttribute("PlayerDATABASE");
                                                    ((b = "" + h.string(a.engine.getGameAttribute("DNSM").h.CalcTalentDT1)),
                                                        (_[r] = x._customBlock_ArbitraryCode5Inputs(o, g, d, c.asNumber(y.h[b].h.SkillLevels[42]), 0, 0)),
                                                        (_ = a.engine.getGameAttribute("DNSM").h.CalcTalentDL2z),
                                                        (o = "" + h.string(a.engine.getGameAttribute("CustomLists").h.TalentDescriptions[43][1][2])),
                                                        (g = c.asNumber(a.engine.getGameAttribute("CustomLists").h.TalentDescriptions[43][1][0])),
                                                        (d = c.asNumber(a.engine.getGameAttribute("CustomLists").h.TalentDescriptions[43][1][1])),
                                                        (t = a.engine.getGameAttribute("PlayerDATABASE")),
                                                        (R = "" + h.string(a.engine.getGameAttribute("DNSM").h.CalcTalentDT1)),
                                                        (_[r] = x._customBlock_ArbitraryCode5Inputs(o, g, d, c.asNumber(t.h[R].h.SkillLevels[43]), 0, 0)));
                                                }
                                            }
                                        else if (
                                            a.engine.getGameAttribute("DNSM").h.CalcTalentDT1 == a.engine.getGameAttribute("UserInfo")[0] &&
                                            3 <= a.engine.getGameAttribute("CharacterClass") &&
                                            6 > a.engine.getGameAttribute("CharacterClass")
                                        )
                                            for (s = 0; 9 > s;)
                                                ((r = s++),
                                                    1 == m._customBlock_TalentEnh(42) &&
                                                        ((b = a.engine.getGameAttribute("DNSM").h.CalcTalentDLz),
                                                        (_ = "" + h.string(a.engine.getGameAttribute("CustomLists").h.TalentDescriptions[42][1][2])),
                                                        (o = c.asNumber(a.engine.getGameAttribute("CustomLists").h.TalentDescriptions[42][1][0])),
                                                        (g = c.asNumber(a.engine.getGameAttribute("CustomLists").h.TalentDescriptions[42][1][1])),
                                                        (t = a.engine.getGameAttribute("PlayerDATABASE")),
                                                        (R = "" + h.string(a.engine.getGameAttribute("DNSM").h.CalcTalentDT1)),
                                                        (b[r] = 2 * x._customBlock_ArbitraryCode5Inputs(_, o, g, c.asNumber(t.h[R].h.SkillLevels[42]), 0, 0))),
                                                    1 == m._customBlock_TalentEnh(43) &&
                                                        ((d = a.engine.getGameAttribute("DNSM").h.CalcTalentDL2z),
                                                        (_ = "" + h.string(a.engine.getGameAttribute("CustomLists").h.TalentDescriptions[43][1][2])),
                                                        (o = c.asNumber(a.engine.getGameAttribute("CustomLists").h.TalentDescriptions[43][1][0])),
                                                        (g = c.asNumber(a.engine.getGameAttribute("CustomLists").h.TalentDescriptions[43][1][1])),
                                                        (y = a.engine.getGameAttribute("PlayerDATABASE")),
                                                        (b = "" + h.string(a.engine.getGameAttribute("DNSM").h.CalcTalentDT1)),
                                                        (d[r] = 2 * x._customBlock_ArbitraryCode5Inputs(_, o, g, c.asNumber(y.h[b].h.SkillLevels[43]), 0, 0))));
                                        for (
                                            t = a.engine.getGameAttribute("DNSM").h.CalcTalentMAP,
                                                i = a.engine.getGameAttribute("DNSM").h.CalcTalentDLz,
                                                t.h[42] = i,
                                                t = a.engine.getGameAttribute("DNSM").h.CalcTalentMAP,
                                                i = a.engine.getGameAttribute("DNSM").h.CalcTalentDL2z,
                                                t.h[43] = i,
                                                a.engine.getGameAttribute("DNSM").h.CalcTalentDN1 = 0,
                                                _ = a.engine.getGameAttribute("PlayerDATABASE").h,
                                                o = (_ = Object.keys(_)).length,
                                                g = 0;
                                            g < o;
                                        )
                                            ((d = _[g++]),
                                                6 > c.asNumber(a.engine.getGameAttribute("PlayerDATABASE").h["" + d].h.CharacterClass) &&
                                                    c.asNumber(a.engine.getGameAttribute("PlayerDATABASE").h["" + d].h.Lv0[7]) + c.asNumber(a.engine.getGameAttribute("PlayerDATABASE").h["" + d].h.Lv0[9]) >
                                                        c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1) &&
                                                    ((t = a.engine.getGameAttribute("DNSM")),
                                                    (i = c.asNumber(a.engine.getGameAttribute("PlayerDATABASE").h["" + d].h.Lv0[7]) + c.asNumber(a.engine.getGameAttribute("PlayerDATABASE").h["" + d].h.Lv0[9])),
                                                    (t.h.CalcTalentDN1 = i)));
                                        for (
                                            t = a.engine.getGameAttribute("DNSM").h.CalcTalentMAP,
                                                i = Math.max(0, c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1) - 100),
                                                t.h[57] = i,
                                                s = a.engine.getGameAttribute("DNSM").h.CalcTalentDN1 = 0,
                                                d = a.engine.getGameAttribute("Meals")[0].length;
                                            s < d;
                                        )
                                            ((r = s++),
                                                (t = a.engine.getGameAttribute("DNSM")),
                                                (i = c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1) + c.asNumber(a.engine.getGameAttribute("Meals")[0][r])),
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
                                                _ = a.engine.getGameAttribute("PlayerDATABASE").h,
                                                o = (_ = Object.keys(_)).length,
                                                g = 0;
                                            g < o;
                                        )
                                            ((d = _[g++]),
                                                10 == x._customBlock_ReturnClasses(c.asNumber(a.engine.getGameAttribute("PlayerDATABASE").h["" + d].h.CharacterClass))[3] &&
                                                    ("No" == a.engine.getGameAttribute("DNSM").h.CalcTalentDT1 ||
                                                        a.engine.getGameAttribute("GetPlayersUsernames").indexOf(d) > a.engine.getGameAttribute("GetPlayersUsernames").indexOf(a.engine.getGameAttribute("DNSM").h.CalcTalentDT1)) &&
                                                    (a.engine.getGameAttribute("DNSM").h.CalcTalentDT1 = d));
                                        for (s = 0, d = a.engine.getGameAttribute("CustomLists").h.MapAFKtarget.length; s < d;)
                                            if (
                                                ((r = s++),
                                                (t = a.engine.getGameAttribute("MonsterDefinitionsGET")),
                                                (R = "" + h.string(a.engine.getGameAttribute("CustomLists").h.MapAFKtarget[r])),
                                                Object.prototype.hasOwnProperty.call(t.h, R))
                                            ) {
                                                if (!(r < a.engine.getGameAttribute("KillsLeft2Advance").length)) break;
                                                if (((y = a.engine.getGameAttribute("MonsterDefinitionsGET")), (b = "" + h.string(a.engine.getGameAttribute("CustomLists").h.MapAFKtarget[r])), "FIGHTING" == y.h[b].h.AFKtype)) {
                                                    if (
                                                        (1e5 <= c.asNumber(a.engine.getGameAttribute("CustomLists").h.MapDetails[r][0][0]) - c.asNumber(a.engine.getGameAttribute("KillsLeft2Advance")[r][0]) &&
                                                            ((t = a.engine.getGameAttribute("DNSM")), (i = c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1) + 1), (t.h.CalcTalentDN1 = i)),
                                                        1e6 <= c.asNumber(a.engine.getGameAttribute("CustomLists").h.MapDetails[r][0][0]) - c.asNumber(a.engine.getGameAttribute("KillsLeft2Advance")[r][0]))
                                                    ) {
                                                        y = a.engine.getGameAttribute("DNSM");
                                                        var A = c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2) + 1;
                                                        y.h.CalcTalentDN2 = A;
                                                    }
                                                    if ("No" != a.engine.getGameAttribute("DNSM").h.CalcTalentDT1) {
                                                        b = c.asNumber(a.engine.getGameAttribute("CustomLists").h.MapDetails[r][0][0]);
                                                        var G = a.engine.getGameAttribute("PlayerDATABASE");
                                                        ((R = "" + h.string(a.engine.getGameAttribute("DNSM").h.CalcTalentDT1)),
                                                            1e8 <= b - c.asNumber(G.h[R].h.KillsLeft2Advance[r][0]) &&
                                                                ((y = a.engine.getGameAttribute("DNSM")), (i = c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN3) + 1), (y.h.CalcTalentDN3 = i)),
                                                            (_ = c.asNumber(a.engine.getGameAttribute("CustomLists").h.MapDetails[r][0][0])),
                                                            (R = a.engine.getGameAttribute("PlayerDATABASE")),
                                                            (A = "" + h.string(a.engine.getGameAttribute("DNSM").h.CalcTalentDT1)),
                                                            1e9 <= _ - c.asNumber(R.h[A].h.KillsLeft2Advance[r][0]) &&
                                                                ((y = a.engine.getGameAttribute("DNSM")), (b = c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN4) + 1), (y.h.CalcTalentDN4 = b)));
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
                                                s = a.engine.getGameAttribute("DNSM").h.CalcTalentDN1 = 0;
                                            8 > s;
                                        )
                                            ((r = s++),
                                                (t = a.engine.getGameAttribute("DNSM")),
                                                (i = c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1) + c.asNumber(a.engine.getGameAttribute("RoyalG")[0][r])),
                                                (t.h.CalcTalentDN1 = i));
                                        for (
                                            t = a.engine.getGameAttribute("DNSM").h.CalcTalentMAP,
                                                i = Math.round(c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1)),
                                                t.h[235] = i,
                                                t = a.engine.getGameAttribute("DNSM"),
                                                i = u.deepCopyList(a.engine.getGameAttribute("Cards")[1]),
                                                t.h.CalcTalentDL1 = i,
                                                s = 0,
                                                d = a.engine.getGameAttribute("DNSM").h.CalcTalentDL1.length;
                                            s < d;
                                        )
                                            ((r = s++),
                                                (0 == ("" + h.string(a.engine.getGameAttribute("DNSM").h.CalcTalentDL1[(r - c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1)) | 0])).indexOf("Gem") ||
                                                    0 == ("" + h.string(a.engine.getGameAttribute("DNSM").h.CalcTalentDL1[(r - c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1)) | 0])).indexOf("Cards")) &&
                                                    (ca.remove(a.engine.getGameAttribute("DNSM").h.CalcTalentDL1, a.engine.getGameAttribute("DNSM").h.CalcTalentDL1[(r - c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1)) | 0]),
                                                    (t = a.engine.getGameAttribute("DNSM")),
                                                    (i = c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1) + 1),
                                                    (t.h.CalcTalentDN1 = i)));
                                        for (
                                            t = a.engine.getGameAttribute("DNSM").h.CalcTalentMAP,
                                                i = a.engine.getGameAttribute("DNSM").h.CalcTalentDL1.length,
                                                t.h[305] = i,
                                                s = a.engine.getGameAttribute("DNSM").h.CalcTalentDN1 = 0,
                                                d = a.engine.getGameAttribute("Ninja")[103].length;
                                            s < d;
                                        )
                                            ((r = s++),
                                                (t = a.engine.getGameAttribute("DNSM")),
                                                (i = c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1) + c.asNumber(a.engine.getGameAttribute("Ninja")[103][r])),
                                                (t.h.CalcTalentDN1 = i));
                                        for (t = a.engine.getGameAttribute("DNSM").h.CalcTalentMAP, i = a.engine.getGameAttribute("DNSM").h.CalcTalentDN1, t.h[430] = i, s = a.engine.getGameAttribute("DNSM").h.CalcTalentDN1 = 0; 3 > s;)
                                            for (
                                                r = s++, a.engine.getGameAttribute("DNSM").h.CalcTalentDN2 = r, d = 0, r = a.engine.getGameAttribute("StampLevelMAX")[0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2)].length;
                                                d < r;
                                            ) {
                                                var I = d++;
                                                0.5 < c.asNumber(a.engine.getGameAttribute("StampLevelMAX")[0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2)][I]) &&
                                                    ((t = a.engine.getGameAttribute("DNSM")), (i = c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1) + 1), (t.h.CalcTalentDN1 = i));
                                            }
                                        for (
                                            t = a.engine.getGameAttribute("DNSM").h.CalcTalentMAP,
                                                i = a.engine.getGameAttribute("DNSM").h.CalcTalentDN1,
                                                t.h[470] = i,
                                                s = a.engine.getGameAttribute("DNSM").h.CalcTalentDN1 = 0,
                                                d = a.engine.getGameAttribute("CauldronInfo")[4].length;
                                            s < d;
                                        )
                                            ((r = s++),
                                                3 < c.asNumber(a.engine.getGameAttribute("CauldronInfo")[4][r]) &&
                                                    ((t = a.engine.getGameAttribute("DNSM")), (i = c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1) + 1), (t.h.CalcTalentDN1 = i)));
                                        for (
                                            t = a.engine.getGameAttribute("DNSM").h.CalcTalentMAP,
                                                i = a.engine.getGameAttribute("DNSM").h.CalcTalentDN1,
                                                t.h[485] = i,
                                                s = a.engine.getGameAttribute("DNSM").h.CalcTalentDN1 = 0,
                                                d = a.engine.getGameAttribute("Summon")[0].length;
                                            s < d;
                                        )
                                            ((r = s++),
                                                (t = a.engine.getGameAttribute("DNSM")),
                                                (i = c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1) + c.asNumber(a.engine.getGameAttribute("Summon")[0][r])),
                                                (t.h.CalcTalentDN1 = i));
                                        for (
                                            t = a.engine.getGameAttribute("DNSM").h.CalcTalentMAP,
                                                i = a.engine.getGameAttribute("DNSM").h.CalcTalentDN1,
                                                t.h[595] = i,
                                                a.engine.getGameAttribute("DNSM").h.CalcTalentMAP.h[616] = 0,
                                                a.engine.getGameAttribute("DNSM").h.CalcTalentMAP.h[620] = 0,
                                                _ = a.engine.getGameAttribute("PlayerDATABASE").h,
                                                o = (_ = Object.keys(_)).length,
                                                g = 0;
                                            g < o;
                                        )
                                            ((d = _[g++]),
                                                6 > c.asNumber(a.engine.getGameAttribute("PlayerDATABASE").h["" + d].h.CharacterClass) &&
                                                    c.asNumber(a.engine.getGameAttribute("PlayerDATABASE").h["" + d].h.Lv0[0]) > c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentMAP.h[616]) &&
                                                    ((t = a.engine.getGameAttribute("DNSM").h.CalcTalentMAP), (i = a.engine.getGameAttribute("PlayerDATABASE").h["" + d].h.Lv0[0]), (t.h[616] = i)),
                                                c.asNumber(a.engine.getGameAttribute("PlayerDATABASE").h["" + d].h.Lv0[0]) > c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentMAP.h[620]) &&
                                                    ((y = a.engine.getGameAttribute("DNSM").h.CalcTalentMAP), (A = a.engine.getGameAttribute("PlayerDATABASE").h["" + d].h.Lv0[0]), (y.h[620] = A)));
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
                                                r = s++,
                                                    a.engine.getGameAttribute("DNSM").h.CalcTalentDN1 = r,
                                                    d = 0,
                                                    r = a.engine.getGameAttribute("CustomLists").h.RANDOlist[(82 + c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1)) | 0].length;
                                                d < r;
                                            )
                                                ((I = d++),
                                                    D.contains(a.engine.getGameAttribute("Cards")[1], a.engine.getGameAttribute("CustomLists").h.RANDOlist[(82 + c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1)) | 0][I]) &&
                                                        ((t = a.engine.getGameAttribute("DNSM").h.CalcTalentMAP), (i = c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentMAP.h[650]) + 1), (t.h[650] = i)));
                                        if (((a.engine.getGameAttribute("DNSM").h.CalcTalentMAP.h[656] = 0), -1 == c.getCurrentSceneName().indexOf("Tutorial")))
                                            for (s = 0, d = a.engine.getGameAttribute("CustomLists").h.DreamChallenge.length; s < d;)
                                                ((r = s++),
                                                    -1 == c.asNumber(a.engine.getGameAttribute("WeeklyBoss").h["d_" + r]) &&
                                                        ((t = a.engine.getGameAttribute("DNSM").h.CalcTalentMAP), (i = c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentMAP.h[656]) + 1), (t.h[656] = i)));
                                        for (t = a.engine.getGameAttribute("DNSM"), i = new l(), t.h.BoxRewards = i, s = 0, d = a.engine.getGameAttribute("CustomLists").h.PostOffUpgradeInfo.length; s < d;)
                                            for (r = s++, a.engine.getGameAttribute("DNSM").h.CalcTalentDN3 = r, r = 0; 3 > r;)
                                                ((I = r++),
                                                    (t = a.engine.getGameAttribute("DNSM").h.BoxRewards),
                                                    (R = "" + h.string(a.engine.getGameAttribute("CustomLists").h.PostOffUpgradeInfo[0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN3)][16 + I])),
                                                    (i = q._customBlock_PostOfficeINFO("BonusAmount", c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN3), "" + I)),
                                                    (y = a.engine.getGameAttribute("DNSM").h.BoxRewards),
                                                    (b = "" + h.string(a.engine.getGameAttribute("CustomLists").h.PostOffUpgradeInfo[0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN3)][16 + I])),
                                                    (A = i + c.asNumber(y.h[b])),
                                                    (t.h[R] = A));
                                        if (-2 == e) {
                                            for (t = a.engine.getGameAttribute("DNSM"), i = new l(), t.h.AlchBubbles = i, s = 0; 4 > s;)
                                                for (
                                                    r = s++,
                                                        a.engine.getGameAttribute("DNSM").h.CalcTalentDN2 = r,
                                                        d = 0,
                                                        r = a.engine.getGameAttribute("CustomLists").h.AlchemyDescription[0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2)].length;
                                                    d < r;
                                                )
                                                    ((I = d++),
                                                        (y = a.engine),
                                                        (i = "" + h.string(a.engine.getGameAttribute("CustomLists").h.AlchemyDescription[0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2)][I][15])),
                                                        (y.gameAttributes.h.DummyText = i),
                                                        (1 == m._customBlock_Companions(4) ||
                                                            (-1 != a.engine.getGameAttribute("DummyText").indexOf("ACTIVE") &&
                                                                D.contains(
                                                                    a.engine.getGameAttribute("CauldronBubbles")[a.engine.getGameAttribute("GetPlayersUsernames").indexOf(a.engine.getGameAttribute("UserInfo")[0])],
                                                                    h.string(a.engine.getGameAttribute("Number2Letter")[0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2)]) + ("" + I)
                                                                )) ||
                                                            -1 == a.engine.getGameAttribute("DummyText").indexOf("ACTIVE")) &&
                                                            0 < c.asNumber(a.engine.getGameAttribute("CauldronInfo")[0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2)][I]) &&
                                                            ((t = a.engine.getGameAttribute("DNSM").h.AlchBubbles),
                                                            (R = a.engine.getGameAttribute("DummyText")),
                                                            (A = q._customBlock_CauldronStats("BubbleBonus", c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2), I, 0)),
                                                            (t.h[R] = A),
                                                            "MinEff" == a.engine.getGameAttribute("DummyText") &&
                                                                ((y = a.engine.getGameAttribute("DNSM").h.AlchBubbles),
                                                                (b = a.engine.getGameAttribute("DummyText")),
                                                                (t = a.engine.getGameAttribute("DNSM").h.AlchBubbles),
                                                                (R = a.engine.getGameAttribute("DummyText")),
                                                                (i = c.asNumber(t.h[R]) * k._customBlock_getLOG(x._customBlock_PlayerHPmax())),
                                                                (y.h[b] = i)),
                                                            "ChopEff" == a.engine.getGameAttribute("DummyText") &&
                                                                ((y = a.engine.getGameAttribute("DNSM").h.AlchBubbles),
                                                                (A = a.engine.getGameAttribute("DummyText")),
                                                                (G = a.engine.getGameAttribute("DNSM").h.AlchBubbles),
                                                                (t = a.engine.getGameAttribute("DummyText")),
                                                                (b = c.asNumber(G.h[t]) * k._customBlock_getLOG(x._customBlock_PlayerMPmax())),
                                                                (y.h[A] = b)),
                                                            -1 == a.engine.getGameAttribute("DummyText").indexOf("passz") &&
                                                                -1 == a.engine.getGameAttribute("DummyText").indexOf("ACTIVE") &&
                                                                -1 == a.engine.getGameAttribute("DummyText").indexOf("AllCharz") &&
                                                                (6 < a.engine.getGameAttribute("CharacterClass") &&
                                                                    16 != I &&
                                                                    30 > I &&
                                                                    (0 == a.engine.getGameAttribute("DNSM").h.CalcTalentDN2 && 18 > a.engine.getGameAttribute("CharacterClass") && "Construction" != a.engine.getGameAttribute("DummyText")
                                                                        ? ((y = a.engine.getGameAttribute("DNSM").h.AlchBubbles),
                                                                          (b = a.engine.getGameAttribute("DummyText")),
                                                                          (R = a.engine.getGameAttribute("DNSM").h.AlchBubbles),
                                                                          (I = a.engine.getGameAttribute("DummyText")),
                                                                          (G = c.asNumber(R.h[I]) * Math.max(1, c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.Opassz))),
                                                                          (y.h[b] = G))
                                                                        : 1 == a.engine.getGameAttribute("DNSM").h.CalcTalentDN2 && 30 > a.engine.getGameAttribute("CharacterClass") && 18 <= a.engine.getGameAttribute("CharacterClass")
                                                                          ? ((y = a.engine.getGameAttribute("DNSM").h.AlchBubbles),
                                                                            (t = a.engine.getGameAttribute("DummyText")),
                                                                            (b = a.engine.getGameAttribute("DNSM").h.AlchBubbles),
                                                                            (I = a.engine.getGameAttribute("DummyText")),
                                                                            (i = c.asNumber(b.h[I]) * Math.max(1, c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.Gpassz))),
                                                                            (y.h[t] = i))
                                                                          : 2 == a.engine.getGameAttribute("DNSM").h.CalcTalentDN2 &&
                                                                            42 > a.engine.getGameAttribute("CharacterClass") &&
                                                                            30 <= a.engine.getGameAttribute("CharacterClass") &&
                                                                            ((y = a.engine.getGameAttribute("DNSM").h.AlchBubbles),
                                                                            (b = a.engine.getGameAttribute("DummyText")),
                                                                            (t = a.engine.getGameAttribute("DNSM").h.AlchBubbles),
                                                                            (I = a.engine.getGameAttribute("DummyText")),
                                                                            (I = c.asNumber(t.h[I]) * Math.max(1, c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.Ppassz))),
                                                                            (y.h[b] = I))),
                                                                3 == a.engine.getGameAttribute("DNSM").h.CalcTalentDN2 &&
                                                                    ((b = a.engine.getGameAttribute("DNSM").h.AlchBubbles),
                                                                    (R = a.engine.getGameAttribute("DummyText")),
                                                                    (t = a.engine.getGameAttribute("DNSM").h.AlchBubbles),
                                                                    (y = a.engine.getGameAttribute("DummyText")),
                                                                    (i = c.asNumber(t.h[y])),
                                                                    (b.h[R] = 1 * i)))));
                                            for (s = 0; 4 > s;)
                                                for (
                                                    r = s++,
                                                        a.engine.getGameAttribute("DNSM").h.CalcTalentDN2 = r,
                                                        d = 0,
                                                        r = a.engine.getGameAttribute("CustomLists").h.AlchemyDescription[0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2)].length;
                                                    d < r;
                                                )
                                                    ((I = d++),
                                                        (y = a.engine),
                                                        (i = "" + h.string(a.engine.getGameAttribute("CustomLists").h.AlchemyDescription[0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2)][I][15])),
                                                        (y.gameAttributes.h.DummyText = i),
                                                        0 == a.engine.getGameAttribute("DNSM").h.CalcTalentDN2
                                                            ? (0 != I && 2 != I && 4 != I && 7 != I && 14 != I) ||
                                                              ((t = a.engine.getGameAttribute("DNSM").h.AlchBubbles),
                                                              (R = a.engine.getGameAttribute("DummyText")),
                                                              (y = a.engine.getGameAttribute("DNSM").h.AlchBubbles),
                                                              (b = a.engine.getGameAttribute("DummyText")),
                                                              (A = c.asNumber(y.h[b]) * Math.max(1, c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.MultiOr))),
                                                              (t.h[R] = A))
                                                            : 1 == a.engine.getGameAttribute("DNSM").h.CalcTalentDN2
                                                              ? (0 != I && 6 != I && 9 != I && 12 != I && 14 != I) ||
                                                                ((t = a.engine.getGameAttribute("DNSM").h.AlchBubbles),
                                                                (R = a.engine.getGameAttribute("DummyText")),
                                                                (y = a.engine.getGameAttribute("DNSM").h.AlchBubbles),
                                                                (A = a.engine.getGameAttribute("DummyText")),
                                                                (i = c.asNumber(y.h[A]) * Math.max(1, c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.MultiGr))),
                                                                (t.h[R] = i))
                                                              : 2 != a.engine.getGameAttribute("DNSM").h.CalcTalentDN2 ||
                                                                (0 != I && 2 != I && 6 != I && 12 != I && 14 != I) ||
                                                                ((G = a.engine.getGameAttribute("DNSM").h.AlchBubbles),
                                                                (t = a.engine.getGameAttribute("DummyText")),
                                                                (y = a.engine.getGameAttribute("DNSM").h.AlchBubbles),
                                                                (b = a.engine.getGameAttribute("DummyText")),
                                                                (b = c.asNumber(y.h[b]) * Math.max(1, c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.MultiPu))),
                                                                (G.h[t] = b)));
                                            for (s = a.engine.getGameAttribute("DNSM").h.CalcTalentDN2 = 0, d = a.engine.getGameAttribute("Meals")[0].length; s < d;)
                                                ((r = s++),
                                                    11 <= c.asNumber(a.engine.getGameAttribute("Meals")[0][r]) &&
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
                                                ((r = s++),
                                                    (t = a.engine.getGameAttribute("DNSM").h.AlchBubbles),
                                                    (R = "W" + Math.round(2 * (1 + r))),
                                                    (i = c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h["W" + Math.round(2 * (1 + r))]) * c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2)),
                                                    (t.h[R] = i),
                                                    (y = a.engine.getGameAttribute("DNSM").h.AlchBubbles),
                                                    (b = "A" + Math.round(2 * (1 + r))),
                                                    (A = c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h["A" + Math.round(2 * (1 + r))]) * c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2)),
                                                    (y.h[b] = A),
                                                    (t = a.engine.getGameAttribute("DNSM").h.AlchBubbles),
                                                    (R = "M" + Math.round(2 * (1 + r))),
                                                    (i = c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h["M" + Math.round(2 * (1 + r))]) * c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2)),
                                                    (t.h[R] = i));
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
                                                    _ = a.engine.getGameAttribute("PlayerDATABASE").h,
                                                    o = (_ = Object.keys(_)).length,
                                                    g = 0;
                                                g < o;
                                            )
                                                ((d = _[g++]),
                                                    6 > c.asNumber(a.engine.getGameAttribute("PlayerDATABASE").h["" + d].h.CharacterClass) ||
                                                        (18 > c.asNumber(a.engine.getGameAttribute("PlayerDATABASE").h["" + d].h.CharacterClass)
                                                            ? ((t = a.engine.getGameAttribute("DNSM")),
                                                              (i = c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1) + c.asNumber(a.engine.getGameAttribute("PlayerDATABASE").h["" + d].h.Lv0[0])),
                                                              (t.h.CalcTalentDN1 = i))
                                                            : 30 > c.asNumber(a.engine.getGameAttribute("PlayerDATABASE").h["" + d].h.CharacterClass)
                                                              ? ((y = a.engine.getGameAttribute("DNSM")),
                                                                (A = c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2) + c.asNumber(a.engine.getGameAttribute("PlayerDATABASE").h["" + d].h.Lv0[0])),
                                                                (y.h.CalcTalentDN2 = A))
                                                              : 42 > c.asNumber(a.engine.getGameAttribute("PlayerDATABASE").h["" + d].h.CharacterClass) &&
                                                                ((t = a.engine.getGameAttribute("DNSM")),
                                                                (i = c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN3) + c.asNumber(a.engine.getGameAttribute("PlayerDATABASE").h["" + d].h.Lv0[0])),
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
                                                    _ = a.engine.getGameAttribute("PlayerDATABASE").h,
                                                    o = (_ = Object.keys(_)).length,
                                                    g = 0;
                                                g < o;
                                            )
                                                for (d = _[g++], s = 0; 13 > s;)
                                                    ((r = s++),
                                                        1 > c.asNumber(a.engine.getGameAttribute("PlayerDATABASE").h["" + d].h.KillsLeft2Advance[251 + r][0]) &&
                                                            ((t = a.engine.getGameAttribute("DNSM")), (i = c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1) + 1), (t.h.CalcTalentDN1 = i)));
                                            for (
                                                t = a.engine.getGameAttribute("DNSM").h.AlchBubbles,
                                                    i = c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.Y6) * c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1),
                                                    t.h.Y6 = i,
                                                    t = a.engine.getGameAttribute("DNSM"),
                                                    i = new l(),
                                                    t.h.AlchVials = i,
                                                    s = 0,
                                                    d = a.engine.getGameAttribute("CustomLists").h.AlchemyDescription[4].length;
                                                s < d;
                                            )
                                                ((r = s++),
                                                    (t = a.engine.getGameAttribute("DNSM").h.AlchVials),
                                                    (R = "" + h.string(a.engine.getGameAttribute("CustomLists").h.AlchemyDescription[4][r][11])),
                                                    (i = q._customBlock_CauldronStats("VialBonus", 4, r, 0)),
                                                    (y = a.engine.getGameAttribute("DNSM").h.AlchVials),
                                                    (b = "" + h.string(a.engine.getGameAttribute("CustomLists").h.AlchemyDescription[4][r][11])),
                                                    (A = i + c.asNumber(y.h[b])),
                                                    (t.h[R] = A));
                                        }
                                        if (-3 == e)
                                            for (t = a.engine.getGameAttribute("DNSM"), i = new l(), t.h.FamBonusQTYs = i, _ = a.engine.getGameAttribute("PlayerDATABASE").h, o = (_ = Object.keys(_)).length, g = 0; g < o;)
                                                for (
                                                    d = _[g++],
                                                        a.engine.getGameAttribute("DNSM").h.CalcTalentDT1 = d,
                                                        a.engine.getGameAttribute("DNSM").h.CalcTalentDT1 == a.engine.getGameAttribute("UserInfo")[0]
                                                            ? ((t = a.engine.getGameAttribute("DNSM")),
                                                              (i = a.engine.getGameAttribute("Lv0")[0]),
                                                              (t.h.CalcTalentDN1 = i),
                                                              (y = a.engine.getGameAttribute("DNSM")),
                                                              (A = x._customBlock_ReturnClasses(c.asNumber(a.engine.getGameAttribute("CharacterClass")))),
                                                              (y.h.CalcTalentDL1 = A))
                                                            : ((t = a.engine.getGameAttribute("DNSM")),
                                                              (y = a.engine.getGameAttribute("PlayerDATABASE")),
                                                              (R = "" + h.string(a.engine.getGameAttribute("DNSM").h.CalcTalentDT1)),
                                                              (t.h.CalcTalentDN1 = y.h[R].h.Lv0[0]),
                                                              (G = a.engine.getGameAttribute("DNSM")),
                                                              (y = a.engine.getGameAttribute("PlayerDATABASE")),
                                                              (b = "" + h.string(a.engine.getGameAttribute("DNSM").h.CalcTalentDT1)),
                                                              (i = x._customBlock_ReturnClasses(c.asNumber(y.h[b].h.CharacterClass))),
                                                              (G.h.CalcTalentDL1 = i)),
                                                        s = 0,
                                                        d = a.engine.getGameAttribute("DNSM").h.CalcTalentDL1.length;
                                                    s < d;
                                                )
                                                    for (r = s++, a.engine.getGameAttribute("DNSM").h.CalcTalentDN2 = r, r = 0; 2 > r;)
                                                        ((I = r++),
                                                            (R = a.engine.getGameAttribute("DNSM")),
                                                            (b = v._customBlock_FamilyBonsuesREAL(
                                                                c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDL1[0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2)]),
                                                                I,
                                                                c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1)
                                                            )),
                                                            (R.h.CalcTalentDN3 = b),
                                                            (b = c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN3)),
                                                            (y = a.engine.getGameAttribute("DNSM").h.FamBonusQTYs),
                                                            (R = "" + Math.round(2 * c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDL1[0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2)]) + I)),
                                                            b > c.asNumber(y.h[R]) &&
                                                                ((b = a.engine.getGameAttribute("DNSM").h.FamBonusQTYs),
                                                                (A = "" + Math.round(2 * c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDL1[0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2)]) + I)),
                                                                (G = a.engine.getGameAttribute("DNSM").h.CalcTalentDN3),
                                                                (b.h[A] = G),
                                                                0 < k._customBlock_GetTalentNumber(1, 144) &&
                                                                    a.engine.getGameAttribute("DNSM").h.CalcTalentDT1 == a.engine.getGameAttribute("UserInfo")[0] &&
                                                                    ((y = a.engine.getGameAttribute("DNSM").h.FamBonusQTYs),
                                                                    (t = "" + Math.round(2 * c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDL1[0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2)]) + I)),
                                                                    (i = c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN3) * (1 + k._customBlock_GetTalentNumber(1, 144) / 100)),
                                                                    (y.h[t] = i)),
                                                                ("24" != "" + Math.round(2 * c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDL1[0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2)]) + I) &&
                                                                    "44" != "" + Math.round(2 * c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDL1[0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2)]) + I)) ||
                                                                    ((t = a.engine.getGameAttribute("DNSM").h.FamBonusQTYs),
                                                                    (b = "" + Math.round(2 * c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDL1[0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2)]) + I)),
                                                                    (I = c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN3) * (1 + p._customBlock_getbonus2(1, 144, -1) / 100)),
                                                                    (t.h[b] = I)),
                                                                (i = []),
                                                                ((b = a.engine.getGameAttribute("DNSM")).h.CalcTalentDL2 = i),
                                                                a.engine.getGameAttribute("DNSM").h.CalcTalentDL2.push(a.engine.getGameAttribute("DNSM").h.CalcTalentDT1),
                                                                a.engine.getGameAttribute("DNSM").h.CalcTalentDL2.push(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1),
                                                                (t = a.engine.getGameAttribute("DNSM").h.FamBonusQTYs),
                                                                (I = Math.round(2 * c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDL1[0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2)])) + "list"),
                                                                (b = a.engine.getGameAttribute("DNSM").h.CalcTalentDL2),
                                                                (t.h[I] = b)));
                                        if (
                                            -4 == e &&
                                            ((t = a.engine.getGameAttribute("DNSM")),
                                            (i = new l()),
                                            (t.h.CardBonusS = i),
                                            (i = []),
                                            ((t = a.engine.getGameAttribute("DNSM")).h.CardBonusSdl = i),
                                            null != a.engine.getGameAttribute("Cards")[2] && null != n.__cast(a.engine.getGameAttribute("PixelHelperActor")[6].behaviors.getBehavior("ActorEvents_312"), jb)._GenINFO[45])
                                        ) {
                                            for (s = 0; 10 > s;)
                                                ((r = s++),
                                                    "B" != a.engine.getGameAttribute("Cards")[2][r] &&
                                                        ((t = a.engine.getGameAttribute("DNSM")),
                                                        (y = n.__cast(a.engine.getGameAttribute("PixelHelperActor")[6].behaviors.getBehavior("ActorEvents_312"), jb)._GenINFO[45]),
                                                        (R = "" + h.string(a.engine.getGameAttribute("Cards")[2][r])),
                                                        (t.h.CardBonusSdl = y.h[R]),
                                                        (0 == r && 1 == q._customBlock_chipBonuses("card1")) || (7 == r && 1 == q._customBlock_chipBonuses("card2"))
                                                            ? ((t = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                              (b = "" + h.string(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3])),
                                                              (i =
                                                                  2 *
                                                                  (1 + m._customBlock_Thingies("LegendPTS_bonus", 21, 0) / 100) *
                                                                  x._customBlock_RunCodeOfTypeXforThingY("CardLv", "" + h.string(a.engine.getGameAttribute("Cards")[2][r])) *
                                                                  c.asNumber(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[4])),
                                                              (y = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                              (R = "" + h.string(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3])),
                                                              (A = i + c.asNumber(y.h[R])),
                                                              (t.h[b] = A))
                                                            : ((G = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                              (A = "" + h.string(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3])),
                                                              (i =
                                                                  (1 + m._customBlock_Thingies("LegendPTS_bonus", 21, 0) / 100) *
                                                                  x._customBlock_RunCodeOfTypeXforThingY("CardLv", "" + h.string(a.engine.getGameAttribute("Cards")[2][r])) *
                                                                  c.asNumber(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[4])),
                                                              (y = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                              (t = "" + h.string(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3])),
                                                              (b = i + c.asNumber(y.h[t])),
                                                              (G.h[A] = b))));
                                            for (
                                                t = a.engine.getGameAttribute("DNSM"),
                                                    i = u.deepCopyMap(a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                    t.h.CardBonusS_old = i,
                                                    0.1 < m._customBlock_RiftStuff("RiftSkillBonus,0", 2) &&
                                                        ((t = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                        (R = "" + h.string(a.engine.getGameAttribute("CustomMaps").h.IDforCardBonus.h[24])),
                                                        (t.h[R] = 0),
                                                        (t = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                        (R = "" + h.string(a.engine.getGameAttribute("CustomMaps").h.IDforCardBonus.h[25])),
                                                        (t.h[R] = 0),
                                                        (t = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                        (R = "" + h.string(a.engine.getGameAttribute("CustomMaps").h.IDforCardBonus.h[33])),
                                                        (t.h[R] = 0),
                                                        (t = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                        (R = "" + h.string(a.engine.getGameAttribute("CustomMaps").h.IDforCardBonus.h[34])),
                                                        (t.h[R] = 0)),
                                                    0.1 < m._customBlock_RiftStuff("RiftSkillBonus,2", 2) &&
                                                        ((t = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                        (R = "" + h.string(a.engine.getGameAttribute("CustomMaps").h.IDforCardBonus.h[27])),
                                                        (t.h[R] = 0),
                                                        (t = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                        (R = "" + h.string(a.engine.getGameAttribute("CustomMaps").h.IDforCardBonus.h[28])),
                                                        (t.h[R] = 0),
                                                        (t = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                        (R = "" + h.string(a.engine.getGameAttribute("CustomMaps").h.IDforCardBonus.h[36])),
                                                        (t.h[R] = 0),
                                                        (t = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                        (R = "" + h.string(a.engine.getGameAttribute("CustomMaps").h.IDforCardBonus.h[37])),
                                                        (t.h[R] = 0)),
                                                    0.1 < m._customBlock_RiftStuff("RiftSkillBonus,3", 2) &&
                                                        ((t = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                        (R = "" + h.string(a.engine.getGameAttribute("CustomMaps").h.IDforCardBonus.h[30])),
                                                        (t.h[R] = 0),
                                                        (t = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                        (R = "" + h.string(a.engine.getGameAttribute("CustomMaps").h.IDforCardBonus.h[31])),
                                                        (t.h[R] = 0),
                                                        (t = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                        (R = "" + h.string(a.engine.getGameAttribute("CustomMaps").h.IDforCardBonus.h[39])),
                                                        (t.h[R] = 0),
                                                        (t = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                        (R = "" + h.string(a.engine.getGameAttribute("CustomMaps").h.IDforCardBonus.h[45])),
                                                        (t.h[R] = 0)),
                                                    0.1 < m._customBlock_RiftStuff("RiftSkillBonus,5", 2) &&
                                                        ((t = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                        (R = "" + h.string(a.engine.getGameAttribute("CustomMaps").h.IDforCardBonus.h[32])),
                                                        (t.h[R] = 0),
                                                        (t = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                        (R = "" + h.string(a.engine.getGameAttribute("CustomMaps").h.IDforCardBonus.h[40])),
                                                        (t.h[R] = 0),
                                                        (t = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                        (R = "" + h.string(a.engine.getGameAttribute("CustomMaps").h.IDforCardBonus.h[41])),
                                                        (t.h[R] = 0),
                                                        (t = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                        (R = "" + h.string(a.engine.getGameAttribute("CustomMaps").h.IDforCardBonus.h[75])),
                                                        (t.h[R] = 0)),
                                                    0.1 < m._customBlock_RiftStuff("RiftSkillBonus,6", 2) &&
                                                        ((t = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                        (R = "" + h.string(a.engine.getGameAttribute("CustomMaps").h.IDforCardBonus.h[53])),
                                                        (t.h[R] = 0),
                                                        (t = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                        (R = "" + h.string(a.engine.getGameAttribute("CustomMaps").h.IDforCardBonus.h[57])),
                                                        (t.h[R] = 0),
                                                        (t = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                        (R = "" + h.string(a.engine.getGameAttribute("CustomMaps").h.IDforCardBonus.h[58])),
                                                        (t.h[R] = 0)),
                                                    0.1 < m._customBlock_RiftStuff("RiftSkillBonus,8", 2) &&
                                                        ((t = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                        (R = "" + h.string(a.engine.getGameAttribute("CustomMaps").h.IDforCardBonus.h[54])),
                                                        (t.h[R] = 0),
                                                        (t = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                        (R = "" + h.string(a.engine.getGameAttribute("CustomMaps").h.IDforCardBonus.h[55])),
                                                        (t.h[R] = 0),
                                                        (t = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                        (R = "" + h.string(a.engine.getGameAttribute("CustomMaps").h.IDforCardBonus.h[52])),
                                                        (t.h[R] = 0)),
                                                    0.1 < m._customBlock_RiftStuff("RiftSkillBonus,18", 2) &&
                                                        ((t = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                        (R = "" + h.string(a.engine.getGameAttribute("CustomMaps").h.IDforCardBonus.h[97])),
                                                        (t.h[R] = 0),
                                                        (t = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                        (R = "" + h.string(a.engine.getGameAttribute("CustomMaps").h.IDforCardBonus.h[98])),
                                                        (t.h[R] = 0),
                                                        (t = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                        (R = "" + h.string(a.engine.getGameAttribute("CustomMaps").h.IDforCardBonus.h[99])),
                                                        (t.h[R] = 0)),
                                                    0.1 < m._customBlock_Summoning("VaultUpgBonus", 44, 0) &&
                                                        ((t = a.engine.getGameAttribute("DNSM").h.CardBonusS), (R = "" + h.string(a.engine.getGameAttribute("CustomMaps").h.IDforCardBonus.h[12])), (t.h[R] = 0)),
                                                    _ = n.__cast(a.engine.getGameAttribute("PixelHelperActor")[6].behaviors.getBehavior("ActorEvents_312"), jb)._GenINFO[45].h,
                                                    o = (_ = Object.keys(_)).length,
                                                    g = 0;
                                                g < o;
                                            )
                                                ((d = _[g++]),
                                                    (t = a.engine.getGameAttribute("DNSM")),
                                                    (i = n.__cast(a.engine.getGameAttribute("PixelHelperActor")[6].behaviors.getBehavior("ActorEvents_312"), jb)._GenINFO[45].h["" + d]),
                                                    (t.h.CardBonusSdl = i),
                                                    -1 != ("" + h.string(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3])).indexOf("Mining") && 0.1 < m._customBlock_RiftStuff("RiftSkillBonus,0", 2)
                                                        ? ((y = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                          (R = "" + h.string(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3])),
                                                          (A = x._customBlock_RunCodeOfTypeXforThingY("CardLv", "" + d) * c.asNumber(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[4])),
                                                          (t = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                          (b = "" + h.string(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3])),
                                                          (i = A + c.asNumber(t.h[b])),
                                                          (y.h[R] = i))
                                                        : -1 != ("" + h.string(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3])).indexOf("Choppin") && 0.1 < m._customBlock_RiftStuff("RiftSkillBonus,2", 2)
                                                          ? ((y = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                            (R = "" + h.string(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3])),
                                                            (b = x._customBlock_RunCodeOfTypeXforThingY("CardLv", "" + d) * c.asNumber(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[4])),
                                                            (G = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                            (A = "" + h.string(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3])),
                                                            (G = b + c.asNumber(G.h[A])),
                                                            (y.h[R] = G))
                                                          : -1 != ("" + h.string(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3])).indexOf("Fishing") && 0.1 < m._customBlock_RiftStuff("RiftSkillBonus,3", 2)
                                                            ? ((y = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                              (t = "" + h.string(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3])),
                                                              (i = x._customBlock_RunCodeOfTypeXforThingY("CardLv", "" + d) * c.asNumber(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[4])),
                                                              (R = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                              (b = "" + h.string(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3])),
                                                              (I = i + c.asNumber(R.h[b])),
                                                              (y.h[t] = I))
                                                            : -1 != ("" + h.string(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3])).indexOf("Catching") && 0.1 < m._customBlock_RiftStuff("RiftSkillBonus,5", 2)
                                                              ? ((y = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                                (I = "" + h.string(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3])),
                                                                (i = x._customBlock_RunCodeOfTypeXforThingY("CardLv", "" + d) * c.asNumber(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[4])),
                                                                (b = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                                (t = "" + h.string(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3])),
                                                                (b = i + c.asNumber(b.h[t])),
                                                                (y.h[I] = b))
                                                              : (-1 != ("" + h.string(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3])).indexOf("Trapping") ||
                                                                      "+{%_Shiny_Critter_Chance" == a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3]) &&
                                                                  0.1 < m._customBlock_RiftStuff("RiftSkillBonus,6", 2)
                                                                ? ((y = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                                  (I = "" + h.string(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3])),
                                                                  (s = x._customBlock_RunCodeOfTypeXforThingY("CardLv", "" + d) * c.asNumber(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[4])),
                                                                  (t = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                                  (b = "" + h.string(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3])),
                                                                  (s += c.asNumber(t.h[b])),
                                                                  (y.h[I] = s))
                                                                : ("+{%_Charge_Rate" == a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3] ||
                                                                        "+{_Starting_Pts_in_Worship" == a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3] ||
                                                                        "+{%_Max_Charge" == a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3]) &&
                                                                    0.1 < m._customBlock_RiftStuff("RiftSkillBonus,8", 2)
                                                                  ? ((b = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                                    (I = "" + h.string(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3])),
                                                                    (s = x._customBlock_RunCodeOfTypeXforThingY("CardLv", "" + d) * c.asNumber(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[4])),
                                                                    (t = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                                    (R = "" + h.string(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3])),
                                                                    (s += c.asNumber(t.h[R])),
                                                                    (b.h[I] = s))
                                                                  : -1 != ("" + h.string(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3])).indexOf("Spelunking") && 0.1 < m._customBlock_RiftStuff("RiftSkillBonus,18", 2)
                                                                    ? ((s = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                                      (y = "" + h.string(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3])),
                                                                      (d = x._customBlock_RunCodeOfTypeXforThingY("CardLv", "" + d) * c.asNumber(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[4])),
                                                                      (r = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                                      (I = "" + h.string(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3])),
                                                                      (d += c.asNumber(r.h[I])),
                                                                      (s.h[y] = d))
                                                                    : "+{%_Card_Drop_Chance" == a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3] &&
                                                                      0.1 < m._customBlock_Summoning("VaultUpgBonus", 44, 0) &&
                                                                      ((s = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                                      (r = "" + h.string(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3])),
                                                                      (d = x._customBlock_RunCodeOfTypeXforThingY("CardLv", "" + d) * c.asNumber(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[4])),
                                                                      (y = a.engine.getGameAttribute("DNSM").h.CardBonusS),
                                                                      (I = "" + h.string(a.engine.getGameAttribute("DNSM").h.CardBonusSdl[3])),
                                                                      (d += c.asNumber(y.h[I])),
                                                                      (s.h[r] = d)));
                                        }
                                        if (-6 == e)
                                            for (t = a.engine.getGameAttribute("DNSM"), i = new l(), t.h.MealBonusesS = i, s = 0; 74 > s;)
                                                ((r = s++),
                                                    "PxLine" == a.engine.getGameAttribute("CustomLists").h.MealINFO[r][5]
                                                        ? ((t = a.engine.getGameAttribute("DNSM").h.MealBonusesS),
                                                          (R = "" + h.string(a.engine.getGameAttribute("CustomLists").h.MealINFO[r][5])),
                                                          (i = c.asNumber(a.engine.getGameAttribute("Meals")[0][r]) * c.asNumber(a.engine.getGameAttribute("CustomLists").h.MealINFO[r][2])),
                                                          (y = a.engine.getGameAttribute("DNSM").h.MealBonusesS),
                                                          (b = "" + h.string(a.engine.getGameAttribute("CustomLists").h.MealINFO[r][5])),
                                                          (A = i + c.asNumber(y.h[b])),
                                                          (t.h[R] = A))
                                                        : ((t = a.engine.getGameAttribute("DNSM").h.MealBonusesS),
                                                          (R = "" + h.string(a.engine.getGameAttribute("CustomLists").h.MealINFO[r][5])),
                                                          (i =
                                                              m._customBlock_Summoning2("BonusMultiCook", r, 0) *
                                                              p._customBlock_CookingR("CookingMealBonusMultioo", 0, 0) *
                                                              m._customBlock_Summoning("RibbonBonus", c.asNumber(a.engine.getGameAttribute("Ribbon")[Math.round(28 + r)]), 0) *
                                                              c.asNumber(a.engine.getGameAttribute("Meals")[0][r]) *
                                                              c.asNumber(a.engine.getGameAttribute("CustomLists").h.MealINFO[r][2])),
                                                          (y = a.engine.getGameAttribute("DNSM").h.MealBonusesS),
                                                          (A = "" + h.string(a.engine.getGameAttribute("CustomLists").h.MealINFO[r][5])),
                                                          (b = i + c.asNumber(y.h[A])),
                                                          (t.h[R] = b)));
                                        if (-7 == e) {
                                            for (
                                                t = a.engine.getGameAttribute("DNSM"),
                                                    i = new l(),
                                                    t.h.LabMFbonuses = i,
                                                    t = a.engine.getGameAttribute("DNSM").h.LabMFbonuses,
                                                    i = p._customBlock_MainframeBonus(100),
                                                    t.h[100] = i,
                                                    s = 0,
                                                    d = a.engine.getGameAttribute("CustomLists").h.JewelDesc.length;
                                                s < d;
                                            )
                                                ((r = s++), (t = a.engine.getGameAttribute("DNSM").h.LabMFbonuses), (i = p._customBlock_MainframeBonus(100 + r)), (t.h["" + (100 + r)] = i));
                                            for (s = 0, d = a.engine.getGameAttribute("CustomLists").h.LabMainBonus.length; s < d;)
                                                ((r = s++), (t = a.engine.getGameAttribute("DNSM").h.LabMFbonuses), (i = p._customBlock_MainframeBonus(r)), (t.h["" + r] = i));
                                            if (((a.engine.getGameAttribute("DNSM").h.LabMFbonuses.h.YES = 1), 0 < c.asNumber(a.engine.getGameAttribute("DNSM").h.LabMFbonuses.h[114]))) {
                                                for (
                                                    s = a.engine.getGameAttribute("DNSM").h.CalcTalentDN2 = 0;
                                                    10 > s && ((r = s++), (a.engine.getGameAttribute("DNSM").h.CalcTalentDN1 = r), 0 != a.engine.getGameAttribute("Cooking")[r][0]);
                                                )
                                                    ((t = a.engine.getGameAttribute("DNSM")),
                                                        (i =
                                                            c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2) +
                                                            c.asNumber(a.engine.getGameAttribute("Cooking")[0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1)][6])),
                                                        (t.h.CalcTalentDN2 = i),
                                                        (y = a.engine.getGameAttribute("DNSM")),
                                                        (A =
                                                            c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2) +
                                                            c.asNumber(a.engine.getGameAttribute("Cooking")[0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1)][7])),
                                                        (y.h.CalcTalentDN2 = A),
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
                                                    ((y = a.engine),
                                                    (i = a.engine.getGameAttribute("CustomLists").h.MapAFKtarget.indexOf("mushG")),
                                                    (y.gameAttributes.h.DummyNumber3 = i),
                                                    (a.engine.gameAttributes.h.DummyNumber4 = 0),
                                                    0 <= a.engine.getGameAttribute("DummyNumber3"))
                                                )
                                                    for (
                                                        y = a.engine,
                                                            i =
                                                                c.asNumber(a.engine.getGameAttribute("CustomLists").h.MapDetails[0 | a.engine.getGameAttribute("DummyNumber3")][0][0]) -
                                                                c.asNumber(a.engine.getGameAttribute("KillsLeft2Advance")[0 | a.engine.getGameAttribute("DummyNumber3")][0]),
                                                            y.gameAttributes.h.DummyNumber4 = i,
                                                            _ = a.engine.getGameAttribute("PlayerDATABASE").h,
                                                            o = (_ = Object.keys(_)).length,
                                                            g = 0;
                                                        g < o;
                                                    )
                                                        ((d = _[g++]),
                                                            a.engine.getGameAttribute("UserInfo")[0] != d &&
                                                                ((y = a.engine),
                                                                (i =
                                                                    a.engine.getGameAttribute("DummyNumber4") +
                                                                    (c.asNumber(a.engine.getGameAttribute("CustomLists").h.MapDetails[0 | a.engine.getGameAttribute("DummyNumber3")][0][0]) -
                                                                        c.asNumber(a.engine.getGameAttribute("PlayerDATABASE").h["" + d].h.KillsLeft2Advance[0 | a.engine.getGameAttribute("DummyNumber3")][0]))),
                                                                (y.gameAttributes.h.DummyNumber4 = i)));
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
                                            (b = x._customBlock_PlayerAccTot()),
                                            (t = a.engine.getGameAttribute("MonsterDefinitionsGET")),
                                            (R = a.engine.getGameAttribute("AFKtarget")),
                                            b >= 2.25 * c.asNumber(t.h[R].h.Defence))
                                        ) {
                                            for (s = 0; 6 > s;)
                                                ((r = s++),
                                                    (t = a.engine.getGameAttribute("DNSM")),
                                                    (i = c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1) + c.asNumber(a.engine.getGameAttribute("Refinery")[3 + r][1])),
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
                                        for (s = a.engine.getGameAttribute("DNSM").h.CalcTalentDN1 = 0, d = a.engine.getGameAttribute("GetPlayersUsernames").length; s < d;)
                                            ((r = s++),
                                                a.engine.getGameAttribute("GetPlayersUsernames")[r] == a.engine.getGameAttribute("UserInfo")[0]
                                                    ? ((t = a.engine.getGameAttribute("DNSM")), (i = c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1) + k._customBlock_GetTalentNumber(1, 493)), (t.h.CalcTalentDN1 = i))
                                                    : c.asNumber(a.engine.getGameAttribute("CauldronJobs")[1][r]) + 1 ==
                                                          c.asNumber(a.engine.getGameAttribute("CauldronJobs")[1][a.engine.getGameAttribute("GetPlayersUsernames").indexOf(a.engine.getGameAttribute("UserInfo")[0])]) + 1 &&
                                                      ((y = a.engine.getGameAttribute("DNSM")),
                                                      (A = c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1)),
                                                      (i = "" + h.string(a.engine.getGameAttribute("CustomLists").h.TalentDescriptions[493][1][2])),
                                                      (b = c.asNumber(a.engine.getGameAttribute("CustomLists").h.TalentDescriptions[493][1][0])),
                                                      (G = c.asNumber(a.engine.getGameAttribute("CustomLists").h.TalentDescriptions[493][1][1])),
                                                      (t = a.engine.getGameAttribute("PlayerDATABASE")),
                                                      (R = "" + h.string(a.engine.getGameAttribute("GetPlayersUsernames")[r])),
                                                      (i = A + x._customBlock_ArbitraryCode5Inputs(i, b, G, c.asNumber(t.h[R].h.SkillLevels[493]), 0, 0)),
                                                      (y.h.CalcTalentDN1 = i)));
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
                                                      (b = Math.floor(x._customBlock_PlayerAccTot())),
                                                      (t = a.engine.getGameAttribute("MonsterDefinitionsGET")),
                                                      (R = a.engine.getGameAttribute("AFKtarget")),
                                                      b > 1.5 * c.asNumber(t.h[R].h.Defence) &&
                                                          ((t = a.engine.getGameAttribute("DNSM")),
                                                          (i = x._customBlock_PlayerAccTot()),
                                                          (y = a.engine.getGameAttribute("MonsterDefinitionsGET")),
                                                          (R = a.engine.getGameAttribute("AFKtarget")),
                                                          (A = k._customBlock_getLOG(i - 1.5 * c.asNumber(y.h[R].h.Defence))),
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
                                        y = a.engine,
                                            i = u.deepCopyMap(N.get()),
                                            y.gameAttributes.h.ItemDefinitionsGET = i,
                                            y = a.engine,
                                            i = u.deepCopyMap(P.get()),
                                            y.gameAttributes.h.DummyMap = i,
                                            _ = a.engine.getGameAttribute("DummyMap").h,
                                            o = (_ = Object.keys(_)).length,
                                            g = 0;
                                        g < o;
                                    )
                                        ((d = _[g++]), (t = a.engine.getGameAttribute("ItemDefinitionsGET")), (i = a.engine.getGameAttribute("DummyMap").h["" + d]), (t.h["" + d] = i));
                                    for (
                                        y = a.engine,
                                            i = new l(),
                                            y.gameAttributes.h.DummyMap = i,
                                            y = a.engine,
                                            i = u.deepCopyMap(S.get()),
                                            y.gameAttributes.h.DummyMap = i,
                                            _ = a.engine.getGameAttribute("DummyMap").h,
                                            o = (_ = Object.keys(_)).length,
                                            g = 0;
                                        g < o;
                                    )
                                        ((d = _[g++]), (t = a.engine.getGameAttribute("ItemDefinitionsGET")), (i = a.engine.getGameAttribute("DummyMap").h["" + d]), (t.h["" + d] = i));
                                    ((y = a.engine), (i = new l()), (y.gameAttributes.h.DummyMap = i), p._customBlock_ActionBlock("InitItemDefinitions", "no", 0, 0));
                                }
                                if (0 <= m._customBlock_Language())
                                    for (t = a.engine.getGameAttribute("CustomLists"), i = gd.ItemNamesLANG(), t.h.ItemNamesLANG = i, _ = a.engine.getGameAttribute("ItemDefinitionsGET").h, o = (_ = Object.keys(_)).length, g = 0; g < o;)
                                        ((d = _[g++]),
                                            (t = a.engine.getGameAttribute("DNSM")),
                                            (i = a.engine.getGameAttribute("CustomLists").h.ItemNamesLANG[0].indexOf(a.engine.getGameAttribute("ItemDefinitionsGET").h["" + d].h.displayName)),
                                            (t.h.ItemLangNameDN = i),
                                            0 <= c.asNumber(a.engine.getGameAttribute("DNSM").h.ItemLangNameDN) &&
                                                ((y = a.engine.getGameAttribute("ItemDefinitionsGET").h["" + d]),
                                                (A = a.engine.getGameAttribute("CustomLists").h.ItemNamesLANG[(m._customBlock_Language() + 1) | 0][0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.ItemLangNameDN)]),
                                                (y.h.displayName = A)));
                                for (t = a.engine.getGameAttribute("DNSM"), i = new l(), t.h.ItemzzSellPricesz = i, s = 0, d = a.engine.getGameAttribute("CustomLists").h.ItemToCraftNAME.length; s < d;)
                                    for (
                                        r = s++,
                                            a.engine.getGameAttribute("DNSM").h.CalcTalentDN1 = r,
                                            r = 0,
                                            e = a.engine.getGameAttribute("CustomLists").h.ItemToCraftNAME[0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1)].length;
                                        r < e;
                                    ) {
                                        for (
                                            I = r++,
                                                a.engine.getGameAttribute("DNSM").h.CalcTalentDN2 = I,
                                                a.engine.getGameAttribute("DNSM").h.CalcTalentDN3 = 0,
                                                t = a.engine.getGameAttribute("DNSM"),
                                                i =
                                                    a.engine.getGameAttribute("CustomLists").h.ItemToCraftCostTYPE[0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1)][
                                                        0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2)
                                                    ],
                                                t.h.CalcTalentDL1 = i,
                                                _ = 0,
                                                o = a.engine.getGameAttribute("DNSM").h.CalcTalentDL1.length;
                                            _ < o;
                                        )
                                            ((g = _++),
                                                (y = a.engine.getGameAttribute("DNSM")),
                                                (A =
                                                    c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN3) +
                                                    x._customBlock_RunCodeOfTypeXforThingY("SellPrice", "" + h.string(a.engine.getGameAttribute("DNSM").h.CalcTalentDL1[g][0])) *
                                                        c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDL1[g][1])),
                                                (y.h.CalcTalentDN3 = A));
                                        ((t = a.engine.getGameAttribute("DNSM").h.ItemzzSellPricesz),
                                            (R =
                                                "" +
                                                h.string(
                                                    a.engine.getGameAttribute("CustomLists").h.ItemToCraftNAME[0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN1)][
                                                        0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.CalcTalentDN2)
                                                    ]
                                                )),
                                            (i = a.engine.getGameAttribute("DNSM").h.CalcTalentDN3),
                                            (t.h[R] = i));
                                    }
                            }
                            return 1;
                        }