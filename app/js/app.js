var completeBtn = document.querySelector('.complete');
var editor;

chrome.storage.sync.get('CustomCSS', function (res) {
  console.log(res);
});
editor = CodeMirror.fromTextArea(document.querySelector('textarea'), {
  lineNumbers: true,
});

var newCSS = function() {
  var text = editor.getValue();
  console.log(text);
  chrome.storage.sync.set({'CustomCSS': text}, function () {
     console.log("Just saved", text)
  });
};

completeBtn.addEventListener("click", newCSS);