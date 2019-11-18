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
  JA['KINTONE_APP_RECORD_SET_VISIBLE_MSG'] = '%1 を %2';
  JA['KINTONE_APP_RECORD_SET_VISIBLE_TRUE_MSG'] = '表示する';
  JA['KINTONE_APP_RECORD_SET_VISIBLE_FALSE_MSG'] = '非表示にする';
  JA['KINTONE_APP_RECORD_SET_GROUP_FIELD_OPEN_MSG'] = '%1 を %2';
  JA['KINTONE_APP_RECORD_SET_GROUP_FIELD_OPEN_TRUE_MSG'] = '開く';
  JA['KINTONE_APP_RECORD_SET_GROUP_FIELD_OPEN_FALSE_MSG'] = '閉じる';
  JA['SLASH_USER_ORGANIZATION_MSG'] = 'ログインユーザーが組織 %1 に所属する';
  JA['SLASH_USER_ORGANIZATION_TOOLTIP'] = 'ユーザーが組織に所属するかどうかを返します';
  JA['SLASH_USER_GROUP_MSG'] = 'ログインユーザーがグループ %1 に所属する';
  JA['SLASH_USER_GROUP_TOOLTIP'] = 'ユーザーが組織に所属するかどうかを返します';
  JA['CONSOLE_LOG_MSG'] = 'ログ出力 %1';
  JA['CONSOLE_LOG_TOOLTIP'] = 'console.log でログを出力します';

  Blockly.setLocale(JA);
}

// prettier-ignore
export function loadEnLocale() {
  EN['KINTONE_APP_RECORD_SET_VALUE_MSG'] = 'set %1 to %2';
  EN['KINTONE_APP_RECORD_SET_ERROR_MSG'] = 'set error of %1 to %2';
  EN['KINTONE_APP_RECORD_SET_DISABLED_MSG'] = 'set %1 to %2';
  EN['KINTONE_APP_RECORD_SET_DISABLED_FALSE_MSG'] = 'enabled';
  EN['KINTONE_APP_RECORD_SET_DISABLED_TRUE_MSG'] = 'disabled';
  EN['KINTONE_APP_RECORD_SET_VISIBLE_MSG'] = 'set %1 to %2';
  EN['KINTONE_APP_RECORD_SET_VISIBLE_TRUE_MSG'] = 'visible';
  EN['KINTONE_APP_RECORD_SET_VISIBLE_FALSE_MSG'] = 'invisible';
  EN['KINTONE_APP_RECORD_SET_GROUP_FIELD_OPEN_MSG'] = '%2 %1';
  EN['KINTONE_APP_RECORD_SET_GROUP_FIELD_OPEN_TRUE_MSG'] = 'open';
  EN['KINTONE_APP_RECORD_SET_GROUP_FIELD_OPEN_FALSE_MSG'] = 'close';
  EN['SLASH_USER_ORGANIZATION_MSG'] = 'login user in organization of %1';
  EN['SLASH_USER_ORGANIZATION_TOOLTIP'] = 'returns whether the logged-in user belongs to the selected organization';
  EN['SLASH_USER_GROUP_MSG'] = 'login user in group of %1';
  EN['SLASH_USER_GROUP_TOOLTIP'] = 'returns whether the logged-in user belongs to the selected group';
  EN['CONSOLE_LOG_MSG'] = 'logger %1';
  EN['CONSOLE_LOG_TOOLTIP'] = 'write log with console.log';

  Blockly.setLocale(EN);
}
