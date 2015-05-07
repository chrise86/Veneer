var themes;

function getThemes() {
  chrome.storage.sync.get('VaneerThemes', function(res) {
    themes = JSON.parse(res['VaneerThemes']);
    domThemes()
  })
}

var domThemes = function() {
  var list = document.querySelector('.list');
  themes.map(function(item) {

    var liItem = document.createElement('li'),
        div = document.createElement('div'),
        title = document.createElement('span'),
        iframe = document.createElement('iframe'),
        button = document.createElement('button');

    button.innerText = 'Use Theme';
    // Setting attribute for later use
    button.setAttribute("data", item.url)
    button.addEventListener("click", downloadTheme);
    // photo.src = json[0].download_url;
    iframe.src = 'http://' + item.url;
    title.innerText = item.url;
    div.appendChild(title);
    div.appendChild(button);
    liItem.appendChild(iframe);
    liItem.appendChild(div);
    list.appendChild(liItem);

  })
}

var downloadTheme = function(event) {
  console.log(themes)
  themes.map(function(i) {
    if (i.url == event.srcElement.attributes["data"].nodeValue) {
      addTheme(i)
    }
  })
}

function addTheme(contents) {
  chrome.storage.sync.get('CustomCSS', function(res) {
    console.log('Add', res)
    if (!res['CustomCSS']) {
      storage = [];
    } else {
      storage = JSON.parse(res['CustomCSS']);
    }

    storage.push(contents);

    storage = JSON.stringify(storage);

    saveToStorage(storage);
  })
}

function saveToStorage(strg) {
  chrome.storage.sync.set({'CustomCSS': strg}, function (res) {
    console.log("saved", strg);
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, 'reload');
    });
  });
}

getThemes();