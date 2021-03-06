
var game = {

    words: ['afghanistan', 'brazil', 'cuba', 'denmark', 'ecuador', 'fiji', 'germany', 'haiti', 'india', 'japan', 'kenya', 'luxembourg', 'mexico', 'nigeria', 'oman', 'philippines', 'qatar', 'russia', 'switzerland', 'turkey', 'ukraine', 'vietnam', 'yemen', 'zimbabwe'],

    word: '', 
    chosen: [],
    correctGuesses: [],
    incorrectGuesses: [],
    guessed: [],

    userGuess: undefined,

    remaining: 5,

    gamesWon: 0,

    continue: false,


    startGame: function() {
        // console.log('Game has started');
        game.setWord(game.words);
        // console.log(game.word); 
        game.setFlag(game.word);
        game.initBoard(game.word, 'board');  
        document.onkeyup = function(event) {
            // console.log('Key pressed');
            game.userGuess = event.key;
            // console.log(game.userGuess);
            if (game.continue) {
                game.continue = false;
                game.newGame();
            } else{
                game.processLetter(game.userGuess);
                if (game.gameOver()) {
                    game.continue = true;
                }
            }
        }
       
    },

    processLetter: function(char) {
        if (!(game.guessed.includes(char))) {
            game.guessed.push(char);
            if (game.word.includes(char)) {
                for(var i = 0; i<game.word.length; i++) {
                    if (game.word.charAt(i)===char) {
                        game.correctGuesses.push(char);
                    }
                 }
                //  console.log("Correct guess! " + game.correctGuesses);
            
             } else {
                game.incorrectGuesses.push(char);
                game.remaining -= 1;
            }
            game.renderBoard(game.correctGuesses, 'board');
            game.renderTheRest();
        }
    },
    
    initBoard: function(randomWord, id) {
        var theBoard = document.getElementById(id);
        var underscores = []
        for (var i =0; i<game.word.length; i++) {
            underscores.push('_');
        }
        theBoard.innerHTML = underscores.join(' ');
    },

    renderBoard: function(arr, id) {
        var wordArray = game.word.split('');
        var boardState = document.getElementById(id).innerHTML;
        // console.log(boardState);
        var places = boardState.split(' ');
        for (var i = 0; i<arr.length; i++) {
            for (var j = 0; j<wordArray.length; j++) {
                if (arr[i]==wordArray[j]) {
                    places[j] = wordArray[j];
                }
            }
        }
        boardState = places.join(' ');
        document.getElementById('board').innerHTML = boardState;
    },

    renderTheRest: function() {
        document.getElementById('remaining').innerHTML = 'Number of guesses remaining: ' + game.remaining;
        document.getElementById('guessed').innerHTML = 'Letters already guessed: ' + game.guessed;
    },


    randomIndex: function(arr) {
         var random = Math.floor(Math.random()*(arr.length));
         if (game.chosen.length==arr.length) {
             return -1;
         }
         else if (game.chosen.includes(random)) {
             return game.randomIndex(arr);
         }
         else {
             game.chosen.push(random);
             return random;
         }
    },

    setWord: function(wordset) {
        var random = game.randomIndex(wordset);
        if (random==(-1)){
            // console.log('All words found. Starting over');
            game.chosen = [];
            return game.setWord(wordset);
        } else {
            game.word = wordset[random];
        }
    },

    setFlag: function(word) {
        var link = 'assets/images/countries/' + word + '.jpg';
        var img = '<img src="' + link + '" alt = "' + word + '" class="col-md-6 offset-md-3 flag">';
        // console.log(img);
        document.getElementById('flag').innerHTML = img;
    },

    gameWon: function() {
        if (game.correctGuesses.length === game.word.length) {
            game.gamesWon++;
            document.getElementById('wins').innerHTML = 'Wins: ' + game.gamesWon;
            // console.log('You won!');
            document.getElementById('flag').innerHTML = '<img src="assets/images/topgun.png" alt="Tom Cruise thumbs up" class="col-md-8 offset-md-2">';
            return true;
        } else return false;
    },

    gameOver: function() {
        if (game.gameWon() || game.remaining==0) {
            if (game.remaining<=0) {
                // console.log('You lost!'); 
            }
            return true;
        } else return false;
        
    },

    newGame: function() {
            // console.log('New game');
            game.reset();
            game.startGame();
    },

    reset: function() {
        game.correctGuesses = [];
        game.incorrectGuesses = [];
        game.guessed = [];
        game.remaining = 6;  
        game.renderBoard([], 'board');
        game.renderTheRest(); 

    },

}

game.startGame();



