//Javascript
//Get all the elements on the page
document.addEventListener('DOMContentLoaded',function(){
    //top part
    const maxNumber = document.getElementById ('maxNumber');
    const error = document.getElementById ('error');
    const guess=document.getElementById ('guess');
    const evaluateGuess = document.getElementById ('evaluateGuess');
    const guessButton = document.getElementById ('guessButton');
    const tryAgain = document.getElementById ('tryAgain');

    //Scoreboard
    const wins = document.getElementById ('wins');
    const losses = document.getElementById ('losses');
    const guessesLeft = document.getElementById ('guessesLeft');
    const reset = document.getElementById ('reset');
    //Settings
    const attempts = document.getElementById ('attempts');
    const maxNumberSetting = document.getElementById ('maxNumberSetting');
    const updateSettings = document.getElementById ('updateSettings');
    


//Game Variables
  let maxNum = 20;          
  let totalGuesses = 5;     
  let remaining = 5;        
  let winCount = 0;
  let lossCount = 0;
  let secretNumber = 0;

  // Actions

  // turn the settings on or off
  function setSettingsDisabled(isDisabled) {
    attempts.disabled = isDisabled;
    maxNumberSetting.disabled = isDisabled;
    updateSettings.disabled = isDisabled;
  }

  // show the current numbers on the scoreboard
  function updateScoreboard() {
    wins.textContent = winCount;
    losses.textContent = lossCount;
    guessesLeft.textContent = remaining;
  }

  // start a fresh game
  function newGame() {
    secretNumber = Math.floor(Math.random() * maxNum) + 1;
    console.log('Secret number:', secretNumber);
    remaining = totalGuesses;
    updateScoreboard();
    guessButton.disabled = false;
    tryAgain.classList.add('hidden');
    error.classList.add('hidden');
    evaluateGuess.textContent = '';
    guess.value = '';
    setSettingsDisabled(false);
  }

  // finish the current game
  function endGame() {
    guessButton.disabled = true;
    tryAgain.classList.remove('hidden');
    setSettingsDisabled(false);
  }

  // show a message in the error box
  function showError(message) {
    error.textContent = message;
    error.classList.remove('hidden');
  }

  // Guess Button
  guessButton.addEventListener('click', function() {
    const guessValue = parseInt(guess.value);
    error.classList.add('hidden');

    // out of range or not a number
    if (isNaN(guessValue) || guessValue < 1 || guessValue > maxNum) {
      showError(`Please enter a number between 1 and ${maxNum}.`);
      return;
    }

    // a real guess means a game is in progress, so lock settings
    setSettingsDisabled(true);

    // use up a guess
    remaining--;
    updateScoreboard();

    if (guessValue === secretNumber) {
      evaluateGuess.textContent = 'Correct!';
      evaluateGuess.style.color = 'green';
      winCount++;
      updateScoreboard();
      endGame();
    } else {
      if (guessValue < secretNumber) {
        evaluateGuess.textContent = 'Higher!';
      } else {
        evaluateGuess.textContent = 'Lower!';
      }
      evaluateGuess.style.color = 'red';

      // out of guesses = loss
      if (remaining === 0) {
        lossCount++;
        updateScoreboard();
        endGame();
      }
    }
  });

  // Try again
  tryAgain.addEventListener('click', function() {
    newGame();
  });

  // Reset
  reset.addEventListener('click', function() {
    winCount = 0;
    lossCount = 0;
    updateScoreboard();
  });

  // Settings
  updateSettings.addEventListener('click', function() {
  console.log('Update clicked', attempts.value, maxNumberSetting.value);
    const newGuesses = parseInt(attempts.value);
    const newMax = parseInt(maxNumberSetting.value);

    if (isNaN(newGuesses) || newGuesses < 1) {
      showError('# Guesses must be at least 1.');
      return;
    }
    if (isNaN(newMax) || newMax < 2) {
      showError('Max Number must be at least 2.');
      return;
    }

    totalGuesses = newGuesses;
    maxNum = newMax;
    maxNumber.textContent = maxNum;  
    newGame();                        
  });

  // New game
  newGame();

});