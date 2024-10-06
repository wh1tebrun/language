// quests.js

document.addEventListener('DOMContentLoaded', function () {
  // Update Total Points
  const currentPointsElement = document.getElementById('current-points');
  const pointsProgress = document.getElementById('points-progress');
  if (currentPointsElement && pointsProgress) {
      let totalPoints = parseInt(localStorage.getItem('totalPoints')) || 0;
      currentPointsElement.textContent = totalPoints;
      // Assuming the quest goal is 30 points
      pointsProgress.style.width = `${Math.min((totalPoints / 30) * 100, 100)}%`;
  }

  // Update Completed Lessons
  const currentLessonsElement = document.getElementById('current-lessons');
  const lessonsProgress = document.getElementById('lessons-progress');
  if (currentLessonsElement && lessonsProgress) {
      let completedLessons = parseInt(localStorage.getItem('completedLessons')) || 0;
      currentLessonsElement.textContent = completedLessons;
      // Assuming the quest goal is 100 lessons
      lessonsProgress.style.width = `${Math.min((completedLessons / 100) * 100, 100)}%`;
  }

  // Update Words Learned (if still needed elsewhere)
  /*
  const currentWordsElement = document.getElementById('current-words');
  const wordsProgress = document.getElementById('words-progress');
  if (currentWordsElement && wordsProgress) {
      let wordsLearned = parseInt(localStorage.getItem('wordsLearned')) || 0;
      currentWordsElement.textContent = wordsLearned;
      // Assuming the quest goal is 100 words
      wordsProgress.style.width = `${Math.min((wordsLearned / 100) * 100, 100)}%`;
  }
  */

  // Update Daily Streak
  const currentStreakElement = document.getElementById('current-streak');
  const streakProgress = document.getElementById('streak-progress');
  if (currentStreakElement && streakProgress) {
      let dayStreak = parseInt(localStorage.getItem('dayStreak')) || 0;
      currentStreakElement.textContent = dayStreak;
      // Assuming the streak goal is 7 days
      streakProgress.style.width = `${Math.min((dayStreak / 7) * 100, 100)}%`;
  }

  // Update Gems (if applicable)
  const gemsNumberElement = document.getElementById('gems-number');
  if (gemsNumberElement) {
      let gems = parseInt(localStorage.getItem('gems')) || 0; // Assuming you track gems
      gemsNumberElement.textContent = gems;
  }

  // Update Best Score (if displayed here)
  const bestScoreElement = document.getElementById('best_score'); // If exists
  if (bestScoreElement) {
      let bestScore = parseInt(localStorage.getItem('bestScore')) || 0;
      bestScoreElement.textContent = bestScore;
  }

  // Optionally, handle quest completion
  // For example, if totalPoints >= 30, display a congratulatory message or mark the quest as complete
});
