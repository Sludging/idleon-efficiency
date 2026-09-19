/**
 * Game formula snippet — idleon-efficiency formula research.
 * Function: _customBlock_TotalStats (from scripts.ActorEvents_12)
 * Game version: 1.22 ("Jelly_Operator")
 * Captured: 2026-09-19 via game-debug-tool (findFunction + toString)
 * Case reference: correctness case issue 388
 */
function (e) {
                            var t = a.engine.getGameAttribute("DNSM").h.TotStatMAP;
                            if (Object.prototype.hasOwnProperty.call(t.h, e)) return a.engine.getGameAttribute("DNSM").h.TotStatMAP.h[e];
                            if (
                                ((a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDN = 0),
                                (a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDT = ""),
                                (a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDRI = 0),
                                (a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDRI2 = 0),
                                "calcEtcBonuses" == e)
                            ) {
                                t = a.engine.getGameAttribute("DNSM");
                                var i = new l();
                                ((t.h.TotalStatsETCmap = i), (i = []), ((t = a.engine.getGameAttribute("DNSM")).h.TotalStatsETCmap2List = i));
                                for (var s = a.engine.getGameAttribute("CustomMaps").h.IDforETCbonus.h, r = (s = Object.keys(s)).length, _ = 0; _ < r;) {
                                    var o = s[_++];
                                    a.engine.getGameAttribute("DNSM").h.TotalStatsETCmap2List.push(a.engine.getGameAttribute("CustomMaps").h.IDforETCbonus.h["" + o]);
                                }
                            }
                            for (t = a.engine.getGameAttribute("DNSM"), i = new l(), t.h.TotalStatsDM = i, a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDT2 = "", s = 0; 2 > s;)
                                for (
                                    _ = s++, a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDRI = _, r = 0, _ = Math.round(8 + 8 * (1 - c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDRI)));
                                    r < _;
                                )
                                    if (
                                        ((o = r++),
                                        (a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDRI2 = o),
                                        !(
                                            (1 == m._customBlock_Gallery("GalleryBonusSystemON", 0, 0) &&
                                                0 == a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDRI &&
                                                10 == a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDRI2) ||
                                            (1 == m._customBlock_Gallery("GalleryBonusSystemON", 0, 0) &&
                                                0 == a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDRI &&
                                                14 == a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDRI2) ||
                                            (1 == m._customBlock_Gallery("PremHatBonusesSystemON", 0, 0) &&
                                                0 == a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDRI &&
                                                8 == a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDRI2) ||
                                            (-1 != p._customBlock_Dungon() &&
                                                (-1 == p._customBlock_Dungon() ||
                                                    -1 == ("" + h.string(a.engine.getGameAttribute("EquipmentOrder")[0 | c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDRI)][o])).indexOf("Dung"))) ||
                                            "Blank" == a.engine.getGameAttribute("EquipmentOrder")[0 | c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDRI)][o]
                                        ))
                                    ) {
                                        if (-1 != e.indexOf("Power")) {
                                            if (((a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDT2 = "NOstats"), 0 == a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDRI))
                                                for (a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDT = e.substring(0, e.indexOf("_")), i = 0, t = a.engine.getGameAttribute("CustomLists").h.PowerSuffixes.length; i < t;) {
                                                    var u = i++;
                                                    if (
                                                        -1 !=
                                                        (
                                                            "" +
                                                            h.string(
                                                                a.engine.getGameAttribute("EquipmentOrder")[0 | c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDRI)][
                                                                    0 | c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDRI2)
                                                                ]
                                                            )
                                                        ).indexOf("" + h.string(a.engine.getGameAttribute("CustomLists").h.PowerSuffixes[u]))
                                                    ) {
                                                        a.engine.getGameAttribute("CustomLists").h.PowerSuffixes[u] == a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDT &&
                                                            (a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDT2 = "YESstats");
                                                        break;
                                                    }
                                                    u + 1 == a.engine.getGameAttribute("CustomLists").h.PowerSuffixes.length &&
                                                        "Weapon" == a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDT &&
                                                        (a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDT2 = "YESstats");
                                                }
                                            else
                                                ((a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDT = e.substring(0, e.indexOf("_"))),
                                                    a.engine.getGameAttribute("CustomLists").h.PowerSuffixes.indexOf(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDT) == o &&
                                                        (a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDT2 = "YESstats"));
                                            if ("YESstats" == a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDT2)
                                                if (
                                                    ((t = a.engine.getGameAttribute("EquipmentMap")[0 | c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDRI)][o]),
                                                    Object.prototype.hasOwnProperty.call(t.h, "Weapon_Power"))
                                                ) {
                                                    ((t = a.engine.getGameAttribute("DummyNumbersStatManager")), (i = c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDN)));
                                                    var g = a.engine.getGameAttribute("ItemDefinitionsGET");
                                                    ((u = "" + h.string(a.engine.getGameAttribute("EquipmentOrder")[0 | c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDRI)][o])),
                                                        (i +=
                                                            c.asNumber(g.h[u].h.Weapon_Power) +
                                                            c.asNumber(a.engine.getGameAttribute("EquipmentMap")[0 | c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDRI)][o].h.Weapon_Power)),
                                                        (t.h.TotalStatsDN = i));
                                                } else
                                                    ((t = a.engine.getGameAttribute("DummyNumbersStatManager")),
                                                        (u = c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDN)),
                                                        (g = a.engine.getGameAttribute("ItemDefinitionsGET")),
                                                        (i = "" + h.string(a.engine.getGameAttribute("EquipmentOrder")[0 | c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDRI)][o])),
                                                        (i = u + c.asNumber(g.h[i].h.Weapon_Power)),
                                                        (t.h.TotalStatsDN = i));
                                        } else
                                            ((i = a.engine.getGameAttribute("EquipmentMap")[0 | c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDRI)][o]),
                                                Object.prototype.hasOwnProperty.call(i.h, e)
                                                    ? ((i = a.engine.getGameAttribute("DummyNumbersStatManager")),
                                                      (t = c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDN)),
                                                      (u = a.engine.getGameAttribute("ItemDefinitionsGET")),
                                                      (g = "" + h.string(a.engine.getGameAttribute("EquipmentOrder")[0 | c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDRI)][o])),
                                                      (t += c.asNumber(u.h[g].h[e]) + c.asNumber(a.engine.getGameAttribute("EquipmentMap")[0 | c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDRI)][o].h[e])),
                                                      (i.h.TotalStatsDN = t))
                                                    : ((i = a.engine.getGameAttribute("DummyNumbersStatManager")),
                                                      (t = c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDN)),
                                                      (u = a.engine.getGameAttribute("ItemDefinitionsGET")),
                                                      (g = "" + h.string(a.engine.getGameAttribute("EquipmentOrder")[0 | c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDRI)][o])),
                                                      (t += c.asNumber(u.h[g].h[e])),
                                                      (i.h.TotalStatsDN = t)));
                                        if ("calcEtcBonuses" == e)
                                            for (
                                                i = a.engine.getGameAttribute("DNSM"),
                                                    t = a.engine.getGameAttribute("ItemDefinitionsGET"),
                                                    o = "" + h.string(a.engine.getGameAttribute("EquipmentOrder")[0 | c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDRI)][o]),
                                                    i.h.TotalStatsDM = t.h[o],
                                                    o = 0;
                                                2 > o;
                                            )
                                                if (
                                                    ((i = o++),
                                                    "0" == a.engine.getGameAttribute("DNSM").h.TotalStatsDM.h["UQ" + Math.round(i + 1) + "txt"] &&
                                                    0 <
                                                        c.asNumber(
                                                            a.engine.getGameAttribute("EquipmentMap")[0 | c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDRI)][
                                                                0 | c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDRI2)
                                                            ].h["UQ" + Math.round(i + 1) + "val"]
                                                        )
                                                        ? ((t =
                                                              a.engine.getGameAttribute("EquipmentMap")[0 | c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDRI)][
                                                                  0 | c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDRI2)
                                                              ]),
                                                          (t = Object.prototype.hasOwnProperty.call(t.h, "UQ" + Math.round(i + 1) + "txt")))
                                                        : (t = !1),
                                                    t)
                                                )
                                                    if (
                                                        ((t = a.engine.getGameAttribute("DNSM")),
                                                        (u =
                                                            a.engine.getGameAttribute("EquipmentMap")[0 | c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDRI)][
                                                                0 | c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDRI2)
                                                            ]),
                                                        (t.h.TotalStatsDT2 = u.h["UQ" + Math.round(i + 1) + "txt"]),
                                                        (0 == a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDRI &&
                                                            3 == a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDRI2 &&
                                                            1 == q._customBlock_chipBonuses("pend")) ||
                                                            (0 == a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDRI &&
                                                                9 == a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDRI2 &&
                                                                1 == q._customBlock_chipBonuses("key1")) ||
                                                            (0 == a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDRI &&
                                                                10 == a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDRI2 &&
                                                                1 == q._customBlock_chipBonuses("troph")))
                                                    ) {
                                                        ((t = a.engine.getGameAttribute("DNSM").h.TotalStatsETCmap),
                                                            (u = "" + h.string(a.engine.getGameAttribute("DNSM").h.TotalStatsDT2)),
                                                            (g = a.engine.getGameAttribute("DNSM").h.TotalStatsETCmap));
                                                        var d = "" + h.string(a.engine.getGameAttribute("DNSM").h.TotalStatsDT2);
                                                        ((i =
                                                            c.asNumber(g.h[d]) +
                                                            2 *
                                                                c.asNumber(
                                                                    a.engine.getGameAttribute("EquipmentMap")[0 | c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDRI)][
                                                                        0 | c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDRI2)
                                                                    ].h["UQ" + Math.round(i + 1) + "val"]
                                                                )),
                                                            (t.h[u] = i));
                                                    } else
                                                        0 == a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDRI &&
                                                        15 == a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDRI2 &&
                                                        1 <= m._customBlock_ResearchStuff("Grid_Bonus", 172, 0)
                                                            ? ((t = a.engine.getGameAttribute("DNSM").h.TotalStatsETCmap),
                                                              (u = "" + h.string(a.engine.getGameAttribute("DNSM").h.TotalStatsDT2)),
                                                              (g = a.engine.getGameAttribute("DNSM").h.TotalStatsETCmap),
                                                              (d = "" + h.string(a.engine.getGameAttribute("DNSM").h.TotalStatsDT2)),
                                                              (i =
                                                                  c.asNumber(g.h[d]) +
                                                                  (1 + m._customBlock_ResearchStuff("Grid_Bonus", 172, 0) / 100) *
                                                                      c.asNumber(
                                                                          a.engine.getGameAttribute("EquipmentMap")[0 | c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDRI)][
                                                                              0 | c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDRI2)
                                                                          ].h["UQ" + Math.round(i + 1) + "val"]
                                                                      )),
                                                              (t.h[u] = i))
                                                            : ((t = a.engine.getGameAttribute("DNSM").h.TotalStatsETCmap),
                                                              (u = "" + h.string(a.engine.getGameAttribute("DNSM").h.TotalStatsDT2)),
                                                              (g = a.engine.getGameAttribute("DNSM").h.TotalStatsETCmap),
                                                              (d = "" + h.string(a.engine.getGameAttribute("DNSM").h.TotalStatsDT2)),
                                                              (i =
                                                                  c.asNumber(g.h[d]) +
                                                                  c.asNumber(
                                                                      a.engine.getGameAttribute("EquipmentMap")[0 | c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDRI)][
                                                                          0 | c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDRI2)
                                                                      ].h["UQ" + Math.round(i + 1) + "val"]
                                                                  )),
                                                              (t.h[u] = i));
                                                else
                                                    ((t = a.engine.getGameAttribute("DNSM")),
                                                        (u = a.engine.getGameAttribute("DNSM").h.TotalStatsDM),
                                                        (t.h.TotalStatsDT2 = u.h["UQ" + Math.round(i + 1) + "txt"]),
                                                        (0 == a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDRI &&
                                                            3 == a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDRI2 &&
                                                            1 == q._customBlock_chipBonuses("pend")) ||
                                                        (0 == a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDRI &&
                                                            9 == a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDRI2 &&
                                                            1 == q._customBlock_chipBonuses("key1")) ||
                                                        (0 == a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDRI &&
                                                            10 == a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDRI2 &&
                                                            1 == q._customBlock_chipBonuses("troph"))
                                                            ? ((t = a.engine.getGameAttribute("DNSM").h.TotalStatsETCmap),
                                                              (u = "" + h.string(a.engine.getGameAttribute("DNSM").h.TotalStatsDT2)),
                                                              (g = a.engine.getGameAttribute("DNSM").h.TotalStatsETCmap),
                                                              (d = "" + h.string(a.engine.getGameAttribute("DNSM").h.TotalStatsDT2)),
                                                              (i =
                                                                  c.asNumber(g.h[d]) +
                                                                  2 *
                                                                      (c.asNumber(a.engine.getGameAttribute("DNSM").h.TotalStatsDM.h["UQ" + Math.round(i + 1) + "val"]) +
                                                                          c.asNumber(
                                                                              a.engine.getGameAttribute("EquipmentMap")[0 | c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDRI)][
                                                                                  0 | c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDRI2)
                                                                              ].h["UQ" + Math.round(i + 1) + "val"]
                                                                          ))),
                                                              (t.h[u] = i))
                                                            : 0 == a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDRI &&
                                                                15 == a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDRI2 &&
                                                                1 <= m._customBlock_ResearchStuff("Grid_Bonus", 172, 0)
                                                              ? ((t = a.engine.getGameAttribute("DNSM").h.TotalStatsETCmap),
                                                                (u = "" + h.string(a.engine.getGameAttribute("DNSM").h.TotalStatsDT2)),
                                                                (g = a.engine.getGameAttribute("DNSM").h.TotalStatsETCmap),
                                                                (d = "" + h.string(a.engine.getGameAttribute("DNSM").h.TotalStatsDT2)),
                                                                (i =
                                                                    c.asNumber(g.h[d]) +
                                                                    (1 + m._customBlock_ResearchStuff("Grid_Bonus", 172, 0) / 100) *
                                                                        (c.asNumber(a.engine.getGameAttribute("DNSM").h.TotalStatsDM.h["UQ" + Math.round(i + 1) + "val"]) +
                                                                            c.asNumber(
                                                                                a.engine.getGameAttribute("EquipmentMap")[0 | c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDRI)][
                                                                                    0 | c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDRI2)
                                                                                ].h["UQ" + Math.round(i + 1) + "val"]
                                                                            ))),
                                                                (t.h[u] = i))
                                                              : ((t = a.engine.getGameAttribute("DNSM").h.TotalStatsETCmap),
                                                                (u = "" + h.string(a.engine.getGameAttribute("DNSM").h.TotalStatsDT2)),
                                                                (g = a.engine.getGameAttribute("DNSM").h.TotalStatsETCmap),
                                                                (d = "" + h.string(a.engine.getGameAttribute("DNSM").h.TotalStatsDT2)),
                                                                (i =
                                                                    c.asNumber(g.h[d]) +
                                                                    (c.asNumber(a.engine.getGameAttribute("DNSM").h.TotalStatsDM.h["UQ" + Math.round(i + 1) + "val"]) +
                                                                        c.asNumber(
                                                                            a.engine.getGameAttribute("EquipmentMap")[0 | c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDRI)][
                                                                                0 | c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDRI2)
                                                                            ].h["UQ" + Math.round(i + 1) + "val"]
                                                                        ))),
                                                                (t.h[u] = i)));
                                    }
                            if (1 == m._customBlock_Gallery("GalleryBonusSystemON", 0, 0)) {
                                if (1 == m._customBlock_Gallery("InitializeTrophyBonuses", 0, 0)) {
                                    if ("calcEtcBonuses" == e)
                                        for (s = a.engine.getGameAttribute("DNSM").h.GalleryTrophyBonTOT.h, r = (s = Object.keys(s)).length, _ = 0; _ < r;)
                                            ((o = s[_++]),
                                                (t = a.engine.getGameAttribute("DNSM").h.TotalStatsETCmap),
                                                (i = c.asNumber(a.engine.getGameAttribute("DNSM").h.TotalStatsETCmap.h["" + o]) + c.asNumber(a.engine.getGameAttribute("DNSM").h.GalleryTrophyBonTOT.h["" + o])),
                                                (t.h["" + o] = i));
                                    ((t = a.engine.getGameAttribute("DNSM").h.GalleryTrophyBonTOT),
                                        Object.prototype.hasOwnProperty.call(t.h, e) &&
                                            ((t = a.engine.getGameAttribute("DummyNumbersStatManager")),
                                            (i = c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDN) + c.asNumber(a.engine.getGameAttribute("DNSM").h.GalleryTrophyBonTOT.h[e])),
                                            (t.h.TotalStatsDN = i)));
                                }
                                if (1 == m._customBlock_Gallery("InitializeNametagBonuses", 0, 0)) {
                                    if ("calcEtcBonuses" == e)
                                        for (s = a.engine.getGameAttribute("DNSM").h.GalleryNametagBonTOT.h, r = (s = Object.keys(s)).length, _ = 0; _ < r;)
                                            ((o = s[_++]),
                                                (t = a.engine.getGameAttribute("DNSM").h.TotalStatsETCmap),
                                                (i = c.asNumber(a.engine.getGameAttribute("DNSM").h.TotalStatsETCmap.h["" + o]) + c.asNumber(a.engine.getGameAttribute("DNSM").h.GalleryNametagBonTOT.h["" + o])),
                                                (t.h["" + o] = i));
                                    ((t = a.engine.getGameAttribute("DNSM").h.GalleryNametagBonTOT),
                                        Object.prototype.hasOwnProperty.call(t.h, e) &&
                                            ((t = a.engine.getGameAttribute("DummyNumbersStatManager")),
                                            (i = c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDN) + c.asNumber(a.engine.getGameAttribute("DNSM").h.GalleryNametagBonTOT.h[e])),
                                            (t.h.TotalStatsDN = i)));
                                }
                            }
                            if (1 == m._customBlock_Gallery("PremHatBonusesSystemON", 0, 0) && 1 == m._customBlock_Gallery("InitializePremHatBonuses", 0, 0)) {
                                if ("calcEtcBonuses" == e)
                                    for (s = a.engine.getGameAttribute("DNSM").h.PremHatBonTOT.h, r = (s = Object.keys(s)).length, _ = 0; _ < r;)
                                        ((o = s[_++]),
                                            (t = a.engine.getGameAttribute("DNSM").h.TotalStatsETCmap),
                                            (i = c.asNumber(a.engine.getGameAttribute("DNSM").h.TotalStatsETCmap.h["" + o]) + c.asNumber(a.engine.getGameAttribute("DNSM").h.PremHatBonTOT.h["" + o])),
                                            (t.h["" + o] = i));
                                ((t = a.engine.getGameAttribute("DNSM").h.PremHatBonTOT),
                                    Object.prototype.hasOwnProperty.call(t.h, e) &&
                                        ((t = a.engine.getGameAttribute("DummyNumbersStatManager")),
                                        (i = c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDN) + c.asNumber(a.engine.getGameAttribute("DNSM").h.PremHatBonTOT.h[e])),
                                        (t.h.TotalStatsDN = i)));
                            }
                            if (
                                (-1 == p._customBlock_Dungon() &&
                                    ("STR" == e
                                        ? ((t = a.engine.getGameAttribute("DummyNumbersStatManager")),
                                          (i = c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDN) * (1 + (k._customBlock_GetTalentNumber(1, 96) + k._customBlock_StampBonusOfTypeX("PctSTR")) / 100)),
                                          (t.h.TotalStatsDN = i))
                                        : "AGI" == e
                                          ? ((t = a.engine.getGameAttribute("DummyNumbersStatManager")),
                                            (i = c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDN) * (1 + (k._customBlock_GetTalentNumber(1, 276) + k._customBlock_StampBonusOfTypeX("PctAGI")) / 100)),
                                            (t.h.TotalStatsDN = i))
                                          : "WIS" == e
                                            ? ((t = a.engine.getGameAttribute("DummyNumbersStatManager")),
                                              (i = c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDN) * (1 + (k._customBlock_GetTalentNumber(1, 456) + k._customBlock_StampBonusOfTypeX("PctWIS")) / 100)),
                                              (t.h.TotalStatsDN = i))
                                            : "LUK" == e &&
                                              ((t = a.engine.getGameAttribute("DummyNumbersStatManager")),
                                              (i = c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDN) * (1 + (k._customBlock_GetTalentNumber(1, 21) + k._customBlock_StampBonusOfTypeX("PctLUK")) / 100)),
                                              (t.h.TotalStatsDN = i))),
                                -1 == p._customBlock_Dungon())
                            ) {
                                for (s = a.engine.getGameAttribute("DNSM").h.TotalStatsDN2 = 0, r = n.__cast(a.engine.getGameAttribute("PixelHelperActor")[0].behaviors.getBehavior("ActorEvents_29"), C)._ScrollCircleINFO[43].length; s < r;)
                                    ((_ = s++),
                                        n.__cast(a.engine.getGameAttribute("PixelHelperActor")[0].behaviors.getBehavior("ActorEvents_29"), C)._ScrollCircleINFO[43][_][0] == e &&
                                            ((t = a.engine.getGameAttribute("DNSM")),
                                            (i =
                                                c.asNumber(a.engine.getGameAttribute("DNSM").h.TotalStatsDN2) +
                                                c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[0].behaviors.getBehavior("ActorEvents_29"), C)._ScrollCircleINFO[43][_][3])),
                                            (t.h.TotalStatsDN2 = i)),
                                        "calcEtcBonuses" == e &&
                                            D.contains(
                                                a.engine.getGameAttribute("DNSM").h.TotalStatsETCmap2List,
                                                n.__cast(a.engine.getGameAttribute("PixelHelperActor")[0].behaviors.getBehavior("ActorEvents_29"), C)._ScrollCircleINFO[43][_][0]
                                            ) &&
                                            ((t = a.engine.getGameAttribute("DNSM").h.TotalStatsETCmap),
                                            (u = "" + h.string(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[0].behaviors.getBehavior("ActorEvents_29"), C)._ScrollCircleINFO[43][_][0])),
                                            (g = a.engine.getGameAttribute("DNSM").h.TotalStatsETCmap),
                                            (i = "" + h.string(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[0].behaviors.getBehavior("ActorEvents_29"), C)._ScrollCircleINFO[43][_][0])),
                                            (i = c.asNumber(g.h[i]) + c.asNumber(n.__cast(a.engine.getGameAttribute("PixelHelperActor")[0].behaviors.getBehavior("ActorEvents_29"), C)._ScrollCircleINFO[43][_][3])),
                                            (t.h[u] = i)));
                                ("STR" == e
                                    ? ((t = a.engine.getGameAttribute("DNSM")),
                                      (i = c.asNumber(a.engine.getGameAttribute("DNSM").h.TotalStatsDN2) * (1 + (k._customBlock_GetTalentNumber(1, 111) + 40 * m._customBlock_GamingStatType("SuperBitType", 2, 0)) / 100)),
                                      (t.h.TotalStatsDN2 = i))
                                    : "AGI" == e
                                      ? ((t = a.engine.getGameAttribute("DNSM")),
                                        (i = c.asNumber(a.engine.getGameAttribute("DNSM").h.TotalStatsDN2) * (1 + (k._customBlock_GetTalentNumber(1, 291) + 40 * m._customBlock_GamingStatType("SuperBitType", 2, 0)) / 100)),
                                        (t.h.TotalStatsDN2 = i))
                                      : "WIS" == e
                                        ? ((t = a.engine.getGameAttribute("DNSM")),
                                          (i = c.asNumber(a.engine.getGameAttribute("DNSM").h.TotalStatsDN2) * (1 + (k._customBlock_GetTalentNumber(1, 486) + 40 * m._customBlock_GamingStatType("SuperBitType", 2, 0)) / 100)),
                                          (t.h.TotalStatsDN2 = i))
                                        : "LUK" == e &&
                                          ((t = a.engine.getGameAttribute("DNSM")),
                                          (i = c.asNumber(a.engine.getGameAttribute("DNSM").h.TotalStatsDN2) * (1 + (k._customBlock_GetTalentNumber(1, 36) + 40 * m._customBlock_GamingStatType("SuperBitType", 2, 0)) / 100)),
                                          (t.h.TotalStatsDN2 = i)),
                                    (t = a.engine.getGameAttribute("DummyNumbersStatManager")),
                                    (i = c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDN) + c.asNumber(a.engine.getGameAttribute("DNSM").h.TotalStatsDN2)),
                                    (t.h.TotalStatsDN = i));
                            }
                            return "STR" == e
                                ? (-1 != p._customBlock_Dungon()
                                      ? ((t = a.engine.getGameAttribute("DNSM").h.TotStatMAP), (i = Math.floor(c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDN))))
                                      : ((t = a.engine.getGameAttribute("DNSM").h.TotStatMAP),
                                        (i = Math.floor(
                                            c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.TotalSTR) +
                                                (k._customBlock_GetTalentNumber(1, 652) + m._customBlock_Companions(8)) +
                                                (1 +
                                                    (k._customBlock_GetTalentNumber(1, 143) +
                                                        w._customBlock_EtcBonuses("57") +
                                                        (w._customBlock_EtcBonuses("46") +
                                                            (x._customBlock_ArbitraryCode("AllStatPCT") + m._customBlock_Ninja("PristineBon", 4, 0)) +
                                                            (c.asNumber(a.engine.getGameAttribute("DNSM").h.StarSigns.h.pctSTR) + c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.W8)))) /
                                                        100) *
                                                    (c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDN) +
                                                        (k._customBlock_GetTalentNumber(1, 10) + p._customBlock_getbonus2(1, 51, -1) + (k._customBlock_StampBonusOfTypeX("BaseSTR") + w._customBlock_EtcBonuses("51"))) +
                                                        (k._customBlock_GetTalentNumber(1, 98) +
                                                            k._customBlock_GetTalentNumber(1, 203) +
                                                            (x._customBlock_GetBuffBonuses(94, 1) +
                                                                (k._customBlock_GetTalentNumber(2, 142) + c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[174]) * m._customBlock_Dreamstuff("AllShimmerBonuses", 0)))) +
                                                        (c.asNumber(a.engine.getGameAttribute("DNSM").h.FamBonusQTYs.h[14]) +
                                                            (c.asNumber(a.engine.getGameAttribute("DNSM").h.StarSigns.h.STR) +
                                                                c.asNumber(a.engine.getGameAttribute("DNSM").h.BoxRewards.h["23b"]) +
                                                                (k._customBlock_TalentCalc(620) +
                                                                    (w._customBlock_CardBonusREAL(9) +
                                                                        (k._customBlock_StampBonusOfTypeX("BaseAllStat") +
                                                                            (x._customBlock_ArbitraryCode("AllStat") +
                                                                                (p._customBlock_Labb("SigilBonus", "Blank", 0, 0) +
                                                                                    (c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.W4) +
                                                                                        (p._customBlock_Breeding("ShinyBonusS", "Nah", 6, -1) + (p._customBlock_ArcadeBonus(19) + m._customBlock_Summoning("OwlBonuses", 5, 0))))))))))))
                                        ))),
                                  (t.h[e] = i),
                                  a.engine.getGameAttribute("DNSM").h.TotStatMAP.h[e])
                                : "AGI" == e
                                  ? (-1 != p._customBlock_Dungon()
                                        ? ((t = a.engine.getGameAttribute("DNSM").h.TotStatMAP), (i = Math.floor(c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDN))))
                                        : ((t = a.engine.getGameAttribute("DNSM").h.TotStatMAP),
                                          (i = Math.floor(
                                              c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.TotalAGI) +
                                                  (k._customBlock_GetTalentNumber(1, 652) + m._customBlock_Companions(8)) +
                                                  (1 +
                                                      (k._customBlock_GetTalentNumber(1, 368) +
                                                          w._customBlock_EtcBonuses("25") +
                                                          (w._customBlock_EtcBonuses("46") +
                                                              (x._customBlock_ArbitraryCode("AllStatPCT") + m._customBlock_Ninja("PristineBon", 1, 0)) +
                                                              (c.asNumber(a.engine.getGameAttribute("DNSM").h.StarSigns.h.pctAGI) + c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.A9)))) /
                                                          100) *
                                                      (c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDN) +
                                                          (k._customBlock_GetTalentNumber(1, 11) + p._customBlock_getbonus2(1, 52, -1) + (k._customBlock_StampBonusOfTypeX("BaseAGI") + w._customBlock_EtcBonuses("52"))) +
                                                          (k._customBlock_GetTalentNumber(1, 278) +
                                                              k._customBlock_GetTalentNumber(1, 428) +
                                                              c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[175]) * m._customBlock_Dreamstuff("AllShimmerBonuses", 0)) +
                                                          (c.asNumber(a.engine.getGameAttribute("DNSM").h.FamBonusQTYs.h[38]) +
                                                              (c.asNumber(a.engine.getGameAttribute("DNSM").h.StarSigns.h.AGI) +
                                                                  c.asNumber(a.engine.getGameAttribute("DNSM").h.BoxRewards.h["21b"]) +
                                                                  (k._customBlock_TalentCalc(620) +
                                                                      (w._customBlock_CardBonusREAL(7) +
                                                                          (k._customBlock_StampBonusOfTypeX("BaseAllStat") +
                                                                              (x._customBlock_ArbitraryCode("AllStat") +
                                                                                  (p._customBlock_Labb("SigilBonus", "Blank", 1, 0) +
                                                                                      (k._customBlock_GetTalentNumber(2, 367) +
                                                                                          (c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.A4) +
                                                                                              (p._customBlock_Breeding("ShinyBonusS", "Nah", 7, -1) + (p._customBlock_ArcadeBonus(20) + m._customBlock_Summoning("OwlBonuses", 5, 0)))))))))))))
                                          ))),
                                    (t.h[e] = i),
                                    a.engine.getGameAttribute("DNSM").h.TotStatMAP.h[e])
                                  : "WIS" == e
                                    ? (-1 != p._customBlock_Dungon()
                                          ? ((t = a.engine.getGameAttribute("DNSM").h.TotStatMAP), (i = Math.floor(c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDN))))
                                          : ((t = a.engine.getGameAttribute("DNSM").h.TotStatMAP),
                                            (i = Math.floor(
                                                c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.TotalWIS) +
                                                    (k._customBlock_GetTalentNumber(1, 652) + m._customBlock_Companions(8)) +
                                                    (1 +
                                                        (k._customBlock_GetTalentNumber(1, 533) +
                                                            w._customBlock_EtcBonuses("58") +
                                                            (w._customBlock_EtcBonuses("46") +
                                                                (x._customBlock_ArbitraryCode("AllStatPCT") + m._customBlock_Ninja("PristineBon", 10, 0)) +
                                                                (c.asNumber(a.engine.getGameAttribute("DNSM").h.StarSigns.h.pctWIS) + c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.M9)))) /
                                                            100) *
                                                        (c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDN) +
                                                            (k._customBlock_GetTalentNumber(1, 12) + p._customBlock_getbonus2(1, 53, -1) + (k._customBlock_StampBonusOfTypeX("BaseWIS") + w._customBlock_EtcBonuses("53"))) +
                                                            (k._customBlock_GetTalentNumber(1, 459) + c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[176]) * m._customBlock_Dreamstuff("AllShimmerBonuses", 0)) +
                                                            c.asNumber(a.engine.getGameAttribute("DNSM").h.FamBonusQTYs.h[62]) +
                                                            (c.asNumber(a.engine.getGameAttribute("DNSM").h.StarSigns.h.WIS) +
                                                                c.asNumber(a.engine.getGameAttribute("DNSM").h.BoxRewards.h["22b"]) +
                                                                (k._customBlock_GetTalentNumber(1, 593) +
                                                                    k._customBlock_TalentCalc(620) +
                                                                    (w._customBlock_CardBonusREAL(5) +
                                                                        (k._customBlock_StampBonusOfTypeX("BaseAllStat") +
                                                                            (x._customBlock_ArbitraryCode("AllStat") +
                                                                                (p._customBlock_Labb("SigilBonus", "Blank", 2, 0) +
                                                                                    (k._customBlock_GetTalentNumber(2, 532) +
                                                                                        (c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.M4) +
                                                                                            (p._customBlock_Breeding("ShinyBonusS", "Nah", 8, -1) + (p._customBlock_ArcadeBonus(21) + m._customBlock_Summoning("OwlBonuses", 5, 0))))))))))))
                                            ))),
                                      (t.h[e] = i),
                                      a.engine.getGameAttribute("DNSM").h.TotStatMAP.h[e])
                                    : "LUK" == e
                                      ? (-1 != p._customBlock_Dungon()
                                            ? ((t = a.engine.getGameAttribute("DNSM").h.TotStatMAP), (i = Math.floor(c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDN))))
                                            : ((t = a.engine.getGameAttribute("DNSM").h.TotStatMAP),
                                              (i = Math.floor(
                                                  c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.TotalLUK) +
                                                      (k._customBlock_GetTalentNumber(1, 652) + m._customBlock_Companions(8)) +
                                                      (1 +
                                                          (w._customBlock_EtcBonuses("17") +
                                                              (w._customBlock_EtcBonuses("46") +
                                                                  (x._customBlock_ArbitraryCode("AllStatPCT") + m._customBlock_Ninja("PristineBon", 5, 0)) +
                                                                  c.asNumber(a.engine.getGameAttribute("DNSM").h.StarSigns.h.pctLUK))) /
                                                              100) *
                                                          (c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDN) +
                                                              (k._customBlock_GetTalentNumber(1, 13) +
                                                                  p._customBlock_getbonus2(1, 54, -1) +
                                                                  (k._customBlock_StampBonusOfTypeX("BaseLUK") +
                                                                      c.asNumber(a.engine.getGameAttribute("DNSM").h.BoxRewards.h["15c"]) +
                                                                      (w._customBlock_EtcBonuses("54") + c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[177]) * m._customBlock_Dreamstuff("AllShimmerBonuses", 0)))) +
                                                              (c.asNumber(a.engine.getGameAttribute("DNSM").h.BoxRewards.h.LUK) +
                                                                  (c.asNumber(a.engine.getGameAttribute("DNSM").h.FamBonusQTYs.h[4]) +
                                                                      c.asNumber(a.engine.getGameAttribute("DNSM").h.StarSigns.h.LUK) +
                                                                      (Math.min(x._customBlock_ArbitraryCode("TotalQuestsComplete"), k._customBlock_GetTalentNumber(1, 618)) +
                                                                          (k._customBlock_TalentCalc(620) +
                                                                              (w._customBlock_CardBonusREAL(2) +
                                                                                  (k._customBlock_GetTalentNumber(1, 23) +
                                                                                      (k._customBlock_StampBonusOfTypeX("BaseAllStat") +
                                                                                          (x._customBlock_ArbitraryCode("AllStat") +
                                                                                              (p._customBlock_Labb("SigilBonus", "Blank", 3, 0) +
                                                                                                  (c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.A4) +
                                                                                                      (p._customBlock_Breeding("ShinyBonusS", "Nah", 9, -1) +
                                                                                                          (p._customBlock_ArcadeBonus(22) + m._customBlock_Summoning("OwlBonuses", 5, 0))))))))))))))
                                              ))),
                                        (t.h[e] = i),
                                        a.engine.getGameAttribute("DNSM").h.TotStatMAP.h[e])
                                      : "Defence" == e
                                        ? (-1 != p._customBlock_Dungon()
                                              ? ((t = a.engine.getGameAttribute("DNSM").h.TotStatMAP), (i = c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDN) + p._customBlock_DungeonStat("DEF")))
                                              : 1 == m._customBlock_Summoning("GrimoireWraith", 0, 0)
                                                ? ((t = a.engine.getGameAttribute("DNSM").h.TotStatMAP), (i = m._customBlock_Summoning("Grimoire_DEF", 0, 0)))
                                                : 1 == m._customBlock_Windwalker("CompassTempest", 0, 0)
                                                  ? ((t = a.engine.getGameAttribute("DNSM").h.TotStatMAP), (i = m._customBlock_Windwalker("Compass_DEF", 0, 0)))
                                                  : 1 == m._customBlock_ArcaneType("TesseractArcanist", 0, 0)
                                                    ? ((t = a.engine.getGameAttribute("DNSM").h.TotStatMAP), (i = m._customBlock_ArcaneType("Arcane_DEF", 0, 0)))
                                                    : ((t = a.engine.getGameAttribute("DNSM").h.TotStatMAP),
                                                      (i =
                                                          Math.floor(
                                                              c.asNumber(a.engine.getGameAttribute("DNSM").h.BoxRewards.h.def) +
                                                                  w._customBlock_CardBonusREAL(26) +
                                                                  Math.min(c.asNumber(a.engine.getGameAttribute("Lv0")[0]), c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.DefPct)) +
                                                                  (k._customBlock_StampBonusOfTypeX("BaseDef") + w._customBlock_EtcBonuses("50") + p._customBlock_ArcadeBonus(1) + x._customBlock_ArbitraryCode("StatueBonusGiven7")) +
                                                                  (c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDN) *
                                                                      (1 +
                                                                          (c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.DefPct) +
                                                                              m._customBlock_Summoning("VaultUpgBonus", 46, 0) +
                                                                              (w._customBlock_CardBonusREAL(15) + m._customBlock_Companions(21) + 3 * x._customBlock_RunCodeOfTypeXforThingY("CardLv", "w6a2"))) /
                                                                              100) +
                                                                      (q._customBlock_MealBonus("Def") + k._customBlock_GetTalentNumber(2, 122)))
                                                          ) *
                                                              (1 + (p._customBlock_Shrine(1) + q._customBlock_GetBribeBonus("22")) / 100) *
                                                              Math.max(0.05, 1 - (p._customBlock_prayersReal(15, 1) + p._customBlock_prayersReal(16, 1)) / 100) *
                                                              (1 +
                                                                  (q._customBlock_GoldFoodBonuses("Defence") +
                                                                      k._customBlock_GetTalentNumber(1, 9) +
                                                                      (w._customBlock_EtcBonuses("7") +
                                                                          (c.asNumber(a.engine.getGameAttribute("DNSM").h.StarSigns.h.DefPct) +
                                                                              (x._customBlock_GetBuffBonuses(124, 1) +
                                                                                  (p._customBlock_CardSetBonuses(0, "4") +
                                                                                      (p._customBlock_FlurboShop(6) + (q._customBlock_chipBonuses("def") + m._customBlock_GetSetBonus("AMAROK_SET", "Bonus", 0, 0)))))))) /
                                                                      100) *
                                                              (1 +
                                                                  (m._customBlock_Divinity("Bonus_Minor", a.engine.getGameAttribute("GetPlayersUsernames").indexOf(a.engine.getGameAttribute("UserInfo")[0]), 0) +
                                                                      m._customBlock_Summoning("VotingBonusz", 3, 0)) /
                                                                      100) +
                                                          (m._customBlock_Summoning("RooBonuses", 1, 0) + m._customBlock_Summoning("VaultUpgBonus", 5, 0)))),
                                          (t.h[e] = i),
                                          a.engine.getGameAttribute("DNSM").h.TotStatMAP.h[e])
                                        : "Accuracy" == e
                                          ? ((t = a.engine.getGameAttribute("DNSM").h.TotStatMAP),
                                            (i =
                                                2 +
                                                c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchVials.h.baseACC) +
                                                (c.asNumber(a.engine.getGameAttribute("DNSM").h.BoxRewards.h.acc) +
                                                    (w._customBlock_CardBonusREAL(23) + w._customBlock_EtcBonuses("28") + q._customBlock_GoldFoodBonuses("BaseAcc")) +
                                                    (k._customBlock_StampBonusOfTypeX("BaseAcc") + m._customBlock_Summoning("VaultUpgBonus", 4, 0))) +
                                                c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDN)),
                                            (t.h[e] = i),
                                            a.engine.getGameAttribute("DNSM").h.TotStatMAP.h[e])
                                          : "Weapon_Power" == e
                                            ? ((t = a.engine.getGameAttribute("DNSM").h.TotStatMAP),
                                              (i =
                                                  5 +
                                                  c.asNumber(a.engine.getGameAttribute("DNSM").h.BoxRewards.h["12a"]) +
                                                  p._customBlock_FlurboShop(0) +
                                                  q._customBlock_TotalFoodBonuses("WeaponPowerBoosts") +
                                                  (w._customBlock_CardBonusREAL(18) + x._customBlock_RunCodeOfTypeXforThingY("CardLv", "w5b2") + (p._customBlock_GuildBonuses(3) + p._customBlock_Labb("SigilBonus", "Blank", 17, 0))) +
                                                  (c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDN) *
                                                      (1 +
                                                          (q._customBlock_chipBonuses("weppow") +
                                                              (c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.W1) +
                                                                  (c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.A1) + c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.M1)))) /
                                                              100) +
                                                      k._customBlock_TalentCalc(616) +
                                                      (c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchVials.h.WeaponPOW) +
                                                          (c.asNumber(a.engine.getGameAttribute("DNSM").h.FamBonusQTYs.h[16]) +
                                                              (c.asNumber(a.engine.getGameAttribute("DNSM").h.StarSigns.h.WepPow) +
                                                                  (p._customBlock_ArcadeBonus(17) +
                                                                      (k._customBlock_GetTalentNumber(1, 140) * Math.floor(c.asNumber(a.engine.getGameAttribute("Lv0")[10]) / 10) +
                                                                          (k._customBlock_GetTalentNumber(1, 170) * Math.floor(c.asNumber(a.engine.getGameAttribute("Lv0")[15]) / 10) +
                                                                              (k._customBlock_GetTalentNumber(1, 320) * Math.floor(c.asNumber(a.engine.getGameAttribute("Lv0")[13]) / 10) +
                                                                                  k._customBlock_GetTalentNumber(1, 500) * Math.floor(c.asNumber(a.engine.getGameAttribute("Lv0")[14]) / 10))) +
                                                                          (k._customBlock_GetTalentNumber(1, 365) * k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("PetsStored")[0][2])) +
                                                                              k._customBlock_GetTalentNumber(1, 530) * Math.floor(c.asNumber(a.engine.getGameAttribute("Lv0")[12]) / 10))))))))),
                                              (t.h[e] = i),
                                              a.engine.getGameAttribute("DNSM").h.TotStatMAP.h[e])
                                            : "Dung_Power" == e
                                              ? ((t = a.engine.getGameAttribute("DNSM").h.TotStatMAP),
                                                (i = c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDN)),
                                                (t.h[e] = i),
                                                a.engine.getGameAttribute("DNSM").h.TotStatMAP.h[e])
                                              : "Mining_Power" == e
                                                ? ((t = a.engine.getGameAttribute("DNSM").h.TotStatMAP),
                                                  (i =
                                                      c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDN) +
                                                      (x._customBlock_ArbitraryCode("StatueBonusGiven2") +
                                                          (c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.W2) + c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.W7)))),
                                                  (t.h[e] = i),
                                                  a.engine.getGameAttribute("DNSM").h.TotStatMAP.h[e])
                                                : "Choppin_Power" == e
                                                  ? ((t = a.engine.getGameAttribute("DNSM").h.TotStatMAP),
                                                    (i =
                                                        c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDN) +
                                                        (x._customBlock_ArbitraryCode("StatueBonusGiven6") +
                                                            (c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.M2) + c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.M7)))),
                                                    (t.h[e] = i),
                                                    a.engine.getGameAttribute("DNSM").h.TotStatMAP.h[e])
                                                  : "Fishing_Power" == e
                                                    ? ((t = a.engine.getGameAttribute("DNSM").h.TotStatMAP),
                                                      (i =
                                                          c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDN) +
                                                          (x._customBlock_ArbitraryCode("StatueBonusGiven8") +
                                                              (c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.W2) + c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.W7)))),
                                                      (t.h[e] = i),
                                                      a.engine.getGameAttribute("DNSM").h.TotStatMAP.h[e])
                                                    : "Catching_Power" == e
                                                      ? ((t = a.engine.getGameAttribute("DNSM").h.TotStatMAP),
                                                        (i =
                                                            c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDN) +
                                                            (x._customBlock_ArbitraryCode("StatueBonusGiven9") +
                                                                (c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.A2) + c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.A8)))),
                                                        (t.h[e] = i),
                                                        a.engine.getGameAttribute("DNSM").h.TotStatMAP.h[e])
                                                      : "Trapping_Power" == e
                                                        ? ((t = a.engine.getGameAttribute("DNSM").h.TotStatMAP),
                                                          (i =
                                                              c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDN) +
                                                              (c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.A2) + c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.A8))),
                                                          (t.h[e] = i),
                                                          a.engine.getGameAttribute("DNSM").h.TotStatMAP.h[e])
                                                        : "Worship_Power" == e
                                                          ? ((t = a.engine.getGameAttribute("DNSM").h.TotStatMAP),
                                                            (i =
                                                                c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.TotalStatsDN) +
                                                                (c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.M2) + c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.M7))),
                                                            (t.h[e] = i),
                                                            a.engine.getGameAttribute("DNSM").h.TotStatMAP.h[e])
                                                          : "Drop_Rarity" == e
                                                            ? ((t = a.engine.getGameAttribute("DNSM")),
                                                              (i = x._customBlock_TotalStats("LUK")),
                                                              (t.h.DropRateLUK = i),
                                                              1e3 > c.asNumber(a.engine.getGameAttribute("DNSM").h.DropRateLUK)
                                                                  ? ((t = a.engine.getGameAttribute("DNSM")), (i = (Math.pow(c.asNumber(a.engine.getGameAttribute("DNSM").h.DropRateLUK) + 1, 0.37) - 1) / 40))
                                                                  : ((t = a.engine.getGameAttribute("DNSM")),
                                                                    (i = ((c.asNumber(a.engine.getGameAttribute("DNSM").h.DropRateLUK) - 1e3) / (c.asNumber(a.engine.getGameAttribute("DNSM").h.DropRateLUK) + 2500)) * 0.5 + 0.297)),
                                                              (t.h.DropRateLUK = i),
                                                              (t = a.engine.getGameAttribute("DNSM")),
                                                              (i =
                                                                  Math.min(1.5 * x._customBlock_RunCodeOfTypeXforThingY("CardLv", "mini5a"), 10) +
                                                                  (Math.min(4 * x._customBlock_RunCodeOfTypeXforThingY("CardLv", "caveC") + 6 * x._customBlock_RunCodeOfTypeXforThingY("CardLv", "caveD"), 100) +
                                                                      (Math.min(2 * x._customBlock_RunCodeOfTypeXforThingY("CardLv", "anni4Event1"), 20) + Math.min(3 * x._customBlock_RunCodeOfTypeXforThingY("CardLv", "luckEvent1"), 25))) +
                                                                  (q._customBlock_GoldFoodBonuses("DropRatez") +
                                                                      (6 * p._customBlock_AchieveStatus(377) +
                                                                          4 * p._customBlock_AchieveStatus(381) +
                                                                          (m._customBlock_Summoning("OwlBonuses", 4, 0) +
                                                                              (m._customBlock_FarmingStuffs("LankRankUpgBonus", 9, 0) +
                                                                                  (m._customBlock_Summoning("VotingBonusz", 27, 0) +
                                                                                      (m._customBlock_Holes("B_UPG", 46, 0) +
                                                                                          (m._customBlock_FarmingStuffs("CropSCbonus", 7, 0) +
                                                                                              (m._customBlock_Summoning("GrimoireUpgBonus", 44, 0) +
                                                                                                  (m._customBlock_Summoning("VaultUpgBonus", 18, 0) +
                                                                                                      (m._customBlock_Holes("MeasurementBonusTOTAL", 15, 0) +
                                                                                                          (m._customBlock_Companions(22) +
                                                                                                              m._customBlock_Companions(158) +
                                                                                                              (m._customBlock_Holes("B_UPG", 82, 20) +
                                                                                                                  (m._customBlock_Holes("MonumentROGbonuses", 2, 6) +
                                                                                                                      (m._customBlock_Thingies("EmperorBon", 11, 0) +
                                                                                                                          (m._customBlock_GetSetBonus("EFAUNT_SET", "Bonus", 0, 0) +
                                                                                                                              (m._customBlock_FarmingStuffs("ExoticBonusQTY", 59, 0) +
                                                                                                                                  (m._customBlock_Thingies("FriendBonusStatz", 3, 0) +
                                                                                                                                      (m._customBlock_Thingies("LegendPTS_bonus", 1, 0) +
                                                                                                                                          (m._customBlock_Spelunk("ShopUpgBonus", 50, 0) +
                                                                                                                                              (m._customBlock_Companions(111) +
                                                                                                                                                  k._customBlock_GetTalentNumber(1, 239) *
                                                                                                                                                      (m._customBlock_RoyalG("TotalStatz", 0, 0) / 1)))))))))))))))))))))),
                                                              (t.h.DropRateLUK2 = i),
                                                              (t = a.engine.getGameAttribute("DNSM").h.TotStatMAP),
                                                              (i =
                                                                  1.4 * c.asNumber(a.engine.getGameAttribute("DNSM").h.DropRateLUK) +
                                                                  (k._customBlock_GetTalentNumber(1, 279) +
                                                                      (c.asNumber(a.engine.getGameAttribute("DNSM").h.BoxRewards.h.DropRate) +
                                                                          (w._customBlock_EtcBonuses("2") +
                                                                              w._customBlock_EtcBonuses("102") +
                                                                              (c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.DropRate) +
                                                                                  (w._customBlock_CardBonusREAL(10) +
                                                                                      (k._customBlock_GetTalentNumber(1, 24) +
                                                                                          (c.asNumber(a.engine.getGameAttribute("DNSM").h.StarSigns.h.Drop) +
                                                                                              (p._customBlock_GuildBonuses(10) +
                                                                                                  (p._customBlock_CardSetBonuses(0, "5") +
                                                                                                      (p._customBlock_CardSetBonuses(0, "6") +
                                                                                                          (p._customBlock_Shrine(4) +
                                                                                                              (p._customBlock_prayersReal(7, 0) +
                                                                                                                  (p._customBlock_Labb("SigilBonus", "Blank", 11, 0) +
                                                                                                                      (p._customBlock_Breeding("ShinyBonusS", "Nah", 0, -1) +
                                                                                                                          (p._customBlock_ArcadeBonus(27) +
                                                                                                                              (m._customBlock_Companions(3) +
                                                                                                                                  m._customBlock_Companions(50) +
                                                                                                                                  (k._customBlock_StampBonusOfTypeX("DropRate") +
                                                                                                                                      (k._customBlock_GetTalentNumber(1, 655) *
                                                                                                                                          c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[189]) +
                                                                                                                                          (5 * c.asNumber(a.engine.getGameAttribute("Dream")[10]) +
                                                                                                                                              (m._customBlock_Summoning("WinBonus", 9, 0) +
                                                                                                                                                  (m._customBlock_Summoning("TomeBonus", 2, 0) +
                                                                                                                                                      (c.asNumber(a.engine.getGameAttribute("DNSM").h.DropRateLUK2) +
                                                                                                                                                          (m._customBlock_ResearchStuff("Grid_Bonus", 173, 0) +
                                                                                                                                                              m._customBlock_Companions(132)))))))))))))))))))))))) /
                                                                      100 +
                                                                  1),
                                                              (t.h[e] = i),
                                                              c.asNumber(a.engine.getGameAttribute("DNSM").h.TotStatMAP.h[e]),
                                                              5 > c.asNumber(a.engine.getGameAttribute("DNSM").h.TotStatMAP.h[e]) &&
                                                                  ((t = a.engine.getGameAttribute("DNSM").h.TotStatMAP),
                                                                  (i = Math.min(5, c.asNumber(a.engine.getGameAttribute("DNSM").h.TotStatMAP.h[e]) + q._customBlock_chipBonuses("dr") / 100)),
                                                                  (t.h[e] = i)),
                                                              -1 != p._customBlock_Dungon() &&
                                                                  ((t = a.engine.getGameAttribute("DNSM").h.TotStatMAP), (i = 1 + (x._customBlock_TotalStats("LUK") + p._customBlock_DungeonStat("DropRarity")) / 100), (t.h[e] = i)),
                                                              -1 == p._customBlock_Dungon() &&
                                                                  (1 == a.engine.getGameAttribute("BundlesReceived").h.bun_v &&
                                                                      ((t = a.engine.getGameAttribute("DNSM").h.TotStatMAP), (i = c.asNumber(a.engine.getGameAttribute("DNSM").h.TotStatMAP.h[e]) + 2), (t.h[e] = i)),
                                                                  (t = a.engine.getGameAttribute("DNSM").h.TotStatMAP),
                                                                  (i = c.asNumber(a.engine.getGameAttribute("DNSM").h.TotStatMAP.h[e]) * p._customBlock_WorkbenchStuff("AdditionExtraEXPnDR", 0, 0)),
                                                                  (t.h[e] = i),
                                                                  1 <= c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[232]) &&
                                                                      ((t = a.engine.getGameAttribute("DNSM").h.TotStatMAP), (i = c.asNumber(a.engine.getGameAttribute("DNSM").h.TotStatMAP.h[e]) + 0.3), (t.h[e] = i)),
                                                                  1 == a.engine.getGameAttribute("BundlesReceived").h.bun_p &&
                                                                      ((t = a.engine.getGameAttribute("DNSM").h.TotStatMAP), (i = 1.2 * c.asNumber(a.engine.getGameAttribute("DNSM").h.TotStatMAP.h[e])), (t.h[e] = i)),
                                                                  (t = a.engine.getGameAttribute("DNSM").h.TotStatMAP),
                                                                  (i =
                                                                      c.asNumber(a.engine.getGameAttribute("DNSM").h.TotStatMAP.h[e]) *
                                                                      (1 + m._customBlock_ArcaneType("ArcaneMapMulti_bon", 0, 0) / 100) *
                                                                      (1 + m._customBlock_RoyalG("StatueBon", 1, 0) / 100) *
                                                                      (1 + w._customBlock_CardBonusREAL(101) / 100) *
                                                                      (1 + c.asNumber(a.engine.getGameAttribute("DNSM").h.FamBonusQTYs.h[32]) / 100) *
                                                                      (1 + 0.3 * m._customBlock_Companions(168)) *
                                                                      (1 + (Math.min(0.5, m._customBlock_Companions(132)) + 0.2 * m._customBlock_CompLV2(132))) *
                                                                      (1 + (m._customBlock_SushiStuff("RoG_BonusQTY", 48, 0) + q._customBlock_JellyOperation("RoG_BonusQTY", 14, 0)) / 100) *
                                                                      Math.max(1, m._customBlock_Minehead("GlimboDRmulti", 0, 0)) *
                                                                      (1 + m._customBlock_Summoning("TomeBonus", 7, 0) / 100) *
                                                                      (1 + w._customBlock_EtcBonuses("99") / 100) *
                                                                      (1 + m._customBlock_Minehead("BonusQTY", 0, 0) / 100) *
                                                                      (1 + (5 * m._customBlock_Dreamstuff("CloudBonus", 69)) / 100)),
                                                                  (t.h[e] = i),
                                                                  (t = a.engine.getGameAttribute("DNSM").h.TotStatMAP),
                                                                  (i =
                                                                      c.asNumber(a.engine.getGameAttribute("DNSM").h.TotStatMAP.h[e]) *
                                                                      (1 + m._customBlock_Ninja("PristineBon", 3, 0) / 100) *
                                                                      (1 + w._customBlock_EtcBonuses("91") / 100) *
                                                                      (1 + c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchVials.h["7drMulto"]) / 100)),
                                                                  (t.h[e] = i),
                                                                  (t = a.engine.getGameAttribute("DNSM").h.TotStatMAP),
                                                                  (i =
                                                                      c.asNumber(a.engine.getGameAttribute("DNSM").h.TotStatMAP.h[e]) *
                                                                      Math.max(1, Math.min(1.3, 1 + m._customBlock_Companions(26)) * (1 + 0.5 * m._customBlock_Companions(160))) *
                                                                      Math.max(1, Math.min(1.01, 1 + m._customBlock_Companions(50) / 2500))),
                                                                  (t.h[e] = i)),
                                                              (t = a.engine.getGameAttribute("DNSM").h.TotStatMAP),
                                                              (i = a.engine.getGameAttribute("DNSM").h.TotStatMAP.h[e]),
                                                              (t.h.NormzDR_GlunkC = i),
                                                              216 == a.engine.getGameAttribute("CurrentMap") &&
                                                                  17 == a.engine.getGameAttribute("Holes")[0][a.engine.getGameAttribute("GetPlayersUsernames").indexOf(a.engine.getGameAttribute("UserInfo")[0])] &&
                                                                  ((t = a.engine.getGameAttribute("DNSM").h.TotStatMAP), (i = m._customBlock_Holes2("Cglunko_DR", 0, 0)), (t.h[e] = i)),
                                                              a.engine.getGameAttribute("DNSM").h.TotStatMAP.h[e])
                                                            : (a.engine.getGameAttribute("DNSM").h.TotStatMAP.h[e] = 0);
                        }
