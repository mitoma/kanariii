import * as Blockly from 'blockly';

function enableInEventBlock(block: Blockly.Block) {
  enableIfRootBlockHasPrefix(block, 'kintone_event_');
}

function enableInAsyncEventBlock(block: Blockly.Block) {
  const denyEventKeyPrefixes = [
    'app.record.index.show',
    'app.record.index.edit.show',
    'app.record.index.edit.change',
    'app.record.detail.show',
    'app.record.create.show',
    'app.record.create.change',
    'app.record.edit.show',
    'app.record.edit.change',
  ];
  block.setOnChange((e: Blockly.Events.BlockChange) => {
    if (!block.isInFlyout) {
      const root = block.getRootBlock();
      const rootIsValidBlockName = root.type.startsWith('kintone_event_');
      const eventType = root.getFieldValue('event_type');
      const rootIsAsyncEvent =
        eventType != null
          ? denyEventKeyPrefixes.filter(p => eventType.startsWith(p)).length ==
            0
          : false;

      block.setEnabled(rootIsValidBlockName && rootIsAsyncEvent);
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

namespace BlockColors {
  export const SLASH: string = '#BB4444';
  export const KINTONE: string = '#9fa55b';
}

export { enableInEventBlock, enableInAsyncEventBlock, BlockColors };
