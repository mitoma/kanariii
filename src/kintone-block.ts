import * as Blockly from 'blockly/core';
import 'blockly/javascript';

export class ShowRecordBlock {
    blockName(): string { return 'kinblock'; }

    blockDefinition(): object {
        return {
            init: function () {
                this.appendStatementInput("success")
                    .setCheck(null)
                    .appendField("コード");
                this.setColour(60);
                this.setTooltip("");
                this.setHelpUrl("");
            }
        }
    }

    jsGenerator(): (block) => string {
        return function (block): string {
            let statements_success = Blockly.JavaScript.statementToCode(block, 'success');
            return `kintone.events.on('app.record.index.show', function(event) {
${statements_success}
};
`;
        };
    }
}
