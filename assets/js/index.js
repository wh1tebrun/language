document.addEventListener('DOMContentLoaded', function () {
    const selectedFlag = document.getElementById('selected-flag');
    const learnButton = document.getElementById('learn-btn');
    const flagDropdown = document.getElementById('flag-dropdown');
    const flags = ['french', 'german', 'italian', 'russian'];

    // Set the initial selected flag from localStorage or default to 'french'
    let currentFlag = localStorage.getItem('currentFlag') || 'french';

    // Update the selected flag image
    selectedFlag.src = `imgs/${currentFlag}.jpg`;

    // learnButton.addEventListener('click', function (e) {
    //     e.preventDefault();
    //     let currentFlagSrc = selectedFlag.src;

    //     if (currentFlagSrc.includes('french.jpg')) {
    //         window.location.href = 'assets/html/french.html';
    //     } else if (currentFlagSrc.includes('german.jpg')) {
    //         window.location.href = 'assets/html/german.html';
    //     } else if (currentFlagSrc.includes('italian.jpg')) {
    //         window.location.href = 'assets/html/italian.html';
    //     } else if (currentFlagSrc.includes('russian.jpg')) {
    //         window.location.href = 'assets/html/russian.html';
    //     }
    // });

    function updateDropdown() {
        flagDropdown.innerHTML = '';
        flags.forEach(function (flag) {
            if (flag !== currentFlag) {
                const a = document.createElement('a');
                a.href = '#';
                a.dataset.flag = flag;
                const img = document.createElement('img');
                img.src = `imgs/${flag}.jpg`;
                img.alt = `${flag.charAt(0).toUpperCase() + flag.slice(1)} Flag`;
                img.classList.add('small-flag');
                a.appendChild(img);
                flagDropdown.appendChild(a);

                // Flag selection event listener
                a.addEventListener('click', function (e) {
                    e.preventDefault();
                    currentFlag = flag;
                    selectedFlag.src = `imgs/${flag}.jpg`;
                    localStorage.setItem('currentFlag', currentFlag); // Bayrağı localStorage'a kaydet
                    updateDropdown();
                });
            }
        });
    }

    updateDropdown();

    // Updates the year in the footer dynamically
    document.getElementById('year').textContent = new Date().getFullYear();

    // Günlük Giriş Serisi İşlemleri
    let lastVisit = localStorage.getItem('lastVisit');
    let dayStreak = parseInt(localStorage.getItem('dayStreak')) || 0;
    let today = new Date().setHours(0, 0, 0, 0);

    if (lastVisit) {
        let lastVisitDate = new Date(parseInt(lastVisit));
        let diffDays = Math.floor((today - lastVisitDate.setHours(0, 0, 0, 0)) / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
            dayStreak += 1;
        } else if (diffDays > 1) {
            dayStreak = 0; // Eğer bir günden fazla geçmişse seriyi sıfırla
        }
        // Eğer diffDays === 0 ise aynı gün içinde tekrar giriş yapıldı, seriyi artırma
    } else {
        dayStreak = 1; // İlk ziyaret
    }

    localStorage.setItem('lastVisit', today);
    localStorage.setItem('dayStreak', dayStreak);

    // Streak numarasını güncelle
    document.getElementById('streak-number').textContent = dayStreak;

    // Eğer quests.html'deysek, oradaki streak bilgisini güncelle
    if (window.location.pathname.endsWith('quests.html')) {
        // Puan ve kelime öğrenme görevlerini de güncelle
        let totalPoints = parseInt(localStorage.getItem('totalPoints')) || 0;
        let wordsLearned = parseInt(localStorage.getItem('wordsLearned')) || 0;

        // Puan görevini güncelle
        let pointsProgress = document.getElementById('points-progress');
        let currentPoints = document.getElementById('current-points');
        currentPoints.textContent = totalPoints;
        pointsProgress.style.width = Math.min((totalPoints / 30) * 100, 100) + '%';

        // Kelime öğrenme görevini güncelle
        let wordsProgress = document.getElementById('words-progress');
        let currentWords = document.getElementById('current-words');
        currentWords.textContent = wordsLearned;
        wordsProgress.style.width = Math.min((wordsLearned / 100) * 100, 100) + '%';

        // Günlük giriş serisini güncelle
        let currentStreak = document.getElementById('current-streak');
        let streakProgress = document.getElementById('streak-progress');
        currentStreak.textContent = dayStreak;
        streakProgress.style.width = Math.min((dayStreak / 7) * 100, 100) + '%';
    }
});
