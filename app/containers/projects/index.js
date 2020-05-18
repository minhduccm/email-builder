/*
* Projects page
*/

import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
import injectReducer from 'utils/injectReducer';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

import projectsReducer from './reducer';
import styles from './styles';
import { closeNewProjectDialog, openNewProjectDialog } from './actions';

import { makeSelectIsOpenNewProjectDialog } from './selectors';
import NewProjectDialog from '../../components/new-project-dialog';

/* eslint-disable react/prefer-stateless-function */
export class Projects extends React.PureComponent {
  constructor(props) {
    super(props);
    this.openNewProjectDialog = this.openNewProjectDialog.bind(this);
    this.navigateToSegmentBuilder = this.navigateToSegmentBuilder.bind(this);
  }

  openNewProjectDialog() {
    this.props.onOpenNewProjectDialog();
  }

  navigateToSegmentBuilder() {
    const { history, onCloseNewProjectDialog } = this.props;
    onCloseNewProjectDialog();
    history.push('/segment-builder');
  }

  getGridListCols() {
    const { width } = this.props;
    if (isWidthUp('xl', width)) {
      return 3;
    }
    if (isWidthUp('lg', width)) {
      return 3;
    }
    if (isWidthUp('md', width)) {
      return 3;
    }
    if (isWidthUp('sm', width)) {
      return 2;
    }
    if (isWidthUp('xs', width)) {
      return 1;
    }
    return 1;
  }

  render() {
    const {
      classes,
      isOpenNewProjectDialog,
      onCloseNewProjectDialog,
    } = this.props;
    const cols = this.getGridListCols();
    return (
      <div className={classes.root}>
        <GridList cols={cols} className={classes.gridList}>
          <GridListTile
            key="subHeader"
            cols={cols}
            className={classes.subHeaderListTile}
          >
            <div className={classes.subHeaderContainer}>
              <ListSubheader className={classes.subHeader} component="h2">
                Projects
              </ListSubheader>
            </div>
          </GridListTile>

          <GridListTile className={classes.listTile}>
            <Card className={classes.card}>
              <CardActionArea className={classes.projectInfo}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Backend Engineer
                  </Typography>
                  <Typography component="p" className={classes.shortDesc}>
                    Lizards are a widespread group of squamate
                    reptiles,cafafdagkfhgkjf fdafdafddafdmmjjfdahfdkakhdak
                    fdkafdkajhfajfjafk fdkafdkajhfajfjafk
                    fdafdafddafdmmjjfdahfdkakhdakdf fdafdafda
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions className={classes.actions}>
                <Button size="small" color="primary">
                  Candidates
                </Button>
                <Button size="small" color="primary">
                  Update
                </Button>
              </CardActions>
            </Card>
          </GridListTile>

          <GridListTile className={classes.listTile}>
            <Card className={classes.card}>
              <CardActionArea className={classes.projectInfo}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Backend Engineer
                  </Typography>
                  <Typography component="p" className={classes.shortDesc}>
                    Lizards are a widespread group of squamate
                    reptiles,cafafdagkfhgkjf fdafdafddafdmmjjfdahfdkakhdak
                    fdkafdkajhfajfjafk fdkafdkajhfajfjafk
                    fdafdafddafdmmjjfdahfdkakhdakdf fdafdafda
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions className={classes.actions}>
                <Button size="small" color="primary">
                  Candidates
                </Button>
                <Button size="small" color="primary">
                  Update
                </Button>
              </CardActions>
            </Card>
          </GridListTile>

          <GridListTile className={classes.listTile}>
            <Card className={classes.card}>
              <CardActionArea className={classes.projectInfo}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Backend Engineer
                  </Typography>
                  <Typography component="p" className={classes.shortDesc}>
                    Lizards are a widespread group of squamate
                    reptiles,cafafdagkfhgkjf fdafdafddafdmmjjfdahfdkakhdak
                    fdkafdkajhfajfjafk fdkafdkajhfajfjafk
                    fdafdafddafdmmjjfdahfdkakhdakdf fdafdafda
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions className={classes.actions}>
                <Button size="small" color="primary">
                  Candidates
                </Button>
                <Button size="small" color="primary">
                  Update
                </Button>
              </CardActions>
            </Card>
          </GridListTile>
        </GridList>

        <Fab
          className={classes.addFab}
          color="primary"
          onClick={this.openNewProjectDialog}
        >
          <AddIcon />
        </Fab>

        <NewProjectDialog
          isOpenNewProjectDialog={isOpenNewProjectDialog}
          onCloseNewProjectDialog={onCloseNewProjectDialog}
          onNavigateToSegmentBuilder={this.navigateToSegmentBuilder}
        />
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    onCloseNewProjectDialog: () => dispatch(closeNewProjectDialog()),
    onOpenNewProjectDialog: () => dispatch(openNewProjectDialog()),
  };
}

const mapStateToProps = createStructuredSelector({
  isOpenNewProjectDialog: makeSelectIsOpenNewProjectDialog(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({
  key: 'projects',
  reducer: projectsReducer,
});

const withStylesProjects = withStyles(styles);
const withWidthProjects = withWidth();

export default compose(
  withReducer,
  withConnect,
  withStylesProjects,
  withWidthProjects,
)(Projects);
