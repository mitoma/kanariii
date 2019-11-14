import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Field } from './schema/Field';
import { App } from './App';
import { SlashClient, UserInfo } from './client/SlashClient';

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

  async function setup() {
    const slashClient = new SlashClient();
    const userOrganizations = await slashClient.loadUserOrganizations();
    const organizations = await slashClient.loadOrganizations();
    const userGroups = await slashClient.loadUserGroups();
    const groups = await slashClient.loadGroups();

    const userInfo: UserInfo = {
      userOrganizations: userOrganizations,
      organizations: organizations,
      userGroups: userGroups,
      groups: groups,
    };
    const fieldList = cybozu.data.page.FORM_DATA.schema.table.fieldList;
    const fieldKeys = Object.keys(
      cybozu.data.page.FORM_DATA.schema.table.fieldList,
    );
    const fields = fieldKeys.map(key => {
      return fieldList[key] as Field;
    });

    const sourceXml = initialSourceXml();
    const kintoneMenu = document.querySelector('.gaia-argoui-app-toolbar-menu');
    if (kintoneMenu != null) {
      const blocklyToggle = document.createElement('span');
      document
        .querySelector('.gaia-argoui-app-menu-settings')
        .before(blocklyToggle);
      ReactDOM.render(
        <App sourceXml={sourceXml} fields={fields} userInfo={userInfo} />,
        blocklyToggle,
      );
      console.log('done');
    } else {
      console.log('hello');
    }
  }

  setup();
});
