/*
* CandidateItem
*/
import React from 'react';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import MoreIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import styles from './styles';

/* eslint-disable react/prefer-stateless-function */
export class CandidatesItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.toggleMoreActionsOnItem = this.toggleMoreActionsOnItem.bind(this);
  }

  toggleMoreActionsOnItem(event) {
    const { idx, onToggleMoreActionsOnItem } = this.props;
    const { currentTarget } = event;
    onToggleMoreActionsOnItem(idx, currentTarget);
  }

  render() {
    const { classes, moreActionsOnItem, candidate } = this.props;
    return (
      <div>
        <ListItem key={candidate.id} alignItems="flex-start">
          <ListItemAvatar>
            <Avatar
              alt={candidate.name}
              src={candidate.image}
              className={classes.avatar}
            />
          </ListItemAvatar>
          <ListItemText
            primary={candidate.name}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {candidate.headline}
                </Typography>
                {`Current: ${candidate.company}`}
              </React.Fragment>
            }
          />
          <ListItemSecondaryAction>
            <Checkbox
              // onChange={this.handleToggle(value)}
              checked
              value="checkedG"
              classes={{
                root: classes.checkboxRoot,
                checked: classes.checkboxChecked,
              }}
            />
            <IconButton
              color="inherit"
              className={classes.moreActionsButton}
              onClick={this.toggleMoreActionsOnItem}
            >
              <MoreIcon />
            </IconButton>

            <Menu
              id="more-actions-on-item"
              open={!!moreActionsOnItem.anchorEl}
              anchorEl={moreActionsOnItem.anchorEl}
              onClose={this.toggleMoreActionsOnItem}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={this.removeCandidate}>Remove</MenuItem>
              <MenuItem onClick={this.moveCandidateTo}>Move to</MenuItem>
            </Menu>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
      </div>
    );
  }
}

const withMyStyles = withStyles(styles);

export default compose(withMyStyles)(CandidatesItem);
