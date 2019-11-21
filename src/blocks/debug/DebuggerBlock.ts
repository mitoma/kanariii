import { KintoneBlock } from '../KintoneBlock';
import * as Blockly from 'blockly';
import 'blockly/javascript';
import { BlockColors } from '../block-definition-util';

export class DebuggerBlock implements KintoneBlock {
  blockName = 'debugger';
  blockDefinition(): object {
    return {
      init: function() {
        const block: Blockly.Block = this;

        const jsonDefinition = {
          message0: '%{BKY_DEBUGGER_MSG}',
          colour: BlockColors.SLASH,
          tooltip: '%{BKY_DEBUGGER_TOOLTIP}',
          helpUrl: '',
          previousStatement: 'Action',
          nextStatement: 'Action',
        };
        block.jsonInit(jsonDefinition);
      },
    };
  }

  jsGenerator(): (block: Blockly.Block) => string {
    return function(): string {
      return `debugger;\n`;
    };
  }

  menuElement(): Element {
    let blockElement = document.createElement('block');
    blockElement.setAttribute('type', this.blockName);
    return blockElement;
  }
}
