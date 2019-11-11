import { BlocklyUi } from './BlocklyUi';
import * as React from 'react';
import { Field } from './schema/Field';
import { Button } from '@material-ui/core';
import BuildIcon from '@material-ui/icons/Build';
import styles from './App.css';

type AppProps = {
  sourceXml: string;
  fields: Field[];
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
        startIcon={<BuildIcon />}
        color="inherit"
        onClick={handleOpenEditor}
        aria-label="open blockly"
      >
        open blockly
      </Button>
      <div
        className={
          showBlocklyEditor
            ? styles['showMordalBackground']
            : styles['hideMordalBackground']
        }
        onClick={handleCloseEditor}
      ></div>
      <div
        className={
          showBlocklyEditor ? styles['showBlocklyUi'] : styles['hideBlocklyUi']
        }
      >
        <BlocklyUi
          handleCloseEditor={handleCloseEditor}
          handleUpdateSourceXml={setSourceXml}
          sourceXml={sourceXml}
          fields={props.fields}
        />
      </div>
    </React.Fragment>
  );
}
