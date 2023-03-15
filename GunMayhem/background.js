chrome.runtime.onInstalled.addListener(function(object) {
	if(object.reason == "install"){
	chrome.tabs.create({ url: "https://gamepluto.com/game/gun-mayhem-2/?utm_campaign=ext&utm_medium=newinstall&utm_source=ext_gunmayhem2"
	});
	}
});

if(chrome.runtime.setUninstallURL) {
  chrome.runtime.setUninstallURL('https://gamepluto.com/?utm_campaign=ext&utm_medium=uninstall&utm_source=ext_gunmayhem2');
} else {
}


chrome.action.onClicked.addListener(function(tab) {
    chrome.tabs.create({ 
url: "index.html"
 });
});