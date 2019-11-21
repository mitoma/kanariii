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
      return [f.label, f.var];
    });

    return {
      init: function() {
        this.appendDummyInput()
          .appendField('フィールド値')
          .appendField(new Blockly.FieldDropdown(fieldsDropdown), 'field_code');

        this.setOutput(true, null);
        this.setColour(BlockColors.KINTONE);
        this.setTooltip('');
        this.setHelpUrl('');
        enableInEventBlock(this);
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
