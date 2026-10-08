const { loadApp } = require('./setup/loadApp');

const STORAGE_KEY = 'ops-theme';

function theme(document) {
  return document.documentElement.getAttribute('data-theme');
}

describe('theme toggle (TODO-231)', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    delete window.matchMedia;
  });

  test('AC-4: starts dark when nothing is stored, whatever the OS prefers', async () => {
    window.matchMedia = jest.fn().mockReturnValue({ matches: true, media: '(prefers-color-scheme: light)' });
    const { document } = await loadApp();
    expect(theme(document)).toBe('dark');
    expect(document.getElementById('theme-toggle').textContent).toBe('Light theme');
    expect(window.matchMedia).not.toHaveBeenCalled();
  });

  test('AC-1, AC-2: clicking the toggle switches data-theme and the label', async () => {
    const { document } = await loadApp();
    const toggle = document.getElementById('theme-toggle');

    toggle.click();
    expect(theme(document)).toBe('light');
    expect(toggle.textContent).toBe('Dark theme');

    toggle.click();
    expect(theme(document)).toBe('dark');
    expect(toggle.textContent).toBe('Light theme');
  });

  test('AC-3: the choice is stored and restored on the next load', async () => {
    const first = await loadApp();
    first.document.getElementById('theme-toggle').click();
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe('light');

    document.documentElement.removeAttribute('data-theme');
    const second = await loadApp();
    expect(theme(second.document)).toBe('light');
    expect(second.document.getElementById('theme-toggle').textContent).toBe('Dark theme');
  });
});
