// functions for the game
let winConditions = [ [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6] ];
let squareCount = 9;
let squares = document.getElementsByClassName("square");
let gameOver = false;
let gameTied = false;
let cutLosers = false;
let cutLosers1 = false;
let cutLosers2 = false;

// Agent Name, Difficulty, Probability (0 if the function doesn't use a probability), if they Won or not.
let Agent0 = ["Agent0", "miniMax", 0, ""];
let Agent1 = ["Agent1", "nextSquare", 0, ""];
let Agent2 = ["Agent2", "blindRandom", 0, ""];
let Agent3 = ["Agent3", "probability", 30, ""];
let Agent4 = ["Agent4", "probability", 40, ""];
let Agent5 = ["Agent5", "probability", 30, ""];
let Agent6 = ["Agent6", "blindRandom", 0,""];
let Agent7 = ["Agent7", "probability", 30, ""];
let Agent8 = ["Agent8", "probability", 40, ""];
let Agent9 = ["Agent9", "probability", 50, ""];
let Agent10 = ["Agent10", "probability", 60, ""];
let Agent11 = ["Agent11", "probability", 80, ""];
let Agent12 = ["Agent12", "nextSquare", 0, ""];
let Agent13 = ["Agent13", "probability", 70, ""];
let Agent14 = ["Agent14", "probability", 60, ""];
let Agent15 = ["Agent15", "probability", 10, ""];

let player1Symbol = "X";
let player1Name;
let player1difficulty;
let player1Probability;

let player2Symbol = "O";
let player2Name;
let player2difficulty;
let player2Probability;

let agentName;
let difficulty = "";
let AgentProbability;
let currentSymbol = "";

let player1Index=0;
let player2Index=1;

let gameIndex = 0;
let winner = "";

let roundCounter = 0;

let currentBracket;
let tournamentContenders = [Agent0, Agent1, Agent2, Agent3, Agent4, Agent5, Agent6, Agent7,
    Agent8, Agent9, Agent10, Agent11, Agent12, Agent13, Agent14, Agent15];
let tempContenders = [];

let elite8 = [];
let final4 = [];
let top2 = [];

// sets the message to who won the game
let setMessageBox = function( caption )
{
    let messageBox = document.getElementById( "messageBox" );
    messageBox.innerHTML = caption;
};

// returns the squares that have something in them (so the AI can know if they are allowed to go there)
let findClaimedSquares = function( marker )
{
    let claimedSquares = [];
    let value;

    for( let id = 0; id < squareCount; id++ )
    {
        value = document.getElementById( id ).innerHTML;
        if( value === marker )
        {
            claimedSquares.push(id);
        }
    }

    return claimedSquares;
}

// reloads the page (bad practice, but easiest way to go about it and it isn't a super important feature in the project)
let resetTournament = function()
{
    document.location.reload();
}

// button to start the next game in the tournament
let nextGame = function()
{
    let gameButton = document.getElementById("gameButton");
    gameButton.innerText = "Next Game";

    for( let id = 0; id < squareCount; id++ )
    {
        let square = document.getElementById( id );
        square.innerHTML = "";
        square.style.backgroundColor = "darkgray";
    }

    playerBracket();
    let vsLabel = document.getElementById("vsLabel");
    vsLabel.innerText = player1Name + " vs. " + player2Name;

    setMessageBox("");

    gameIndex = 0;
    gameOver = false;
    playGame();
}

// checks to see if there are any consecutive X's or O's on the board to determine a winner
let checkForWinCondition = function( marker )
{
    let claimedSquares = findClaimedSquares( marker );

    let win = false;
    for( let i = 0; i < winConditions.length; i++ )
    {
        win = winConditions[i].every( element => claimedSquares.indexOf( element ) > -1 );
        if( win )
        {
            win = winConditions[i];
            break;
        }
    }
    return win;
};

