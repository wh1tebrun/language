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
    { italian: "la filosofia", english: "philosophy" },
    { italian: "il filosofo", english: "philosopher" },
    { italian: "il concetto", english: "concept" },
    { italian: "l'etica", english: "ethics" },
    { italian: "la logica", english: "logic" },
    { italian: "la metafisica", english: "metaphysics" },
    { italian: "l'epistemologia", english: "epistemology" },
    { italian: "l'estetica", english: "aesthetics" },
    { italian: "l'ontologia", english: "ontology" },
    { italian: "l'idealismo", english: "idealism" },
    { italian: "il realismo", english: "realism" },
    { italian: "il dualismo", english: "dualism" },
    { italian: "il monismo", english: "monism" },
    { italian: "la dialettica", english: "dialectic" },
    { italian: "la ragione", english: "reason" },
    { italian: "l'intelletto", english: "intellect" },
    { italian: "la coscienza", english: "consciousness" },
    { italian: "la verità", english: "truth" },
    { italian: "la libertà", english: "freedom" },
    { italian: "la moralità", english: "morality" },
    { italian: "il determinismo", english: "determinism" },
    { italian: "l'esistenzialismo", english: "existentialism" },
    { italian: "lo scetticismo", english: "skepticism" },
    { italian: "il razionalismo", english: "rationalism" },
    { italian: "l'empirismo", english: "empiricism" },
    { italian: "l'anima", english: "soul" },
    { italian: "la mente/lo spirito", english: "mind/spirit" },
    { italian: "l'essere", english: "being" },
    { italian: "il nichilismo", english: "nihilism" },
    { italian: "l'umanesimo", english: "humanism" },
    { italian: "l'utilitarismo", english: "utilitarianism" },
    { italian: "il costruttivismo", english: "constructivism" },
    { italian: "il pragmatismo", english: "pragmatism" },
    { italian: "l'ipotesi", english: "hypothesis" },
    { italian: "la fede", english: "belief" },
    { italian: "il paradigma", english: "paradigm" },
    { italian: "il dilemma", english: "dilemma" },
    { italian: "la teoria", english: "theory" },
    { italian: "la pratica", english: "practice" },
    { italian: "il paradosso", english: "paradox" },
    { italian: "la contingenza", english: "contingency" },
    { italian: "la sostanza", english: "substance" },
    { italian: "il dogma", english: "dogma" },
    { italian: "la natura", english: "nature" },
    { italian: "la volontà", english: "will" },
    { italian: "la virtù", english: "virtue" },
    { italian: "l'edonismo", english: "hedonism" },
    { italian: "il dovere", english: "duty" },
    { italian: "il senso", english: "meaning" }
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
