/*
 * SearchPage
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

import injectReducer from 'utils/injectReducer';
import {
  makeSelectSearchTerm,
  makeSelectProfilesList,
} from './selectors';

// import messages from './messages';
import { search } from './actions';
import { getProfilesListThunk } from './middlewares';
import reducer from './reducer';
import { INITIAL_PAGING_SKIP, PAGING_LIMIT } from '../../common/constants';

import styles from './styles';
import SegmentBuilder from '../segment-builder';

/* eslint-disable react/prefer-stateless-function */
export class SearchPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    this.props.onGetProfilesList(INITIAL_PAGING_SKIP, PAGING_LIMIT);
  }

  search() {

  }

  render() {
    const { classes, profilesList } = this.props;
    return (
      <div>
        <Paper className={classes.root} elevation={1}>
          <h1>This is the search page of awesome product</h1>

          <TextField
            id="outlined-full-width"
            label="Search"
            className={classes.textField}
            placeholder="Quick search with name. For advanced search with more complicated conditions, you should use the following segmentation builder."
            // helperText="Full width!"
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />

          <SegmentBuilder />

          <List className={classes.root}>
            { profilesList && profilesList.results.map((profile) => (
                <ListItem key={profile.id} alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      alt={profile.name}
                      src={profile.image}
                      className={classes.avatar}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={profile.name}
                    secondary={
                      <React.Fragment>
                        <Typography component="span" className={classes.inline} color="textPrimary">
                          {profile.headline}
                        </Typography>
                        {`Current: ${profile.company}`}
                      </React.Fragment>
                    }
                  />
                </ListItem>
              ))
            }
          </List>
        </Paper>
      </div>
    );
  }
}

// HomePage.propTypes = {
//   loading: PropTypes.bool,
//   error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
//   repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
//   onSubmitForm: PropTypes.func,
//   username: PropTypes.string,
//   onChangeUsername: PropTypes.func,
// };

export function mapDispatchToProps(dispatch) {
  return {
    onSearch: (searchTerm) => dispatch(search(searchTerm)),
    onGetProfilesList: (skip, limit) => dispatch(getProfilesListThunk(skip, limit)),
  };
}

const mapStateToProps = createStructuredSelector({
  searchTerm: makeSelectSearchTerm(),
  profilesList: makeSelectProfilesList(),
});


const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'search', reducer });

const withStylesSearchPage = withStyles(styles);

export default compose(
  withReducer,
  withConnect,
  withStylesSearchPage,
)(SearchPage);