var f = document.body.appendChild(document.createElement('iframe'));
const game = ("chrome-extension://"+chrome.runtime.id+"/unity/1v1_lol.html");
function err() {
  location.href = game
}
f.onload = (e) => {
  err()
}

f.onerror = (e) => {
  console.log('err');
  err();
}
f.setAttribute('allowfullscreen', 'allowfullscreen');
f.setAttribute('allowtransparency', 'true');
f.setAttribute('border', '0');
f.style.width = '100vw';
f.style.height = '100vh';
f.src = game;