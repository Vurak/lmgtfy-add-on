browser.contextMenus.create({
	id: "log-selection",
	title: "LMGTFY: \"%s\"",
	contexts: ["selection"]
});

function notify(url) {
	var gettingItem = browser.storage.local.get('notifications');
	gettingItem.then((res) => {
		//console.log(res.notifications);
		if (res.notifications == true) {
			browser.notifications.create({
				"type": "basic",
				"iconUrl": browser.extension.getURL("icons/lmgtfyaddon-48.png"),
				"title": 'Copied to Clipboard!',
				"message": url
			});
		}
	});
}

function copyStringToClipboard (url) {
   	// Create new element
   	var el = document.createElement('textarea');
   	// Set value (string to be copied)
   	el.value = url;
   	// Set non-editable to avoid focus and move outside of view
   	el.setAttribute('readonly', '');
   	el.style = {position: 'absolute', left: '-9999px'};
   	document.body.appendChild(el);
   	// Select text inside element
   	el.select();
   	// Copy text to clipboard
   	document.execCommand('copy');
   	// Remove temporary element
   	document.body.removeChild(el);
}

function getURL (str) {
	var selec = str.replace(/ /g, "+");
	var url = "http://letmegooglethat.com/?q=" + selec;
	copyStringToClipboard(url);
	notify(url);
}

browser.contextMenus.onClicked.addListener(function(info, tab) {
	//console.log("Context Menu Copy")
	getURL(info.selectionText)
});

