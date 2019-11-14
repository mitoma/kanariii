import { KintoneBlock } from './KintoneBlock';
import * as Blockly from 'blockly';
import 'blockly/javascript';
import { Field } from '../schema/Field';

export class KintoneRecordSetVisibleBlock implements KintoneBlock {
  constructor(private fields: Field[]) {}
  blockName = 'kintone_app_record_set_visible';
  blockDefinition(): object {
    const fieldsDropdown = this.fields.map(f => {
      return [f.label, f.var];
    });
    return {
      init: function() {
        const jsonDefinition = {
          message0: '%{BKY_KINTONE_APP_RECORD_SET_VISIBLE_MSG}',
          args0: [
            {
              type: 'field_dropdown',
              name: 'field_code',
              options: fieldsDropdown,
            },
            {
              type: 'field_dropdown',
              name: 'visible',
              options: [
                ['%{BKY_KINTONE_APP_RECORD_SET_VISIBLE_FALSE_MSG}', 'false'],
                ['%{BKY_KINTONE_APP_RECORD_SET_VISIBLE_TRUE_MSG}', 'true'],
              ],
            },
          ],
          inputsInline: true,
          previousStatement: 'Action',
          nextStatement: 'Action',
          colour: '#9fa55b',
          tooltip: 'フィールドの表示/非表示を設定します',
          helpUrl: '',
        };
        this.jsonInit(jsonDefinition);
      },
    };
  }

  jsGenerator(): (block: Blockly.Block) => string {
    return function(block): string {
      var fieldCode = JSON.stringify(block.getFieldValue('field_code'));
      // disabled は文字列で "true", "false" が入っているので stringify 不要
      var visible = block.getFieldValue('visible');
      return `kintone.app.record.setFieldShown(${fieldCode}, ${visible});`;
    };
  }

  menuElement(): Element {
    let blockElement = document.createElement('block');
    blockElement.setAttribute('type', this.blockName);
    return blockElement;
  }
}
