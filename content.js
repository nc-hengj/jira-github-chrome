var pullRequestTitleElement = document.getElementsByClassName('js-issue-title')[0];

if (pullRequestTitleElement) {
  var title = pullRequestTitleElement.innerHTML;

  // Gets an array of matched ids: [[#12345], [#34563], ...]
  var trackerIds = title.match(/\[#(.*?)\]\s*/g);
  var links = '';
  var idsToBeReplaced = '';

  trackerIds.forEach(function(id) {
    // Concatenates the matched ids which will be replaced by links
    idsToBeReplaced += id;

    var rawTrackerId = id.match(/\d+/g);
    links += '<a href="https://www.pivotaltracker.com/n/projects/1227506/stories/' +
    rawTrackerId +
    '" target="_blank">[#' +
    rawTrackerId +
    ']</a>';
  });

  pullRequestTitleElement.innerHTML = title.replace(idsToBeReplaced, links);
}
