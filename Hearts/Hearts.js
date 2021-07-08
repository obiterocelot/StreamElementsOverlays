let userOptions = {}; // creating the variable here prevents overwriting on every widget load

window.addEventListener('onWidgetLoad', function (obj) {
    userOptions = obj['detail']['fieldData']; // when the widget is loaded it pulls the object data from the set JSON text fields
});

let canGo = true;

window.addEventListener('onEventReceived', function (obj) {
    if (obj.detail.listener === 'message') { // when a message event is received (ie, a chat message)

        let data = obj.detail.event.data; // data variables are necessary to pull all the information from that event
        
        let message = data['text']; // focusing on the message text itself
        let chosenPhrase = userOptions['chatCommand'] // 'chatCommand' is the set name of the JSON field

        if (message.startsWith(chosenPhrase)){ // if the message starts with the user chosen chat command...
            if (canGo == true) {
                canGo = false;
                function getnum(){ // pull the number from the message and make sure it's passing through as an int

                    let pureMessage = message.slice(chosenPhrase.length, message.length);
                    var integer = parseInt(pureMessage, 10);
                    var fail = 0;
                    if (isNaN(integer) === true) {

                        return fail // if it's not, stop everything

                    } else {

                        return integer

                    }
                }

                var hearts = 0;
                var intervalId = null;
                var intervalTime = 100;
                var maxHearts = userOptions['heartMax'] // allows user to set a max hearts

                if (getnum() > maxHearts) {

                    hearts = maxHearts

                } else {

                    hearts = getnum()

                } // sets how many hearts will appear, with the max hearts as a cap
            
                if (hearts == 69) {
                    hearts = 1000;
                    intervalTime = 2;
                }
                if (hearts <= 100){
                intervalTime = 100;
                }
                if (hearts > 100 && hearts <= 350){
                    intervalTime = 50
                }
                if (hearts > 350){
                    intervalTime = 10
                } // sets various speeds of hearts creation depending on the amount of them

                function createHeart() {
                    
                    const createElement = document.createElement('img');
                    const section = document.querySelector('section'); // creates an element in the <section> part of the html
                    createElement.src = userOptions['heartImage']; //sets heart image
                    var size = Math.random() * 60;
            
                    createElement.style.width = 20 + size + 'px';
                    createElement.style.height = 20 + size + 'px';
                    createElement.style.left = Math.random() * innerWidth + "px"; //randomises where the heart will appear

                    console.log("create"+hearts) //useful for debugging - recommend keeping in
                
                    section.appendChild(createElement); //add the created element to the html element...

                    setTimeout(removeHeart(createElement), intervalTime + 2500) // and remove it after awhile

                    hearts -= 1 //register that the heart has been created and tick it off

                    if (hearts <= 0) {
                        clearInterval(intervalId)
                    } else {
                        intervalId = setTimeout(createHeart, intervalTime);
                    } // once all the hearts have been created, reset everything and make sure the program finishes before closing

                }

                function removeHeart(createElement) {
                    var rmFunction = function() {
                        createElement.remove();
                    }
                    
                    return rmFunction;
                } // function to delete the element. very simple. Nested function so it calls individually
                
                intervalId = setTimeout(createHeart, intervalTime);

            }

            setTimeout(function () {
                canGo = true;
                
            }, userOptions['coolDown']) //run a cooldown after the event to prevent spamming. cooldown assigned at top

        }
    }
});