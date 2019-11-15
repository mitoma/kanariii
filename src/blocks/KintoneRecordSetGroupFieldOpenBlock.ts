import { KintoneBlock } from './KintoneBlock';
import * as Blockly from 'blockly';
import 'blockly/javascript';
import { Field } from '../schema/Field';

export class KintoneRecordSetGroupFieldOpenBlock implements KintoneBlock {
  constructor(private fields: Field[]) {}
  blockName = 'kintone_app_record_set_group_field_open';
  blockDefinition(): object {
    const fieldsDropdown = this.fields
      .filter(f => {
        return f.type === 'GROUP';
      })
      .map(f => {
        return [f.label, f.var];
      });
    if (fieldsDropdown.length == 0) {
      fieldsDropdown.push(['No Group Field', 'UNKNOWN']);
    }
    return {
      init: function() {
        const jsonDefinition = {
          message0: '%{BKY_KINTONE_APP_RECORD_SET_GROUP_FIELD_OPEN_MSG}',
          args0: [
            {
              type: 'field_dropdown',
              name: 'field_code',
              options: fieldsDropdown,
            },
            {
              type: 'field_dropdown',
              name: 'open',
              options: [
                [
                  '%{BKY_KINTONE_APP_RECORD_SET_GROUP_FIELD_OPEN_TRUE_MSG}',
                  'true',
                ],
                [
                  '%{BKY_KINTONE_APP_RECORD_SET_GROUP_FIELD_OPEN_FALSE_MSG}',
                  'false',
                ],
              ],
            },
          ],
          inputsInline: true,
          previousStatement: 'Action',
          nextStatement: 'Action',
          colour: '#9fa55b',
          tooltip: 'グループフィールドの表示/非表示を設定します',
          helpUrl: '',
        };
        this.jsonInit(jsonDefinition);
      },
    };
  }

  jsGenerator(): (block: Blockly.Block) => string {
    return function(block): string {
      var fieldCode = JSON.stringify(block.getFieldValue('field_code'));
      // open は文字列で "true", "false" が入っているので stringify 不要
      var open = block.getFieldValue('open');
      return `kintone.app.record.setGroupFieldOpen(${fieldCode}, ${open});`;
    };
  }

  menuElement(): Element {
    let blockElement = document.createElement('block');
    blockElement.setAttribute('type', this.blockName);
    return blockElement;
  }
}
