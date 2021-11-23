
"use strict";

var GameLogic = GameLogic || {};


/*
|--------------------------------------------------------------------------
| Fiesta Bingo Pattern Data(Total 6 Patterns) Do Not Modify
|--------------------------------------------------------------------------
*/
GameLogic.Patterns = new Array(6);

GameLogic.PatternNames = {};
GameLogic.PatternNames.SingleLine = 'Single Line';
GameLogic.PatternNames.Corners = 'Corners';
GameLogic.PatternNames.DoubleLine = 'Double Line';
GameLogic.PatternNames.X = 'X';
GameLogic.PatternNames.Perimeter = 'Perimeter';
GameLogic.PatternNames.Coverall = 'Coverall';
GameLogic.PatternNames.NoPattern = '';

GameLogic.Patterns[0] = {};
GameLogic.Patterns[0].Name = GameLogic.PatternNames.SingleLine;
GameLogic.Patterns[0].BaseWager = 100;
GameLogic.Patterns[0].BaseWin = 100;
GameLogic.Patterns[0].Configs = new Array(12); // Line has 10 kinds of variarnt
GameLogic.Patterns[0].Configs[0] = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
];

GameLogic.Patterns[0].Configs[1] = [
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
];
GameLogic.Patterns[0].Configs[2] = [
    [0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
];
GameLogic.Patterns[0].Configs[3] = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0]
];
GameLogic.Patterns[0].Configs[4] = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1]
];
GameLogic.Patterns[0].Configs[5] = [
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0]
];
GameLogic.Patterns[0].Configs[6] = [
    [0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0]
];
GameLogic.Patterns[0].Configs[7] = [
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0]
];
GameLogic.Patterns[0].Configs[8] = [
    [0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0]
];
GameLogic.Patterns[0].Configs[9] = [
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1]
];
GameLogic.Patterns[0].Configs[10] = [
    [1, 0, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 0, 1]
];
GameLogic.Patterns[0].Configs[11] = [
    [0, 0, 0, 0, 1],
    [0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0],
    [1, 0, 0, 0, 0]
];

GameLogic.Patterns[1] = {};
GameLogic.Patterns[1].Name = GameLogic.PatternNames.Corners;
GameLogic.Patterns[1].BaseWin = 200;
GameLogic.Patterns[1].Configs = new Array(1); // Corners has 1 kinds of variarnt
GameLogic.Patterns[1].Configs[0] = [
    [1, 0, 0, 0, 1],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [1, 0, 0, 0, 1]
];

GameLogic.Patterns[2] = {};
GameLogic.Patterns[2].Name = GameLogic.PatternNames.DoubleLine;
GameLogic.Patterns[2].BaseWin = 500;
GameLogic.Patterns[2].Configs = new Array(1); // Two Lines has 1 kinds of variarnt
GameLogic.Patterns[2].Configs[0] = [
    [0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0]
];

GameLogic.Patterns[3] = {};
GameLogic.Patterns[3].Name = GameLogic.PatternNames.X;
GameLogic.Patterns[3].BaseWin = 1000;
GameLogic.Patterns[3].Configs = new Array(1); // X has 10 kinds of variarnt
GameLogic.Patterns[3].Configs[0] = [
    [1, 0, 0, 0, 1],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 0, 1, 0],
    [1, 0, 0, 0, 1]
];


GameLogic.Patterns[4] = {};
GameLogic.Patterns[4].Name = GameLogic.PatternNames.Perimeter;
GameLogic.Patterns[4].BaseWin = 2500;
GameLogic.Patterns[4].Configs = new Array(1); // Perimeter has 10 kinds of variarnt
GameLogic.Patterns[4].Configs[0] = [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1]
];


GameLogic.Patterns[5] = {};
GameLogic.Patterns[5].Name = GameLogic.PatternNames.Coverall;
GameLogic.Patterns[5].BaseWin= 20000;
GameLogic.Patterns[5].Configs = new Array(1); //  has 10 kinds of variarnt
GameLogic.Patterns[5].Configs[0] = [
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1]
];









/*
|--------------------------------------------------------------------------
| Base Config(Cannot be changed)
|--------------------------------------------------------------------------
*/
GameLogic.BaseConfig = {};
GameLogic.BaseConfig._TOTAL_BALLS_AMT = 30;


















/*
|--------------------------------------------------------------------------
| Game Scenario
|--------------------------------------------------------------------------
*/
GameLogic.Scenario = {};
GameLogic.Scenario.Cost = 0;
GameLogic.Scenario.Win = 0;
GameLogic.Scenario.CardBoardAmount = 0;
GameLogic.Scenario.BonusValue = 0;
GameLogic.Scenario.Balls = [];
GameLogic.Scenario.InstantWinNumber = 0;
GameLogic.Scenario.InstantWinBaseAmount = 0;
// 1st Card Board
GameLogic.Scenario.CardBoardOne = {};
GameLogic.Scenario.CardBoardOne.Cards = []; // 25 cards(numbers), from top to bottom, row(5) and col(5), the 12th of card needs to be "Empty" which means you could put any of number but it's a wild card.
GameLogic.Scenario.CardBoardOne.Win = 0;
GameLogic.Scenario.CardBoardOne.PatternName = '';
// 2nd Card Board
GameLogic.Scenario.CardBoardTwo = {};
GameLogic.Scenario.CardBoardTwo.Cards = []; // 25 cards(numbers), from top to bottom, row(5) and col(5), the 12th of card needs to be "Empty" which means you could put any of number but it's a wild card.
GameLogic.Scenario.CardBoardTwo.Win = 0;
GameLogic.Scenario.CardBoardTwo.PatternName = '';

GameLogic.Scenario._ValidateServerData = function(jsonData) {
    // TODO: Validate Cost

    // TODO: Validate Win

    // TODO: Validate Card Board Amount

    // TODO: Validate Bonus Value(Mutiplier)

    // TODO: Validate Balls
    xqu.assert(jsonData.Balls.length == 30, "ValidateServerData: Require 30 Balls, but balls got are " + jsonData.Balls.length);

    // TODO: Validate CardBoard-1
    // sub validation    


    // TODO: Validate CardBoard-2
    // sub validation.


}

