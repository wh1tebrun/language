// Başlangıçta tanımlanan değişkenler
let counter = 0; // Yapılan tur sayısı
let score = 0;   // Doğru cevap sayısı
let wrongWords = []; // Yanlış yapılan kelimeleri tutan array
let questionType;
let chosenWordPair;

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
    { italian: "ciao", english: "hello" },
    { italian: "arrivederci", english: "goodbye" },
    { italian: "grazie", english: "thank you" },
    { italian: "per favore", english: "please" },
    { italian: "sì", english: "yes" },
    { italian: "no", english: "no" },
    { italian: "uomo", english: "man" },
    { italian: "donna", english: "woman" },
    { italian: "ragazzo", english: "boy" },
    { italian: "ragazza", english: "girl" },
    { italian: "amico", english: "friend" },
    { italian: "famiglia", english: "family" },
    { italian: "casa", english: "house" },
    { italian: "appartamento", english: "apartment" },
    { italian: "scuola", english: "school" },
    { italian: "lavoro", english: "work" },
    { italian: "città", english: "city" },
    { italian: "paese", english: "country" },
    { italian: "auto", english: "car" },
    { italian: "autobus", english: "bus" },
    { italian: "treno", english: "train" },
    { italian: "aereo", english: "plane" },
    { italian: "acqua", english: "water" },
    { italian: "cibo", english: "food" },
    { italian: "pane", english: "bread" },
    { italian: "formaggio", english: "cheese" },
    { italian: "mela", english: "apple" },
    { italian: "vino", english: "wine" },
    { italian: "caffè", english: "coffee" },
    { italian: "tè", english: "tea" },
    { italian: "libro", english: "book" },
    { italian: "giornale", english: "newspaper" },
    { italian: "penna", english: "pen" },
    { italian: "carta", english: "paper" },
    { italian: "computer", english: "computer" },
    { italian: "telefono", english: "phone" },
    { italian: "sedia", english: "chair" },
    { italian: "tavolo", english: "table" },
    { italian: "letto", english: "bed" },
    { italian: "porta", english: "door" },
    { italian: "finestra", english: "window" },
    { italian: "cane", english: "dog" },
    { italian: "gatto", english: "cat" },
    { italian: "uccello", english: "bird" },
    { italian: "pesce", english: "fish" },
    { italian: "sole", english: "sun" },
    { italian: "luna", english: "moon" },
    { italian: "cielo", english: "sky" },
    { italian: "mare", english: "sea" },
    { italian: "montagna", english: "mountain" },
    { italian: "fiume", english: "river" },
    { italian: "albero", english: "tree" },
    { italian: "fiore", english: "flower" },
    { italian: "tempo", english: "time" },
    { italian: "giorno", english: "day" },
    { italian: "notte", english: "night" },
    { italian: "mattina", english: "morning" },
    { italian: "sera", english: "evening" },
    { italian: "ora", english: "hour" },
    { italian: "minuto", english: "minute" },
    { italian: "settimana", english: "week" },
    { italian: "mese", english: "month" },
    { italian: "anno", english: "year" },
    { italian: "lunedì", english: "Monday" },
    { italian: "martedì", english: "Tuesday" },
    { italian: "mercoledì", english: "Wednesday" },
    { italian: "giovedì", english: "Thursday" },
    { italian: "venerdì", english: "Friday" },
    { italian: "sabato", english: "Saturday" },
    { italian: "domenica", english: "Sunday" },
    { italian: "rosso", english: "red" },
    { italian: "blu", english: "blue" },
    { italian: "verde", english: "green" },
    { italian: "giallo", english: "yellow" },
    { italian: "nero", english: "black" },
    { italian: "bianco", english: "white" },
    { italian: "grande", english: "big" },
    { italian: "piccolo", english: "small" },
    { italian: "caldo", english: "hot" },
    { italian: "freddo", english: "cold" },
    { italian: "buono", english: "good" },
    { italian: "cattivo", english: "bad" },
    { italian: "facile", english: "easy" },
    { italian: "difficile", english: "difficult" },
    { italian: "nuovo", english: "new" },
    { italian: "vecchio", english: "old" },
    { italian: "bello", english: "beautiful" },
    { italian: "felice", english: "happy" },
    { italian: "triste", english: "sad" },
    { italian: "parlare", english: "to speak" },
    { italian: "ascoltare", english: "to listen" },
    { italian: "guardare", english: "to watch" },
    { italian: "mangiare", english: "to eat" },
    { italian: "bere", english: "to drink" },
    { italian: "dormire", english: "to sleep" },
    { italian: "andare", english: "to go" },
    { italian: "venire", english: "to come" },
    { italian: "piacere", english: "to like" },
    { italian: "fare", english: "to do/make" },
    { italian: "vedere", english: "to see" },
    { italian: "sapere", english: "to know" },
    { italian: "capire", english: "to understand" },
    { italian: "pensare", english: "to think" },
    { italian: "scrivere", english: "to write" },
    { italian: "leggere", english: "to read" },
    { italian: "comprare", english: "to buy" },
    { italian: "vendere", english: "to sell" },
    { italian: "aprire", english: "to open" },
    { italian: "chiudere", english: "to close" },
    { italian: "giocare", english: "to play" },
    { italian: "lavorare", english: "to work" },
    { italian: "studiare", english: "to study" },
    { italian: "vivere", english: "to live" },
    { italian: "indossare", english: "to wear" },
    { italian: "chiamare", english: "to call" },
    { italian: "aspettare", english: "to wait" },
    { italian: "arrivare", english: "to arrive" },
    { italian: "entrare", english: "to enter" },
    { italian: "uscire", english: "to exit" },
    { italian: "il", english: "the (masculine singular)" },
    { italian: "la", english: "the (feminine singular)" },
    { italian: "i", english: "the (plural)" },
    { italian: "un", english: "a (masculine singular)" },
    { italian: "una", english: "a (feminine singular)" },
    { italian: "e", english: "and" },
    { italian: "o", english: "or" },
    { italian: "ma", english: "but" },
    { italian: "perché", english: "because" },
    { italian: "chi", english: "who" },
    { italian: "cosa", english: "what" },
    { italian: "dove", english: "where" },
    { italian: "quando", english: "when" },
    { italian: "perché", english: "why" },
    { italian: "come", english: "how" },
    { italian: "quanto", english: "how much/many" },
    { italian: "bambino", english: "child" },
    { italian: "madre", english: "mother" },
    { italian: "padre", english: "father" },
    { italian: "fratello", english: "brother" },
    { italian: "sorella", english: "sister" },
    { italian: "zio", english: "uncle" },
    { italian: "zia", english: "aunt" },
    { italian: "nonna", english: "grandmother" },
    { italian: "nonno", english: "grandfather" },
    { italian: "cugino", english: "cousin (male)" },
    { italian: "cugina", english: "cousin (female)" },
    { italian: "bambino", english: "baby" },
    { italian: "amico", english: "friend" },
    { italian: "vicino", english: "neighbor" },
    { italian: "insegnante", english: "teacher" },
    { italian: "studente", english: "student" },
    { italian: "medico", english: "doctor" },
    { italian: "infermiera", english: "nurse" },
    { italian: "poliziotto", english: "police officer" },
    { italian: "vigile del fuoco", english: "firefighter" },
    { italian: "commesso", english: "salesperson" },
    { italian: "cameriere", english: "waiter" },
    { italian: "cameriera", english: "waitress" },
    { italian: "cantante", english: "singer" },
    { italian: "attore", english: "actor" },
    { italian: "artista", english: "artist" },
    { italian: "ufficio", english: "office" },
    { italian: "negozio", english: "store" },
    { italian: "hotel", english: "hotel" },
    { italian: "ristorante", english: "restaurant" },
    { italian: "ospedale", english: "hospital" },
    { italian: "banca", english: "bank" },
    { italian: "chiesa", english: "church" },
    { italian: "museo", english: "museum" },
    { italian: "cinema", english: "cinema" },
    { italian: "parco", english: "park" },
    { italian: "supermercato", english: "supermarket" },
    { italian: "farmacia", english: "pharmacy" },
    { italian: "biblioteca", english: "library" },
    { italian: "libro", english: "book" },
    { italian: "matita", english: "pencil" },
    { italian: "gomma", english: "eraser" },
    { italian: "carta", english: "paper" },
    { italian: "zaino", english: "school bag" },
    { italian: "scarpa", english: "shoe" },
    { italian: "giacca", english: "jacket" },
    { italian: "pantaloni", english: "trousers" },
    { italian: "camicia", english: "shirt" },
    { italian: "gonna", english: "skirt" },
    { italian: "vestito", english: "dress" },
    { italian: "cappello", english: "hat" },
    { italian: "occhiali", english: "glasses" },
    { italian: "orologio", english: "watch" },
    { italian: "borsa", english: "bag" },
    { italian: "chiave", english: "key" },
    { italian: "soldi", english: "money" },
    { italian: "regalo", english: "gift" },
    { italian: "matrimonio", english: "wedding" },
    { italian: "festa", english: "party" },
    { italian: "compleanno", english: "birthday" },
    { italian: "vacanza", english: "vacation" },
    { italian: "musica", english: "music" },
    { italian: "film", english: "movie" },
    { italian: "gioco", english: "game" },
    { italian: "sport", english: "sport" },
    { italian: "calcio", english: "soccer" },
    { italian: "tennis", english: "tennis" },
    { italian: "nuoto", english: "swimming" },
    { italian: "danza", english: "dance" },
    { italian: "canto", english: "singing" },
    { italian: "pittura", english: "painting" },
    { italian: "disegno", english: "drawing" },
    { italian: "fotografia", english: "photography" },
    { italian: "bicicletta", english: "bicycle" },
    { italian: "motocicletta", english: "motorcycle" },
    { italian: "camion", english: "truck" },
    { italian: "barca", english: "boat" },
    { italian: "treno", english: "train" },
    { italian: "aereo", english: "plane" },
    { italian: "cane", english: "dog" },
    { italian: "gatto", english: "cat" },
    { italian: "coniglio", english: "rabbit" },
    { italian: "uccello", english: "bird" },
    { italian: "pesce", english: "fish" },
    { italian: "cavallo", english: "horse" },
    { italian: "mucca", english: "cow" },
    { italian: "maiale", english: "pig" },
    { italian: "pecora", english: "sheep" },
    { italian: "pollo", english: "chicken" },
    { italian: "anatra", english: "duck" },
    { italian: "rana", english: "frog" },
    { italian: "tigre", english: "tiger" },
    { italian: "leone", english: "lion" },
    { italian: "elefante", english: "elephant" },
    { italian: "scimmia", english: "monkey" },
    { italian: "orso", english: "bear" },
    { italian: "serpente", english: "snake" },
    { italian: "sole", english: "sun" },
    { italian: "luna", english: "moon" },
    { italian: "stella", english: "star" },
    { italian: "nuvola", english: "cloud" },
    { italian: "pioggia", english: "rain" },
    { italian: "neve", english: "snow" },
    { italian: "vento", english: "wind" },
    { italian: "tempesta", english: "storm" },
    { italian: "fiore", english: "flower" },
    { italian: "albero", english: "tree" },
    { italian: "erba", english: "grass" },
    { italian: "foglia", english: "leaf" },
    { italian: "terra", english: "earth" },
    { italian: "acqua", english: "water" },
    { italian: "fuoco", english: "fire" },
    { italian: "aria", english: "air" },
    { italian: "montagna", english: "mountain" },
    { italian: "fiume", english: "river" },
    { italian: "lago", english: "lake" },
    { italian: "mare", english: "sea" },
    { italian: "oceano", english: "ocean" },
    { italian: "isola", english: "island" },
    { italian: "deserto", english: "desert" },
    { italian: "foresta", english: "forest" },
    { italian: "spiaggia", english: "beach" },
    { italian: "collina", english: "hill" },
    { italian: "valle", english: "valley" },
    { italian: "strada", english: "road" },
    { italian: "ponte", english: "bridge" },
    { italian: "tunnel", english: "tunnel" },
    { italian: "semaforo", english: "traffic light" },
    { italian: "cartello", english: "sign" },
    { italian: "fermata dell'autobus", english: "bus stop" },
    { italian: "stazione ferroviaria", english: "train station" },
    { italian: "aeroporto", english: "airport" },
    { italian: "porto", english: "harbor" },
    { italian: "municipio", english: "city hall" },
    { italian: "posta", english: "post office" },
    { italian: "stazione di polizia", english: "police station" },
    { italian: "caserma dei pompieri", english: "fire station" },
    { italian: "ospedale", english: "hospital" },
    { italian: "farmacia", english: "pharmacy" },
    { italian: "scuola", english: "school" },
    { italian: "università", english: "university" },
    { italian: "biblioteca", english: "library" },
    { italian: "museo", english: "museum" },
    { italian: "chiesa", english: "church" },
    { italian: "moschea", english: "mosque" },
    { italian: "tempio", english: "temple" },
    { italian: "sinagoga", english: "synagogue" },
    { italian: "hotel", english: "hotel" },
    { italian: "ristorante", english: "restaurant" },
    { italian: "caffetteria", english: "coffee shop" },
    { italian: "panetteria", english: "bakery" },
    { italian: "pasticceria", english: "pastry shop" },
    { italian: "macelleria", english: "butcher shop" },
    { italian: "supermercato", english: "supermarket" },
    { italian: "negozio", english: "store" },
    { italian: "centro commerciale", english: "shopping center" },
    { italian: "cinema", english: "cinema" },
    { italian: "teatro", english: "theater" },
    { italian: "stadio", english: "stadium" },
    { italian: "palestra", english: "gym" },
    { italian: "parco", english: "park" },
    { italian: "giardino", english: "garden" },
    { italian: "zoo", english: "zoo" },
    { italian: "spiaggia", english: "beach" },
    { italian: "piscina", english: "swimming pool" },
    { italian: "museo", english: "museum" },
    { italian: "biblioteca", english: "library" },
    { italian: "libro", english: "book" },
    { italian: "giornale", english: "newspaper" },
    { italian: "rivista", english: "magazine" },
    { italian: "computer", english: "computer" },
    { italian: "telefono", english: "phone" },
    { italian: "televisore", english: "television" },
    { italian: "radio", english: "radio" },
    { italian: "macchina fotografica", english: "camera" },
    { italian: "stampante", english: "printer" },
    { italian: "auto", english: "car" },
    { italian: "autobus", english: "bus" },
    { italian: "treno", english: "train" },
    { italian: "aereo", english: "plane" },
    { italian: "barca", english: "boat" },
    { italian: "bicicletta", english: "bicycle" },
    { italian: "motocicletta", english: "motorcycle" },
    { italian: "camion", english: "truck" },
    { italian: "sedia", english: "chair" },
    { italian: "tavolo", english: "table" },
    { italian: "letto", english: "bed" },
    { italian: "divano", english: "sofa" },
    { italian: "scrivania", english: "desk" },
    { italian: "armadio", english: "wardrobe" },
    { italian: "scaffale", english: "shelf" },
    { italian: "cassetto", english: "drawer" },
    { italian: "porta", english: "door" },
    { italian: "finestra", english: "window" },
    { italian: "parete", english: "wall" },
    { italian: "soffitto", english: "ceiling" },
    { italian: "pavimento", english: "floor" },
    { italian: "cucina", english: "kitchen" },
    { italian: "bagno", english: "bathroom" },
    { italian: "soggiorno", english: "living room" },
    { italian: "camera da letto", english: "bedroom" },
    { italian: "garage", english: "garage" },
    { italian: "giardino", english: "garden" },
    { italian: "balcone", english: "balcony" },
    { italian: "ascensore", english: "elevator" },
    { italian: "scala", english: "stairs" },
    { italian: "laptop", english: "laptop" },
    { italian: "tablet", english: "tablet" },
    { italian: "tastiera", english: "keyboard" },
    { italian: "mouse", english: "mouse" },
    { italian: "schermo", english: "screen" },
    { italian: "altoparlante", english: "speaker" },
    { italian: "auricolari", english: "earphones" },
    { italian: "microfono", english: "microphone" },
    { italian: "internet", english: "internet" },
    { italian: "email", english: "email" },
    { italian: "sito web", english: "website" },
    { italian: "software", english: "software" },
    { italian: "app", english: "app" },
    { italian: "videogioco", english: "video game" },
    { italian: "programma", english: "program" },
    { italian: "nuvola", english: "cloud" },
    { italian: "sole", english: "sun" },
    { italian: "pioggia", english: "rain" },
    { italian: "neve", english: "snow" },
    { italian: "vento", english: "wind" },
    { italian: "tempesta", english: "storm" },
    { italian: "cielo", english: "sky" },
    { italian: "stella", english: "star" },
    { italian: "luna", english: "moon" },
    { italian: "mare", english: "sea" },
    { italian: "oceano", english: "ocean" },
    { italian: "fiume", english: "river" },
    { italian: "lago", english: "lake" },
    { italian: "montagna", english: "mountain" },
    { italian: "foresta", english: "forest" },
    { italian: "deserto", english: "desert" },
    { italian: "isola", english: "island" },
    { italian: "spiaggia", english: "beach" },
    { italian: "prato", english: "meadow" },
    { italian: "valle", english: "valley" },
    { italian: "albero", english: "tree" },
    { italian: "fiore", english: "flower" },
    { italian: "erba", english: "grass" },
    { italian: "foglia", english: "leaf" },
    { italian: "radice", english: "root" },
    { italian: "ramo", english: "branch" },
    { italian: "frutto", english: "fruit" },
    { italian: "verdura", english: "vegetable" },
    { italian: "pane", english: "bread" },
    { italian: "burro", english: "butter" },
    { italian: "formaggio", english: "cheese" },
    { italian: "latte", english: "milk" },
    { italian: "uovo", english: "egg" },
    { italian: "carne", english: "meat" },
    { italian: "pesce", english: "fish" },
    { italian: "riso", english: "rice" },
    { italian: "pasta", english: "pasta" },
    { italian: "sale", english: "salt" },
    { italian: "pepe", english: "pepper" },
    { italian: "zucchero", english: "sugar" },
    { italian: "acqua", english: "water" },
    { italian: "succo", english: "juice" },
    { italian: "caffè", english: "coffee" },
    { italian: "tè", english: "tea" },
    { italian: "vino", english: "wine" },
    { italian: "birra", english: "beer" },
    { italian: "zuppa", english: "soup" },
    { italian: "insalata", english: "salad" },
    { italian: "torta", english: "cake" },
    { italian: "gelato", english: "ice cream" },
    { italian: "caramella", english: "candy" },
    { italian: "cioccolato", english: "chocolate" },
    { italian: "colazione", english: "breakfast" },
    { italian: "pranzo", english: "lunch" },
    { italian: "cena", english: "dinner" },
    { italian: "spuntino", english: "snack" },
    { italian: "ristorante", english: "restaurant" },
    { italian: "cucina", english: "kitchen" },
    { italian: "ricetta", english: "recipe" },
    { italian: "ingrediente", english: "ingredient" },
    { italian: "coltello", english: "knife" },
    { italian: "forchetta", english: "fork" },
    { italian: "cucchiaio", english: "spoon" },
    { italian: "piatto", english: "plate" },
    { italian: "bicchiere", english: "glass" },
    { italian: "tazza", english: "cup" },
    { italian: "ciotola", english: "bowl" },
    { italian: "padella", english: "pan" },
    { italian: "pentola", english: "pot" },
    { italian: "forno", english: "oven" },
    { italian: "frigorifero", english: "refrigerator" },
    { italian: "congelatore", english: "freezer" },
    { italian: "lavastoviglie", english: "dishwasher" }
];

