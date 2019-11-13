import { KintoneBlock } from './KintoneBlock';
import * as Blockly from 'blockly';
import 'blockly/javascript';
import { Field } from '../schema/Field';

export class KintoneRecordSetDisabledBlock implements KintoneBlock {
  constructor(private fields: Field[]) {}
  blockName = 'kintone_app_record_set_disabled';
  blockDefinition(): object {
    const fieldsDropDown = this.fields.map(f => {
      return [f.label, f.var];
    });
    const disabledDropdown = [
      ['編集可', 'false'],
      ['編集不可', 'true'],
    ];
    return {
      init: function() {
        this.appendDummyInput()
          .appendField('フィールド編集可/不可')
          .appendField(new Blockly.FieldDropdown(fieldsDropDown), 'field_code')
          .appendField(new Blockly.FieldDropdown(disabledDropdown), 'disabled');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#9fa55b');
        this.setTooltip('フィールドの編集可/不可を設定します');
        this.setHelpUrl('');
      },
    };
  }

  jsGenerator(): (block: Blockly.Block) => string {
    return function(block): string {
      var fieldCode = JSON.stringify(block.getFieldValue('field_code'));
      // disabled は文字列で "true", "false" が入っているので stringify 不要
      var disabled = block.getFieldValue('disabled');
      return `event['record'][${fieldCode}]['disabled'] = ${disabled};`;
    };
  }

  menuElement(): Element {
    let blockElement = document.createElement('block');
    blockElement.setAttribute('type', this.blockName);
    return blockElement;
  }
}