// NOTE: This is only for the Server Simulator
GameLogic.Scenario.ProcessDataFromServerSim = function(jsonData) {
    // Validation First
    GameLogic.Scenario._ValidateServerData(jsonData);

    // Update GameLogic Sceneraion Data
    GameLogic.Scenario.Cost = jsonData.Cost;
    GameLogic.Scenario.Win = jsonData.Win;
    GameLogic.Scenario.CardBoardAmount = jsonData.CardBoardAmount;
    GameLogic.Scenario.BonusValue = jsonData.BonusValue;
    GameLogic.Scenario.InstantWinNumber = jsonData.InstantWinNumber;
    GameLogic.Scenario.InstantWinBaseAmount = jsonData.InstantWinBaseAmount;
    GameLogic.Scenario.Balls = jsonData.Balls;
    // 1st Card Board
    GameLogic.Scenario.CardBoardOne = {};
    GameLogic.Scenario.CardBoardOne.Cards = jsonData.CardBoardOne.Cards; 
    GameLogic.Scenario.CardBoardOne.Win = jsonData.CardBoardOne.Win;
    GameLogic.Scenario.CardBoardOne.PatternName = jsonData.CardBoardOne.PatternName;
    // 2nd Card Board
    GameLogic.Scenario.CardBoardTwo = {};
    GameLogic.Scenario.CardBoardTwo.Cards = jsonData.CardBoardTwo.Cards; 
    GameLogic.Scenario.CardBoardTwo.Win = jsonData.CardBoardTwo.Win;
    GameLogic.Scenario.CardBoardTwo.PatternName = jsonData.CardBoardTwo.PatternName;
}


// TODO: Process the data from the real server when game is on the server
GameLogic.Scenario.ProcessDataFromRealServer = function(jsonData) {
    // GameLogic.Scenario.Cost = jsonData.Cost;
    // GameLogic.Scenario.Win = jsonData.Win;
    // GameLogic.Scenario.CardBoardAmount = jsonData.CardBoardAmount;
    // GameLogic.Scenario.BonusValue = jsonData.BonusValue;
    // GameLogic.Scenario.InstantWinNumber = jsonData.InstantWinNumber;
    // GameLogic.Scenario.InstantWinBaseAmount = jsonData.InstantWinBaseAmount;
    // GameLogic.Scenario.Balls = jsonData.Balls;

    // 1st Card Board
    // GameLogic.Scenario.CardBoardOne = {};
    // GameLogic.Scenario.CardBoardOne.Cards = jsonData.CardBoardOne.Cards; 
    // GameLogic.Scenario.CardBoardOne.Win = jsonData.CardBoardOne.Win;
    // GameLogic.Scenario.CardBoardOne.PatternName = jsonData.CardBoardOne.PatternName;

    // 2nd Card Board
    // GameLogic.Scenario.CardBoardTwo = {};
    // GameLogic.Scenario.CardBoardTwo.Cards = jsonData.CardBoardTwo.Cards; 
    // GameLogic.Scenario.CardBoardTwo.Win = jsonData.CardBoardTwo.Win;
    // GameLogic.Scenario.CardBoardTwo.PatternName = jsonData.CardBoardTwo.PatternName;
}

GameLogic.Scenario.Reset =function() {
    GameLogic.Scenario.Cost = 0;
    GameLogic.Scenario.Win = 0;
    GameLogic.Scenario.CardBoardAmount = 0;
    GameLogic.Scenario.Balls = [];

    // 1st Card Board
    GameLogic.Scenario.CardBoardOne.Cards = []; // 25 cards(numbers), from top to bottom, row(5) and col(5), the 12th of card needs to be "Empty" which means you could put any of number but it's a wild card.
    GameLogic.Scenario.CardBoardOne.Win = 0;
    GameLogic.Scenario.CardBoardOne.PatternName = '';
    // 2nd Card Board
    GameLogic.Scenario.CardBoardTwo.Cards = []; // 25 cards(numbers), from top to bottom, row(5) and col(5), the 12th of card needs to be "Empty" which means you could put any of number but it's a wild card.
    GameLogic.Scenario.CardBoardTwo.Win = 0;
    GameLogic.Scenario.CardBoardTwo.PatternName = '';
}

GameLogic.Scenario.GenerateStandloneGameScenario = function() {
    var currentSelectedWager = GameLogic.Wager.GetCurrentWagerAmount();
    GameLogic.Scenario.Cost =  currentSelectedWager;
    GameLogic.Scenario.Win = 0;
    GameLogic.Scenario.CardBoardAmount = ((currentSelectedWager == 100) || (currentSelectedWager == 500)) ? 1 : 2;

    GameLogic.Scenario.BonusValue = 0;

    GameLogic.Scenario.Balls = [];

    // 1st Card Board
    GameLogic.Scenario.CardBoardOne.Cards = []; // 24 cards(numbers)
    GameLogic.Scenario.CardBoardOne.Win = 0;
    GameLogic.Scenario.CardBoardOne.PatternName = '';
    // 2nd Card Board
    GameLogic.Scenario.CardBoardTwo.Cards = []; // 24 cards(numbers)
    GameLogic.Scenario.CardBoardTwo.Win = 0;
    GameLogic.Scenario.CardBoardTwo.PatternName = '';
}


