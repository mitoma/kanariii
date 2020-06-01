/// <reference path="../../node_modules/@kintone/dts-gen/kintone.d.ts" />

import { Field, UNSUPPORTED_FIELD_TYPES } from '../schema/Field';
import { KintoneRestAPIClient } from '@kintone/rest-api-client';

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

  async getCustomizeSetting() {
    const resp = await this.kintoneRestApiClient.app
      .getAppCustomize({
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

  putCustomizeSetting(customizeSetting: CustomizeSetting) {
    return this.kintoneRestApiClient.app.updateAppCustomize(customizeSetting);
  }

  sleep(waitMsec: number) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, waitMsec);
    });
  }

  deployApp() {
    return this.kintoneRestApiClient.app.deployApp({
      apps: [{ app: kintone.app.getId(), revision: -1 }],
    });
  }

  async deployAppProgress() {
    const resp = await this.kintoneRestApiClient.app
      .getDeployStatus({
        apps: [kintone.app.getId()],
      });
    return resp.apps[0].status;
  }

  uploadToBlob(code: string, fileName: string) {
    return new Promise((resolve, reject) => {
      const blob = new Blob([code], { type: 'application/xml' });
      const formData = new FormData();
      formData.append('__REQUEST_TOKEN__', kintone.getRequestToken());
      formData.append('file', blob, fileName);

      const url = this.url('/k/v1/file');
      const xhr = new XMLHttpRequest();
      xhr.open('POST', url);
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      xhr.onload = function() {
        if (xhr.status === 200) {
          // success
          resolve(JSON.parse(xhr.responseText));
        } else {
          // error
          reject(JSON.parse(xhr.responseText));
        }
      };
      xhr.send(formData);
    });
  }

  private url(path: string): string {
    return kintone.api.url(path, true);
  }

  async getAppFields() {
    const resp = await kintone.api(this.url('/k/v1/app/form/fields'), 'GET', {
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
