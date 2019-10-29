import Blockly from 'blockly/core';
import 'blockly/javascript';

export function buildKintone(category: Element, blocks: object, js: object) {
    let kintoneBlocks: KintoneBlocks[] = [
        new ShowRecordBlock(),
        new ConsoleLogBlock()
    ];
    kintoneBlocks.forEach((block) => {
        blocks[block.blockName] = block.blockDefinition;
        js[block.blockName] = block.jsGenerator;
        category.appendChild(block.menuElement());
    });
}

interface KintoneBlocks {
    readonly blockName: string;
    readonly blockDefinition: object;
    readonly jsGenerator: (block: any) => string;
    menuElement(): Element;
}

abstract class KintoneBaseBlocks implements KintoneBlocks {
    blockName: string;
    blockDefinition: object;
    jsGenerator: (block: any) => string;
    menuElement(): Element {
        let blockElement = document.createElement("block");
        blockElement.setAttribute("type", this.blockName);
        return blockElement;
    }
}

class ShowRecordBlock extends KintoneBaseBlocks {
    blockName: string = 'show_record_event';

    blockDefinition: object = {
        init: function () {
            this.appendDummyInput()
                .appendField("一覧を表示した時");
            this.appendStatementInput("success")
                .setCheck(null);
            this.setColour(60);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    }

    jsGenerator: (block: any) => string = function (block): string {
        let statements_success = Blockly.JavaScript.statementToCode(block, 'success');
        return `
kintone.events.on('app.record.index.show', function(event) {
${statements_success}
});
`;
    }
}

class ConsoleLogBlock extends KintoneBaseBlocks {
    blockName = 'console_log';
    blockDefinition = {
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
    }
    jsGenerator: (block: any) => string = function (block): string {
        let inputValue = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_ATOMIC);
        return `console.log(${inputValue});\n`;
    }
}