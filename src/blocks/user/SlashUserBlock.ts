import { KintoneBlock } from '../KintoneBlock';
import * as Blockly from 'blockly';
import 'blockly/javascript';
import { BlockColors } from '../block-definition-util';

export class SlashUserBlock implements KintoneBlock {
  blockName = 'slash_user';
  /*
   */
  blockDefinition(): object {
    return {
      init: function() {
        this.appendDummyInput()
          .appendField('ユーザー情報')
          .appendField(
            new Blockly.FieldDropdown([
              ['ユーザーID', 'id'],
              ['ログイン名', 'code'],
              ['表示名', 'name'],
              ['E-mail', 'email'],
              ['URL', 'url'],
              ['従業員ID', 'employeeNumber'],
              ['電話番号', 'phone'],
              ['携帯', 'mobilePhone'],
              ['内線', 'extensionNumber'],
              ['タイムゾーン', 'timezone'],
              ['ゲストユーザーである', 'isGuest'],
              ['ユーザーの言語', 'language'],
            ]),
            'attribute',
          );
        this.setOutput(true, null);
        this.setInputsInline(false);
        this.setColour(BlockColors.SLASH);
        this.setTooltip('');
        this.setHelpUrl('');
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
