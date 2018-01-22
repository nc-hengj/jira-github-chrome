const $jiraUrlInput = document.querySelector('#jira-url');
const $inlineLinksInput = document.querySelector('#inline-links');

chrome.storage.local.get(['jiraUrl', 'inlineLinks'], (options) => {
  if (!!options.jiraUrl) {
    $jiraUrlInput.value = options.jiraUrl;
  }

  if (options.inlineLinks !== false) {
    $inlineLinksInput.setAttribute('checked', 'checked');
  }
});

$jiraUrlInput.addEventListener('change', () => {
  chrome.storage.local.set({ jiraUrl: $jiraUrlInput.value });
});

$inlineLinksInput.addEventListener('change', () => {
  chrome.storage.local.set({ inlineLinks: $inlineLinksInput.checked });
});
