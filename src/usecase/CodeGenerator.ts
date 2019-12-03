import * as Blockly from 'blockly';
import * as parserBabel from 'prettier/parser-babylon';
import * as prettier from 'prettier/standalone';
import { Revision } from '../history/Revision';

function generateXml(workspace: Blockly.Workspace): string {
  return Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
}

function innerGenerateMetadata(
  workspace: Blockly.Workspace,
  deployMessage: string,
  revisions: Revision[],
): string {
  const xmlCode = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
  // @ts-ignore Blockly.JavaScript は型定義がまだ未対応。
  const jsCode = Blockly.JavaScript.workspaceToCode(workspace);
  revisions.push({
    revisionId: calcNextRevision(revisions),
    deployDate: new Date(),
    message: deployMessage,
    source: xmlCode,
  });
  return `
var KanariIi = KanariIi || {};
KanariIi.sourceXml=${JSON.stringify(xmlCode)};
KanariIi.revisions=${JSON.stringify(revisions)};
`;
}

function calcNextRevision(revisions: Revision[]): number {
  if (revisions.length == 0) {
    return 1;
  } else {
    return revisions[revisions.length - 1].revisionId + 1;
  }
}

function innerGenerateCode(workspace: Blockly.Workspace): string {
  // @ts-ignore Blockly.JavaScript は型定義がまだ未対応。
  const jsCode = Blockly.JavaScript.workspaceToCode(workspace);
  return `
(function(){
${jsCode}
})();
`;
}

function generateJavaScriptWithMetadata(
  workspace: Blockly.Workspace,
  deployMessage: string,
  revisions: Revision[],
): string {
  const customizeCode = `
// this code generated by kanariii

// start  internal information. don't touch.
${innerGenerateMetadata(workspace, deployMessage, revisions)}
// finish internal information.

// start generated code by blocks
${innerGenerateCode(workspace)}
// end   generated code by blocks
`;
  return prettier.format(customizeCode, {
    parser: 'babel',
    plugins: [parserBabel],
  });
}

function generateJavaScript(workspace: Blockly.Workspace): string {
  const customizeCode = innerGenerateCode(workspace);
  return prettier.format(customizeCode, {
    parser: 'babel',
    plugins: [parserBabel],
  });
}

export { generateJavaScriptWithMetadata, generateJavaScript, generateXml };
