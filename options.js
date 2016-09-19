// Saves options to chrome.storage
function save_options() {
  var bannedString = document.getElementById('bannedList').value;
  var bList = bannedString.split(" ");
  var minutes = document.getElementById("duration").value;
  console.log(JSON.stringify(bList));
  chrome.storage.sync.set({
    bannedList: bList,
    duration: minutes
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    bannedList:["facebook"],
    duration :0
  }, function(items) {
    var strings = items.bannedList;
    var res = "";
    for(var i = 0; i<strings.length;i++){
      res=res+strings[i]+" ";
    }
    document.getElementById('bannedList').value = res;
    document.getElementById("duration").value = items.duration;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);