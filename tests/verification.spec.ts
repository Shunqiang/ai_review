import { test, expect } from '@playwright/test';

test('dashboard page', async ({ page }) => {
  // Listen for all console events and log them to the terminal
  page.on('console', msg => console.log(msg.text()));

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.screenshot({ path: '/home/jules/verification/dashboard.png', fullPage: true });
});
