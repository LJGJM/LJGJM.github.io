function openWindow() {
  chrome.windows.create({url: "play/index.html"})
}
chrome.action.onClicked.addListener(function () {
  openWindow()
});