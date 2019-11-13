import { KintoneBlock } from './KintoneBlock';
import * as Blockly from 'blockly';
import 'blockly/javascript';

export class KintoneRecordGetEventBlock implements KintoneBlock {
  blockName: string = 'kintone_app_record_get_event';

  blockDefinition(): object {
    return {
      init: function() {
        this.appendDummyInput().appendField('レコードイベント');
        this.setOutput(true, null);
        this.setColour('#9fa55b');
        this.setTooltip('');
        this.setHelpUrl('');
      },
    };
  }

  jsGenerator(): (block: Blockly.Block) => any {
    return function(block: Blockly.Block): object[] {
      var fieldCode = block.getFieldValue('field_code');
      return [
        `event`,
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
