chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
  if (info.status == "complete") {
    chrome.tabs.executeScript(tabId, {file: 'content.js'});
  }
});
