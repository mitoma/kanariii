import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Field } from './schema/Field';
import { App } from './App';
import { SlashClient, OrganizationsAndGroups } from './client/SlashClient';
import { Revision } from './history/Revision';

document.addEventListener('DOMContentLoaded', function(loadedEvent) {
  function initialSourceXml(): string {
    if (
      typeof KintoneBlockly !== 'undefined' &&
      KintoneBlockly.sourceXml !== null
    ) {
      return KintoneBlockly.sourceXml;
    } else {
      return '<xml xmlns="https://developers.google.com/blockly/xml"></xml>';
    }
  }

  function initialRevisions(): Revision[] {
    if (
      typeof KintoneBlockly !== 'undefined' &&
      typeof KintoneBlockly.revisions !== 'undefined' &&
      KintoneBlockly.revisions !== null
    ) {
      const revisions: Revision[] = KintoneBlockly.revisions;
      return revisions;
    } else {
      return [];
    }
  }

  async function setup() {
    const slashClient = new SlashClient();
    const organizationsAndGroups: OrganizationsAndGroups = await slashClient.loadOrganizationsAndGroups();
    const fieldList = cybozu.data.page.FORM_DATA.schema.table.fieldList;
    const fieldKeys = Object.keys(
      cybozu.data.page.FORM_DATA.schema.table.fieldList,
    );
    const fields = fieldKeys.map(key => {
      return fieldList[key] as Field;
    });

    const sourceXml = initialSourceXml();
    const revisions = initialRevisions();
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
      console.log('done');
    } else {
      console.log('hello');
    }
  }

  setup();
});
