import * as Blockly from 'blockly';
import 'blockly/javascript';
import JA from 'blockly/msg/ja.js';
import styles from './BlocklyUi.css';
import * as React from 'react';
import { CustomizeJsUpdater } from './CustomizeJsUpdater';
import { Field } from './schema/Field';
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import { WorkspaceLoader } from './usecase/WorkspaceLoader';
import { WorkspaceExporter } from './usecase/WorkspaceExporter';
import { WorkspaceInitializer } from './usecase/WorkspaceInitializer';

Blockly.setLocale(JA);

type BlocklyUiProps = {
  sourceXml: string;
  handleCloseEditor: () => void;
  handleUpdateSourceXml: (sourceXml: string) => void;
  fields: Field[];
};

export function BlocklyUi(props: BlocklyUiProps) {
  const workspaceInitializer = new WorkspaceInitializer();
  const workspaceLoader = new WorkspaceLoader();
  const workspaceExporter = new WorkspaceExporter();
  const customizeJsUpdater = new CustomizeJsUpdater();

  const [menuElement, setMenuElement] = React.useState(null);
  const [workspace, setWorkspace] = React.useState(null);

  const importFile = React.useRef<HTMLInputElement>();
  const blocklyDiv = React.useRef<HTMLDivElement>();

  React.useEffect(() => {
    if (workspace == null) {
      setWorkspace(
        workspaceInitializer.initWorkspace(
          blocklyDiv.current,
          props.sourceXml,
          props.fields,
        ),
      );
      return;
    } else {
      // @ts-ignore
      Blockly.svgResize(workspace);
      return () =>
        props.handleUpdateSourceXml(
          Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace)),
        );
    }
  }, [workspace]);

  function handleOpenExportMenu(event: React.MouseEvent<HTMLButtonElement>) {
    setMenuElement(event.currentTarget);
  }

  function handleCloseExportMenu() {
    setMenuElement(null);
  }

  function handleImportXml() {
    const file = importFile.current.files[0];
    if (file != null) {
      workspaceLoader.load(workspace, file);
    }
  }

  function handleExportXml() {
    workspaceExporter.exportXml(workspace);
    handleCloseExportMenu();
  }

  function handleExportJavaScript() {
    workspaceExporter.exportJavaScript(workspace);
    handleCloseExportMenu();
  }

  function handleToJavaScript() {
    customizeJsUpdater
      .uploadCustomizeCode(
        Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace)),
        // @ts-ignore
        Blockly.JavaScript.workspaceToCode(workspace),
      )
      .then(() => {
        // TODO いい感じにローディングのダイアログを出したい
        location.reload();
      });
  }

  return (
    <React.Fragment>
      <AppBar style={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={props.handleCloseEditor}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Box>
            <Typography variant="h6">KintoneBlockly</Typography>
          </Box>
          <Box flex={1}>
            <Button
              color="inherit"
              aria-label="upload code"
              component="label"
              startIcon={<ArrowUpwardIcon />}
            >
              Import
              <input
                ref={importFile}
                type="file"
                style={{ display: 'none' }}
                onChange={handleImportXml}
              />
            </Button>
            <Button
              color="inherit"
              aria-label="download code"
              onClick={handleOpenExportMenu}
              startIcon={<ArrowDownwardIcon />}
            >
              Export
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={menuElement}
              keepMounted
              open={Boolean(menuElement)}
              onClose={handleCloseExportMenu}
            >
              <MenuItem onClick={handleExportXml}>XML</MenuItem>
              <MenuItem onClick={handleExportJavaScript}>JavaScript</MenuItem>
            </Menu>
            <Button
              color="inherit"
              aria-label="deploy code"
              onClick={handleToJavaScript}
              startIcon={<SaveAltIcon />}
            >
              Deploy
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <div ref={blocklyDiv} className={styles['blocklyDiv']} />
    </React.Fragment>
  );
}
