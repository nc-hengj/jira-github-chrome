const $inlineLinksInput = document.querySelector('#inline-links');

chrome.storage.local.get('inlineLinks', (options) => {
  if (options.inlineLinks !== false) {
    $inlineLinksInput.setAttribute('checked', 'checked');
  }
});

$inlineLinksInput.addEventListener('change', () => {
  chrome.storage.local.set({ inlineLinks: $inlineLinksInput.checked });
});
