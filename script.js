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
        return;  // Keine automatische Neustart-Funktion hier mehr!

    } else if (guess < secretNumber) {
        message = 'Zu niedrig! Versuch es nochmal.';
    } else {
        message = 'Zu hoch! Versuch es nochmal.';
    }

    document.getElementById('message').textContent = message;
    guessInput.value = '';  // Eingabefeld zurücksetzen
}

// Funktion für den "Neues Spiel"-Button
function startNewGame() {
    // Neue Zufallszahl generieren und Versuche zurücksetzen
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;

    // Nachricht zurücksetzen
    document.getElementById('message').textContent = 'Rate die Zahl zwischen 1 und 100:';

    // Eingabefeld zurücksetzen
    document.getElementById('guess').value = '';
}

// Funktion für den "Highscore zurücksetzen"-Button
function resetHighscore() {
    // Highscore im localStorage zurücksetzen
    localStorage.removeItem('highscore');

    // Nachricht an den Benutzer
    document.getElementById('message').textContent = 'Highscore wurde zurückgesetzt. Viel Glück beim nächsten Mal!';
}

let timer; // Variable für den Timer
let timeLeft = 30; // Startzeit in Sekunden

// Funktion, um den Timer zu starten
function startTimer() {
    timer = setInterval(function() {
        timeLeft--; // Verbleibende Zeit um 1 Sekunde verringern
        document.getElementById('timer').textContent = "Zeit: " + timeLeft + "s"; // Timer anzeigen

        // Wenn die Zeit abgelaufen ist, stoppe den Timer und zeige eine Nachricht
        if (timeLeft <= 0) {
            clearInterval(timer); // Timer stoppen
            document.getElementById('message').textContent = "Zeit abgelaufen! Du hast verloren!";
            endGame(); // Spiel beenden
        }
    }, 1000); // Timer jede Sekunde verringern
}

// Funktion, um den Timer zurückzusetzen
function resetTimer() {
    clearInterval(timer); // Timer stoppen
    timeLeft = 30; // Zeit auf 30 Sekunden zurücksetzen
    document.getElementById('timer').textContent = "Zeit: 30s"; // Timer-Anzeige zurücksetzen
}

// Funktion, die beim Start eines neuen Spiels aufgerufen wird
function startNewGame() {
    resetTimer(); // Timer zurücksetzen
    randomNumber = generateRandomNumber(); // Neue Zahl generieren (Funktion müssen wir sicherstellen)
    startTimer(); // Timer starten
    document.getElementById('message').textContent = ""; // Alte Nachrichten löschen
}
