let counter = 0; // Yapılan doğru cevap sayısı
let score = 0;   // Doğru cevap sayısı (12 tane soruyu doğru yaparsa bitiyor)
let wrongWords = []; // Yanlış yapılan kelimeleri tutan array
let questionType;
let chosenWordPair;
const totalRounds = 12; // Sabit 12 soru
// Retrieve the existing array from localStorage, or initialize as empty array
// Retrieve and set defaults
let currentSubject = localStorage.getItem('currentSubject') || 'psychology';
let exerciseNumber = parseInt(localStorage.getItem('currentStepNumber') || '1', 10);
let subjectKey = 'completedExercises' + currentSubject;

// Retrieve the array and ensure elements are numbers
let completedExercises = JSON.parse(localStorage.getItem(subjectKey)) || [];
completedExercises = completedExercises.map(Number); // Convert all elements to numbers


function updateHighscore(newScore) {
    const oldHighscore = parseInt(localStorage.getItem('bestScore')) || 0;
    if (newScore > oldHighscore) {
        localStorage.setItem('bestScore', newScore);
        document.getElementById("best_score").innerText = newScore;
    } else {
        document.getElementById("best_score").innerText = oldHighscore;
    }
}

var totalSeconds = 0;
let timePassed = setInterval(setTime, 1000);

function setTime() {
    totalSeconds++;
}

function openResult() {
    document.getElementById("menu").style.display = "flex"; // Sonuç ekranını göster
    document.body.classList.add('menu-active'); // Oyun içeriğini gizlemek için sınıf ekliyoruz
    showWrongWords(); // Yanlış kelimeleri göster
    if (!completedExercises.includes(exerciseNumber)) {
        completedExercises.push(exerciseNumber);
        localStorage.setItem(subjectKey, JSON.stringify(completedExercises));
    }
}

function randomizer(...options) {
    const rndIndex = Math.floor(Math.random() * options.length);
    return options[rndIndex];
}

const jsConfetti = new JSConfetti();
const optionButtons = Array.from(document.getElementsByClassName("option-button"));

const wordPairs = [
    { italian: "l'amministrazione aziendale", english: "business administration" },
    { italian: "l'imprenditore", english: "entrepreneur" },
    { italian: "la ditta", english: "company" },
    { italian: "l'impresa", english: "enterprise" },
    { italian: "il reparto", english: "department" },
    { italian: "l'amministratore delegato", english: "managing director" },
    { italian: "la direzione aziendale", english: "management" },
    { italian: "il mercato", english: "market" },
    { italian: "il marketing", english: "marketing" },
    { italian: "la pubblicità", english: "advertising" },
    { italian: "il bilancio", english: "balance sheet" },
    { italian: "la contabilità", english: "accounting" },
    { italian: "il fatturato", english: "revenue" },
    { italian: "il profitto", english: "profit" },
    { italian: "la perdita", english: "loss" },
    { italian: "l'investimento", english: "investment" },
    { italian: "il capitale", english: "capital" },
    { italian: "l'azione", english: "stock" },
    { italian: "il mercato azionario", english: "stock market" },
    { italian: "l'azionista", english: "shareholder" },
    { italian: "il finanziamento", english: "financing" },
    { italian: "il prestito", english: "loan" },
    { italian: "il credito", english: "credit" },
    { italian: "la produzione", english: "production" },
    { italian: "la distribuzione", english: "distribution" },
    { italian: "la domanda", english: "demand" },
    { italian: "l'offerta", english: "supply" },
    { italian: "la concorrenza", english: "competition" },
    { italian: "la quota di mercato", english: "market share" },
    { italian: "la determinazione dei prezzi", english: "pricing" },
    { italian: "il piano aziendale", english: "business plan" },
    { italian: "la strategia", english: "strategy" },
    { italian: "la gestione", english: "management" },
    { italian: "il dirigente", english: "executive" },
    { italian: "la definizione degli obiettivi", english: "goal setting" },
    { italian: "il personale", english: "workforce" },
    { italian: "la motivazione dei dipendenti", english: "employee motivation" },
    { italian: "il progetto", english: "project" },
    { italian: "il rischio", english: "risk" },
    { italian: "l'analisi del rischio", english: "risk analysis" },
    { italian: "la tassa", english: "tax" },
    { italian: "il consulente fiscale", english: "tax consultant" },
    { italian: "l'economia", english: "economy" },
    { italian: "i costi", english: "costs" },
    { italian: "la contabilità dei costi", english: "cost accounting" },
    { italian: "la trattativa", english: "negotiation" },
    { italian: "il contratto", english: "contract" },
    { italian: "la cultura aziendale", english: "corporate culture" },
    { italian: "l'innovazione", english: "innovation" },
    { italian: "la liquidità", english: "liquidity" }
];




