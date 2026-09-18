/**
 * Game formula snippet — idleon-efficiency formula research.
 * Function: _customBlock_Gallery (from scripts.ActorEvents_579)
 * Game version: 1.21 ("World_7_Taskmaster")
 * Captured: 2026-09-17 via game-debug-tool (findFunction + toString)
 * Case reference: correctness case issue 387
 */
function (e, t, i) {
                            if ("PodiumsOwned" == e)
                                return Math.min(
                                    19,
                                    1 +
                                        (Math.ceil(c.asNumber(a.engine.getGameAttribute("Spelunk")[13][4]) / 4) +
                                            (Math.min(1, m._customBlock_Ninja("EmporiumBonus", 42, 0)) +
                                                (Math.floor(c.asNumber(a.engine.getGameAttribute("GemItemsPurchased")[40]) / 1) +
                                                    (2 * m._customBlock_Spelunk("DoWeHaveLoreN1", 5, 0) +
                                                        (Math.min(2, Math.round(c.asNumber(a.engine.getGameAttribute("Sailing")[3][33]))) + m._customBlock_Summoning("EventShopOwned", 26, 0))))))
                                );
                            if ("PodiumsOwned_Lv2" == e)
                                return Math.round(
                                    2 * m._customBlock_Thingies("ClamWorkBonus", 0, 0) +
                                        (Math.min(2, m._customBlock_RandomEvent("KillroyBonuses", 3, 0)) +
                                            (m._customBlock_Companions(42) +
                                                Math.floor(c.asNumber(a.engine.getGameAttribute("GemItemsPurchased")[40]) / 2) +
                                                (m._customBlock_Gallery("PodiumsOwned_Lv3", 0, 0) +
                                                    (m._customBlock_Thingies("LegendPTS_bonus", 9, 0) +
                                                        Math.max(
                                                            0,
                                                            Math.min(2, Math.round(c.asNumber(a.engine.getGameAttribute("Sailing")[3][33])) - 2) - Math.min(1, Math.floor(c.asNumber(a.engine.getGameAttribute("Sailing")[3][33]) / 5))
                                                        )))))
                                );
                            if ("PodiumsOwned_Lv3" == e)
                                return Math.round(
                                    Math.floor(c.asNumber(a.engine.getGameAttribute("GemItemsPurchased")[40]) / 3) +
                                        Math.min(1, Math.floor(c.asNumber(a.engine.getGameAttribute("Sailing")[3][33]) / 5)) +
                                        m._customBlock_Gallery("PodiumsOwned_Lv4", 0, 0)
                                );
                            if ("PodiumsOwned_Lv4" == e)
                                return Math.round(
                                    Math.min(1, m._customBlock_Companions(28)) +
                                        Math.min(1, m._customBlock_CompLV2(28)) +
                                        (m._customBlock_Summoning("EventShopOwned", 29, 0) + Math.min(1, Math.floor(c.asNumber(a.engine.getGameAttribute("Sailing")[3][33]) / 6)))
                                );
                            if ("GalleryBonusSystemON" == e) return 0 >= c.asNumber(a.engine.getGameAttribute("KillsLeft2Advance")[250][0]) ? 1 : 0;
                            if ("GalleryBonusMulti" == e)
                                return (
                                    1 +
                                    (3 * c.asNumber(a.engine.getGameAttribute("Spelunk")[13][4]) +
                                        (10 * q._customBlock_chipBonuses("troph") +
                                            (3 * m._customBlock_Thingies("ClamWorkBonus", 7, 0) +
                                                (m._customBlock_RandomEvent("KillroyBonuses", 3, 0) +
                                                    (Math.min(20, c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.Y13)) +
                                                        (Math.min(x._customBlock_RunCodeOfTypeXforThingY("CardLv", "w7a11"), 10) + (m._customBlock_Companions(49) + m._customBlock_SushiStuff("RoG_BonusQTY", 54, 0)))))))) /
                                        100
                                );
                            if ("InitializeTrophyBonuses" == e) {
                                if (-1 != t) {
                                    var n = a.engine.getGameAttribute("DNSM");
                                    i = !Object.prototype.hasOwnProperty.call(n.h, "GalleryTrophyBonTOT");
                                } else i = !0;
                                if (i) {
                                    n = a.engine.getGameAttribute("DNSM");
                                    var s = new l();
                                    ((n.h.GalleryTrophyBonTOT = s), (i = 0));
                                    for (var r = a.engine.getGameAttribute("Spelunk")[16].length; i < r;) {
                                        var _ = i++;
                                        if (
                                            ((a.engine.getGameAttribute("DNSM").h.GalleryDN1 = _),
                                            (a.engine.getGameAttribute("DNSM").h.GalleryDN2 = 0.3),
                                            48 <= c.asNumber(a.engine.getGameAttribute("DNSM").h.GalleryDN1) &&
                                                (m._customBlock_Gallery("PodiumsOwned_Lv4", 0, 0) > c.asNumber(a.engine.getGameAttribute("DNSM").h.GalleryDN1) - 48
                                                    ? (a.engine.getGameAttribute("DNSM").h.GalleryDN2 = 2.5)
                                                    : m._customBlock_Gallery("PodiumsOwned_Lv3", 0, 0) > c.asNumber(a.engine.getGameAttribute("DNSM").h.GalleryDN1) - 48
                                                      ? (a.engine.getGameAttribute("DNSM").h.GalleryDN2 = 2)
                                                      : m._customBlock_Gallery("PodiumsOwned_Lv2", 0, 0) > c.asNumber(a.engine.getGameAttribute("DNSM").h.GalleryDN1) - 48
                                                        ? (a.engine.getGameAttribute("DNSM").h.GalleryDN2 = 1.5)
                                                        : (a.engine.getGameAttribute("DNSM").h.GalleryDN2 = 1)),
                                            (n = a.engine.getGameAttribute("DNSM")),
                                            (s = c.asNumber(a.engine.getGameAttribute("DNSM").h.GalleryDN2) * m._customBlock_Gallery("GalleryBonusMulti", 0, 0)),
                                            (n.h.GalleryDN2 = s),
                                            1 <= c.asNumber(a.engine.getGameAttribute("Spelunk")[16][0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.GalleryDN1)]))
                                        ) {
                                            for (e = 0; 2 > e;)
                                                if (
                                                    ((t = e++),
                                                    (s = a.engine.getGameAttribute("ItemDefinitionsGET")),
                                                    (n = "Trophy" + Math.round(c.asNumber(a.engine.getGameAttribute("Spelunk")[16][0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.GalleryDN1)]))),
                                                    "0" != s.h[n].h["UQ" + Math.round(t + 1) + "txt"])
                                                ) {
                                                    ((_ = a.engine.getGameAttribute("DNSM").h.GalleryTrophyBonTOT),
                                                        (n = a.engine.getGameAttribute("ItemDefinitionsGET")),
                                                        (s = "Trophy" + Math.round(c.asNumber(a.engine.getGameAttribute("Spelunk")[16][0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.GalleryDN1)]))),
                                                        (s = "" + h.string(n.h[s].h["UQ" + Math.round(t + 1) + "txt"])));
                                                    var o = a.engine.getGameAttribute("DNSM").h.GalleryTrophyBonTOT,
                                                        u = a.engine.getGameAttribute("ItemDefinitionsGET"),
                                                        g = "Trophy" + Math.round(c.asNumber(a.engine.getGameAttribute("Spelunk")[16][0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.GalleryDN1)]));
                                                    ((n = c.asNumber(o.h["" + h.string(u.h[g].h["UQ" + Math.round(t + 1) + "txt"])])), (o = c.asNumber(a.engine.getGameAttribute("DNSM").h.GalleryDN2)));
                                                    var d = a.engine.getGameAttribute("ItemDefinitionsGET");
                                                    ((u = "Trophy" + Math.round(c.asNumber(a.engine.getGameAttribute("Spelunk")[16][0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.GalleryDN1)]))),
                                                        (d = n + o * c.asNumber(d.h[u].h["UQ" + Math.round(t + 1) + "val"])),
                                                        (_.h[s] = d));
                                                }
                                            for (a.engine.getGameAttribute("DNSM").h.GalleryDT = "Weapon_Power,STR,AGI,WIS,LUK,Defence", e = 0, t = ("" + h.string(a.engine.getGameAttribute("DNSM").h.GalleryDT)).split(",").length; e < t;) {
                                                ((o = e++),
                                                    (_ = a.engine.getGameAttribute("DNSM").h.GalleryTrophyBonTOT),
                                                    (n = "" + ("" + h.string(a.engine.getGameAttribute("DNSM").h.GalleryDT)).split(",")[o]),
                                                    (s = a.engine.getGameAttribute("DNSM").h.GalleryTrophyBonTOT),
                                                    (d = "" + ("" + h.string(a.engine.getGameAttribute("DNSM").h.GalleryDT)).split(",")[o]),
                                                    (d = c.asNumber(s.h[d])),
                                                    (u = c.asNumber(a.engine.getGameAttribute("DNSM").h.GalleryDN2)));
                                                var b = a.engine.getGameAttribute("ItemDefinitionsGET");
                                                ((g = "Trophy" + Math.round(c.asNumber(a.engine.getGameAttribute("Spelunk")[16][0 | c.asNumber(a.engine.getGameAttribute("DNSM").h.GalleryDN1)]))),
                                                    (b = b.h[g]),
                                                    (o = "" + ("" + h.string(a.engine.getGameAttribute("DNSM").h.GalleryDT)).split(",")[o]),
                                                    (d += u * c.asNumber(b.h[o])),
                                                    (_.h[n] = d));
                                            }
                                        }
                                    }
                                }
                                return 1;
                            }
                            if ("InitializeNametagBonuses" == e) {
                                if ((-1 != t ? ((n = a.engine.getGameAttribute("DNSM")), (i = !Object.prototype.hasOwnProperty.call(n.h, "GalleryNametagBonTOT"))) : (i = !0), i))
                                    for (n = a.engine.getGameAttribute("DNSM"), s = new l(), n.h.GalleryNametagBonTOT = s, i = 0, r = a.engine.getGameAttribute("Spelunk")[17].length; i < r;)
                                        if (((_ = i++), 1 <= c.asNumber(a.engine.getGameAttribute("Spelunk")[17][_]))) {
                                            for (
                                                a.engine.getGameAttribute("DNSM").h.GalleryDN1 = _,
                                                    a.engine.getGameAttribute("DNSM").h.GalleryDT = "1,1.6,2,2.3,2.5",
                                                    n = a.engine.getGameAttribute("DNSM"),
                                                    s = c.asNumber(("" + h.string(a.engine.getGameAttribute("DNSM").h.GalleryDT)).split(",")[0 | Math.min(4, Math.round(c.asNumber(a.engine.getGameAttribute("Spelunk")[17][_]) - 1))]),
                                                    n.h.GalleryDN2 = s,
                                                    s = a.engine.getGameAttribute("DNSM"),
                                                    n = c.asNumber(a.engine.getGameAttribute("DNSM").h.GalleryDN2) * m._customBlock_Gallery("GalleryBonusMulti", 0, 0),
                                                    s.h.GalleryDN2 = n,
                                                    a.engine.getGameAttribute("DNSM").h.GalleryDT2 = 6 == _ ? "EquipmentNametag6b" : "EquipmentNametag" + _,
                                                    e = 0;
                                                2 > e;
                                            )
                                                ((t = e++),
                                                    (_ = a.engine.getGameAttribute("ItemDefinitionsGET")),
                                                    (n = "" + h.string(a.engine.getGameAttribute("DNSM").h.GalleryDT2)),
                                                    "0" != _.h[n].h["UQ" + Math.round(t + 1) + "txt"] &&
                                                        ((n = a.engine.getGameAttribute("DNSM").h.GalleryNametagBonTOT),
                                                        (o = a.engine.getGameAttribute("ItemDefinitionsGET")),
                                                        (s = "" + h.string(a.engine.getGameAttribute("DNSM").h.GalleryDT2)),
                                                        (s = "" + h.string(o.h[s].h["UQ" + Math.round(t + 1) + "txt"])),
                                                        (u = a.engine.getGameAttribute("DNSM").h.GalleryNametagBonTOT),
                                                        (d = a.engine.getGameAttribute("ItemDefinitionsGET")),
                                                        (g = "" + h.string(a.engine.getGameAttribute("DNSM").h.GalleryDT2)),
                                                        (o = c.asNumber(u.h["" + h.string(d.h[g].h["UQ" + Math.round(t + 1) + "txt"])])),
                                                        (d = c.asNumber(a.engine.getGameAttribute("DNSM").h.GalleryDN2)),
                                                        (_ = a.engine.getGameAttribute("ItemDefinitionsGET")),
                                                        (u = "" + h.string(a.engine.getGameAttribute("DNSM").h.GalleryDT2)),
                                                        (d = o + d * c.asNumber(_.h[u].h["UQ" + Math.round(t + 1) + "val"])),
                                                        (n.h[s] = d)));
                                            for (a.engine.getGameAttribute("DNSM").h.GalleryDT = "Weapon_Power,STR,AGI,WIS,LUK,Defence", e = 0, t = ("" + h.string(a.engine.getGameAttribute("DNSM").h.GalleryDT)).split(",").length; e < t;)
                                                ((o = e++),
                                                    (s = a.engine.getGameAttribute("DNSM").h.GalleryNametagBonTOT),
                                                    (n = "" + ("" + h.string(a.engine.getGameAttribute("DNSM").h.GalleryDT)).split(",")[o]),
                                                    (b = a.engine.getGameAttribute("DNSM").h.GalleryNametagBonTOT),
                                                    (d = "" + ("" + h.string(a.engine.getGameAttribute("DNSM").h.GalleryDT)).split(",")[o]),
                                                    (u = c.asNumber(b.h[d])),
                                                    (d = c.asNumber(a.engine.getGameAttribute("DNSM").h.GalleryDN2)),
                                                    (b = a.engine.getGameAttribute("ItemDefinitionsGET")),
                                                    (g = "" + h.string(a.engine.getGameAttribute("DNSM").h.GalleryDT2)),
                                                    (_ = b.h[g]),
                                                    (o = "" + ("" + h.string(a.engine.getGameAttribute("DNSM").h.GalleryDT)).split(",")[o]),
                                                    (_ = u + d * c.asNumber(_.h[o])),
                                                    (s.h[n] = _));
                                        }
                                return 1;
                            }
                            if ("PremHatBonusesSystemON" == e) return 0 >= c.asNumber(a.engine.getGameAttribute("KillsLeft2Advance")[50][0]) ? 1 : 0;
                            if ("HatrackBonusMulti" == e)
                                return (
                                    1 +
                                    (a.engine.getGameAttribute("Spelunk")[46].length +
                                        (m._customBlock_Companions(31) + 10 * m._customBlock_Summoning("EventShopOwned", 30, 0) + (m._customBlock_Minehead("BonusQTY", 21, 0) + m._customBlock_SushiStuff("RoG_BonusQTY", 36, 0)))) /
                                        100
                                );
                            if ("InitializePremHatBonuses" == e) {
                                if ((-1 != t ? ((n = a.engine.getGameAttribute("DNSM")), (i = !Object.prototype.hasOwnProperty.call(n.h, "PremHatBonTOT"))) : (i = !0), i))
                                    for (n = a.engine.getGameAttribute("DNSM"), s = new l(), n.h.PremHatBonTOT = s, i = 0, r = a.engine.getGameAttribute("Spelunk")[46].length; i < r;) {
                                        for (_ = i++, n = a.engine.getGameAttribute("DNSM"), s = a.engine.getGameAttribute("Spelunk")[46][_], n.h.GalleryDT2 = s, e = 0; 2 > e;)
                                            ((t = e++),
                                                (s = a.engine.getGameAttribute("ItemDefinitionsGET")),
                                                (n = "" + h.string(a.engine.getGameAttribute("DNSM").h.GalleryDT2)),
                                                "0" != s.h[n].h["UQ" + Math.round(t + 1) + "txt"] &&
                                                    ((_ = a.engine.getGameAttribute("DNSM").h.PremHatBonTOT),
                                                    (n = a.engine.getGameAttribute("ItemDefinitionsGET")),
                                                    (s = "" + h.string(a.engine.getGameAttribute("DNSM").h.GalleryDT2)),
                                                    (s = "" + h.string(n.h[s].h["UQ" + Math.round(t + 1) + "txt"])),
                                                    (o = a.engine.getGameAttribute("DNSM").h.PremHatBonTOT),
                                                    (u = a.engine.getGameAttribute("ItemDefinitionsGET")),
                                                    (g = "" + h.string(a.engine.getGameAttribute("DNSM").h.GalleryDT2)),
                                                    (n = c.asNumber(o.h["" + h.string(u.h[g].h["UQ" + Math.round(t + 1) + "txt"])])),
                                                    (o = m._customBlock_Gallery("HatrackBonusMulti", 0, 0)),
                                                    (d = a.engine.getGameAttribute("ItemDefinitionsGET")),
                                                    (u = "" + h.string(a.engine.getGameAttribute("DNSM").h.GalleryDT2)),
                                                    (d = n + o * c.asNumber(d.h[u].h["UQ" + Math.round(t + 1) + "val"])),
                                                    (_.h[s] = d)));
                                        for (a.engine.getGameAttribute("DNSM").h.GalleryDT = "Weapon_Power,STR,AGI,WIS,LUK,Defence", e = 0, t = ("" + h.string(a.engine.getGameAttribute("DNSM").h.GalleryDT)).split(",").length; e < t;)
                                            ((o = e++),
                                                (_ = a.engine.getGameAttribute("DNSM").h.PremHatBonTOT),
                                                (n = "" + ("" + h.string(a.engine.getGameAttribute("DNSM").h.GalleryDT)).split(",")[o]),
                                                (s = a.engine.getGameAttribute("DNSM").h.PremHatBonTOT),
                                                (d = "" + ("" + h.string(a.engine.getGameAttribute("DNSM").h.GalleryDT)).split(",")[o]),
                                                (d = c.asNumber(s.h[d])),
                                                (u = m._customBlock_Gallery("HatrackBonusMulti", 0, 0)),
                                                (b = a.engine.getGameAttribute("ItemDefinitionsGET")),
                                                (g = "" + h.string(a.engine.getGameAttribute("DNSM").h.GalleryDT2)),
                                                (b = b.h[g]),
                                                (o = "" + ("" + h.string(a.engine.getGameAttribute("DNSM").h.GalleryDT)).split(",")[o]),
                                                (d += u * c.asNumber(b.h[o])),
                                                (_.h[n] = d));
                                    }
                                return 1;
                            }
                            if ("PodiumX_inGallery" == e)
                                return 1 == Math.max(0, t - 1) % 2
                                    ? Math.round(49 * Math.floor(Math.max(0, t - 1) / 2) - 24.5 * Math.floor(Math.max(0, m._customBlock_Gallery("PodiumsOwned", 0, 0) - 3) / 2) + 242)
                                    : Math.round(49 * Math.floor((t + 1) / 2) - 24.5 * Math.floor(m._customBlock_Gallery("PodiumsOwned", 0, 0) / 2) + 242);
                            if ("PodiumY_inGallery" == e) return 1 == Math.max(0, t - 1) % 2 ? 81 : 133;
                            if ("PodiumX_inTown" == e)
                                return 1 == Math.max(0, t - 1) % 2
                                    ? Math.round(1855 + Math.round(33 - Math.floor(m._customBlock_Gallery("PodiumsOwned", 0, 0) / 8)) * Math.floor(Math.max(0, t - 1) / 2))
                                    : Math.round(1839 + Math.round(33 - Math.floor(m._customBlock_Gallery("PodiumsOwned", 0, 0) / 8)) * Math.floor((t + 1) / 2));
                            if ("PodiumY_inTown" == e) return 1 == Math.max(0, t - 1) % 2 ? 816 : 846;
                            if ("NametagX_inTown" == e || "NametagY_inTown" == e) {
                                for (i = a.engine.getGameAttribute("DNSM").h.GalleryNametagsOwned = 0, r = a.engine.getGameAttribute("Spelunk")[17].length; i < r;)
                                    ((_ = i++),
                                        1 <= c.asNumber(a.engine.getGameAttribute("Spelunk")[17][_]) &&
                                            ((n = a.engine.getGameAttribute("DNSM")), (s = Math.round(c.asNumber(a.engine.getGameAttribute("DNSM").h.GalleryNametagsOwned) + 1)), (n.h.GalleryNametagsOwned = s)));
                                for (
                                    a.engine.getGameAttribute("DNSM").h.GalleryDL = ["4", "9", "15", "20", "24"],
                                        a.engine.getGameAttribute("DNSM").h.GalleryDN2 = 46,
                                        24 < c.asNumber(a.engine.getGameAttribute("DNSM").h.GalleryNametagsOwned) &&
                                            ((a.engine.getGameAttribute("DNSM").h.GalleryDL = "5 11 18 26 33 39 45".split(" ")),
                                            (a.engine.getGameAttribute("DNSM").h.GalleryDN2 = 44),
                                            45 < c.asNumber(a.engine.getGameAttribute("DNSM").h.GalleryNametagsOwned) &&
                                                ((a.engine.getGameAttribute("DNSM").h.GalleryDL = "6 13 21 30 40 49 57 64 70".split(" ")), (a.engine.getGameAttribute("DNSM").h.GalleryDN2 = 42))),
                                        i = a.engine.getGameAttribute("DNSM").h.GalleryDN1 = 0,
                                        r = a.engine.getGameAttribute("DNSM").h.GalleryDL.length;
                                    i < r;
                                )
                                    if (((_ = i++), t < c.asNumber(a.engine.getGameAttribute("DNSM").h.GalleryDL[_]))) {
                                        a.engine.getGameAttribute("DNSM").h.GalleryDN1 = _;
                                        break;
                                    }
                                return "NametagX_inTown" == e
                                    ? (a.engine.getGameAttribute("DNSM").h.GalleryDL.splice(0, 0, 0),
                                      Math.round(
                                          1940 +
                                              16 * Math.floor(Math.max(0, m._customBlock_Gallery("PodiumsOwned", 0, 0) - 10) / 2) +
                                              (c.asNumber(a.engine.getGameAttribute("DNSM").h.GalleryDN2) *
                                                  (t - c.asNumber(a.engine.getGameAttribute("DNSM").h.GalleryDL[Math.round(c.asNumber(a.engine.getGameAttribute("DNSM").h.GalleryDN1))])) -
                                                  (c.asNumber(a.engine.getGameAttribute("DNSM").h.GalleryDN2) / 2) *
                                                      Math.min(
                                                          c.asNumber(a.engine.getGameAttribute("DNSM").h.GalleryNametagsOwned) -
                                                              c.asNumber(a.engine.getGameAttribute("DNSM").h.GalleryDL[Math.round(c.asNumber(a.engine.getGameAttribute("DNSM").h.GalleryDN1))]),
                                                          c.asNumber(a.engine.getGameAttribute("DNSM").h.GalleryDL[Math.round(c.asNumber(a.engine.getGameAttribute("DNSM").h.GalleryDN1) + 1)]) -
                                                              c.asNumber(a.engine.getGameAttribute("DNSM").h.GalleryDL[Math.round(c.asNumber(a.engine.getGameAttribute("DNSM").h.GalleryDN1))])
                                                      ))
                                      ))
                                    : Math.round(740 + -43 * c.asNumber(a.engine.getGameAttribute("DNSM").h.GalleryDN1));
                            }
                            return 69;
                        }
