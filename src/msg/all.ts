import JA from 'blockly/msg/ja.js';
import EN from 'blockly/msg/en.js';
import * as Blockly from 'blockly';

// prettier-ignore
export function loadJaLocale() {
  JA['KINTONE_APP_RECORD_SET_VALUE_MSG'] = '%1 の値に %2 をセット';
  JA['KINTONE_APP_RECORD_SET_ERROR_MSG'] = '%1 のエラーメッセージに %2 をセット';
  Blockly.setLocale(JA);
}

// prettier-ignore
export function loadEnLocale() {
  EN['KINTONE_APP_RECORD_SET_VALUE_MSG'] = 'set %1 to %2';
  EN['KINTONE_APP_RECORD_SET_ERROR_MSG'] = 'set error of %1 to %2';
  Blockly.setLocale(EN);
}
