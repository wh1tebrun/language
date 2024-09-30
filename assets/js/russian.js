// Başlangıçta tanımlanan değişkenler
let counter = 0; // Yapılan tur sayısı
let score = 0;   // Doğru cevap sayısı
let wrongWords = []; // Yanlış yapılan kelimeleri tutan array

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
    { russian: "привет", english: "hello" },
    { russian: "до свидания", english: "goodbye" },
    { russian: "спасибо", english: "thank you" },
    { russian: "пожалуйста", english: "please" },
    { russian: "да", english: "yes" },
    { russian: "нет", english: "no" },
    { russian: "мужчина", english: "man" },
    { russian: "женщина", english: "woman" },
    { russian: "мальчик", english: "boy" },
    { russian: "девочка", english: "girl" },
    { russian: "друг", english: "friend" },
    { russian: "семья", english: "family" },
    { russian: "дом", english: "house" },
    { russian: "квартира", english: "apartment" },
    { russian: "школа", english: "school" },
    { russian: "работа", english: "work" },
    { russian: "город", english: "city" },
    { russian: "страна", english: "country" },
    { russian: "автомобиль", english: "car" },
    { russian: "автобус", english: "bus" },
    { russian: "поезд", english: "train" },
    { russian: "самолёт", english: "plane" },
    { russian: "вода", english: "water" },
    { russian: "еда", english: "food" },
    { russian: "хлеб", english: "bread" },
    { russian: "сыр", english: "cheese" },
    { russian: "яблоко", english: "apple" },
    { russian: "вино", english: "wine" },
    { russian: "кофе", english: "coffee" },
    { russian: "чай", english: "tea" },
    { russian: "книга", english: "book" },
    { russian: "газета", english: "newspaper" },
    { russian: "ручка", english: "pen" },
    { russian: "бумага", english: "paper" },
    { russian: "компьютер", english: "computer" },
    { russian: "телефон", english: "phone" },
    { russian: "стул", english: "chair" },
    { russian: "стол", english: "table" },
    { russian: "кровать", english: "bed" },
    { russian: "дверь", english: "door" },
    { russian: "окно", english: "window" },
    { russian: "собака", english: "dog" },
    { russian: "кошка", english: "cat" },
    { russian: "птица", english: "bird" },
    { russian: "рыба", english: "fish" },
    { russian: "солнце", english: "sun" },
    { russian: "луна", english: "moon" },
    { russian: "небо", english: "sky" },
    { russian: "море", english: "sea" },
    { russian: "гора", english: "mountain" },
    { russian: "река", english: "river" },
    { russian: "дерево", english: "tree" },
    { russian: "цветок", english: "flower" },
    { russian: "время", english: "time" },
    { russian: "день", english: "day" },
    { russian: "ночь", english: "night" },
    { russian: "утро", english: "morning" },
    { russian: "вечер", english: "evening" },
    { russian: "час", english: "hour" },
    { russian: "минута", english: "minute" },
    { russian: "неделя", english: "week" },
    { russian: "месяц", english: "month" },
    { russian: "год", english: "year" },
    { russian: "понедельник", english: "Monday" },
    { russian: "вторник", english: "Tuesday" },
    { russian: "среда", english: "Wednesday" },
    { russian: "четверг", english: "Thursday" },
    { russian: "пятница", english: "Friday" },
    { russian: "суббота", english: "Saturday" },
    { russian: "воскресенье", english: "Sunday" },
    { russian: "красный", english: "red" },
    { russian: "синий", english: "blue" },
    { russian: "зелёный", english: "green" },
    { russian: "жёлтый", english: "yellow" },
    { russian: "чёрный", english: "black" },
    { russian: "белый", english: "white" },
    { russian: "большой", english: "big" },
    { russian: "маленький", english: "small" },
    { russian: "горячий", english: "hot" },
    { russian: "холодный", english: "cold" },
    { russian: "хороший", english: "good" },
    { russian: "плохой", english: "bad" },
    { russian: "лёгкий", english: "easy" },
    { russian: "трудный", english: "difficult" },
    { russian: "новый", english: "new" },
    { russian: "старый", english: "old" },
    { russian: "красивый", english: "beautiful" },
    { russian: "счастливый", english: "happy" },
    { russian: "грустный", english: "sad" },
    { russian: "говорить", english: "to speak" },
    { russian: "слушать", english: "to listen" },
    { russian: "смотреть", english: "to watch" },
    { russian: "есть", english: "to eat" },
    { russian: "пить", english: "to drink" },
    { russian: "спать", english: "to sleep" },
    { russian: "идти", english: "to go" },
    { russian: "приходить", english: "to come" },
    { russian: "нравиться", english: "to like" },
    { russian: "делать", english: "to do/make" },
    { russian: "видеть", english: "to see" },
    { russian: "знать", english: "to know" },
    { russian: "понимать", english: "to understand" },
    { russian: "думать", english: "to think" },
    { russian: "писать", english: "to write" },
    { russian: "читать", english: "to read" },
    { russian: "покупать", english: "to buy" },
    { russian: "продавать", english: "to sell" },
    { russian: "открывать", english: "to open" },
    { russian: "закрывать", english: "to close" },
    { russian: "играть", english: "to play" },
    { russian: "работать", english: "to work" },
    { russian: "учиться", english: "to study" },
    { russian: "жить", english: "to live" },
    { russian: "носить", english: "to wear" },
    { russian: "звонить", english: "to call" },
    { russian: "ждать", english: "to wait" },
    { russian: "прибывать", english: "to arrive" },
    { russian: "входить", english: "to enter" },
    { russian: "выходить", english: "to exit" },
    { russian: "он", english: "he" },
    { russian: "она", english: "she" },
    { russian: "они", english: "they" },
    { russian: "я", english: "I" },
    { russian: "мы", english: "we" },
    { russian: "и", english: "and" },
    { russian: "или", english: "or" },
    { russian: "но", english: "but" },
    { russian: "потому что", english: "because" },
    { russian: "кто", english: "who" },
    { russian: "что", english: "what" },
    { russian: "где", english: "where" },
    { russian: "когда", english: "when" },
    { russian: "почему", english: "why" },
    { russian: "как", english: "how" },
    { russian: "сколько", english: "how much/many" },
    { russian: "ребёнок", english: "child" },
    { russian: "мать", english: "mother" },
    { russian: "отец", english: "father" },
    { russian: "брат", english: "brother" },
    { russian: "сестра", english: "sister" },
    { russian: "дядя", english: "uncle" },
    { russian: "тётя", english: "aunt" },
    { russian: "бабушка", english: "grandmother" },
    { russian: "дедушка", english: "grandfather" },
    { russian: "двоюродный брат", english: "cousin (male)" },
    { russian: "двоюродная сестра", english: "cousin (female)" },
    { russian: "малыш", english: "baby" },
    { russian: "друг", english: "friend" },
    { russian: "сосед", english: "neighbor" },
    { russian: "учитель", english: "teacher" },
    { russian: "студент", english: "student" },
    { russian: "врач", english: "doctor" },
    { russian: "медсестра", english: "nurse" },
    { russian: "полицейский", english: "police officer" },
    { russian: "пожарный", english: "firefighter" },
    { russian: "продавец", english: "salesperson" },
    { russian: "официант", english: "waiter" },
    { russian: "официантка", english: "waitress" },
    { russian: "певец", english: "singer" },
    { russian: "актёр", english: "actor" },
    { russian: "художник", english: "artist" },
    { russian: "офис", english: "office" },
    { russian: "магазин", english: "store" },
    { russian: "отель", english: "hotel" },
    { russian: "ресторан", english: "restaurant" },
    { russian: "больница", english: "hospital" },
    { russian: "банк", english: "bank" },
    { russian: "церковь", english: "church" },
    { russian: "музей", english: "museum" },
    { russian: "кинотеатр", english: "cinema" },
    { russian: "парк", english: "park" },
    { russian: "супермаркет", english: "supermarket" },
    { russian: "аптека", english: "pharmacy" },
    { russian: "библиотека", english: "library" },
    { russian: "книга", english: "book" },
    { russian: "карандаш", english: "pencil" },
    { russian: "ластик", english: "eraser" },
    { russian: "бумага", english: "paper" },
    { russian: "рюкзак", english: "school bag" },
    { russian: "туфля", english: "shoe" },
    { russian: "куртка", english: "jacket" },
    { russian: "брюки", english: "trousers" },
    { russian: "рубашка", english: "shirt" },
    { russian: "юбка", english: "skirt" },
    { russian: "платье", english: "dress" },
    { russian: "шляпа", english: "hat" },
    { russian: "очки", english: "glasses" },
    { russian: "часы", english: "watch" },
    { russian: "сумка", english: "bag" },
    { russian: "ключ", english: "key" },
    { russian: "деньги", english: "money" },
    { russian: "подарок", english: "gift" },
    { russian: "свадьба", english: "wedding" },
    { russian: "вечеринка", english: "party" },
    { russian: "день рождения", english: "birthday" },
    { russian: "отпуск", english: "vacation" },
    { russian: "музыка", english: "music" },
    { russian: "фильм", english: "movie" },
    { russian: "игра", english: "game" },
    { russian: "спорт", english: "sport" },
    { russian: "футбол", english: "soccer" },
    { russian: "теннис", english: "tennis" },
    { russian: "плавание", english: "swimming" },
    { russian: "танец", english: "dance" },
    { russian: "пение", english: "singing" },
    { russian: "живопись", english: "painting" },
    { russian: "рисование", english: "drawing" },
    { russian: "фотография", english: "photography" },
    { russian: "велосипед", english: "bicycle" },
    { russian: "мотоцикл", english: "motorcycle" },
    { russian: "грузовик", english: "truck" },
    { russian: "лодка", english: "boat" },
    { russian: "поезд", english: "train" },
    { russian: "самолёт", english: "plane" },
    { russian: "собака", english: "dog" },
    { russian: "кошка", english: "cat" },
    { russian: "кролик", english: "rabbit" },
    { russian: "птица", english: "bird" },
    { russian: "рыба", english: "fish" },
    { russian: "лошадь", english: "horse" },
    { russian: "корова", english: "cow" },
    { russian: "свинья", english: "pig" },
    { russian: "овца", english: "sheep" },
    { russian: "курица", english: "chicken" },
    { russian: "утка", english: "duck" },
    { russian: "лягушка", english: "frog" },
    { russian: "тигр", english: "tiger" },
    { russian: "лев", english: "lion" },
    { russian: "слон", english: "elephant" },
    { russian: "обезьяна", english: "monkey" },
    { russian: "медведь", english: "bear" },
    { russian: "змея", english: "snake" },
    { russian: "солнце", english: "sun" },
    { russian: "луна", english: "moon" },
    { russian: "звезда", english: "star" },
    { russian: "облако", english: "cloud" },
    { russian: "дождь", english: "rain" },
    { russian: "снег", english: "snow" },
    { russian: "ветер", english: "wind" },
    { russian: "буря", english: "storm" },
    { russian: "цветок", english: "flower" },
    { russian: "дерево", english: "tree" },
    { russian: "трава", english: "grass" },
    { russian: "лист", english: "leaf" },
    { russian: "земля", english: "earth" },
    { russian: "вода", english: "water" },
    { russian: "огонь", english: "fire" },
    { russian: "воздух", english: "air" },
    { russian: "гора", english: "mountain" },
    { russian: "река", english: "river" },
    { russian: "озеро", english: "lake" },
    { russian: "море", english: "sea" },
    { russian: "океан", english: "ocean" },
    { russian: "остров", english: "island" },
    { russian: "пустыня", english: "desert" },
    { russian: "лес", english: "forest" },
    { russian: "пляж", english: "beach" },
    { russian: "холм", english: "hill" },
    { russian: "долина", english: "valley" },
    { russian: "дорога", english: "road" },
    { russian: "мост", english: "bridge" },
    { russian: "тоннель", english: "tunnel" },
    { russian: "светофор", english: "traffic light" },
    { russian: "знак", english: "sign" },
    { russian: "автобусная остановка", english: "bus stop" },
    { russian: "железнодорожная станция", english: "train station" },
    { russian: "аэропорт", english: "airport" },
    { russian: "порт", english: "harbor" },
    { russian: "ратуша", english: "city hall" },
    { russian: "почта", english: "post office" },
    { russian: "полицейский участок", english: "police station" },
    { russian: "пожарная часть", english: "fire station" },
    { russian: "больница", english: "hospital" },
    { russian: "аптека", english: "pharmacy" },
    { russian: "школа", english: "school" },
    { russian: "университет", english: "university" },
    { russian: "библиотека", english: "library" },
    { russian: "музей", english: "museum" },
    { russian: "церковь", english: "church" },
    { russian: "мечеть", english: "mosque" },
    { russian: "храм", english: "temple" },
    { russian: "синагога", english: "synagogue" },
    { russian: "отель", english: "hotel" },
    { russian: "ресторан", english: "restaurant" },
    { russian: "кафе", english: "coffee shop" },
    { russian: "пекарня", english: "bakery" },
    { russian: "кондитерская", english: "pastry shop" },
    { russian: "мясная лавка", english: "butcher shop" },
    { russian: "супермаркет", english: "supermarket" },
    { russian: "магазин", english: "store" },
    { russian: "торговый центр", english: "shopping center" },
    { russian: "кинотеатр", english: "cinema" },
    { russian: "театр", english: "theater" },
    { russian: "стадион", english: "stadium" },
    { russian: "спортзал", english: "gym" },
    { russian: "парк", english: "park" },
    { russian: "сад", english: "garden" },
    { russian: "зоопарк", english: "zoo" },
    { russian: "пляж", english: "beach" },
    { russian: "бассейн", english: "swimming pool" },
    { russian: "музей", english: "museum" },
    { russian: "библиотека", english: "library" },
    { russian: "книга", english: "book" },
    { russian: "газета", english: "newspaper" },
    { russian: "журнал", english: "magazine" },
    { russian: "компьютер", english: "computer" },
    { russian: "телефон", english: "phone" },
    { russian: "телевизор", english: "television" },
    { russian: "радио", english: "radio" },
    { russian: "камера", english: "camera" },
    { russian: "принтер", english: "printer" },
    { russian: "автомобиль", english: "car" },
    { russian: "автобус", english: "bus" },
    { russian: "поезд", english: "train" },
    { russian: "самолёт", english: "plane" },
    { russian: "лодка", english: "boat" },
    { russian: "велосипед", english: "bicycle" },
    { russian: "мотоцикл", english: "motorcycle" },
    { russian: "грузовик", english: "truck" },
    { russian: "стул", english: "chair" },
    { russian: "стол", english: "table" },
    { russian: "кровать", english: "bed" },
    { russian: "диван", english: "sofa" },
    { russian: "письменный стол", english: "desk" },
    { russian: "шкаф", english: "wardrobe" },
    { russian: "полка", english: "shelf" },
    { russian: "ящик", english: "drawer" },
    { russian: "дверь", english: "door" },
    { russian: "окно", english: "window" },
    { russian: "стена", english: "wall" },
    { russian: "потолок", english: "ceiling" },
    { russian: "пол", english: "floor" },
    { russian: "кухня", english: "kitchen" },
    { russian: "ванная", english: "bathroom" },
    { russian: "гостиная", english: "living room" },
    { russian: "спальня", english: "bedroom" },
    { russian: "гараж", english: "garage" },
    { russian: "сад", english: "garden" },
    { russian: "балкон", english: "balcony" },
    { russian: "лифт", english: "elevator" },
    { russian: "лестница", english: "stairs" },
    { russian: "ноутбук", english: "laptop" },
    { russian: "планшет", english: "tablet" },
    { russian: "клавиатура", english: "keyboard" },
    { russian: "мышь", english: "mouse" },
    { russian: "экран", english: "screen" },
    { russian: "динамик", english: "speaker" },
    { russian: "наушники", english: "earphones" },
    { russian: "микрофон", english: "microphone" },
    { russian: "интернет", english: "internet" },
    { russian: "электронная почта", english: "email" },
    { russian: "веб-сайт", english: "website" },
    { russian: "программное обеспечение", english: "software" },
    { russian: "приложение", english: "app" },
    { russian: "видеоигра", english: "video game" },
    { russian: "программа", english: "program" },
    { russian: "облако", english: "cloud" },
    { russian: "солнце", english: "sun" },
    { russian: "дождь", english: "rain" },
    { russian: "снег", english: "snow" },
    { russian: "ветер", english: "wind" },
    { russian: "буря", english: "storm" },
    { russian: "небо", english: "sky" },
    { russian: "звезда", english: "star" },
    { russian: "луна", english: "moon" },
    { russian: "море", english: "sea" },
    { russian: "океан", english: "ocean" },
    { russian: "река", english: "river" },
    { russian: "озеро", english: "lake" },
    { russian: "гора", english: "mountain" },
    { russian: "лес", english: "forest" },
    { russian: "пустыня", english: "desert" },
    { russian: "остров", english: "island" },
    { russian: "пляж", english: "beach" },
    { russian: "луг", english: "meadow" },
    { russian: "долина", english: "valley" },
    { russian: "дерево", english: "tree" },
    { russian: "цветок", english: "flower" },
    { russian: "трава", english: "grass" },
    { russian: "лист", english: "leaf" },
    { russian: "корень", english: "root" },
    { russian: "ветка", english: "branch" },
    { russian: "фрукт", english: "fruit" },
    { russian: "овощ", english: "vegetable" },
    { russian: "хлеб", english: "bread" },
    { russian: "масло", english: "butter" },
    { russian: "сыр", english: "cheese" },
    { russian: "молоко", english: "milk" },
    { russian: "яйцо", english: "egg" },
    { russian: "мясо", english: "meat" },
    { russian: "рыба", english: "fish" },
    { russian: "рис", english: "rice" },
    { russian: "паста", english: "pasta" },
    { russian: "соль", english: "salt" },
    { russian: "перец", english: "pepper" },
    { russian: "сахар", english: "sugar" },
    { russian: "вода", english: "water" },
    { russian: "сок", english: "juice" },
    { russian: "кофе", english: "coffee" },
    { russian: "чай", english: "tea" },
    { russian: "вино", english: "wine" },
    { russian: "пиво", english: "beer" },
    { russian: "суп", english: "soup" },
    { russian: "салат", english: "salad" },
    { russian: "торт", english: "cake" },
    { russian: "мороженое", english: "ice cream" },
    { russian: "конфета", english: "candy" },
    { russian: "шоколад", english: "chocolate" },
    { russian: "завтрак", english: "breakfast" },
    { russian: "обед", english: "lunch" },
    { russian: "ужин", english: "dinner" },
    { russian: "закуска", english: "snack" },
    { russian: "ресторан", english: "restaurant" },
    { russian: "кухня", english: "kitchen" },
    { russian: "рецепт", english: "recipe" },
    { russian: "ингредиент", english: "ingredient" },
    { russian: "нож", english: "knife" },
    { russian: "вилка", english: "fork" },
    { russian: "ложка", english: "spoon" },
    { russian: "тарелка", english: "plate" },
    { russian: "стакан", english: "glass" },
    { russian: "чашка", english: "cup" },
    { russian: "миска", english: "bowl" },
    { russian: "сковорода", english: "pan" },
    { russian: "кастрюля", english: "pot" },
    { russian: "духовка", english: "oven" },
    { russian: "холодильник", english: "refrigerator" },
    { russian: "морозильник", english: "freezer" },
    { russian: "посудомоечная машина", english: "dishwasher" }
];

