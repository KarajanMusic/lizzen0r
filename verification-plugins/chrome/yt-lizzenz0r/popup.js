console.log("popup.js loaded")

let changeColor = document.getElementById('changeColor');
let anyLocalKeyField = document.getElementById('anyLocalKey')

chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});

chrome.storage.sync.get('anyLocalKey', function(data) {
  anyLocalKeyField.innerHTML = data.anyLocalKey;
});

changeColor.onclick = function(element) {
    let color = element.target.value;
      chrome.tabs.executeScript(
          null,
          {code: 'document.body.style.backgroundColor = "' + color + '";'},
          function(arg) {
            console.log("callback")
            console.log(arg)
          }
        );
};

chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    console.log(url)
});
