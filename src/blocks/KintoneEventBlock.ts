import { KintoneBlock } from './KintoneBlock';
import * as Blockly from 'blockly';
import 'blockly/javascript';
import { BlockColors } from './block-definition-util';

export type KintoneEventBlockCategoryDef = {
  blockName: string;
  blockLabel: string;
  details: KintoneEventBlockDetailDef[];
};

type KintoneEventBlockDetailDef = {
  eventKey: string;
  eventLabel: string;
};

export class KintoneEventBlock implements KintoneBlock {
  blockName: string;

  categoryDef: KintoneEventBlockCategoryDef;

  constructor(categoryDef: KintoneEventBlockCategoryDef) {
    this.blockName = categoryDef.blockName;
    this.categoryDef = categoryDef;
  }

  blockDefinition(): object {
    const categoryDef = this.categoryDef;
    return {
      init: function() {
        this.appendDummyInput().appendField(categoryDef.blockLabel);
        this.appendDummyInput().appendField(
          new Blockly.FieldDropdown(
            categoryDef.details.map(detail => {
              return [detail.eventLabel, detail.eventKey];
            }),
          ),
          'event_type',
        );
        this.appendStatementInput('event_callback').setCheck(null);
        this.setInputsInline(false);
        this.setColour(BlockColors.KINTONE);
        this.setTooltip('');
        this.setHelpUrl('');
      },
    };
  }

  jsGenerator(): (block: Blockly.Block) => string {
    return function(block): string {
      const event_type = block.getFieldValue('event_type');
      // @ts-ignore
      const event_callback = Blockly.JavaScript.statementToCode(
        block,
        'event_callback',
      );
      return `
kintone.events.on('${event_type}', async function(event) {
${event_callback};
return event;
});
`;
    };
  }

  menuElement(): Element {
    let blockElement = document.createElement('block');
    blockElement.setAttribute('type', this.blockName);
    return blockElement;
  }
}