let remainingWordPairs = [...wordPairs];

const italianWordElement = document.getElementById("italian-word");
const flagsDone = document.getElementById("flags-done");
const flagsDone2 = document.getElementById("flags-done2");
const totalScoreElement = document.getElementById("total_score");

let chosenOption;
let gameStarted = false; // Oyun başladığında true olacak

// Sayfa yüklendiğinde ilk soruyu yükle
window.onload = () => {
    loadNextQuestion();
    const bestScore = parseInt(localStorage.getItem('bestScore')) || 0;
    const bestScoreElement = document.getElementById("best_score");
    if (bestScoreElement) {
        bestScoreElement.innerText = bestScore;
    }
    const myRange = document.getElementById("myRange");
    if (myRange) {
        myRange.style.display = "none"; // Slider'ı tamamen gizle
    }
};

// Yeni soruyu yükleme fonksiyonu
function loadNextQuestion() {
    questionType = randomizer("multiple-choice", "type-in");

    if (questionType === "multiple-choice") {
        document.querySelectorAll('.option-container').forEach(element => {
            element.style.display = 'flex';
        });
        document.querySelector('.input-container').style.display = 'none';

        // Replace and remove options for multiple-choice
        replaceAndRemoveOption(0);
        replaceAndRemoveOption(1);
        replaceAndRemoveOption(2);
        replaceAndRemoveOption(3);

        // Choose a random option to display the italian word
        chosenOption = randomizer(...optionButtons);
        italianWordElement.innerText = chosenOption.dataset.italian;

    } else if (questionType === "type-in") {
        document.querySelectorAll('.option-container').forEach(element => {
            element.style.display = 'none';
        });
        document.querySelector('.input-container').style.display = 'block';

        if (remainingWordPairs.length === 0) {
            remainingWordPairs = [...wordPairs];
        }
        const rndNum = Math.floor(Math.random() * remainingWordPairs.length);
        const wordPair = remainingWordPairs[rndNum];
        remainingWordPairs.splice(rndNum, 1);

        chosenWordPair = wordPair;
        italianWordElement.innerText = wordPair.italian;

        document.getElementById('user-input').value = ''; // Input'u temizle
    }
}

// Fonksiyon doğru cevap verildiğinde ilerleme çubuğunu günceller
function updateProgressBar() {
    const progressBar = document.getElementById("progress-bar");
    const progressPercentage = (counter / totalRounds) * 100;
    progressBar.style.width = progressPercentage + "%";
}

// Cevap doğruysa ilerleme çubuğu ilerler
function checkInputAnswer() {
    const userAnswer = document.getElementById('user-input').value.trim().toLowerCase();
    const correctAnswer = chosenWordPair.english.toLowerCase();

    if (userAnswer === correctAnswer) {
        score++;
        counter++;  // İlerleme sadece doğru cevapta
        updateProgressBar();
    } else {
        wrongWords.push(`${chosenWordPair.italian} - ${chosenWordPair.english}`);
    }

    flagsDone2.innerText = counter;

    if (score >= totalRounds) {
        finishGame();
    } else {
        loadNextQuestion();
    }
}

// "Enter" tuşuyla cevap göndermek için
document.getElementById('user-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        checkInputAnswer();  // Enter tuşuna basıldığında cevap gönder
    }
});

