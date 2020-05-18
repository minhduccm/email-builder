/*
* InformationDialog
*/
import React from 'react';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import styles from './styles';

/* eslint-disable react/prefer-stateless-function */
export class InformationDialog extends React.PureComponent {
  render() {
    const {
      isOpenedDialog,
      informationMessage,
      onClose,
    } = this.props;
    return (
      <div>
        <Dialog
          open={isOpenedDialog}
          onClose={onClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Information</DialogTitle>
          <DialogContent>
            <DialogContentText>{informationMessage}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const withStylesInformationDialog = withStyles(styles);

export default compose(withStylesInformationDialog)(InformationDialog);
