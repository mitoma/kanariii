import { KintoneBlock } from '../KintoneBlock';
import * as Blockly from 'blockly';
import 'blockly/javascript';
import { Field } from '../../schema/Field';
import { BlockColors, isAsyncableEventBlock } from '../block-definition-util';

export type KintoneFieldEventBlockCategoryDef = {
  blockName: string;
  blockLabel: string;
  blockLabelSub: string;
  eventKeyPrefix: string;
};

export class KintoneEventFieldBlock implements KintoneBlock {
  blockName: string;

  constructor(
    private categoryDef: KintoneFieldEventBlockCategoryDef,
    private fields: Field[],
  ) {
    this.blockName = categoryDef.blockName;
  }

  blockDefinition(): object {
    const categoryDef = this.categoryDef;
    const fields = this.fields;

    return {
      init: function() {
        const dropdown = fields.map(field => {
          return [field.label, field.code];
        });

        const block: Blockly.Block = this;
        const jsonDefinition = {
          message0: categoryDef.blockLabel,
          message1: categoryDef.blockLabelSub,
          message2: '%1',
          args2: [
            {
              type: 'field_dropdown',
              name: 'field_code',
              options: dropdown,
            },
          ],
          message3: '%1',
          args3: [
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
    const categoryDef = this.categoryDef;
    return function(block): string {
      const functionSigniture = isAsyncableEventBlock(block)
        ? 'async function(event)'
        : 'function(event)';
      const fieldCode = block.getFieldValue('field_code');
      // @ts-ignore
      const eventCallback = Blockly.JavaScript.statementToCode(
        block,
        'event_callback',
      );
      return `
kintone.events.on('${categoryDef.eventKeyPrefix}.${fieldCode}', ${functionSigniture} {
${eventCallback};
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
