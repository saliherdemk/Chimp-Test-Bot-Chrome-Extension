alert("Extension Activated!\nWarning: If you change tab while bot playing, bot might not be able to reach your target level.");
//document.querySelector(".close-btn").click();

var restrict = 1;
var delay = 10;

// Get target level data from popup.js
chrome.storage.local.get("variable",function(data){
    restrict= data.variable - 4;

    if(restrict < 1){
        restrict = 1;
    } else if(restrict > 37){
        restrict = 37
    }

    chrome.storage.local.remove("variable");
});

// Get clicking delay data from popup.js
chrome.storage.local.get("var",function(data){
    delay = data.var;

    chrome.storage.local.remove("var");
})

// Sleeping function
async function sleep(ms){
    return new Promise( resolver => setTimeout(resolver, ms));
};


function start(){
    
    // Wait for start button loading
    sleep(delay).then(()=>{

        // Click on targets in order
        async function task(sorted){
            for(var i = 0;i<sorted.length;i++){
                if(delay != 0){
                    await sleep(delay);
                }
                sorted[i].click();

            }    
        }
    

        async function go(){
            let arr = document.querySelectorAll(".css-19b5rdt"); // Get all existing targets as an array
    
            try{
                // Add delay according to delay value
                if((delay != 50) && (delay != 0)){
                    await sleep((arr.length + 3) * delay);

                } else if(delay == 50){
                    await sleep((arr.length + 5.5) * delay);
                
                }
                document.querySelector(".e19owgy710").click(); // Click on continue button for next level
            
            } catch{
                null
            } finally{
                let arr = document.querySelectorAll(".css-19b5rdt"); // Get all existing targets as an array
    
                let sorted = [];
                
                for(var i = 0;i<arr.length;i++){
                    sorted.push(arr[i])
                }
    
                // Array sorted by value
                sorted.sort(function(a,b){return (a.querySelector("div").innerHTML - b.querySelector("div").innerHTML)})
    
                task(sorted);
            
            }
        }
    
        // Do it again until reach the target level
        async function tr(){
            for(var count = 0;count < restrict;count++){
                await go();
            }
    
        }
    
        tr();
    
    
    })
}


start();






