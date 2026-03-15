// Zahlenratespiel mit Highscore

let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

// Highscore aus localStorage holen oder initialisieren
let highscore = localStorage.getItem('highscore');
if (highscore !== null) {
    highscore = Number(highscore);
} else {
    highscore = Infinity;
}

function checkGuess() {
    const guessInput = document.getElementById('guess');
    const guess = Number(guessInput.value);
    attempts++;

    let message = '';
    if (guess === secretNumber) {
        message = `Richtig! Du hast die Zahl in ${attempts} Versuchen erraten.`;
        
        if (attempts < highscore) {
            highscore = attempts;
            localStorage.setItem('highscore', highscore);
            message += ' 🎉 Neuer Highscore!';
        } else if (highscore < Infinity) {
            message += ` Highscore: ${highscore} Versuche.`;
        }

    } else if (guess < secretNumber) {
        message = 'Zu niedrig! Versuch es nochmal.';
    } else {
        message = 'Zu hoch! Versuch es nochmal.';
    }

    document.getElementById('message').textContent = message;
    guessInput.value = '';
}
