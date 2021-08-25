import '../styles/options.scss';

document.addEventListener('DOMContentLoaded', function () {
  const manifest = chrome.runtime.getManifest();
  console.log(manifest)
  document.getElementById('version').textContent = manifest.version;
});
