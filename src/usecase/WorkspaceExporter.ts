import * as Blockly from 'blockly';
import { Revision } from '../history/Revision';
import { generateJavaScriptWithMetadata, generateXml } from './CodeGenerator';

export class WorkspaceExporter {
  exportXml(workspace: Blockly.Workspace) {
    const filename = 'kanariii.xml';
    const xmlData = generateXml(workspace);
    const blob = new Blob([xmlData], { type: 'application/xml' });
    this.download(filename, blob);
  }

  exportJavaScript(workspace: Blockly.Workspace, revisions: Revision[]) {
    const filename = 'kanariii-app.js';
    const jsCode = generateJavaScriptWithMetadata(
      workspace,
      'empty message',
      revisions,
    );
    const blob = new Blob([jsCode], { type: 'application/javascript' });
    this.download(filename, blob);
  }

  private download(filename: string, blob: Blob) {
    const link = document.createElement('a');
    link.download = filename;
    link.href = window.URL.createObjectURL(blob);
    link.click();
  }
}
