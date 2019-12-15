import Blockly from 'blockly';
import * as parserBabel from 'prettier/parser-babylon';
import * as prettier from 'prettier/standalone';
import { buildKintone } from './blocks/kintone-block';

function loadKintoneBlocks() {
  const toolbox: Element = Blockly.Xml.textToDom(`
    <xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">
      <category name="Kintone" colour="#9fa55b"></category>
    </xml>
    `);
  const kintoneCategory: Element = toolbox.querySelector('[name=Kintone]');
  buildKintone(
    // @ts-ignore
    Blockly.Blocks,
    // @ts-ignore
    Blockly.JavaScript,
    kintoneCategory,
    [],
    { organizations: [], groups: [] },
  );
}

function xmlToCode(xml: string): string {
  const dom = Blockly.Xml.textToDom(
    `<xml xmlns="https://developers.google.com/blockly/xml">${xml}</xml>`,
  );
  const workspace = new Blockly.Workspace();
  Blockly.Xml.domToWorkspace(dom, workspace);
  // @ts-ignore
  const code: string = Blockly.JavaScript.workspaceToCode(workspace);
  return format(code);
}

function format(code: string): string {
  return prettier.format(code, {
    parser: 'babel',
    plugins: [parserBabel],
  });
}

export { loadKintoneBlocks, xmlToCode, format };
