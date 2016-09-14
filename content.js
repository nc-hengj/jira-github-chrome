(() => {
  const $title = document.querySelector('.js-issue-title');
  if (!$title) {
    return;
  }

  let title = $title.innerHTML.replace(/(<a[^>]+>|<\/a>)/g, '');

  title.match(/\[#\d+\]/g).forEach((tag) => {
    const url = `https://www.pivotaltracker.com/story/show/${tag.match(/\d+/)}`;
    title = title.replace(tag, `<a href="${url}" target="_blank">${tag}</a>`);
  });

  $title.innerHTML = title;
})();
