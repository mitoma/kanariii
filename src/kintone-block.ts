import Blockly from 'blockly/core';
import 'blockly/javascript';

type KintoneEventBlockDefinition = {
    blockName: string;
    eventKey: string;
    blockLabel: string;
}

// イベントの定義
// https://developer.cybozu.io/hc/ja/articles/360000361686
const kintoneEventBlockDefinition: KintoneEventBlockDefinition[] = [
    {
        blockName: 'kintone_app_record_index_show',
        eventKey: 'app.record.index.show',
        blockLabel: 'レコード一覧画面を表示した時'
    },
    {
        blockName: 'kintone_app_record_detail_show',
        eventKey: 'app.record.detail.show',
        blockLabel: 'レコード詳細画面を表示した時'
    },
    {
        blockName: 'kintone_app_record_create_show',
        eventKey: 'app.record.create.show',
        blockLabel: 'レコード追加画面を表示した時'
    },
];

export function buildKintone(category: Element, blocks: object, js: object) {
    const kintoneBlocks: KintoneBlocks[] = [];
    // イベント系
    kintoneEventBlockDefinition.forEach((definition) => {
        kintoneBlocks.push(new KintoneEventBlock(definition.blockName, definition.eventKey, definition.blockLabel))
    });
    // デバッグ用
    kintoneBlocks.push(new ConsoleLogBlock());
    kintoneBlocks.forEach((block) => {
        blocks[block.blockName] = block.blockDefinition();
        js[block.blockName] = block.jsGenerator();
        category.appendChild(block.menuElement());
    });
}

interface KintoneBlocks {
    blockName: string;
    blockDefinition(): object;
    jsGenerator(): (block: any) => string;
    menuElement(): Element;
}

class KintoneEventBlock implements KintoneBlocks {

    constructor(public blockName: string, private eventKey: string, private label: string) { }

    blockDefinition(): object {
        const label = this.label;
        return {
            init: function () {
                this.appendDummyInput()
                    .appendField(label);
                this.appendStatementInput("success")
                    .setCheck(null);
                this.setColour(60);
                this.setTooltip("");
                this.setHelpUrl("");
            }
        }
    }

    jsGenerator(): (block: any) => string {
        return function (block): string {
            let statements_success = Blockly.JavaScript.statementToCode(block, 'success');
            return `
kintone.events.on('${this.eventKey}', function(event) {
${statements_success}
});
`;
        };
    }

    menuElement(): Element {
        let blockElement = document.createElement("block");
        blockElement.setAttribute("type", this.blockName);
        return blockElement;
    }
}

class ConsoleLogBlock implements KintoneBlocks {
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