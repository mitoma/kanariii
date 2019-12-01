import JA from 'blockly/msg/ja.js';
import EN from 'blockly/msg/en.js';
import * as Blockly from 'blockly';

// prettier-ignore
export function loadJaLocale() {
  JA['CONSOLE_LOG_MSG'] = 'ログ出力 %1';
  JA['CONSOLE_LOG_TOOLTIP'] = 'console.log でログを出力します';
  JA['DEBUGGER_MSG'] = 'デバッガー';
  JA['DEBUGGER_TOOLTIP'] = 'debugger を立ち上げます';

  JA['SLASH_USER_MSG'] = 'ユーザー情報 %1';
  JA['SLASH_USER_TOOLTIP'] = 'ログインユーザーの情報を返します';
  JA['SLASH_USER_ATTR_ID'] = 'ユーザーID';
  JA['SLASH_USER_ATTR_CODE'] = 'ログイン名';
  JA['SLASH_USER_ATTR_NAME'] = '表示名';
  JA['SLASH_USER_ATTR_EMAIL'] = 'E-mail';
  JA['SLASH_USER_ATTR_URL'] = 'URL';
  JA['SLASH_USER_ATTR_EMPLOYEE_NUMBER'] = '従業員ID';
  JA['SLASH_USER_ATTR_PHONE'] = '電話番号';
  JA['SLASH_USER_ATTR_MOBILE_PHONE'] = '携帯';
  JA['SLASH_USER_ATTR_EXTENSION_NUMBER'] = '内線';
  JA['SLASH_USER_ATTR_TIMEZONE'] = 'タイムゾーン';
  JA['SLASH_USER_ATTR_IS_GUEST'] = 'ゲストユーザーである';
  JA['SLASH_USER_ATTR_LANGUAGE'] = 'ユーザーの言語';
  JA['SLASH_USER_ORGANIZATION_MSG'] = 'ログインユーザーが組織 %1 に所属している';
  JA['SLASH_USER_ORGANIZATION_TOOLTIP'] = 'ユーザーが組織に所属しているかどうかを返します';
  JA['SLASH_USER_GROUP_MSG'] = 'ログインユーザーがグループ %1 に所属している';
  JA['SLASH_USER_GROUP_TOOLTIP'] = 'ユーザーが組織に所属しているかどうかを返します';

  JA['KINTONE_EVENT_APP_RECORD_INDEX'] = 'レコード一覧 %1';
  JA['KINTONE_EVENT_APP_RECORD_INDEX_FIELD'] = '(インライン編集フィールド値変更)';
  JA['KINTONE_EVENT_APP_RECORD_INDEX_SHOW'] = '表示';
  JA['KINTONE_EVENT_APP_RECORD_INDEX_EDIT_SHOW'] = 'インライン編集開始';
  JA['KINTONE_EVENT_APP_RECORD_INDEX_EDIT_SUBMIT'] = 'インライン編集の保存実行前';
  JA['KINTONE_EVENT_APP_RECORD_INDEX_EDIT_SUBMIT_SUCCESS'] = 'インライン編集の保存成功後';
  JA['KINTONE_EVENT_APP_RECORD_INDEX_DELETE_SUBMIT'] = 'レコード削除前';
  JA['KINTONE_EVENT_APP_RECORD_DETAIL'] = 'レコード詳細画面 %1';
  JA['KINTONE_EVENT_APP_RECORD_DETAIL_SHOW'] = '表示';
  JA['KINTONE_EVENT_APP_RECORD_DETAIL_DELETE_SUBMIT'] = '削除前';
  JA['KINTONE_EVENT_APP_RECORD_DETAIL_PROCESS_PROCEED'] = 'プロセス管理のアクション実行';

  JA['KINTONE_APP_RECORD_GET_FIELD_ELEMENT_MSG'] = 'フィールドエレメント %1';
  JA['KINTONE_APP_RECORD_GET_FIELD_ELEMENT_TOOLTIP'] = 'フィールドエレメントを取得します';
  JA['KINTONE_APP_RECORD_GET_FIELD_VALUE_MSG'] = 'フィールド値 %1';
  JA['KINTONE_APP_RECORD_GET_FIELD_VALUE_TOOLTIP'] = 'フィールド値を取得します';
  JA['KINTONE_APP_RECORD_GET_ID_MSG'] = 'レコードID';
  JA['KINTONE_APP_RECORD_GET_ID_TOOLTIP'] = 'レコードIDを取得します';
  JA['KINTONE_APP_RECORD_GET_EVENT_MSG'] = 'レコードイベント';
  JA['KINTONE_APP_RECORD_GET_EVENT_TOOLTIP'] = '関数の引数にレコードイベントを渡すためのオブジェクト';
  JA['KINTONE_APP_RECORD_SET_VALUE_MSG'] = '%1 の値に %2 をセット';
  JA['KINTONE_APP_RECORD_SET_VALUE_TOOLTIP'] = 'フィールドに値をセットします';
  JA['KINTONE_APP_RECORD_SET_ERROR_MSG'] = '%1 のエラーメッセージに %2 をセット';
  JA['KINTONE_APP_RECORD_SET_ERROR_TOOLTIP'] = 'フィールドにエラーメッセージをセットします';
  JA['KINTONE_APP_RECORD_SET_DISABLED_MSG'] = '%1 を %2 にする';
  JA['KINTONE_APP_RECORD_SET_DISABLED_FALSE_MSG'] = '編集可能';
  JA['KINTONE_APP_RECORD_SET_DISABLED_TRUE_MSG'] = '編集禁止';
  JA['KINTONE_APP_RECORD_SET_DISABLED_TOOLTIP'] = 'フィールドの編集可/不可を設定します';
  JA['KINTONE_APP_RECORD_SET_VISIBLE_MSG'] = '%1 を %2';
  JA['KINTONE_APP_RECORD_SET_VISIBLE_TRUE_MSG'] = '表示する';
  JA['KINTONE_APP_RECORD_SET_VISIBLE_FALSE_MSG'] = '非表示にする';
  JA['KINTONE_APP_RECORD_SET_VISIBLE_TOOLTIP'] = 'フィールドの表示/非表示を設定します';
  JA['KINTONE_APP_RECORD_SET_GROUP_FIELD_OPEN_MSG'] = '%1 を %2';
  JA['KINTONE_APP_RECORD_SET_GROUP_FIELD_OPEN_TRUE_MSG'] = '開く';
  JA['KINTONE_APP_RECORD_SET_GROUP_FIELD_OPEN_FALSE_MSG'] = '閉じる';
  JA['KINTONE_APP_RECORD_SET_GROUP_FIELD_OPEN_TOOLTIP'] = 'グループフィールドの表示/非表示を設定します';

  Blockly.setLocale(JA);
}

