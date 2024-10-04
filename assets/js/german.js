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
    { german: "hallo", english: "hello" },
    { german: "auf wiedersehen", english: "goodbye" },
    { german: "danke", english: "thank you" },
    { german: "bitte", english: "please" },
    { german: "ja", english: "yes" },
    { german: "nein", english: "no" },
    { german: "mann", english: "man" },
    { german: "frau", english: "woman" },
    { german: "junge", english: "boy" },
    { german: "mädchen", english: "girl" },
    { german: "freund", english: "friend" },
    { german: "familie", english: "family" },
    { german: "haus", english: "house" },
    { german: "wohnung", english: "apartment" },
    { german: "schule", english: "school" },
    { german: "arbeit", english: "work" },
    { german: "stadt", english: "city" },
    { german: "land", english: "country" },
    { german: "auto", english: "car" },
    { german: "bus", english: "bus" },
    { german: "zug", english: "train" },
    { german: "flugzeug", english: "plane" },
    { german: "wasser", english: "water" },
    { german: "essen", english: "food" },
    { german: "brot", english: "bread" },
    { german: "käse", english: "cheese" },
    { german: "apfel", english: "apple" },
    { german: "wein", english: "wine" },
    { german: "kaffee", english: "coffee" },
    { german: "tee", english: "tea" },
    { german: "buch", english: "book" },
    { german: "zeitung", english: "newspaper" },
    { german: "stift", english: "pen" },
    { german: "papier", english: "paper" },
    { german: "computer", english: "computer" },
    { german: "telefon", english: "phone" },
    { german: "stuhl", english: "chair" },
    { german: "tisch", english: "table" },
    { german: "bett", english: "bed" },
    { german: "tür", english: "door" },
    { german: "fenster", english: "window" },
    { german: "hund", english: "dog" },
    { german: "katze", english: "cat" },
    { german: "vogel", english: "bird" },
    { german: "fisch", english: "fish" },
    { german: "sonne", english: "sun" },
    { german: "mond", english: "moon" },
    { german: "himmel", english: "sky" },
    { german: "meer", english: "sea" },
    { german: "berg", english: "mountain" },
    { german: "fluss", english: "river" },
    { german: "baum", english: "tree" },
    { german: "blume", english: "flower" },
    { german: "zeit", english: "time" },
    { german: "tag", english: "day" },
    { german: "nacht", english: "night" },
    { german: "morgen", english: "morning" },
    { german: "abend", english: "evening" },
    { german: "stunde", english: "hour" },
    { german: "minute", english: "minute" },
    { german: "woche", english: "week" },
    { german: "monat", english: "month" },
    { german: "jahr", english: "year" },
    { german: "montag", english: "Monday" },
    { german: "dienstag", english: "Tuesday" },
    { german: "mittwoch", english: "Wednesday" },
    { german: "donnerstag", english: "Thursday" },
    { german: "freitag", english: "Friday" },
    { german: "samstag", english: "Saturday" },
    { german: "sonntag", english: "Sunday" },
    { german: "rot", english: "red" },
    { german: "blau", english: "blue" },
    { german: "grün", english: "green" },
    { german: "gelb", english: "yellow" },
    { german: "schwarz", english: "black" },
    { german: "weiß", english: "white" },
    { german: "groß", english: "big" },
    { german: "klein", english: "small" },
    { german: "heiß", english: "hot" },
    { german: "kalt", english: "cold" },
    { german: "gut", english: "good" },
    { german: "schlecht", english: "bad" },
    { german: "einfach", english: "easy" },
    { german: "schwierig", english: "difficult" },
    { german: "neu", english: "new" },
    { german: "alt", english: "old" },
    { german: "schön", english: "beautiful" },
    { german: "glücklich", english: "happy" },
    { german: "traurig", english: "sad" },
    { german: "sprechen", english: "to speak" },
    { german: "hören", english: "to listen" },
    { german: "sehen", english: "to watch" },
    { german: "essen", english: "to eat" },
    { german: "trinken", english: "to drink" },
    { german: "schlafen", english: "to sleep" },
    { german: "gehen", english: "to go" },
    { german: "kommen", english: "to come" },
    { german: "mögen", english: "to like" },
    { german: "machen", english: "to do/make" },
    { german: "sehen", english: "to see" },
    { german: "wissen", english: "to know" },
    { german: "verstehen", english: "to understand" },
    { german: "denken", english: "to think" },
    { german: "schreiben", english: "to write" },
    { german: "lesen", english: "to read" },
    { german: "kaufen", english: "to buy" },
    { german: "verkaufen", english: "to sell" },
    { german: "öffnen", english: "to open" },
    { german: "schließen", english: "to close" },
    { german: "spielen", english: "to play" },
    { german: "arbeiten", english: "to work" },
    { german: "studieren", english: "to study" },
    { german: "wohnen", english: "to live" },
    { german: "tragen", english: "to wear" },
    { german: "rufen", english: "to call" },
    { german: "warten", english: "to wait" },
    { german: "ankommen", english: "to arrive" },
    { german: "eintreten", english: "to enter" },
    { german: "verlassen", english: "to exit" },
    { german: "der", english: "the (masculine singular)" },
    { german: "die", english: "the (feminine singular)" },
    { german: "die", english: "the (plural)" },
    { german: "ein", english: "a (masculine singular)" },
    { german: "eine", english: "a (feminine singular)" },
    { german: "und", english: "and" },
    { german: "oder", english: "or" },
    { german: "aber", english: "but" },
    { german: "weil", english: "because" },
    { german: "wer", english: "who" },
    { german: "was", english: "what" },
    { german: "wo", english: "where" },
    { german: "wann", english: "when" },
    { german: "warum", english: "why" },
    { german: "wie", english: "how" },
    { german: "wie viel", english: "how much/many" },
    { german: "kind", english: "child" },
    { german: "mutter", english: "mother" },
    { german: "vater", english: "father" },
    { german: "bruder", english: "brother" },
    { german: "schwester", english: "sister" },
    { german: "onkel", english: "uncle" },
    { german: "tante", english: "aunt" },
    { german: "großmutter", english: "grandmother" },
    { german: "großvater", english: "grandfather" },
    { german: "cousin", english: "cousin (male)" },
    { german: "cousine", english: "cousin (female)" },
    { german: "baby", english: "baby" },
    { german: "freund", english: "friend" },
    { german: "nachbar", english: "neighbor" },
    { german: "lehrer", english: "teacher" },
    { german: "student", english: "student" },
    { german: "arzt", english: "doctor" },
    { german: "krankenschwester", english: "nurse" },
    { german: "polizist", english: "police officer" },
    { german: "feuerwehrmann", english: "firefighter" },
    { german: "verkäufer", english: "salesperson" },
    { german: "kellner", english: "waiter" },
    { german: "kellnerin", english: "waitress" },
    { german: "sänger", english: "singer" },
    { german: "schauspieler", english: "actor" },
    { german: "künstler", english: "artist" },
    { german: "büro", english: "office" },
    { german: "geschäft", english: "store" },
    { german: "hotel", english: "hotel" },
    { german: "restaurant", english: "restaurant" },
    { german: "krankenhaus", english: "hospital" },
    { german: "bank", english: "bank" },
    { german: "kirche", english: "church" },
    { german: "museum", english: "museum" },
    { german: "kino", english: "cinema" },
    { german: "park", english: "park" },
    { german: "supermarkt", english: "supermarket" },
    { german: "apotheke", english: "pharmacy" },
    { german: "bibliothek", english: "library" },
    { german: "buch", english: "book" },
    { german: "bleistift", english: "pencil" },
    { german: "radiergummi", english: "eraser" },
    { german: "papier", english: "paper" },
    { german: "schultasche", english: "school bag" },
    { german: "schuh", english: "shoe" },
    { german: "jacke", english: "jacket" },
    { german: "hose", english: "trousers" },
    { german: "hemd", english: "shirt" },
    { german: "rock", english: "skirt" },
    { german: "kleid", english: "dress" },
    { german: "hut", english: "hat" },
    { german: "brille", english: "glasses" },
    { german: "uhr", english: "watch" },
    { german: "tasche", english: "bag" },
    { german: "schlüssel", english: "key" },
    { german: "geld", english: "money" },
    { german: "geschenk", english: "gift" },
    { german: "hochzeit", english: "wedding" },
    { german: "party", english: "party" },
    { german: "geburtstag", english: "birthday" },
    { german: "urlaub", english: "vacation" },
    { german: "musik", english: "music" },
    { german: "film", english: "movie" },
    { german: "spiel", english: "game" },
    { german: "sport", english: "sport" },
    { german: "fußball", english: "soccer" },
    { german: "tennis", english: "tennis" },
    { german: "schwimmen", english: "swimming" },
    { german: "tanzen", english: "dance" },
    { german: "singen", english: "singing" },
    { german: "malerei", english: "painting" },
    { german: "zeichnen", english: "drawing" },
    { german: "fotografie", english: "photography" },
    { german: "fahrrad", english: "bicycle" },
    { german: "motorrad", english: "motorcycle" },
    { german: "lkw", english: "truck" },
    { german: "boot", english: "boat" },
    { german: "zug", english: "train" },
    { german: "flugzeug", english: "plane" },
    { german: "hund", english: "dog" },
    { german: "katze", english: "cat" },
    { german: "kaninchen", english: "rabbit" },
    { german: "vogel", english: "bird" },
    { german: "fisch", english: "fish" },
    { german: "pferd", english: "horse" },
    { german: "kuh", english: "cow" },
    { german: "schwein", english: "pig" },
    { german: "schaf", english: "sheep" },
    { german: "huhn", english: "chicken" },
    { german: "ente", english: "duck" },
    { german: "frosch", english: "frog" },
    { german: "tiger", english: "tiger" },
    { german: "löwe", english: "lion" },
    { german: "elefant", english: "elephant" },
    { german: "affe", english: "monkey" },
    { german: "bär", english: "bear" },
    { german: "schlange", english: "snake" },
    { german: "sonne", english: "sun" },
    { german: "mond", english: "moon" },
    { german: "stern", english: "star" },
    { german: "wolke", english: "cloud" },
    { german: "regen", english: "rain" },
    { german: "schnee", english: "snow" },
    { german: "wind", english: "wind" },
    { german: "sturm", english: "storm" },
    { german: "blume", english: "flower" },
    { german: "baum", english: "tree" },
    { german: "gras", english: "grass" },
    { german: "blatt", english: "leaf" },
    { german: "erde", english: "earth" },
    { german: "wasser", english: "water" },
    { german: "feuer", english: "fire" },
    { german: "luft", english: "air" },
    { german: "berg", english: "mountain" },
    { german: "fluss", english: "river" },
    { german: "see", english: "lake" },
    { german: "meer", english: "sea" },
    { german: "ozean", english: "ocean" },
    { german: "insel", english: "island" },
    { german: "wüste", english: "desert" },
    { german: "wald", english: "forest" },
    { german: "strand", english: "beach" },
    { german: "hügel", english: "hill" },
    { german: "tal", english: "valley" },
    { german: "straße", english: "road" },
    { german: "brücke", english: "bridge" },
    { german: "tunnel", english: "tunnel" },
    { german: "ampel", english: "traffic light" },
    { german: "schild", english: "sign" },
    { german: "bushaltestelle", english: "bus stop" },
    { german: "bahnhof", english: "train station" },
    { german: "flughafen", english: "airport" },
    { german: "hafen", english: "harbor" },
    { german: "rathaus", english: "city hall" },
    { german: "post", english: "post office" },
    { german: "polizeiwache", english: "police station" },
    { german: "feuerwache", english: "fire station" },
    { german: "krankenhaus", english: "hospital" },
    { german: "apotheke", english: "pharmacy" },
    { german: "schule", english: "school" },
    { german: "universität", english: "university" },
    { german: "bibliothek", english: "library" },
    { german: "museum", english: "museum" },
    { german: "kirche", english: "church" },
    { german: "moschee", english: "mosque" },
    { german: "tempel", english: "temple" },
    { german: "synagoge", english: "synagogue" },
    { german: "hotel", english: "hotel" },
    { german: "restaurant", english: "restaurant" },
    { german: "café", english: "coffee shop" },
    { german: "bäckerei", english: "bakery" },
    { german: "konditorei", english: "pastry shop" },
    { german: "metzgerei", english: "butcher shop" },
    { german: "supermarkt", english: "supermarket" },
    { german: "geschäft", english: "store" },
    { german: "einkaufszentrum", english: "shopping center" },
    { german: "kino", english: "cinema" },
    { german: "theater", english: "theater" },
    { german: "stadion", english: "stadium" },
    { german: "turnhalle", english: "gym" },
    { german: "park", english: "park" },
    { german: "garten", english: "garden" },
    { german: "zoo", english: "zoo" },
    { german: "strand", english: "beach" },
    { german: "schwimmbad", english: "swimming pool" },
    { german: "museum", english: "museum" },
    { german: "bibliothek", english: "library" },
    { german: "buch", english: "book" },
    { german: "zeitung", english: "newspaper" },
    { german: "magazin", english: "magazine" },
    { german: "computer", english: "computer" },
    { german: "telefon", english: "phone" },
    { german: "fernseher", english: "television" },
    { german: "radio", english: "radio" },
    { german: "kamera", english: "camera" },
    { german: "drucker", english: "printer" },
    { german: "auto", english: "car" },
    { german: "bus", english: "bus" },
    { german: "zug", english: "train" },
    { german: "flugzeug", english: "plane" },
    { german: "boot", english: "boat" },
    { german: "fahrrad", english: "bicycle" },
    { german: "motorrad", english: "motorcycle" },
    { german: "lkw", english: "truck" },
    { german: "stuhl", english: "chair" },
    { german: "tisch", english: "table" },
    { german: "bett", english: "bed" },
    { german: "sofa", english: "sofa" },
    { german: "schreibtisch", english: "desk" },
    { german: "schrank", english: "wardrobe" },
    { german: "regal", english: "shelf" },
    { german: "schublade", english: "drawer" },
    { german: "tür", english: "door" },
    { german: "fenster", english: "window" },
    { german: "wand", english: "wall" },
    { german: "decke", english: "ceiling" },
    { german: "boden", english: "floor" },
    { german: "küche", english: "kitchen" },
    { german: "badezimmer", english: "bathroom" },
    { german: "wohnzimmer", english: "living room" },
    { german: "schlafzimmer", english: "bedroom" },
    { german: "garage", english: "garage" },
    { german: "garten", english: "garden" },
    { german: "balkon", english: "balcony" },
    { german: "aufzug", english: "elevator" },
    { german: "treppe", english: "stairs" },
    { german: "laptop", english: "laptop" },
    { german: "tablet", english: "tablet" },
    { german: "tastatur", english: "keyboard" },
    { german: "maus", english: "mouse" },
    { german: "bildschirm", english: "screen" },
    { german: "lautsprecher", english: "speaker" },
    { german: "kopfhörer", english: "earphones" },
    { german: "mikrofon", english: "microphone" },
    { german: "internet", english: "internet" },
    { german: "email", english: "email" },
    { german: "website", english: "website" },
    { german: "software", english: "software" },
    { german: "app", english: "app" },
    { german: "videospiel", english: "video game" },
    { german: "programm", english: "program" },
    { german: "wolke", english: "cloud" },
    { german: "sonne", english: "sun" },
    { german: "regen", english: "rain" },
    { german: "schnee", english: "snow" },
    { german: "wind", english: "wind" },
    { german: "sturm", english: "storm" },
    { german: "himmel", english: "sky" },
    { german: "stern", english: "star" },
    { german: "mond", english: "moon" },
    { german: "meer", english: "sea" },
    { german: "ozean", english: "ocean" },
    { german: "fluss", english: "river" },
    { german: "see", english: "lake" },
    { german: "berg", english: "mountain" },
    { german: "wald", english: "forest" },
    { german: "wüste", english: "desert" },
    { german: "insel", english: "island" },
    { german: "strand", english: "beach" },
    { german: "wiese", english: "meadow" },
    { german: "tal", english: "valley" },
    { german: "baum", english: "tree" },
    { german: "blume", english: "flower" },
    { german: "gras", english: "grass" },
    { german: "blatt", english: "leaf" },
    { german: "wurzel", english: "root" },
    { german: "zweig", english: "branch" },
    { german: "frucht", english: "fruit" },
    { german: "gemüse", english: "vegetable" },
    { german: "brot", english: "bread" },
    { german: "butter", english: "butter" },
    { german: "käse", english: "cheese" },
    { german: "milch", english: "milk" },
    { german: "ei", english: "egg" },
    { german: "fleisch", english: "meat" },
    { german: "fisch", english: "fish" },
    { german: "reis", english: "rice" },
    { german: "nudeln", english: "pasta" },
    { german: "salz", english: "salt" },
    { german: "pfeffer", english: "pepper" },
    { german: "zucker", english: "sugar" },
    { german: "wasser", english: "water" },
    { german: "saft", english: "juice" },
    { german: "kaffee", english: "coffee" },
    { german: "tee", english: "tea" },
    { german: "wein", english: "wine" },
    { german: "bier", english: "beer" },
    { german: "suppe", english: "soup" },
    { german: "salat", english: "salad" },
    { german: "kuchen", english: "cake" },
    { german: "eis", english: "ice cream" },
    { german: "bonbon", english: "candy" },
    { german: "schokolade", english: "chocolate" },
    { german: "frühstück", english: "breakfast" },
    { german: "mittagessen", english: "lunch" },
    { german: "abendessen", english: "dinner" },
    { german: "snack", english: "snack" },
    { german: "restaurant", english: "restaurant" },
    { german: "küche", english: "kitchen" },
    { german: "rezept", english: "recipe" },
    { german: "zutat", english: "ingredient" },
    { german: "messer", english: "knife" },
    { german: "gabel", english: "fork" },
    { german: "löffel", english: "spoon" },
    { german: "teller", english: "plate" },
    { german: "glas", english: "glass" },
    { german: "tasse", english: "cup" },
    { german: "schüssel", english: "bowl" },
    { german: "pfanne", english: "pan" },
    { german: "topf", english: "pot" },
    { german: "ofen", english: "oven" },
    { german: "kühlschrank", english: "refrigerator" },
    { german: "gefrierschrank", english: "freezer" },
    { german: "geschirrspüler", english: "dishwasher" },
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
