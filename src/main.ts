import * as Blockly from 'blockly/core';
import 'blockly/blocks';
import 'blockly/javascript';
import * as JA from 'blockly/msg/ja.js';
import { ShowRecordBlock } from './kintone-block';

let showRecordBlock = new ShowRecordBlock();

Blockly.setLocale(JA);
Blockly.Blocks[showRecordBlock.blockName()] = showRecordBlock.blockDefinition();
Blockly.JavaScript[showRecordBlock.blockName()] = showRecordBlock.jsGenerator();

const menuXml = `<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">
                   <block type="controls_if"></block>
                   <block type="logic_compare"></block>
                   <block type="controls_repeat_ext"></block>
                   <block type="math_number">
                     <field name="NUM">123</field>
                   </block>
                   <block type="math_arithmetic"></block>
                   <block type="text"></block>
                   <block type="text_print"></block>
                   <block type="${showRecordBlock.blockName()}"></block>
                 </xml>`;

const toolbox = Blockly.Xml.textToDom(menuXml);
const zoom = {
  controls: true,
  wheel: true,
  startScale: 1.0,
  maxScale: 3,
  minScale: 0.3,
  scaleSpeed: 1.2
};

const workspace = Blockly.inject('blocklyDiv', {
  toolbox: toolbox,
  media: 'media/',
  trashcan: true,
  zoom: zoom,
});

function showXmlCode() {
  console.log(Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace)));
}

function showJavascriptCode() {
  console.log(Blockly.JavaScript.workspaceToCode(workspace));
}

const toXmlButton = document.getElementById("kintoneBlocklyToXmlButton");
toXmlButton.onclick = showXmlCode;

const toJsButton = document.getElementById("kintoneBlocklyToJsButton");
toJsButton.onclick = showJavascriptCode;