// NOTE: Random Generate numbers for balls and cards
GameLogic.Scenario.GenerateTestGameScenario = function() {
    var currentSelectedWager = GameLogic.Wager.GetCurrentWagerAmount();
    GameLogic.Scenario.Cost =  currentSelectedWager;
    GameLogic.Scenario.Win = 0;
    GameLogic.Scenario.CardBoardAmount = ((currentSelectedWager == 100) || (currentSelectedWager == 500)) ? 1 : 2;

    GameLogic.Scenario.Balls = [];
    // TODO: Test generate randomaly 30 balls here
    for (var i = 0; i < 30; i++) {
        var ranNum = parseInt(Math.random() * (75 - 1) + 1);
        while (GameLogic.Scenario.Balls.indexOf(ranNum) != -1) {
            ranNum = parseInt(Math.random() * (75 - 1) + 1);
        }
        GameLogic.Scenario.Balls.push(ranNum);
        // GameLogic.Scenario.Balls.push(i + 1);
    }

    // 1st Card Board
    GameLogic.Scenario.CardBoardOne.Cards = []; // 24 cards(numbers)
    for (var row = 0; row < 5; row++) {
        for (var col = 0; col < 5; col++) {
            if (col == 0) {
                var ranNum = parseInt(Math.random() * (15 - 1) + 1);
                while (GameLogic.Scenario.CardBoardOne.Cards.indexOf(ranNum) != -1) {
                    ranNum = parseInt(Math.random() * (15 - 1) + 1);
                }
                GameLogic.Scenario.CardBoardOne.Cards.push(ranNum);
            } else if (col == 1) {
                var ranNum = parseInt(Math.random() * (30 - 16) + 16);
                while (GameLogic.Scenario.CardBoardOne.Cards.indexOf(ranNum) != -1) {
                    ranNum = parseInt(Math.random() * (30 - 16) + 16);
                }
                GameLogic.Scenario.CardBoardOne.Cards.push(ranNum);
            } else if (col == 2) {
                var ranNum = parseInt(Math.random() * (45 - 31) + 31);
                while (GameLogic.Scenario.CardBoardOne.Cards.indexOf(ranNum) != -1) {
                    ranNum = parseInt(Math.random() * (45 - 31) + 31);
                }
                GameLogic.Scenario.CardBoardOne.Cards.push(ranNum);
            } else if (col == 3) {
                var ranNum = parseInt(Math.random() * (60 - 46) + 46);
                while (GameLogic.Scenario.CardBoardOne.Cards.indexOf(ranNum) != -1) {
                    ranNum = parseInt(Math.random() * (60 - 46) + 46);
                }
                GameLogic.Scenario.CardBoardOne.Cards.push(ranNum);
            } else if (col == 4) {
                var ranNum = parseInt(Math.random() * (75 - 61) + 61);
                while (GameLogic.Scenario.CardBoardOne.Cards.indexOf(ranNum) != -1) {
                    ranNum = parseInt(Math.random() * (75 - 61) + 61);
                }
                GameLogic.Scenario.CardBoardOne.Cards.push(ranNum);
            }
        }
    }
    GameLogic.Scenario.CardBoardOne.win = 0;
    GameLogic.Scenario.CardBoardOne.PatternName = '';

    // 2nd Card Board
    GameLogic.Scenario.CardBoardTwo.Cards = []; // 24 Cards(numbers)
    for (var row = 0; row < 5; row++) {
        for (var col = 0; col < 5; col++) {
            if (col == 0) {
                var ranNum = parseInt(Math.random() * (15 - 1) + 1);
                while (GameLogic.Scenario.CardBoardTwo.Cards.indexOf(ranNum) != -1) {
                    ranNum = parseInt(Math.random() * (15 - 1) + 1);
                }
                GameLogic.Scenario.CardBoardTwo.Cards.push(ranNum);
            } else if (col == 1) {
                var ranNum = parseInt(Math.random() * (30 - 16) + 16);
                while (GameLogic.Scenario.CardBoardTwo.Cards.indexOf(ranNum) != -1) {
                    ranNum = parseInt(Math.random() * (30 - 16) + 16);
                }
                GameLogic.Scenario.CardBoardTwo.Cards.push(ranNum);
            } else if (col == 2) {
                var ranNum = parseInt(Math.random() * (45 - 31) + 31);
                while (GameLogic.Scenario.CardBoardTwo.Cards.indexOf(ranNum) != -1) {
                    ranNum = parseInt(Math.random() * (45 - 31) + 31);
                }
                GameLogic.Scenario.CardBoardTwo.Cards.push(ranNum);
            } else if (col == 3) {
                var ranNum = parseInt(Math.random() * (60 - 46) + 46);
                while (GameLogic.Scenario.CardBoardTwo.Cards.indexOf(ranNum) != -1) {
                    ranNum = parseInt(Math.random() * (60 - 46) + 46);
                }
                GameLogic.Scenario.CardBoardTwo.Cards.push(ranNum);
            } else if (col == 4) {
                var ranNum = parseInt(Math.random() * (75 - 61) + 61);
                while (GameLogic.Scenario.CardBoardTwo.Cards.indexOf(ranNum) != -1) {
                    ranNum = parseInt(Math.random() * (75 - 61) + 61);
                }
                GameLogic.Scenario.CardBoardTwo.Cards.push(ranNum);
            }
        }
    }
    GameLogic.Scenario.CardBoardTwo.Win = 0;
    GameLogic.Scenario.CardBoardTwo.PatternName = '';
}



// TODO: Generate Test Game Scenario






















/*
|--------------------------------------------------------------------------
| Wager
|--------------------------------------------------------------------------
*/
GameLogic.Wager = {};

GameLogic.Wager.Wagers = [100, 200, 500, 1000];

GameLogic.Wager._CurrentIndex = 0;
GameLogic.Wager.GetCurrentIndex = function() {return GameLogic.Wager._CurrentIndex;}

GameLogic.Wager._CurrentWagerAmount = GameLogic.Wager.Wagers[GameLogic.Wager._CurrentIndex];
GameLogic.Wager.GetCurrentWagerAmount = function() { return GameLogic.Wager._CurrentWagerAmount;}

GameLogic.Wager.GetNextWagerAmount = function() {
    if ((GameLogic.Wager._CurrentIndex + 1) >= GameLogic.Wager.Wagers.length) {
        GameLogic.Wager._CurrentIndex = GameLogic.Wager.Wagers.length - 1;
    } else {
        GameLogic.Wager._CurrentIndex = GameLogic.Wager._CurrentIndex + 1;
    }
    GameLogic.Wager._CurrentWagerAmount = GameLogic.Wager.Wagers[GameLogic.Wager._CurrentIndex];
    return GameLogic.Wager._CurrentWagerAmount;
}

