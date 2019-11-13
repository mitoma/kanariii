import { KintoneBlock } from './KintoneBlock';
import * as Blockly from 'blockly';
import 'blockly/javascript';
import { Field } from '../schema/Field';

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
        this.appendDummyInput().appendField(categoryDef.blockLabel);
        this.appendDummyInput().appendField(categoryDef.blockLabelSub);
        this.appendDummyInput().appendField(
          new Blockly.FieldDropdown(
            fields.map(field => {
              return [field.label, field.var];
            }),
          ),
          'field_code',
        );
        this.appendStatementInput('event_callback').setCheck(null);
        this.setInputsInline(false);
        this.setColour('#9fa55b');
        this.setTooltip('');
        this.setHelpUrl('');
      },
    };
  }

  jsGenerator(): (block: Blockly.Block) => string {
    const categoryDef = this.categoryDef;
    return function(block): string {
      const fieldCode = block.getFieldValue('field_code');
      // @ts-ignore
      const eventCallback = Blockly.JavaScript.statementToCode(
        block,
        'event_callback',
      );
      return `
kintone.events.on('${categoryDef.eventKeyPrefix}.${fieldCode}', function(event) {
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
