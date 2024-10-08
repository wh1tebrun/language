// profile.js

document.addEventListener('DOMContentLoaded', function () {
  displayProfileStatistics();
  displayQuestAchievements();
  displayPurchasedItems(); // New function to display purchased items
  updateYear(); // To update the footer year
  updateSelectedFlag(); // To update the selected flag
});

// Function to display profile statistics
function displayProfileStatistics() {
  const dailyStreakElement = document.getElementById('daily-streak');
  const totalXpElement = document.getElementById('total-xp');
  const currentLeagueElement = document.getElementById('current-league');
  const accountCreatedElement = document.getElementById('account-created');
  const lessonsCompletedElement = document.getElementById('lessons-completed');

  // Retrieve data from localStorage
  const dayStreak = localStorage.getItem('dayStreak') || 0;
  const totalPoints = parseInt(localStorage.getItem('totalPoints')) || 0;
  const completedLessons = localStorage.getItem('completedLessons') || 0;
  const accountCreated = localStorage.getItem('accountCreated') || 'None';

  // Calculate currentLeague based on totalPoints
  const currentLeague = calculateLeague(totalPoints);
  // Update 'currentLeague' in localStorage
  localStorage.setItem('currentLeague', currentLeague);

  // Update DOM elements safely
  if (dailyStreakElement) dailyStreakElement.textContent = dayStreak;
  if (totalXpElement) totalXpElement.textContent = totalPoints;
  if (currentLeagueElement) currentLeagueElement.textContent = currentLeague;
  if (accountCreatedElement) accountCreatedElement.textContent = accountCreated;
  if (lessonsCompletedElement) lessonsCompletedElement.textContent = completedLessons;

  // Update league icon
  const leagueIconElement = document.getElementById('league-icon');
  if (leagueIconElement) {
    leagueIconElement.src = getLeagueIcon(currentLeague);
    leagueIconElement.alt = `${currentLeague} League Icon`;
  }
}

// Function to calculate the league based on total XP
function calculateLeague(totalPoints) {
  if (totalPoints >= 20000) {
    return 'Diamond';
  } else if (totalPoints >= 10000) {
    return 'Platinum';
  } else if (totalPoints >= 5000) {
    return 'Gold';
  } else if (totalPoints >= 1000) {
    return 'Silver';
  } else {
    return 'Bronze';
  }
}

// Function to get the league icon URL based on the league name
function getLeagueIcon(leagueName) {
  const leagueIcons = {
    'Bronze': 'https://cdn-icons-png.flaticon.com/512/11881/11881951.png',
    'Silver': 'https://cdn-icons-png.flaticon.com/512/11881/11881953.png',
    'Gold': 'https://cdn-icons-png.flaticon.com/512/11881/11881958.png',
    'Platinum': 'https://cdn-icons-png.flaticon.com/512/5579/5579803.png',
    'Diamond': 'https://cdn-icons-png.flaticon.com/512/1021/1021211.png'
  };
  return leagueIcons[leagueName] || leagueIcons['Bronze'];
}

// Function to display quest achievements
function displayQuestAchievements() {
  const achievementsContainer = document.querySelector('.achievements-list');

  // Check if achievementsContainer exists
  if (!achievementsContainer) {
    console.error('Achievements container not found');
    return;
  }

  // Retrieve quest data from localStorage
  let questsData = localStorage.getItem('quests');
  let quests = {};

  if (questsData) {
    try {
      quests = JSON.parse(questsData);
    } catch (e) {
      console.error('Error parsing quests data:', e);
      quests = {};
    }
  }

  // Quest definitions (should match quests.js)
  const questDefinitions = {
    earnXP: {
      name: 'Sage',
      icon: '../../imgs/sage.png',
      steps: 10
    },
    dailyStreak: {
      name: 'Wildfire',
      icon: '../../imgs/wildfire.png',
      steps: 10
    },
    completeLessons: {
      name: 'Sharpshooter',
      icon: '../../imgs/sharpshooter.png',
      steps: 10
    }
  };

  // Clear existing achievements
  achievementsContainer.innerHTML = '';

  // Loop through each quest and display the achievement
  Object.keys(questDefinitions).forEach(questType => {
    const questDef = questDefinitions[questType];
    const quest = quests[questType];

    // If the quest data exists
    if (quest) {
      const currentStep = quest.currentStep || 0;
      const totalSteps = questDef.steps;

      // Create achievement item
      const achievementItem = document.createElement('div');
      achievementItem.classList.add('stat-item');

      // Create icon element
      const iconElement = document.createElement('img');
      iconElement.src = questDef.icon;
      iconElement.alt = `${questDef.name} Achievement Icon`;
      iconElement.classList.add('stat-icon');

      // Create info container
      const infoContainer = document.createElement('div');
      infoContainer.classList.add('stat-info');

      // Create label
      const labelElement = document.createElement('span');
      labelElement.classList.add('stat-label');
      labelElement.textContent = questDef.name;

      // Create value
      const valueElement = document.createElement('span');
      valueElement.classList.add('stat-value');
      valueElement.textContent = `Level ${currentStep}/${totalSteps}`;

      // Append elements
      infoContainer.appendChild(labelElement);
      infoContainer.appendChild(valueElement);
      achievementItem.appendChild(iconElement);
      achievementItem.appendChild(infoContainer);
      achievementsContainer.appendChild(achievementItem);
    } else {
      // If quest data doesn't exist, you may choose to display it differently or skip it
      console.warn(`Quest data for ${questType} not found`);
    }
  });
}

// Function to display purchased items
function displayPurchasedItems() {
  const purchasedItemsContainer = document.getElementById('purchased-items');

  // Check if the container exists
  if (!purchasedItemsContainer) {
    console.error('Purchased items container not found');
    return;
  }

  // Retrieve purchased items from localStorage
  let purchasedItems = JSON.parse(localStorage.getItem('purchasedItems')) || [];

  // Clear any existing content
  purchasedItemsContainer.innerHTML = '';

  // Display a message if no items are purchased
  if (purchasedItems.length === 0) {
    purchasedItemsContainer.textContent = 'You have not purchased any items yet.';
    return;
  }

  // Loop through purchased items and display them
  purchasedItems.forEach(function (item) {
    const itemElement = document.createElement('div');
    itemElement.classList.add('stat-item');

    // Customize based on your item details
    if (item === 'streak-freeze') {
      itemElement.innerHTML = `
        <img src="../../imgs/streak-freeze.png" alt="Streak Freeze" class="stat-icon">
        <div class="stat-info">
          <span class="stat-label">Streak Freeze</span>
          <span class="stat-value">Purchased</span>
        </div>
      `;
    } else if (item === 'double-or-nothing') {
      itemElement.innerHTML = `
        <img src="../../imgs/double-or-nothing.png" alt="Double or Nothing" class="stat-icon">
        <div class="stat-info">
          <span class="stat-label">Double or Nothing</span>
          <span class="stat-value">Purchased</span>
        </div>
      `;
    }
    // Add more items as needed

    purchasedItemsContainer.appendChild(itemElement);
  });
}

// Function to update the footer year
function updateYear() {
  const yearElement = document.getElementById('year');
  const currentYear = new Date().getFullYear();
  if (yearElement) {
    yearElement.textContent = currentYear;
  }
}

// Function to update the selected flag
function updateSelectedFlag() {
  const selectedFlag = document.getElementById('selected-flag');

  // Retrieve selected flag from localStorage
  let currentFlag = localStorage.getItem('currentFlag') || 'french';

  // Update selected flag image
  if (selectedFlag) {
    selectedFlag.src = `../../imgs/${currentFlag}.jpg`;
  }
}
