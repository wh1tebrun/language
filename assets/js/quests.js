document.addEventListener('DOMContentLoaded', function () {
  // localStorage'dan verileri al veya yoksa başlat
  let totalPoints = parseInt(localStorage.getItem('totalPoints')) || 0;
  let dayStreak = parseInt(localStorage.getItem('dayStreak')) || 0;
  let wordsLearned = parseInt(localStorage.getItem('wordsLearned')) || 0;

  // Puan görevini güncelle
  let pointsProgress = document.getElementById('points-progress');
  let currentPoints = document.getElementById('current-points');
  currentPoints.textContent = totalPoints;
  pointsProgress.style.width = Math.min((totalPoints / 30) * 100, 100) + '%';

  // Streak görevini güncelle
  let streakProgress = document.getElementById('streak-progress');
  let currentStreak = document.getElementById('current-streak');
  currentStreak.textContent = dayStreak;
  streakProgress.style.width = Math.min((dayStreak / 7) * 100, 100) + '%';

  // Kelime öğrenme görevini güncelle
  let wordsProgress = document.getElementById('words-progress');
  let currentWords = document.getElementById('current-words');
  currentWords.textContent = wordsLearned;
  wordsProgress.style.width = Math.min((wordsLearned / 100) * 100, 100) + '%';
});
