import 'emoji-log';
import browser from 'webextension-polyfill';

browser.runtime.onInstalled.addListener(() => {
  console.emoji('🦄', 'onInstalled....');
});

browser.runtime.onMessage.addListener((_request, _sender, _sendResponse) => {
  return Promise.resolve('got your message, thanks!');
});
