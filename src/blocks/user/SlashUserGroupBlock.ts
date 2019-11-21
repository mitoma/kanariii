import { KintoneBlock } from '../KintoneBlock';
import * as Blockly from 'blockly';
import 'blockly/javascript';
import { Group } from '../../client/SlashClient';
import { BlockColors, enableInAsyncEventBlock } from '../block-definition-util';

export class SlashUserGroupBlock implements KintoneBlock {
  constructor(private groups: Group[]) {}
  blockName = 'slash_user_group_block';
  blockDefinition(): object {
    const groupsDropdown = this.groups.map(o => {
      return [o.name, o.id];
    });
    let enable = groupsDropdown.length != 0;
    if (!enable) {
      groupsDropdown.push(['No Group', 'UNKNOWN']);
    }
    return {
      init: function() {
        const block: Blockly.Block = this;

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
          colour: BlockColors.SLASH,
          tooltip: '%{BKY_SLASH_USER_ORGANIZATION_TOOLTIP}',
          helpUrl: '',
        };
        block.jsonInit(jsonDefinition);

        block.setEnabled(enable);
        enableInAsyncEventBlock(block);
      },
    };
  }

  jsGenerator(): (block: Blockly.Block) => object[] {
    return function(block): object[] {
      const functionNamePlaceholder =
        // @ts-ignore
        Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_;
      // @ts-ignore
      const functionName = Blockly.JavaScript.provideFunction_('loadGroup', [
        `
          async function ${functionNamePlaceholder}() {
            return kintone.api(
              kintone.api.url('/v1/user/groups.json', true),
              'GET',
              { code: kintone.getLoginUser().code }
            ).then((resp) => {
              const groups = resp['groups'].map((g) => {return g['id'];});
              return groups;
            });
          }
          `,
      ]);
      var group = JSON.stringify(block.getFieldValue('group'));
      return [
        `(await ${functionName}()).includes(${group})`,
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
