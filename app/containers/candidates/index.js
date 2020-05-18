/*
* Candidates
*/

import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import injectReducer from 'utils/injectReducer';

import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import {
  makeSelectCandidatesByStatusType,
  makeSelectMoreActionsOnItems,
  makeSelectMoreActionsOnHeader,
} from './selectors';

import reducer from './reducer';
import styles from './styles';
import { toggleMoreActionsOnItem, toggleMoreActionsOnHeader } from './actions';
import CandidatesList from '../../components/candidates-list';

const statuses = [
  {
    type: 'Unsent',
    count: 30,
  },
  {
    type: 'Sent',
    count: 20,
  },
  {
    type: 'Bounced',
    count: 100,
  },
  {
    type: 'Opened',
    count: 30,
  },
  {
    type: 'Replied',
    count: 30,
  },
  {
    type: 'Interviewed',
    count: 30,
  },
  {
    type: 'Offered',
    count: 30,
  },
];

/* eslint-disable react/prefer-stateless-function */
export class Candidates extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  getGridListCols() {
    const { width } = this.props;
    if (isWidthUp('xl', width)) {
      return 6;
    }
    if (isWidthUp('lg', width)) {
      return 5;
    }
    if (isWidthUp('md', width)) {
      return 4;
    }
    if (isWidthUp('sm', width)) {
      return 4;
    }
    if (isWidthUp('xs', width)) {
      return 3;
    }
    return 3;
  }

  render() {
    const {
      classes,
      candidatesByStatusType,
      moreActionsOnItems,
      moreActionsOnHeader,
      onToggleMoreActionsOnItem,
      onToggleMoreActionsOnHeader,
    } = this.props;
    const cols = this.getGridListCols();
    return (
      <div className={classes.root}>
        <Paper className={classes.statusPaper}>
          <GridList cols={cols} className={classes.statusGridList}>
            {statuses.map(status => (
              <GridListTile className={classes.statusTile} key={status.type}>
                <Button size="medium">
                  <div className={classes.statusButton}>
                    <Typography className={classes.statusCount} variant="h5">
                      {status.count}
                    </Typography>
                    <Typography
                      className={classes.statusType}
                      variant="body2"
                      gutterBottom
                    >
                      {status.type}
                    </Typography>
                  </div>
                </Button>
              </GridListTile>
            ))}
          </GridList>
        </Paper>
        <Paper className={classes.paperContainer}>
          <CandidatesList
            candidatesByStatusType={candidatesByStatusType}
            noResultsMessage="No records to display."
            moreActionsOnItems={moreActionsOnItems}
            moreActionsOnHeader={moreActionsOnHeader}
            onToggleMoreActionsOnItem={onToggleMoreActionsOnItem}
            onToggleMoreActionsOnHeader={onToggleMoreActionsOnHeader}
          />
          {candidatesByStatusType.results.length > 0 && (
            <div className={classes.candidatesActions}>
              <Button
                variant="contained"
                color="primary"
                onClick={this.save}
                className={classes.candidatesButtons}
              >
                Send email
              </Button>
            </div>
          )}
        </Paper>
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    onToggleMoreActionsOnItem: (idx, anchorEl) =>
      dispatch(toggleMoreActionsOnItem(idx, anchorEl)),
    onToggleMoreActionsOnHeader: anchorEl =>
      dispatch(toggleMoreActionsOnHeader(anchorEl)),
  };
}

const mapStateToProps = createStructuredSelector({
  candidatesByStatusType: makeSelectCandidatesByStatusType(),
  moreActionsOnItems: makeSelectMoreActionsOnItems(),
  moreActionsOnHeader: makeSelectMoreActionsOnHeader(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'candidates', reducer });

const withStylesCandidates = withStyles(styles);
const withWidthCandidates = withWidth();

export default compose(
  withReducer,
  withConnect,
  withStylesCandidates,
  withWidthCandidates,
)(Candidates);
