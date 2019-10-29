/// <reference path="../node_modules/@kintone/dts-gen/kintone.d.ts" />

interface CustomizeSetting {
    app: string;
    scope: "ALL";
    desktop: SettingForDevice;
    revision: string;
}

interface SettingForDevice {
    css: Array<any>;
    js: Array<UrlSource | FileSource>;
}

interface UrlSource {
    type: 'URL';
    url: string;
}

interface FileSource {
    type: 'FILE'
    file: FileBlob | UploadFileBlob;
}

interface FileBlob {
    contentType: string;
    fileKey: string;
    name: string;
    size: string;
}

interface UploadFileBlob {
    fileKey: string;
}

export class CustomizeJsUpdater {

    readonly fileName = 'kintone-blockly-app.js';

    async uploadCustomizeCode(xmlCode: string, jsCode: string) {
        const customizeSetting: CustomizeSetting = await this.getCustomizeSetting();
        const uploadToBlob = await this.uploadToBlob(this.generateCode(xmlCode, jsCode));
        customizeSetting.desktop.js = customizeSetting.desktop.js.filter((source) => {
            if (source.type === 'FILE') {
                let fileSource = source as FileSource;
                return (fileSource.file as FileBlob).name !== this.fileName
            }
            return true;
        });
        customizeSetting.desktop.js.push({ type: 'FILE', file: { fileKey: uploadToBlob["fileKey"] } });
        customizeSetting.app = kintone.app.getId().toString();
        console.log(customizeSetting);
        console.log('good!');
        console.log(uploadToBlob);
        console.log('blob!!');
        this.putCustomizeSetting(customizeSetting);
    }

    private generateCode(xmlCode: string, jsCode: string): string {
        const customizeCode = `
KintoneBlockly = {};
KintoneBlockly.sourceXml='${xmlCode}';
${jsCode}
`;
        return customizeCode;
    }

    private getCustomizeSetting() {
        return kintone.api(this.url('/k/v1/app/customize'), 'GET', { app: kintone.app.getId() });
    }

    private putCustomizeSetting(customizeSetting: CustomizeSetting) {
        return kintone.api(this.url('/k/v1/preview/app/customize'), 'PUT', customizeSetting);
    }

    private uploadToBlob(code: string) {
        return new Promise((resolve, reject) => {
            const blob = new Blob([code], { type: "application/xml" });
            const formData = new FormData();
            formData.append("__REQUEST_TOKEN__", kintone.getRequestToken());
            formData.append("file", blob, this.fileName);

            const url = this.url('/k/v1/file');
            const xhr = new XMLHttpRequest();
            xhr.open('POST', url);
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.onload = function () {
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
