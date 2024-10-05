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
const options = Array.from(document.getElementsByClassName("option-button"));

const wordPairs = [
    { italian: "la fisica", english: "physics" },
    { italian: "il fisico", english: "physicist" },
    { italian: "l'energia", english: "energy" },
    { italian: "la forza", english: "force" },
    { italian: "la velocità", english: "speed" },
    { italian: "l'accelerazione", english: "acceleration" },
    { italian: "la massa", english: "mass" },
    { italian: "il peso", english: "weight" },
    { italian: "il volume", english: "volume" },
    { italian: "la densità", english: "density" },
    { italian: "la temperatura", english: "temperature" },
    { italian: "la pressione", english: "pressure" },
    { italian: "la gravità", english: "gravity" },
    { italian: "il vuoto", english: "vacuum" },
    { italian: "il campo magnetico", english: "magnetic field" },
    { italian: "l'elettricità", english: "electricity" },
    { italian: "la resistenza", english: "resistance" },
    { italian: "la corrente", english: "current" },
    { italian: "la tensione", english: "voltage" },
    { italian: "il conduttore", english: "conductor" },
    { italian: "l'isolante", english: "insulator" },
    { italian: "il magnete", english: "magnet" },
    { italian: "la luce", english: "light" },
    { italian: "l'onda", english: "wave" },
    { italian: "la frequenza", english: "frequency" },
    { italian: "l'ampiezza", english: "amplitude" },
    { italian: "l'oscillazione", english: "oscillation" },
    { italian: "l'ottica", english: "optics" },
    { italian: "lo specchio", english: "mirror" },
    { italian: "il prisma", english: "prism" },
    { italian: "il raggio", english: "ray" },
    { italian: "la riflessione", english: "reflection" },
    { italian: "la rifrazione", english: "refraction" },
    { italian: "la meccanica quantistica", english: "quantum mechanics" },
    { italian: "la teoria della relatività", english: "theory of relativity" },
    { italian: "l'atomo", english: "atom" },
    { italian: "l'elettrone", english: "electron" },
    { italian: "il protone", english: "proton" },
    { italian: "il neutrone", english: "neutron" },
    { italian: "il nucleo", english: "nucleus" },
    { italian: "la forza nucleare", english: "nuclear force" },
    { italian: "la gravitazione", english: "gravitation" },
    { italian: "la quantità di moto", english: "momentum" },
    { italian: "il lavoro", english: "work" },
    { italian: "la potenza", english: "power" },
    { italian: "l'entropia", english: "entropy" },
    { italian: "la termodinamica", english: "thermodynamics" },
    { italian: "la cinetica", english: "kinetics" },
    { italian: "la dinamica", english: "dynamics" }
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
    document.getElementById("best_score").innerText = bestScore;
    document.getElementById("myRange").style.display = "none"; // Slider'ı tamamen gizle
};

// Yeni soruyu yükleme fonksiyonu
function loadNextQuestion() {
    questionType = randomizer("multiple-choice", "type-in");

    if (questionType === "multiple-choice") {
        document.querySelectorAll('.option-container').forEach(element => {
            element.style.display = 'flex';
        });
        document.querySelector('.input-container').style.display = 'none';

        const option0 = replaceAndRemoveOption(0);
        const option1 = replaceAndRemoveOption(1);
        const option2 = replaceAndRemoveOption(2);
        const option3 = replaceAndRemoveOption(3);

        chosenOption = randomizer(option0, option1, option2, option3);
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
    const selectedEnglish = clickedOption.textContent;
    const correctEnglish = chosenOption.dataset.english;

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
    options.forEach(option => { option.disabled = true; });
    totalScoreElement.innerText = score;
    flagsDone.innerText = counter;
    clearInterval(timePassed);
    updateHighscore(score);
    openResult();
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
}

// Tıklama olaylarını seçenek düğmelerine ekle
options.forEach(option => {
    option.addEventListener("click", optionClickListener);
});

function replaceAndRemoveOption(index) {
    if (remainingWordPairs.length === 0) {
        remainingWordPairs = [...wordPairs];
    }
    const rndNum = Math.floor(Math.random() * remainingWordPairs.length);
    const wordPair = remainingWordPairs[rndNum];

    options[index].textContent = wordPair.english;
    options[index].dataset.italian = wordPair.italian;
    options[index].dataset.english = wordPair.english;
    remainingWordPairs.splice(rndNum, 1);

    return options[index];
}
