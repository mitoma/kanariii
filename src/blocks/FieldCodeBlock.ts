import { KintoneBlock } from "./KintoneBlock";
import Blockly from 'blockly/core';
import 'blockly/javascript';
import { Field } from "../schema/Field";

export class FieldCodeBlock implements KintoneBlock {

    constructor(private fields: Field[]) { }

    blockName: string = 'kintone_app_schema_field';

    blockDefinition(): object {
        const labelVarPair = this.fields.map((f) => { return [f.label, f.var] });
        return {
            init: function () {
                this.appendDummyInput()
                    .appendField("フィールド")
                    .appendField(new Blockly.FieldDropdown(labelVarPair), "field_code");
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