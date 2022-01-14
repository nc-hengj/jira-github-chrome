chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
  if (info.status == "complete") {
    chrome.tabs.executeScript(tabId, {file: 'content.js'}, _=> {
      let e = chrome.runtime.lastError;
      if(e !== undefined){
        console.log(tabId, _, e);
      }
    });
  }
});
