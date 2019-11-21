import * as Blockly from 'blockly';

// 返り値に Promise が使えない(async function)にできないイベントキーのprefix
const syncOnlyEventKeyPrefixes = [
  'app.record.index.show',
  'app.record.index.edit.show',
  'app.record.index.edit.change',
  'app.record.detail.show',
  'app.record.create.show',
  'app.record.create.change',
  'app.record.edit.show',
  'app.record.edit.change',
];

function isAsyncableEventKey(eventType: string): boolean {
  // ブロックの移動中に eventType が null になるケースがあるため null なら false を返す。
  if (eventType == null) {
    return false;
  }
  return (
    syncOnlyEventKeyPrefixes.filter(p => eventType.startsWith(p)).length == 0
  );
}

function isAsyncableEventBlock(block: Blockly.Block): boolean {
  const rootIsEventBlock = block.type.startsWith('kintone_event_');
  if (!rootIsEventBlock) {
    return false;
  }
  return isAsyncableEventKey(block.getFieldValue('event_type'));
}

function enableInEventBlock(block: Blockly.Block) {
  enableIfRootBlockHasPrefix(block, 'kintone_event_');
}

function enableInAsyncEventBlock(block: Blockly.Block) {
  block.setOnChange((e: Blockly.Events.BlockChange) => {
    if (!block.isInFlyout) {
      const root = block.getRootBlock();
      block.setEnabled(isAsyncableEventBlock(root));
    }
  });
}

function enableIfRootBlockHasPrefix(block: Blockly.Block, prefix: string) {
  enableIfRootBlockHasPrefixes(block, [], [prefix]);
}

function enableIfRootBlockHasPrefixes(
  block: Blockly.Block,
  denyPrefixes: string[],
  allowPrefixes: string[],
) {
  block.setOnChange((e: Blockly.Events.BlockChange) => {
    if (!block.isInFlyout) {
      block.setEnabled(
        calcEnable(block.getRootBlock().type, denyPrefixes, allowPrefixes),
      );
    }
  });
}

function calcEnable(
  blockName: string,
  denyPrefixes: string[],
  allowPrefixes: string[],
): boolean {
  if (denyPrefixes.filter(prefix => blockName.startsWith(prefix)).length > 0) {
    return false;
  }
  if (allowPrefixes.filter(prefix => blockName.startsWith(prefix)).length > 0) {
    return true;
  }
  return false;
}

function appendShadowText(target: Element, defaultValue: string): Element {
  const field = document.createElement('field');
  field.setAttribute('name', 'TEXT');
  field.innerText = defaultValue;
  const shadow = document.createElement('shadow');
  shadow.setAttribute('type', 'text');
  shadow.appendChild(field);
  const value = document.createElement('value');
  value.setAttribute('name', 'TEXT');
  value.appendChild(shadow);
  target.appendChild(value);
  return target;
}

namespace BlockColors {
  export const SLASH: string = '#BB4444';
  export const KINTONE: string = '#9fa55b';
}

export {
  isAsyncableEventBlock,
  enableInEventBlock,
  enableInAsyncEventBlock,
  appendShadowText,
  BlockColors,
};
