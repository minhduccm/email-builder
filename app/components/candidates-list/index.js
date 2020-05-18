/*
* CandidateList
*/
import React from 'react';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import MoreIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import styles from './styles';
import CandidatesItem from '../candidate-item';

/* eslint-disable react/prefer-stateless-function */
export class CandidatesList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.toggleMoreActionsOnItem = this.toggleMoreActionsOnItem.bind(this);
    this.toggleMoreActionsOnHeader = this.toggleMoreActionsOnHeader.bind(this);
  }

  toggleMoreActionsOnItem(idx, anchorEl) {
    const { onToggleMoreActionsOnItem } = this.props;
    onToggleMoreActionsOnItem(idx, anchorEl);
  }

  toggleMoreActionsOnHeader(event) {
    const { onToggleMoreActionsOnHeader } = this.props;
    const { currentTarget } = event;
    onToggleMoreActionsOnHeader(currentTarget);
  }

  render() {
    const {
      classes,
      candidatesByStatusType,
      noResultsMessage,
      moreActionsOnItems,
      moreActionsOnHeader,
    } = this.props;
    return (
      <div className={classes.root}>
        {candidatesByStatusType.results.length === 0 ? (
          <Typography component="p" className={classes.noResults}>
            {noResultsMessage}
          </Typography>
        ) : (
          <div>
            <div className={classes.candidatesListHeader}>
              <Typography component="p">{`Total: ${
                candidatesByStatusType.total
              }`}</Typography>
              <div className={classes.selectAll}>
                <Typography component="p">select all</Typography>
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
                  onClick={this.toggleMoreActionsOnHeader}
                >
                  <MoreIcon />
                </IconButton>

                <Menu
                  id="more-actions-on-item"
                  open={!!moreActionsOnHeader.anchorEl}
                  anchorEl={moreActionsOnHeader.anchorEl}
                  onClose={this.toggleMoreActionsOnHeader}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem onClick={this.removeAllCandidates}>
                    Remove all
                  </MenuItem>
                  <MenuItem onClick={this.moveAllCandidatesTo}>
                    Move all to
                  </MenuItem>
                </Menu>
              </div>
            </div>
            <List>
              <Divider />
              {candidatesByStatusType &&
                candidatesByStatusType.results.map((candidate, idx) => (
                  <CandidatesItem
                    key={candidate.id}
                    candidate={candidate}
                    idx={idx}
                    moreActionsOnItem={moreActionsOnItems[idx]}
                    onToggleMoreActionsOnItem={this.toggleMoreActionsOnItem}
                  />
                ))}
            </List>
          </div>
        )}
      </div>
    );
  }
}

const withMyStyles = withStyles(styles);

export default compose(withMyStyles)(CandidatesList);
