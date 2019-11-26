import { KintoneBlock } from '../KintoneBlock';
import * as Blockly from 'blockly';
import 'blockly/javascript';
import { Field } from '../../schema/Field';
import { BlockColors, enableInEventBlock } from '../block-definition-util';

export class KintoneRecordGetFieldValueBlock implements KintoneBlock {
  constructor(private fields: Field[]) {}

  blockName: string = 'kintone_app_record_get_field_value';

  blockDefinition(): object {
    const fieldsDropdown = this.fields.map(f => {
      return [f.label, f.code];
    });

    return {
      init: function() {
        const block: Blockly.Block = this;
        const jsonDefinition = {
          message0: '%{BKY_KINTONE_APP_RECORD_GET_FIELD_VALUE_MSG}',
          args0: [
            {
              type: 'field_dropdown',
              name: 'field_code',
              options: fieldsDropdown,
            },
          ],
          output: null,
          colour: BlockColors.KINTONE,
          tooltip: '%{BKY_KINTONE_APP_RECORD_GET_FIELD_VALUE_TOOLTIP}',
          helpUrl: '',
        };
        block.jsonInit(jsonDefinition);
        enableInEventBlock(block);
      },
    };
  }

  jsGenerator(): (block: Blockly.Block) => any {
    return function(block: Blockly.Block): object[] {
      var fieldCode = block.getFieldValue('field_code');
      return [
        `event.record[${JSON.stringify(fieldCode)}].value`,
        // @ts-ignore
        Blockly.JavaScript.ORDER_ATOMIC,
      ];
    };
  }

  menuElement(): Element {
    let blockElement = document.createElement('block');
    blockElement.setAttribute('type', this.blockName);
    return blockElement;
  }
}
