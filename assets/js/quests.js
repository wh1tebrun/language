// quests.js

const questDefinitions = {
    earnXP: {
        base: 30,
        multiplier: 2,
        steps: 10,
        unit: 'XP',
        actionText: 'Earn',
        gemReward: 100 // Gems rewarded per step
    },
    dailyStreak: {
        base: 7,
        multiplier: 1.5,
        steps: 10,
        unit: 'day',
        actionText: 'Reach a',
        gemReward: 150 // Gems rewarded per step
    },
    completeLessons: {
        base: 100,
        multiplier: 1.2,
        steps: 10,
        unit: 'Lesson',
        actionText: 'Complete',
        gemReward: 200 // Gems rewarded per step
    }
};

const colorLevels = [
    '#4CAF50', // Green
    '#43A047', // Greenish Teal
    '#2196F3', // Blue
    '#1976D2', // Blueish Dark Blue
    '#0D47A1', // Dark Blue
    '#9C27B0', // Purple
    '#7B1FA2', // Deep Purple
    '#B71C1C', // Dark Red
    '#F57C00', // Orange
    '#FFD700'  // Gold Yellow
];

document.addEventListener('DOMContentLoaded', function () {
    initializeQuests();
    generateAchievementSteps(); // Generate steps on page load
    updateUI();
});

// Initialize quests and gems in localStorage if not present
function initializeQuests() {
    // Initialize gems if not present
    if (!localStorage.getItem('gems')) {
        setGems(0);
    }

    if (!localStorage.getItem('quests')) {
        const quests = {
            earnXP: {
                currentStep: 0,
                colorLevel: 1
            },
            dailyStreak: {
                currentStep: 0,
                colorLevel: 1
            },
            completeLessons: {
                currentStep: 0,
                colorLevel: 1
            }
        };
        localStorage.setItem('quests', JSON.stringify(quests));
    }
}

// Functions to get and set gems in localStorage
function getGems() {
    return parseInt(localStorage.getItem('gems')) || 0;
}

function setGems(gems) {
    localStorage.setItem('gems', gems);
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

// Generate achievement steps for each quest
function generateAchievementSteps() {
    const quests = getQuests();

    Object.keys(quests).forEach(questType => {
        const questDefinition = questDefinitions[questType];
        const stepsContainer = document.getElementById(`achievement-steps-${questType}`);

        if (stepsContainer) {
            // Clear existing steps
            stepsContainer.innerHTML = '';

            // Generate steps
            for (let i = 1; i <= questDefinition.steps; i++) {
                const stepElement = document.createElement('div');
                stepElement.classList.add('achievement-step');
                stepElement.dataset.step = i;
                stepsContainer.appendChild(stepElement);
            }
        }
    });
}

// Update the UI for all quests
function updateUI() {
    const quests = getQuests();

    // Update UI and check for quest completions
    Object.keys(quests).forEach(questType => {
        const questCompleted = updateQuestUI(questType);

        if (questCompleted) {
            completeQuest(questType);
        }
    });

    // Update Colors
    updateQuestColors(quests);

    // Update Achievement Steps
    updateAchievementSteps(quests);

    // Update gem count display
    updateGemCount();
}

// Update individual quest UI
function updateQuestUI(questType) {
    const quests = getQuests();
    const quest = quests[questType];
    const questDefinition = questDefinitions[questType];

    // Map questType to element IDs
    const progressIds = {
        earnXP: 'points-progress',
        dailyStreak: 'streak-progress',
        completeLessons: 'lessons-progress'
    };

    const currentIds = {
        earnXP: 'current-points',
        dailyStreak: 'current-streak',
        completeLessons: 'current-lessons'
    };

    const requiredIds = {
        earnXP: 'required-points',
        dailyStreak: 'required-streak',
        completeLessons: 'required-lessons'
    };

    const progressId = progressIds[questType];
    const currentId = currentIds[questType];
    const requiredId = requiredIds[questType];

    const progressElement = document.getElementById(progressId);
    const currentElement = document.getElementById(currentId);
    const requiredElement = document.getElementById(requiredId);
    const questBox = document.querySelector(`.quest-box[data-quest="${questType}"]`);
    const stepElement = questBox.querySelector(`#current-step-${questType}`);
    const requiredAmountElement = document.getElementById(`required-amount-${questType}`);

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

    // Update required amount in the quest description
    if (requiredAmountElement) {
        let unit = questDefinition.unit;
        // Pluralize the unit if required amount is not 1
        if (unit == "Lesson" && requiredAmount !== 1) {
            unit += 's';
        }
        requiredAmountElement.textContent = `${requiredAmount} ${unit}`;
    }

    // Update Achievement Steps after updating quest UI
    updateAchievementStepsForQuest(questType, quest.currentStep);

    // Check if quest is completed and can be advanced
    if (currentAmount >= requiredAmount && quest.currentStep <= questDefinitions[questType].steps) {
        return true;
    } else {
        return false;
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
    Object.keys(quests).forEach(questType => {
        const quest = quests[questType];
        const questBox = document.querySelector(`.quest-box[data-quest="${questType}"]`);
        if (questBox) {
            const colorIndex = Math.min(quest.colorLevel - 1, colorLevels.length - 1);
            const color = colorLevels[colorIndex];
            questBox.style.border = `2px solid ${color}`;
            questBox.style.backgroundColor = `${color}20`; // Adding transparency

            // Update the color of the h2 element
            const h2Element = questBox.querySelector('h2');
            if (h2Element) {
                h2Element.style.color = color;
            }
        }
    });
}

// Update achievement steps for all quests
function updateAchievementSteps(quests) {
    Object.keys(quests).forEach(questType => {
        const quest = quests[questType];
        updateAchievementStepsForQuest(questType, quest.currentStep);
    });
}

// Update achievement steps for a specific quest
function updateAchievementStepsForQuest(questType, currentStep) {
    const stepsContainer = document.getElementById(`achievement-steps-${questType}`);

    if (stepsContainer) {
        const stepElements = stepsContainer.querySelectorAll('.achievement-step');

        stepElements.forEach(stepElement => {
            const stepNumber = parseInt(stepElement.dataset.step);

            if (stepNumber <= currentStep - 1) {
                stepElement.classList.add('active');
            } else {
                stepElement.classList.remove('active');
            }
        });
    }
}

// Update the gem count display
function updateGemCount() {
    const gemCountElement = document.getElementById('gem-count');
    if (gemCountElement) {
        gemCountElement.textContent = getGems();
    }
}

// Handle quest completion
function completeQuest(questType) {
    const quests = getQuests();
    const quest = quests[questType];
    const questDef = questDefinitions[questType];
    let currentAmount = getCurrentAmount(questType);

    while (quest.currentStep <= questDef.steps) {
        const requiredAmount = calculateRequiredAmount(questType, quest.currentStep);

        if (currentAmount >= requiredAmount) {
            // Increment quest step and color level
            quest.currentStep += 1;
            quest.colorLevel += 1;



            // Add gem rewards
            let gems = getGems();
            const gemsReward = questDef.gemReward;
            gems += gemsReward;
            setGems(gems);

            // Optionally, display a message or update UI to reflect new gem count
            console.log(`You earned ${gemsReward} gems! Total gems: ${gems}`);

            // Update currentAmount if it decreases per step (if applicable)
            // currentAmount -= requiredAmount; // Uncomment if your logic requires it
        } else {
            break;
        }
    }

    setQuests(quests);
    updateUI();
}
