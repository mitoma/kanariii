import { KintoneBlock } from '../KintoneBlock';
import * as Blockly from 'blockly';
import 'blockly/javascript';
import { BlockColors } from '../block-definition-util';

export class DebuggerBlock implements KintoneBlock {
  blockName = 'debugger';
  blockDefinition(): object {
    return {
      init: function() {
        this.appendDummyInput().appendField('debugger');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(BlockColors.SLASH);
        this.setTooltip('debugger を起動する');
        this.setHelpUrl('');
      },
    };
  }

  jsGenerator(): (block: Blockly.Block) => string {
    return function(block): string {
      // @ts-ignore
      let inputValue = Blockly.JavaScript.valueToCode(
        block,
        'TEXT',
        // @ts-ignore
        Blockly.JavaScript.ORDER_ATOMIC,
      );
      return `debugger;\n`;
    };
  }

  menuElement(): Element {
    let blockElement = document.createElement('block');
    blockElement.setAttribute('type', this.blockName);
    return blockElement;
  }
}
