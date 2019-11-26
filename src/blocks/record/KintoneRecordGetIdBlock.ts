import { KintoneBlock } from '../KintoneBlock';
import * as Blockly from 'blockly';
import 'blockly/javascript';
import { BlockColors, enableInEventBlock } from '../block-definition-util';

export class KintoneRecordGetIdBlock implements KintoneBlock {
  blockName: string = 'kintone_app_record_get_id';

  blockDefinition(): object {
    return {
      init: function() {
        const block: Blockly.Block = this;
        const jsonDefinition = {
          message0: '%{BKY_KINTONE_APP_RECORD_GET_ID_MSG}',
          output: null,
          colour: BlockColors.KINTONE,
          tooltip: '%{BKY_KINTONE_APP_RECORD_GET_ID_TOOLTIP}',
          helpUrl: '',
        };
        block.jsonInit(jsonDefinition);
        enableInEventBlock(block);
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
