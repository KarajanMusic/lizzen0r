console.log("popup.js loaded")

let checkLicenseButton = document.getElementById('checkLicense');
let anyLocalKeyField = document.getElementById('anyLocalKey');
let resultField = document.getElementById('result');
let licenseList = document.getElementById('licenseList')

var r = Math.random();
if (r < 0.5) {
  resultField.style.color = "#008000";
  resultField.innerHTML = "License OK";
  licenseList.innerHTML = "Issued by Red Bull MediaHouse"
} else {
  resultField.style.color = "#ff0000";
  resultField.innerHTML = "No License found!"
}

chrome.storage.sync.get('anyLocalKey', function(data) {
  //anyLocalKeyField.innerHTML = data.anyLocalKey;
});

/*
checkLicenseButton.onclick = function(element) {

  var p = metamask.createDefaultProvider();
  console.log(p);

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
*/

chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var id = tabs[0].url.split("=")[1];
    console.log(id)
    document.getElementById("videoUrl").innerHTML = id
});




/*
const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws'));

const subscription = web3.eth.subscribe('newBlockHeaders', (error, blockHeader) => {
  if (error) return console.error(error);
  console.log('Successfully subscribed!', blockHeader);
}).on('data', (blockHeader) => {
  console.log('data: ', blockHeader);
});

*/

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}

var url = "the url where we read license data"
httpGetAsync(url, function(responseText) {
  console.log(responseText);
})


/* */
