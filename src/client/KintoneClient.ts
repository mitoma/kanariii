/// <reference path="../../node_modules/@kintone/dts-gen/kintone.d.ts" />

import { Field, UNSUPPORTED_FIELD_TYPES } from '../schema/Field';
import { KintoneRestAPIClient } from '@kintone/rest-api-client';

type DeployStatus = 'PROCESSING' | 'SUCCESS' | 'FAIL' | 'CANCEL';

type CustomizeSetting = {
  app: string;
  scope: 'ALL';
  desktop: SettingForDevice;
  revision: string;
};

type SettingForDevice = {
  css: Array<any>;
  js: Array<UrlSource | FileSource>;
};

type UrlSource = {
  type: 'URL';
  url: string;
};

type FileSource = {
  type: 'FILE';
  file: FileBlob | UploadFileBlob;
};

type FileBlob = {
  contentType: string;
  fileKey: string;
  name: string;
  size: string;
};

type UploadFileBlob = {
  fileKey: string;
};

class KintoneClient {
  kintoneRestApiClient: KintoneRestAPIClient;

  constructor() {
    this.kintoneRestApiClient = new KintoneRestAPIClient();
  }

  async getCustomizeSetting(): Promise<CustomizeSetting> {
    const resp = await this.kintoneRestApiClient.app.getAppCustomize({
      app: kintone.app.getId(),
    });
    const setting: CustomizeSetting = {
      app: kintone.app.getId().toString(),
      scope: 'ALL',
      desktop: {
        css: resp.desktop.css,
        js: resp.desktop.js,
      },
      revision: resp.revision,
    };
    return setting;
  }

  async putCustomizeSetting(
    customizeSetting: CustomizeSetting,
  ): Promise<string> {
    return (
      await this.kintoneRestApiClient.app.updateAppCustomize(customizeSetting)
    ).revision;
  }

  async sleep(waitMsec: number) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, waitMsec);
    });
  }

  async deployApp() {
    return this.kintoneRestApiClient.app.deployApp({
      apps: [{ app: kintone.app.getId(), revision: -1 }],
    });
  }

  async deployAppProgress(): Promise<DeployStatus> {
    const resp = await this.kintoneRestApiClient.app.getDeployStatus({
      apps: [kintone.app.getId()],
    });
    return resp.apps[0].status;
  }

  async uploadToBlob(code: string, fileName: string): Promise<string> {
    const blob = new Blob([code], { type: 'application/xml' });
    const resp = await this.kintoneRestApiClient.file.uploadFile({
      file: { name: fileName, data: blob },
    });
    return resp.fileKey;
  }

  async getAppFields(): Promise<Field[]> {
    const resp = await this.kintoneRestApiClient.app.getFormFields({
      app: kintone.app.getId(),
    });
    const fieldKeys = Object.keys(resp.properties);
    const fields: Field[] = fieldKeys
      .map(key => resp.properties[key])
      .map((f: any) => ({
        code: f.code,
        type: f.type,
        label: f.label,
      }));
    return fields.filter(f => !UNSUPPORTED_FIELD_TYPES.includes(f.type));
  }
}

export { KintoneClient, CustomizeSetting, FileSource, FileBlob };
