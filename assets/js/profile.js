// profile.js

document.addEventListener('DOMContentLoaded', function () {
  displayProfileStatistics();
  displayQuestAchievements();
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
  if (totalPoints >= 2000) {
    return 'Diamond';
  } else if (totalPoints >= 1000) {
    return 'Platinum';
  } else if (totalPoints >= 500) {
    return 'Gold';
  } else if (totalPoints >= 100) {
    return 'Silver';
  } else {
    return 'Bronze';
  }
}

// Function to get the league icon URL based on the league name
function getLeagueIcon(leagueName) {
  const leagueIcons = {
    'Bronze': 'https://d35aaqx5ub95lt.cloudfront.net/images/leagues/192181672ada150becd83a74a4266ae9.svg',
    'Silver': 'https://d35aaqx5ub95lt.cloudfront.net/images/leagues/02dc8693ec424b149aaf1e99b6a9d2d7.svg',
    'Gold': 'https://d35aaqx5ub95lt.cloudfront.net/images/leagues/b2631ae0ab27c090be57ef2c24210a7b.svg',
    'Platinum': 'https://d35aaqx5ub95lt.cloudfront.net/images/leagues/7cc98c9777e81b5c4e2711b6e88cc6c4.svg',
    'Diamond': 'https://d35aaqx5ub95lt.cloudfront.net/images/leagues/8a12c93104a8941f3f21e9ec105d1e24.svg'
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
      icon: 'https://d35aaqx5ub95lt.cloudfront.net/images/achievements/81de42c0e611eab4e9d6e957cdeb5aa9.svg',
      steps: 10
    },
    dailyStreak: {
      name: 'Wildfire',
      icon: 'https://d35aaqx5ub95lt.cloudfront.net/images/achievements/37b96c87c67b8b2fd5a6a70913791c7d.svg',
      steps: 10
    },
    completeLessons: {
      name: 'Sharpshooter',
      icon: 'https://d35aaqx5ub95lt.cloudfront.net/images/achievements/5e43d70f52ec81e1439fb048ef5cda50.svg',
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
      const currentStep = quest.currentStep || 1;
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
