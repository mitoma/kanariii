import { KintoneBlock } from './KintoneBlock';
import { ConsoleLogBlock } from './debug/ConsoleLogBlock';
import { Field } from '../schema/Field';
import { DebuggerBlock } from './debug/DebuggerBlock';
import {
  KintoneEventBlockCategoryDef,
  KintoneEventBlock,
} from './event/KintoneEventBlock';
import {
  KintoneEventFieldBlock,
  KintoneFieldEventBlockCategoryDef,
} from './event/KintoneFieldEventBlock';
import { KintoneRecordGetIdBlock } from './record/KintoneRecordGetIdBlock';
import { KintoneRecordGetFieldValueBlock } from './record/KintoneRecordGetFieldValueBlock';
import { KintoneRecordGetFieldElementBlock } from './record/KintoneRecordGetFieldElementBlock';
import { KintoneRecordSetValueBlock } from './record/KintoneRecordSetValueBlock';
import { KintoneRecordSetErrorBlock } from './record/KintoneRecordSetErrorBlock';
import { KintoneRecordSetDisabledBlock } from './record/KintoneRecordSetDisabledBlock';
import { KintoneRecordGetEventBlock } from './KintoneRecordGetEventBlock';
import { KintoneRecordSetVisibleBlock } from './record/KintoneRecordSetVisibleBlock';
import { KintoneRecordSetGroupFieldOpenBlock } from './record/KintoneRecordSetGroupFieldOpenBlock';
import { OrganizationsAndGroups } from '../client/SlashClient';
import { SlashUserBlock } from './user/SlashUserBlock';
import { SlashUserOrganizationBlock } from './user/SlashUserOrganizationBlock';
import { SlashUserGroupBlock } from './user/SlashUserGroupBlock';
import { BlockColors } from './block-definition-util';
import Blockly from 'blockly';

// イベントの定義
// https://developer.cybozu.io/hc/ja/articles/360000361686

// レコード一覧
const appRecordIndexDef: KintoneEventBlockCategoryDef = {
  blockLabel: '%{BKY_KINTONE_EVENT_APP_RECORD_INDEX}',
  blockName: 'kintone_event_app_record_index',
  details: [
    {
      eventLabel: '%{BKY_KINTONE_EVENT_APP_RECORD_INDEX_SHOW}',
      eventKey: 'app.record.index.show',
    },
    {
      eventLabel: '%{BKY_KINTONE_EVENT_APP_RECORD_INDEX_EDIT_SHOW}',
      eventKey: 'app.record.index.edit.show',
    },
    {
      eventLabel: '%{BKY_KINTONE_EVENT_APP_RECORD_INDEX_EDIT_SUBMIT}',
      eventKey: 'app.record.index.edit.submit',
    },
    {
      eventLabel: '%{BKY_KINTONE_EVENT_APP_RECORD_INDEX_EDIT_SUBMIT_SUCCESS}',
      eventKey: 'app.record.index.edit.submit.success',
    },
    {
      eventLabel: '%{BKY_KINTONE_EVENT_APP_RECORD_INDEX_DELETE_SUBMIT}',
      eventKey: 'app.record.index.delete.submit',
    },
  ],
};

const appRecordIndexFieldDef: KintoneFieldEventBlockCategoryDef = {
  blockLabel: '%{BKY_KINTONE_EVENT_APP_RECORD_INDEX_FIELD}',
  blockLabelSub: '%{BKY_KINTONE_EVENT_APP_RECORD_INDEX_FIELD_SUB}',
  blockName: 'kintone_event_app_record_index_field',
  eventKeyPrefix: 'app.record.index.edit.change',
};

// レコード詳細画面
const appRecordDetailDef: KintoneEventBlockCategoryDef = {
  blockLabel: '%{BKY_KINTONE_EVENT_APP_RECORD_DETAIL}',
  blockName: 'kintone_event_app_record_detail',
  details: [
    {
      eventLabel: '%{BKY_KINTONE_EVENT_APP_RECORD_DETAIL_SHOW}',
      eventKey: 'app.record.detail.show',
    },
    {
      eventLabel: '%{BKY_KINTONE_EVENT_APP_RECORD_DETAIL_DELETE_SUBMIT}',
      eventKey: 'app.record.detail.delete.submit',
    },
    {
      eventLabel: '%{BKY_KINTONE_EVENT_APP_RECORD_DETAIL_PROCESS_PROCEED}',
      eventKey: 'app.record.detail.process.proceed',
    },
  ],
};

// レコード追加画面
const appRecordCreateDef: KintoneEventBlockCategoryDef = {
  blockLabel: '%{BKY_KINTONE_EVENT_APP_RECORD_CREATE}',
  blockName: 'kintone_event_app_record_create',
  details: [
    {
      eventLabel: '%{BKY_KINTONE_EVENT_APP_RECORD_CREATE_SHOW}',
      eventKey: 'app.record.create.show',
    },
    {
      eventLabel: '%{BKY_KINTONE_EVENT_APP_RECORD_CREATE_SUBMIT}',
      eventKey: 'app.record.create.submit',
    },
    {
      eventLabel: '%{BKY_KINTONE_EVENT_APP_RECORD_CREATE_SUBMIT_SUCCESS}',
      eventKey: 'app.record.create.submit.success',
    },
  ],
};

