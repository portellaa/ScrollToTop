function Handlers (app, settings) {
	var changingSettings = false;

	this.settingsChanged = function (event) {
		console.log("Settings key: " + event.key + " with value: " + event.newValue + ". Changing settings: " + changingSettings);

		if (!changingSettings) {
			console.log("Performing changes...");
			changingSettings = true;

			if (event.key === "yClickArea") {
				settings.yClickAreaValue = event.newValue;
			}

			else if (event.key === "yClickAreaValue") {
				settings.yClickArea = event.newValue;
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

         var yOffset = settings["yClickArea"];

         var yPosition = event.message;

         if ((yPosition !== undefined) && (yPosition <= yOffset)) {
         	var speed = settings["scrollSpeed"];

            app.activeBrowserWindow.activeTab.page.dispatchMessage("scrollToTop", speed);
         }
      }
   };
}

Handlers.mouseMessageEventName = "mouseClicked";