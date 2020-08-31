import * as React from 'react';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import CloseIcon from '@material-ui/icons/Close';
import styles from './CodeDialog.css';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
} from '@material-ui/core';

type CodeDialogProps = {
  jsCode: string;
  open: boolean;
  handleCloseDialog: () => void;
};
export function CodeDialog(props: CodeDialogProps) {
  const [copySnackbar, setCopySnackbar] = React.useState(false);

  function handleOpenSnackbar() {
    setCopySnackbar(true);
  }
  function handleCloseSnackbar() {
    setCopySnackbar(false);
  }

  function copy() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(props.jsCode);
    }
    handleOpenSnackbar();
  }
  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClose={props.handleCloseDialog}
        fullWidth={true}
        maxWidth={'md'}>
        <DialogTitle>JS Code</DialogTitle>
        <DialogContent>
          <pre className={styles['sourceCode']}>{props.jsCode}</pre>
        </DialogContent>
        <DialogActions>
          <Button startIcon={<FileCopyIcon />} onClick={copy} color="primary">
            Copy
          </Button>
          <Button startIcon={<CloseIcon />} onClick={props.handleCloseDialog}>
            Close
          </Button>
        </DialogActions>
        <Snackbar
          style={{ zIndex: 1500 }}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          autoHideDuration={2000}
          key={'copied'}
          open={copySnackbar}
          onClose={handleCloseSnackbar}
          message={'Copied'}
        />
      </Dialog>
    </React.Fragment>
  );
}
