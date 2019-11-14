import JA from 'blockly/msg/ja.js';
import EN from 'blockly/msg/en.js';
import * as Blockly from 'blockly';

// prettier-ignore
export function loadJaLocale() {
  JA['KINTONE_APP_RECORD_SET_VALUE_MSG'] = '%1 の値に %2 をセット';
  JA['KINTONE_APP_RECORD_SET_ERROR_MSG'] = '%1 のエラーメッセージに %2 をセット';
  JA['KINTONE_APP_RECORD_SET_DISABLED_MSG'] = '%1 を %2 にする';
  JA['KINTONE_APP_RECORD_SET_DISABLED_FALSE_MSG'] = '編集可能';
  JA['KINTONE_APP_RECORD_SET_DISABLED_TRUE_MSG'] = '編集禁止';
  Blockly.setLocale(JA);
}

// prettier-ignore
export function loadEnLocale() {
  EN['KINTONE_APP_RECORD_SET_VALUE_MSG'] = 'set %1 to %2';
  EN['KINTONE_APP_RECORD_SET_ERROR_MSG'] = 'set error of %1 to %2';
  EN['KINTONE_APP_RECORD_SET_DISABLED_MSG'] = 'set %1 to %2';
  EN['KINTONE_APP_RECORD_SET_DISABLED_FALSE_MSG'] = 'enabled';
  EN['KINTONE_APP_RECORD_SET_DISABLED_TRUE_MSG'] = 'disabled';
  Blockly.setLocale(EN);
}