let remainingWordPairs = [...wordPairs];

const russianWordElement = document.getElementById("russian-word");
const flagsDone = document.getElementById("flags-done");
const flagsDone2 = document.getElementById("flags-done2");
const valueOfRound = document.getElementById("value-of-round");
const totalScoreElement = document.getElementById("total_score");

let chosenOption;

window.onload = () => {
    // Slider değerini güncelle
    output.innerHTML = slider.value;
    valueOfRound.innerHTML = slider.value;

    // İlk soruyu yükle
    loadNextQuestion();

    // En iyi skoru yükle
    const bestScore = parseInt(localStorage.getItem('bestScore')) || 0;
    document.getElementById("best_score").innerText = bestScore;
};

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

function loadNextQuestion() {
    const option0 = replaceAndRemoveOption(0);
    const option1 = replaceAndRemoveOption(1);
    const option2 = replaceAndRemoveOption(2);
    const option3 = replaceAndRemoveOption(3);

    chosenOption = randomizer(option0, option1, option2, option3);
    russianWordElement.innerText = chosenOption.dataset.russian;
}

function optionClickListener(event) {
    const clickedOption = event.target;
    const selectedEnglish = clickedOption.textContent;
    const correctEnglish = chosenOption.dataset.english;

    if (selectedEnglish !== correctEnglish) {
        wrongWords.push(`${chosenOption.dataset.russian} - ${chosenOption.dataset.english}`); // Yanlış kelimeyi ekle
    } else {
        score++;
    }

    counter++;
    flagsDone2.innerText = counter;

    if (counter >= parseInt(output.innerHTML, 10)) {
        options.forEach((option) => { option.disabled = true; });
        totalScoreElement.innerText = score;
        flagsDone.innerText = counter;
        clearInterval(timePassed);
        updateHighscore(score);
        openResult();
        jsConfetti.addConfetti({ emojis: ['🌟', '🎉', '✨', '🔥'] });
    } else {
        loadNextQuestion();
    }
}

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

options.forEach((option) => {
    option.addEventListener("click", optionClickListener);
});

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;
valueOfRound.innerHTML = slider.value;

slider.oninput = function () {
    output.innerHTML = this.value;
    valueOfRound.innerHTML = slider.value;
};