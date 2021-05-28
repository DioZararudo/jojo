console.debug('helloworld from content script');

function fade(element) {
  var op = 1;  // initial opacity
  var timer = setInterval(function () {
      if (op <= 0.1){
          clearInterval(timer);
          element.style.display = 'none';
      }
      element.style.opacity = op;
      element.style.filter = 'alpha(opacity=' + op * 100 + ")";
      op -= op * 0.07;
  }, 50);
}

const gif = document.createElement("img")
gif.id = 'dio-gif'
gif.style.position = 'fixed'
gif.style.top = '130px'
gif.style.left = '923px'
gif.style.zIndex= '10'
gif.style.maxHeight = '200px'

document.addEventListener('DOMContentLoaded', (event) => {
  console.debug('DOM fully loaded and parsed');
  window.stop();
  document.body.prepend(gif)
  // Safer to set url after stopping load
  gif.src = chrome.runtime.getURL('assets/za-warudo.gif')
  fade(gif)
});
