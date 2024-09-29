// french.js

let counter = 0; // Yapılan tur sayısı
let score = 0;   // Doğru cevap sayısı

function updateHighscore(newScore) {
    const oldHighscore = parseInt(localStorage.getItem('bestScore')) || 0;

    if (newScore > oldHighscore) {
        localStorage.setItem('bestScore', newScore);
        document.getElementById("best_score").innerText = newScore;
    }
}

var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
let timePassed = setInterval(setTime, 1000);

function setTime() {
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
    var valString = val + "";
    return valString.length < 2 ? "0" + valString : valString;
}

function openResult() {
    document.getElementById("menu").style.display = "block";
}

function closeResult() {
    document.getElementById("menu").style.display = "none";
}

function randomizer(...options) {
    const rndIndex = Math.floor(Math.random() * options.length);
    return options[rndIndex];
}

const jsConfetti = new JSConfetti();

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

const options = Array.from(document.getElementsByClassName("option-button"));

const wordPairs = [
    { french: "bonjour", english: "hello" },
    { french: "au revoir", english: "goodbye" },
    { french: "merci", english: "thank you" },
    { french: "s'il vous plaît", english: "please" },
    { french: "oui", english: "yes" },
    { french: "non", english: "no" },
    { french: "homme", english: "man" },
    { french: "femme", english: "woman" },
    { french: "garçon", english: "boy" },
    { french: "fille", english: "girl" },
    { french: "ami", english: "friend" },
    { french: "famille", english: "family" },
    { french: "maison", english: "house" },
    { french: "appartement", english: "apartment" },
    { french: "école", english: "school" },
    { french: "travail", english: "work" },
    { french: "ville", english: "city" },
    { french: "pays", english: "country" },
    { french: "voiture", english: "car" },
    { french: "bus", english: "bus" },
    { french: "train", english: "train" },
    { french: "avion", english: "plane" },
    { french: "eau", english: "water" },
    { french: "nourriture", english: "food" },
    { french: "pain", english: "bread" },
    { french: "fromage", english: "cheese" },
    { french: "pomme", english: "apple" },
    { french: "vin", english: "wine" },
    { french: "café", english: "coffee" },
    { french: "thé", english: "tea" },
    { french: "livre", english: "book" },
    { french: "journal", english: "newspaper" },
    { french: "stylo", english: "pen" },
    { french: "papier", english: "paper" },
    { french: "ordinateur", english: "computer" },
    { french: "téléphone", english: "phone" },
    { french: "chaise", english: "chair" },
    { french: "table", english: "table" },
    { french: "lit", english: "bed" },
    { french: "porte", english: "door" },
    { french: "fenêtre", english: "window" },
    { french: "chien", english: "dog" },
    { french: "chat", english: "cat" },
    { french: "oiseau", english: "bird" },
    { french: "poisson", english: "fish" },
    { french: "soleil", english: "sun" },
    { french: "lune", english: "moon" },
    { french: "ciel", english: "sky" },
    { french: "mer", english: "sea" },
    { french: "montagne", english: "mountain" },
    { french: "rivière", english: "river" },
    { french: "arbre", english: "tree" },
    { french: "fleur", english: "flower" },
    { french: "temps", english: "time" },
    { french: "jour", english: "day" },
    { french: "nuit", english: "night" },
    { french: "matin", english: "morning" },
    { french: "soir", english: "evening" },
    { french: "heure", english: "hour" },
    { french: "minute", english: "minute" },
    { french: "semaine", english: "week" },
    { french: "mois", english: "month" },
    { french: "année", english: "year" },
    { french: "lundi", english: "Monday" },
    { french: "mardi", english: "Tuesday" },
    { french: "mercredi", english: "Wednesday" },
    { french: "jeudi", english: "Thursday" },
    { french: "vendredi", english: "Friday" },
    { french: "samedi", english: "Saturday" },
    { french: "dimanche", english: "Sunday" },
    { french: "rouge", english: "red" },
    { french: "bleu", english: "blue" },
    { french: "vert", english: "green" },
    { french: "jaune", english: "yellow" },
    { french: "noir", english: "black" },
    { french: "blanc", english: "white" },
    { french: "grand", english: "big" },
    { french: "petit", english: "small" },
    { french: "chaud", english: "hot" },
    { french: "froid", english: "cold" },
    { french: "bon", english: "good" },
    { french: "mauvais", english: "bad" },
    { french: "facile", english: "easy" },
    { french: "difficile", english: "difficult" },
    { french: "nouveau", english: "new" },
    { french: "vieux", english: "old" },
    { french: "beau", english: "beautiful" },
    { french: "heureux", english: "happy" },
    { french: "triste", english: "sad" },
    { french: "parler", english: "to speak" },
    { french: "écouter", english: "to listen" },
    { french: "regarder", english: "to watch" },
    { french: "manger", english: "to eat" },
    { french: "boire", english: "to drink" },
    { french: "dormir", english: "to sleep" },
    { french: "aller", english: "to go" },
    { french: "venir", english: "to come" },
    { french: "aimer", english: "to like" },
    { french: "faire", english: "to do/make" },
    { french: "voir", english: "to see" },
    { french: "savoir", english: "to know" },
    { french: "comprendre", english: "to understand" },
    { french: "penser", english: "to think" },
    { french: "écrire", english: "to write" },
    { french: "lire", english: "to read" },
    { french: "acheter", english: "to buy" },
    { french: "vendre", english: "to sell" },
    { french: "ouvrir", english: "to open" },
    { french: "fermer", english: "to close" },
    { french: "jouer", english: "to play" },
    { french: "travailler", english: "to work" },
    { french: "étudier", english: "to study" },
    { french: "habiter", english: "to live" },
    { french: "porter", english: "to wear" },
    { french: "appeler", english: "to call" },
    { french: "attendre", english: "to wait" },
    { french: "arriver", english: "to arrive" },
    { french: "entrer", english: "to enter" },
    { french: "sortir", english: "to exit" },
    { french: "le", english: "the (masculine singular)" },
    { french: "la", english: "the (feminine singular)" },
    { french: "les", english: "the (plural)" },
    { french: "un", english: "a (masculine singular)" },
    { french: "une", english: "a (feminine singular)" },
    { french: "et", english: "and" },
    { french: "ou", english: "or" },
    { french: "mais", english: "but" },
    { french: "parce que", english: "because" },
    { french: "qui", english: "who" },
    { french: "quoi", english: "what" },
    { french: "où", english: "where" },
    { french: "quand", english: "when" },
    { french: "pourquoi", english: "why" },
    { french: "comment", english: "how" },
    { french: "combien", english: "how much/many" },
    { french: "enfant", english: "child" },
    { french: "mère", english: "mother" },
    { french: "père", english: "father" },
    { french: "frère", english: "brother" },
    { french: "sœur", english: "sister" },
    { french: "oncle", english: "uncle" },
    { french: "tante", english: "aunt" },
    { french: "grand-mère", english: "grandmother" },
    { french: "grand-père", english: "grandfather" },
    { french: "cousin", english: "cousin (male)" },
    { french: "cousine", english: "cousin (female)" },
    { french: "bébé", english: "baby" },
    { french: "ami", english: "friend" },
    { french: "voisin", english: "neighbor" },
    { french: "professeur", english: "teacher" },
    { french: "étudiant", english: "student" },
    { french: "docteur", english: "doctor" },
    { french: "infirmière", english: "nurse" },
    { french: "policier", english: "police officer" },
    { french: "pompier", english: "firefighter" },
    { french: "vendeur", english: "salesperson" },
    { french: "serveur", english: "waiter" },
    { french: "serveuse", english: "waitress" },
    { french: "chanteur", english: "singer" },
    { french: "acteur", english: "actor" },
    { french: "artiste", english: "artist" },
    { french: "bureau", english: "office" },
    { french: "magasin", english: "store" },
    { french: "hôtel", english: "hotel" },
    { french: "restaurant", english: "restaurant" },
    { french: "hôpital", english: "hospital" },
    { french: "banque", english: "bank" },
    { french: "église", english: "church" },
    { french: "musée", english: "museum" },
    { french: "cinéma", english: "cinema" },
    { french: "parc", english: "park" },
    { french: "supermarché", english: "supermarket" },
    { french: "pharmacie", english: "pharmacy" },
    { french: "bibliothèque", english: "library" },
    { french: "livre", english: "book" },
    { french: "crayon", english: "pencil" },
    { french: "gomme", english: "eraser" },
    { french: "papier", english: "paper" },
    { french: "cartable", english: "school bag" },
    { french: "chaussure", english: "shoe" },
    { french: "veste", english: "jacket" },
    { french: "pantalon", english: "trousers" },
    { french: "chemise", english: "shirt" },
    { french: "jupe", english: "skirt" },
    { french: "robe", english: "dress" },
    { french: "chapeau", english: "hat" },
    { french: "lunettes", english: "glasses" },
    { french: "montre", english: "watch" },
    { french: "sac", english: "bag" },
    { french: "clé", english: "key" },
    { french: "argent", english: "money" },
    { french: "cadeau", english: "gift" },
    { french: "mariage", english: "wedding" },
    { french: "fête", english: "party" },
    { french: "anniversaire", english: "birthday" },
    { french: "vacances", english: "vacation" },
    { french: "musique", english: "music" },
    { french: "film", english: "movie" },
    { french: "jeu", english: "game" },
    { french: "sport", english: "sport" },
    { french: "football", english: "soccer" },
    { french: "tennis", english: "tennis" },
    { french: "natation", english: "swimming" },
    { french: "danse", english: "dance" },
    { french: "chant", english: "singing" },
    { french: "peinture", english: "painting" },
    { french: "dessin", english: "drawing" },
    { french: "photographie", english: "photography" },
    { french: "vélo", english: "bicycle" },
    { french: "moto", english: "motorcycle" },
    { french: "camion", english: "truck" },
    { french: "bateau", english: "boat" },
    { french: "train", english: "train" },
    { french: "avion", english: "plane" },
    { french: "chien", english: "dog" },
    { french: "chat", english: "cat" },
    { french: "lapin", english: "rabbit" },
    { french: "oiseau", english: "bird" },
    { french: "poisson", english: "fish" },
    { french: "cheval", english: "horse" },
    { french: "vache", english: "cow" },
    { french: "cochon", english: "pig" },
    { french: "mouton", english: "sheep" },
    { french: "poule", english: "chicken" },
    { french: "canard", english: "duck" },
    { french: "grenouille", english: "frog" },
    { french: "tigre", english: "tiger" },
    { french: "lion", english: "lion" },
    { french: "éléphant", english: "elephant" },
    { french: "singe", english: "monkey" },
    { french: "ours", english: "bear" },
    { french: "serpent", english: "snake" },
    { french: "soleil", english: "sun" },
    { french: "lune", english: "moon" },
    { french: "étoile", english: "star" },
    { french: "nuage", english: "cloud" },
    { french: "pluie", english: "rain" },
    { french: "neige", english: "snow" },
    { french: "vent", english: "wind" },
    { french: "orage", english: "storm" },
    { french: "fleur", english: "flower" },
    { french: "arbre", english: "tree" },
    { french: "herbe", english: "grass" },
    { french: "feuille", english: "leaf" },
    { french: "terre", english: "earth" },
    { french: "eau", english: "water" },
    { french: "feu", english: "fire" },
    { french: "air", english: "air" },
    { french: "montagne", english: "mountain" },
    { french: "rivière", english: "river" },
    { french: "lac", english: "lake" },
    { french: "mer", english: "sea" },
    { french: "océan", english: "ocean" },
    { french: "île", english: "island" },
    { french: "désert", english: "desert" },
    { french: "forêt", english: "forest" },
    { french: "plage", english: "beach" },
    { french: "colline", english: "hill" },
    { french: "valée", english: "valley" },
    { french: "route", english: "road" },
    { french: "pont", english: "bridge" },
    { french: "tunnel", english: "tunnel" },
    { french: "feu de circulation", english: "traffic light" },
    { french: "panneau", english: "sign" },
    { french: "arrêt de bus", english: "bus stop" },
    { french: "gare", english: "train station" },
    { french: "aéroport", english: "airport" },
    { french: "port", english: "harbor" },
    { french: "mairie", english: "city hall" },
    { french: "poste", english: "post office" },
    { french: "commissariat", english: "police station" },
    { french: "caserne de pompiers", english: "fire station" },
    { french: "hôpital", english: "hospital" },
    { french: "pharmacie", english: "pharmacy" },
    { french: "école", english: "school" },
    { french: "université", english: "university" },
    { french: "bibliothèque", english: "library" },
    { french: "musée", english: "museum" },
    { french: "église", english: "church" },
    { french: "mosquée", english: "mosque" },
    { french: "temple", english: "temple" },
    { french: "synagogue", english: "synagogue" },
    { french: "hôtel", english: "hotel" },
    { french: "restaurant", english: "restaurant" },
    { french: "café", english: "coffee shop" },
    { french: "boulangerie", english: "bakery" },
    { french: "pâtisserie", english: "pastry shop" },
    { french: "boucherie", english: "butcher shop" },
    { french: "supermarché", english: "supermarket" },
    { french: "magasin", english: "store" },
    { french: "centre commercial", english: "shopping center" },
    { french: "cinéma", english: "cinema" },
    { french: "théâtre", english: "theater" },
    { french: "stade", english: "stadium" },
    { french: "gymnase", english: "gym" },
    { french: "parc", english: "park" },
    { french: "jardin", english: "garden" },
    { french: "zoo", english: "zoo" },
    { french: "plage", english: "beach" },
    { french: "piscine", english: "swimming pool" },
    { french: "musée", english: "museum" },
    { french: "bibliothèque", english: "library" },
    { french: "livre", english: "book" },
    { french: "journal", english: "newspaper" },
    { french: "magazine", english: "magazine" },
    { french: "ordinateur", english: "computer" },
    { french: "téléphone", english: "phone" },
    { french: "télévision", english: "television" },
    { french: "radio", english: "radio" },
    { french: "appareil photo", english: "camera" },
    { french: "imprimante", english: "printer" },
    { french: "voiture", english: "car" },
    { french: "bus", english: "bus" },
    { french: "train", english: "train" },
    { french: "avion", english: "plane" },
    { french: "bateau", english: "boat" },
    { french: "vélo", english: "bicycle" },
    { french: "moto", english: "motorcycle" },
    { french: "camion", english: "truck" },
    { french: "chaise", english: "chair" },
    { french: "table", english: "table" },
    { french: "lit", english: "bed" },
    { french: "canapé", english: "sofa" },
    { french: "bureau", english: "desk" },
    { french: "armoire", english: "wardrobe" },
    { french: "étagère", english: "shelf" },
    { french: "tiroir", english: "drawer" },
    { french: "porte", english: "door" },
    { french: "fenêtre", english: "window" },
    { french: "mur", english: "wall" },
    { french: "plafond", english: "ceiling" },
    { french: "sol", english: "floor" },
    { french: "cuisine", english: "kitchen" },
    { french: "salle de bain", english: "bathroom" },
    { french: "salon", english: "living room" },
    { french: "chambre", english: "bedroom" },
    { french: "garage", english: "garage" },
    { french: "jardin", english: "garden" },
    { french: "balcon", english: "balcony" },
    { french: "ascenseur", english: "elevator" },
    { french: "escalier", english: "stairs" },
    { french: "ordinateur portable", english: "laptop" },
    { french: "tablette", english: "tablet" },
    { french: "clavier", english: "keyboard" },
    { french: "souris", english: "mouse" },
    { french: "écran", english: "screen" },
    { french: "haut-parleur", english: "speaker" },
    { french: "écouteurs", english: "earphones" },
    { french: "microphone", english: "microphone" },
    { french: "internet", english: "internet" },
    { french: "email", english: "email" },
    { french: "site web", english: "website" },
    { french: "logiciel", english: "software" },
    { french: "application", english: "app" },
    { french: "jeu vidéo", english: "video game" },
    { french: "programme", english: "program" },
    { french: "nuage", english: "cloud" },
    { french: "soleil", english: "sun" },
    { french: "pluie", english: "rain" },
    { french: "neige", english: "snow" },
    { french: "vent", english: "wind" },
    { french: "orage", english: "storm" },
    { french: "ciel", english: "sky" },
    { french: "étoile", english: "star" },
    { french: "lune", english: "moon" },
    { french: "mer", english: "sea" },
    { french: "océan", english: "ocean" },
    { french: "rivière", english: "river" },
    { french: "lac", english: "lake" },
    { french: "montagne", english: "mountain" },
    { french: "forêt", english: "forest" },
    { french: "désert", english: "desert" },
    { french: "île", english: "island" },
    { french: "plage", english: "beach" },
    { french: "prairie", english: "meadow" },
    { french: "vallée", english: "valley" },
    { french: "arbre", english: "tree" },
    { french: "fleur", english: "flower" },
    { french: "herbe", english: "grass" },
    { french: "feuille", english: "leaf" },
    { french: "racine", english: "root" },
    { french: "branche", english: "branch" },
    { french: "fruit", english: "fruit" },
    { french: "légume", english: "vegetable" },
    { french: "pain", english: "bread" },
    { french: "beurre", english: "butter" },
    { french: "fromage", english: "cheese" },
    { french: "lait", english: "milk" },
    { french: "œuf", english: "egg" },
    { french: "viande", english: "meat" },
    { french: "poisson", english: "fish" },
    { french: "riz", english: "rice" },
    { french: "pâtes", english: "pasta" },
    { french: "sel", english: "salt" },
    { french: "poivre", english: "pepper" },
    { french: "sucre", english: "sugar" },
    { french: "eau", english: "water" },
    { french: "jus", english: "juice" },
    { french: "café", english: "coffee" },
    { french: "thé", english: "tea" },
    { french: "vin", english: "wine" },
    { french: "bière", english: "beer" },
    { french: "soupe", english: "soup" },
    { french: "salade", english: "salad" },
    { french: "gâteau", english: "cake" },
    { french: "glace", english: "ice cream" },
    { french: "bonbon", english: "candy" },
    { french: "chocolat", english: "chocolate" },
    { french: "petit-déjeuner", english: "breakfast" },
    { french: "déjeuner", english: "lunch" },
    { french: "dîner", english: "dinner" },
    { french: "goûter", english: "snack" },
    { french: "restaurant", english: "restaurant" },
    { french: "cuisine", english: "kitchen" },
    { french: "recette", english: "recipe" },
    { french: "ingrédient", english: "ingredient" },
    { french: "couteau", english: "knife" },
    { french: "fourchette", english: "fork" },
    { french: "cuillère", english: "spoon" },
    { french: "assiette", english: "plate" },
    { french: "verre", english: "glass" },
    { french: "tasse", english: "cup" },
    { french: "bol", english: "bowl" },
    { french: "poêle", english: "pan" },
    { french: "casserole", english: "pot" },
    { french: "four", english: "oven" },
    { french: "réfrigérateur", english: "refrigerator" },
    { french: "congélateur", english: "freezer" },
    { french: "lave-vaisselle", english: "dishwasher" },
    
];


