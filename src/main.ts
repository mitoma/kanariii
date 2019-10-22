import * as Blockly from 'blockly';
import JA from 'blockly/msg/ja.js';

Blockly.setLocale(JA);

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
