import { KintoneBlock } from '../KintoneBlock';
import * as Blockly from 'blockly';
import 'blockly/javascript';
import { BlockColors } from '../block-definition-util';

export class SlashUserBlock implements KintoneBlock {
  blockName = 'slash_user';
  blockDefinition(): object {
    return {
      init: function() {
        const block: Blockly.Block = this;

        const jsonDefinition = {
          message0: '%{BKY_SLASH_USER_MSG}',
          colour: BlockColors.SLASH,
          tooltip: '%{BKY_SLASH_USER_TOOLTIP}',
          helpUrl: '',
          output: null,
          args0: [
            {
              type: 'field_dropdown',
              name: 'attribute',
              options: [
                ['%{BKY_SLASH_USER_ATTR_ID}', 'id'],
                ['%{BKY_SLASH_USER_ATTR_CODE}', 'code'],
                ['%{BKY_SLASH_USER_ATTR_NAME}', 'name'],
                ['%{BKY_SLASH_USER_ATTR_EMAIL}', 'email'],
                ['%{BKY_SLASH_USER_ATTR_URL}', 'url'],
                ['%{BKY_SLASH_USER_ATTR_EMPLOYEE_NUMBER}', 'employeeNumber'],
                ['%{BKY_SLASH_USER_ATTR_PHONE}', 'phone'],
                ['%{BKY_SLASH_USER_ATTR_MOBILE_PHONE}', 'mobilePhone'],
                ['%{BKY_SLASH_USER_ATTR_EXTENSION_NUMBER}', 'extensionNumber'],
                ['%{BKY_SLASH_USER_ATTR_TIMEZONE}', 'timezone'],
                ['%{BKY_SLASH_USER_ATTR_IS_GUEST}', 'isGuest'],
                ['%{BKY_SLASH_USER_ATTR_LANGUAGE}', 'language'],
              ],
            },
          ],
        };
        block.jsonInit(jsonDefinition);
      },
    };
  }

  jsGenerator(): (block: Blockly.Block) => object[] {
    return function(block): object[] {
      const attribute = JSON.stringify(block.getFieldValue('attribute'));
      return [
        `kintone.getLoginUser()[${attribute}]`,
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
