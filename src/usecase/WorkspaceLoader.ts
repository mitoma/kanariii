import * as Blockly from 'blockly';

export class WorkspaceLoader {
  load(workspace: Blockly.Workspace, file: File) {
    const reader = new FileReader();
    reader.readAsText(file, 'UTF-8');
    // よくわからないが ProgressEvent から target.result が取れないのじゃよ。
    // https://github.com/microsoft/TypeScript/issues/4163#issuecomment-321942932
    reader.onload = (event: ProgressEvent) => {
      const xmlString = reader.result as string;
      workspace.clear();
      Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(xmlString), workspace);
    };
  }
}