const appRecordCreateFieldDef: KintoneFieldEventBlockCategoryDef = {
  blockLabel: '%{BKY_KINTONE_EVENT_APP_RECORD_CREATE_FIELD}',
  blockLabelSub: '%{BKY_KINTONE_EVENT_APP_RECORD_CREATE_FIELD_SUB}',
  blockName: 'kintone_event_app_record_create_field',
  eventKeyPrefix: 'app.record.create.change',
};

// レコード編集画面
const appRecordEditDef: KintoneEventBlockCategoryDef = {
  blockLabel: '%{BKY_KINTONE_EVENT_APP_RECORD_EDIT}',
  blockName: 'kintone_event_app_record_edit',
  details: [
    {
      eventLabel: '%{BKY_KINTONE_EVENT_APP_RECORD_EDIT_SHOW}',
      eventKey: 'app.record.edit.show',
    },
    {
      eventLabel: '%{BKY_KINTONE_EVENT_APP_RECORD_EDIT_SUBMIT}',
      eventKey: 'app.record.edit.submit',
    },
    {
      eventLabel: '%{BKY_KINTONE_EVENT_APP_RECORD_EDIT_SUBMIT_SUCCESS}',
      eventKey: 'app.record.edit.submit.success',
    },
  ],
};

const appRecordEditFieldDef: KintoneFieldEventBlockCategoryDef = {
  blockLabel: '%{BKY_KINTONE_EVENT_APP_RECORD_EDIT_FIELD}',
  blockLabelSub: '%{BKY_KINTONE_EVENT_APP_RECORD_EDIT_FIELD_SUB}',
  blockName: 'kintone_event_app_record_edit_field',
  eventKeyPrefix: 'app.record.edit.change',
};

export function xmlCreateElement(elementName: string): Element {
  return Blockly.Xml.textToDom(`<${elementName}/>`);
}

export function buildKintone(
  blocks: object,
  js: object,
  category: Element,
  fields: Field[],
  organizationsAndGroups: OrganizationsAndGroups,
) {
  // デバッグ用
  category.appendChild(
    createSubCategoryElement(
      blocks,
      js,
      '%{BKY_KINTONE_MENU_CATEGORY_DEBUG}',
      BlockColors.SLASH,
      [new ConsoleLogBlock(), new DebuggerBlock()],
    ),
  );

  // ユーザー管理系
  category.appendChild(
    createSubCategoryElement(
      blocks,
      js,
      '%{BKY_KINTONE_MENU_CATEGORY_USER}',
      BlockColors.SLASH,
      [
        new SlashUserBlock(),
        new SlashUserOrganizationBlock(organizationsAndGroups.organizations),
        new SlashUserGroupBlock(organizationsAndGroups.groups),
      ],
    ),
  );

  // イベント系
  category.appendChild(
    createSubCategoryElement(
      blocks,
      js,
      '%{BKY_KINTONE_MENU_CATEGORY_EVENT}',
      BlockColors.KINTONE,
      [
        new KintoneEventBlock(appRecordIndexDef),
        new KintoneEventFieldBlock(appRecordIndexFieldDef, fields),
        new KintoneEventBlock(appRecordDetailDef),
        new KintoneEventBlock(appRecordCreateDef),
        new KintoneEventFieldBlock(appRecordCreateFieldDef, fields),
        new KintoneEventBlock(appRecordEditDef),
        new KintoneEventFieldBlock(appRecordEditFieldDef, fields),
      ],
    ),
  );

  // レコードの値系
  category.appendChild(
    createSubCategoryElement(
      blocks,
      js,
      '%{BKY_KINTONE_MENU_CATEGORY_RECORD}',
      BlockColors.KINTONE,
      [
        new KintoneRecordGetIdBlock(),
        new KintoneRecordGetEventBlock(),
        new KintoneRecordGetFieldValueBlock(fields),
        new KintoneRecordGetFieldElementBlock(fields),
        new KintoneRecordSetValueBlock(fields),
        new KintoneRecordSetErrorBlock(fields),
        new KintoneRecordSetDisabledBlock(fields),
        new KintoneRecordSetVisibleBlock(fields),
        new KintoneRecordSetGroupFieldOpenBlock(fields),
      ],
    ),
  );
}

function createSubCategoryElement(
  blocks: object,
  js: object,
  subCategoryName: string,
  colour: string,
  kintoneBlocks: KintoneBlock[],
): Element {
  const category = subCategory(subCategoryName, colour);
  kintoneBlocks.forEach(block => {
    blocks[block.blockName] = block.blockDefinition();
    js[block.blockName] = block.jsGenerator();
    const element = block.menuElement();
    category.appendChild(element);
  });
  return category;
}

function subCategory(categoryName: string, colour: string): Element {
  const categoryElement = xmlCreateElement('category');
  categoryElement.setAttribute('name', categoryName);
  categoryElement.setAttribute('colour', colour);
  return categoryElement;
}
