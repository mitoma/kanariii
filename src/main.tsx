import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './App';

document.addEventListener("DOMContentLoaded", function (loadedEvent) {
    const kintoneMenu = document.querySelector('.gaia-argoui-app-toolbar-menu');
    if (kintoneMenu != null) {
        const blocklyToggle = document.createElement('span');
        document.querySelector('.gaia-argoui-app-menu-settings').before(blocklyToggle);
        ReactDOM.render(<App />, blocklyToggle);
    } else {
        console.log("hello");
    }
});