let bestMoveFunction = function()
{
    let moveMade = secureWin()
    if( !moveMade )
    {
        moveMade = preventDefeat();
        if( !moveMade )
        {
            let center = document.getElementById( 4 );
            if( squareIsOpen( center  ) )
            {
                center.innerHTML = currentSymbol;
            }
            else
            {
                makeMoveAtFirstAvailableSquare();
            }
        }
    }
}

let gameMoves = function()
{
    if( difficulty === "nextSquare" )
    {
        makeMoveAtFirstAvailableSquare();
    }
    else if( difficulty === "miniMax")
    {
        bestMoveFunction();
    }
    else if( difficulty === "blindRandom")
    {
        makeRandomMove();
    }
    else if( difficulty === "probability")
    {
        makeProbabilityMove();
    }
}

let secureWin = function()
{
    return makeMove( player2Symbol );
}

let preventDefeat = function()
{
    return makeMove( player1Symbol );
}

let makeMove = function( marker )
{
    let moveMade = false;
    for( let i = 0; i < winConditions.length; i++ )
    {
        let count = 0;
        for( let j = 0; j < winConditions[i].length; j++ )
        {
            if(  marker === document.getElementById( winConditions[i][j] ).innerHTML )
            {
                count++;
            }
        }

        if( count == 2 )
        {
            for( j = 0; j < winConditions[i].length; j++ )
            {
                let square = document.getElementById( winConditions[i][j] )
                if( squareIsOpen( square ) )
                {
                    square.innerHTML = currentSymbol;
                    moveMade = true;
                    break;
                }
            }
        }

        if( moveMade )
        {
            break;
        }
    }
    return moveMade;
}

// makes the first possible move on the board from top left most square all the way to bottom right most square.
let makeMoveAtFirstAvailableSquare = function()
{
    for( let id = 0; id < squareCount; id++ )
    {
        square = document.getElementById( id );
        if( squareIsOpen( square ) )
        {
            square.innerHTML = currentSymbol;
            break;
        }
    }
}

// minimax function for Agent 0
miniMaxFunction = function ()
{
    let bestscore = -1000;
    let bestMove = 0;

    let possibleSquares = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    let board = [];

    for(let square=0; square<possibleSquares.length; square++)
    {
        square = document.getElementById( square );
        if( squareIsOpen( square ))
        {
            board[square] = "O";
            let score = miniMax(board, 0, false)
            board[square] = ""
            if(score > bestscore)
            {
                bestscore = score
                bestMove = square
            }
        }
    }
    moveMade = bestMove
}

// minimax algorithm called by the minimax function
let miniMax = function (board, depth, isMaximizing)
{
    if(checkBoardWIthSymbol(player1Symbol) === true)
    {
        return 10;
    }
    else if(checkBoardWIthSymbol(player2Symbol) === true)
    {
        return -10;
    }
    else if(checkForDraw())
    {
        return 0;
    }

    if(isMaximizing)
    {
        let bestscore = -1000;

        let possibleSquares = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        let board = [];

        for(let square=0; square<possibleSquares.length; square++)
        {
            square = document.getElementById( square );
            if( squareIsOpen( square ))
            {
                board[square] = "O";
                let score = miniMax(board, 0, false)
                board[square] = ""
                if(score > bestscore)
                {
                    bestscore = score
                }
            }
        }
        return bestscore
    }
    else
    {
        let bestscore = 1000;

        let possibleSquares = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        let board = [];

        for(let square=0; square<possibleSquares.length; square++)
        {
            square = document.getElementById( square );
            if( squareIsOpen( square ))
            {
                board[square] = "X";
                let score = miniMax(board, depth + 1, true)
                board[square] = ""
                if(score > bestscore)
                {
                    bestscore = score
                }
            }
        }
    }

}

