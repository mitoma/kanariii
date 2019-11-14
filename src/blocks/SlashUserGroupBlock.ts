import { KintoneBlock } from './KintoneBlock';
import * as Blockly from 'blockly';
import 'blockly/javascript';
import { Group } from '../client/SlashClient';

export class SlashUserGroupBlock implements KintoneBlock {
  constructor(private groups: Group[]) {}
  blockName = 'slash_user_group_block';
  blockDefinition(): object {
    const groupsDropdown = this.groups.map(o => {
      return [o.name, o.id];
    });
    return {
      init: function() {
        const jsonDefinition = {
          message0: '%{BKY_SLASH_USER_GROUP_MSG}',
          args0: [
            {
              type: 'field_dropdown',
              name: 'group',
              options: groupsDropdown,
            },
          ],
          inputsInline: true,
          output: 'Boolean',
          colour: '#9fa55b',
          tooltip: 'ユーザーがグループに所属するかどうかを返します',
          helpUrl: '',
        };
        this.jsonInit(jsonDefinition);
      },
    };
  }

  jsGenerator(): (block: Blockly.Block) => object[] {
    return function(block): object[] {
      var group = JSON.stringify(block.getFieldValue('group'));
      return [
        `userGroupIds.includes(${group})`,
        // @ts-ignore
        Blockly.JavaScript.ORDER_ATOMIC,
      ];
    };
  }

  menuElement(): Element {
    let blockElement = document.createElement('block');
    blockElement.setAttribute('type', this.blockName);
    return blockElement;
  }
}
