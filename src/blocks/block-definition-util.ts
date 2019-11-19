import * as Blockly from 'blockly';

function enableInEventBlock(
  block: Blockly.Block,
): (e: Blockly.Events.BlockChange) => void {
  const innerBlock = block;
  return (e: Blockly.Events.BlockChange) => {
    if (!innerBlock.isInFlyout) {
      innerBlock.setEnabled(
        innerBlock.getRootBlock().type.startsWith('kintone_event_'),
      );
    }
  };
}

namespace BlockColors {
  export const SLASH: string = '#BB4444';
  export const KINTONE: string = '#9fa55b';
}

export { enableInEventBlock, BlockColors };