let remainingWordPairs = [...wordPairs];

const italianWordElement = document.getElementById("italian-word");
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
    options[index].dataset.italian = wordPair.italian;
    options[index].dataset.english = wordPair.english;
    remainingWordPairs.splice(rndNum, 1);

    return options[index];
}

// Updated loadNextQuestion function
function loadNextQuestion() {
    questionType = randomizer("multiple-choice", "type-in");

    if (questionType === "multiple-choice") {
        // Show option buttons, hide input container
        document.querySelectorAll('.option-container').forEach(function(element) {
            element.style.display = 'flex';
        });
        document.querySelector('.input-container').style.display = 'none';

        // Existing code for multiple-choice
        const option0 = replaceAndRemoveOption(0);
        const option1 = replaceAndRemoveOption(1);
        const option2 = replaceAndRemoveOption(2);
        const option3 = replaceAndRemoveOption(3);

        chosenOption = randomizer(option0, option1, option2, option3);
        italianWordElement.innerText = chosenOption.dataset.italian;

    } else if (questionType === "type-in") {
        // Hide option buttons, show input container
        document.querySelectorAll('.option-container').forEach(function(element) {
            element.style.display = 'none';
        });
        document.querySelector('.input-container').style.display = 'block';

        // Select a random word pair
        if (remainingWordPairs.length === 0) {
            remainingWordPairs = [...wordPairs];
        }
        const rndNum = Math.floor(Math.random() * remainingWordPairs.length);
        const wordPair = remainingWordPairs[rndNum];
        remainingWordPairs.splice(rndNum, 1);

        chosenWordPair = wordPair;

        italianWordElement.innerText = wordPair.italian;

        // Clear the input field
        document.getElementById('user-input').value = '';
    }
}

// Event listener for the submit button
document.getElementById('submit-button').addEventListener('click', checkInputAnswer);

// Event listener for pressing 'Enter' key in the input field
document.getElementById('user-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        checkInputAnswer();
    }
});

// Function to check the typed answer
function checkInputAnswer() {
    const userAnswer = document.getElementById('user-input').value.trim().toLowerCase();
    const correctAnswer = chosenWordPair.english.toLowerCase();

    if (userAnswer === correctAnswer) {
        score++;
    } else {
        wrongWords.push(`${chosenWordPair.italian} - ${chosenWordPair.english}`); // Add the wrong word
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

function optionClickListener(event) {
    const clickedOption = event.target;
    const selectedEnglish = clickedOption.textContent;
    const correctEnglish = chosenOption.dataset.english;

    if (selectedEnglish !== correctEnglish) {
        wrongWords.push(`${chosenOption.dataset.italian} - ${chosenOption.dataset.english}`); // Yanlış kelimeyi ekle
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