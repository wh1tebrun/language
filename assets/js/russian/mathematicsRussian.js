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
    { russian: "математика", english: "mathematics" },
    { russian: "математик", english: "mathematician" },
    { russian: "число", english: "number" },
    { russian: "уравнение", english: "equation" },
    { russian: "функция", english: "function" },
    { russian: "переменная", english: "variable" },
    { russian: "константа", english: "constant" },
    { russian: "термин", english: "term" },
    { russian: "сумма", english: "sum" },
    { russian: "произведение", english: "product" },
    { russian: "разность", english: "difference" },
    { russian: "частное", english: "quotient" },
    { russian: "сложение", english: "addition" },
    { russian: "вычитание", english: "subtraction" },
    { russian: "умножение", english: "multiplication" },
    { russian: "деление", english: "division" },
    { russian: "дробь", english: "fraction" },
    { russian: "процент", english: "percent" },
    { russian: "интеграл", english: "integral" },
    { russian: "производная", english: "derivative" },
    { russian: "бесконечность", english: "infinity" },
    { russian: "квадрат", english: "square" },
    { russian: "куб", english: "cube" },
    { russian: "матрица", english: "matrix" },
    { russian: "вектор", english: "vector" },
    { russian: "площадь", english: "area" },
    { russian: "объем", english: "volume" },
    { russian: "радиус", english: "radius" },
    { russian: "диаметр", english: "diameter" },
    { russian: "кривая", english: "curve" },
    { russian: "угол", english: "angle" },
    { russian: "прямая", english: "line" },
    { russian: "точка", english: "point" },
    { russian: "система координат", english: "coordinate system" },
    { russian: "график", english: "graph" },
    { russian: "парадокс", english: "paradox" },
    { russian: "аксиома", english: "axiom" },
    { russian: "теорема", english: "theorem" },
    { russian: "доказательство", english: "proof" },
    { russian: "вероятность", english: "probability" },
    { russian: "статистика", english: "statistics" },
    { russian: "геометрия", english: "geometry" },
    { russian: "алгебра", english: "algebra" },
    { russian: "тригонометрия", english: "trigonometry" },
    { russian: "анализ", english: "calculus" },
    { russian: "множество", english: "set" },
    { russian: "логика", english: "logic" },
    { russian: "симметрия", english: "symmetry" },
    { russian: "система уравнений", english: "system of equations" }
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
