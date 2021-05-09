# TicTacToeAIWebApp
Tic Tac Toe AI tournament game where 16 agents (agent0-15) face each other in march madness style bracket. The agents have different algorithms to try and win the game.

Instructions:

The restart tournament button reloads the page to play again.
The next game button/tiebreaker game/start tournament button (all the same button just label changes if things happen in the tournament) is the button used to play out the tournament games. After each click of the button, the winner will be shown, the game board will be shown and the places the winner chose to win the game will be highlighted green for X and red for O. The bracket will also be updated so the winner moves on. Tie breakers will show a tie breaker button instead of next game and you keep clicking the button over until one player wins (sometimes it may look glitched if the players make the same move, but this is possible to happen, so just keep clicking through and someone will eventually win. 


My Code:
The TicTacToe Game code is recycled from an old project I worked on a year or two ago following a tutorial on how to make a HTML CSS JS webiste for a two player tictactoe game. I removed the code that belonged to the human players and added some code for varius AI's to work. The HTML and CSS was mostly recycled from that two player tutorial, just some buttons and labels changed. Also, the bracket was from the help of "codepen" (see references at end of read me for link to codepen site) on how to make an HTML and CSS bracket. I used the code I needed to for the bracket styling for there and updated the elements for the agents as needed in javascript on lines 495-EOF.



My minimax function and important parts of the code can be found on lines 221-483. These include the players functions as well as the algorithms  for the agent types. 

Other parts of the bracket updates code I made include lines 495-EOF which cuts losers, updates the html bracket, and varius other things for the visuals to work.


References:
Bracket HTML CSS source: https://blog.codepen.io/2018/02/16/need-make-tournament-bracket/
