import * as Blockly from 'blockly';
import categoryXml from '../category.xml';
import { loadEnLocale, loadJaLocale } from '../msg/all';
import { buildKintone } from '../blocks/kintone-block';
import { Field } from '../schema/Field';
import { OrganizationsAndGroups } from '../client/SlashClient';

export class WorkspaceInitializer {
  initWorkspace(
    blocklyDiv: HTMLDivElement,
    sourceXml: string,
    fields: Field[],
    organizationsAndGroups: OrganizationsAndGroups,
  ): Blockly.Workspace {
    if (kintone.getLoginUser()['language'] === 'ja') {
      loadJaLocale();
    } else {
      loadEnLocale();
    }

    const toolbox: Element = Blockly.Xml.textToDom(categoryXml);
    const kintoneCategory: Element = toolbox.querySelector('[name=Kintone]');

    buildKintone(
      // @ts-ignore
      Blockly.Blocks,
      // @ts-ignore
      Blockly.JavaScript,
      kintoneCategory,
      fields,
      organizationsAndGroups,
    );

    const zoom = {
      controls: true,
      wheel: true,
      startScale: 1.0,
      maxScale: 3,
      minScale: 0.3,
      scaleSpeed: 1.2,
    };

    const workspace = Blockly.inject(blocklyDiv, {
      toolbox: toolbox,
      trashcan: true,
      zoom: zoom,
      media: KanariIi.mediaUrl,
    });
    Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(sourceXml), workspace);
    return workspace;
  }
}
