let currentQuestion = 0;
let currentWinners = [];
let scores = Object.fromEntries(RACCOON_KEYS.map(key => [key, 0]));

function startQuiz() {
    DOM.hide(ELEMENT_IDS.START_SCREEN);
    DOM.show(ELEMENT_IDS.QUIZ_SCREEN);
    showQuestion();
}

function showQuestion() {
    const question = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    DOM.get(ELEMENT_IDS.PROGRESS).style.width = progress + '%';
    DOM.setText(ELEMENT_IDS.QUESTION_NUMBER, `Question ${currentQuestion + 1} of ${questions.length}`);
    DOM.setText(ELEMENT_IDS.QUESTION_TEXT, question.text);

    const answersDiv = DOM.get(ELEMENT_IDS.ANSWERS);
    answersDiv.innerHTML = '';
    delete answersDiv.dataset.lastAnswer; // Clear previous answer tracking

    question.answers.forEach((answer, index) => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.textContent = answer.text;
        btn.onclick = () => selectAnswer(index);
        answersDiv.appendChild(btn);
    });

    // Disable back button on first question
    const backBtn = DOM.get(ELEMENT_IDS.BACK_BTN);
    if (backBtn) backBtn.disabled = currentQuestion === 0;

    window.scrollTo(0, 0);
}

function selectAnswer(answerIndex) {
    const answer = questions[currentQuestion].answers[answerIndex];

    // Store the answer for potential back button use
    DOM.get(ELEMENT_IDS.ANSWERS).dataset.lastAnswer = answerIndex;

    answer.raccoons.forEach(raccoon => scores[raccoon]++);
    currentQuestion++;

    currentQuestion < questions.length ? showQuestion() : showResults();
}

function showResults() {
    DOM.hide(ELEMENT_IDS.QUIZ_SCREEN);
    DOM.show(ELEMENT_IDS.RESULTS_SCREEN);

    const { winners, runnerUp } = calculateResults(scores);

    // Store for sharing
    currentWinners = winners.map(raccoon => raccoonData[raccoon].name);

    if (window.goatcounter) {
        winners.forEach(raccoon => {
            window.goatcounter.count({
                path: 'result/' + raccoon,
                title: 'Result: ' + raccoonData[raccoon].name,
                event: true,
            });
        });
        const comboKey = buildResultComboKey(winners);
        window.goatcounter.count({
            path: 'result-combo/' + comboKey,
            title: 'Result combo: ' + comboKey,
            event: true,
        });
    }

    const tied = winners.length > 1;
    let resultsHTML = tied
        ? '<div class="tie-notice">You\'re tied between multiple raccoons! Here are your results:</div>'
        : '';

    // Show primary result(s)
    let winnersHTML = '';
    winners.forEach(raccoon => {
        const data = raccoonData[raccoon];
        winnersHTML += `
            <div class="result-section">
                <h2 class="result-title">${data.name}</h2>
                <p class="result-subtitle">${data.subtitle}</p>
                <img src="images/${raccoon}.png" alt="${data.name}" class="result-img">
                <div class="result-content">
                    <strong>Why this raccoon is iconic:</strong>
                    <p>${data.iconic}</p>
                    <strong>This raccoon in tech:</strong>
                    <p>${data.inTech}</p>
                </div>
            </div>
        `;
    });
    resultsHTML += tied ? `<div class="winners-grid">${winnersHTML}</div>` : winnersHTML;

    if (runnerUp) {
        const runnerUpData = raccoonData[runnerUp];

        resultsHTML += `
            <button class="runner-up-btn" onclick="toggleRunnerUp()">
                Show Second Place: ${runnerUpData.name}
            </button>
            <div id="${ELEMENT_IDS.RUNNER_UP_CONTENT}" class="runner-up-section hidden">
                <h3>You're also a bit of a...</h3>
                <div class="result-section">
                    <h2 class="result-title">${runnerUpData.name}</h2>
                    <p class="result-subtitle">${runnerUpData.subtitle}</p>
                    <img src="images/${runnerUp}.png" alt="${runnerUpData.name}" class="result-img">
                    <div class="result-content">
                        <strong>Why this raccoon is iconic:</strong>
                        <p>${runnerUpData.iconic}</p>
                        <strong>This raccoon in tech:</strong>
                        <p>${runnerUpData.inTech}</p>
                    </div>
                </div>
            </div>
        `;
    }

    DOM.setHTML(ELEMENT_IDS.RESULTS_CONTENT, resultsHTML);
    window.scrollTo(0, 0);
}

