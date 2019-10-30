import { KintoneBlock } from './blocks/KintoneBlock';
import { KintoneEventBlockCategoryDef, KintoneEventBlock } from './blocks/KintoneEventBlock';
import { ConsoleLogBlock } from './blocks/ConsoleLogBlock';

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

export function buildKintone(category: Element, blocks: object, js: object) {
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
