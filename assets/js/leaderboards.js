// leaderboards.js

document.addEventListener('DOMContentLoaded', function () {
    // Existing players data
    let players = [
        {
            username: 'JohnDoe',
            xp: 15000,
            dayStreak: 30,
            league: 'Diamond',
            avatar: 'https://simg-ssl.duolingo.com/ssr-avatars/247795989/SSR-2ZFyrvC8UR/medium'
        },
        {
            username: 'JaneSmith',
            xp: 14500,
            dayStreak: 28,
            league: 'Gold',
            avatar: 'https://simg-ssl.duolingo.com/avatars/1244059238/Rs8L9B9Ene/medium'
        },
        {
            username: 'MikeBrown',
            xp: 14000,
            dayStreak: 25,
            league: 'Gold',
            avatar: 'https://simg-ssl.duolingo.com/ssr-avatars/718551475/SSR-ZqrffaX4Vn/medium'
        },
        // Add more players here as needed
    ];

    // Get user's data from localStorage
    let username = localStorage.getItem('username') || 'You';
    let xp = parseInt(localStorage.getItem('totalPoints')) || 0;
    let dayStreak = parseInt(localStorage.getItem('dayStreak')) || 0;
    let league = determineLeague(xp);
    let avatar = localStorage.getItem('avatar') || '../../imgs/default-avatar.png'; // Provide path to default avatar

    // Add user to players array
    players.push({
        username: username,
        xp: xp,
        dayStreak: dayStreak,
        league: league,
        avatar: avatar
    });

    // Sort players based on XP in descending order
    players.sort(function (a, b) {
        return b.xp - a.xp;
    });

    // Update the leaderboard table
    const leaderboardBody = document.querySelector('.leaderboard tbody');
    leaderboardBody.innerHTML = ''; // Clear existing rows

    players.forEach(function (player, index) {
        let tr = document.createElement('tr');

        let tdRank = document.createElement('td');
        tdRank.textContent = index + 1;

        let tdUser = document.createElement('td');
        let userInfoDiv = document.createElement('div');
        userInfoDiv.classList.add('user-info');

        let img = document.createElement('img');
        img.src = player.avatar;
        img.alt = player.username;
        img.classList.add('user-avatar');

        let span = document.createElement('span');
        span.textContent = player.username;

        userInfoDiv.appendChild(img);
        userInfoDiv.appendChild(span);
        tdUser.appendChild(userInfoDiv);

        let tdXP = document.createElement('td');
        tdXP.textContent = player.xp;

        let tdStreak = document.createElement('td');
        tdStreak.textContent = player.dayStreak;

        let tdLeague = document.createElement('td');
        tdLeague.textContent = player.league;

        tr.appendChild(tdRank);
        tr.appendChild(tdUser);
        tr.appendChild(tdXP);
        tr.appendChild(tdStreak);
        tr.appendChild(tdLeague);

        // Highlight the current user
        if (player.username === username) {
            tr.classList.add('current-user');
        }

        leaderboardBody.appendChild(tr);
    });

    // Function to determine league based on XP
    function determineLeague(xp) {
        if (xp >= 15000) {
            return 'Diamond';
        } else if (xp >= 10000) {
            return 'Gold';
        } else if (xp >= 5000) {
            return 'Silver';
        } else if (xp >= 1000) {
            return 'Bronze';
        } else {
            return 'Starter';
        }
    }
});
