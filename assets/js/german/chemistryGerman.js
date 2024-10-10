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
    // Mark the exercise as completed
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
    { german: "die Chemie", english: "chemistry" },
    { german: "der Chemiker", english: "chemist" },
    { german: "das Atom", english: "atom" },
    { german: "das Molekül", english: "molecule" },
    { german: "das Element", english: "element" },
    { german: "die Verbindung", english: "compound" },
    { german: "das Periodensystem", english: "periodic table" },
    { german: "die Reaktion", english: "reaction" },
    { german: "der Katalysator", english: "catalyst" },
    { german: "das Gas", english: "gas" },
    { german: "die Flüssigkeit", english: "liquid" },
    { german: "der Feststoff", english: "solid" },
    { german: "die Lösung", english: "solution" },
    { german: "die Säure", english: "acid" },
    { german: "die Base", english: "base" },
    { german: "das Salz", english: "salt" },
    { german: "das Ion", english: "ion" },
    { german: "der pH-Wert", english: "pH value" },
    { german: "die Oxidation", english: "oxidation" },
    { german: "die Reduktion", english: "reduction" },
    { german: "das Elektron", english: "electron" },
    { german: "das Proton", english: "proton" },
    { german: "das Neutron", english: "neutron" },
    { german: "das Isotop", english: "isotope" },
    { german: "die Bindung", english: "bond" },
    { german: "die kovalente Bindung", english: "covalent bond" },
    { german: "die Ionenbindung", english: "ionic bond" },
    { german: "die Metallbindung", english: "metallic bond" },
    { german: "die chemische Formel", english: "chemical formula" },
    { german: "die Molekülstruktur", english: "molecular structure" },
    { german: "die Synthese", english: "synthesis" },
    { german: "die Analyse", english: "analysis" },
    { german: "die Destillation", english: "distillation" },
    { german: "die Kristallisation", english: "crystallization" },
    { german: "das Labor", english: "laboratory" },
    { german: "der Brenner", english: "burner" },
    { german: "das Reagenzglas", english: "test tube" },
    { german: "der Kolben", english: "flask" },
    { german: "das Lösungsmittel", english: "solvent" },
    { german: "die Reaktionsgleichung", english: "chemical equation" },
    { german: "die Aktivierungsenergie", english: "activation energy" },
    { german: "der Aggregatzustand", english: "state of matter" },
    { german: "der Druck", english: "pressure" },
    { german: "die Temperatur", english: "temperature" },
    { german: "die Elektrolyse", english: "electrolysis" },
    { german: "das Gleichgewicht", english: "equilibrium" },
    { german: "die Atommasse", english: "atomic mass" },
    { german: "die Molekülmasse", english: "molecular mass" }
];


let remainingWordPairs = [...wordPairs];

const germanWordElement = document.getElementById("german-word");
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

        // Choose a random option to display the German word
        chosenOption = randomizer(...optionButtons);
        germanWordElement.innerText = chosenOption.dataset.german;

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
        germanWordElement.innerText = wordPair.german;

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
        wrongWords.push(`${chosenWordPair.german} - ${chosenWordPair.english}`);
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
        wrongWords.push(`${chosenOption.dataset.german} - ${chosenOption.dataset.english}`);
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
    optionButton.dataset.german = wordPair.german;
    optionButton.dataset.english = wordPair.english;
    remainingWordPairs.splice(rndNum, 1);

    return optionButton;
}
