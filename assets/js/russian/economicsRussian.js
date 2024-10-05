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
    { russian: "экономика", english: "economy" },
    { russian: "экономист", english: "economist" },
    { russian: "спрос", english: "demand" },
    { russian: "предложение", english: "supply" },
    { russian: "рынок", english: "market" },
    { russian: "конкуренция", english: "competition" },
    { russian: "инфляция", english: "inflation" },
    { russian: "дефляция", english: "deflation" },
    { russian: "капитал", english: "capital" },
    { russian: "инвестиция", english: "investment" },
    { russian: "процентная ставка", english: "interest rate" },
    { russian: "валовой внутренний продукт (ВВП)", english: "gross domestic product (GDP)" },
    { russian: "экспорт", english: "export" },
    { russian: "импорт", english: "import" },
    { russian: "торговля", english: "trade" },
    { russian: "рынок труда", english: "labor market" },
    { russian: "безработица", english: "unemployment" },
    { russian: "предприятие", english: "enterprise" },
    { russian: "глобализация", english: "globalization" },
    { russian: "рецессия", english: "recession" },
    { russian: "бум", english: "boom" },
    { russian: "дефицит", english: "deficit" },
    { russian: "профицит", english: "surplus" },
    { russian: "государственный долг", english: "national debt" },
    { russian: "бюджет", english: "budget" },
    { russian: "валовой национальный продукт (ВНП)", english: "gross national product (GNP)" },
    { russian: "обменный курс", english: "exchange rate" },
    { russian: "валюта", english: "currency" },
    { russian: "субсидия", english: "subsidy" },
    { russian: "налог", english: "tax" },
    { russian: "монополия", english: "monopoly" },
    { russian: "производство", english: "production" },
    { russian: "потребление", english: "consumption" },
    { russian: "потребитель", english: "consumer" },
    { russian: "производитель", english: "producer" },
    { russian: "доход", english: "income" },
    { russian: "благосостояние", english: "prosperity" },
    { russian: "бедность", english: "poverty" },
    { russian: "ресурсы", english: "resources" },
    { russian: "индустриализация", english: "industrialization" },
    { russian: "свободная торговля", english: "free trade" },
    { russian: "внутренний рынок", english: "domestic market" },
    { russian: "внешняя торговля", english: "foreign trade" },
    { russian: "распределение доходов", english: "income distribution" },
    { russian: "либерализация", english: "liberalization" },
    { russian: "кривая спроса", english: "demand curve" },
    { russian: "кривая предложения", english: "supply curve" },
    { russian: "экономическая политика", english: "economic policy" }
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
    const selectedEnglish = clickedOption.textContent;
    const correctEnglish = chosenOption.dataset.english;

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
    options[index].dataset.russian = wordPair.russian;
    options[index].dataset.english = wordPair.english;
    remainingWordPairs.splice(rndNum, 1);

    return options[index];
}