let checkBoardWIthSymbol = function (symbolForMinimax)
{
    for(let i =0; i<winConditions.length; i++)
    {
        if((winConditions[i][1] === symbolForMinimax) && (winConditions[i][2] === symbolForMinimax)
            && (winConditions[i][3] === symbolForMinimax))
        {
            return true;

        }
    }
    return false;
}


// tests a random move until that move can be made. For each move that cannot be made,
// that move is taken out of the random squares array. This is in order to ensure a move can be made within 9 iterations
// and stops the function from running infinitely. If it cannot find a move in 9 iterations, then the game is over.
let makeRandomMove = function()
{
    let possibleSquares = [0,1,2,3,4,5,6,7,8];
    let counter = 0;
    let moveMade = false;
    while (moveMade === false)
    {
        let randomSquare = possibleSquares[Math.floor(Math.random() * possibleSquares.length)];

        let square = document.getElementById( randomSquare );
        if( squareIsOpen( square ))
        {
            square.innerHTML = currentSymbol;
            moveMade = true;
        }
        else if(counter < 9)
        {
            counter++;
            possibleSquares.splice(randomSquare, 1);
        }
        else if(counter === 9)
        {
            moveMade = true;
        }
    }
}

// if the random number is less than or equal to the probability percent,
// then make the best move, otherwise make a random move
let makeProbabilityMove = function()
{
    if (Math.random()*100 <= AgentProbability)
    {
        miniMaxFunction();
    }
    else
    {
        makeRandomMove();
    }
}

let squareIsOpen = function( square )
{
    return ( square.innerHTML !== "X" && square.innerHTML !== "O" );
}

let highlightWinningSquares = function( winningSquares, color )
{
    for( let i = 0; i < winningSquares.length; i++ )
    {
        document.getElementById( winningSquares[i] ).style.backgroundColor = color;
    }
}

let checkForDraw = function()
{
    let draw = true;
    for( let id = 0; id < squareCount; id++ )
    {
        if( squareIsOpen( document.getElementById( id ) ) )
        {
            draw = false;
            break;
        }
    }
    return draw;
}

//function for player number 1
let playerOne = function()
{
    if( !gameOver )
    {
        currentSymbol = player1Symbol;
        agentName = player1Name;
        difficulty = player1difficulty;
        AgentProbability = player1Probability;
        gameMoves();
        playerTwo();
        let win = checkForWinCondition( "X" );
        if( !win )
        {
            let lost = checkForWinCondition( "O" );
            if( !lost)
            {
                let draw = checkForDraw();
                if( draw )
                {
                    gameOver = true;
                    gameTied = true;
                    setMessageBox( "It's a draw!" );
                    let gameButton = document.getElementById("gameButton");
                    gameButton.innerText = "Tie Breaker Game";
                }
            }
            else
            {
                gameOver = true;
                gameTied = false;
                highlightWinningSquares( lost, "red" );
                winner = player2Name;
                tournamentContenders[player2Index][3] = "W"
                setMessageBox( winner + " Won!" );
                updatePlayerBracket();
                if(player2Index < currentBracket.length)
                {
                    player1Index = player1Index + 2;
                    player2Index = player2Index + 2;
                }
            }
        }
        else
        {
            gameOver = true;
            gameTied = false;
            highlightWinningSquares( win, "green" );
            winner = player1Name;
            tournamentContenders[player1Index][3] = "W"
            setMessageBox( winner + " Won!" );
            updatePlayerBracket();
            if(player2Index < currentBracket.length)
            {
                player1Index = player1Index + 2;
                player2Index = player2Index + 2;
            }
        }

    }

};

// player two function does the same thing as player one just changes the symbols and doesn't check for a winner
let playerTwo = function()
{
    currentSymbol = player2Symbol;
    agentName = player2Name;
    difficulty = player2difficulty;
    AgentProbability = player2Probability;
    gameMoves();
}

// function that plays the game it continues until all the squares have been filled.
playGame = function ()
{
    for(gameIndex; gameIndex<squares.length; gameIndex++)
    {
        playerOne();
    }
}

