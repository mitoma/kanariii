import * as Blockly from 'blockly';
import categoryXml from '../category.xml';
import JA from 'blockly/msg/ja.js';
import { buildKintone } from '../kintone-block';
import { Field } from '../schema/Field';

export class WorkspaceInitializer {
  initWorkspace(
    blocklyDiv: HTMLDivElement,
    sourceXml: string,
    fields: Field[],
  ): Blockly.Workspace {
    Blockly.setLocale(JA);

    const toolbox: Element = Blockly.Xml.textToDom(categoryXml);
    const kintoneCategory: Element = toolbox.querySelector('[name=Kintone]');

    // @ts-ignore
    buildKintone(Blockly.Blocks, Blockly.JavaScript, kintoneCategory, fields);

    const zoom = {
      controls: true,
      wheel: true,
      startScale: 1.0,
      maxScale: 3,
      minScale: 0.3,
      scaleSpeed: 1.2,
    };

    const workspace = Blockly.inject(blocklyDiv, {
      toolbox: toolbox,
      trashcan: true,
      zoom: zoom,
    });
    Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(sourceXml), workspace);
    return workspace;
  }
}
