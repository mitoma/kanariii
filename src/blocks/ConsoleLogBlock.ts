import { KintoneBlock } from "./KintoneBlock";
import Blockly from 'blockly/core';
import 'blockly/javascript';

export class ConsoleLogBlock implements KintoneBlock {
    blockName = 'console_log';
    blockDefinition(): object {
        return {
            init: function () {
                this.appendValueInput("TEXT")
                    .setCheck(null)
                    .appendField("ログ出力");
                this.setInputsInline(true);
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setColour(0);
                this.setTooltip("ログを出力するんだよー。");
                this.setHelpUrl("");
            }
        };
    }

    jsGenerator(): (block: any) => string {
        return function (block): string {
            let inputValue = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_ATOMIC);
            return `console.log(${inputValue});\n`;
        };
    }

    menuElement(): Element {
        let blockElement = document.createElement("block");
        blockElement.setAttribute("type", this.blockName);
        return blockElement;
    }
}