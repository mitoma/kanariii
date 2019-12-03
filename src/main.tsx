import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Field } from './schema/Field';
import { App } from './App';
import { SlashClient, OrganizationsAndGroups } from './client/SlashClient';
import { Revision } from './history/Revision';
import { KintoneClient } from './client/KintoneClient';

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', afterDOMLoaded);
} else {
  afterDOMLoaded();
}

function afterDOMLoaded() {
  // app id が解決できないページは非対応。
  if (kintone.app.getId() == null) {
    return;
  }

  async function setup() {
    const slashClient = new SlashClient();
    const kintoneClient = new KintoneClient();
    const [fields, organizationsAndGroups]: [
      Field[],
      OrganizationsAndGroups,
    ] = await Promise.all([
      kintoneClient.getAppFields(),
      slashClient.loadOrganizationsAndGroups(),
    ]);

    const sourceXml = KanariIi.sourceXml;
    const revisions = KanariIi.revisions;
    const kintoneMenu = document.querySelector('.gaia-argoui-app-toolbar-menu');
    if (kintoneMenu != null) {
      const blocklyToggle = document.createElement('span');
      document
        .querySelector('.gaia-argoui-app-menu-settings')
        .before(blocklyToggle);
      ReactDOM.render(
        <App
          sourceXml={sourceXml}
          revisions={revisions}
          fields={fields}
          organizationsAndGroups={organizationsAndGroups}
        />,
        blocklyToggle,
      );
    }
  }

  setup();
}
