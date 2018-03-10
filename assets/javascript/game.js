
var game = {
    dictionary: ['aardvark', 'beluga', 'cassowary', 'dingo', 'elephant', 'frigatebird', 'gorilla'],

    words: ['ug', 'aa', 'ah', 'ag', 'aw', 'ay', 'ad', 'ai', 'ax', 'ba', 'bk', 'da', 'do', 'eh', 'er', 'em', 'fa', 'fi', 'go', 'ha', 'he', 'hi', 'id','it', 'jo', 'ki', 'ka', 'la', 'lo', 'ma', 'mm', 'mo', 'na', 'no', 'of', 'oh', 'om', 'oo', 'ow', 'pi', 'pa', 'sh', 'si', 'te', 'ti', 'uh', 'um', 'up', 'we', 'wo', 'xi', 'xu', 'ya', 'ye', 'yo', 'za', 'zz', 'gu'],

    word: '', 
    correctGuesses: [],
    incorrectGuesses: [],
    guessed: [],

    userGuess: undefined,

    remaining: 6,

    gamesWon: 0,


    startGame: function() {
        console.log('Game has started');
        game.word = game.words[game.randomIndex(game.words)];
        console.log(game.word);   
        document.onkeyup = function(event) {
            console.log('Key pressed');
            game.userGuess = event.key;
            console.log(game.userGuess);
            game.guessed.push(game.userGuess);
            game.processLetter(game.userGuess);
            game.renderBoard(game.correctGuesses, 'board');
            game.renderTheRest();
        }
       
    },

    // put these functions under startGame() 
    processLetter: function(char) {
        if (game.word.includes(char)) {
            for(var i = 0; i<game.word.length; i++) {
                if (game.word.charAt(i)===char) {
                    game.correctGuesses.push(char);
                }
            }
            console.log("Correct guess! " + game.correctGuesses);
            
        } else {
            game.incorrectGuesses.push(char);
            game.remaining -= 1;
        }
         game.newGame();
    },
    

    renderBoard: function(arr, id) {
        var newDiv = document.getElementById(id);
        var board = [];
        var hit = -1;
        for (var i =0; i<game.word.length; i++) {
            board[i] = '_';
        }
        for (var i = 0; i<arr.length; i++) {
            hit = game.word.indexOf(arr[i]);
            if (hit > -1) {
                board[hit] = game.word[hit];
            }
        }
        newDiv.innerHTML = board; 

    },

    renderTheRest: function() {
        document.getElementById('remaining').innerHTML = game.remaining;
        document.getElementById('guessed').innerHTML = game.guessed;
    },


    randomIndex: function(arr) {
         return Math.floor(Math.random()*(arr.length));
    },

    gameWon: function() {
        if (game.correctGuesses.length === game.word.length) {
            game.gamesWon++;
            document.getElementById('wins').innerHTML = game.gamesWon;
            return true;
        } else return false;
    },

    gameOver: function() {
        if (game.gameWon() || game.remaining==0) {
            return true; 
        }
        else return false;
    },

    newGame: function() {
        if (game.gameOver()) {
            console.log("New game");
            game.reset();
            game.startGame();
        }
    },

    reset: function() {
        game.correctGuesses = [];
        game.incorrectGuesses = [];
        game.guessed = [];
        game.remaining = 6;
    }


}

game.startGame();



