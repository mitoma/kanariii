import * as Blockly from 'blockly';

export interface KintoneBlock {
  blockName: string;
  blockDefinition(): object;
  jsGenerator(): (block: Blockly.Block) => any;
  menuElement(): Element;
}

export function appendShadowText(
  target: Element,
  defaultValue: string,
): Element {
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
