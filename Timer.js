let fieldData;
let countDown;
let timeLeft;

let userOptions = {
    channelName: "",
};

window.addEventListener('onWidgetLoad', function (obj) {
    userOptions["channelName"] = obj["detail"]["channel"]["username"];
});

window.addEventListener('onEventReceived', function (obj) {
    if (obj.detail.listener === 'message') {

        let data = obj.detail.event.data;
        
        let message = data['text'];
        let chosenPhrase = "!countdown";
        
      	let user = data["nick"];
        let userstate = {
        "badges": {
            "broadcaster": (user === userOptions["channelName"]) 
        	}
        };
          
        if (message.startsWith(chosenPhrase) && (userstate.badges.broadcaster)){
        	function getnum(){
				let pureMessage = message.slice(chosenPhrase.length, message.length);
                var integer = parseInt(pureMessage, 10);
                var fail = 0;
              
                 if (isNaN(integer) === true) {
                 	return fail // if it's not, stop everything
                 } else {
                   	return integer
                 };
			};

			timeLeft = getnum()
          	var timeInSeconds = timeLeft * 60;
          
  			function myTimer (){
    			if(timeInSeconds <= 0) {
      				clearInterval(countDown);
   				};
    			var minutes = Math.trunc(timeInSeconds/60);
				var seconds = timeInSeconds%60;
    			document.getElementById('clock').innerHTML = ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2);
    			timeInSeconds -=1;
  			};
          
          	countDown = setInterval(myTimer, 1000);

		};
      
      if (message.startsWith("!stop") && (userstate.badges.broadcaster)){
        	clearInterval(countDown)
        	document.getElementById('clock').innerHTML = ("00:00");
      };
      
    };
});

window.addEventListener('onWidgetLoad', function (obj) {
    fieldData = obj.detail.fieldData;
});