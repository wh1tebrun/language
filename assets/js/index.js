// index.js

document.addEventListener('DOMContentLoaded', function () {
    // -----------------------------
    // Flag Selection Elements
    // -----------------------------
    const selectedFlag = document.getElementById('selected-flag');
    const learnButton = document.getElementById('learn-btn');
    const flagDropdown = document.getElementById('flag-dropdown');
    const flags = ['french', 'german', 'italian', 'russian']; // Add or remove flags as needed

    // Initialize currentFlag from localStorage or default to 'french'
    let currentFlag = localStorage.getItem('currentFlag') || 'french';
    selectedFlag.src = `../../imgs/${currentFlag}.jpg`; // Adjust path as necessary

    // -----------------------------
    // Initialize Points and Scores
    // -----------------------------
    // Initialize totalPoints if not set
    if (localStorage.getItem('totalPoints') === null) {
        localStorage.setItem('totalPoints', '0');
    }

    // Initialize bestScore if not set
    if (localStorage.getItem('bestScore') === null) {
        localStorage.setItem('bestScore', '0');
    }

    // Initialize flagsCompleted if not set
    if (localStorage.getItem('flagsCompleted') === null) {
        localStorage.setItem('flagsCompleted', '0');
    }

    // Initialize completedLessons if not set (replacing wordsLearned)
    if (localStorage.getItem('completedLessons') === null) {
        localStorage.setItem('completedLessons', '0');
    }

    // -----------------------------
    // Update Dropdown with Flags
    // -----------------------------
    function updateDropdown() {
        flagDropdown.innerHTML = '';

        flags.forEach(function (flag) {
            if (flag !== currentFlag) {
                const a = document.createElement('a');
                a.href = '#';
                a.dataset.flag = flag;

                const img = document.createElement('img');
                img.src = `../../imgs/${flag}.jpg`; // Adjust path as necessary
                img.alt = `${capitalizeFirstLetter(flag)} Flag`;
                img.classList.add('small-flag');

                a.appendChild(img);
                flagDropdown.appendChild(a);

                // Flag selection event listener
                a.addEventListener('click', function (e) {
                    e.preventDefault();
                    currentFlag = flag;
                    selectedFlag.src = `../../imgs/${flag}.jpg`; // Adjust path as necessary
                    localStorage.setItem('currentFlag', currentFlag);
                    updateDropdown();
                });
            }
        });
    }

    // Helper function to capitalize the first letter
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    updateDropdown();

    // -----------------------------
    // Update the Year in the Footer
    // -----------------------------
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // -----------------------------
    // Daily Streak Management
    // -----------------------------
    let lastVisit = localStorage.getItem('lastVisit');
    let dayStreak = parseInt(localStorage.getItem('dayStreak')) || 0;
    let today = new Date().setHours(0, 0, 0, 0);

    if (lastVisit) {
        let lastVisitDate = new Date(parseInt(lastVisit));
        let diffDays = Math.floor((today - lastVisitDate.setHours(0, 0, 0, 0)) / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
            dayStreak += 1;
        } else if (diffDays > 1) {
            dayStreak = 1; // Reset to 1 instead of 0 to count today
        }
        // If diffDays === 0, do not change the streak
    } else {
        dayStreak = 1; // First visit
    }

    localStorage.setItem('lastVisit', today);
    localStorage.setItem('dayStreak', dayStreak);

    // Update streak number in UI
    const streakNumber = document.querySelector('#streak-number');
    if (streakNumber) {
        streakNumber.textContent = dayStreak;
    }

    // -----------------------------
    // Quests Page: Update Progress
    // -----------------------------
    if (window.location.pathname.endsWith('quests.html')) {
        // Retrieve stored values
        let totalPoints = parseInt(localStorage.getItem('totalPoints')) || 0;
        let completedLessons = parseInt(localStorage.getItem('completedLessons')) || 0; // Updated
        let bestScore = parseInt(localStorage.getItem('bestScore')) || 0;
        let flagsCompleted = parseInt(localStorage.getItem('flagsCompleted')) || 0;
        let dayStreak = parseInt(localStorage.getItem('dayStreak')) || 0;

        // Update Points Progress
        const pointsProgress = document.getElementById('points-progress');
        const currentPoints = document.getElementById('current-points');
        if (currentPoints) currentPoints.textContent = totalPoints;
        if (pointsProgress) pointsProgress.style.width = `${Math.min((totalPoints / 30) * 100, 100)}%`;

        // Update Completed Lessons Progress (replacing Words Learned)
        const lessonsProgress = document.getElementById('lessons-progress');
        const currentLessons = document.getElementById('current-lessons');
        if (currentLessons) currentLessons.textContent = completedLessons;
        if (lessonsProgress) lessonsProgress.style.width = `${Math.min((completedLessons / 100) * 100, 100)}%`; // Adjust max as needed

        // Update Streak Progress
        const currentStreak = document.getElementById('current-streak');
        const streakProgress = document.getElementById('streak-progress');
        if (currentStreak) currentStreak.textContent = dayStreak;
        if (streakProgress) streakProgress.style.width = `${Math.min((dayStreak / 7) * 100, 100)}%`;
    }

    // -----------------------------
    // Learn Button Event Listener (Optional)
    // -----------------------------
    /*
    Uncomment and modify this section if you want to enable the Learn button navigation.

    learnButton.addEventListener('click', function (e) {
        e.preventDefault();
        let currentFlagSrc = selectedFlag.src;

        if (currentFlagSrc.includes('french.jpg')) {
            window.location.href = 'assets/html/french.html';
        } else if (currentFlagSrc.includes('german.jpg')) {
            window.location.href = 'assets/html/german.html';
        } else if (currentFlagSrc.includes('italian.jpg')) {
            window.location.href = 'assets/html/italian.html';
        } else if (currentFlagSrc.includes('russian.jpg')) {
            window.location.href = 'assets/html/russian.html';
        }
    });
    */
});
