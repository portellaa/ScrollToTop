function Handlers () {
	var changingSettings = false;

	this.settingsChanged = function (event) {
		console.log("Settings key: " + event.key + " with value: " + event.newValue + ". Changing settings: " + changingSettings);

		if (!changingSettings) {
			console.log("Performing changes...");
			changingSettings = true;

			if (event.key === "yClickArea") {
				safari.extension.secureSettings.yClickAreaValue = event.newValue;
			}

			else if (event.key === "yClickAreaValue") {
				safari.extension.secureSettings.yClickArea = event.newValue;
			}

			changingSettings = false;
		}
	};

	this.tabActivated = function (event) {
      console.log("Tab Activated...");
	};

	this.tabDeactivated = function (event) {
      console.log("Tab Deactivated...");
	};

   this.messageReceived = function (event) {
      console.log("Received message with key: " + event.name);

      if (!changingSettings && (event.name === Handlers.mouseMessageEventName)) {
         console.log("Mouse clicked...");

         var yOffset = safari.extension.settings.yClickArea;

         var yPosition = event.message;

         if ((yPosition !== undefined) && (yPosition <= yOffset)) {
            safari.application.activeBrowserWindow.activeTab.page.dispatchMessage("scrollToTop", yPosition);
         }
      }
   };
}

Handlers.mouseMessageEventName = "mouseClicked";