console.log("popup.js loaded")

let checkLicenseButton = document.getElementById('checkLicense');
let anyLocalKeyField = document.getElementById('anyLocalKey')

console.log(web3)

chrome.storage.sync.get('anyLocalKey', function(data) {
  anyLocalKeyField.innerHTML = data.anyLocalKey;
});

checkLicenseButton.onclick = function(element) {

  var ul = document.getElementById("licenseList");
  var li = document.createElement("li");
  li.appendChild(document.createTextNode("That's my license"));
  ul.appendChild(li);

  // changing DOM according to whatever
  chrome.tabs.executeScript(
    null,
    {code: 'document.body.style.backgroundColor = "#FF0000";'},
    function(arg) {
      console.log("callback")
      console.log(arg)
    }
  );
};

chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    console.log(url)
    document.getElementById("videoUrl").innerHTML = url
});
