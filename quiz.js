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
    
    question.answers.forEach((answer, index) => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.textContent = answer.text;
        btn.onclick = () => selectAnswer(index);
        answersDiv.appendChild(btn);
    });
}

function selectAnswer(answerIndex) {
    const answer = questions[currentQuestion].answers[answerIndex];
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