GameLogic.Wager.GetPreWagerAmount = function() {
    if ((GameLogic.Wager._CurrentIndex - 1) >= 0) {
        GameLogic.Wager._CurrentIndex = GameLogic.Wager._CurrentIndex - 1;
    } else {
        GameLogic.Wager._CurrentIndex = 0;
    }

    GameLogic.Wager._CurrentWagerAmount = GameLogic.Wager.Wagers[GameLogic.Wager._CurrentIndex];
    return GameLogic.Wager._CurrentWagerAmount;  
}

GameLogic.Wager.GetMinWagerAmount = function() {
    return GameLogic.Wager.Wagers[0];
}

GameLogic.Wager.GetMaxWagerAmount = function() {
    return GameLogic.Wager.Wagers[GameLogic.Wager.Wagers.length - 1];
}















/*
|--------------------------------------------------------------------------
| Base Payout
|--------------------------------------------------------------------------
*/
GameLogic.BasePayout = {};
for (var wagerIndex = 0; wagerIndex < GameLogic.Wager.Wagers.length; wagerIndex++) {
    var wagerStr = GameLogic.Wager.Wagers[wagerIndex].toString();
    var multi = GameLogic.Wager.Wagers[wagerIndex] / GameLogic.Wager.Wagers[0];
    GameLogic.BasePayout[wagerStr] = {};
    GameLogic.BasePayout[wagerStr][GameLogic.PatternNames.SingleLine]      = 100    * multi;
    GameLogic.BasePayout[wagerStr][GameLogic.PatternNames.Corners]         = 200    * multi;
    GameLogic.BasePayout[wagerStr][GameLogic.PatternNames.DoubleLine]      = 500    * multi;
    GameLogic.BasePayout[wagerStr][GameLogic.PatternNames.X]               = 1000   * multi;
    GameLogic.BasePayout[wagerStr][GameLogic.PatternNames.Perimeter]       = 2500   * multi;
    GameLogic.BasePayout[wagerStr][GameLogic.PatternNames.Coverall]        = 20000  * multi;
}
// GameLogic.BasePayout['100'] = {};
// GameLogic.BasePayout['100'][GameLogic.PatternNames.SingleLine]      = 100;
// GameLogic.BasePayout['100'][GameLogic.PatternNames.Corners]         = 200;
// GameLogic.BasePayout['100'][GameLogic.PatternNames.DoubleLine]      = 500;
// GameLogic.BasePayout['100'][GameLogic.PatternNames.X]               = 1000;
// GameLogic.BasePayout['100'][GameLogic.PatternNames.Perimeter]       = 2500;
// GameLogic.BasePayout['100'][GameLogic.PatternNames.Coverall]        = 20000;




















/*
|--------------------------------------------------------------------------
| Pay Table
|--------------------------------------------------------------------------
*/
// [Tier, Win, Patters(Array)]
GameLogic.PayTables = {};

// One Card Board $1.00
// [Tier, winAmount, [ [PatternName Option 1, BonusMultiplier], [PatternName Option 2, BonusMuliplier], [etc] ]]
GameLogic.PayTables[GameLogic.Wager.Wagers[0].toString()] = [
    [0 , 200000,  [ [GameLogic.PatternNames.Coverall,      10]         ]],
    [1 , 100000,  [ [GameLogic.PatternNames.Coverall,       5]         ]],
    [2 , 80000 ,  [ [GameLogic.PatternNames.Coverall,       4]         ]],
    [3 , 40000 ,  [ [GameLogic.PatternNames.Coverall,       2]         ]],
    [4 , 25000 ,  [ [GameLogic.PatternNames.Perimeter,     10]         ]],
    [5 , 20000 ,  [ [GameLogic.PatternNames.Coverall,       0]         ]],
    [6 , 12500 ,  [ [GameLogic.PatternNames.Perimeter,      5]         ]],
    [7 , 10000 ,  [ [GameLogic.PatternNames.Perimeter,      4], 
                    [GameLogic.PatternNames.X,             10]         ]],
    [8 , 5000  ,  [ [GameLogic.PatternNames.X,              5], 
                    [GameLogic.PatternNames.DoubleLine,    10],
                    [GameLogic.PatternNames.Perimeter,      2]         ]],
    [9 , 4000  ,  [ [GameLogic.PatternNames.X,              4]         ]],
    [10, 2500  ,  [ [GameLogic.PatternNames.Perimeter,      0], 
                    [GameLogic.PatternNames.DoubleLine,     5]         ]],
    [11, 2000  ,  [ [GameLogic.PatternNames.X,              2], 
                    [GameLogic.PatternNames.Corners,       10],
                    [GameLogic.PatternNames.DoubleLine,     4]         ]],                    
    [12, 1000  ,  [ [GameLogic.PatternNames.X,              0], 
                    [GameLogic.PatternNames.SingleLine,    10],
                    [GameLogic.PatternNames.Corners,        5],
                    [GameLogic.PatternNames.DoubleLine,     5]         ]],
    [13, 800   ,  [ [GameLogic.PatternNames.Corners,        4]         ]],
    [14, 500   ,  [ [GameLogic.PatternNames.DoubleLine,     0], 
                    [GameLogic.PatternNames.SingleLine,     5]         
                  ]],
    [15, 400   ,  [ [GameLogic.PatternNames.Corners,        2], 
                    [GameLogic.PatternNames.SingleLine,     4]         ]],
    [16, 200   ,  [ [GameLogic.PatternNames.Corners,        0], 
                    [GameLogic.PatternNames.SingleLine,     2]         ]],

    [17, 100   ,  [ [GameLogic.PatternNames.SingleLine,     0]         ]]
];   

