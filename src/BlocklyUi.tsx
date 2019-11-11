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
  Dialog,
  DialogTitle,
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

  const [workspace, setWorkspace] = React.useState(null);
  const [exportMenu, setExportMenu] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

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

  function handleOpenLoading() {
    setLoading(true);
  }

  function handleCloseLoading() {
    setLoading(false);
  }

  function handleOpenExportMenu(event: React.MouseEvent<HTMLButtonElement>) {
    setExportMenu(event.currentTarget);
  }

  function handleCloseExportMenu() {
    setExportMenu(null);
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
    handleOpenLoading();
    customizeJsUpdater
      .uploadCustomizeCode(
        Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace)),
        // @ts-ignore
        Blockly.JavaScript.workspaceToCode(workspace),
      )
      .then(() => {
        location.reload();
      })
      .catch(error => {
        console.error(error);
        handleCloseLoading();
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
              anchorEl={exportMenu}
              keepMounted
              open={Boolean(exportMenu)}
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
      <Dialog open={loading}>
        <DialogTitle>Deploying</DialogTitle>
      </Dialog>
    </React.Fragment>
  );
}
