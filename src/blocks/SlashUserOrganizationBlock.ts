import { KintoneBlock } from './KintoneBlock';
import * as Blockly from 'blockly';
import 'blockly/javascript';
import { Organization } from '../client/SlashClient';

export class SlashUserOrganizationBlock implements KintoneBlock {
  constructor(private organization: Organization[]) {}
  blockName = 'slash_user_organization_block';
  blockDefinition(): object {
    const organizationsDropdown = this.organization.map(o => {
      return [o.name, o.id];
    });
    return {
      init: function() {
        const jsonDefinition = {
          message0: '%{BKY_SLASH_USER_ORGANIZATION_MSG}',
          args0: [
            {
              type: 'field_dropdown',
              name: 'organization',
              options: organizationsDropdown,
            },
          ],
          inputsInline: true,
          output: 'Boolean',
          colour: '#9fa55b',
          tooltip: 'ユーザーが組織に所属するかどうかを返します',
          helpUrl: '',
        };
        this.jsonInit(jsonDefinition);
      },
    };
  }

  jsGenerator(): (block: Blockly.Block) => object[] {
    return function(block): object[] {
      var organization = JSON.stringify(block.getFieldValue('organization'));
      return [
        `userOrganizationIds.includes(${organization})`,
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
