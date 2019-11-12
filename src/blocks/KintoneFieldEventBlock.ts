import { KintoneBlock } from './KintoneBlock';
import * as Blockly from 'blockly';
import 'blockly/javascript';
import { Field } from '../schema/Field';
import { KintoneEventBlockCategoryDef } from './KintoneEventBlock';

export class KintoneEventFieldBlock implements KintoneBlock {
  blockName: string;

  constructor(
    private categoryDef: KintoneEventBlockCategoryDef,
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
        this.appendDummyInput()
          .appendField(
            new Blockly.FieldDropdown(
              categoryDef.details.map(detail => {
                return [detail.eventLabel, detail.eventKey];
              }),
            ),
            'event_type',
          )
          .appendField(
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
    return function(block): string {
      const event_type = block.getFieldValue('event_type');
      const field_code = block.getFieldValue('field_code');
      // @ts-ignore
      const event_callback = Blockly.JavaScript.statementToCode(
        block,
        'event_callback',
      );
      return `
kintone.events.on('${event_type}.${field_code}', function(event) {
${event_callback}
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
