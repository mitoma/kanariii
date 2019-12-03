import * as Blockly from 'blockly';
import styles from './BlocklyUi.css';
import * as React from 'react';
import { CustomizeJsUpdater } from './usecase/CustomizeJsUpdater';
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
import HistoryIcon from '@material-ui/icons/History';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import { WorkspaceLoader } from './usecase/WorkspaceLoader';
import { WorkspaceExporter } from './usecase/WorkspaceExporter';
import { WorkspaceInitializer } from './usecase/WorkspaceInitializer';
import { OrganizationsAndGroups } from './client/SlashClient';
import { Revision } from './history/Revision';
import { DeployDialog } from './view/DeployDialog';
import { HistoryDialog } from './view/HistoryDialog';
import { generateJavaScriptWithMetadata } from './usecase/CodeGenerator';

type BlocklyUiProps = {
  sourceXml: string;
  revisions: Revision[];
  handleCloseEditor: () => void;
  handleUpdateSourceXml: (sourceXml: string) => void;
  fields: Field[];
  organizationsAndGroups: OrganizationsAndGroups;
};

export function BlocklyUi(props: BlocklyUiProps) {
  const workspaceInitializer = new WorkspaceInitializer();
  const workspaceLoader = new WorkspaceLoader();
  const workspaceExporter = new WorkspaceExporter();
  const customizeJsUpdater = new CustomizeJsUpdater();

  const [workspace, setWorkspace] = React.useState(null as Blockly.Workspace);
  const [historyDialog, setHistoryDialog] = React.useState(false);
  const [exportMenu, setExportMenu] = React.useState(null);
  const [deploying, setDeploying] = React.useState(false);
  const [deployDialog, setDeployDialog] = React.useState(false);

  const importFile = React.useRef<HTMLInputElement>();
  const blocklyDiv = React.useRef<HTMLDivElement>();

  React.useEffect(() => {
    if (workspace == null) {
      setWorkspace(
        workspaceInitializer.initWorkspace(
          blocklyDiv.current,
          props.sourceXml,
          props.fields,
          props.organizationsAndGroups,
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
    setDeploying(true);
  }

  function handleCloseLoading() {
    setDeploying(false);
  }

  function handleOpenHistoryDialog() {
    setHistoryDialog(true);
  }

  function handleCloseHistoryDialog() {
    setHistoryDialog(false);
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
    workspaceExporter.exportJavaScript(workspace, props.revisions);
    handleCloseExportMenu();
  }

  function handleOpenDeployDialog() {
    setDeployDialog(true);
  }

  function handleCloseDeployDialog() {
    setDeployDialog(false);
  }

  function handleDeploy(deployMessage: string) {
    handleOpenLoading();
    const jsCode = generateJavaScriptWithMetadata(
      workspace,
      deployMessage,
      props.revisions,
    );
    customizeJsUpdater
      .uploadCustomizeCode(jsCode)
      .then(() => location.reload())
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
            aria-label="close">
            <CloseIcon />
          </IconButton>
          <Box>
            <Typography variant="h6">KanariIi</Typography>
          </Box>
          <Box flex={1}>
            <Button
              color="inherit"
              aria-label="history"
              component="label"
              startIcon={<HistoryIcon />}
              onClick={handleOpenHistoryDialog}>
              history
            </Button>
            <Button
              color="inherit"
              aria-label="upload code"
              component="label"
              startIcon={<ArrowUpwardIcon />}>
              import
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
              startIcon={<ArrowDownwardIcon />}>
              export
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={exportMenu}
              keepMounted
              open={Boolean(exportMenu)}
              onClose={handleCloseExportMenu}>
              <MenuItem onClick={handleExportXml}>XML</MenuItem>
              <MenuItem onClick={handleExportJavaScript}>JavaScript</MenuItem>
            </Menu>
            <Button
              color="inherit"
              aria-label="deploy code"
              onClick={handleOpenDeployDialog}
              startIcon={<SaveAltIcon />}>
              deploy
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <div ref={blocklyDiv} className={styles['blocklyDiv']} />
      <DeployDialog
        open={deployDialog}
        handleDeploy={handleDeploy}
        handleCloseDialog={handleCloseDeployDialog}
        deploying={deploying}
      />
      <HistoryDialog
        open={historyDialog}
        handleCloseDialog={handleCloseHistoryDialog}
        workspace={workspace}
        revisions={props.revisions}
      />
    </React.Fragment>
  );
}
