import Blockly from 'blockly/core';
import 'blockly/javascript';

export function buildKintone(blocks: object, js: object): HTMLElement {
    const kintoneCategory = document.createElement("category");
    kintoneCategory.setAttribute('name', 'Kintone');
    kintoneCategory.setAttribute('colour', '#AA0');

    let kintoneBlocks: KintoneBlocks[] = [new ShowRecordBlock()];
    kintoneBlocks.forEach((block) => {
        blocks[block.blockName] = block.blockDefinition;
        js[block.blockName] = block.jsGenerator;
        kintoneCategory.appendChild(block.menuElement());
    });

    return kintoneCategory;
}

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

class ShowRecordBlock extends KintoneBaseBlocks {
    blockName: string = 'show_record_event';

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
        return `kintone.events.on('app.record.index.show', function(event) {${statements_success}};`;
    }
}
