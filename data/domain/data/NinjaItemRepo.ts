import { BaseNinjaItemModel } from '../model/baseNinjaItemModel';
import { NinjaItemModel } from '../model/ninjaItemModel';
import { NinjaItemTypeEnum } from '../enum/ninjaItemTypeEnum';
import { NinjaPristineCharmModel } from '../model/ninjaPristineCharmModel';
import { NinjaTrinketModel } from '../model/ninjaTrinketModel';
import { NinjaWeaponModel } from '../model/ninjaWeaponModel';

export class BaseNinjaItemBase { constructor(public index: number, public data: BaseNinjaItemModel) { } }



export const initNinjaItemRepo = () => {
    return [    
        new BaseNinjaItemBase(0, <NinjaItemModel>{
                "internalId": "NjItem0",
                "itemTypeId": 0,
                "itemType": NinjaItemTypeEnum.Item,
                "itemId": 0,
                "name": "Straw Hat",
                "desc": "A basic hat made of straw held together by string!",
                "filler": "filler"
            }),
        new BaseNinjaItemBase(1, <NinjaItemModel>{
                "internalId": "NjItem1",
                "itemTypeId": 0,
                "itemType": NinjaItemTypeEnum.Item,
                "itemId": 1,
                "name": "Wig Bandana",
                "desc": "Really makes you FEEL like you have cool ninja hair!",
                "filler": "filler"
            }),
        new BaseNinjaItemBase(2, <NinjaItemModel>{
                "internalId": "NjItem2",
                "itemTypeId": 0,
                "itemType": NinjaItemTypeEnum.Item,
                "itemId": 2,
                "name": "Funky Hat",
                "desc": "Woah what the heck is this? What does this have to do with ninjas?",
                "filler": "filler"
            }),
        new BaseNinjaItemBase(3, <NinjaItemModel>{
                "internalId": "NjItem3",
                "itemTypeId": 0,
                "itemType": NinjaItemTypeEnum.Item,
                "itemId": 3,
                "name": "Reinforced Headband",
                "desc": "The metal plate protects against downward strikes from opponents!",
                "filler": "filler"
            }),
        new BaseNinjaItemBase(4, <NinjaItemModel>{
                "internalId": "NjItem4",
                "itemTypeId": 0,
                "itemType": NinjaItemTypeEnum.Item,
                "itemId": 4,
                "name": "Shogun Helmet",
                "desc": "Symbolizes the leader of feudalism itself!",
                "filler": "filler"
            }),
        new BaseNinjaItemBase(5, <NinjaItemModel>{
                "internalId": "NjItem5",
                "itemTypeId": 0,
                "itemType": NinjaItemTypeEnum.Item,
                "itemId": 5,
                "name": "Gilded Headband",
                "desc": "It's like the other headband, but recoloured to save time...",
                "filler": "filler"
            }),
        new BaseNinjaItemBase(6, <NinjaItemModel>{
                "internalId": "NjItem6",
                "itemTypeId": 0,
                "itemType": NinjaItemTypeEnum.Item,
                "itemId": 6,
                "name": "Bamboo Hat",
                "desc": "Shaved bamboo held together by a collective desire to be a hat!",
                "filler": "filler"
            }),
        new BaseNinjaItemBase(7, <NinjaItemModel>{
                "internalId": "NjItem7",
                "itemTypeId": 0,
                "itemType": NinjaItemTypeEnum.Item,
                "itemId": 7,
                "name": "Festive Beast Mask",
                "desc": "Calm down it's not real, everyone knows masks aren't real!",
                "filler": "filler"
            }),
        new BaseNinjaItemBase(8, <NinjaItemModel>{
                "internalId": "NjItem8",
                "itemTypeId": 0,
                "itemType": NinjaItemTypeEnum.Item,
                "itemId": 8,
                "name": "Heiress Headdress",
                "desc": "It's blue, it's ugly, and it doesn't deserve a full descri",
                "filler": "filler"
            }),
        new BaseNinjaItemBase(9, <NinjaItemModel>{
                "internalId": "NjItem9",
                "itemTypeId": 0,
                "itemType": NinjaItemTypeEnum.Item,
                "itemId": 9,
                "name": "Spirited Mane",
                "desc": "Elicits a sense of awe in all who gaze upon it.",
                "filler": "filler"
            }),
        new BaseNinjaItemBase(10, <NinjaItemModel>{
                "internalId": "NjItem10",
                "itemTypeId": 0,
                "itemType": NinjaItemTypeEnum.Item,
                "itemId": 10,
                "name": "Fiery Mane",
                "desc": "Elicits a sense of awe in all who gaze upon it, but like, red.",
                "filler": "filler"
            }),
        new BaseNinjaItemBase(11, <NinjaItemModel>{
                "internalId": "NjItem11",
                "itemTypeId": 0,
                "itemType": NinjaItemTypeEnum.Item,
                "itemId": 11,
                "name": "Guardian Mane",
                "desc": "Really makes you FEEL like you have endgame monster hair!",
                "filler": "filler"
            }),
        new BaseNinjaItemBase(12, <NinjaItemModel>{
                "internalId": "NjItem12",
                "itemTypeId": 0,
                "itemType": NinjaItemTypeEnum.Item,
                "itemId": 12,
                "name": "Fanned Blossomage",
                "desc": "Bowing to someone with this on will really blow them away!",
                "filler": "filler"
            }),
        new BaseNinjaItemBase(13, <NinjaItemModel>{
                "internalId": "NjItem13",
                "itemTypeId": 0,
                "itemType": NinjaItemTypeEnum.Item,
                "itemId": 13,
                "name": "Dainty Brim",
                "desc": "Fancy a spot of tea daaahling? Be a dear and pass the crumpets!",
                "filler": "filler"
            }),
        new BaseNinjaItemBase(14, <NinjaItemModel>{
                "internalId": "NjItem14",
                "itemTypeId": 0,
                "itemType": NinjaItemTypeEnum.Item,
                "itemId": 14,
                "name": "Charcoal Hat",
                "desc": "A basic hat made of straw, with some charcoal tossed in.",
                "filler": "filler"
            }),
        new BaseNinjaItemBase(15, <NinjaItemModel>{
                "internalId": "Blank",
                "itemTypeId": 0,
                "itemType": NinjaItemTypeEnum.Item,
                "itemId": 0,
                "name": "Nothing",
                "desc": "0",
                "filler": "0"
            }),
        new BaseNinjaItemBase(16, <NinjaWeaponModel>{
                "internalId": "NjWep0",
                "itemTypeId": 1,
                "itemType": NinjaItemTypeEnum.Weapon,
                "itemId": 1,
                "name": "Wood Nunchaku",
                "x1": 10,
                "x2": 0
            }),
        new BaseNinjaItemBase(17, <NinjaWeaponModel>{
                "internalId": "NjWep5",
                "itemTypeId": 1,
                "itemType": NinjaItemTypeEnum.Weapon,
                "itemId": 1,
                "name": "Bamboo Nunchaku",
                "x1": 23,
                "x2": 1
            }),
        new BaseNinjaItemBase(18, <NinjaWeaponModel>{
                "internalId": "NjWep6",
                "itemTypeId": 1,
                "itemType": NinjaItemTypeEnum.Weapon,
                "itemId": 1,
                "name": "Charcoal Nunchaku",
                "x1": 45,
                "x2": 2
            }),
        new BaseNinjaItemBase(19, <NinjaWeaponModel>{
                "internalId": "NjWep7",
                "itemTypeId": 1,
                "itemType": NinjaItemTypeEnum.Weapon,
                "itemId": 1,
                "name": "Ignited Nunchaku",
                "x1": 80,
                "x2": 3
            }),
        new BaseNinjaItemBase(20, <NinjaWeaponModel>{
                "internalId": "NjWep8",
                "itemTypeId": 1,
                "itemType": NinjaItemTypeEnum.Weapon,
                "itemId": 1,
                "name": "Spiral Nunchaku",
                "x1": 110,
                "x2": 4
            }),
        new BaseNinjaItemBase(21, <NinjaWeaponModel>{
                "internalId": "NjWep1",
                "itemTypeId": 1,
                "itemType": NinjaItemTypeEnum.Weapon,
                "itemId": 2,
                "name": "Basic Kunai",
                "x1": 5,
                "x2": 0
            }),
        new BaseNinjaItemBase(22, <NinjaWeaponModel>{
                "internalId": "NjWep2",
                "itemTypeId": 1,
                "itemType": NinjaItemTypeEnum.Weapon,
                "itemId": 2,
                "name": "Jagged Kunai",
                "x1": 9,
                "x2": 0
            }),
        new BaseNinjaItemBase(23, <NinjaWeaponModel>{
                "internalId": "NjWep3",
                "itemTypeId": 1,
                "itemType": NinjaItemTypeEnum.Weapon,
                "itemId": 2,
                "name": "Serrated Kunai",
                "x1": 16,
                "x2": 0
            }),
        new BaseNinjaItemBase(24, <NinjaWeaponModel>{
                "internalId": "NjWep4",
                "itemTypeId": 1,
                "itemType": NinjaItemTypeEnum.Weapon,
                "itemId": 2,
                "name": "Damascus Kunai",
                "x1": 28,
                "x2": 0
            }),
        new BaseNinjaItemBase(25, <NinjaWeaponModel>{
                "internalId": "NjGl0",
                "itemTypeId": 1,
                "itemType": NinjaItemTypeEnum.Weapon,
                "itemId": 0,
                "name": "Leather Gloves",
                "x1": 5,
                "x2": 0
            }),
        new BaseNinjaItemBase(26, <NinjaWeaponModel>{
                "internalId": "NjGl1",
                "itemTypeId": 1,
                "itemType": NinjaItemTypeEnum.Weapon,
                "itemId": 0,
                "name": "Chainmail Gloves",
                "x1": 7,
                "x2": 0
            }),
        new BaseNinjaItemBase(27, <NinjaWeaponModel>{
                "internalId": "NjGl2",
                "itemTypeId": 1,
                "itemType": NinjaItemTypeEnum.Weapon,
                "itemId": 0,
                "name": "Thundergloves",
                "x1": 10,
                "x2": 0
            }),
        new BaseNinjaItemBase(28, <NinjaTrinketModel>{
                "internalId": "NjTr0",
                "itemTypeId": 2,
                "itemType": NinjaItemTypeEnum.Trinket,
                "itemId": 0,
                "name": "Ninja Log",
                "x1": 8,
                "bonus": "If detected, +{% chance to not be knocked out",
                "x3": 30
            }),
        new BaseNinjaItemBase(29, <NinjaTrinketModel>{
                "internalId": "NjTr1",
                "itemTypeId": 2,
                "itemType": NinjaItemTypeEnum.Trinket,
                "itemId": 1,
                "name": "Taunting Mark",
                "x1": 10,
                "bonus": "If another ninja on this floor is detected, you are instead (if youre not already KO'd) Also, -{% KO time",
                "x3": 40
            }),
        new BaseNinjaItemBase(30, <NinjaTrinketModel>{
                "internalId": "NjTr2",
                "itemTypeId": 2,
                "itemType": NinjaItemTypeEnum.Trinket,
                "itemId": 2,
                "name": "Yellow Belt",
                "x1": 5,
                "bonus": "Performs actions +{% faster. If there are no other ninjas on floor, this bonus is doubled",
                "x3": 30
            }),
        new BaseNinjaItemBase(31, <NinjaTrinketModel>{
                "internalId": "NjTr3",
                "itemTypeId": 2,
                "itemType": NinjaItemTypeEnum.Trinket,
                "itemId": 3,
                "name": "Strange Comb",
                "x1": 5,
                "bonus": "Gives all EXP earned to ninja with highest Sneak LV. Also, +{% Sneaking EXP",
                "x3": 50
            }),
        new BaseNinjaItemBase(32, <NinjaTrinketModel>{
                "internalId": "NjTr4",
                "itemTypeId": 2,
                "itemType": NinjaItemTypeEnum.Trinket,
                "itemId": 4,
                "name": "Silk Veil",
                "x1": 20,
                "bonus": "Gives you }x Total Stealth",
                "x3": 1000
            }),
        new BaseNinjaItemBase(33, <NinjaTrinketModel>{
                "internalId": "NjTr5",
                "itemTypeId": 2,
                "itemType": NinjaItemTypeEnum.Trinket,
                "itemId": 5,
                "name": "Meteorite",
                "x1": 15,
                "bonus": "Boosts Item Find Chance by +{%, but you gain no Sneaking Exp",
                "x3": 50
            }),
        new BaseNinjaItemBase(34, <NinjaTrinketModel>{
                "internalId": "NjTr6",
                "itemTypeId": 2,
                "itemType": NinjaItemTypeEnum.Trinket,
                "itemId": 6,
                "name": "Shiny Smoke",
                "x1": 20,
                "bonus": "Find +{% more Jade coins. If you have 0% Detection Rate, this bonus is doubled",
                "x3": 200
            }),
        new BaseNinjaItemBase(35, <NinjaTrinketModel>{
                "internalId": "NjTr7",
                "itemTypeId": 2,
                "itemType": NinjaItemTypeEnum.Trinket,
                "itemId": 7,
                "name": "Scroll of Power",
                "x1": 30,
                "bonus": "+{% Sneaking EXP, Jade Coins, and Total Stealth. Can only be equipped by one ninja at a time",
                "x3": 300
            }),
        new BaseNinjaItemBase(36, <NinjaTrinketModel>{
                "internalId": "NjTr8",
                "itemTypeId": 2,
                "itemType": NinjaItemTypeEnum.Trinket,
                "itemId": 8,
                "name": "Smoke Bomb",
                "x1": 15,
                "bonus": "All other Ninjas on same floor get +{% Stealth",
                "x3": 400
            }),
        new BaseNinjaItemBase(37, <NinjaTrinketModel>{
                "internalId": "NjTr9",
                "itemTypeId": 2,
                "itemType": NinjaItemTypeEnum.Trinket,
                "itemId": 9,
                "name": "Gold Coin",
                "x1": 5,
                "bonus": "If in Inventory, all ninjas find }x Jade Coins. Doesn't stack with other Gold Coins",
                "x3": 100
            }),
        new BaseNinjaItemBase(38, <NinjaTrinketModel>{
                "internalId": "NjTr10",
                "itemTypeId": 2,
                "itemType": NinjaItemTypeEnum.Trinket,
                "itemId": 10,
                "name": "Gold Eye",
                "x1": 3,
                "bonus": "If in Inventory, all ninjas get +{% Sneaking EXP. Doesn't stack with other Gold Eyes",
                "x3": 200
            }),
        new BaseNinjaItemBase(39, <NinjaTrinketModel>{
                "internalId": "NjTr11",
                "itemTypeId": 2,
                "itemType": NinjaItemTypeEnum.Trinket,
                "itemId": 11,
                "name": "Gold Coupon",
                "x1": 3,
                "bonus": "If in Inventory, all Ninja Knowledge is {% cheaper. Doesn't stack with other Gold Coupons",
                "x3": 60
            }),
        new BaseNinjaItemBase(40, <NinjaTrinketModel>{
                "internalId": "NjTr12",
                "itemTypeId": 2,
                "itemType": NinjaItemTypeEnum.Trinket,
                "itemId": 12,
                "name": "Gold Scroll",
                "x1": 3,
                "bonus": "If in Inventory, most charms give }x higher bonus than displayed. Doesn't stack with other Gold Scrolls",
                "x3": 200
            }),
        new BaseNinjaItemBase(41, <NinjaTrinketModel>{
                "internalId": "NjTr13",
                "itemTypeId": 2,
                "itemType": NinjaItemTypeEnum.Trinket,
                "itemId": 13,
                "name": "Blue Belt",
                "x1": 10,
                "bonus": "Gives +{% Sneaking EXP. If there are no other ninjas on floor, this bonus is tripled",
                "x3": 200
            }),
        new BaseNinjaItemBase(42, <NinjaTrinketModel>{
                "internalId": "NjTr14",
                "itemTypeId": 2,
                "itemType": NinjaItemTypeEnum.Trinket,
                "itemId": 14,
                "name": "Green Belt",
                "x1": 10,
                "bonus": "Find +{% more Jade Coins. If there are no other ninjas on floor, this bonus is tripled.",
                "x3": 200
            }),
        new BaseNinjaItemBase(43, <NinjaTrinketModel>{
                "internalId": "NjTr15",
                "itemTypeId": 2,
                "itemType": NinjaItemTypeEnum.Trinket,
                "itemId": 15,
                "name": "Goodie Bag",
                "x1": 25,
                "bonus": "Find +{% more Jade Coins.",
                "x3": 250
            }),
        new BaseNinjaItemBase(44, <NinjaTrinketModel>{
                "internalId": "NjTr16",
                "itemTypeId": 2,
                "itemType": NinjaItemTypeEnum.Trinket,
                "itemId": 16,
                "name": "Lotus Flower",
                "x1": 25,
                "bonus": "All other Ninjas on same floor get +{% Stealth",
                "x3": 700
            }),
        new BaseNinjaItemBase(45, <NinjaTrinketModel>{
                "internalId": "NjTr17",
                "itemTypeId": 2,
                "itemType": NinjaItemTypeEnum.Trinket,
                "itemId": 17,
                "name": "Rosaries",
                "x1": 35,
                "bonus": "Gives you }x Total Stealth",
                "x3": 1700
            }),
        new BaseNinjaItemBase(46, <NinjaTrinketModel>{
                "internalId": "NjTr18",
                "itemTypeId": 2,
                "itemType": NinjaItemTypeEnum.Trinket,
                "itemId": 18,
                "name": "Gold Dagger",
                "x1": 5,
                "bonus": "If in Inventory, all ninjas get +{% Nunchaku Damage. Doesn't stack with other Gold Daggers",
                "x3": 200
            }),
        new BaseNinjaItemBase(47, <NinjaTrinketModel>{
                "internalId": "NjTr19",
                "itemTypeId": 2,
                "itemType": NinjaItemTypeEnum.Trinket,
                "itemId": 19,
                "name": "Black Belt",
                "x1": 20,
                "bonus": "+{% Sneaking EXP and Jade coins. If there are no other ninjas on floor, this bonus is tripled.",
                "x3": 400
            }),
        new BaseNinjaItemBase(48, <NinjaTrinketModel>{
                "internalId": "NjTr20",
                "itemTypeId": 2,
                "itemType": NinjaItemTypeEnum.Trinket,
                "itemId": 20,
                "name": "Gold Beads",
                "x1": 25,
                "bonus": "If in Inventory, all ninjas get +{% Total Stealth. Doesn't stack with other Gold Beads",
                "x3": 500
            }),
        new BaseNinjaItemBase(49, <NinjaTrinketModel>{
                "internalId": "NjTr21",
                "itemTypeId": 2,
                "itemType": NinjaItemTypeEnum.Trinket,
                "itemId": 21,
                "name": "Gold Star",
                "x1": 2,
                "bonus": "If in Inventory, charms found have a +{ higher Max LV. Doesn't stack with other Gold Stars",
                "x3": 25
            }),
        new BaseNinjaItemBase(50, <NinjaTrinketModel>{
                "internalId": "NjTr22",
                "itemTypeId": 2,
                "itemType": NinjaItemTypeEnum.Trinket,
                "itemId": 22,
                "name": "Gold Sai",
                "x1": 4,
                "bonus": "If in Inventory, all ninjas get +{% Nunchaku Dmg Per 10 Sneak LV. Doesn't stack with other Gold Sais",
                "x3": 25
            }),
        new BaseNinjaItemBase(51, <NinjaTrinketModel>{
                "internalId": "NjTr23",
                "itemTypeId": 2,
                "itemType": NinjaItemTypeEnum.Trinket,
                "itemId": 23,
                "name": "Gold Envelope",
                "x1": 5,
                "bonus": "If in Inventory, all ninjas find +{% Jade Per 10 Sneak LV. Doesn't stack with other Gold Envelope",
                "x3": 50
            }),
        new BaseNinjaItemBase(52, <NinjaTrinketModel>{
                "internalId": "NjTr24",
                "itemTypeId": 2,
                "itemType": NinjaItemTypeEnum.Trinket,
                "itemId": 24,
                "name": "Gold Q Mark",
                "x1": 3,
                "bonus": "If in Inventory, all ninjas perform actions +{% faster. Doesn't stack with other Gold Q Marks",
                "x3": 30
            }),
        new BaseNinjaItemBase(53, <NinjaTrinketModel>{
                "internalId": "NjGem0",
                "itemTypeId": 4,
                "itemType": NinjaItemTypeEnum.Gemstone,
                "itemId": 130,
                "name": "Aquamarine",
                "x1": 40,
                "bonus": "Hold down to add this Gemstone to your collection. View collection and bonuses in Ninja Knowledge.",
                "x3": 10000
            }),
        new BaseNinjaItemBase(54, <NinjaTrinketModel>{
                "internalId": "NjGem1",
                "itemTypeId": 4,
                "itemType": NinjaItemTypeEnum.Gemstone,
                "itemId": 70,
                "name": "Emerald",
                "x1": 15,
                "bonus": "Hold down to add this Gemstone to your collection. View collection and bonuses in Ninja Knowledge.",
                "x3": 5000
            }),
        new BaseNinjaItemBase(55, <NinjaTrinketModel>{
                "internalId": "NjGem2",
                "itemTypeId": 4,
                "itemType": NinjaItemTypeEnum.Gemstone,
                "itemId": 285,
                "name": "Garnet",
                "x1": 12,
                "bonus": "Hold down to add this Gemstone to your collection. View collection and bonuses in Ninja Knowledge.",
                "x3": 2500
            }),
        new BaseNinjaItemBase(56, <NinjaTrinketModel>{
                "internalId": "NjGem3",
                "itemTypeId": 4,
                "itemType": NinjaItemTypeEnum.Gemstone,
                "itemId": 0,
                "name": "Starite",
                "x1": 5,
                "bonus": "Hold down to add this Gemstone to your collection. View collection and bonuses in Ninja Knowledge.",
                "x3": 200
            }),
        new BaseNinjaItemBase(57, <NinjaTrinketModel>{
                "internalId": "NjGem4",
                "itemTypeId": 4,
                "itemType": NinjaItemTypeEnum.Gemstone,
                "itemId": -35,
                "name": "Topaz",
                "x1": 10,
                "bonus": "Hold down to add this Gemstone to your collection. View collection and bonuses in Ninja Knowledge.",
                "x3": 1000
            }),
        new BaseNinjaItemBase(58, <NinjaTrinketModel>{
                "internalId": "NjGem5",
                "itemTypeId": 4,
                "itemType": NinjaItemTypeEnum.Gemstone,
                "itemId": 230,
                "name": "Moissanite",
                "x1": 3,
                "bonus": "Hold down to add this Gemstone to your collection. View collection and bonuses in Ninja Knowledge.",
                "x3": 300
            }),
        new BaseNinjaItemBase(59, <NinjaPristineCharmModel>{
                "internalId": "NjTrP0",
                "itemTypeId": 3,
                "itemType": NinjaItemTypeEnum.PristineCharm,
                "itemId": 0,
                "name": "Sparkle Log",
                "x1": 20,
                "desc": "Hold down to add this Pristine Charm to your collection in the Lobby. Click it there to see its bonus.",
                "bonus": "}x Total DMG"
            }),
        new BaseNinjaItemBase(60, <NinjaPristineCharmModel>{
                "internalId": "NjTrP1",
                "itemTypeId": 3,
                "itemType": NinjaItemTypeEnum.PristineCharm,
                "itemId": 1,
                "name": "Fruit Rolle",
                "x1": 20,
                "desc": "Hold down to add this Pristine Charm to your collection in the Lobby. Click it there to see its bonus.",
                "bonus": "+{% AGI"
            }),
        new BaseNinjaItemBase(61, <NinjaPristineCharmModel>{
                "internalId": "NjTrP2",
                "itemTypeId": 3,
                "itemType": NinjaItemTypeEnum.PristineCharm,
                "itemId": 2,
                "name": "Glowing Veil",
                "x1": 40,
                "desc": "Hold down to add this Pristine Charm to your collection in the Lobby. Click it there to see its bonus.",
                "bonus": "}x Artifact Find Chance"
            }),
        new BaseNinjaItemBase(62, <NinjaPristineCharmModel>{
                "internalId": "NjTrP3",
                "itemTypeId": 3,
                "itemType": NinjaItemTypeEnum.PristineCharm,
                "itemId": 3,
                "name": "Cotton Candy",
                "x1": 15,
                "desc": "Hold down to add this Pristine Charm to your collection in the Lobby. Click it there to see its bonus.",
                "bonus": "}x Drop Rate"
            }),
        new BaseNinjaItemBase(63, <NinjaPristineCharmModel>{
                "internalId": "NjTrP4",
                "itemTypeId": 3,
                "itemType": NinjaItemTypeEnum.PristineCharm,
                "itemId": 4,
                "name": "Sugar Bomb",
                "x1": 20,
                "desc": "Hold down to add this Pristine Charm to your collection in the Lobby. Click it there to see its bonus.",
                "bonus": "+{% STR"
            }),
        new BaseNinjaItemBase(64, <NinjaPristineCharmModel>{
                "internalId": "NjTrP5",
                "itemTypeId": 3,
                "itemType": NinjaItemTypeEnum.PristineCharm,
                "itemId": 5,
                "name": "Gumm Eye",
                "x1": 20,
                "desc": "Hold down to add this Pristine Charm to your collection in the Lobby. Click it there to see its bonus.",
                "bonus": "+{% LUK"
            }),
        new BaseNinjaItemBase(65, <NinjaPristineCharmModel>{
                "internalId": "NjTrP6",
                "itemTypeId": 3,
                "itemType": NinjaItemTypeEnum.PristineCharm,
                "itemId": 6,
                "name": "Bubblegum Law",
                "x1": 25,
                "desc": "Hold down to add this Pristine Charm to your collection in the Lobby. Click it there to see its bonus.",
                "bonus": "}x Kill per Kill"
            }),
        new BaseNinjaItemBase(66, <NinjaPristineCharmModel>{
                "internalId": "NjTrP7",
                "itemTypeId": 3,
                "itemType": NinjaItemTypeEnum.PristineCharm,
                "itemId": 7,
                "name": "Sour Wowzer",
                "x1": 50,
                "desc": "Hold down to add this Pristine Charm to your collection in the Lobby. Click it there to see its bonus.",
                "bonus": "+{% Sneaking EXP gain"
            }),
        new BaseNinjaItemBase(67, <NinjaPristineCharmModel>{
                "internalId": "NjTrP8",
                "itemTypeId": 3,
                "itemType": NinjaItemTypeEnum.PristineCharm,
                "itemId": 8,
                "name": "Crystal Comb",
                "x1": 30,
                "desc": "Hold down to add this Pristine Charm to your collection in the Lobby. Click it there to see its bonus.",
                "bonus": "}x Bigger Summoning Winner Bonuses"
            }),
        new BaseNinjaItemBase(68, <NinjaPristineCharmModel>{
                "internalId": "NjTrP9",
                "itemTypeId": 3,
                "itemType": NinjaItemTypeEnum.PristineCharm,
                "itemId": 9,
                "name": "Rock Candy",
                "x1": 50,
                "desc": "Hold down to add this Pristine Charm to your collection in the Lobby. Click it there to see its bonus.",
                "bonus": "+{% Farming EXP gain"
            }),
        new BaseNinjaItemBase(69, <NinjaPristineCharmModel>{
                "internalId": "NjTrP10",
                "itemTypeId": 3,
                "itemType": NinjaItemTypeEnum.PristineCharm,
                "itemId": 10,
                "name": "Lollipop Law",
                "x1": 20,
                "desc": "Hold down to add this Pristine Charm to your collection in the Lobby. Click it there to see its bonus.",
                "bonus": "+{% WIS"
            }),
        new BaseNinjaItemBase(70, <NinjaPristineCharmModel>{
                "internalId": "NjTrP11",
                "itemTypeId": 3,
                "itemType": NinjaItemTypeEnum.PristineCharm,
                "itemId": 11,
                "name": "Taffy Disc",
                "x1": 50,
                "desc": "Hold down to add this Pristine Charm to your collection in the Lobby. Click it there to see its bonus.",
                "bonus": "}x Higher Overgrowth Chance"
            }),
        new BaseNinjaItemBase(71, <NinjaPristineCharmModel>{
                "internalId": "NjTrP12",
                "itemTypeId": 3,
                "itemType": NinjaItemTypeEnum.PristineCharm,
                "itemId": 12,
                "name": "Stick of Chew",
                "x1": 30,
                "desc": "Hold down to add this Pristine Charm to your collection in the Lobby. Click it there to see its bonus.",
                "bonus": "}x All Essence Generation"
            }),
        new BaseNinjaItemBase(72, <NinjaPristineCharmModel>{
                "internalId": "NjTrP13",
                "itemTypeId": 3,
                "itemType": NinjaItemTypeEnum.PristineCharm,
                "itemId": 13,
                "name": "Treat Sack",
                "x1": 40,
                "desc": "Hold down to add this Pristine Charm to your collection in the Lobby. Click it there to see its bonus.",
                "bonus": "}x Jade Coin gain"
            }),
        new BaseNinjaItemBase(73, <NinjaPristineCharmModel>{
                "internalId": "NjTrP14",
                "itemTypeId": 3,
                "itemType": NinjaItemTypeEnum.PristineCharm,
                "itemId": 14,
                "name": "Gumm Stick",
                "x1": 50,
                "desc": "Hold down to add this Pristine Charm to your collection in the Lobby. Click it there to see its bonus.",
                "bonus": "+{% Golden Food bonus"
            }),
        new BaseNinjaItemBase(74, <NinjaPristineCharmModel>{
                "internalId": "NjTrP15",
                "itemTypeId": 3,
                "itemType": NinjaItemTypeEnum.PristineCharm,
                "itemId": 15,
                "name": "Lolly Flower",
                "x1": 25,
                "desc": "Hold down to add this Pristine Charm to your collection in the Lobby. Click it there to see its bonus.",
                "bonus": "+{% Printer Output"
            }),
        new BaseNinjaItemBase(75, <NinjaPristineCharmModel>{
                "internalId": "NjTrP16",
                "itemTypeId": 3,
                "itemType": NinjaItemTypeEnum.PristineCharm,
                "itemId": 16,
                "name": "Gumball Necklace",
                "x1": 40,
                "desc": "Hold down to add this Pristine Charm to your collection in the Lobby. Click it there to see its bonus.",
                "bonus": "}x Money from Monsters"
            }),
        new BaseNinjaItemBase(76, <NinjaPristineCharmModel>{
                "internalId": "NjTrP17",
                "itemTypeId": 3,
                "itemType": NinjaItemTypeEnum.PristineCharm,
                "itemId": 17,
                "name": "Liqorice Rolle",
                "x1": 25,
                "desc": "Hold down to add this Pristine Charm to your collection in the Lobby. Click it there to see its bonus.",
                "bonus": "}x Bigger Bonuses of Non Misc Stamps"
            })    
]
}
