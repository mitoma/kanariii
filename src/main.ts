import * as Blockly from 'blockly';
import JA from 'blockly/msg/ja';

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

var toolbox = Blockly.Xml.textToDom(menuXml);

const workspace = Blockly.inject('blocklyDiv', {
    toolbox: toolbox,
    media: 'media/',
    toLocaleString: JA
});

