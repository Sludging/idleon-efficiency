We've got basic paramter tests going for meal speed calculations.

Based on that we got the following output:

```
    Parameter validation failed:
       mealCookVialBonus: expected 426.2399999999999 to match live game value 483.84000000000003 within 5%, but difference was 11.9048%
       cropSc3Bonus: expected 14148155.655669864 to match live game value 19382973.248267714 within 5%, but difference was 27.0073%
       enhancedTalent146Bonus: expected 14.936708860759493 to match live game value 106.7189571633598 within 5%, but difference was 86.0037%
       mealBonusZMealFarm: expected 9080.311679999999 to match live game value 21338.732448000006 within 5%, but difference was 57.4468%
       alchBubblesMealSpdzBonus: expected 30989739.6167676 to match live game value 4.5732783649712787e+27 within 5%, but difference was 100.0000%
       alchVials6turtleBonus: expected 230.87999999999997 to match live game value 262.08 within 5%, but difference was 11.9048%
       alchVialsMealCookBonus: expected 426.2399999999999 to match live game value 483.84000000000003 within 5%, but difference was 11.9048%
       mealBonusMcook: expected 15209.522064 to match live game value 28380.514155840006 within 5%, but difference was 46.4086%
       lampBonus0: expected 9 to match live game value 400 within 5%, but difference was 97.7500%
       alchVials6cookspdBonus: expected 288.59999999999997 to match live game value 327.6 within 5%, but difference was 11.9048%
       mealBonusKitchenEff: expected 1135.0389599999999 to match live game value 2122.5228552000003 within 5%, but difference was 46.5241%
```

This means we have the following domain tests to write and based on that fix implementations:
* Enhanced talents - We don't support these at all yet, good to implement and test (might uncover more talent fixes like max level)
* Farming crop scientist bonus 
* Alchemy[Vials]
* Alchemy[Bubbles] - Things like primsmatic bonuses are obvious gaps
* Cooking - Meal bonuses aren't correct, probably ribbons
* Hole - Lamp bonuses are wrong, which makes sense since they aren't implemented.
