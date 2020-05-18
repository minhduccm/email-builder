/*
* ProfilesList
*/
import React from 'react';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import styles from './styles';

/* eslint-disable react/prefer-stateless-function */
export class ProfilesList extends React.PureComponent {
  render() {
    const { classes, profilesList, noResultsMessage } = this.props;
    return (
      <div className={classes.root}>
        {profilesList.results.length === 0 ? (
          <Typography component="p" className={classes.noResults}>
            {noResultsMessage}
          </Typography>
        ) : (
          <div>
            <div className={classes.profilesListHeader}>
              <Typography component="p">{`Total: ${
                profilesList.total
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
              </div>
            </div>
            <List>
              <Divider />
              {profilesList &&
                profilesList.results.map(profile => (
                  <div>
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
                            <Typography
                              component="span"
                              className={classes.inline}
                              color="textPrimary"
                            >
                              {profile.headline}
                            </Typography>
                            {`Current: ${profile.company}`}
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
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                  </div>
                ))}
            </List>
          </div>
        )}
      </div>
    );
  }
}

const withStylesProfilesList = withStyles(styles);

export default compose(withStylesProfilesList)(ProfilesList);