// bracket helper function to cut players after each set of rounds and then grab the new contenders for each round
let playerBracket = function () {
    currentBracket = tournamentContenders;
    if(roundCounter < 8)
    {
        grabContenders();
    }
    else if((roundCounter >= 8) && (roundCounter < 12))
    {
        if(cutLosers !== true)
        {
            cutLosingTeams();
            cutLosers = true;
            grabContenders();
        }
        else
        {
            currentBracket = elite8;
            grabContenders();
        }
    }
    else if((roundCounter >= 12) && (roundCounter < 14))
    {
        if(cutLosers1 !== true)
        {
            cutLosingTeams();
            cutLosers1 = true;
            grabContenders();
        }
        else
        {
            currentBracket = final4;
            grabContenders();
        }
    }
    else
    {
        cutLosingTeams();
        grabContenders();
    }
}

// function to cut the losers from the tournament and to reset the winning variable in the agent array
let cutLosingTeams = function ()
{
    player1Index = 0;
    player2Index = 1;
    for(let i=0; i<tournamentContenders.length; i++)
    {
        if(tournamentContenders[i][3] === "W")
        {
            tempContenders.push(tournamentContenders[i]);
        }
    }
    tournamentContenders = tempContenders;
    for(let j=0; j<tournamentContenders.length; j++)
    {
        tournamentContenders[j][3] = "";
    }
    tempContenders = [];
}

// grabs the 2 players who are currently vs'ing each other
let grabContenders = function ()
{
    player1Name = tournamentContenders[player1Index][0];
    player1difficulty = tournamentContenders[player1Index][1];
    if(tournamentContenders[player1Index][2] !== undefined)
    {
        player1Probability = tournamentContenders[player1Index][2];
    }

    player2Name = tournamentContenders[player2Index][0];
    player2difficulty = tournamentContenders[player2Index][1];
    if(tournamentContenders[player2Index][2] !== undefined)
    {
        player2Probability = tournamentContenders[player2Index][2];
    }
    if(gameTied !== true)
    {
        roundCounter++;
    }
}

// updates the visual bracket on the html page to the winners of each game and then puts an alert the winner at the end
let updatePlayerBracket = function () {
    if(elite8.length < 8)
    {
        elite8.push(winner);
        for( let gameNum = 0; gameNum<=7; gameNum++)
        {
            let numAdd1 = gameNum + 1;
            let bracketStringConcat = "winnerG" + numAdd1.toString();
            let bracketItem = document.getElementById(bracketStringConcat);
            if(elite8[gameNum] !== undefined)
            {
                bracketItem.innerText = elite8[gameNum];
            }

        }
    }
    else if(final4.length < 4)
    {
        final4.push(winner);
        for( let gameNum = 0; gameNum<=3; gameNum++)
        {
            let numAdd1 = gameNum + 1;
            let bracketStringConcat = "winner2G" + numAdd1.toString();
            let bracketItem = document.getElementById(bracketStringConcat);
            if(final4[gameNum] !== undefined)
            {
                bracketItem.innerText = final4[gameNum];
            }

        }
    }
    else if(top2.length < 2)
    {
        top2.push(winner);
        for( let gameNum = 0; gameNum<=1; gameNum++)
        {
            let numAdd1 = gameNum + 1;
            let bracketStringConcat = "winner3G" + numAdd1.toString();
            let bracketItem = document.getElementById(bracketStringConcat);
            if(top2[gameNum] !== undefined)
            {
                bracketItem.innerText = top2[gameNum];
            }
        }
    }
    else if(top2.length === 2)
    {
        alert("Winner is: " + winner);
    }
}

/*
this is for a human player that I am not using as apart of this current program.
taken from an old tutorial i found online when first learning HTML CSS JS.

for (let i = 0; i < squares.length; i++)
{
    squares[i].addEventListener('click', chooseSquare, false);
}
 */
