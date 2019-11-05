import * as Blockly from "blockly";

export interface KintoneBlock {
    blockName: string;
    blockDefinition(): object;
    jsGenerator(): (block: Blockly.Block) => any;
    menuElement(): Element;
}