let remainingWordPairs = [...wordPairs];

const frenchWordElement = document.getElementById("french-word");
const flagsDone = document.getElementById("flags-done");
const flagsDone2 = document.getElementById("flags-done2");
const valueOfRound = document.getElementById("value-of-round");
const totalScoreElement = document.getElementById("total_score");
const playAgainButtons = Array.from(document.getElementsByClassName("stats-btn__again2"));

function replaceAndRemoveOption(index) {
    if (remainingWordPairs.length === 0) {
        remainingWordPairs = [...wordPairs];
    }

    const rndNum = Math.floor(getRandomArbitrary(0, remainingWordPairs.length));
    const wordPair = remainingWordPairs[rndNum];

    options[index].textContent = wordPair.english;
    options[index].dataset.french = wordPair.french;
    options[index].dataset.english = wordPair.english;

    remainingWordPairs.splice(rndNum, 1);

    return options[index];
}

let chosenOption;

window.onload = () => {
    closeResult();

    // En iyi skoru göster
    const savedBestScore = localStorage.getItem('bestScore');
    if (savedBestScore !== null) {
        document.getElementById("best_score").innerText = savedBestScore;
    } else {
        document.getElementById("best_score").innerText = 0;
    }

    // Seçenekleri başlat
    const option0 = replaceAndRemoveOption(0);
    const option1 = replaceAndRemoveOption(1);
    const option2 = replaceAndRemoveOption(2);
    const option3 = replaceAndRemoveOption(3);

    chosenOption = randomizer(option0, option1, option2, option3);
    frenchWordElement.innerText = chosenOption.dataset.french;

    valueOfRound.innerText = slider.value;
    flagsDone2.innerText = counter;
};

