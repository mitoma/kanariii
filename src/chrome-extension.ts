function injectScript(file: string) {
  const bodyTag = document.getElementsByTagName('body')[0];
  const scriptTag = document.createElement('script');
  scriptTag.setAttribute('type', 'text/javascript');
  scriptTag.setAttribute('src', file);
  return bodyTag.appendChild(scriptTag);
}

injectScript(chrome.extension.getURL('/kintone-blockly.js'));
