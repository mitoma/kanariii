import { KintoneBlock } from '../KintoneBlock';
import * as Blockly from 'blockly';
import 'blockly/javascript';
import { Field } from '../../schema/Field';
import { BlockColors } from '../block-definition-util';

export class KintoneRecordSetDisabledBlock implements KintoneBlock {
  constructor(private fields: Field[]) {}
  blockName = 'kintone_app_record_set_disabled';
  blockDefinition(): object {
    const fieldsDropdown = this.fields.map(f => {
      return [f.label, f.code];
    });
    return {
      init: function() {
        const jsonDefinition = {
          message0: '%{BKY_KINTONE_APP_RECORD_SET_DISABLED_MSG}',
          args0: [
            {
              type: 'field_dropdown',
              name: 'field_code',
              options: fieldsDropdown,
            },
            {
              type: 'field_dropdown',
              name: 'disabled',
              options: [
                ['%{BKY_KINTONE_APP_RECORD_SET_DISABLED_FALSE_MSG}', 'false'],
                ['%{BKY_KINTONE_APP_RECORD_SET_DISABLED_TRUE_MSG}', 'true'],
              ],
            },
          ],
          inputsInline: true,
          previousStatement: 'Action',
          nextStatement: 'Action',
          colour: BlockColors.KINTONE,
          tooltip: '%{BKY_KINTONE_APP_RECORD_SET_DISABLED_TOOLTIP}',
          helpUrl: '',
        };
        this.jsonInit(jsonDefinition);
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
