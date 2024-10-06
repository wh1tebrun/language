// quests.js

const questDefinitions = {
  earnXP: {
      base: 30,
      multiplier: 2,
      steps: 10
  },
  dailyStreak: {
      base: 7,
      multiplier: 1.5,
      steps: 10
  },
  completeLessons: {
      base: 100,
      multiplier: 1.2,
      steps: 10
  }
};

document.addEventListener('DOMContentLoaded', function () {
  initializeQuests();
  updateUI();
  setupCompleteButtons();
});

// Initialize quests in localStorage if not present
function initializeQuests() {
  if (!localStorage.getItem('quests')) {
      const quests = {
          earnXP: {
              currentStep: 1,
              colorLevel: 1
          },
          dailyStreak: {
              currentStep: 1,
              colorLevel: 1
          },
          completeLessons: {
              currentStep: 1,
              colorLevel: 1
          }
      };
      localStorage.setItem('quests', JSON.stringify(quests));
  }
}

// Get quest data from localStorage
function getQuests() {
  return JSON.parse(localStorage.getItem('quests'));
}

// Set quest data to localStorage
function setQuests(quests) {
  localStorage.setItem('quests', JSON.stringify(quests));
}

// Calculate required amount for a given quest type and step
function calculateRequiredAmount(questType, step) {
  const quest = questDefinitions[questType];
  return Math.floor(quest.base * Math.pow(quest.multiplier, step - 1));
}

// Update the UI for all quests
function updateUI() {
  const quests = getQuests();

  // Update Earn XP Quest
  updateQuestUI('earnXP', 'points-progress', 'current-points', 'required-points', '30 XP');

  // Update Daily Streak Quest
  updateQuestUI('dailyStreak', 'streak-progress', 'current-streak', 'required-streak', '7 Gün');

  // Update Complete Lessons Quest
  updateQuestUI('completeLessons', 'lessons-progress', 'current-lessons', 'required-lessons', '100 Ders');

  // Update Colors
  updateQuestColors(quests);
}

// Update individual quest UI
function updateQuestUI(questType, progressId, currentId, requiredId, initialRequirement) {
  const quests = getQuests();
  const quest = quests[questType];
  const progressElement = document.getElementById(progressId);
  const currentElement = document.getElementById(currentId);
  const requiredElement = document.getElementById(requiredId);
  const questBox = document.querySelector(`.quest-box[data-quest="${questType}"]`);
  const stepElement = questBox.querySelector(`#current-step-${questType}`);

  const requiredAmount = calculateRequiredAmount(questType, quest.currentStep);
  const currentAmount = getCurrentAmount(questType);

  // Update progress bar
  const percentage = Math.min((currentAmount / requiredAmount) * 100, 100);
  if (progressElement) {
      progressElement.style.width = `${percentage}%`;
  }

  // Update current amount display
  if (currentElement) {
      currentElement.textContent = currentAmount;
  }

  // Update required amount display
  if (requiredElement) {
      requiredElement.textContent = requiredAmount;
  }

  // Update current step display
  if (stepElement) {
      stepElement.textContent = quest.currentStep;
  }
}

// Get current amount based on quest type
function getCurrentAmount(questType) {
  switch (questType) {
      case 'earnXP':
          return parseInt(localStorage.getItem('totalPoints')) || 0;
      case 'dailyStreak':
          return parseInt(localStorage.getItem('dayStreak')) || 0;
      case 'completeLessons':
          return parseInt(localStorage.getItem('completedLessons')) || 0;
      default:
          return 0;
  }
}

// Update quest box colors based on colorLevel
function updateQuestColors(quests) {
  const baseColors = {
      earnXP: '#4CAF50', // Green
      dailyStreak: '#2196F3', // Blue
      completeLessons: '#FF9800' // Orange
  };

  Object.keys(quests).forEach(questType => {
      const quest = quests[questType];
      const questBox = document.querySelector(`.quest-box[data-quest="${questType}"]`);
      if (questBox) {
          const color = shadeColor(baseColors[questType], -10 * (quest.colorLevel - 1));
          questBox.style.border = `2px solid ${color}`;
          questBox.style.backgroundColor = `${color}20`; // Adding transparency
      }
  });
}

// Utility function to darken a hex color
function shadeColor(color, percent) {
  let R = parseInt(color.substring(1, 3), 16);
  let G = parseInt(color.substring(3, 5), 16);
  let B = parseInt(color.substring(5, 7), 16);

  R = Math.floor(R * (100 + percent) / 100);
  G = Math.floor(G * (100 + percent) / 100);
  B = Math.floor(B * (100 + percent) / 100);

  R = (R < 255) ? R : 255;
  G = (G < 255) ? G : 255;
  B = (B < 255) ? B : 255;

  const RR = (R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16);
  const GG = (G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16);
  const BB = (B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16);

  return "#" + RR + GG + BB;
}

// Setup event listeners for Complete Quest buttons
function setupCompleteButtons() {
  const buttons = document.querySelectorAll('.complete-quest-btn');
  buttons.forEach(button => {
      button.addEventListener('click', function () {
          const questBox = this.parentElement;
          const questType = questBox.getAttribute('data-quest');
          completeQuest(questType);
      });
  });
}

// Handle quest completion
function completeQuest(questType) {
  const quests = getQuests();
  const quest = quests[questType];
  const requiredAmount = calculateRequiredAmount(questType, quest.currentStep);
  const currentAmount = getCurrentAmount(questType);

  if (currentAmount >= requiredAmount) {
      // Increment step if not at max
      if (quest.currentStep < questDefinitions[questType].steps) {
          quest.currentStep += 1;
          quest.colorLevel += 1;

          // Removed the following section to prevent modifying total variables
          /*
          if (questType === 'earnXP') {
              let newTotalPoints = currentAmount - requiredAmount;
              localStorage.setItem('totalPoints', newTotalPoints);
          } else if (questType === 'completeLessons') {
              let newCompletedLessons = currentAmount - requiredAmount;
              localStorage.setItem('completedLessons', newCompletedLessons);
          } else if (questType === 'dailyStreak') {
              // Reset streak
              localStorage.setItem('dayStreak', 0);
          }
          */

          setQuests(quests);
          alert(`Congratulations! You've completed step ${quest.currentStep - 1} of ${formatQuestName(questType)}.`);
          
          // Optionally, update gems or rewards here

          updateUI();
      } else {
          alert('You have completed all steps of this quest. Well done!');
      }
  } else {
      alert('You have not yet reached the required amount to complete this quest.');
  }
}

// Helper function to format quest names for alerts
function formatQuestName(questType) {
  switch (questType) {
      case 'earnXP':
          return 'Earn XP';
      case 'dailyStreak':
          return 'Daily Streak';
      case 'completeLessons':
          return 'Complete Lessons';
      default:
          return 'Unknown Quest';
  }
}
