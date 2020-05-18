/*
* BlockStyleButton
*/

import React from 'react';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import styles from './styles';

class BlockStyleButton extends React.Component {
  constructor(props) {
    super(props);
    this.onToggle = this.onToggle.bind(this);
  }

  onToggle(e) {
    const { style, onToggle } = this.props;
    e.preventDefault();
    onToggle(style);
  }

  render() {
    const { active, label, icon, classes } = this.props;
    let className = 'RichEditor-styleButton';
    if (active) {
      className += ' RichEditor-activeButton';
    }
    return (
      <IconButton onClick={this.onToggle}>
        <Icon className={classes.addRemoveIcon} color="primary">
          {icon}
        </Icon>
      </IconButton>
    );
  }
}

const withMyStyles = withStyles(styles);
export default compose(withMyStyles)(BlockStyleButton);
