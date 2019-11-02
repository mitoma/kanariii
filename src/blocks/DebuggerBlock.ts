import { KintoneBlock } from "./KintoneBlock";
import Blockly from 'blockly/core';
import 'blockly/javascript';

export class DebuggerBlock implements KintoneBlock {
    blockName = 'debugger';
    blockDefinition(): object {
        return {
            init: function () {
                this.appendDummyInput()
                    .appendField("debugger");
                this.setInputsInline(true);
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setColour('#9fa55b');
                this.setTooltip("debugger を起動する");
                this.setHelpUrl("");
            }
        };
    }

    jsGenerator(): (block: any) => string {
        return function (block): string {
            let inputValue = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_ATOMIC);
            return `debugger;\n`;
        };
    }

    menuElement(): Element {
        let blockElement = document.createElement("block");
        blockElement.setAttribute("type", this.blockName);
        return blockElement;
    }
}