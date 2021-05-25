var page = browser.extension.getBackgroundPage();
var input = document.getElementById("copyText");
var form = document.getElementById("form");
var checkbox = document.getElementById("notifCheckbox");

function updateCheckbox() {
	var gettingItem = browser.storage.local.get('notifications');
	gettingItem.then((res) => {
		checkbox.checked = res.notifications
	});
}

updateCheckbox()

checkbox.addEventListener("change", function () {
	browser.storage.local.set({
		notifications: checkbox.checked
	});
	updateCheckbox()
});

form.addEventListener("submit", () => {
	if (input.value != "") {
		page.getURL(input.value);
	}
	input.value = "";
});