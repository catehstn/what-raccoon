const { test, expect } = require('@playwright/test');

test.describe('Quiz App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('start screen loads correctly', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Which Raccoon Are You?');
    await expect(page.locator('.start-btn')).toBeVisible();
    await expect(page.locator('#start-screen')).toBeVisible();
    await expect(page.locator('#quiz-screen')).toBeHidden();
  });

  test('clicking start begins the quiz', async ({ page }) => {
    await page.click('.start-btn');

    await expect(page.locator('#start-screen')).toBeHidden();
    await expect(page.locator('#quiz-screen')).toBeVisible();
    await expect(page.locator('#question-text')).toBeVisible();
    await expect(page.locator('.answer-btn')).toHaveCount(4);
  });

  test('answering a question advances to next', async ({ page }) => {
    await page.click('.start-btn');

    const firstQuestion = await page.locator('#question-text').textContent();
    await page.click('.answer-btn >> nth=0');

    const secondQuestion = await page.locator('#question-text').textContent();
    expect(firstQuestion).not.toBe(secondQuestion);
  });

  test('back button returns to previous question', async ({ page }) => {
    await page.click('.start-btn');

    const firstQuestion = await page.locator('#question-text').textContent();
    await page.click('.answer-btn >> nth=0');

    await expect(page.locator('#question-text')).not.toHaveText(firstQuestion);

    await page.click('#back-btn');
    await expect(page.locator('#question-text')).toHaveText(firstQuestion);
  });

  test('back button is disabled on first question', async ({ page }) => {
    await page.click('.start-btn');

    await expect(page.locator('#back-btn')).toBeDisabled();
  });

  test('completing quiz shows results', async ({ page }) => {
    await page.click('.start-btn');

    // Answer all 12 questions
    for (let i = 0; i < 12; i++) {
      await page.click('.answer-btn >> nth=0');
    }

    await expect(page.locator('#quiz-screen')).toBeHidden();
    await expect(page.locator('#results-screen')).toBeVisible();
    // May have multiple result titles if tied
    await expect(page.locator('.result-title').first()).toBeVisible();
  });

  test('results page shows raccoon image', async ({ page }) => {
    await page.click('.start-btn');

    for (let i = 0; i < 12; i++) {
      await page.click('.answer-btn >> nth=0');
    }

    const resultImage = page.locator('#results-content img').first();
    await expect(resultImage).toBeVisible();
    await expect(resultImage).toHaveAttribute('src', /images\/.*\.png/);
  });

  test('restart button returns to start screen', async ({ page }) => {
    await page.click('.start-btn');

    for (let i = 0; i < 12; i++) {
      await page.click('.answer-btn >> nth=0');
    }

    await page.click('.restart-btn');

    await expect(page.locator('#results-screen')).toBeHidden();
    await expect(page.locator('#start-screen')).toBeVisible();
  });

  test('quit button returns to start with confirmation', async ({ page }) => {
    await page.click('.start-btn');
    await page.click('.answer-btn >> nth=0');

    page.on('dialog', dialog => dialog.accept());
    await page.click('.quit-btn');

    await expect(page.locator('#quiz-screen')).toBeHidden();
    await expect(page.locator('#start-screen')).toBeVisible();
  });

  test('progress bar advances with each question', async ({ page }) => {
    await page.click('.start-btn');

    const getProgress = async () => {
      const style = await page.locator('#progress').getAttribute('style');
      const match = style.match(/width:\s*([\d.]+)%/);
      return parseFloat(match[1]);
    };

    const firstProgress = await getProgress();
    await page.click('.answer-btn >> nth=0');
    const secondProgress = await getProgress();

    expect(secondProgress).toBeGreaterThan(firstProgress);
  });

  test('share button is visible on results page', async ({ page }) => {
    await page.click('.start-btn');

    for (let i = 0; i < 12; i++) {
      await page.click('.answer-btn >> nth=0');
    }

    await expect(page.locator('#share-btn')).toBeVisible();
  });
});
