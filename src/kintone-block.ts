import { KintoneBlock } from './blocks/KintoneBlock';
import { KintoneEventBlockCategoryDef, KintoneEventBlock } from './blocks/KintoneEventBlock';
import { ConsoleLogBlock } from './blocks/ConsoleLogBlock';
import { Field } from './schema/Field';
import { FieldCodeBlock } from './blocks/FieldCodeBlock';

// イベントの定義
// https://developer.cybozu.io/hc/ja/articles/360000361686

// レコード一覧
const appRecordShowDef: KintoneEventBlockCategoryDef = {
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
    ]
}

export function buildKintone(blocks: object, js: object, category: Element, fields: Field[]) {
    // イベント系
    const eventBlocks: KintoneBlock[] = [];
    const eventCategory = subCategory("イベント");
    eventBlocks.push(new KintoneEventBlock(appRecordShowDef));
    eventBlocks.forEach((block) => {
        blocks[block.blockName] = block.blockDefinition();
        js[block.blockName] = block.jsGenerator();
        eventCategory.appendChild(block.menuElement());
    });
    category.appendChild(eventCategory);

    // スキーマ系
    const schemaBlocks: KintoneBlock[] = [];
    const schemaCategory = subCategory("スキーマ");
    schemaBlocks.push(new FieldCodeBlock(fields));
    schemaBlocks.forEach((block) => {
        blocks[block.blockName] = block.blockDefinition();
        js[block.blockName] = block.jsGenerator();
        schemaCategory.appendChild(block.menuElement());
    });
    category.appendChild(schemaCategory);

    // デバッグ用
    const debugBlocks: KintoneBlock[] = [];
    const debugCategory = subCategory("デバッグ");
    debugBlocks.push(new ConsoleLogBlock());
    debugBlocks.forEach((block) => {
        blocks[block.blockName] = block.blockDefinition();
        js[block.blockName] = block.jsGenerator();
        debugCategory.appendChild(block.menuElement());
    });
    category.appendChild(debugCategory);
}

function subCategory(categoryName: string): Element {
    let categoryElement = document.createElement("category");
    categoryElement.setAttribute("name", categoryName);
    categoryElement.setAttribute("colour", "#9fa55b");
    return categoryElement;
}