// Submit butonuna tıklandığında cevap göndermek için
document.getElementById('submit-button').addEventListener('click', function() {
    checkInputAnswer();  // Submit butonuna basıldığında cevap gönder
});

// Seçeneklere tıklayınca cevap kontrolü
function optionClickListener(event) {
    const clickedOption = event.target;
    const selectedEnglish = clickedOption.textContent.trim().toLowerCase();
    const correctEnglish = chosenOption.dataset.english.toLowerCase();

    if (selectedEnglish !== correctEnglish) {
        wrongWords.push(`${chosenOption.dataset.italian} - ${chosenOption.dataset.english}`);
    } else {
        score++;
        counter++;  // İlerleme sadece doğru cevapta
        updateProgressBar();
    }

    flagsDone2.innerText = counter;

    if (score >= totalRounds) {
        finishGame();
    } else {
        loadNextQuestion();
    }
}

// Oyunu bitir ve sonuçları göster
function finishGame() {
    // Disable all option buttons
    optionButtons.forEach(option => { option.disabled = true; });

    // Update the total score displayed in the result screen
    totalScoreElement.innerText = score;
    flagsDone.innerText = counter;

    // Update totalPoints in localStorage
    try {
        let totalPoints = parseInt(localStorage.getItem('totalPoints')) || 0;
        totalPoints += score; // Add current score to totalPoints
        localStorage.setItem('totalPoints', totalPoints); // Save back to localStorage
        console.log(`Updated totalPoints: ${totalPoints}`);
    } catch (error) {
        console.error("Error updating totalPoints in localStorage:", error);
    }

    // Increment completedLessons in localStorage
    try {
        let completedLessons = parseInt(localStorage.getItem('completedLessons')) || 0;
        completedLessons += 1; // Increment by 1 for each completed lesson
        localStorage.setItem('completedLessons', completedLessons);
        console.log(`Updated completedLessons: ${completedLessons}`);
    } catch (error) {
        console.error("Error updating completedLessons in localStorage:", error);
    }

    // Stop the timer
    clearInterval(timePassed);

    // Update the best score if necessary
    updateHighscore(score);

    // Display the result screen
    openResult();

    // Add confetti for celebration
    jsConfetti.addConfetti({ emojis: ['🌟', '🎉', '✨', '🔥'] });
}

// Yanlış kelimeleri sonuç ekranında göster
function showWrongWords() {
    const wrongWordsList = document.getElementById('wrong_words_list');
    wrongWordsList.innerHTML = '';

    if (wrongWords.length > 0) {
        wrongWords.forEach(word => {
            let li = document.createElement('li');
            li.textContent = word;
            wrongWordsList.appendChild(li);
        });
    } else {
        let li = document.createElement('li');
        li.textContent = "No wrong words!";
        wrongWordsList.appendChild(li);
    }

    // Additionally, update totalPoints in the result screen
    const totalPointsElement = document.getElementById('total_points');
    if (totalPointsElement) {
        const totalPoints = parseInt(localStorage.getItem('totalPoints')) || 0;
        totalPointsElement.textContent = totalPoints;
    }

    // Update completedLessons in the result screen (if needed)
    const completedLessonsElement = document.getElementById('completed_lessons');
    if (completedLessonsElement) {
        const completedLessons = parseInt(localStorage.getItem('completedLessons')) || 0;
        completedLessonsElement.textContent = completedLessons;
    }
}

// Tıklama olaylarını seçenek düğmelerine ekle
optionButtons.forEach(option => {
    option.addEventListener("click", optionClickListener);
});

// Replace and remove option for multiple-choice
function replaceAndRemoveOption(index) {
    if (remainingWordPairs.length === 0) {
        remainingWordPairs = [...wordPairs];
    }
    const rndNum = Math.floor(Math.random() * remainingWordPairs.length);
    const wordPair = remainingWordPairs[rndNum];

    const optionButton = optionButtons[index];
    optionButton.textContent = wordPair.english;
    optionButton.dataset.italian = wordPair.italian;
    optionButton.dataset.english = wordPair.english;
    remainingWordPairs.splice(rndNum, 1);

    return optionButton;
}
