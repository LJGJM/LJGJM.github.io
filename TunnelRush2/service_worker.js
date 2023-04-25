(() => {

  function openWindow(url) {
    chrome.windows.create({url})
  }

  chrome.action.onClicked.addListener(tunnel2);

  chrome.runtime.onInstalled.addListener(function (r) {
    if (r.reason === "install")
      tunnel2();
  });

  chrome.contextMenus.create({
    "contexts": ['action'],
    "id": "share",
    "title": chrome.i18n.getMessage('share_facebook')
  }, () => {
    console.log(chrome.runtime.lastError)
  });

  chrome.contextMenus.onClicked.addListener(() => {
    openWindow("https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent("https://chrome.google.com/webstore/detail/" + chrome.runtime.id))
  })

  function tunnel2() {
    openWindow(chrome.runtime.getManifest().sandbox.pages[0])
  }
})();
