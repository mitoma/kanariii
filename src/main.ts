import Blockly from 'blockly/core';
import 'blockly/blocks';
import 'blockly/javascript';
import * as JA from 'blockly/msg/ja.js';
import { buildKintone } from './kintone-block';

const kintoneCategory = buildKintone(Blockly.Blocks, Blockly.JavaScript);

Blockly.setLocale(JA);

const menuXml = `<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">
                   <category name="Variables" custom="VARIABLE"></category>
                   <category name="Functions" custom="PROCEDURE"></category>
                   <category name="Logic" colour="%{BKY_LOGIC_HUE}">
                     <block type="controls_if"></block>
                     <block type="logic_compare"></block>
                     <block type="controls_repeat_ext"></block>
                     <block type="math_number">
                       <field name="NUM">123</field>
                     </block>
                     <block type="math_arithmetic"></block>
                     <block type="text"></block>
                     <block type="text_print"></block>
                   </category>
                 </xml>`;

const toolbox = Blockly.Xml.textToDom(menuXml);

toolbox.appendChild(kintoneCategory);

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