function optionClickListener(event) {
    const clickedOption = event.target;
    const selectedEnglish = clickedOption.textContent;
    const correctEnglish = chosenOption.dataset.english;

    // Cevabı kontrol et
    if (selectedEnglish === correctEnglish) {
        score++; // Doğru cevap için puan arttır
    }

    counter++; // Tur sayısını arttır
    flagsDone2.innerText = counter; // Ekranda tur sayısını güncelle

    if (counter >= parseInt(output.innerHTML, 10)) {
        // Oyun bittiğinde sonuç ekranını aç

        // Tüm seçenekleri devre dışı bırak
        options.forEach((option) => {
            option.disabled = true;
        });

        // Toplam puanı ve yapılan tur sayısını sonuç ekranında göster
        totalScoreElement.innerText = score;
        flagsDone.innerText = counter;

        // Zamanlayıcıyı durdur
        clearInterval(timePassed);

        // En iyi skoru güncelle
        updateHighscore(score);

        // Sonuç ekranını aç
        openResult();

        jsConfetti.addConfetti({
            emojis: ['🌟', '🎉', '✨', '🔥'],
        });
    } else {
        // Sonraki soruya geç

        // Seçenekleri güncelle
        const option0 = replaceAndRemoveOption(0);
        const option1 = replaceAndRemoveOption(1);
        const option2 = replaceAndRemoveOption(2);
        const option3 = replaceAndRemoveOption(3);

        chosenOption = randomizer(option0, option1, option2, option3);
        frenchWordElement.innerText = chosenOption.dataset.french;
    }

    if (counter >= 1) {
        document.getElementById("myRange").disabled = true;
    }
}

// Butonlara olay dinleyicileri ekleyin
options.forEach((option) => {
    option.addEventListener("click", optionClickListener);
});

// Slider kodu
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;
valueOfRound.innerHTML = slider.value;

slider.oninput = function () {
    output.innerHTML = this.value;
    valueOfRound.innerHTML = slider.value;
};
