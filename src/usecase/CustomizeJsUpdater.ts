import * as parserBabel from 'prettier/parser-babylon';
import * as prettier from 'prettier/standalone';
import { Revision } from '../history/Revision';
import {
  KintoneClient,
  CustomizeSetting,
  FileSource,
  FileBlob,
} from '../client/KintoneClient';

export class CustomizeJsUpdater {
  kintoneClient: KintoneClient;

  constructor() {
    this.kintoneClient = new KintoneClient();
  }

  readonly fileName = 'kanariii-app.js';

  async uploadCustomizeCode(
    xmlCode: string,
    jsCode: string,
    deployMessage: string,
    revisions: Revision[],
  ) {
    const customizeSetting: CustomizeSetting = await this.kintoneClient.getCustomizeSetting();
    const uploadToBlob = await this.kintoneClient.uploadToBlob(
      this.generateCode(xmlCode, jsCode, deployMessage, revisions),
      this.fileName,
    );
    customizeSetting.desktop.js = customizeSetting.desktop.js.filter(source => {
      if (source.type === 'FILE') {
        let fileSource = source as FileSource;
        return (fileSource.file as FileBlob).name !== this.fileName;
      }
      return true;
    });
    customizeSetting.desktop.js.push({
      type: 'FILE',
      file: { fileKey: uploadToBlob['fileKey'] },
    });
    customizeSetting.app = kintone.app.getId().toString();
    await this.kintoneClient.putCustomizeSetting(customizeSetting);
    await this.kintoneClient.deployApp();
    while ((await this.kintoneClient.deployAppProgress()) !== 'SUCCESS') {
      await this.kintoneClient.sleep(250);
    }
  }

  private calcNextRevision(revisions: Revision[]) {
    if (revisions.length == 0) {
      return 1;
    } else {
      return revisions[revisions.length - 1].revisionId + 1;
    }
  }

  public generateCode(
    xmlCode: string,
    jsCode: string,
    deployMessage: string,
    revisions: Revision[],
  ): string {
    revisions.push({
      revisionId: this.calcNextRevision(revisions),
      deployDate: new Date(),
      message: deployMessage,
      source: xmlCode,
    });
    // KanariIi オブジェクトは先に評価させる。
    // 生成コードが invalid なときでもブロックが編集できるようにするため。
    const customizeCode = `
// this code generated by kanariii

// start  internal information. don't touch.
var KanariIi = KanariIi || {};
KanariIi.sourceXml=${JSON.stringify(xmlCode)};
KanariIi.revisions=${JSON.stringify(revisions)};
// finish internal information.

// start generated code by blocks
(function(){
${jsCode}
})();
// end   generated code by blocks
`;
    return prettier.format(customizeCode, {
      parser: 'babel',
      plugins: [parserBabel],
    });
  }
}