// One Card Board $5.00
// [Tier, winAmount, [ [PatternName Option 1, BonusMultiplier], [PatternName Option 2, BonusMuliplier], [etc] ]]
GameLogic.PayTables[GameLogic.Wager.Wagers[2].toString()] = [
    [0 , 200000 * 5,  [ [GameLogic.PatternNames.Coverall,      10]         ]],
    [1 , 100000 * 5,  [ [GameLogic.PatternNames.Coverall,       5]         ]],
    [2 , 80000  * 5,  [ [GameLogic.PatternNames.Coverall,       4]         ]],
    [3 , 40000  * 5,  [ [GameLogic.PatternNames.Coverall,       2]         ]],
    [4 , 25000  * 5,  [ [GameLogic.PatternNames.Perimeter,     10]         ]],
    [5 , 20000  * 5,  [ [GameLogic.PatternNames.Coverall,       0]         ]],
    [6 , 12500  * 5,  [ [GameLogic.PatternNames.Perimeter,      5]         ]],
    [7 , 10000  * 5,  [ [GameLogic.PatternNames.Perimeter,      4], 
                        [GameLogic.PatternNames.X,             10]         ]],
    [8 , 5000   * 5,  [ [GameLogic.PatternNames.X,              5], 
                        [GameLogic.PatternNames.DoubleLine,    10],
                        [GameLogic.PatternNames.Perimeter,      2]         ]],
    [9 , 4000   * 5,  [ [GameLogic.PatternNames.X,              4]         ]],
    [10, 2500   * 5,  [ [GameLogic.PatternNames.Perimeter,      0], 
                        [GameLogic.PatternNames.DoubleLine,     5]         ]],
    [11, 2000   * 5,  [ [GameLogic.PatternNames.X,              2], 
                        [GameLogic.PatternNames.Corners,       10],
                        [GameLogic.PatternNames.DoubleLine,     4]         ]],                    
    [12, 1000   * 5,  [ [GameLogic.PatternNames.X,              0], 
                        [GameLogic.PatternNames.SingleLine,    10],
                        [GameLogic.PatternNames.Corners,        5],
                        [GameLogic.PatternNames.DoubleLine,     5]         ]],
    [13, 800    * 5,  [ [GameLogic.PatternNames.Corners,        4]         ]],
    [14, 500    * 5,  [ [GameLogic.PatternNames.DoubleLine,     0], 
                        [GameLogic.PatternNames.SingleLine,     5]         ]],
    [15, 400    * 5,  [ [GameLogic.PatternNames.Corners,        2], 
                        [GameLogic.PatternNames.SingleLine,     4]         ]],
    [16, 200    * 5,  [ [GameLogic.PatternNames.Corners,        0], 
                        [GameLogic.PatternNames.SingleLine,     2]         ]],
    [17, 100    * 5,  [ [GameLogic.PatternNames.SingleLine,     0]         ]]
];   


