var allItems;
var startTime;
var endTime;

function newAlarm(items){
     allItems=items;
     startTime=Date.now();
     endtime=startTime+items.duration*60000;
     var alarmInfo={when:endtime}

     chrome.alarms.create( alarmInfo);
     chrome.tabs.onUpdated.addListener(focusListener)
     chrome.alarms.onAlarm.addListener(function(alarm) {chrome.tabs.onUpdated.removeListener(focusListener)})
}
function focusListener(tabId, changeInfo, tab)
{
    
    for(var i = 0; i<allItems.bannedList.length; i++){
            if(changeInfo.url.search(allItems.bannedList[i])>=0){
                chrome.tabs.remove(tabId);
                alert("You really should be focusing\nMinutes Remaining: "+((endtime-Date.now())/60000));
            } 
         }
}
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
       
        switch (request.directive) {
        case "popup-click":
            chrome.storage.sync.get({bannedList:["facebook"],duration :0},newAlarm );
            break;
        default:
            // helps debug when request directive doesn't match
            alert("Unmatched request of '" + request + "' from script to background.js from " + sender);
        }
    }
);


