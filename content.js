const updateIssueTitle = () => {
  const $title = document.querySelector('.js-issue-title');
  if (!$title) {
    return;
  }

  chrome.storage.local.get(['jiraUrl', 'inlineLinks'], (options) => {
    if ($title.innerHTML.includes('href')) {
      return;
    }

    const jiraUrl = !!options.jiraUrl ?
      options.jiraUrl :
      'https://jira.nextcapital.com';

    let title = $title.innerHTML.replace(/(<a[^>]+>|⬆︎|<\/a>)/g, '');

    title = title.replace(/[a-zA-Z0-9-]+(?=[\],\s\d#]*\])/g, (tag) => {
      const url = `${jiraUrl}/browse/${tag}`;
      const attrs = `href="${url}" target="_blank"`;

      const replacement = options.inlineLinks === false ?
        `${tag}<a ${attrs}>⬆︎</a>` :
        `<a ${attrs}>${tag}</a>`;

      return replacement;
    });

    $title.innerHTML = title;
  });
};

document.addEventListener('DOMNodeInserted', updateIssueTitle);

updateIssueTitle();
