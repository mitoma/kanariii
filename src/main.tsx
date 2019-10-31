import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './App';
import { Field } from './schema/Field';

document.addEventListener("DOMContentLoaded", function (loadedEvent) {
    const fieldList = cybozu.data.page.FORM_DATA.schema.table.fieldList;
    const fieldKeys = Object.keys(cybozu.data.page.FORM_DATA.schema.table.fieldList);
    const fields = fieldKeys.map((key) => { return fieldList[key] as Field; });
    
    let sourceXml = '<xml xmlns="https://developers.google.com/blockly/xml"></xml>';
    if (typeof KintoneBlockly !== 'undefined' && KintoneBlockly.sourceXml !== null) {
        sourceXml = KintoneBlockly.sourceXml;
    }
    const kintoneMenu = document.querySelector('.gaia-argoui-app-toolbar-menu');
    if (kintoneMenu != null) {
        const blocklyToggle = document.createElement('span');
        document.querySelector('.gaia-argoui-app-menu-settings').before(blocklyToggle);
        ReactDOM.render(<App sourceXml={sourceXml} fields={fields} />, blocklyToggle);
    } else {
        console.log("hello");
    }
});
