let currentQuestion = 0;
let currentWinners = [];
let scores = {
    liquor: 0, mpr: 0, conrad: 0, rebecca: 0,
    melanie: 0, toronto: 0, stuck: 0, alligator: 0
};

function startQuiz() {
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    showQuestion();
}

function showQuestion() {
    const question = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    
    document.getElementById('progress').style.width = progress + '%';
    document.getElementById('question-number').textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    document.getElementById('question-text').textContent = question.text;
    
    const answersDiv = document.getElementById('answers');
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
    const backBtn = document.getElementById('back-btn');
    if (backBtn) backBtn.disabled = currentQuestion === 0;
}

function selectAnswer(answerIndex) {
    const answer = questions[currentQuestion].answers[answerIndex];
    
    // Store the answer for potential back button use
    document.getElementById('answers').dataset.lastAnswer = answerIndex;
    
    answer.raccoons.forEach(raccoon => scores[raccoon]++);
    currentQuestion++;
    
    currentQuestion < questions.length ? showQuestion() : showResults();
}

function showResults() {
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('results-screen').classList.remove('hidden');
    
    // Sort raccoons by score
    const sortedRaccoons = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const maxScore = sortedRaccoons[0][1];
    const winners = sortedRaccoons.filter(([, score]) => score === maxScore);
    
    // Store for sharing
    currentWinners = winners.map(([raccoon]) => raccoonData[raccoon].name);
    
    let resultsHTML = winners.length > 1 
        ? '<div class="tie-notice">You\'re tied between multiple raccoons! Here are your results:</div>' 
        : '';
    
    // Show primary result(s)
    winners.forEach(([raccoon]) => {
        const data = raccoonData[raccoon];
        resultsHTML += `
            <div class="result-section">
                <h2 class="result-title">${data.name}</h2>
                <p class="result-subtitle">${data.subtitle}</p>
                <div class="image-placeholder">[Add ${data.name} image here]</div>
                <div class="result-content">
                    <strong>Why this raccoon is iconic:</strong>
                    <p>${data.iconic}</p>
                    <strong>This raccoon in tech:</strong>
                    <p>${data.inTech}</p>
                </div>
            </div>
        `;
    });
    
    // Find runner-up (if not already shown)
    const runnerUpCandidates = sortedRaccoons.filter(([raccoon, score]) => 
        score < maxScore && !winners.some(([w]) => w === raccoon)
    );
    
    if (runnerUpCandidates.length > 0) {
        const [runnerUpRaccoon] = runnerUpCandidates[0];
        const runnerUpData = raccoonData[runnerUpRaccoon];
        
        resultsHTML += `
            <button class="runner-up-btn" onclick="toggleRunnerUp()">
                Show Second Place: ${runnerUpData.name}
            </button>
            <div id="runner-up-content" class="runner-up-section hidden">
                <h3>You're also a bit of a...</h3>
                <div class="result-section">
                    <h2 class="result-title">${runnerUpData.name}</h2>
                    <p class="result-subtitle">${runnerUpData.subtitle}</p>
                    <div class="image-placeholder">[Add ${runnerUpData.name} image here]</div>
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
    
    document.getElementById('results-content').innerHTML = resultsHTML;
}

function goBack() {
    if (currentQuestion === 0) return;
    
    // Remove points from previous answer
    const prevQuestion = questions[currentQuestion - 1];
    const prevAnswerIndex = parseInt(document.getElementById('answers').dataset.lastAnswer);
    
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
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('start-screen').classList.remove('hidden');
}

function restartQuiz() {
    resetScores();
    document.getElementById('results-screen').classList.add('hidden');
    document.getElementById('start-screen').classList.remove('hidden');
}

function toggleRunnerUp() {
    const runnerUpContent = document.getElementById('runner-up-content');
    const button = document.querySelector('.runner-up-btn');
    
    if (runnerUpContent.classList.contains('hidden')) {
        runnerUpContent.classList.remove('hidden');
        button.textContent = 'Hide Second Place';
    } else {
        runnerUpContent.classList.add('hidden');
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
    const shareUrl = 'https://catehstn.github.io/what-raccoon/';
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
            const btn = document.getElementById('share-btn');
            const originalText = btn.textContent;
            btn.textContent = 'Copied to clipboard!';
            setTimeout(() => btn.textContent = originalText, 2000);
        }).catch(() => {
            // Fallback if clipboard API doesn't work
            alert(`Share this:\n\n${fullText}`);
        });
    }
}

// Auto-detect system dark mode preference
window.addEventListener('DOMContentLoaded', () => {
    if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-mode');
    }
});

// Listen for system dark mode changes in real-time
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    document.body.classList[e.matches ? 'add' : 'remove']('dark-mode');
});
