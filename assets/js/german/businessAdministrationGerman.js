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
    { german: "die Betriebswirtschaft", english: "business administration" },
    { german: "der Unternehmer", english: "entrepreneur" },
    { german: "die Firma", english: "company" },
    { german: "das Unternehmen", english: "enterprise" },
    { german: "die Abteilung", english: "department" },
    { german: "der Geschäftsführer", english: "managing director" },
    { german: "die Geschäftsführung", english: "management" },
    { german: "der Markt", english: "market" },
    { german: "das Marketing", english: "marketing" },
    { german: "die Werbung", english: "advertising" },
    { german: "die Bilanz", english: "balance sheet" },
    { german: "die Buchhaltung", english: "accounting" },
    { german: "der Umsatz", english: "revenue" },
    { german: "der Gewinn", english: "profit" },
    { german: "der Verlust", english: "loss" },
    { german: "die Investition", english: "investment" },
    { german: "das Kapital", english: "capital" },
    { german: "die Aktie", english: "stock" },
    { german: "der Aktienmarkt", english: "stock market" },
    { german: "der Anteilseigner", english: "shareholder" },
    { german: "die Finanzierung", english: "financing" },
    { german: "das Darlehen", english: "loan" },
    { german: "der Kredit", english: "credit" },
    { german: "die Produktion", english: "production" },
    { german: "der Vertrieb", english: "distribution" },
    { german: "die Nachfrage", english: "demand" },
    { german: "das Angebot", english: "supply" },
    { german: "der Wettbewerb", english: "competition" },
    { german: "der Marktanteil", english: "market share" },
    { german: "die Preisgestaltung", english: "pricing" },
    { german: "der Geschäftsplan", english: "business plan" },
    { german: "die Strategie", english: "strategy" },
    { german: "das Management", english: "management" },
    { german: "die Führungskraft", english: "executive" },
    { german: "die Zielsetzung", english: "goal setting" },
    { german: "der Personalbestand", english: "workforce" },
    { german: "die Mitarbeitermotivation", english: "employee motivation" },
    { german: "das Projekt", english: "project" },
    { german: "das Risiko", english: "risk" },
    { german: "die Risikoanalyse", english: "risk analysis" },
    { german: "die Steuer", english: "tax" },
    { german: "der Steuerberater", english: "tax consultant" },
    { german: "die Wirtschaft", english: "economy" },
    { german: "die Kosten", english: "costs" },
    { german: "die Kostenrechnung", english: "cost accounting" },
    { german: "die Verhandlung", english: "negotiation" },
    { german: "der Vertrag", english: "contract" },
    { german: "die Unternehmenskultur", english: "corporate culture" },
    { german: "die Innovation", english: "innovation" },
    { german: "die Liquidität", english: "liquidity" }
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
    const selectedEnglish = clickedOption.textContent;
    const correctEnglish = chosenOption.dataset.english;

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
    options[index].dataset.german = wordPair.german;
    options[index].dataset.english = wordPair.english;
    remainingWordPairs.splice(rndNum, 1);

    return options[index];
}
