chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log("I'm alive");
    });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostEquals: 'www.youtube.com'},
        })/*,
          new chrome.declarativeContent.PageStateMatcher({
            css: ["video"]
          })*/
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
});
