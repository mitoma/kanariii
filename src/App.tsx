import { BlocklyUi } from './BlocklyUi';
import * as React from 'react';
import { Field } from './schema/Field';
import { Button } from '@material-ui/core';
import styles from './App.css';
import { OrganizationsAndGroups } from './client/SlashClient';
import { Revision } from './history/Revision';
import SvgKanariIiIcon from './view/SvgKanariIiIcon';

type AppProps = {
  sourceXml: string;
  revisions: Revision[];
  fields: Field[];
  organizationsAndGroups: OrganizationsAndGroups;
};

export function App(props: AppProps) {
  const [sourceXml, setSourceXml] = React.useState(props.sourceXml);
  const [showBlocklyEditor, setShowBlocklyEditor] = React.useState();

  function handleOpenEditor() {
    setShowBlocklyEditor(true);
  }

  function handleCloseEditor() {
    setShowBlocklyEditor(false);
  }

  return (
    <React.Fragment>
      <Button
        startIcon={<SvgKanariIiIcon />}
        color="inherit"
        onClick={handleOpenEditor}
        aria-label="open kanariii">
        kanariii
      </Button>
      <div
        className={
          showBlocklyEditor
            ? styles['showMordalBackground']
            : styles['hideMordalBackground']
        }
        onClick={handleCloseEditor}
      />
      <div
        className={
          showBlocklyEditor ? styles['showBlocklyUi'] : styles['hideBlocklyUi']
        }>
        <BlocklyUi
          handleCloseEditor={handleCloseEditor}
          handleUpdateSourceXml={setSourceXml}
          sourceXml={sourceXml}
          revisions={props.revisions}
          fields={props.fields}
          organizationsAndGroups={props.organizationsAndGroups}
        />
      </div>
    </React.Fragment>
  );
}
