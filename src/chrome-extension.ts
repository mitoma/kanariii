function injectScript(file: string) {
  const bodyTag = document.getElementsByTagName('body')[0];
  const mediaScript = document.createElement('script');
  mediaScript.setAttribute('type', 'text/javascript');
  mediaScript.innerText = `
  var KanariIi = KanariIi || {};
  KanariIi.sourceXml = KanariIi.sourceXml || '<xml xmlns="https://developers.google.com/blockly/xml"></xml>';
  KanariIi.revisions = KanariIi.revisions || [];
  KanariIi.mediaUrl = ${JSON.stringify(chrome.extension.getURL('/media/'))};`;
  bodyTag.appendChild(mediaScript);

  const mainScript = document.createElement('script');
  mainScript.setAttribute('type', 'text/javascript');
  mainScript.setAttribute('src', file);
  bodyTag.appendChild(mainScript);
}

injectScript(chrome.extension.getURL('/kintone-blockly.js'));
