let randomNumber;
let attempts = 0;
let timer;
let timeLeft = 30; // Startzeit in Sekunden
let highscore = localStorage.getItem('highscore') || Infinity; // Highscore aus LocalStorage holen

// Funktion zum Starten eines neuen Spiels
function startNewGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1; // Zufallszahl zwischen 1 und 100
    attempts = 0; // Versuche zurücksetzen
    timeLeft = 30; // Timer auf 30 Sekunden zurücksetzen
    document.getElementById('timer').textContent = "Zeit: 30s"; // Timer zurücksetzen
    document.getElementById('message').textContent = ""; // Nachricht zurücksetzen
    document.getElementById('guess').value = ""; // Eingabefeld zurücksetzen
    startTimer(); // Timer starten
}

// Funktion für den Timer
function startTimer() {
    timer = setInterval(function() {
        timeLeft--; // Zeit verringern
        document.getElementById('timer').textContent = "Zeit: " + timeLeft + "s"; // Timer anzeigen

        if (timeLeft <= 0) {
            clearInterval(timer); // Timer stoppen
            document.getElementById('message').textContent = "Zeit abgelaufen! Du hast verloren!";
            if (attempts < highscore) {
                highscore = attempts;
                localStorage.setItem('highscore', highscore); // Highscore speichern
            }
            document.getElementById('highscore').textContent = "Bester Versuch: " + highscore;
        }
    }, 1000); // Alle 1 Sekunde
}

// Funktion, um die Eingabe zu überprüfen
function checkGuess() {
    let guess = parseInt(document.getElementById('guess').value); // Eingabewert
    if (guess === randomNumber) {
        clearInterval(timer); // Timer stoppen
        document.getElementById('message').textContent = "Richtig geraten!";
        if (attempts < highscore) {
            highscore = attempts;
            localStorage.setItem('highscore', highscore); // Highscore speichern
        }
        document.getElementById('highscore').textContent = "Bester Versuch: " + highscore;
    } else {
        document.getElementById('message').textContent = "Falsch, versuche es nochmal!";
        attempts++; // Versuche erhöhen
    }
}

// Event-Listener für den Raten-Button
document.getElementById('submit').addEventListener('click', checkGuess);

// Event-Listener für den Neuen Spiel-Button
document.getElementById('new-game').addEventListener('click', startNewGame);

// Beim Laden der Seite ein neues Spiel starten
window.onload = function() {
    startNewGame();
};
