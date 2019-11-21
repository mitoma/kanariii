import { KintoneBlock } from '../KintoneBlock';
import * as Blockly from 'blockly';
import 'blockly/javascript';
import { Field } from '../../schema/Field';
import { BlockColors } from '../block-definition-util';

export class KintoneRecordGetFieldElementBlock implements KintoneBlock {
  constructor(private fields: Field[]) {}

  blockName: string = 'kintone_app_record_get_field_element';

  blockDefinition(): object {
    const fieldsDropdown = this.fields.map(f => {
      return [f.label, f.var];
    });

    return {
      init: function() {
        this.appendDummyInput()
          .appendField('フィールドエレメント')
          .appendField(new Blockly.FieldDropdown(fieldsDropdown), 'field_code');

        this.setOutput(true, null);
        this.setColour(BlockColors.KINTONE);
        this.setTooltip('');
        this.setHelpUrl('');
      },
    };
  }

  jsGenerator(): (block: Blockly.Block) => any {
    return function(block: Blockly.Block): object[] {
      var fieldCode = JSON.stringify(block.getFieldValue('field_code'));
      return [
        `kintone.app.record.getFieldElement(${fieldCode})`,
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