function goBack() {
    if (currentQuestion === 0) return;

    // Remove points from previous answer
    const prevQuestion = questions[currentQuestion - 1];
    const prevAnswerIndex = parseInt(DOM.get(ELEMENT_IDS.ANSWERS).dataset.lastAnswer);

    if (!isNaN(prevAnswerIndex)) {
        prevQuestion.answers[prevAnswerIndex].raccoons.forEach(raccoon => scores[raccoon]--);
    }

    currentQuestion--;
    showQuestion();
}

function resetScores() {
    currentQuestion = 0;
    Object.keys(scores).forEach(key => scores[key] = 0);
}

function quitQuiz() {
    if (!confirm('Are you sure you want to start over? Your progress will be lost.')) return;

    resetScores();
    DOM.hide(ELEMENT_IDS.QUIZ_SCREEN);
    DOM.show(ELEMENT_IDS.START_SCREEN);
}

function restartQuiz() {
    resetScores();
    DOM.hide(ELEMENT_IDS.RESULTS_SCREEN);
    DOM.show(ELEMENT_IDS.START_SCREEN);
}

function toggleRunnerUp() {
    const runnerUpContent = DOM.get(ELEMENT_IDS.RUNNER_UP_CONTENT);
    const button = document.querySelector('.runner-up-btn');

    if (runnerUpContent.classList.contains('hidden')) {
        DOM.show(ELEMENT_IDS.RUNNER_UP_CONTENT);
        button.textContent = 'Hide Second Place';
    } else {
        DOM.hide(ELEMENT_IDS.RUNNER_UP_CONTENT);
        const raccoonName = raccoonData[Object.entries(scores)
            .sort((a, b) => b[1] - a[1])
            .filter(([, s]) => s < Math.max(...Object.values(scores)))[0][0]].name;
        button.textContent = `Show Second Place: ${raccoonName}`;
    }
}

function shareResult() {
    const raccoonText = currentWinners.length > 1
        ? currentWinners.join(' and ')
        : currentWinners[0];

    const shareText = `I'm a ${raccoonText}! What raccoon are you?`;
    const shareUrl = QUIZ_URL;
    const fullText = `${shareText} ${shareUrl}`;

    // Check if we're on mobile (native share works well on mobile)
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile && navigator.share) {
        // Use native share on mobile
        navigator.share({
            title: 'Which Raccoon Are You?',
            text: shareText,
            url: shareUrl
        }).catch(() => {
            // If share is cancelled, do nothing
        });
    } else {
        // Copy to clipboard on desktop
        navigator.clipboard.writeText(fullText).then(() => {
            const btn = DOM.get(ELEMENT_IDS.SHARE_BTN);
            const originalText = btn.textContent;
            btn.textContent = 'Copied to clipboard!';
            setTimeout(() => btn.textContent = originalText, 2000);
        }).catch(() => {
            // Fallback if clipboard API doesn't work
            alert(`Share this:\n\n${fullText}`);
        });
    }
}

// ---------- Theme: system preference + manual override ----------
function applyTheme(mode) {
    document.body.classList.toggle('dark-mode', mode === 'dark');
    const label = document.querySelector('#theme-toggle .theme-toggle-label');
    if (label) {
        const next = mode === 'dark' ? 'Light' : 'Dark';
        label.textContent = next;
        document.getElementById('theme-toggle')
            .setAttribute('aria-label', `Switch to ${next.toLowerCase()} mode`);
    }
}

function currentTheme() {
    const saved = localStorage.getItem('wr-theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function toggleTheme() {
    const next = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
    localStorage.setItem('wr-theme', next);
    applyTheme(next);
}

window.addEventListener('DOMContentLoaded', () => applyTheme(currentTheme()));

// Follow the system only while the user hasn't set a manual preference
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('wr-theme')) applyTheme(e.matches ? 'dark' : 'light');
});

// ---------- Keyboard play: 1–4 to answer, ← / Backspace to go back ----------
document.addEventListener('keydown', (e) => {
    if (DOM.get(ELEMENT_IDS.QUIZ_SCREEN).classList.contains('hidden')) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;

    if (e.key >= '1' && e.key <= '9') {
        const btns = DOM.get(ELEMENT_IDS.ANSWERS).querySelectorAll('.answer-btn');
        const idx = parseInt(e.key, 10) - 1;
        if (btns[idx]) { e.preventDefault(); btns[idx].click(); }
    } else if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
        if (currentQuestion > 0) { e.preventDefault(); goBack(); }
    }
});
