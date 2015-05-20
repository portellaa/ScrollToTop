// Processes the click and sends dispathc a message
function mouseClicked(event) {
	safari.self.tab.dispatchMessage("mouseClicked", event.y);
}

// Callback to handle message sent by the proxy
function handleMessage(event) {
	console.log("Received message...");

	if (event.name === "scrollToTop") {
		smoothScrollToTop();
	}
}

function smoothScrollToTop() {
    const
        scrollHeight = window.scrollY,
        scrollDuration = Math.round(scrollHeight / 5),
        scrollStep = Math.PI / ( scrollDuration / 15 ),
        cosParameter = scrollHeight / 2;

    var
        scrollCount = 0,
        scrollMargin,
        scrollInterval = setInterval( 
            function() {
                if ( window.scrollY != 0 ) {
                    scrollCount ++;  
                    scrollMargin = cosParameter - cosParameter * Math.cos(scrollCount * scrollStep);
                window.scrollTo( 0, (scrollHeight - scrollMargin));
            } 
            else clearInterval(scrollInterval); 
        }, 15);
}


// Listeners

// Listening for mouse click event
window.addEventListener('click', mouseClicked, false);

// Listen from message sent from the global.html
safari.self.addEventListener("message", handleMessage, false);