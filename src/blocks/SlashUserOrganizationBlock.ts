import { KintoneBlock } from './KintoneBlock';
import * as Blockly from 'blockly';
import 'blockly/javascript';
import { Organization } from '../client/SlashClient';
import { enableInEventBlock } from './block-definition-util';

export class SlashUserOrganizationBlock implements KintoneBlock {
  constructor(private organization: Organization[]) {}
  blockName = 'slash_user_organization_block';
  blockDefinition(): object {
    const organizationsDropdown = this.organization.map(o => {
      return [o.name, o.id];
    });
    return {
      init: function() {
        const block: Blockly.Block = this;

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
          tooltip: '%{BKY_SLASH_USER_ORGANIZATION_TOOLTIP}',
          helpUrl: '',
        };
        block.jsonInit(jsonDefinition);

        block.setOnChange(enableInEventBlock(block));
      },
    };
  }

  jsGenerator(): (block: Blockly.Block) => object[] {
    return function(block): object[] {
      const functionNamePlaceholder =
        // @ts-ignore
        Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_;
      // @ts-ignore
      const functionName = Blockly.JavaScript.provideFunction_(
        'loadOrganization',
        [
          `
          async function ${functionNamePlaceholder}() {
            return kintone.api(
              kintone.api.url('/v1/user/organizations.json', true),
              'GET',
              { code: kintone.getLoginUser().code }
            ).then((resp) => {
              const organizations = resp['organizationTitles'].map((ot) => {return ot['organization']['id']});
              return organizations;
            });
          }
          `,
        ],
      );
      var organization = JSON.stringify(block.getFieldValue('organization'));
      return [
        `(await ${functionName}()).includes(${organization})`,
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
