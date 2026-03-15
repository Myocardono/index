let secretNumber = Math.floor(Math.random() * 100) + 1; // Zufallszahl zwischen 1 und 100
let attempts = 0;

// Highscore aus localStorage holen
let highscore = localStorage.getItem('highscore');
if (highscore !== null) {
    highscore = Number(highscore);
} else {
    highscore = Infinity;  // Kein Highscore gespeichert
}

// Highscore beim Laden anzeigen
if (highscore < Infinity) {
    document.getElementById('message').textContent = `Bisheriger Highscore: ${highscore} Versuche.`;
}

function checkGuess() {
    const guessInput = document.getElementById('guess');
    const guess = Number(guessInput.value);
    attempts++;  // Zählt die Versuche hoch

    let message = '';

    if (guess === secretNumber) {
        message = `Richtig! Du hast die Zahl in ${attempts} Versuchen erraten.`;

        // Wenn der neue Versuch besser als der alte Highscore ist
        if (attempts < highscore) {
            highscore = attempts;
            localStorage.setItem('highscore', highscore);  // Speichern des neuen Highscores
            message += ' 🎉 Neuer Highscore!';
        } else if (highscore < Infinity) {
            message += ` Highscore: ${highscore} Versuche.`;
        }

        document.getElementById('message').textContent = message;
        return;
    } else if (guess < secretNumber) {
        message = 'Zu niedrig! Versuch es nochmal.';
    } else {
        message = 'Zu hoch! Versuch es nochmal.';
    }

    document.getElementById('message').textContent = message;
    guessInput.value = '';  // Eingabefeld zurücksetzen
}
