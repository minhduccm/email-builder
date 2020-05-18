/*
* NewProjectDialog
*/
import React from 'react';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import styles from './styles';

/* eslint-disable react/prefer-stateless-function */
export class NewProjectDialog extends React.PureComponent {
  render() {
    const {
      isOpenNewProjectDialog,
      onCloseNewProjectDialog,
      onNavigateToSegmentBuilder,
    } = this.props;
    return (
      <div>
        <Dialog
          open={isOpenNewProjectDialog}
          onClose={onCloseNewProjectDialog}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create new Project</DialogTitle>
          <DialogContent>
            <DialogContentText>
              This is the first step of create new project process.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Project name"
              required
              fullWidth
            />
            <TextField
              margin="dense"
              id="name"
              label="Short description"
              multiline
              required
              error={true}
              helperText="hahhaah"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onCloseNewProjectDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={onNavigateToSegmentBuilder} color="primary">
              Next
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const withStylesNewProjectDialog = withStyles(styles);

export default compose(withStylesNewProjectDialog)(NewProjectDialog);
