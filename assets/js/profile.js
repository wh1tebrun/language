// profile.js

document.addEventListener('DOMContentLoaded', () => {
  // Retrieve data from localStorage or set default values
  const dailyStreak = parseInt(localStorage.getItem('dayStreak')) || 0;
  const totalXP = parseInt(localStorage.getItem('totalPoints')) || 0;
  const currentLeague = getCurrentLeague(totalXP); // Function to determine league based on XP
  const accountCreated = localStorage.getItem('accountCreated') || 'N/A'; // Updated to handle missing date
  const completedLessons = parseInt(localStorage.getItem('completedLessons')) || 0;
  const gems = parseInt(localStorage.getItem('gems')) || 0; // Assuming gems are tracked

  // Update statistics
  document.getElementById('daily-streak').textContent = dailyStreak;
  document.getElementById('total-xp').textContent = totalXP;
  document.getElementById('current-league').textContent = currentLeague;
  document.getElementById('account-created').textContent = accountCreated;
  document.getElementById('lessons-completed').textContent = completedLessons;
  document.getElementById('gems-number').textContent = gems;

  // Update achievements
  updateAchievements(dailyStreak, totalXP, completedLessons);

  // Update year (if exists)
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;
  }
});

/**
 * Determines the current league based on total XP.
 * Adjust the thresholds as per your game's requirements.
 * @param {number} xp - Total XP earned by the user.
 * @returns {string} - Current league name.
 */
function getCurrentLeague(xp) {
  // Define an array of leagues in ascending order
  const leagues = [
    { name: 'Iron', minXp: 0 },
    { name: 'Bronze', minXp: 500 },
    { name: 'Silver', minXp: 1000 },
    { name: 'Gold', minXp: 1500 },
    { name: 'Platinum', minXp: 2000 },
    { name: 'Diamond', minXp: 2500 },
    { name: 'Master', minXp: 3000 },
    { name: 'Grandmaster', minXp: 3500 },
    { name: 'Challenger', minXp: 4000 }
  ];

  // Define the number of divisions per league (only for leagues that have divisions)
  const divisions = ['IV', 'III', 'II', 'I'];

  // Iterate through the leagues from highest to lowest to find the appropriate league
  for (let i = leagues.length - 1; i >= 0; i--) {
    if (xp >= leagues[i].minXp) {
      // For leagues below Master, include divisions
      if (i < leagues.length - 3) { // Assuming Master, Grandmaster, Challenger have no divisions
        // Determine the division based on XP within the league
        const leagueXpRange = leagues[i + 1] ? leagues[i + 1].minXp - leagues[i].minXp : Infinity;
        const xpIntoLeague = xp - leagues[i].minXp;
        const divisionSize = leagueXpRange / divisions.length;
        const divisionIndex = Math.min(
          Math.floor(xpIntoLeague / divisionSize),
          divisions.length - 1
        );
        return `${leagues[i].name} ${divisions[divisionIndex]}`;
      } else {
        // For Master, Grandmaster, Challenger, no divisions
        return leagues[i].name;
      }
    }
  }

  // Fallback if XP is below the lowest league
  return 'Unranked';
}
/**
 * Updates the achievements section based on user data.
 * You can expand this function to include more achievements.
 * @param {number} streak - Current daily streak.
 * @param {number} xp - Total XP earned.
 * @param {number} lessons - Total lessons completed.
 */
function updateAchievements(streak, xp, lessons) {
  // Example: Update Daily Streak Achievement
  const streakAchievement = document.getElementById('achievement-daily-streak');
  streakAchievement.textContent = streak;

  // Example: Update XP Milestone Achievement
  const xpMilestoneAchievement = document.getElementById('achievement-xp-milestone');
  xpMilestoneAchievement.textContent = xp;

  // Example: Update Lessons Completed Achievement
  const lessonsAchievement = document.getElementById('achievement-lessons-completed');
  lessonsAchievement.textContent = lessons;

  // Add more achievement updates as needed
}
