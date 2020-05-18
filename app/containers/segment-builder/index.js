/*
 * SegmentBuilder
 */

import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
import injectReducer from 'utils/injectReducer';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

import {
  makeSelectRequiredConditions,
  makeSelectOptionalConditions,
  makeSelectProfilesList,
  makeSelectSearchTerm,
  makeSelectPagingSkip,
} from './selectors';

import reducer from './reducer';
import styles from './styles';
import {
  changeComparingValues,
  changeField,
  changeCriteria,
  addCondition,
  removeCondition,
} from './actions';
import ConditionItem from '../../components/condition-item';
import ProfilesList from '../../components/profiles-list';
import { getProfilesListThunk } from './middlewares';
import { PAGING_LIMIT } from '../../common/constants';

/* eslint-disable react/prefer-stateless-function */
export class SegmentBuilder extends React.PureComponent {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.save = this.save.bind(this);
  }

  buildLeanedConditions(conditions) {
    return conditions.reduce((res, item) => {
      const { comparingFields, comparingCriterias, comparingValues } = item;
      if (
        !comparingFields.selectedItem ||
        !comparingCriterias.selectedItem ||
        !comparingValues.selectedItems.length
      ) {
        return res;
      }
      return [
        ...res,
        {
          field: comparingFields.selectedItem,
          criteria: comparingCriterias.selectedItem,
          values: comparingValues.selectedItems,
        },
      ];
    }, []);
  }

  search() {
    const {
      pagingSkip,
      searchTerm,
      requiredConditions,
      optionalConditions,
      onGetProfilesList,
    } = this.props;
    const requiredLeanedConds = this.buildLeanedConditions(requiredConditions);
    const optionalLeanedConds = this.buildLeanedConditions(optionalConditions);

    onGetProfilesList(
      pagingSkip,
      PAGING_LIMIT,
      searchTerm,
      requiredLeanedConds,
      optionalLeanedConds,
    );
  }

  save() {}

  render() {
    const {
      classes,
      requiredConditions,
      optionalConditions,
      profilesList,
    } = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.paperContainer} elevation={1}>
          <TextField
            id="outlined-full-width"
            label="Search"
            className={classes.searchField}
            placeholder="Quick search with name."
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />

          <fieldset className={classes.optionalConds}>
            <legend>Required conditions</legend>
            {requiredConditions.map((cond, idx) => (
              <ConditionItem
                key={idx}
                index={idx}
                currentConditionLen={requiredConditions.length}
                conditionItem={cond}
                conditionType="requiredConditions"
                onChangeField={this.props.onChangeField}
                onChangeCriteria={this.props.onChangeCriteria}
                onChangeComparingValues={this.props.onChangeComparingValues}
                onAddCondition={this.props.onAddCondition}
                onRemoveCondition={this.props.onRemoveCondition}
              />
            ))}
          </fieldset>

          <fieldset className={classes.optionalConds}>
            <legend>Optional conditions</legend>
            {optionalConditions.map((cond, idx) => (
              <ConditionItem
                key={idx}
                index={idx}
                currentConditionLen={optionalConditions.length}
                conditionItem={cond}
                conditionType="optionalConditions"
                onChangeField={this.props.onChangeField}
                onChangeCriteria={this.props.onChangeCriteria}
                onChangeComparingValues={this.props.onChangeComparingValues}
                onAddCondition={this.props.onAddCondition}
                onRemoveCondition={this.props.onRemoveCondition}
              />
            ))}
          </fieldset>

          <div className={classes.segmentActions}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.save}
              className={classes.segmentButton}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={this.search}
              className={classes.segmentButton}
            >
              Search
            </Button>
          </div>
        </Paper>

        <Paper className={classes.paperContainer}>
          <ProfilesList
            profilesList={profilesList}
            noResultsMessage="No results."
          />
          {profilesList.results.length > 0 && (
            <div className={classes.segmentActions}>
              <Button
                variant="contained"
                color="primary"
                onClick={this.save}
                className={classes.segmentButton}
              >
                Review candidates
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
    onChangeField: (idx, conditionType, changingVal) =>
      dispatch(changeField(idx, conditionType, changingVal)),
    onChangeCriteria: (idx, conditionType, changingVal) =>
      dispatch(changeCriteria(idx, conditionType, changingVal)),
    onChangeComparingValues: (idx, conditionType, selectedValues) =>
      dispatch(changeComparingValues(idx, conditionType, selectedValues)),
    onAddCondition: conditionType => dispatch(addCondition(conditionType)),
    onRemoveCondition: (index, conditionType) =>
      dispatch(removeCondition(index, conditionType)),

    onGetProfilesList: (
      skip,
      limit,
      searchTerm,
      requiredLeanedConds,
      optionalLeanedConds,
    ) =>
      dispatch(
        getProfilesListThunk(
          skip,
          limit,
          searchTerm,
          requiredLeanedConds,
          optionalLeanedConds,
        ),
      ),
  };
}

const mapStateToProps = createStructuredSelector({
  requiredConditions: makeSelectRequiredConditions(),
  optionalConditions: makeSelectOptionalConditions(),
  profilesList: makeSelectProfilesList(),
  searchTerm: makeSelectSearchTerm(),
  pagingSkip: makeSelectPagingSkip(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'segmentBuilder', reducer });

const withStylesSegmentBuilder = withStyles(styles);

export default compose(
  withReducer,
  withConnect,
  withStylesSegmentBuilder,
)(SegmentBuilder);
