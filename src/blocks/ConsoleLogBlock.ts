import { KintoneBlock, appendShadowText } from './KintoneBlock';
import * as Blockly from 'blockly';
import 'blockly/javascript';
import { BlockColors } from './block-definition-util';

export class ConsoleLogBlock implements KintoneBlock {
  blockName = 'console_log';
  blockDefinition(): object {
    return {
      init: function() {
        const block: Blockly.Block = this;

        const jsonDefinition = {
          message0: '%{BKY_CONSOLE_LOG_MSG}',
          args0: [
            {
              type: 'input_value',
              name: 'TEXT',
              check: null,
            },
          ],
          inputsInline: false,
          colour: BlockColors.SLASH,
          tooltip: '%{BKY_CONSOLE_LOG_TOOLTIP}',
          helpUrl: '',
          previousStatement: 'Action',
          nextStatement: 'Action',
        };
        block.jsonInit(jsonDefinition);
      },
    };
  }

  jsGenerator(): (block: Blockly.Block) => string {
    return function(block): string {
      // @ts-ignore
      const inputValue = Blockly.JavaScript.valueToCode(
        block,
        'TEXT',
        // @ts-ignore
        Blockly.JavaScript.ORDER_ATOMIC,
      );
      return `console.log(${inputValue});\n`;
    };
  }

  menuElement(): Element {
    const blockElement = document.createElement('block');
    blockElement.setAttribute('type', this.blockName);
    return appendShadowText(blockElement, 'debug message');
  }
}
