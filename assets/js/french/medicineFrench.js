// archeologyfrench.js

// Başlangıçta tanımlanan değişkenler
let counter = 0; // Yapılan doğru cevap sayısı
let score = 0;   // Doğru cevap sayısı (12 tane soruyu doğru yaparsa bitiyor)
let wrongWords = []; // Yanlış yapılan kelimeleri tutan array
let questionType;
let chosenWordPair;
const totalRounds = 12; // Sabit 12 soru

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
}

function randomizer(...options) {
    const rndIndex = Math.floor(Math.random() * options.length);
    return options[rndIndex];
}

const jsConfetti = new JSConfetti();
const optionButtons = Array.from(document.getElementsByClassName("option-button"));

const wordPairs = [
    { french: "la médecine", english: "medicine" },
    { french: "le médecin", english: "doctor" },
    { french: "la médecin", english: "female doctor" },
    { french: "l'hôpital", english: "hospital" },
    { french: "le traitement", english: "treatment" },
    { french: "le diagnostic", english: "diagnosis" },
    { french: "la maladie", english: "disease" },
    { french: "l'opération", english: "surgery" },
    { french: "le médicament", english: "medication" },
    { french: "la thérapie", english: "therapy" },
    { french: "le symptôme", english: "symptom" },
    { french: "l'examen", english: "examination" },
    { french: "le patient", english: "patient" },
    { french: "la patiente", english: "female patient" },
    { french: "l'ordonnance", english: "prescription" },
    { french: "l'urgence", english: "emergency" },
    { french: "la blessure", english: "injury" },
    { french: "la fièvre", english: "fever" },
    { french: "la pression artérielle", english: "blood pressure" },
    { french: "le sang", english: "blood" },
    { french: "la seringue", english: "injection" },
    { french: "l'antibiotique", english: "antibiotic" },
    { french: "l'analgésique", english: "painkiller" },
    { french: "l'infection", english: "infection" },
    { french: "le virus", english: "virus" },
    { french: "les bactéries", english: "bacteria" },
    { french: "le système immunitaire", english: "immune system" },
    { french: "le chirurgien", english: "surgeon" },
    { french: "la chirurgienne", english: "female surgeon" },
    { french: "la guérison", english: "recovery" },
    { french: "la crise cardiaque", english: "heart attack" },
    { french: "l'accident vasculaire cérébral", english: "stroke" },
    { french: "le cancer", english: "cancer" },
    { french: "la vaccination", english: "vaccination" },
    { french: "l'anesthésie", english: "anesthesia" },
    { french: "l'analyse de sang", english: "blood test" },
    { french: "l'unité de soins intensifs", english: "intensive care unit" },
    { french: "la réanimation", english: "resuscitation" },
    { french: "l'hygiène", english: "hygiene" },
    { french: "la convalescence", english: "convalescence" },
    { french: "le plâtre", english: "cast (plaster)" },
    { french: "la radiographie", english: "X-ray" },
    { french: "l'IRM", english: "MRI" },
    { french: "la forme de thérapie", english: "form of therapy" },
    { french: "le tissu", english: "tissue" },
    { french: "l'organisme", english: "organism" },
    { french: "l'organe", english: "organ" },
    { french: "la méthode de diagnostic", english: "diagnostic method" },
    { french: "l'anesthésiste", english: "anesthesiologist" }
];



let remainingWordPairs = [...wordPairs];

const frenchWordElement = document.getElementById("french-word");
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

        // Choose a random option to display the french word
        chosenOption = randomizer(...optionButtons);
        frenchWordElement.innerText = chosenOption.dataset.french;

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
        frenchWordElement.innerText = wordPair.french;

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
        wrongWords.push(`${chosenWordPair.french} - ${chosenWordPair.english}`);
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
        wrongWords.push(`${chosenOption.dataset.french} - ${chosenOption.dataset.english}`);
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
    optionButton.dataset.french = wordPair.french;
    optionButton.dataset.english = wordPair.english;
    remainingWordPairs.splice(rndNum, 1);

    return optionButton;
}
