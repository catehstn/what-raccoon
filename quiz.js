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
    
    const maxScore = Math.max(...Object.values(scores));
    const winners = Object.keys(scores).filter(raccoon => scores[raccoon] === maxScore);
    
    let resultsHTML = '';
    
    if (winners.length > 1) {
        resultsHTML += '<div class="tie-notice">You\'re tied between multiple raccoons! Here are your results:</div>';
    }
    
    winners.forEach(raccoon => {
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
