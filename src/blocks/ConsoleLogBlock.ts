import { KintoneBlock } from "./KintoneBlock";
import * as Blockly from 'blockly';
import 'blockly/javascript';

export class ConsoleLogBlock implements KintoneBlock {
    blockName = 'console_log';
    blockDefinition(): object {
        return {
            init: function () {
                this.appendValueInput("TEXT")
                    .setCheck(null)
                    .appendField("ログ出力");
                this.setInputsInline(false);
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setColour('#9fa55b');
                this.setTooltip("ログを出力するんだよー。");
                this.setHelpUrl("");
            }
        };
    }

    jsGenerator(): (block: Blockly.Block) => string {
        return function (block): string {
            // @ts-ignore
            const inputValue = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_ATOMIC);
            return `console.log(${inputValue});\n`;
        };
    }

    menuElement(): Element {
        let blockElement = document.createElement("block");
        blockElement.setAttribute("type", this.blockName);
        return blockElement;
    }
}