/// <reference path="../../node_modules/@kintone/dts-gen/kintone.d.ts" />

export interface CustomizeSetting {
  app: string;
  scope: 'ALL';
  desktop: SettingForDevice;
  revision: string;
}

export interface SettingForDevice {
  css: Array<any>;
  js: Array<UrlSource | FileSource>;
}

export interface UrlSource {
  type: 'URL';
  url: string;
}

export interface FileSource {
  type: 'FILE';
  file: FileBlob | UploadFileBlob;
}

export interface FileBlob {
  contentType: string;
  fileKey: string;
  name: string;
  size: string;
}

export interface UploadFileBlob {
  fileKey: string;
}

export class KintoneClient {
  getCustomizeSetting() {
    return kintone.api(this.url('/k/v1/preview/app/customize'), 'GET', {
      app: kintone.app.getId(),
    });
  }

  putCustomizeSetting(customizeSetting: CustomizeSetting) {
    return kintone.api(
      this.url('/k/v1/preview/app/customize'),
      'PUT',
      customizeSetting,
    );
  }

  sleep(waitMsec: number) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, waitMsec);
    });
  }

  deployApp() {
    return kintone.api(this.url('/k/v1/preview/app/deploy'), 'POST', {
      apps: [{ app: kintone.app.getId(), revision: -1 }],
    });
  }

  deployAppProgress() {
    return kintone
      .api(this.url('/k/v1/preview/app/deploy'), 'GET', {
        apps: [kintone.app.getId()],
      })
      .then(resp => {
        return resp.apps[0].status;
      });
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
}
