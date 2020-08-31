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

  async uploadCustomizeCode(jsCode: string) {
    const customizeSetting: CustomizeSetting = await this.kintoneClient.getCustomizeSetting();
    const uploadFileKey = await this.kintoneClient.uploadToBlob(
      jsCode,
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
      file: { fileKey: uploadFileKey },
    });
    customizeSetting.app = kintone.app.getId().toString();
    await this.kintoneClient.putCustomizeSetting(customizeSetting);
    await this.kintoneClient.deployApp();
    while ((await this.kintoneClient.deployAppProgress()) !== 'SUCCESS') {
      await this.kintoneClient.sleep(250);
    }
  }
}
