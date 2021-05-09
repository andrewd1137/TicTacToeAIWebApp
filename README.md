# TicTacToeAIWebApp
Tic Tac Toe AI tournament game where 16 agents (agent0-15) face each other in march madness style bracket. The agents have different algorithms to try and win the game.

Instructions:

The restart tournament button reloads the page to play again.
The next game button/tiebreaker game/start tournament button (all the same button just label changes if things happen in the tournament) is the button used to play out the tournament games. After each click of the button, the winner will be shown, the game board will be shown and the places the winner chose to win the game will be highlighted green for X and red for O. The bracket will also be updated so the winner moves on. Tie breakers will show a tie breaker button instead of next game and you keep clicking the button over until one player wins (sometimes it may look glitched if the players make the same move, but this is possible to happen, so just keep clicking through and someone will eventually win. 

My minimax function and important parts of the code can be found on lines 221-483. These include the players functions as well as the algorithms  for the agent types. 

Other parts of the bracket updates code I made include lines 495-EOF which cuts losers, updates the html bracket, and varius other things for the visuals to work.
