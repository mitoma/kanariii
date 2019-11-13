import { KintoneBlock } from './KintoneBlock';
import * as Blockly from 'blockly';
import 'blockly/javascript';

export class KintoneRecordGetIdBlock implements KintoneBlock {
  blockName: string = 'kintone_app_record_get_id';

  blockDefinition(): object {
    return {
      init: function() {
        this.appendDummyInput().appendField('レコードID');
        this.setOutput(true, null);
        this.setColour('#9fa55b');
        this.setTooltip('');
        this.setHelpUrl('');
      },
    };
  }

  jsGenerator(): (block: Blockly.Block) => any {
    return function(block: Blockly.Block): object[] {
      // @ts-ignore
      return ['kintone.app.record.getId()', Blockly.JavaScript.ORDER_ATOMIC];
    };
  }

  menuElement(): Element {
    let blockElement = document.createElement('block');
    blockElement.setAttribute('type', this.blockName);
    return blockElement;
  }
}
