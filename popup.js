function clickHandler(e) {
    chrome.runtime.sendMessage({directive: "popup-click"}, function(response) {
        this.close(); // close the popup when the background finishes processing request
    });
}
function save_options() {
  var minutes = document.getElementById("duration").value;
  chrome.storage.sync.set({
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
    duration :0
  }, function(items) {
    document.getElementById("duration").value = items.duration;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('save').addEventListener('click',
    save_options);

    document.getElementById('click-me').addEventListener('click', clickHandler);
})
