import { KintoneBlock } from "./KintoneBlock";
import Blockly from 'blockly/core';
import 'blockly/javascript';

export class FieldCodeBlock implements KintoneBlock {
    blockName: string;

    blockDefinition(): object {
        return {
            init: function () {
                this.appendDummyInput()
                    .appendField("フィールドコード")
                    .appendField(new Blockly.FieldDropdown([["カラム名1", "column1"], ["カラム名2", "column2"], ["カラム名3", "column3"]]), "field_code");
                this.setOutput(true, null);
                this.setColour(230);
                this.setTooltip("");
                this.setHelpUrl("");
            }
        };
    }

    jsGenerator(): (block: any) => any {
        return function (block: any): object[] {
            var field_code = block.getFieldValue('field_code');
            return [JSON.stringify(field_code), Blockly.JavaScript.ORDER_ATOMIC];
        };
    }

    menuElement(): Element {
        let blockElement = document.createElement("block");
        blockElement.setAttribute("type", this.blockName);
        return blockElement;
    }
}