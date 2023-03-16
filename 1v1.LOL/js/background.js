function player() {
  chrome.tabs.create({url: chrome.runtime.getURL("game.html")}, e => {
  })
}
chrome.action.onClicked.addListener(player);
chrome.runtime.onInstalled.addListener(e => {
  "install" === e.reason && player()
});

chrome.runtime.setUninstallURL("https://gamestabs.com/?utm_source=uninstall_1v1l0l");