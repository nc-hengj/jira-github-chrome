(() => {
  const updateIssueTitle = function() {
    const $title = document.querySelector('.js-issue-title');
    const regex = /\[\w+-\d+\]/g;
    const hasJiraId = $title.innerHTML.match(regex);

    // Skips execution if
    // 1. it is not on a github PR page
    // 2. the PR title does not contain a JIRA ID (also prevents an infinite loop)
    // 3. the PR title already contains a href
    if (!$title || !hasJiraId || $title.innerHTML.includes('href')) {
      return;
    }

    chrome.storage.local.get(['jiraUrl', 'inlineLinks'], (options) => {
      const jiraUrl = !!options.jiraUrl ?
        options.jiraUrl :
        'https://jira.internal.nextcapital.com';

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
  }

  updateIssueTitle();

  // Select the node that will be observed for mutations
  const targetNode = document.querySelector('.js-issue-title');

  if (targetNode) {
    // Options for the observer (which mutations to observe)
    const config = { childList: true, subtree: true };

    // Callback function to execute when mutations are observed
    const callback = function(mutationsList, observer) {
      // Use traditional 'for loops' for IE 11
      for(const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          updateIssueTitle();
        }
      }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(document, config);
  }
})();