// Two Cards Board $2.00
// [Tier, winAmount, [ [PatternName for Card 1, PatternName for Card 2, BonusMultiplier], [PatternName Card 1, PatternName Card 2, BonusMuliplier], [etc] ]]
GameLogic.PayTables[GameLogic.Wager.Wagers[1].toString()] = [
    [0 , 400000 * 1,  [ [GameLogic.PatternNames.Coverall   ,    GameLogic.PatternNames.NoPattern   ,             10],
                        [GameLogic.PatternNames.Coverall   ,    GameLogic.PatternNames.Coverall    ,              5]       
                    ]],
    [1 , 200000 * 1,  [ [GameLogic.PatternNames.Coverall   ,    GameLogic.PatternNames.NoPattern   ,              5]       ]],
    [2 , 160000 * 1,  [ [GameLogic.PatternNames.Coverall   ,    GameLogic.PatternNames.NoPattern   ,              4],
                        [GameLogic.PatternNames.Coverall   ,    GameLogic.PatternNames.Coverall    ,              2]       ]],
    [3 , 80000  * 1,  [ [GameLogic.PatternNames.Coverall   ,    GameLogic.PatternNames.NoPattern   ,              2],
                        [GameLogic.PatternNames.Coverall   ,    GameLogic.PatternNames.Coverall    ,              0]       ]],
    [4 , 50000  * 1,  [ [GameLogic.PatternNames.Perimeter  ,    GameLogic.PatternNames.NoPattern   ,             10],
                        [GameLogic.PatternNames.Perimeter  ,    GameLogic.PatternNames.Perimeter   ,              5]       ]],
    [5 , 40000  * 1,  [ [GameLogic.PatternNames.Coverall   ,    GameLogic.PatternNames.NoPattern   ,              0],
                        [GameLogic.PatternNames.X          ,    GameLogic.PatternNames.X           ,             10],
                        [GameLogic.PatternNames.Perimeter  ,    GameLogic.PatternNames.Perimeter   ,              4]       ]],
    [6 , 25000  * 1,  [ [GameLogic.PatternNames.Perimeter  ,    GameLogic.PatternNames.NoPattern   ,              5]       ]],
    [7 , 20000  * 1,  [ [GameLogic.PatternNames.X          ,    GameLogic.PatternNames.NoPattern   ,             10],
                        [GameLogic.PatternNames.Perimeter  ,    GameLogic.PatternNames.NoPattern   ,              4],
                        [GameLogic.PatternNames.DoubleLine ,    GameLogic.PatternNames.DoubleLine  ,             10],
                        [GameLogic.PatternNames.X          ,    GameLogic.PatternNames.X           ,              5],
                        [GameLogic.PatternNames.Perimeter  ,    GameLogic.PatternNames.Perimeter   ,              2]       ]],
    [8 , 10000  * 1,  [ [GameLogic.PatternNames.X          ,    GameLogic.PatternNames.NoPattern   ,              5],
                        [GameLogic.PatternNames.Perimeter  ,    GameLogic.PatternNames.NoPattern   ,              2],
                        [GameLogic.PatternNames.DoubleLine ,    GameLogic.PatternNames.NoPattern   ,             10],
                        [GameLogic.PatternNames.Perimeter  ,    GameLogic.PatternNames.Perimeter   ,              0]       ]],
    [9 , 8000   * 1,  [ [GameLogic.PatternNames.X          ,    GameLogic.PatternNames.NoPattern   ,              4],
                        [GameLogic.PatternNames.X          ,    GameLogic.PatternNames.X           ,              2],
                        [GameLogic.PatternNames.Corners    ,    GameLogic.PatternNames.Corners     ,             10],
                        [GameLogic.PatternNames.DoubleLine ,    GameLogic.PatternNames.DoubleLine  ,              4]       ]],
    [10, 5000   * 1,  [ [GameLogic.PatternNames.Perimeter  ,    GameLogic.PatternNames.NoPattern   ,              0],
                        [GameLogic.PatternNames.DoubleLine ,    GameLogic.PatternNames.DoubleLine  ,              5]       ]],
    [11, 4000   * 1,  [ [GameLogic.PatternNames.X          ,    GameLogic.PatternNames.NoPattern   ,              2],
                        [GameLogic.PatternNames.X          ,    GameLogic.PatternNames.X           ,              0],
                        [GameLogic.PatternNames.Corners    ,    GameLogic.PatternNames.NoPattern   ,             10],
                        [GameLogic.PatternNames.DoubleLine ,    GameLogic.PatternNames.NoPattern   ,              4],
                        [GameLogic.PatternNames.DoubleLine ,    GameLogic.PatternNames.DoubleLine  ,              2],
                        [GameLogic.PatternNames.SingleLine ,    GameLogic.PatternNames.SingleLine  ,             10],
                        [GameLogic.PatternNames.Corners    ,    GameLogic.PatternNames.Corners     ,              5]       ]],
    [12, 2000   * 1,  [ [GameLogic.PatternNames.X          ,    GameLogic.PatternNames.NoPattern   ,              0],
                        [GameLogic.PatternNames.SingleLine ,    GameLogic.PatternNames.NoPattern   ,             10],
                        [GameLogic.PatternNames.Corners    ,    GameLogic.PatternNames.NoPattern   ,              5],
                        [GameLogic.PatternNames.DoubleLine ,    GameLogic.PatternNames.NoPattern   ,              2],
                        [GameLogic.PatternNames.DoubleLine ,    GameLogic.PatternNames.DoubleLine  ,              0],
                        [GameLogic.PatternNames.SingleLine ,    GameLogic.PatternNames.SingleLine  ,              5]       ]],
    [13, 1600   * 1,  [ [GameLogic.PatternNames.Corners    ,    GameLogic.PatternNames.NoPattern   ,              4],
                        [GameLogic.PatternNames.Corners    ,    GameLogic.PatternNames.Corners     ,              2],
                        [GameLogic.PatternNames.SingleLine ,    GameLogic.PatternNames.SingleLine  ,              4]       ]],
    [14, 1000   * 1,  [ [GameLogic.PatternNames.DoubleLine ,    GameLogic.PatternNames.NoPattern   ,              0],
                        [GameLogic.PatternNames.SingleLine ,    GameLogic.PatternNames.NoPattern   ,              5]       ]],
    [15, 800    * 1,  [ [GameLogic.PatternNames.Corners    ,    GameLogic.PatternNames.NoPattern   ,              2],
                        [GameLogic.PatternNames.SingleLine ,    GameLogic.PatternNames.NoPattern   ,              4],
                        [GameLogic.PatternNames.Corners    ,    GameLogic.PatternNames.Corners     ,              0],
                        [GameLogic.PatternNames.SingleLine ,    GameLogic.PatternNames.SingleLine  ,              2]       ]],
    [16, 400    * 1,  [ [GameLogic.PatternNames.Corners    ,    GameLogic.PatternNames.NoPattern   ,              0],
                        [GameLogic.PatternNames.SingleLine ,    GameLogic.PatternNames.NoPattern   ,              2],
                        [GameLogic.PatternNames.SingleLine ,    GameLogic.PatternNames.SingleLine  ,              0]       ]],
    [17, 200    * 1,  [ [GameLogic.PatternNames.SingleLine ,    GameLogic.PatternNames.NoPattern   ,              0]       ]],
];   





