import { KintoneBlock } from './KintoneBlock';
import { ConsoleLogBlock } from './ConsoleLogBlock';
import { Field } from '../schema/Field';
import { FieldCodeBlock } from './FieldCodeBlock';
import { DebuggerBlock } from './DebuggerBlock';
import {
  KintoneEventBlockCategoryDef,
  KintoneEventBlock,
} from './KintoneEventBlock';
import {
  KintoneEventFieldBlock,
  KintoneFieldEventBlockCategoryDef,
} from './KintoneFieldEventBlock';
import { KintoneRecordGetIdBlock } from './KintoneRecordGetIdBlock';
import { KintoneRecordGetFieldBlock } from './KintoneRecordGetFieldBlock';
import { KintoneRecordGetFieldElementBlock } from './KintoneRecordGetFieldElementBlock';
import { KintoneRecordSetValueBlock } from './KintoneRecordSetValueBlock';
import { KintoneRecordSetErrorBlock } from './KintoneRecordSetErrorBlock';
import { KintoneRecordSetDisabledBlock } from './KintoneRecordSetDisabledBlock';
import { KintoneRecordGetEventBlock } from './KintoneRecordGetEventBlock';
import { KintoneRecordSetVisibleBlock } from './KintoneRecordSetVisibleBlock';
import { KintoneRecordSetGroupFieldOpenBlock } from './KintoneRecordSetGroupFieldOpenBlock';
import { OrganizationsAndGroups } from '../client/SlashClient';
import { SlashUserBlock } from './SlashUserBlock';
import { SlashUserOrganizationBlock } from './SlashUserOrganizationBlock';
import { SlashUserGroupBlock } from './SlashUserGroupBlock';
import { BlockColors } from './block-definition-util';

// イベントの定義
// https://developer.cybozu.io/hc/ja/articles/360000361686

// レコード一覧
const appRecordIndexDef: KintoneEventBlockCategoryDef = {
  blockLabel: 'レコード一覧',
  blockName: 'kintone_event_app_record_index',
  details: [
    {
      eventLabel: '表示',
      eventKey: 'app.record.index.show',
    },
    {
      eventLabel: 'インライン編集開始',
      eventKey: 'app.record.index.edit.show',
    },
    {
      eventLabel: 'インライン編集の保存実行前',
      eventKey: 'app.record.index.edit.submit',
    },
    {
      eventLabel: 'インライン編集の保存成功後',
      eventKey: 'app.record.index.edit.submit.success',
    },
    {
      eventLabel: 'レコード削除前',
      eventKey: 'app.record.index.delete.submit',
    },
  ],
};

const appRecordIndexFieldDef: KintoneFieldEventBlockCategoryDef = {
  blockLabel: 'レコード一覧',
  blockLabelSub: '(インライン編集フィールド値変更)',
  blockName: 'kintone_event_app_record_index_field',
  eventKeyPrefix: 'app.record.index.edit.change',
};

// レコード詳細画面
const appRecordDetailDef: KintoneEventBlockCategoryDef = {
  blockLabel: 'レコード詳細画面',
  blockName: 'kintone_event_app_record_detail',
  details: [
    {
      eventLabel: '表示',
      eventKey: 'app.record.detail.show',
    },
    {
      eventLabel: '削除前',
      eventKey: 'app.record.detail.delete.submit',
    },
    {
      eventLabel: 'プロセス管理のアクション実行',
      eventKey: 'app.record.detail.process.proceed',
    },
  ],
};

// レコード追加画面
const appRecordCreateDef: KintoneEventBlockCategoryDef = {
  blockLabel: 'レコード追加',
  blockName: 'kintone_event_app_record_create',
  details: [
    {
      eventLabel: '表示',
      eventKey: 'app.record.create.show',
    },
    {
      eventLabel: '保存実行前',
      eventKey: 'app.record.create.submit',
    },
    {
      eventLabel: '保存実行後',
      eventKey: 'app.record.create.submit.success',
    },
  ],
};

const appRecordCreateFieldDef: KintoneFieldEventBlockCategoryDef = {
  blockLabel: 'レコード追加',
  blockLabelSub: '(フィールド値変更)',
  blockName: 'kintone_event_app_record_create_field',
  eventKeyPrefix: 'app.record.create.change',
};

// レコード編集画面
const appRecordEditDef: KintoneEventBlockCategoryDef = {
  blockLabel: 'レコード編集',
  blockName: 'kintone_event_app_record_edit',
  details: [
    {
      eventLabel: '表示',
      eventKey: 'app.record.edit.show',
    },
    {
      eventLabel: '保存実行前',
      eventKey: 'app.record.edit.submit',
    },
    {
      eventLabel: '保存実行後',
      eventKey: 'app.record.edit.submit.success',
    },
  ],
};

const appRecordEditFieldDef: KintoneFieldEventBlockCategoryDef = {
  blockLabel: 'レコード編集',
  blockLabelSub: '(フィールド値変更)',
  blockName: 'kintone_event_app_record_edit_field',
  eventKeyPrefix: 'app.record.edit.change',
};

export function buildKintone(
  blocks: object,
  js: object,
  category: Element,
  fields: Field[],
  organizationsAndGroups: OrganizationsAndGroups,
) {
  // デバッグ用
  category.appendChild(
    createSubCategoryElement(blocks, js, 'デバッグ', BlockColors.SLASH, [
      new ConsoleLogBlock(),
      new DebuggerBlock(),
    ]),
  );

  // ユーザー管理系
  category.appendChild(
    createSubCategoryElement(blocks, js, 'ユーザー', BlockColors.SLASH, [
      new SlashUserBlock(),
      new SlashUserOrganizationBlock(organizationsAndGroups.organizations),
      new SlashUserGroupBlock(organizationsAndGroups.groups),
    ]),
  );

  // イベント系
  category.appendChild(
    createSubCategoryElement(blocks, js, 'イベント', BlockColors.KINTONE, [
      new KintoneEventBlock(appRecordIndexDef),
      new KintoneEventFieldBlock(appRecordIndexFieldDef, fields),
      new KintoneEventBlock(appRecordDetailDef),
      new KintoneEventBlock(appRecordCreateDef),
      new KintoneEventFieldBlock(appRecordCreateFieldDef, fields),
      new KintoneEventBlock(appRecordEditDef),
      new KintoneEventFieldBlock(appRecordEditFieldDef, fields),
    ]),
  );

  // レコードの値系
  category.appendChild(
    createSubCategoryElement(blocks, js, 'レコード', BlockColors.KINTONE, [
      new FieldCodeBlock(fields),
      new KintoneRecordGetIdBlock(),
      new KintoneRecordGetEventBlock(),
      new KintoneRecordGetFieldBlock(fields),
      new KintoneRecordGetFieldElementBlock(fields),
      new KintoneRecordSetValueBlock(fields),
      new KintoneRecordSetErrorBlock(fields),
      new KintoneRecordSetDisabledBlock(fields),
      new KintoneRecordSetVisibleBlock(fields),
      new KintoneRecordSetGroupFieldOpenBlock(fields),
    ]),
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
    category.appendChild(block.menuElement());
  });
  return category;
}

function subCategory(categoryName: string, colour: string): Element {
  let categoryElement = document.createElement('category');
  categoryElement.setAttribute('name', categoryName);
  categoryElement.setAttribute('colour', colour);
  return categoryElement;
}
