import { KintoneBlock } from './KintoneBlock';
import {
  KintoneEventBlockCategoryDef,
  KintoneEventBlock,
} from './KintoneEventBlock';
import { ConsoleLogBlock } from './ConsoleLogBlock';
import { Field } from '../schema/Field';
import { FieldCodeBlock } from './FieldCodeBlock';
import { DebuggerBlock } from './DebuggerBlock';
import {
  KintoneEventFieldBlock,
  KintoneFieldEventBlockCategoryDef,
} from './KintoneFieldEventBlock';

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

export function buildKintone(
  blocks: object,
  js: object,
  category: Element,
  fields: Field[],
) {
  // イベント系
  category.appendChild(
    createSubCategoryElement(blocks, js, 'イベント', [
      new KintoneEventBlock(appRecordIndexDef),
      new KintoneEventFieldBlock(appRecordIndexFieldDef, fields),
    ]),
  );

  // スキーマ系
  category.appendChild(
    createSubCategoryElement(blocks, js, 'スキーマ', [
      new FieldCodeBlock(fields),
    ]),
  );

  // デバッグ用
  category.appendChild(
    createSubCategoryElement(blocks, js, 'デバッグ', [
      new ConsoleLogBlock(),
      new DebuggerBlock(),
    ]),
  );
}

function createSubCategoryElement(
  blocks: object,
  js: object,
  subCategoryName: string,
  kintoneBlocks: KintoneBlock[],
): Element {
  const category = subCategory(subCategoryName);
  kintoneBlocks.forEach(block => {
    blocks[block.blockName] = block.blockDefinition();
    js[block.blockName] = block.jsGenerator();
    category.appendChild(block.menuElement());
  });
  return category;
}

function subCategory(categoryName: string): Element {
  let categoryElement = document.createElement('category');
  categoryElement.setAttribute('name', categoryName);
  categoryElement.setAttribute('colour', '#9fa55b');
  return categoryElement;
}