// Two Cards Board $10.00
// [Tier, winAmount, [ [PatternName for Card 1, PatternName for Card 2, BonusMultiplier], [PatternName Card 1, PatternName Card 2, BonusMuliplier], [etc] ]]
GameLogic.PayTables[GameLogic.Wager.Wagers[3].toString()] = [
    [0 , 400000 * 5,  [ [GameLogic.PatternNames.Coverall   ,    GameLogic.PatternNames.NoPattern   ,             10],
                        [GameLogic.PatternNames.Coverall   ,    GameLogic.PatternNames.Coverall    ,              5]       ]],
    [1 , 200000 * 5,  [ [GameLogic.PatternNames.Coverall   ,    GameLogic.PatternNames.NoPattern   ,              5]       ]],
    [2 , 160000 * 5,  [ [GameLogic.PatternNames.Coverall   ,    GameLogic.PatternNames.NoPattern   ,              4],
                        [GameLogic.PatternNames.Coverall   ,    GameLogic.PatternNames.Coverall    ,              2]       ]],
    [3 , 80000  * 5,  [ [GameLogic.PatternNames.Coverall   ,    GameLogic.PatternNames.NoPattern   ,              2],
                        [GameLogic.PatternNames.Coverall   ,    GameLogic.PatternNames.Coverall    ,              0]       ]],
    [4 , 50000  * 5,  [ [GameLogic.PatternNames.Perimeter  ,    GameLogic.PatternNames.NoPattern   ,             10],
                        [GameLogic.PatternNames.Perimeter  ,    GameLogic.PatternNames.Perimeter   ,              5]       ]],
    [5 , 40000  * 5,  [ [GameLogic.PatternNames.Coverall   ,    GameLogic.PatternNames.NoPattern   ,              0],
                        [GameLogic.PatternNames.X          ,    GameLogic.PatternNames.X           ,             10],
                        [GameLogic.PatternNames.Perimeter  ,    GameLogic.PatternNames.Perimeter   ,              4]       ]],
    [6 , 25000  * 5,  [ [GameLogic.PatternNames.Perimeter  ,    GameLogic.PatternNames.NoPattern   ,              5]       ]],
    [7 , 20000  * 5,  [ [GameLogic.PatternNames.X          ,    GameLogic.PatternNames.NoPattern   ,             10],
                        [GameLogic.PatternNames.Perimeter  ,    GameLogic.PatternNames.NoPattern   ,              4],
                        [GameLogic.PatternNames.DoubleLine ,    GameLogic.PatternNames.DoubleLine  ,             10],
                        [GameLogic.PatternNames.X          ,    GameLogic.PatternNames.X           ,              5],
                        [GameLogic.PatternNames.Perimeter  ,    GameLogic.PatternNames.Perimeter   ,              2]       ]],
    [8 , 10000  * 5,  [ [GameLogic.PatternNames.X          ,    GameLogic.PatternNames.NoPattern   ,              5],
                        [GameLogic.PatternNames.Perimeter  ,    GameLogic.PatternNames.NoPattern   ,              2],
                        [GameLogic.PatternNames.DoubleLine ,    GameLogic.PatternNames.NoPattern   ,             10],
                        [GameLogic.PatternNames.Perimeter  ,    GameLogic.PatternNames.Perimeter   ,              0]       ]],
    [9 , 8000   * 5,  [ [GameLogic.PatternNames.X          ,    GameLogic.PatternNames.NoPattern   ,              4],
                        [GameLogic.PatternNames.X          ,    GameLogic.PatternNames.X           ,              2],
                        [GameLogic.PatternNames.Corners    ,    GameLogic.PatternNames.Corners     ,             10],
                        [GameLogic.PatternNames.DoubleLine ,    GameLogic.PatternNames.DoubleLine  ,              4]       ]],
    [10, 5000   * 5,  [ [GameLogic.PatternNames.Perimeter  ,    GameLogic.PatternNames.NoPattern   ,              0],
                        [GameLogic.PatternNames.DoubleLine ,    GameLogic.PatternNames.DoubleLine  ,              5]       ]],
    [11, 4000   * 5,  [ [GameLogic.PatternNames.X          ,    GameLogic.PatternNames.NoPattern   ,              2],
                        [GameLogic.PatternNames.X          ,    GameLogic.PatternNames.X           ,              0],
                        [GameLogic.PatternNames.Corners    ,    GameLogic.PatternNames.NoPattern   ,             10],
                        [GameLogic.PatternNames.DoubleLine ,    GameLogic.PatternNames.NoPattern   ,              4],
                        [GameLogic.PatternNames.DoubleLine ,    GameLogic.PatternNames.DoubleLine  ,              2],
                        [GameLogic.PatternNames.SingleLine ,    GameLogic.PatternNames.SingleLine  ,             10],
                        [GameLogic.PatternNames.Corners    ,    GameLogic.PatternNames.Corners     ,              5]       ]],
    [12, 2000   * 5,  [ [GameLogic.PatternNames.X          ,    GameLogic.PatternNames.NoPattern   ,              0],
                        [GameLogic.PatternNames.SingleLine ,    GameLogic.PatternNames.NoPattern   ,             10],
                        [GameLogic.PatternNames.Corners    ,    GameLogic.PatternNames.NoPattern   ,              5],
                        [GameLogic.PatternNames.DoubleLine ,    GameLogic.PatternNames.NoPattern   ,              2],
                        [GameLogic.PatternNames.DoubleLine ,    GameLogic.PatternNames.DoubleLine  ,              0],
                        [GameLogic.PatternNames.SingleLine ,    GameLogic.PatternNames.SingleLine  ,              5]       ]],
    [13, 1600   * 5,  [ [GameLogic.PatternNames.Corners    ,    GameLogic.PatternNames.NoPattern   ,              4],
                        [GameLogic.PatternNames.Corners    ,    GameLogic.PatternNames.Corners     ,              2],
                        [GameLogic.PatternNames.SingleLine ,    GameLogic.PatternNames.SingleLine  ,              4]       ]],
    [14, 1000   * 5,  [ [GameLogic.PatternNames.DoubleLine ,    GameLogic.PatternNames.NoPattern   ,              0],
                        [GameLogic.PatternNames.SingleLine ,    GameLogic.PatternNames.NoPattern   ,              5]       ]],
    [15, 800    * 5,  [ [GameLogic.PatternNames.Corners    ,    GameLogic.PatternNames.NoPattern   ,              2],
                        [GameLogic.PatternNames.SingleLine ,    GameLogic.PatternNames.NoPattern   ,              4],
                        [GameLogic.PatternNames.Corners    ,    GameLogic.PatternNames.Corners     ,              0],
                        [GameLogic.PatternNames.SingleLine ,    GameLogic.PatternNames.SingleLine  ,              2]       ]],
    [16, 400    * 5,  [ [GameLogic.PatternNames.Corners    ,    GameLogic.PatternNames.NoPattern   ,              0],
                        [GameLogic.PatternNames.SingleLine ,    GameLogic.PatternNames.NoPattern   ,              2],
                        [GameLogic.PatternNames.SingleLine ,    GameLogic.PatternNames.SingleLine  ,              0]       ]],
    [17, 200    * 5,  [ [GameLogic.PatternNames.SingleLine ,    GameLogic.PatternNames.NoPattern   ,              0]       ]],
];   














/*
|--------------------------------------------------------------------------
| Find Patterns
| cards  : An 1D array of 25 numbers.
| balls  : Any dynamic 1D array of (up to) 30 numbers
| return : If found, then return an 1D array which contains the numbers of index of cards
|          If not found, then return null;
| Note   : Find Single Line will return a 2D array(could include multiple lines)
|--------------------------------------------------------------------------
*/


