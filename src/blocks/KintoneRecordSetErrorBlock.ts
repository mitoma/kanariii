import { KintoneBlock } from './KintoneBlock';
import * as Blockly from 'blockly';
import 'blockly/javascript';
import { Field } from '../schema/Field';

export class KintoneRecordSetErrorBlock implements KintoneBlock {
  constructor(private fields: Field[]) {}
  blockName = 'kintone_app_record_set_error';
  blockDefinition(): object {
    const fieldsDropdown = this.fields.map(f => {
      return [f.label, f.var];
    });
    return {
      init: function() {
        this.appendValueInput('TEXT')
          .setCheck(null)
          .appendField('フィールドエラーセット')
          .appendField(new Blockly.FieldDropdown(fieldsDropdown), 'field_code');
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#9fa55b');
        this.setTooltip('フィールドのエラー設定します');
        this.setHelpUrl('');
      },
    };
  }

  jsGenerator(): (block: Blockly.Block) => string {
    return function(block): string {
      var fieldCode = JSON.stringify(block.getFieldValue('field_code'));
      const inputValue =
        // @ts-ignore
        Blockly.JavaScript.valueToCode(
          block,
          'TEXT',
          // @ts-ignore
          Blockly.JavaScript.ORDER_ATOMIC,
        );
      return `event['record'][${fieldCode}]['error'] = ${inputValue};`;
    };
  }

  menuElement(): Element {
    let blockElement = document.createElement('block');
    blockElement.setAttribute('type', this.blockName);
    return blockElement;
  }
}
