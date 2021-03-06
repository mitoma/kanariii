import { KintoneBlock } from '../KintoneBlock';
import * as Blockly from 'blockly';
import 'blockly/javascript';
import { Field } from '../../schema/Field';
import { BlockColors, appendShadowText } from '../block-definition-util';
import { xmlCreateElement } from '../kintone-block';

export class KintoneRecordSetValueBlock implements KintoneBlock {
  constructor(private fields: Field[]) {}
  blockName = 'kintone_app_record_set_value';
  blockDefinition(): object {
    const fieldsDropdown = this.fields.map(f => {
      return [f.label, f.code];
    });
    return {
      init: function() {
        const block: Blockly.Block = this;
        const jsonDefinition = {
          message0: '%{BKY_KINTONE_APP_RECORD_SET_VALUE_MSG}',
          args0: [
            {
              type: 'field_dropdown',
              name: 'field_code',
              options: fieldsDropdown,
            },
            {
              type: 'input_value',
              name: 'TEXT',
            },
          ],
          inputsInline: true,
          previousStatement: 'Action',
          nextStatement: 'Action',
          colour: BlockColors.KINTONE,
          tooltip: '%{BKY_KINTONE_APP_RECORD_SET_VALUE_TOOLTIP}',
          helpUrl: '',
        };
        block.jsonInit(jsonDefinition);
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
      return `event['record'][${fieldCode}]['value'] = ${inputValue};`;
    };
  }

  menuElement(): Element {
    let blockElement = xmlCreateElement('block');
    blockElement.setAttribute('type', this.blockName);
    return appendShadowText(blockElement, '');
  }
}