GameLogic._FindPatternByName = function(patternName, cards, balls) {

    var patternIndex = GameLogic.FindPatternIndex(patternName);
    var pattern = GameLogic.Patterns[patternIndex];
    var configs = pattern.Configs;

    var result = null;

    for (var i = 0; i < configs.length; i++) {
        var config = configs[i];
        result = {};
        result.patternIndex = patternIndex;
        result.name = patternName;
        result.configIndex = i;
        result.cardIndice = [];

        var cardIndex = -1;
        var notMatch = false;

        for (var rowIndex = 0; rowIndex < config.length; rowIndex++) {
            var row = config[rowIndex];
            for (var colIndex = 0; colIndex < row.length; colIndex++) {
                cardIndex++;
                var card = cards[cardIndex];
                if (row[colIndex] == 1) {
                    if (balls.indexOf(card) != -1 || (cardIndex == 12)) {
                        result.cardIndice.push(cardIndex);
                    } else {
                        notMatch = true;
                    }
                }
            }
        } // for cards

        if (notMatch) {
            result = null;
        } else {
            return result;
        }
    } // for configs

    return result;
}


// NOTE: Find the most high priority pattern, ingore the rest
GameLogic.FindPattern = function(cards, balls) {
    if (cards.length != 25) {
        xqu.log(cards);
        xqu.assert(false, 'GameLogic.FindPattern : Cards needs 25 numbers in total, cards is above ');
        return null;
    }
    if (balls.length < 1) {
        xqu.log(balls);
        xqu.assert(false, 'GameLogic.FindPattern : Ball needs at least 1 ball');
        return null;
    }


    var patternFound = {};

    var patternName = GameLogic.PatternNames.Coverall;
    patternFound = GameLogic._FindPatternByName(patternName, cards, balls);
    if (patternFound != null) {
        return patternFound;
    }

    patternName = GameLogic.PatternNames.Perimeter;
    patternFound = GameLogic._FindPatternByName(patternName, cards, balls);
    if (patternFound != null) {
        return patternFound;
    }

    patternName = GameLogic.PatternNames.X;
    patternFound = GameLogic._FindPatternByName(patternName, cards, balls);
    if (patternFound != null) {
        return patternFound;
    }

    patternName = GameLogic.PatternNames.DoubleLine;
    patternFound = GameLogic._FindPatternByName(patternName, cards, balls);
    if (patternFound != null) {
        return patternFound;
    }

    patternName = GameLogic.PatternNames.Corners;
    patternFound = GameLogic._FindPatternByName(patternName, cards, balls);
    if (patternFound != null) {
        return patternFound;
    }

    patternName = GameLogic.PatternNames.SingleLine;
    patternFound = GameLogic._FindPatternByName(patternName, cards, balls);
    if (patternFound != null) {
        return patternFound;
    }

    return null;
}




// NOTE: Find all patterns
GameLogic.FindAllPatterns = function(cards, balls) {
    if (cards.length != 25) {
        xqu.log(cards);
        xqu.assert(false, 'GameLogic.FindPattern : Cards needs 25 numbers in total, cards is above ');
        return null;
    }
    if (balls.length < 1) {
        xqu.log(balls);
        xqu.assert(false, 'GameLogic.FindPattern : Ball needs at least 1 ball');
        return null;
    }


    var patternsFound = new Array();
    var patternFound = {};


    patternFound.cardIndice = GameLogic._FindCoverAll(cards, balls);
    if (patternFound.cardIndice != null) {
        patternFound.name = GameLogic.PatternNames.Coverall;
        patternsFound.push(patternFound);
    }

    patternFound = {};
    patternFound.cardIndice = GameLogic._FindPerimeter(cards, balls);
    if (patternFound.cardIndice != null) {
        patternFound.name = GameLogic.PatternNames.Perimeter
        patternsFound.push(patternFound);
    }

    patternFound = {};
    patternFound.cardIndice = GameLogic._FindX(cards, balls);
    if (patternFound.cardIndice != null) {
        patternFound.name = GameLogic.PatternNames.X
        patternsFound.push(patternFound);
    }

    patternFound = {};
    patternFound.cardIndice = GameLogic._FindDoubleLine(cards, balls);
    if (patternFound.cardIndice != null) {
        patternFound.name = GameLogic.PatternNames.DoubleLine
        patternsFound.push(patternFound);
    }

    patternFound = {};
    patternFound.cardIndice = GameLogic._FindCorners(cards, balls);
    if (patternFound.cardIndice != null) {
        patternFound.name = GameLogic.PatternNames.Corners;
        patternsFound.push(patternFound);
    }
    
    patternFound = {};
    patternFound.cardIndice = GameLogic._FindSingleLines(cards, balls);
    if (patternFound.cardIndice != null) {
        patternFound.name = GameLogic.PatternNames.SingleLine;
        patternsFound.push(patternFound);
    }

    return patternsFound;
}



GameLogic.FindPatternIndex = function(patternName) {
    var patternIndex = -1;

    switch(patternName) {
        case GameLogic.PatternNames.SingleLine:
            patternIndex = 0;
            break;

        case GameLogic.PatternNames.Corners:
            patternIndex = 1;
            break;

        case GameLogic.PatternNames.DoubleLine:
            patternIndex = 2;
            break;

        case GameLogic.PatternNames.X:
            patternIndex = 3;
            break;

        case GameLogic.PatternNames.Perimeter:
            patternIndex = 4;
            break;
        
        case GameLogic.PatternNames.Coverall:
            patternIndex = 5;
            break;

        default:
            xqu.assert(false, "GameServerSim._GenerateBallsAndCards_OneBoard: Cannot find pattern name - " + patternName);
            break;
    }

    return patternIndex;
}


GameLogic.FindMatchCardAmountInPattern = function(patternIndex, configIndex) {
    var config = GameLogic.Patterns[patternIndex].Configs[configIndex];

    var matchAmount = 0;

    for (var rowIndex = 0; rowIndex < config.length; rowIndex++) {
        var row = config[rowIndex];
        for (var colIndex = 0; colIndex < row.length; colIndex++) {
            var matchIndicator = row[colIndex];
            if (matchIndicator == 1) {
                if ((rowIndex == 2) && (colIndex == 2)) {
                    continue;
                } else {
                    matchAmount++;
                }
            }
        }
    }  // for config

    return matchAmount;
}