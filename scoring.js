function calculateResults(scores) {
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const maxScore = sorted[0][1];
    const winners = sorted
        .filter(([, score]) => score === maxScore)
        .map(([raccoon]) => raccoon);

    const runnerUpEntry = sorted.find(([raccoon, score]) =>
        score < maxScore && !winners.includes(raccoon)
    );
    const runnerUp = runnerUpEntry ? runnerUpEntry[0] : null;

    return { winners, runnerUp, sorted };
}
