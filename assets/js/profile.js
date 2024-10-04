document.addEventListener('DOMContentLoaded', () => {
    // Dinamik olarak güncellenmesi gereken veriler
    const dailyStreak = 5; // Örnek veri, bunu backend'den alabilirsiniz
    const totalXP = 1500;   // Örnek veri
    const currentLeague = 'Silver'; // Örnek veri
    const accountCreated = '01 Jan 2024'; // Örnek veri
  
    // Elementleri seç
    document.getElementById('daily-streak').textContent = dailyStreak;
    document.getElementById('total-xp').textContent = totalXP;
    document.getElementById('current-league').textContent = currentLeague;
    document.getElementById('account-created').textContent = accountCreated;
  
    // Yıl güncellemesi (varsa)
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
      const currentYear = new Date().getFullYear();
      yearSpan.textContent = currentYear;
    }
  });