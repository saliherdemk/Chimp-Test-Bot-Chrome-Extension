// Send target level value to script.js
function send_target_level_value() {
    chrome.storage.local.set({
        variable: document.getElementById("number").value
    },
    function(){
        chrome.tabs.executeScript({
            file: "script.js"
        });
    });
}

// Send delay value to script.js
function send_delay_value(){
    chrome.storage.local.set({
        var: document.getElementById("delay").value
    },
    function(){
        chrome.tabs.executeScript({
            file: "script.js"
        });
    });

    // If checkbox checked, send a notification
    var not = document.getElementById("notification").checked;

    if(not == true){
        var options = {
            type:"basic",
            title:"Human Benchmark Settings",
            message: "Bot is playing with "+document.getElementById("delay").value +"ms delay. Target Level is "+ document.getElementById("number").value +".",
            iconUrl: "media/chimpanzee.jpg"
        }
        
        chrome.notifications.create(options,callback);
        
        function callback(){
            null
        }
        
    }

}

// 
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("go").addEventListener("click",send_delay_value);
    document.getElementById("go").addEventListener("click", send_target_level_value);
});

// Update shown range slider value
var rng = document.getElementById("delay");

rng.addEventListener("mousemove",function(){
    document.getElementById("value").innerHTML = document.getElementById("delay").value;
})

rng.addEventListener("change",function(){
    document.getElementById("value").innerHTML = document.getElementById("delay").value;
})

