import Blockly from 'blockly/core';
import 'blockly/javascript';

interface KintoneBlocks {
    readonly blockName: string;
    readonly blockDefinition: object;
    readonly jsGenerator: (block: any) => string;
    menuElement(): HTMLElement;
}

abstract class KintoneBaseBlocks implements KintoneBlocks {
    blockName: string;
    blockDefinition: object;
    jsGenerator: (block: any) => string;
    menuElement(): HTMLElement {
        let blockElement = document.createElement("block");
        blockElement.setAttribute("type", this.blockName);
        return blockElement;
    }
}

export class ShowRecordBlock extends KintoneBaseBlocks {
    blockName: string = 'kinblock';

    blockDefinition: object = {
        init: function () {
            this.appendStatementInput("success")
                .setCheck(null)
                .appendField("コード");
            this.setColour(60);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    }

    jsGenerator: (block) => string = function (block): string {
        let statements_success = Blockly.JavaScript.statementToCode(block, 'success');
        return `
kintone.events.on('app.record.index.show', function(event) {
${statements_success}
};
`;
    }
}
