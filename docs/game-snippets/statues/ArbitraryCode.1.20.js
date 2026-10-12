/**
 * Game formula snippet — idleon-efficiency formula research.
 * Function: _customBlock_ArbitraryCode (from ActorEvents_12)
 * Game version: 1.20 ("Royal_Guardian")
 * Captured: 2026-09-03 via game-debug-tool (findFunction + toString)
 * Case reference: #349
 */
function (e) {
                            if ("LevelReqPortals" == e) {
                                if (1 == c.getValueForScene(a.engine.getGameAttribute("SceneEvents_n"), "_DefaultExpType")) {
                                    e = 0;
                                    for (var t = a.engine.getGameAttribute("KillsLeft2Advance")[0 | a.engine.getGameAttribute("CurrentMap")].length; e < t;) {
                                        var i = e++;
                                        c.asNumber(a.engine.getGameAttribute("Lv0")[1]) >= c.asNumber(a.engine.getGameAttribute("KillsLeft2Advance")[0 | a.engine.getGameAttribute("CurrentMap")][i]) &&
                                            (a.engine.getGameAttribute("KillsLeft2Advance")[0 | a.engine.getGameAttribute("CurrentMap")][i] = 0);
                                    }
                                } else if (4 == c.getValueForScene(a.engine.getGameAttribute("SceneEvents_n"), "_DefaultExpType"))
                                    for (e = 0, t = a.engine.getGameAttribute("KillsLeft2Advance")[0 | a.engine.getGameAttribute("CurrentMap")].length; e < t;)
                                        ((i = e++),
                                            c.asNumber(a.engine.getGameAttribute("Lv0")[4]) >= c.asNumber(a.engine.getGameAttribute("KillsLeft2Advance")[0 | a.engine.getGameAttribute("CurrentMap")][i]) &&
                                                (a.engine.getGameAttribute("KillsLeft2Advance")[0 | a.engine.getGameAttribute("CurrentMap")][i] = 0));
                                return 1;
                            }
                            if ("MakeNewPlayerMap" == e) {
                                var s = a.engine,
                                    r = new l();
                                return ((s.gameAttributes.h.OtherPlayers = r), 1);
                            }
                            if ("AddNewPlayer" == e) {
                                if (((s = a.engine), (r = "" + h.string(a.engine.getGameAttribute("DummyList")[1])), (s.gameAttributes.h.DummyText = r), a.engine.getGameAttribute("DummyText") != a.engine.getGameAttribute("UserInfo")[0])) {
                                    s = a.engine.getGameAttribute("OtherPlayers");
                                    var _ = "" + h.string(a.engine.getGameAttribute("DummyList")[1]);
                                    Object.prototype.hasOwnProperty.call(s.h, _) ||
                                        ((s = a.engine),
                                        (r = c.asNumber(a.engine.getGameAttribute("DummyList")[2].h.moveData.h.destinationNode)),
                                        (s.gameAttributes.h.dummyMonsterNODE = r),
                                        (0 <= a.engine.getGameAttribute("dummyMonsterNODE") && a.engine.getGameAttribute("dummyMonsterNODE") <= Math.round(a.engine.getGameAttribute("NodeNeighbors").length - 1)) ||
                                            (a.engine.gameAttributes.h.dummyMonsterNODE = 0),
                                        (s = a.engine.getGameAttribute("PlayerMoveMaps")[2]),
                                        (_ = a.engine.getGameAttribute("DummyText")),
                                        (r = a.engine.getGameAttribute("dummyMonsterNODE")),
                                        (s.h[_] = r),
                                        (s = a.engine.getGameAttribute("PlayerMoveMaps")[0]),
                                        (_ = a.engine.getGameAttribute("DummyText")),
                                        (s.h[_] = 1),
                                        (s = a.engine.getGameAttribute("PlayerMoveMaps")[1]),
                                        (_ = a.engine.getGameAttribute("DummyText")),
                                        (s.h[_] = 0),
                                        c.createRecycledActor(
                                            c.getActorType(20),
                                            Math.max(
                                                c.asNumber(a.engine.getGameAttribute("NodeX")[0 | a.engine.getGameAttribute("dummyMonsterNODE")]),
                                                Math.min(
                                                    -47 + c.asNumber(a.engine.getGameAttribute("DummyList")[2].h.moveData.h.destinationX),
                                                    c.asNumber(a.engine.getGameAttribute("NodeLength")[0 | a.engine.getGameAttribute("dummyMonsterNODE")])
                                                )
                                            ),
                                            c.asNumber(a.engine.getGameAttribute("NodeY")[0 | a.engine.getGameAttribute("dummyMonsterNODE")]) - 49,
                                            1
                                        ),
                                        (t = c.asNumber(a.engine.getGameAttribute("NodeX")[0 | a.engine.getGameAttribute("dummyMonsterNODE")])),
                                        (s = Math.min(c.asNumber(a.engine.getGameAttribute("DummyList")[2].h.moveData.h.destinationX), c.asNumber(a.engine.getGameAttribute("NodeLength")[0 | a.engine.getGameAttribute("dummyMonsterNODE")]))),
                                        (n.__cast(c.getLastCreatedActor().behaviors.getBehavior("ActorEvents_20"), y)._MouseClickX = Math.max(t, s)),
                                        (s = a.engine.getGameAttribute("OtherPlayers")),
                                        (_ = a.engine.getGameAttribute("DummyText")),
                                        (r = c.getLastCreatedActor()),
                                        (s.h[_] = r),
                                        c.createRecycledActor(
                                            c.getActorType(31),
                                            Math.max(
                                                c.asNumber(a.engine.getGameAttribute("NodeX")[0 | a.engine.getGameAttribute("dummyMonsterNODE")]),
                                                Math.min(
                                                    -47 + c.asNumber(a.engine.getGameAttribute("DummyList")[2].h.moveData.h.destinationX),
                                                    c.asNumber(a.engine.getGameAttribute("NodeLength")[0 | a.engine.getGameAttribute("dummyMonsterNODE")])
                                                )
                                            ),
                                            c.asNumber(a.engine.getGameAttribute("NodeY")[0 | a.engine.getGameAttribute("dummyMonsterNODE")]) - 49,
                                            1
                                        ),
                                        c.createRecycledActor(
                                            c.getActorType(24),
                                            Math.max(
                                                c.asNumber(a.engine.getGameAttribute("NodeX")[0 | a.engine.getGameAttribute("dummyMonsterNODE")]),
                                                Math.min(
                                                    -47 + c.asNumber(a.engine.getGameAttribute("DummyList")[2].h.moveData.h.destinationX),
                                                    c.asNumber(a.engine.getGameAttribute("NodeLength")[0 | a.engine.getGameAttribute("dummyMonsterNODE")])
                                                )
                                            ),
                                            c.asNumber(a.engine.getGameAttribute("NodeY")[0 | a.engine.getGameAttribute("dummyMonsterNODE")]) - 49,
                                            1
                                        ));
                                }
                                return 1;
                            }
                            if ("PlayerMoveMapsYOU" == e)
                                return (
                                    (s = a.engine.getGameAttribute("PlayerMoveMaps")[0]),
                                    (_ = "" + h.string(a.engine.getGameAttribute("UserInfo")[0])),
                                    (s.h[_] = 1),
                                    (s = a.engine.getGameAttribute("PlayerMoveMaps")[1]),
                                    (_ = "" + h.string(a.engine.getGameAttribute("UserInfo")[0])),
                                    (s.h[_] = 0),
                                    1
                                );
                            if ("ChangeExistingPlayer" == e) {
                                if (
                                    a.engine.getGameAttribute("DummyList")[1] != a.engine.getGameAttribute("UserInfo")[0] &&
                                    ((s = a.engine.getGameAttribute("OtherPlayers")),
                                    (_ = "" + h.string(a.engine.getGameAttribute("DummyList")[1])),
                                    Object.prototype.hasOwnProperty.call(s.h, _) &&
                                        ((s = a.engine),
                                        (r = c.asNumber(a.engine.getGameAttribute("DummyList")[2].h.moveData.h.destinationNode)),
                                        (s.gameAttributes.h.dummyMonsterNODE = r),
                                        (0 <= a.engine.getGameAttribute("dummyMonsterNODE") && a.engine.getGameAttribute("dummyMonsterNODE") <= Math.round(a.engine.getGameAttribute("NodeNeighbors").length - 1)) ||
                                            (a.engine.gameAttributes.h.dummyMonsterNODE = 0),
                                        (s = a.engine.getGameAttribute("DummyList")[2]),
                                        Object.prototype.hasOwnProperty.call(s.h, "moveData") ? ((s = a.engine.getGameAttribute("DummyList")[2].h.moveData), (t = Object.prototype.hasOwnProperty.call(s.h, "destinationNode"))) : (t = !1),
                                        t && ((s = a.engine.getGameAttribute("PlayerMoveMaps")[2]), (_ = "" + h.string(a.engine.getGameAttribute("DummyList")[1])), (r = a.engine.getGameAttribute("dummyMonsterNODE")), (s.h[_] = r)),
                                        (s = a.engine.getGameAttribute("DummyList")[2]),
                                        Object.prototype.hasOwnProperty.call(s.h, "moveData") ? ((s = a.engine.getGameAttribute("DummyList")[2].h.moveData), (t = Object.prototype.hasOwnProperty.call(s.h, "destinationX"))) : (t = !1),
                                        t &&
                                            ((s = a.engine.getGameAttribute("OtherPlayers")),
                                            (_ = "" + h.string(a.engine.getGameAttribute("DummyList")[1])),
                                            (t = s.h[_]),
                                            (s = c.asNumber(a.engine.getGameAttribute("NodeX")[0 | a.engine.getGameAttribute("dummyMonsterNODE")])),
                                            (_ = Math.min(
                                                c.asNumber(a.engine.getGameAttribute("DummyList")[2].h.moveData.h.destinationX),
                                                c.asNumber(a.engine.getGameAttribute("NodeLength")[0 | a.engine.getGameAttribute("dummyMonsterNODE")])
                                            )),
                                            (n.__cast(t.behaviors.getBehavior("ActorEvents_20"), y)._MouseClickX = Math.max(s, _))),
                                        (s = a.engine.getGameAttribute("DummyList")[2]),
                                        Object.prototype.hasOwnProperty.call(s.h, "displayData")))
                                ) {
                                    if (
                                        ((s = a.engine.getGameAttribute("DummyList")[2].h.displayData),
                                        Object.prototype.hasOwnProperty.call(s.h, "PlayerEquipmentOrder") && a.engine.getGameAttribute("DummyList")[1] != a.engine.getGameAttribute("UserInfo")[0])
                                    ) {
                                        for (
                                            a.engine.getGameAttribute("DummyList")[2].h.displayData.h.PlayerEquipmentOrder[2] = [],
                                                a.engine.getGameAttribute("DummyList")[2].h.displayData.h.PlayerEquipmentOrder[2].push("Blank"),
                                                a.engine.getGameAttribute("DummyList")[2].h.displayData.h.PlayerEquipmentOrder[2].push("Blank"),
                                                a.engine.getGameAttribute("DummyList")[2].h.displayData.h.PlayerEquipmentOrder[2].push("Blank"),
                                                a.engine.getGameAttribute("DummyList")[2].h.displayData.h.PlayerEquipmentOrder[2].push("Blank"),
                                                a.engine.getGameAttribute("DummyList")[2].h.displayData.h.PlayerEquipmentOrder[2].push("Blank"),
                                                a.engine.getGameAttribute("DummyList")[2].h.displayData.h.PlayerEquipmentOrder[2].push("Blank"),
                                                a.engine.getGameAttribute("DummyList")[2].h.displayData.h.PlayerEquipmentOrder[2].push("Blank"),
                                                a.engine.getGameAttribute("DummyList")[2].h.displayData.h.PlayerEquipmentOrder[2].push("Blank"),
                                                e = 0,
                                                t = a.engine.getGameAttribute("DummyList")[2].h.displayData.h.PlayerEquipmentOrder.length;
                                            e < t;
                                        )
                                            for (
                                                i = e++,
                                                    a.engine.gameAttributes.h.DummyNumber = i,
                                                    r = 0,
                                                    i = a.engine.getGameAttribute("DummyList")[2].h.displayData.h.PlayerEquipmentOrder[0 | a.engine.getGameAttribute("DummyNumber")].length;
                                                r < i;
                                            ) {
                                                var o = r++;
                                                ((s = a.engine.getGameAttribute("ItemDefinitionsGET")),
                                                    (_ = "" + h.string(a.engine.getGameAttribute("DummyList")[2].h.displayData.h.PlayerEquipmentOrder[0 | a.engine.getGameAttribute("DummyNumber")][o])),
                                                    Object.prototype.hasOwnProperty.call(s.h, _)
                                                        ? "Lava_Flame2" != a.engine.getGameAttribute("DummyList")[1] &&
                                                          D.contains(
                                                              a.engine.getGameAttribute("CustomLists").h.RANDOlist[64],
                                                              a.engine.getGameAttribute("DummyList")[2].h.displayData.h.PlayerEquipmentOrder[0 | a.engine.getGameAttribute("DummyNumber")][o]
                                                          ) &&
                                                          (a.engine.getGameAttribute("DummyList")[2].h.displayData.h.PlayerEquipmentOrder[0 | a.engine.getGameAttribute("DummyNumber")][o] = "Blank")
                                                        : (a.engine.getGameAttribute("DummyList")[2].h.displayData.h.PlayerEquipmentOrder[0 | a.engine.getGameAttribute("DummyNumber")][o] = "Blank"));
                                            }
                                        ((s = a.engine.getGameAttribute("OtherPlayers")),
                                            (_ = "" + h.string(a.engine.getGameAttribute("DummyList")[1])),
                                            (t = s.h[_]),
                                            (s = a.engine.getGameAttribute("DummyList")[2].h.displayData.h.PlayerEquipmentOrder),
                                            (n.__cast(t.behaviors.getBehavior("ActorEvents_20"), y)._PlayerEquipmentOrder = s));
                                    }
                                    ((s = a.engine.getGameAttribute("DummyList")[2].h.displayData),
                                        Object.prototype.hasOwnProperty.call(s.h, "P0") &&
                                            a.engine.getGameAttribute("DummyList")[1] != a.engine.getGameAttribute("UserInfo")[0] &&
                                            ((s = a.engine.getGameAttribute("OtherPlayers")),
                                            (_ = "" + h.string(a.engine.getGameAttribute("DummyList")[1])),
                                            (n.__cast(s.h[_].behaviors.getBehavior("ActorEvents_20"), y)._Pinfo[0] = a.engine.getGameAttribute("DummyList")[2].h.displayData.h.P0)),
                                        (s = a.engine.getGameAttribute("DummyList")[2].h.displayData),
                                        Object.prototype.hasOwnProperty.call(s.h, "GN") ? ((s = a.engine.getGameAttribute("DummyList")[2].h.displayData), (t = Object.prototype.hasOwnProperty.call(s.h, "Gi"))) : (t = !1),
                                        t &&
                                            (null != a.engine.getGameAttribute("DummyList")[2].h.displayData.h.GN
                                                ? ((s = a.engine.getGameAttribute("OtherPlayers")),
                                                  (_ = "" + h.string(a.engine.getGameAttribute("DummyList")[1])),
                                                  (n.__cast(s.h[_].behaviors.getBehavior("ActorEvents_20"), y)._Pinfo[2] = a.engine.getGameAttribute("DummyList")[2].h.displayData.h.GN),
                                                  (s = a.engine.getGameAttribute("OtherPlayers")),
                                                  (_ = "" + h.string(a.engine.getGameAttribute("DummyList")[1])),
                                                  (n.__cast(s.h[_].behaviors.getBehavior("ActorEvents_20"), y)._Pinfo[3] = a.engine.getGameAttribute("DummyList")[2].h.displayData.h.Gi))
                                                : ((s = a.engine.getGameAttribute("OtherPlayers")),
                                                  (_ = "" + h.string(a.engine.getGameAttribute("DummyList")[1])),
                                                  (n.__cast(s.h[_].behaviors.getBehavior("ActorEvents_20"), y)._Pinfo[2] = ""),
                                                  (s = a.engine.getGameAttribute("OtherPlayers")),
                                                  (_ = "" + h.string(a.engine.getGameAttribute("DummyList")[1])),
                                                  (n.__cast(s.h[_].behaviors.getBehavior("ActorEvents_20"), y)._Pinfo[3] = 0))),
                                        (s = a.engine.getGameAttribute("DummyList")[2].h.displayData),
                                        Object.prototype.hasOwnProperty.call(s.h, "SAWLFstats") &&
                                            (0 < c.asNumber(a.engine.getGameAttribute("DummyList")[2].h.displayData.h.SAWLFstats[5])
                                                ? ((s = a.engine.getGameAttribute("OtherPlayers")),
                                                  (_ = "" + h.string(a.engine.getGameAttribute("DummyList")[1])),
                                                  (n.__cast(s.h[_].behaviors.getBehavior("ActorEvents_20"), y)._Pinfo[1][5] = Math.round(
                                                      Math.max(1, Math.min(50, c.asNumber(a.engine.getGameAttribute("DummyList")[2].h.displayData.h.SAWLFstats[5])))
                                                  )))
                                                : ((s = a.engine.getGameAttribute("OtherPlayers")),
                                                  (_ = "" + h.string(a.engine.getGameAttribute("DummyList")[1])),
                                                  (n.__cast(s.h[_].behaviors.getBehavior("ActorEvents_20"), y)._Pinfo[1][5] = 1))));
                                }
                                return 1;
                            }
                            if ("RemoveExistingPlayer" == e) {
                                if (
                                    a.engine.getGameAttribute("DummyList")[1] != a.engine.getGameAttribute("UserInfo")[0] &&
                                    ((s = a.engine.getGameAttribute("OtherPlayers")), (_ = "" + h.string(a.engine.getGameAttribute("DummyList")[1])), Object.prototype.hasOwnProperty.call(s.h, _))
                                )
                                    for (
                                        s = a.engine.getGameAttribute("OtherPlayers"),
                                            _ = "" + h.string(a.engine.getGameAttribute("DummyList")[1]),
                                            null != n.__cast(s.h[_].behaviors.getBehavior("ActorEvents_20"), y)._HelmetActor &&
                                                ((s = a.engine.getGameAttribute("OtherPlayers")),
                                                (_ = "" + h.string(a.engine.getGameAttribute("DummyList")[1])),
                                                c.recycleActor(n.__cast(s.h[_].behaviors.getBehavior("ActorEvents_20"), y)._HelmetActor)),
                                            s = a.engine.getGameAttribute("OtherPlayers"),
                                            _ = "" + h.string(a.engine.getGameAttribute("DummyList")[1]),
                                            null != n.__cast(s.h[_].behaviors.getBehavior("ActorEvents_20"), y)._WeaponActor &&
                                                ((s = a.engine.getGameAttribute("OtherPlayers")),
                                                (_ = "" + h.string(a.engine.getGameAttribute("DummyList")[1])),
                                                c.recycleActor(n.__cast(s.h[_].behaviors.getBehavior("ActorEvents_20"), y)._WeaponActor)),
                                            s = a.engine.getGameAttribute("OtherPlayers"),
                                            _ = "" + h.string(a.engine.getGameAttribute("DummyList")[1]),
                                            null != n.__cast(s.h[_].behaviors.getBehavior("ActorEvents_20"), y)._CapeActor &&
                                                ((s = a.engine.getGameAttribute("OtherPlayers")),
                                                (_ = "" + h.string(a.engine.getGameAttribute("DummyList")[1])),
                                                c.recycleActor(n.__cast(s.h[_].behaviors.getBehavior("ActorEvents_20"), y)._CapeActor)),
                                            s = a.engine.getGameAttribute("OtherPlayers"),
                                            _ = "" + h.string(a.engine.getGameAttribute("DummyList")[1]),
                                            null != n.__cast(s.h[_].behaviors.getBehavior("ActorEvents_20"), y)._ShirtActor &&
                                                ((s = a.engine.getGameAttribute("OtherPlayers")),
                                                (_ = "" + h.string(a.engine.getGameAttribute("DummyList")[1])),
                                                c.recycleActor(n.__cast(s.h[_].behaviors.getBehavior("ActorEvents_20"), y)._ShirtActor)),
                                            s = a.engine.getGameAttribute("OtherPlayers"),
                                            _ = "" + h.string(a.engine.getGameAttribute("DummyList")[1]),
                                            null != n.__cast(s.h[_].behaviors.getBehavior("ActorEvents_20"), y)._PetActor &&
                                                ((s = a.engine.getGameAttribute("OtherPlayers")),
                                                (_ = "" + h.string(a.engine.getGameAttribute("DummyList")[1])),
                                                c.recycleActor(n.__cast(s.h[_].behaviors.getBehavior("ActorEvents_20"), y)._PetActor)),
                                            s = a.engine.getGameAttribute("OtherPlayers"),
                                            _ = "" + h.string(a.engine.getGameAttribute("DummyList")[1]),
                                            c.recycleActor(s.h[_]),
                                            s = a.engine.getGameAttribute("OtherPlayers"),
                                            _ = "" + h.string(a.engine.getGameAttribute("DummyList")[1]),
                                            Object.prototype.hasOwnProperty.call(s.h, _) && delete s.h[_],
                                            e = 0,
                                            t = a.engine.getGameAttribute("PlayerMoveMaps").length;
                                        e < t;
                                    )
                                        ((i = e++),
                                            (s = a.engine.getGameAttribute("PlayerMoveMaps")[i]),
                                            (_ = "" + h.string(a.engine.getGameAttribute("DummyList")[1])),
                                            Object.prototype.hasOwnProperty.call(s.h, _) &&
                                                ((r = a.engine.getGameAttribute("PlayerMoveMaps")[i]), (_ = "" + h.string(a.engine.getGameAttribute("DummyList")[1])), (s = r), Object.prototype.hasOwnProperty.call(s.h, _) && delete s.h[_]));
                                return 1;
                            }
                            if ("AddChatMessage" == e) {
                                if ("Lava_Flame2" == a.engine.getGameAttribute("DummyList")[1] && 1 == u.getServerVarLoad("LavaHacks")) {
                                    if (((a.engine.getGameAttribute("NONdummies")[8] = 12), a.engine.getGameAttribute("UserInfo"), 10 > c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[102])))
                                        if ("a" == a.engine.getGameAttribute("DummyList")[2])
                                            ((s = a.engine.getGameAttribute("OtherPlayers")),
                                                (_ = "" + h.string(a.engine.getGameAttribute("UserInfo")[0])),
                                                (t = n.__cast(s.h[_].behaviors.getBehavior("ActorEvents_20"), y)._PlayerNode),
                                                (s = a.engine.getGameAttribute("OtherPlayers")),
                                                (_ = "" + h.string(a.engine.getGameAttribute("UserInfo")[0])),
                                                k._customBlock_CreateMonster("babaMummy", t, s.h[_].getXCenter() - 16),
                                                (a.engine.getGameAttribute("OptionsListAccount")[102] = c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[102]) + 1));
                                        else if ("b" == a.engine.getGameAttribute("DummyList")[2])
                                            ((s = a.engine.getGameAttribute("OtherPlayers")),
                                                (_ = "" + h.string(a.engine.getGameAttribute("UserInfo")[0])),
                                                (t = n.__cast(s.h[_].behaviors.getBehavior("ActorEvents_20"), y)._PlayerNode),
                                                (s = a.engine.getGameAttribute("OtherPlayers")),
                                                (_ = "" + h.string(a.engine.getGameAttribute("UserInfo")[0])),
                                                k._customBlock_CreateMonster("babayaga", t, s.h[_].getXCenter() - 16));
                                        else if ("c" == a.engine.getGameAttribute("DummyList")[2])
                                            ((s = a.engine.getGameAttribute("OtherPlayers")),
                                                (_ = "" + h.string(a.engine.getGameAttribute("UserInfo")[0])),
                                                (t = n.__cast(s.h[_].behaviors.getBehavior("ActorEvents_20"), y)._PlayerNode),
                                                (s = a.engine.getGameAttribute("OtherPlayers")),
                                                (_ = "" + h.string(a.engine.getGameAttribute("UserInfo")[0])),
                                                k._customBlock_CreateMonster("babaHour", t, s.h[_].getXCenter() - 16),
                                                (a.engine.getGameAttribute("OptionsListAccount")[102] = c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[102]) + 1));
                                        else if ("d" == a.engine.getGameAttribute("DummyList")[2]) {
                                            for (e = 0; 3 > e;)
                                                (e++,
                                                    (s = a.engine.getGameAttribute("OtherPlayers")),
                                                    (_ = "" + h.string(a.engine.getGameAttribute("UserInfo")[0])),
                                                    (t = n.__cast(s.h[_].behaviors.getBehavior("ActorEvents_20"), y)._PlayerNode),
                                                    (r = a.engine.getGameAttribute("OtherPlayers")),
                                                    (_ = "" + h.string(a.engine.getGameAttribute("UserInfo")[0])),
                                                    k._customBlock_CreateMonster("Crystal0", t, r.h[_].getXCenter() - 16),
                                                    (i = a.engine.getGameAttribute("OtherPlayers")),
                                                    (t = "" + h.string(a.engine.getGameAttribute("UserInfo")[0])),
                                                    (s = n.__cast(i.h[t].behaviors.getBehavior("ActorEvents_20"), y)._PlayerNode),
                                                    (t = a.engine.getGameAttribute("OtherPlayers")),
                                                    (_ = "" + h.string(a.engine.getGameAttribute("UserInfo")[0])),
                                                    k._customBlock_CreateMonster("Crystal1", s, t.h[_].getXCenter() - 16),
                                                    (t = a.engine.getGameAttribute("OtherPlayers")),
                                                    (s = "" + h.string(a.engine.getGameAttribute("UserInfo")[0])),
                                                    (_ = n.__cast(t.h[s].behaviors.getBehavior("ActorEvents_20"), y)._PlayerNode),
                                                    (t = a.engine.getGameAttribute("OtherPlayers")),
                                                    (s = "" + h.string(a.engine.getGameAttribute("UserInfo")[0])),
                                                    k._customBlock_CreateMonster("Crystal2", _, t.h[s].getXCenter() - 16));
                                            a.engine.getGameAttribute("OptionsListAccount")[102] = c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[102]) + 1;
                                        } else if ("e" == a.engine.getGameAttribute("DummyList")[2])
                                            ((s = a.engine.getGameAttribute("OtherPlayers")),
                                                (_ = "" + h.string(a.engine.getGameAttribute("UserInfo")[0])),
                                                (t = n.__cast(s.h[_].behaviors.getBehavior("ActorEvents_20"), y)._PlayerNode),
                                                (s = a.engine.getGameAttribute("OtherPlayers")),
                                                (_ = "" + h.string(a.engine.getGameAttribute("UserInfo")[0])),
                                                k._customBlock_CreateMonster("poopBig", t, s.h[_].getXCenter() - 16));
                                        else if ("f" == a.engine.getGameAttribute("DummyList")[2])
                                            for (e = 0; 10 > e;)
                                                (e++,
                                                    (t = "" + h.string(a.engine.getGameAttribute("CustomLists").h.RANDOlist[5][c.randomInt(0, a.engine.getGameAttribute("CustomLists").h.RANDOlist[5].length - 2)])),
                                                    (s = a.engine.getGameAttribute("OtherPlayers")),
                                                    (_ = "" + h.string(a.engine.getGameAttribute("UserInfo")[0])),
                                                    (s = n.__cast(s.h[_].behaviors.getBehavior("ActorEvents_20"), y)._PlayerNode),
                                                    (r = a.engine.getGameAttribute("OtherPlayers")),
                                                    (_ = "" + h.string(a.engine.getGameAttribute("UserInfo")[0])),
                                                    k._customBlock_CreateMonster(t, s, r.h[_].getXCenter() - 16));
                                        else if ("g" == a.engine.getGameAttribute("DummyList")[2]) {
                                            for (e = 0; 25 > e;)
                                                (e++,
                                                    (t = c.randomInt(0, 960)),
                                                    (s = a.engine.getGameAttribute("OtherPlayers")),
                                                    (_ = "" + h.string(a.engine.getGameAttribute("UserInfo")[0])),
                                                    q._customBlock_DropSomething("PremiumGem", 1, 0, 0, 0, 0, 0, t, c.randomInt(0, 0 | n.__cast(s.h[_].behaviors.getBehavior("ActorEvents_20"), y)._PlayerNode)));
                                            a.engine.getGameAttribute("OptionsListAccount")[102] = c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[102]) + 1;
                                        } else if ("h" == a.engine.getGameAttribute("DummyList")[2]) {
                                            for (e = 0; 50 > e;)
                                                (e++,
                                                    (t = c.randomInt(0, 960)),
                                                    (s = a.engine.getGameAttribute("OtherPlayers")),
                                                    (_ = "" + h.string(a.engine.getGameAttribute("UserInfo")[0])),
                                                    q._customBlock_DropSomething("PremiumGem", 2, 0, 0, 0, 0, 0, t, c.randomInt(0, 0 | n.__cast(s.h[_].behaviors.getBehavior("ActorEvents_20"), y)._PlayerNode)));
                                            a.engine.getGameAttribute("OptionsListAccount")[102] = c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[102]) + 1;
                                        } else
                                            "i" == a.engine.getGameAttribute("DummyList")[2]
                                                ? ((s = a.engine.getGameAttribute("OtherPlayers")),
                                                  (_ = "" + h.string(a.engine.getGameAttribute("UserInfo")[0])),
                                                  (t = n.__cast(s.h[_].behaviors.getBehavior("ActorEvents_20"), y)._PlayerNode),
                                                  (s = a.engine.getGameAttribute("OtherPlayers")),
                                                  (_ = "" + h.string(a.engine.getGameAttribute("UserInfo")[0])),
                                                  k._customBlock_CreateMonster("mini3a", t, s.h[_].getXCenter() - 16),
                                                  (a.engine.getGameAttribute("OptionsListAccount")[102] = c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[102]) + 1))
                                                : "j" == a.engine.getGameAttribute("DummyList")[2]
                                                  ? ((s = a.engine.getGameAttribute("OtherPlayers")),
                                                    (_ = "" + h.string(a.engine.getGameAttribute("UserInfo")[0])),
                                                    (t = n.__cast(s.h[_].behaviors.getBehavior("ActorEvents_20"), y)._PlayerNode),
                                                    (s = a.engine.getGameAttribute("OtherPlayers")),
                                                    (_ = "" + h.string(a.engine.getGameAttribute("UserInfo")[0])),
                                                    k._customBlock_CreateMonster("mini4a", t, s.h[_].getXCenter() - 16),
                                                    (a.engine.getGameAttribute("OptionsListAccount")[102] = c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[102]) + 1))
                                                  : "k" == a.engine.getGameAttribute("DummyList")[2]
                                                    ? ((a.engine.getGameAttribute("OptionsListAccount")[102] = c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[102]) + 1),
                                                      0.17 > c.randomFloat()
                                                          ? ((s = a.engine.getGameAttribute("OtherPlayers")),
                                                            (_ = "" + h.string(a.engine.getGameAttribute("UserInfo")[0])),
                                                            (t = n.__cast(s.h[_].behaviors.getBehavior("ActorEvents_20"), y)._PlayerNode),
                                                            (s = a.engine.getGameAttribute("OtherPlayers")),
                                                            (_ = "" + h.string(a.engine.getGameAttribute("UserInfo")[0])),
                                                            k._customBlock_CreateMonster("babaHour", t, s.h[_].getXCenter() - 16))
                                                          : 0.1 > c.randomFloat()
                                                            ? ((s = a.engine.getGameAttribute("OtherPlayers")),
                                                              (_ = "" + h.string(a.engine.getGameAttribute("UserInfo")[0])),
                                                              (t = n.__cast(s.h[_].behaviors.getBehavior("ActorEvents_20"), y)._PlayerNode),
                                                              (s = a.engine.getGameAttribute("OtherPlayers")),
                                                              (_ = "" + h.string(a.engine.getGameAttribute("UserInfo")[0])),
                                                              k._customBlock_CreateMonster("babaMummy", t, s.h[_].getXCenter() - 16))
                                                            : 0.11 > c.randomFloat()
                                                              ? ((s = a.engine.getGameAttribute("OtherPlayers")),
                                                                (_ = "" + h.string(a.engine.getGameAttribute("UserInfo")[0])),
                                                                (t = n.__cast(s.h[_].behaviors.getBehavior("ActorEvents_20"), y)._PlayerNode),
                                                                (s = a.engine.getGameAttribute("OtherPlayers")),
                                                                (_ = "" + h.string(a.engine.getGameAttribute("UserInfo")[0])),
                                                                k._customBlock_CreateMonster("mini4a", t, s.h[_].getXCenter() - 16))
                                                              : 0.23 > c.randomFloat()
                                                                ? ((s = a.engine.getGameAttribute("OtherPlayers")),
                                                                  (_ = "" + h.string(a.engine.getGameAttribute("UserInfo")[0])),
                                                                  (t = n.__cast(s.h[_].behaviors.getBehavior("ActorEvents_20"), y)._PlayerNode),
                                                                  (s = a.engine.getGameAttribute("OtherPlayers")),
                                                                  (_ = "" + h.string(a.engine.getGameAttribute("UserInfo")[0])),
                                                                  k._customBlock_CreateMonster("poopBig", t, s.h[_].getXCenter() - 16))
                                                                : 0.2 > c.randomFloat()
                                                                  ? ((s = a.engine.getGameAttribute("OtherPlayers")),
                                                                    (_ = "" + h.string(a.engine.getGameAttribute("UserInfo")[0])),
                                                                    (t = n.__cast(s.h[_].behaviors.getBehavior("ActorEvents_20"), y)._PlayerNode),
                                                                    (s = a.engine.getGameAttribute("OtherPlayers")),
                                                                    (_ = "" + h.string(a.engine.getGameAttribute("UserInfo")[0])),
                                                                    k._customBlock_CreateMonster("mini3a", t, s.h[_].getXCenter() - 16))
                                                                  : 0.35 > c.randomFloat()
                                                                    ? ((s = a.engine.getGameAttribute("OtherPlayers")),
                                                                      (_ = "" + h.string(a.engine.getGameAttribute("UserInfo")[0])),
                                                                      (t = n.__cast(s.h[_].behaviors.getBehavior("ActorEvents_20"), y)._PlayerNode),
                                                                      (s = a.engine.getGameAttribute("OtherPlayers")),
                                                                      (_ = "" + h.string(a.engine.getGameAttribute("UserInfo")[0])),
                                                                      k._customBlock_CreateMonster("babayaga", t, s.h[_].getXCenter() - 16))
                                                                    : ((s = a.engine.getGameAttribute("OtherPlayers")),
                                                                      (_ = "" + h.string(a.engine.getGameAttribute("UserInfo")[0])),
                                                                      (t = n.__cast(s.h[_].behaviors.getBehavior("ActorEvents_20"), y)._PlayerNode),
                                                                      (s = a.engine.getGameAttribute("OtherPlayers")),
                                                                      (_ = "" + h.string(a.engine.getGameAttribute("UserInfo")[0])),
                                                                      k._customBlock_CreateMonster("mushG", t, s.h[_].getXCenter() - 16)))
                                                    : "l" == a.engine.getGameAttribute("DummyList")[2]
                                                      ? ((a.engine.getGameAttribute("OptionsListAccount")[102] = c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[102]) + 1),
                                                        1 == c.asNumber(a.engine.getGameAttribute("TimeAway").h.GlobalTime) % 200
                                                            ? ((t = c.randomInt(0, 960)),
                                                              (s = a.engine.getGameAttribute("OtherPlayers")),
                                                              (_ = "" + h.string(a.engine.getGameAttribute("UserInfo")[0])),
                                                              q._customBlock_DropSomething("Timecandy6", 1, 0, 0, 0, 0, 0, t, c.randomInt(0, 0 | n.__cast(s.h[_].behaviors.getBehavior("ActorEvents_20"), y)._PlayerNode)))
                                                            : 10 > c.asNumber(a.engine.getGameAttribute("TimeAway").h.GlobalTime) % 200
                                                              ? ((t = c.randomInt(0, 960)),
                                                                (s = a.engine.getGameAttribute("OtherPlayers")),
                                                                (_ = "" + h.string(a.engine.getGameAttribute("UserInfo")[0])),
                                                                q._customBlock_DropSomething("Timecandy5", 1, 0, 0, 0, 0, 0, t, c.randomInt(0, 0 | n.__cast(s.h[_].behaviors.getBehavior("ActorEvents_20"), y)._PlayerNode)))
                                                              : 30 > c.asNumber(a.engine.getGameAttribute("TimeAway").h.GlobalTime) % 200
                                                                ? ((t = c.randomInt(0, 960)),
                                                                  (s = a.engine.getGameAttribute("OtherPlayers")),
                                                                  (_ = "" + h.string(a.engine.getGameAttribute("UserInfo")[0])),
                                                                  q._customBlock_DropSomething("Timecandy4", 1, 0, 0, 0, 0, 0, t, c.randomInt(0, 0 | n.__cast(s.h[_].behaviors.getBehavior("ActorEvents_20"), y)._PlayerNode)))
                                                                : 75 > c.asNumber(a.engine.getGameAttribute("TimeAway").h.GlobalTime) % 200
                                                                  ? ((t = c.randomInt(0, 960)),
                                                                    (s = a.engine.getGameAttribute("OtherPlayers")),
                                                                    (_ = "" + h.string(a.engine.getGameAttribute("UserInfo")[0])),
                                                                    q._customBlock_DropSomething("Timecandy3", 1, 0, 0, 0, 0, 0, t, c.randomInt(0, 0 | n.__cast(s.h[_].behaviors.getBehavior("ActorEvents_20"), y)._PlayerNode)))
                                                                  : ((t = c.randomInt(0, 960)),
                                                                    (s = a.engine.getGameAttribute("OtherPlayers")),
                                                                    (_ = "" + h.string(a.engine.getGameAttribute("UserInfo")[0])),
                                                                    q._customBlock_DropSomething("Timecandy2", 1, 0, 0, 0, 0, 0, t, c.randomInt(0, 0 | n.__cast(s.h[_].behaviors.getBehavior("ActorEvents_20"), y)._PlayerNode))))
                                                      : "n" == a.engine.getGameAttribute("DummyList")[2]
                                                        ? ((a.engine.getGameAttribute("OptionsListAccount")[102] = c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[102]) + 1),
                                                          (a.engine.getGameAttribute("Holes")[11][64] = 0),
                                                          (t = c.randomInt(0, 960)),
                                                          (s = a.engine.getGameAttribute("OtherPlayers")),
                                                          (_ = "" + h.string(a.engine.getGameAttribute("UserInfo")[0])),
                                                          q._customBlock_DropSomething("Quest71", 1, 0, 0, 0, 0, 0, t, c.randomInt(0, 0 | n.__cast(s.h[_].behaviors.getBehavior("ActorEvents_20"), y)._PlayerNode)),
                                                          (t = c.randomInt(0, 960)),
                                                          (s = a.engine.getGameAttribute("OtherPlayers")),
                                                          (_ = "" + h.string(a.engine.getGameAttribute("UserInfo")[0])),
                                                          q._customBlock_DropSomething("Quest71", 1, 0, 0, 0, 0, 0, t, c.randomInt(0, 0 | n.__cast(s.h[_].behaviors.getBehavior("ActorEvents_20"), y)._PlayerNode)),
                                                          (t = c.randomInt(0, 960)),
                                                          (s = a.engine.getGameAttribute("OtherPlayers")),
                                                          (_ = "" + h.string(a.engine.getGameAttribute("UserInfo")[0])),
                                                          q._customBlock_DropSomething("Quest71", 1, 0, 0, 0, 0, 0, t, c.randomInt(0, 0 | n.__cast(s.h[_].behaviors.getBehavior("ActorEvents_20"), y)._PlayerNode)),
                                                          (t = c.randomInt(0, 960)),
                                                          (s = a.engine.getGameAttribute("OtherPlayers")),
                                                          (_ = "" + h.string(a.engine.getGameAttribute("UserInfo")[0])),
                                                          q._customBlock_DropSomething("Quest71", 1, 0, 0, 0, 0, 0, t, c.randomInt(0, 0 | n.__cast(s.h[_].behaviors.getBehavior("ActorEvents_20"), y)._PlayerNode)))
                                                        : "p" == a.engine.getGameAttribute("DummyList")[2]
                                                          ? (10 > c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[102]) && (a.engine.getGameAttribute("OptionsListAccount")[29] = 0),
                                                            (a.engine.getGameAttribute("OptionsListAccount")[102] = c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[102]) + 11),
                                                            (a.engine.gameAttributes.h.DummyText3 = "KillDialogueEarly"),
                                                            (a.engine.gameAttributes.h.DummyNumber = 15),
                                                            (s = a.engine),
                                                            (r = "" + k._customBlock_DialogueETC("Lava_Flame2", "I_just_reset_your_Event_progress!_Go_collect_50_gifts_again,_and_get_+1_Event_Plays_for_doing_so!", 480, 50)),
                                                            (s.gameAttributes.h.DummyText2 = r))
                                                          : "q" == a.engine.getGameAttribute("DummyList")[2] &&
                                                            (10 > c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[102]) && (a.engine.getGameAttribute("Research")[7][2] = m._customBlock_ResearchStuff("RollsPerDay", 0, 0)),
                                                            (a.engine.getGameAttribute("OptionsListAccount")[102] = c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[102]) + 6),
                                                            (a.engine.gameAttributes.h.DummyText3 = "KillDialogueEarly"),
                                                            (a.engine.gameAttributes.h.DummyNumber = 15),
                                                            (s = a.engine),
                                                            (r = "" + k._customBlock_DialogueETC("Lava_Flame2", "I_just_reset_your_daily_Research_Observation_Attempts!_Good_luck!", 480, 50)),
                                                            (s.gameAttributes.h.DummyText2 = r));
                                    else
                                        1 == ("" + h.string(a.engine.getGameAttribute("DummyList")[2])).length &&
                                            ((a.engine.gameAttributes.h.DummyText3 = "KillDialogueEarly"),
                                            (a.engine.gameAttributes.h.DummyNumber = 5),
                                            (s = a.engine),
                                            (r = "" + k._customBlock_DialogueETC("Lava_Flame2", "You've_already_gotten_enough_rewards_today!", 480, 50)),
                                            (s.gameAttributes.h.DummyText2 = r));
                                    "fillerTexto" != a.engine.getGameAttribute("DummyList")[2] &&
                                        ("m" == a.engine.getGameAttribute("DummyList")[2]
                                            ? "JungleGAME" != c.getCurrentSceneName() &&
                                              ((t = cb.get().scenes.h[48].getID()),
                                              null == (r = _ = e = 0) && (r = 0),
                                              null == _ && (_ = 0),
                                              null == e && (e = 0),
                                              (s = c.createFadeOut(1, (e << 16) | (_ << 8) | r)),
                                              null == (r = _ = e = 0) && (r = 0),
                                              null == _ && (_ = 0),
                                              null == e && (e = 0),
                                              c.switchScene(t, s, c.createFadeIn(1, (e << 16) | (_ << 8) | r)))
                                            : "SteamC" == a.engine.getGameAttribute("DummyList")[2]
                                              ? ((a.engine.getGameAttribute("OptionsListAccount")[102] = c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[102]) + 1),
                                                1 == u.isElectron() &&
                                                    ((t = c.randomInt(0, 960)),
                                                    (s = a.engine.getGameAttribute("OtherPlayers")),
                                                    (_ = "" + h.string(a.engine.getGameAttribute("UserInfo")[0])),
                                                    q._customBlock_DropSomething("Timecandy7", 1, 0, 0, 0, 0, 0, t, c.randomInt(0, 0 | n.__cast(s.h[_].behaviors.getBehavior("ActorEvents_20"), y)._PlayerNode))))
                                              : "SteamP" == a.engine.getGameAttribute("DummyList")[2]
                                                ? ((a.engine.getGameAttribute("OptionsListAccount")[102] = c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[102]) + 1),
                                                  1 == u.isElectron() &&
                                                      ((t = c.randomInt(0, 960)),
                                                      (s = a.engine.getGameAttribute("OtherPlayers")),
                                                      (_ = "" + h.string(a.engine.getGameAttribute("UserInfo")[0])),
                                                      q._customBlock_DropSomething("EquipmentPendant18", 1, 0, 0, 0, 0, 0, t, c.randomInt(0, 0 | n.__cast(s.h[_].behaviors.getBehavior("ActorEvents_20"), y)._PlayerNode))))
                                                : "Die_Noob" == a.engine.getGameAttribute("DummyList")[2]
                                                  ? (a.engine.gameAttributes.h.PlayerHP = 0)
                                                  : a.engine.getGameAttribute("DummyList")[2] == "Ban_" + h.string(a.engine.getGameAttribute("UserInfo")[0])
                                                    ? (u.cleanMarkedFiles(!0),
                                                      (a.engine.getGameAttribute("OptionsListAccount")[26] = 4),
                                                      (t = cb.get().scenes.h[15].getID()),
                                                      null == (r = _ = e = 0) && (r = 0),
                                                      null == _ && (_ = 0),
                                                      null == e && (e = 0),
                                                      (s = c.createFadeOut(1, (e << 16) | (_ << 8) | r)),
                                                      null == (r = _ = e = 0) && (r = 0),
                                                      null == _ && (_ = 0),
                                                      null == e && (e = 0),
                                                      c.switchScene(t, s, c.createFadeIn(1, (e << 16) | (_ << 8) | r)))
                                                    : a.engine.getGameAttribute("DummyList")[2] == "Kick_" + h.string(a.engine.getGameAttribute("UserInfo")[0]) &&
                                                      ((t = cb.get().scenes.h[15].getID()),
                                                      null == (r = _ = e = 0) && (r = 0),
                                                      null == _ && (_ = 0),
                                                      null == e && (e = 0),
                                                      (s = c.createFadeOut(1, (e << 16) | (_ << 8) | r)),
                                                      null == (r = _ = e = 0) && (r = 0),
                                                      null == _ && (_ = 0),
                                                      null == e && (e = 0),
                                                      c.switchScene(t, s, c.createFadeIn(1, (e << 16) | (_ << 8) | r))));
                                }
                                return (
                                    (s = a.engine.getGameAttribute("OtherPlayers")),
                                    (_ = "" + h.string(a.engine.getGameAttribute("DummyList")[1])),
                                    Object.prototype.hasOwnProperty.call(s.h, _) &&
                                        ((s = a.engine.getGameAttribute("OtherPlayers")),
                                        (_ = "" + h.string(a.engine.getGameAttribute("DummyList")[1])),
                                        n.__cast(s.h[_].behaviors.getBehavior("ActorEvents_20"), y)._ChatTextLAST != a.engine.getGameAttribute("DummyList")[2] &&
                                            ((s = a.engine.getGameAttribute("OtherPlayers")),
                                            (_ = "" + h.string(a.engine.getGameAttribute("DummyList")[1])),
                                            (t = s.h[_]),
                                            (s = h.string(a.engine.getGameAttribute("DummyList")[2])),
                                            (n.__cast(t.behaviors.getBehavior("ActorEvents_20"), y)._ChatText = "" + s),
                                            (s = a.engine.getGameAttribute("OtherPlayers")),
                                            (_ = "" + h.string(a.engine.getGameAttribute("DummyList")[1])),
                                            (t = s.h[_]),
                                            (s = h.string(a.engine.getGameAttribute("DummyList")[2])),
                                            (n.__cast(t.behaviors.getBehavior("ActorEvents_20"), y)._ChatTextLAST = "" + s),
                                            v._customBlock_FriendsListREALz("Map", "" + h.string(a.engine.getGameAttribute("DummyList")[1]), "" + h.string(a.engine.getGameAttribute("DummyList")[2])))),
                                    1
                                );
                            }
                            if ("StatueExpReq" == e.substring(0, 12))
                                return 300 < c.asNumber(a.engine.getGameAttribute("StatueLevels")[0 | c.asNumber(e.charAt(12))][0])
                                    ? 14 > e.length
                                        ? Math.pow(c.asNumber(a.engine.getGameAttribute("StatueLevels")[0 | c.asNumber(e.charAt(12))][0]), 1.17) *
                                              Math.pow(1.35, c.asNumber(a.engine.getGameAttribute("StatueLevels")[0 | c.asNumber(e.charAt(12))][0]) / 10) +
                                          1
                                        : Math.pow(c.asNumber(a.engine.getGameAttribute("StatueLevels")[0 | c.asNumber(e.charAt(12) + e.charAt(13))][0]), 1.17) *
                                              Math.pow(1.35, c.asNumber(a.engine.getGameAttribute("StatueLevels")[0 | c.asNumber(e.charAt(12) + e.charAt(13))][0]) / 10) +
                                          1
                                    : 14 > e.length
                                      ? Math.round(
                                            Math.pow(c.asNumber(a.engine.getGameAttribute("StatueLevels")[0 | c.asNumber(e.charAt(12))][0]), 1.17) *
                                                Math.pow(1.35, c.asNumber(a.engine.getGameAttribute("StatueLevels")[0 | c.asNumber(e.charAt(12))][0]) / 10) +
                                                1
                                        )
                                      : Math.round(
                                            Math.pow(c.asNumber(a.engine.getGameAttribute("StatueLevels")[0 | c.asNumber(e.charAt(12) + e.charAt(13))][0]), 1.17) *
                                                Math.pow(1.35, c.asNumber(a.engine.getGameAttribute("StatueLevels")[0 | c.asNumber(e.charAt(12) + e.charAt(13))][0]) / 10) +
                                                1
                                        );
                            if ("StatueBonusGiven" == e.substring(0, 16))
                                return (
                                    (s = a.engine.getGameAttribute("DNSM")),
                                    (r =
                                        c.asNumber(a.engine.getGameAttribute("StatueLevels")[Math.round(c.asNumber(e.substring(16, e.length)))][0]) *
                                        c.asNumber(a.engine.getGameAttribute("CustomLists").h.StatueInfo[Math.round(c.asNumber(e.substring(16, e.length)))][3])),
                                    (s.h.statuearbDN = r),
                                    0 == Math.round(c.asNumber(e.substring(16, e.length))) ||
                                    2 == Math.round(c.asNumber(e.substring(16, e.length))) ||
                                    8 == Math.round(c.asNumber(e.substring(16, e.length))) ||
                                    7 == Math.round(c.asNumber(e.substring(16, e.length)))
                                        ? (7 != Math.round(c.asNumber(e.substring(16, e.length))) &&
                                              ((s = a.engine.getGameAttribute("DNSM")),
                                              (r = c.asNumber(a.engine.getGameAttribute("DNSM").h.statuearbDN) * Math.max(1 + k._customBlock_GetTalentNumber(1, 112) / 100, 1)),
                                              (s.h.statuearbDN = r)),
                                          8 != Math.round(c.asNumber(e.substring(16, e.length))) &&
                                              ((s = a.engine.getGameAttribute("DNSM")),
                                              (r = c.asNumber(a.engine.getGameAttribute("DNSM").h.statuearbDN) * Math.max(1 + k._customBlock_GetTalentNumber(1, 127) / 100, 1)),
                                              (s.h.statuearbDN = r)))
                                        : 1 == Math.round(c.asNumber(e.substring(16, e.length))) ||
                                            11 == Math.round(c.asNumber(e.substring(16, e.length))) ||
                                            9 == Math.round(c.asNumber(e.substring(16, e.length))) ||
                                            14 == Math.round(c.asNumber(e.substring(16, e.length)))
                                          ? (14 != Math.round(c.asNumber(e.substring(16, e.length))) &&
                                                ((s = a.engine.getGameAttribute("DNSM")),
                                                (r = c.asNumber(a.engine.getGameAttribute("DNSM").h.statuearbDN) * Math.max(1 + k._customBlock_GetTalentNumber(1, 292) / 100, 1)),
                                                (s.h.statuearbDN = r)),
                                            9 != Math.round(c.asNumber(e.substring(16, e.length))) &&
                                                ((s = a.engine.getGameAttribute("DNSM")),
                                                (r = c.asNumber(a.engine.getGameAttribute("DNSM").h.statuearbDN) * Math.max(1 + k._customBlock_GetTalentNumber(1, 307) / 100, 1)),
                                                (s.h.statuearbDN = r)))
                                          : 10 == Math.round(c.asNumber(e.substring(16, e.length))) ||
                                              6 == Math.round(c.asNumber(e.substring(16, e.length))) ||
                                              12 == Math.round(c.asNumber(e.substring(16, e.length))) ||
                                              13 == Math.round(c.asNumber(e.substring(16, e.length)))
                                            ? (13 != Math.round(c.asNumber(e.substring(16, e.length))) &&
                                                  ((s = a.engine.getGameAttribute("DNSM")),
                                                  (r = c.asNumber(a.engine.getGameAttribute("DNSM").h.statuearbDN) * Math.max(1 + k._customBlock_GetTalentNumber(1, 487) / 100, 1)),
                                                  (s.h.statuearbDN = r)),
                                              12 != Math.round(c.asNumber(e.substring(16, e.length))) &&
                                                  ((s = a.engine.getGameAttribute("DNSM")),
                                                  (r = c.asNumber(a.engine.getGameAttribute("DNSM").h.statuearbDN) * Math.max(1 + k._customBlock_GetTalentNumber(1, 472) / 100, 1)),
                                                  (s.h.statuearbDN = r)))
                                            : (3 != Math.round(c.asNumber(e.substring(16, e.length))) && 5 != Math.round(c.asNumber(e.substring(16, e.length))) && 17 != Math.round(c.asNumber(e.substring(16, e.length)))) ||
                                              ((s = a.engine.getGameAttribute("DNSM")),
                                              (r = c.asNumber(a.engine.getGameAttribute("DNSM").h.statuearbDN) * Math.max(1 + k._customBlock_GetTalentNumber(1, 37) / 100, 1)),
                                              (s.h.statuearbDN = r)),
                                    2 <= c.asNumber(a.engine.getGameAttribute("StatueG")[0 | c.asNumber(e.substring(16, e.length))]) &&
                                        ((s = a.engine.getGameAttribute("DNSM")),
                                        (r = c.asNumber(a.engine.getGameAttribute("DNSM").h.statuearbDN) * Math.max(1 + (100 + m._customBlock_Sailing("ArtifactBonus", 30, 0)) / 100, 1)),
                                        (s.h.statuearbDN = r)),
                                    3 <= c.asNumber(a.engine.getGameAttribute("StatueG")[0 | c.asNumber(e.substring(16, e.length))]) &&
                                        ((s = a.engine.getGameAttribute("DNSM")),
                                        (r = c.asNumber(a.engine.getGameAttribute("DNSM").h.statuearbDN) * Math.max(1 + (50 + m._customBlock_Thingies("ZenithMarketBonus", 0, 0)) / 100, 1)),
                                        (s.h.statuearbDN = r)),
                                    (0 != Math.round(c.asNumber(e.substring(16, e.length))) &&
                                        1 != Math.round(c.asNumber(e.substring(16, e.length))) &&
                                        2 != Math.round(c.asNumber(e.substring(16, e.length))) &&
                                        6 != Math.round(c.asNumber(e.substring(16, e.length)))) ||
                                        ((s = a.engine.getGameAttribute("DNSM")),
                                        (r = c.asNumber(a.engine.getGameAttribute("DNSM").h.statuearbDN) * Math.max(1 + m._customBlock_Summoning("VaultUpgBonus", 25, 0) / 100, 1)),
                                        (s.h.statuearbDN = r)),
                                    29 != Math.round(c.asNumber(e.substring(16, e.length))) &&
                                        ((s = a.engine.getGameAttribute("DNSM")),
                                        (r = c.asNumber(a.engine.getGameAttribute("DNSM").h.statuearbDN) * Math.max(1 + x._customBlock_ArbitraryCode("StatueBonusGiven29") / 100, 1)),
                                        (s.h.statuearbDN = r)),
                                    c.asNumber(a.engine.getGameAttribute("DNSM").h.statuearbDN) *
                                        (1 + 0.3 * m._customBlock_Summoning("EventShopOwned", 19, 0)) *
                                        Math.max(1 + p._customBlock_getbonus2(1, 56, -1) / 100, 1) *
                                        (1 + m._customBlock_Summoning2("MeritocBonusz", 26, 0) / 100)
                                );
                            if ("StatueOnyxOwned" == e) {
                                if (2 > c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[69])) return 0;
                                for (e = a.engine.getGameAttribute("DNSM").h.StatueOnyxOwned = 0, t = a.engine.getGameAttribute("StatueG").length; e < t;)
                                    ((i = e++),
                                        2 <= c.asNumber(a.engine.getGameAttribute("StatueG")[i]) &&
                                            ((s = a.engine.getGameAttribute("DNSM")), (r = c.asNumber(a.engine.getGameAttribute("DNSM").h.StatueOnyxOwned) + 1), (s.h.StatueOnyxOwned = r)));
                                return a.engine.getGameAttribute("DNSM").h.StatueOnyxOwned;
                            }
                            if ("StatueZenithOwned" == e) {
                                if (3 > c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[69])) return 0;
                                for (e = a.engine.getGameAttribute("DNSM").h.StatueZenithOwned = 0, t = a.engine.getGameAttribute("StatueG").length; e < t;)
                                    ((i = e++),
                                        3 <= c.asNumber(a.engine.getGameAttribute("StatueG")[i]) &&
                                            ((s = a.engine.getGameAttribute("DNSM")), (r = c.asNumber(a.engine.getGameAttribute("DNSM").h.StatueZenithOwned) + 1), (s.h.StatueZenithOwned = r)));
                                return a.engine.getGameAttribute("DNSM").h.StatueZenithOwned;
                            }
                            if ("HitChancePCT" == e)
                                return (
                                    (s = a.engine.getGameAttribute("OtherPlayers")),
                                    (_ = "" + h.string(a.engine.getGameAttribute("UserInfo")[0])),
                                    null != n.__cast(s.h[_].behaviors.getBehavior("ActorEvents_20"), y)._TargetEnemy
                                        ? ((s = a.engine.getGameAttribute("DNSM")),
                                          (r = a.engine.getGameAttribute("MonsterDefinitionsGET")),
                                          (i = a.engine.getGameAttribute("OtherPlayers")),
                                          (_ = "" + h.string(a.engine.getGameAttribute("UserInfo")[0])),
                                          (_ = n.__cast(n.__cast(i.h[_].behaviors.getBehavior("ActorEvents_20"), y)._TargetEnemy.behaviors.getBehavior("ActorEvents_1"), C)._MonsterType),
                                          (s.h.arbAcc4 = r.h[_]))
                                        : ((s = a.engine.getGameAttribute("DNSM")), (r = a.engine.getGameAttribute("MonsterDefinitionsGET")), (_ = a.engine.getGameAttribute("AFKtarget")), (s.h.arbAcc4 = r.h[_])),
                                    (s = a.engine.getGameAttribute("DNSM")),
                                    (r = a.engine.getGameAttribute("DNSM").h.arbAcc4.h.Defence),
                                    (s.h.arbAcc2 = r),
                                    0.444 != a.engine.getGameAttribute("DNSM").h.arbAcc3 && ((s = a.engine.getGameAttribute("DNSM")), (r = a.engine.getGameAttribute("DNSM").h.arbAcc3), (s.h.arbAcc2 = r)),
                                    (s = a.engine.getGameAttribute("DummyNumbersStatManager")),
                                    (r = x._customBlock_PlayerAccTot() / c.asNumber(a.engine.getGameAttribute("DNSM").h.arbAcc2)),
                                    (s.h.arbAcc1 = r),
                                    "Monster" == a.engine.getGameAttribute("DNSM").h.arbAcc4.h.Type
                                        ? 0.5 <= c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.arbAcc1)
                                            ? Math.floor(Math.min(100 * (0.95 * c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.arbAcc1) - 0.425), 100))
                                            : 0
                                        : 0.25 <= c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.arbAcc1)
                                          ? Math.floor(
                                                Math.min(
                                                    ((6 * (c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.arbAcc1) - 0.174)) / (c.asNumber(a.engine.getGameAttribute("DummyNumbersStatManager").h.arbAcc1) - 0.17 + 9.04)) *
                                                        100,
                                                    100
                                                )
                                            )
                                          : 0
                                );
                            if ("FoodNOTconsume" == e)
                                return Math.min(
                                    Math.min(90 + 5 * p._customBlock_MainframeBonus(108), 98 + Math.min(c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.nonFoodACTIVE), 1)),
                                    Math.max(1, p._customBlock_MainframeBonus(108)) *
                                        (k._customBlock_GetTalentNumber(1, 458) +
                                            (c.asNumber(a.engine.getGameAttribute("DNSM").h.BoxRewards.h.NonConsume) +
                                                (v._customBlock_CardBonusREAL(16) + c.asNumber(a.engine.getGameAttribute("DNSM").h.StarSigns.h.NoConsumeFood) + c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.nonFoodACTIVE))))
                                );
                            if ("MonsterCash" == e)
                                return (
                                    (1 +
                                        (c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.CashSTR) * Math.floor(x._customBlock_TotalStats("STR") / 250) +
                                            (c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.CashAGI) * Math.floor(x._customBlock_TotalStats("AGI") / 250) +
                                                c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.CashWIS) * Math.floor(x._customBlock_TotalStats("WIS") / 250))) /
                                            100) *
                                    (1 + Math.min(4, m._customBlock_Companions(24))) *
                                    m._customBlock_Stuff2("CoinDropMulti", 0, 0) *
                                    (1 + Math.min(4, m._customBlock_Companions(45))) *
                                    (1 + Math.min(4, m._customBlock_Companions(159))) *
                                    (1 + 0.5 * m._customBlock_Summoning("EventShopOwned", 9, 0)) *
                                    (1 + 0.6 * m._customBlock_Summoning("EventShopOwned", 20, 0)) *
                                    (1 + v._customBlock_EtcBonuses("77") / 100) *
                                    (1 + m._customBlock_SushiStuff("RoG_BonusQTY", 18, 0) / 100) *
                                    (1 + m._customBlock_SushiStuff("RoG_BonusQTY", 37, 0) / 100) *
                                    (1 + (m._customBlock_ResearchStuff("Grid_Bonus", 149, 0) + m._customBlock_ResearchStuff("Grid_Bonus", 169, 0)) / 100) *
                                    (1 + v._customBlock_EtcBonuses("100") / 100) *
                                    (1 + m._customBlock_GetSetBonus("GOLD_SET", "Bonus", 0, 0) / 100) *
                                    (1 + m._customBlock_Holes("GambitBonuses", 7, 0) / 100) *
                                    (1 + (250 * c.asNumber(a.engine.getGameAttribute("BundlesReceived").h.bun_y)) / 100) *
                                    (1 + (Math.max(1, p._customBlock_getbonus2(1, 433, -1)) * k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[362]))) / 100) *
                                    (1 + (q._customBlock_MealBonus("Cash") + m._customBlock_Sailing("ArtifactBonus", 1, 0) + (m._customBlock_Summoning("RooBonuses", 6, 0) + m._customBlock_Summoning("VotingBonusz", 34, 0))) / 100) *
                                    (1 +
                                        (0.5 * p._customBlock_Breeding("PetArenaBonus", "0", 5, 0) +
                                            m._customBlock_Thingies("FriendBonusStatz", 5, 0) +
                                            (p._customBlock_Breeding("PetArenaBonus", "0", 14, 0) + x._customBlock_ArbitraryCode("StatueBonusGiven19") / 100))) *
                                    (1 +
                                        (p._customBlock_MainframeBonus(9) +
                                            (m._customBlock_Summoning("VaultUpgBonus", 34, 0) * m._customBlock_Summoning("VaultKillzTotal", 8, 0) +
                                                m._customBlock_Summoning("VaultUpgBonus", 37, 0) * m._customBlock_Summoning("VaultKillzTotal", 9, 0))) /
                                            100) *
                                    (1 + m._customBlock_Ninja("PristineBon", 16, 0) / 100) *
                                    (1 + p._customBlock_prayersReal(8, 0) / 100) *
                                    (1 + (m._customBlock_Divinity("Bonus_Minor", -1, 3) + m._customBlock_FarmingStuffs("CropSCbonus", 4, 0)) / 100) *
                                    (1 +
                                        (k._customBlock_GetTalentNumber(1, 657) +
                                            c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchVials.h.MonsterCash) +
                                            (v._customBlock_EtcBonuses("3") +
                                                (v._customBlock_CardBonusREAL(11) +
                                                    7 * x._customBlock_RunCodeOfTypeXforThingY("CardLv", "w5b1") +
                                                    (k._customBlock_GetTalentNumber(1, 22) +
                                                        (p._customBlock_FlurboShop(4) +
                                                            (p._customBlock_ArcadeBonus(10) + p._customBlock_ArcadeBonus(11)) +
                                                            (c.asNumber(a.engine.getGameAttribute("DNSM").h.BoxRewards.h["13c"]) +
                                                                (p._customBlock_GuildBonuses(8) * (1 + Math.floor(a.engine.getGameAttribute("CurrentMap") / 50)) +
                                                                    (k._customBlock_TalentCalc(643) +
                                                                        (k._customBlock_TalentCalc(644) +
                                                                            (q._customBlock_GoldFoodBonuses("MonsterCash") +
                                                                                m._customBlock_Summoning("VaultUpgBonus", 17, 0) * k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[340])) +
                                                                                (5 * p._customBlock_AchieveStatus(235) +
                                                                                    (10 * p._customBlock_AchieveStatus(350) +
                                                                                        (20 * p._customBlock_AchieveStatus(376) +
                                                                                            (m._customBlock_Summoning("VaultUpgBonus", 2, 0) +
                                                                                                (m._customBlock_Summoning("VaultUpgBonus", 14, 0) * m._customBlock_Summoning("VaultKillzTotal", 4, 0) +
                                                                                                    (m._customBlock_Summoning("VaultUpgBonus", 31, 0) * m._customBlock_Summoning("VaultKillzTotal", 7, 0) +
                                                                                                        (c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[420]) +
                                                                                                            m._customBlock_Summoning("VaultUpgBonus", 70, 0) * m._customBlock_Stuff2("CardsCollected", 0, 0)))))))))))))))))) /
                                            100)
                                );
                            if ("KillPerKill" == e)
                                return (
                                    (a.engine.getGameAttribute("DNSM").h.KpKDumm = 0),
                                    100 <= a.engine.getGameAttribute("CurrentMap") && 150 > a.engine.getGameAttribute("CurrentMap")
                                        ? ((s = a.engine.getGameAttribute("DNSM")), (r = v._customBlock_EtcBonuses("68")), (s.h.KpKDumm = r))
                                        : 150 <= a.engine.getGameAttribute("CurrentMap") && 200 > a.engine.getGameAttribute("CurrentMap")
                                          ? ((s = a.engine.getGameAttribute("DNSM")), (r = v._customBlock_EtcBonuses("69")), (s.h.KpKDumm = r))
                                          : 50 <= a.engine.getGameAttribute("CurrentMap") && 100 > a.engine.getGameAttribute("CurrentMap")
                                            ? ((s = a.engine.getGameAttribute("DNSM")), (r = v._customBlock_EtcBonuses("70")), (s.h.KpKDumm = r))
                                            : 200 <= a.engine.getGameAttribute("CurrentMap") && 250 > a.engine.getGameAttribute("CurrentMap")
                                              ? ((s = a.engine.getGameAttribute("DNSM")), (r = v._customBlock_EtcBonuses("73")), (s.h.KpKDumm = r))
                                              : 250 <= a.engine.getGameAttribute("CurrentMap") && 300 > a.engine.getGameAttribute("CurrentMap")
                                                ? ((s = a.engine.getGameAttribute("DNSM")), (r = v._customBlock_EtcBonuses("90")), (s.h.KpKDumm = r))
                                                : 300 <= a.engine.getGameAttribute("CurrentMap") &&
                                                  350 > a.engine.getGameAttribute("CurrentMap") &&
                                                  ((s = a.engine.getGameAttribute("DNSM")), (r = m._customBlock_Spelunk("BigFishBonuses", 3, 0) + v._customBlock_EtcBonuses("105")), (s.h.KpKDumm = r)),
                                    300 <= a.engine.getGameAttribute("CurrentMap")
                                        ? (a.engine.getGameAttribute("DNSM").h.KpKDumm2 = 0)
                                        : ((s = a.engine.getGameAttribute("DNSM")),
                                          (r =
                                              k._customBlock_GetTalentNumber(1, 141) * (x._customBlock_TotalStats("STR") / 1e3) +
                                              (k._customBlock_GetTalentNumber(1, 366) * (x._customBlock_TotalStats("AGI") / 1e3) + k._customBlock_GetTalentNumber(1, 531) * (x._customBlock_TotalStats("WIS") / 1e3))),
                                          (s.h.KpKDumm2 = r)),
                                    1 == x._customBlock_RunCodeOfTypeXforThingY("OverkillStuffs", "3")
                                        ? Math.max(1, p._customBlock_MainframeBonus(4)) *
                                          (1 + m._customBlock_Companions(14)) *
                                          (1 + m._customBlock_RoyalG("StatueBon", 2, 0) / 100) *
                                          (1 + 0.2 * m._customBlock_Companions(168)) *
                                          (1 + m._customBlock_Companions(29)) *
                                          (1 + m._customBlock_Companions(154)) *
                                          (1 + v._customBlock_EtcBonuses("96") / 100) *
                                          (1 + v._customBlock_EtcBonuses("103") / 100) *
                                          (1 + (c.asNumber(a.engine.getGameAttribute("DNSM").h.KpKDumm) + c.asNumber(a.engine.getGameAttribute("DNSM").h.FamBonusQTYs.h[28]) + m._customBlock_Summoning("VotingBonusz", 5, 0)) / 100) *
                                          Math.max(1, 1 + m._customBlock_Divinity("Bonus_MAJOR", a.engine.getGameAttribute("GetPlayersUsernames").indexOf(a.engine.getGameAttribute("UserInfo")[0]), 7)) *
                                          (1 +
                                              (c.asNumber(a.engine.getGameAttribute("DNSM").h.KpKDumm2) +
                                                  k._customBlock_GetTalentNumber(1, 109) +
                                                  (p._customBlock_WorkbenchStuff("MultiKillTOTAL", 0, 0) +
                                                      (c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.kpkACTIVE) +
                                                          (p._customBlock_prayersReal(13, 0) +
                                                              (m._customBlock_Ninja("PristineBon", 6, 0) +
                                                                  (m._customBlock_FarmingStuffs("ExoticBonusQTY", 56, 0) +
                                                                      (m._customBlock_Thingies("LegendPTS_bonus", 16, 0) +
                                                                          (m._customBlock_Bubbastuff("BubbaRoG_Bonuses", 5, 0) +
                                                                              (m._customBlock_Summoning("VaultUpgBonus", 64, 0) + m._customBlock_Thingies("FriendBonusStatz", 6, 0)))))))))) /
                                                  100)
                                        : Math.max(1, p._customBlock_MainframeBonus(4)) *
                                          (1 + m._customBlock_Companions(14)) *
                                          (1 + m._customBlock_RoyalG("StatueBon", 2, 0) / 100) *
                                          (1 + 0.2 * m._customBlock_Companions(168)) *
                                          (1 + m._customBlock_Companions(29)) *
                                          (1 + m._customBlock_Companions(154)) *
                                          (1 + v._customBlock_EtcBonuses("96") / 100) *
                                          (1 + v._customBlock_EtcBonuses("103") / 100) *
                                          (1 + (c.asNumber(a.engine.getGameAttribute("DNSM").h.KpKDumm) + c.asNumber(a.engine.getGameAttribute("DNSM").h.FamBonusQTYs.h[28]) + m._customBlock_Summoning("VotingBonusz", 5, 0)) / 100) *
                                          Math.max(1, 1 + m._customBlock_Divinity("Bonus_MAJOR", a.engine.getGameAttribute("GetPlayersUsernames").indexOf(a.engine.getGameAttribute("UserInfo")[0]), 7)) *
                                          (1 +
                                              (c.asNumber(a.engine.getGameAttribute("DNSM").h.KpKDumm2) +
                                                  k._customBlock_GetTalentNumber(1, 109) +
                                                  (c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.kpkACTIVE) +
                                                      (p._customBlock_prayersReal(13, 0) +
                                                          (m._customBlock_Ninja("PristineBon", 6, 0) +
                                                              (m._customBlock_FarmingStuffs("ExoticBonusQTY", 56, 0) +
                                                                  (m._customBlock_Thingies("LegendPTS_bonus", 16, 0) +
                                                                      (m._customBlock_Bubbastuff("BubbaRoG_Bonuses", 5, 0) + (m._customBlock_Summoning("VaultUpgBonus", 64, 0) + m._customBlock_Thingies("FriendBonusStatz", 6, 0))))))))) /
                                                  100)
                                );
                            if ("CrystalSpawn" == e)
                                return (
                                    (5 * m._customBlock_Summoning("EventShopOwned", 42, 0) +
                                        (1 + k._customBlock_GetTalentNumber(1, 26) / 100) *
                                            (1 + (c.asNumber(a.engine.getGameAttribute("DNSM").h.BoxRewards.h.CrystalSpawn) + (p._customBlock_Shrine(6) + (m._customBlock_Companions(171) + v._customBlock_CardBonusREAL(14)))) / 100) *
                                            (1 + k._customBlock_GetTalentNumber(1, 619) / 100) *
                                            (1 + k._customBlock_StampBonusOfTypeX("CrySpawn") / 100)) /
                                    2e3
                                );
                            if ("CrystalSpawnCAP" == e) return 0.1;
                            if ("CrystalEmbiggener" == e) return Math.max(1, x._customBlock_ArbitraryCode("CrystalSpawn") / x._customBlock_ArbitraryCode("CrystalSpawnCAP"));
                            if ("GiantMob" == e)
                                return 5 < p._customBlock_prayersReal(5, 0)
                                    ? 5 > c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[57])
                                        ? (1 / ((100 + 50 * Math.pow(c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[57]) + 1, 2)) * (1 + p._customBlock_prayersReal(18, 1) / 100))) *
                                          (1 + (p._customBlock_Shrine(6) + c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchVials.h.GiantMob)) / 100)
                                        : (1 /
                                              (2 *
                                                  Math.pow(c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[57]) + 1, 1.95) *
                                                  (1 + p._customBlock_prayersReal(18, 1) / 100) *
                                                  Math.pow(c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[57]) + 1, 1.5 + c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[57]) / 15))) *
                                          (1 + (p._customBlock_Shrine(6) + c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchVials.h.GiantMob)) / 100)
                                    : 0;
                            if ("QuestEXP" == e) return 1 + k._customBlock_StampBonusOfTypeX("QuestExp") / 100;
                            if ("ShowOffscreenPortals" == e)
                                return 0 == x._customBlock_RunCodeOfTypeXforThingY("KillroyRoom", "0") &&
                                    0 == m._customBlock_Thingies("ReliquariumInPosession", 0, 0) &&
                                    0 == m._customBlock_Windwalker("CompassTempest", 0, 0) &&
                                    0 == m._customBlock_ArcaneType("TesseractArcanist", 0, 0) &&
                                    1 == a.engine.getGameAttribute("OptionsList")[22] &&
                                    37 != a.engine.getGameAttribute("CurrentMap") &&
                                    -1 == p._customBlock_Dungon() &&
                                    -1 == n.__cast(a.engine.getGameAttribute("PixelHelperActor")[7].behaviors.getBehavior("ActorEvents_340"), ma)._GenINFO[8]
                                    ? 1
                                    : 0;
                            if ("PctMPperSec" == e) {
                                for (e = a.engine.getGameAttribute("DNSM").h.ManaRegen = 0, t = 0 | a.engine.getGameAttribute("FoodSlotsOwned"); e < t;)
                                    ((i = e++),
                                        "Blank" != a.engine.getGameAttribute("EquipmentOrder")[2][i] &&
                                            0 != a.engine.getGameAttribute("EquipmentQuantity")[2][i] &&
                                            ((s = a.engine.getGameAttribute("DNSM")),
                                            (r = a.engine.getGameAttribute("ItemDefinitionsGET")),
                                            (_ = "" + h.string(a.engine.getGameAttribute("EquipmentOrder")[2][i])),
                                            (s.h.ManaRegenM = r.h[_]),
                                            "ManaRegenBoosts" == a.engine.getGameAttribute("DNSM").h.ManaRegenM.h.Effect &&
                                                ((i = a.engine.getGameAttribute("DNSM")),
                                                (r =
                                                    c.asNumber(a.engine.getGameAttribute("DNSM").h.ManaRegen) +
                                                    c.asNumber(a.engine.getGameAttribute("DNSM").h.ManaRegenM.h.Amount) * x._customBlock_FoodBonuses(h.string(a.engine.getGameAttribute("DNSM").h.ManaRegenM.h.Effect) + "EffectBonus")),
                                                (i.h.ManaRegen = r))));
                                return -1 != p._customBlock_Dungon()
                                    ? ((a.engine.getGameAttribute("DNSM").h.ManaRegen = 0),
                                      0 < c.asNumber(a.engine.getGameAttribute("DungItems").h[46]) && (a.engine.getGameAttribute("DNSM").h.ManaRegen = -85),
                                      1 < c.asNumber(a.engine.getGameAttribute("DNSM").h.DungeonStats.h.manaGodU)
                                          ? 0
                                          : 3.8 * (1 + (v._customBlock_CardBonusREAL(73) + (c.asNumber(a.engine.getGameAttribute("DNSM").h.ManaRegen) + p._customBlock_Labb("SigilBonus", "Blank", 5, 0))) / 100))
                                    : (1 + (c.asNumber(a.engine.getGameAttribute("DNSM").h.ManaRegen) + p._customBlock_Labb("SigilBonus", "Blank", 5, 0)) / 100) *
                                          (1 + (k._customBlock_GetTalentNumber(1, 629) + (k._customBlock_GetTalentNumber(2, 469) + v._customBlock_CardBonusREAL(51))) / 100);
                            }
                            if ("AtkCooldownDEC" == e)
                                return -1 == p._customBlock_Dungon()
                                    ? 1 + (k._customBlock_GetTalentNumber(1, 289) + c.asNumber(a.engine.getGameAttribute("DNSM").h.BoxRewards.h.cooldown)) / 100
                                    : 1 + (c.asNumber(a.engine.getGameAttribute("DNSM").h.DungeonStats.h.abilityCD) + 120 * Math.floor(c.asNumber(a.engine.getGameAttribute("DNSM").h.DungeonStats.h.manaGodU) / 1.9)) / 100;
                            if (-1 != e.indexOf("Prowess"))
                                return (
                                    (s = a.engine.getGameAttribute("DNSM")),
                                    (r = Math.max(
                                        0,
                                        Math.min(
                                            0.1,
                                            (c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.ProwessMulti) - 1) / 10 +
                                                (0.001 * c.asNumber(a.engine.getGameAttribute("DNSM").h.StarSigns.h.SkillProw) + 5e-4 * q._customBlock_MealBonus("Sprow"))
                                        )
                                    )),
                                    (s.h.ProwessALL = r),
                                    "MiningProwess" == e
                                        ? ((c.asNumber(a.engine.getGameAttribute("DNSM").h.BoxRewards.h.MinProw) / 100) * 0.1) / (c.asNumber(a.engine.getGameAttribute("DNSM").h.BoxRewards.h.MinProw) / 100 + 10) +
                                          c.asNumber(a.engine.getGameAttribute("DNSM").h.ProwessALL)
                                        : "ChopProwess" == e
                                          ? ((c.asNumber(a.engine.getGameAttribute("DNSM").h.BoxRewards.h.ChopProw) / 100) * 0.1) / (c.asNumber(a.engine.getGameAttribute("DNSM").h.BoxRewards.h.ChopProw) / 100 + 10) +
                                            c.asNumber(a.engine.getGameAttribute("DNSM").h.ProwessALL)
                                          : "FishProwess" == e
                                            ? ((c.asNumber(a.engine.getGameAttribute("DNSM").h.BoxRewards.h.FishProw) / 100) * 0.1) / (c.asNumber(a.engine.getGameAttribute("DNSM").h.BoxRewards.h.FishProw) / 100 + 10) +
                                              c.asNumber(a.engine.getGameAttribute("DNSM").h.ProwessALL)
                                            : "CatchProwess" == e
                                              ? ((c.asNumber(a.engine.getGameAttribute("DNSM").h.BoxRewards.h.CatchProw) / 100) * 0.1) / (c.asNumber(a.engine.getGameAttribute("DNSM").h.BoxRewards.h.CatchProw) / 100 + 10) +
                                                c.asNumber(a.engine.getGameAttribute("DNSM").h.ProwessALL)
                                              : c.asNumber(a.engine.getGameAttribute("DNSM").h.ProwessALL)
                                );
                            if ("CardChanceMulti" == e)
                                return (
                                    1.2 +
                                    ((q._customBlock_GetBribeBonus("10") +
                                        (c.asNumber(a.engine.getGameAttribute("DNSM").h.StarSigns.h.pctCardDrop) +
                                            v._customBlock_CardBonusREAL(12) +
                                            c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchVials.h.CardDrop) +
                                            (k._customBlock_StampBonusOfTypeX("CardDrop") +
                                                (k._customBlock_GetTalentNumber(1, 28) + (p._customBlock_GuildBonuses(12) + (v._customBlock_EtcBonuses("26") + c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.CardDropz))))))) /
                                        100) *
                                        (1 + k._customBlock_GetTalentNumber(1, 628) / 100)
                                );
                            if ("InitializeNewAwayTime" == e)
                                return (
                                    (s = a.engine.getGameAttribute("TimeAway")),
                                    Object.prototype.hasOwnProperty.call(s.h, "DailyRewards") || (a.engine.getGameAttribute("TimeAway").h.DailyRewards = 0),
                                    (s = a.engine.getGameAttribute("TimeAway")),
                                    Object.prototype.hasOwnProperty.call(s.h, "BookLib") || (a.engine.getGameAttribute("TimeAway").h.BookLib = 0),
                                    1
                                );
                            if ("CardChanceDaily" == e) {
                                if (
                                    ((a.engine.getGameAttribute("DNSM").h.CCdal3DN = 0),
                                    null != a.engine.getGameAttribute("AFKtarget") &&
                                        ((s = a.engine.getGameAttribute("CustomMaps").h.MonsterDrops), (_ = a.engine.getGameAttribute("AFKtarget")), Object.prototype.hasOwnProperty.call(s.h, _)))
                                )
                                    for (e = 0, s = a.engine.getGameAttribute("CustomMaps").h.MonsterDrops, _ = a.engine.getGameAttribute("AFKtarget"), t = n.__cast(s.h[_], Array); e < t.length;)
                                        if (((s = t[e]), ++e, -1 != ("" + h.string(s[0])).indexOf("Cards"))) {
                                            a.engine.getGameAttribute("DNSM").h.CCdal3DN = s[1];
                                            break;
                                        }
                                return a.engine.getGameAttribute("DNSM").h.CCdal3DN;
                            }
                            return "TotalQuestsComplete" == e
                                ? ((s = a.engine.getGameAttribute("DNSM")),
                                  Object.prototype.hasOwnProperty.call(s.h, "TomeQTY")
                                      ? a.engine.getGameAttribute("DNSM").h.TomeQTY[4]
                                      : null != n.__cast(a.engine.getGameAttribute("PixelHelperActor")[1].behaviors.getBehavior("ActorEvents_116"), Da)._GeneralINFO
                                        ? n.__cast(a.engine.getGameAttribute("PixelHelperActor")[1].behaviors.getBehavior("ActorEvents_116"), Da)._GeneralINFO[12].length
                                        : 0)
                                : "AllStat" == e
                                  ? Math.floor(c.asNumber(a.engine.getGameAttribute("DNSM").h.BoxRewards.h["20a"]) + q._customBlock_MealBonus("Stat") + p._customBlock_GuildBonuses(1))
                                  : "AllStatPCT" == e
                                    ? 0.1 *
                                      Math.floor(
                                          10 *
                                              (c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchVials.h.AllStatPCT) +
                                                  (15 * m._customBlock_Companions(0) * m._customBlock_Holes("CosmoBonusQTY", 2, 0) +
                                                      p._customBlock_MainframeBonus(104) +
                                                      k._customBlock_StampBonusOfTypeX("AllStatPct") +
                                                      (v._customBlock_CardBonusREAL(82) +
                                                          m._customBlock_Summoning("WinBonus", 18, 0) +
                                                          (c.asNumber(a.engine.getGameAttribute("DNSM").h.FamBonusQTYs.h[72]) +
                                                              (m._customBlock_Sailing("ArtifactBonus", 28, 0) +
                                                                  (q._customBlock_GoldFoodBonuses("AllStatz") +
                                                                      (p._customBlock_AchieveStatus(309) +
                                                                          (Math.min(15, k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[172])) * k._customBlock_GetTalentNumber(1, 653)) +
                                                                              (p._customBlock_AchieveStatus(362) +
                                                                                  10 * Math.floor((98 + c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[232])) / 100) +
                                                                                  (m._customBlock_FarmingStuffs("LankRankUpgBonus", 19, 0) +
                                                                                      (m._customBlock_Summoning("VotingBonusz", 2, 0) + m._customBlock_GetSetBonus("MARBIGLASS_SET", "Bonus", 0, 0))))))))))))
                                      )
                                    : 1;
                        }