// prettier-ignore
export function loadEnLocale() {
  EN['CONSOLE_LOG_MSG'] = 'logger %1';
  EN['CONSOLE_LOG_TOOLTIP'] = 'write log with console.log';
  EN['DEBUGGER_MSG'] = 'debugger';
  EN['DEBUGGER_TOOLTIP'] = 'open debugger';

  EN['SLASH_USER_MSG'] = 'user info %1';
  EN['SLASH_USER_TOOLTIP'] = 'return login user attribute';
  EN['SLASH_USER_ATTR_ID'] = 'User ID';
  EN['SLASH_USER_ATTR_CODE'] = 'Login code';
  EN['SLASH_USER_ATTR_NAME'] = 'Name';
  EN['SLASH_USER_ATTR_EMAIL'] = 'E-mail';
  EN['SLASH_USER_ATTR_URL'] = 'URL';
  EN['SLASH_USER_ATTR_EMPLOYEE_NUMBER'] = 'Employee number';
  EN['SLASH_USER_ATTR_PHONE'] = 'Phone';
  EN['SLASH_USER_ATTR_MOBILE_PHONE'] = 'Mobile phone';
  EN['SLASH_USER_ATTR_EXTENSION_NUMBER'] = 'Extension number';
  EN['SLASH_USER_ATTR_TIMEZONE'] = 'Timezone';
  EN['SLASH_USER_ATTR_IS_GUEST'] = 'Is guest user';
  EN['SLASH_USER_ATTR_LANGUAGE'] = 'Language';
  EN['SLASH_USER_ORGANIZATION_MSG'] = 'login user in organization of %1';
  EN['SLASH_USER_ORGANIZATION_TOOLTIP'] = 'returns whether the logged-in user belongs to the selected organization';
  EN['SLASH_USER_GROUP_MSG'] = 'login user in group of %1';
  EN['SLASH_USER_GROUP_TOOLTIP'] = 'returns whether the logged-in user belongs to the selected group';

  EN['KINTONE_EVENT_APP_RECORD_INDEX'] = 'record index %1';
  EN['KINTONE_EVENT_APP_RECORD_INDEX_SHOW'] = 'show';
  EN['KINTONE_EVENT_APP_RECORD_INDEX_EDIT_SHOW'] = 'edit inline';
  EN['KINTONE_EVENT_APP_RECORD_INDEX_EDIT_SUBMIT'] = 'before save inline';
  EN['KINTONE_EVENT_APP_RECORD_INDEX_EDIT_SUBMIT_SUCCESS'] = 'after save inline';
  EN['KINTONE_EVENT_APP_RECORD_INDEX_DELETE_SUBMIT'] = 'before delete record';
  EN['KINTONE_EVENT_APP_RECORD_INDEX_FIELD'] = 'record index';
  EN['KINTONE_EVENT_APP_RECORD_INDEX_FIELD_SUB'] = 'change event by field value';
  EN['KINTONE_EVENT_APP_RECORD_DETAIL'] = 'record detail %1';
  EN['KINTONE_EVENT_APP_RECORD_DETAIL_SHOW'] = 'show';
  EN['KINTONE_EVENT_APP_RECORD_DETAIL_DELETE_SUBMIT'] = 'before delete record';
  EN['KINTONE_EVENT_APP_RECORD_DETAIL_PROCESS_PROCEED'] = 'before process proceed';

  EN['KINTONE_APP_RECORD_GET_FIELD_ELEMENT_MSG'] = 'field element %1';
  EN['KINTONE_APP_RECORD_GET_FIELD_ELEMENT_TOOLTIP'] = 'get field element';
  EN['KINTONE_APP_RECORD_GET_FIELD_VALUE_MSG'] = 'field value %1';
  EN['KINTONE_APP_RECORD_GET_FIELD_VALUE_TOOLTIP'] = 'get field value';
  EN['KINTONE_APP_RECORD_GET_ID_MSG'] = 'record id';
  EN['KINTONE_APP_RECORD_GET_ID_TOOLTIP'] = 'get record id';
  EN['KINTONE_APP_RECORD_GET_EVENT_MSG'] = 'record event';
  EN['KINTONE_APP_RECORD_GET_EVENT_TOOLTIP'] = 'record event for function args';
  EN['KINTONE_APP_RECORD_SET_VALUE_MSG'] = 'set %1 to %2';
  EN['KINTONE_APP_RECORD_SET_VALUE_TOOLTIP'] = 'set to field value';
  EN['KINTONE_APP_RECORD_SET_ERROR_MSG'] = 'set error of %1 to %2';
  EN['KINTONE_APP_RECORD_SET_ERROR_TOOLTIP'] = 'set to field error message';
  EN['KINTONE_APP_RECORD_SET_DISABLED_MSG'] = 'set %1 to %2';
  EN['KINTONE_APP_RECORD_SET_DISABLED_FALSE_MSG'] = 'enabled';
  EN['KINTONE_APP_RECORD_SET_DISABLED_TRUE_MSG'] = 'disabled';
  EN['KINTONE_APP_RECORD_SET_DISABLED_TOOLTIP'] = 'set field to editable';
  EN['KINTONE_APP_RECORD_SET_VISIBLE_MSG'] = 'set %1 to %2';
  EN['KINTONE_APP_RECORD_SET_VISIBLE_TRUE_MSG'] = 'visible';
  EN['KINTONE_APP_RECORD_SET_VISIBLE_FALSE_MSG'] = 'invisible';
  EN['KINTONE_APP_RECORD_SET_VISIBLE_TOOLTIP'] = 'set field to visible';
  EN['KINTONE_APP_RECORD_SET_GROUP_FIELD_OPEN_MSG'] = '%2 %1';
  EN['KINTONE_APP_RECORD_SET_GROUP_FIELD_OPEN_TRUE_MSG'] = 'open';
  EN['KINTONE_APP_RECORD_SET_GROUP_FIELD_OPEN_FALSE_MSG'] = 'close';
  EN['KINTONE_APP_RECORD_SET_GROUP_FIELD_OPEN_TOOLTIP'] = 'set group to open/close';

  Blockly.setLocale(EN);
}
