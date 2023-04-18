chrome.runtime.onInstalled.addListener(function (context) {
  if (context.reason!=="install")
    return;
  gameTab()
});

chrome.browserAction.onClicked.addListener(gameTab);

chrome.runtime.onMessage.addListener(function (request,sender,sendResponse) {
  if (chrome.runtime.id===sender.id && request.message) {
    let m=request.message;
    if (m==='open')
      return gameTab(),!1;
    else if (typeof m.svg==='string')
      return (new Cached(m.svg)).get().then(sendResponse),!0;
  }
  return !1;
});

function gameTab() {
  chrome.tabs.create({url: chrome.runtime.getURL("electric-man-2.html")},function (tab){});
}

