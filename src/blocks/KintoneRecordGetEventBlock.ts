import { KintoneBlock } from './KintoneBlock';
import * as Blockly from 'blockly';
import 'blockly/javascript';
import { BlockColors } from './block-definition-util';
import { xmlCreateElement } from './kintone-block';

export class KintoneRecordGetEventBlock implements KintoneBlock {
  blockName: string = 'kintone_app_record_get_event';

  blockDefinition(): object {
    return {
      init: function() {
        const block: Blockly.Block = this;

        const jsonDefinition = {
          message0: '%{BKY_KINTONE_APP_RECORD_GET_EVENT_MSG}',
          output: null,
          colour: BlockColors.KINTONE,
          tooltip: '%{BKY_KINTONE_APP_RECORD_GET_EVENT_TOOLTIP}',
          helpUrl: '',
        };

        block.jsonInit(jsonDefinition);
      },
    };
  }

  jsGenerator(): (block: Blockly.Block) => any {
    return function(_: Blockly.Block): object[] {
      return [
        `event`,
        // @ts-ignore
        Blockly.JavaScript.ORDER_ATOMIC,
      ];
    };
  }

  menuElement(): Element {
    let blockElement = xmlCreateElement('block');
    blockElement.setAttribute('type', this.blockName);
    return blockElement;
  }
}
