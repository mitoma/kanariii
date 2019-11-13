import { KintoneBlock } from './KintoneBlock';
import * as Blockly from 'blockly';
import 'blockly/javascript';
import { Field } from '../schema/Field';

export class KintoneRecordGetIdBlock implements KintoneBlock {
  blockName: string = 'kintone_app_record_get_id';

  blockDefinition(): object {
    return {
      init: function() {
        this.appendDummyInput().appendField('レコードID');
        this.setOutput(true, null);
        this.setColour('#9fa55b');
        this.setTooltip('');
        this.setHelpUrl('');
      },
    };
  }

  jsGenerator(): (block: Blockly.Block) => any {
    return function(block: Blockly.Block): object[] {
      // @ts-ignore
      return ['kintone.app.record.getId()', Blockly.JavaScript.ORDER_ATOMIC];
    };
  }

  menuElement(): Element {
    let blockElement = document.createElement('block');
    blockElement.setAttribute('type', this.blockName);
    return blockElement;
  }
}

export class KintoneRecordGetBlock implements KintoneBlock {
  constructor(private fields: Field[]) {}

  blockName: string = 'kintone_app_record_get';

  blockDefinition(): object {
    const labelVarPair = this.fields.map(f => {
      return [f.label, f.var];
    });

    return {
      init: function() {
        this.appendDummyInput()
          .appendField('フィールド値')
          .appendField(new Blockly.FieldDropdown(labelVarPair), 'field_code');

        this.setOutput(true, null);
        this.setColour('#9fa55b');
        this.setTooltip('');
        this.setHelpUrl('');
      },
    };
  }

  jsGenerator(): (block: Blockly.Block) => any {
    return function(block: Blockly.Block): object[] {
      var field_code = block.getFieldValue('field_code');
      return [
        `event.record[${JSON.stringify(field_code)}].value`,
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

export class KintoneRecordGetFieldElementBlock implements KintoneBlock {
  constructor(private fields: Field[]) {}

  blockName: string = 'kintone_app_record_get_field_element';

  blockDefinition(): object {
    const labelVarPair = this.fields.map(f => {
      return [f.label, f.var];
    });

    return {
      init: function() {
        this.appendDummyInput()
          .appendField('フィールドエレメント')
          .appendField(new Blockly.FieldDropdown(labelVarPair), 'field_code');

        this.setOutput(true, null);
        this.setColour('#9fa55b');
        this.setTooltip('');
        this.setHelpUrl('');
      },
    };
  }

  jsGenerator(): (block: Blockly.Block) => any {
    return function(block: Blockly.Block): object[] {
      var field_code = JSON.stringify(block.getFieldValue('field_code'));
      return [
        `kintone.app.record.getFieldElement(${field_code})`,
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

export class KintoneRecordSetValueBlock implements KintoneBlock {
  constructor(private fields: Field[]) {}
  blockName = 'kintone_app_record_set_value';
  blockDefinition(): object {
    const labelVarPair = this.fields.map(f => {
      return [f.label, f.var];
    });
    return {
      init: function() {
        this.appendValueInput('TEXT')
          .setCheck(null)
          .appendField('フィールド値セット')
          .appendField(new Blockly.FieldDropdown(labelVarPair), 'field_code');
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#9fa55b');
        this.setTooltip('フィールドの値をセットします');
        this.setHelpUrl('');
      },
    };
  }

  jsGenerator(): (block: Blockly.Block) => string {
    return function(block): string {
      var field_code = JSON.stringify(block.getFieldValue('field_code'));
      const inputValue =
        // @ts-ignore
        Blockly.JavaScript.valueToCode(
          block,
          'TEXT',
          // @ts-ignore
          Blockly.JavaScript.ORDER_ATOMIC,
        );
      return `event['record'][${field_code}]['value'] = ${inputValue};`;
    };
  }

  menuElement(): Element {
    let blockElement = document.createElement('block');
    blockElement.setAttribute('type', this.blockName);
    return blockElement;
  }
}

export class KintoneRecordSetErrorBlock implements KintoneBlock {
  constructor(private fields: Field[]) {}
  blockName = 'kintone_app_record_set_error';
  blockDefinition(): object {
    const labelVarPair = this.fields.map(f => {
      return [f.label, f.var];
    });
    return {
      init: function() {
        this.appendValueInput('TEXT')
          .setCheck(null)
          .appendField('フィールドエラーセット')
          .appendField(new Blockly.FieldDropdown(labelVarPair), 'field_code');
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#9fa55b');
        this.setTooltip('フィールドのエラー設定します');
        this.setHelpUrl('');
      },
    };
  }

  jsGenerator(): (block: Blockly.Block) => string {
    return function(block): string {
      var field_code = JSON.stringify(block.getFieldValue('field_code'));
      const inputValue =
        // @ts-ignore
        Blockly.JavaScript.valueToCode(
          block,
          'TEXT',
          // @ts-ignore
          Blockly.JavaScript.ORDER_ATOMIC,
        );
      return `event['record'][${field_code}]['error'] = ${inputValue};`;
    };
  }

  menuElement(): Element {
    let blockElement = document.createElement('block');
    blockElement.setAttribute('type', this.blockName);
    return blockElement;
  }
}

export class KintoneRecordSetDisabledBlock implements KintoneBlock {
  constructor(private fields: Field[]) {}
  blockName = 'kintone_app_record_set_disabled';
  blockDefinition(): object {
    const labelVarPair = this.fields.map(f => {
      return [f.label, f.var];
    });
    const disabledDropdown = [
      ['編集可', 'false'],
      ['編集不可', 'true'],
    ];
    return {
      init: function() {
        this.appendDummyInput()
          .appendField('フィールド編集可/不可')
          .appendField(new Blockly.FieldDropdown(labelVarPair), 'field_code')
          .appendField(new Blockly.FieldDropdown(disabledDropdown), 'disabled');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#9fa55b');
        this.setTooltip('フィールドの編集可/不可を設定します');
        this.setHelpUrl('');
      },
    };
  }

  jsGenerator(): (block: Blockly.Block) => string {
    return function(block): string {
      var field_code = JSON.stringify(block.getFieldValue('field_code'));
      // disabled は文字列で "true", "false" が入っているので stringify 不要
      var disabled = block.getFieldValue('disabled');
      return `event['record'][${field_code}]['disabled'] = ${disabled};`;
    };
  }

  menuElement(): Element {
    let blockElement = document.createElement('block');
    blockElement.setAttribute('type', this.blockName);
    return blockElement;
  }
}
