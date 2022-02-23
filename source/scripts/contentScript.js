console.debug('helloworld from content script');

function fade(element) {
  let op = 1; // initial opacity
  const timer = setInterval(() => {
    if (op <= 0.1) {
      clearInterval(timer);
      element.style.display = 'none';
    }
    element.style.opacity = op;
    element.style.filter = `alpha(opacity=${op * 100})`;
    op -= op * 0.07;
  }, 50);
}

const gif = document.createElement('img');
gif.id = 'dio-gif';
gif.style.position = 'fixed';
gif.style.top = '10%';
gif.style.left = '10%';
gif.style.zIndex = '10';
gif.style.maxHeight = '200px';

const stopLoading = () => {
  window.stop();
  document.body.prepend(gif);
  // Safer to set url after stopping load
  gif.src = chrome.runtime.getURL('assets/za-warudo.gif');
  fade(gif);
};

const loadImage = (image) => {
  image.src = `${image.src}?random=${new Date().getTime()}`;
};

const loadImages = () => {
  const images = document.querySelectorAll('img');
  for (const image of images) {
    loadImage(image);
  }
};

const readyStateSolution = () => {
  document.addEventListener('readystatechange', (event) => {
    console.debug('state: ', event.target.readyState);
    console.debug('readyState: ', document.readyState);

    switch (event.target.readyState) {
      case 'interactive':
        stopLoading();
        loadImages();
        break;
      case 'complete':
        // stopLoading();
        // loadImages();
        break;
      default:
        console.debug('default');
    }
  });
};

const domContentReadySolution = () => {
  document.addEventListener('DOMContentLoaded', (_event) => {
    console.debug('DOM fully loaded and parsed');
    stopLoading();
    loadImages();
  });
};

// smh and bloomberg better on other ext.
switch (document.location.origin) {
  case 'https://www.smh.com.au':
    domContentReadySolution();
    break;
  case 'https://www.afr.com':
    domContentReadySolution();
    break;
  case 'https://www.businessinsider.com':
    domContentReadySolution();
    break;
  default:
    console.debug('test');
    readyStateSolution();
}
