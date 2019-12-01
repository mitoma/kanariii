import { KintoneBlock } from '../KintoneBlock';
import * as Blockly from 'blockly';
import 'blockly/javascript';
import { BlockColors, isAsyncableEventBlock } from '../block-definition-util';

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
        const dropdown = categoryDef.details.map(detail => [
          detail.eventLabel,
          detail.eventKey,
        ]);

        const block: Blockly.Block = this;
        const jsonDefinition = {
          message0: categoryDef.blockLabel,
          args0: [
            {
              type: 'field_dropdown',
              name: 'event_type',
              options: dropdown,
            },
          ],
          message1: '%1',
          args1: [
            {
              type: 'input_statement',
              name: 'event_callback',
            },
          ],
          inputsInline: false,
          colour: BlockColors.KINTONE,
          tooltip: '',
          helpUrl: '',
        };
        block.jsonInit(jsonDefinition);
      },
    };
  }

  jsGenerator(): (block: Blockly.Block) => string {
    return function(block): string {
      const functionSigniture = isAsyncableEventBlock(block)
        ? 'async function(event)'
        : 'function(event)';
      const event_type = block.getFieldValue('event_type');
      // @ts-ignore
      const event_callback = Blockly.JavaScript.statementToCode(
        block,
        'event_callback',
      );
      return `
kintone.events.on('${event_type}', ${functionSigniture} {
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
