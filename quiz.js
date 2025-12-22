let currentQuestion = 0;
let scores = {
    liquor: 0,
    mpr: 0,
    conrad: 0,
    rebecca: 0,
    melanie: 0,
    toronto: 0,
    stuck: 0,
    alligator: 0
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
    if (backBtn) {
        backBtn.disabled = currentQuestion === 0;
    }
}

function selectAnswer(answerIndex) {
    const answer = questions[currentQuestion].answers[answerIndex];
    
    // Store the answer for potential back button use
    document.getElementById('answers').dataset.lastAnswer = answerIndex;
    
    answer.raccoons.forEach(raccoon => {
        scores[raccoon]++;
    });
    
    currentQuestion++;
    
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('results-screen').classList.remove('hidden');
    
    // Sort raccoons by score
    const sortedRaccoons = Object.entries(scores)
        .sort((a, b) => b[1] - a[1]);
    
    const maxScore = sortedRaccoons[0][1];
    const winners = sortedRaccoons.filter(([raccoon, score]) => score === maxScore);
    
    // Store for sharing
    currentWinners = winners.map(([raccoon]) => raccoonData[raccoon].name);
    
    let resultsHTML = '';
    
    if (winners.length > 1) {
        resultsHTML += '<div class="tie-notice">You\'re tied between multiple raccoons! Here are your results:</div>';
    }
    
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
    const runnerUpCandidates = sortedRaccoons.filter(([raccoon, score]) => {
        return score < maxScore && !winners.some(([w]) => w === raccoon);
    });
    
    if (runnerUpCandidates.length > 0) {
        const [runnerUpRaccoon, runnerUpScore] = runnerUpCandidates[0];
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
    if (currentQuestion > 0) {
        // Remove points from previous answer
        const prevQuestion = questions[currentQuestion - 1];
        const prevAnswerIndex = parseInt(document.getElementById('answers').dataset.lastAnswer);
        if (!isNaN(prevAnswerIndex)) {
            const prevAnswer = prevQuestion.answers[prevAnswerIndex];
            prevAnswer.raccoons.forEach(raccoon => {
                scores[raccoon]--;
            });
        }
        
        currentQuestion--;
        showQuestion();
    }
}

function quitQuiz() {
    if (confirm('Are you sure you want to start over? Your progress will be lost.')) {
        currentQuestion = 0;
        scores = {
            liquor: 0,
            mpr: 0,
            conrad: 0,
            rebecca: 0,
            melanie: 0,
            toronto: 0,
            stuck: 0,
            alligator: 0
        };
        
        document.getElementById('quiz-screen').classList.add('hidden');
        document.getElementById('start-screen').classList.remove('hidden');
    }
}

function restartQuiz() {
    currentQuestion = 0;
    scores = {
        liquor: 0,
        mpr: 0,
        conrad: 0,
        rebecca: 0,
        melanie: 0,
        toronto: 0,
        stuck: 0,
        alligator: 0
    };
    
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
            .filter(([r, s]) => s < Math.max(...Object.values(scores)))[0][0]].name;
        button.textContent = `Show Second Place: ${raccoonName}`;
    }
}

function shareResult() {
    const raccoonText = currentWinners.length > 1 
        ? currentWinners.join(' and ')
        : currentWinners[0];
    
    const shareText = `I'm a ${raccoonText}! What raccoon are you?`;
    const shareUrl = 'https://catehstn.github.io/what-raccoon/';
    
    // Try to use native share if available (mobile)
    if (navigator.share) {
        navigator.share({
            title: 'Which Raccoon Are You?',
            text: shareText,
            url: shareUrl
        }).catch(() => {
            // If share is cancelled, do nothing
        });
    } else {
        // Fallback: copy to clipboard
        const fullText = `${shareText} ${shareUrl}`;
        navigator.clipboard.writeText(fullText).then(() => {
            // Change button text temporarily
            const btn = document.getElementById('share-btn');
            const originalText = btn.textContent;
            btn.textContent = 'Copied to clipboard!';
            setTimeout(() => {
                btn.textContent = originalText;
            }, 2000);
        }).catch(() => {
            // If clipboard fails, show the text
            alert(`Share this:\n\n${fullText}`);
        });
    }
}

// Auto-detect system dark mode preference
window.addEventListener('DOMContentLoaded', () => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-mode');
    }
});

// Listen for system dark mode changes in real-time
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (e.matches) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
});
