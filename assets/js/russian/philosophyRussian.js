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
    { russian: "философия", english: "philosophy" },
    { russian: "философ", english: "philosopher" },
    { russian: "концепция", english: "concept" },
    { russian: "этика", english: "ethics" },
    { russian: "логика", english: "logic" },
    { russian: "метафизика", english: "metaphysics" },
    { russian: "гносеология", english: "epistemology" },
    { russian: "эстетика", english: "aesthetics" },
    { russian: "онтология", english: "ontology" },
    { russian: "идеализм", english: "idealism" },
    { russian: "реализм", english: "realism" },
    { russian: "дуализм", english: "dualism" },
    { russian: "монизм", english: "monism" },
    { russian: "диалектика", english: "dialectic" },
    { russian: "разум", english: "reason" },
    { russian: "интеллект", english: "intellect" },
    { russian: "сознание", english: "consciousness" },
    { russian: "истина", english: "truth" },
    { russian: "свобода", english: "freedom" },
    { russian: "мораль", english: "morality" },
    { russian: "детерминизм", english: "determinism" },
    { russian: "экзистенциализм", english: "existentialism" },
    { russian: "скептицизм", english: "skepticism" },
    { russian: "рационализм", english: "rationalism" },
    { russian: "эмпиризм", english: "empiricism" },
    { russian: "душа", english: "soul" },
    { russian: "дух", english: "mind/spirit" },
    { russian: "бытие", english: "being" },
    { russian: "нигилизм", english: "nihilism" },
    { russian: "гуманизм", english: "humanism" },
    { russian: "утилитаризм", english: "utilitarianism" },
    { russian: "конструктивизм", english: "constructivism" },
    { russian: "прагматизм", english: "pragmatism" },
    { russian: "гипотеза", english: "hypothesis" },
    { russian: "вера", english: "belief" },
    { russian: "парадигма", english: "paradigm" },
    { russian: "дилемма", english: "dilemma" },
    { russian: "теория", english: "theory" },
    { russian: "практика", english: "practice" },
    { russian: "парадокс", english: "paradox" },
    { russian: "контингентность", english: "contingency" },
    { russian: "субстанция", english: "substance" },
    { russian: "догма", english: "dogma" },
    { russian: "природа", english: "nature" },
    { russian: "воля", english: "will" },
    { russian: "добродетель", english: "virtue" },
    { russian: "гедонизм", english: "hedonism" },
    { russian: "долг", english: "duty" },
    { russian: "смысл", english: "meaning" }
];


let remainingWordPairs = [...wordPairs];

const russianWordElement = document.getElementById("russian-word");
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

        // Choose a random option to display the russian word
        chosenOption = randomizer(...optionButtons);
        russianWordElement.innerText = chosenOption.dataset.russian;

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
        russianWordElement.innerText = wordPair.russian;

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
        wrongWords.push(`${chosenWordPair.russian} - ${chosenWordPair.english}`);
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
        wrongWords.push(`${chosenOption.dataset.russian} - ${chosenOption.dataset.english}`);
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
    optionButton.dataset.russian = wordPair.russian;
    optionButton.dataset.english = wordPair.english;
    remainingWordPairs.splice(rndNum, 1);

    return optionButton;
}
