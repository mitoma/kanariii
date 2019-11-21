export type Field = {
  label: string;
  type: FieldType;
  code: string;
};

export type FieldType =
  | 'SINGLE_LINE_TEXT'
  | 'MULTI_LINE_TEXT'
  | 'RICH_TEXT'
  | 'NUMBER'
  | 'CALC'
  | 'RADIO_BUTTON'
  | 'CHECK_BOX'
  | 'MULTI_SELECT'
  | 'DROP_DOWN'
  | 'DATE'
  | 'TIME'
  | 'DATETIME'
  | 'FILE'
  | 'LINK'
  | 'USER_SELECT'
  | 'ORGANIZATION_SELECT'
  | 'GROUP_SELECT'
  | 'REFERENCE_TABLE'
  | 'SPACER'
  | 'GROUP'
  | 'SUBTABLE'
  | 'RECORD_NUMBER'
  | 'CREATOR'
  | 'CREATED_TIME'
  | 'MODIFIER'
  | 'UPDATED_TIME';

export const UNSUPPORTED_FIELD_TYPES: FieldType[] = ['SUBTABLE'];

export const ALL_FIELD_TYPES: FieldType[] = [
  'SINGLE_LINE_TEXT',
  'MULTI_LINE_TEXT',
  'RICH_TEXT',
  'NUMBER',
  'CALC',
  'RADIO_BUTTON',
  'CHECK_BOX',
  'MULTI_SELECT',
  'DROP_DOWN',
  'DATE',
  'TIME',
  'DATETIME',
  'FILE',
  'LINK',
  'USER_SELECT',
  'ORGANIZATION_SELECT',
  'GROUP_SELECT',
  'REFERENCE_TABLE',
  'SPACER',
  'GROUP',
  'SUBTABLE',
  'RECORD_NUMBER',
  'CREATOR',
  'CREATED_TIME',
  'MODIFIER',
  'UPDATED_TIME',
];
