/*
 * ConditionItem
 */

import React from 'react';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';

import ListItemText from '@material-ui/core/ListItemText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import Icon from '@material-ui/core/Icon';

import styles from './styles';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

/* eslint-disable react/prefer-stateless-function */
export class ConditionItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.changeComparingValues = this.changeComparingValues.bind(this);
    this.changeField = this.changeField.bind(this);
    this.changeCriteria = this.changeCriteria.bind(this);
    this.addCondition = this.addCondition.bind(this);
    this.removeCondition = this.removeCondition.bind(this);
  }

  changeComparingValues(event) {
    const { index, conditionType, onChangeComparingValues } = this.props;
    const selectedValues = event.target.value;
    onChangeComparingValues(index, conditionType, selectedValues);
  }

  changeField(event) {
    const { index, conditionType, onChangeField } = this.props;
    const changingVal = event.target.value;
    onChangeField(index, conditionType, changingVal);
  }

  changeCriteria(event) {
    console.log('event.target.name: ', event.target.name);
    const { index, conditionType, onChangeCriteria } = this.props;
    const changingVal = event.target.value;
    onChangeCriteria(index, conditionType, changingVal);
  }

  addCondition() {
    const { onAddCondition, conditionType } = this.props;
    onAddCondition(conditionType);
  }

  removeCondition() {
    console.log('removeCondition haha');
    const { onRemoveCondition, index, conditionType } = this.props;
    onRemoveCondition(index, conditionType);
  }

  buildComparingValueItems(
    comparingValueOptions,
    selectedField,
    selectedComparingValues,
  ) {
    const valueOptions = selectedField
      ? comparingValueOptions[selectedField]
      : [];
    const items = [];
    valueOptions.map(subOpt => {
      items.push(
        <MenuItem disabled value="" key={subOpt.header}>
          <em>{subOpt.header}</em>
        </MenuItem>,
      );
      subOpt.values.map(value => {
        items.push(
          <MenuItem key={value} value={value}>
            <Checkbox checked={selectedComparingValues.indexOf(value) > -1} />
            <ListItemText primary={value} />
          </MenuItem>,
        );
      });
    });
    return items;
  }

  render() {
    const { classes, conditionItem, index, currentConditionLen } = this.props;
    const {
      comparingFields,
      comparingCriterias,
      comparingValues,
    } = conditionItem;

    return (
      <div className={classes.root}>
        <FormControl className={classes.fieldControl}>
          <InputLabel
            className={classes.labels}
            htmlFor={comparingFields.header}
          >
            {comparingFields.header}
          </InputLabel>
          <Select
            value={comparingFields.selectedItem || ''}
            className={classes.selects}
            onChange={this.changeField}
            inputProps={{
              name: comparingFields.header,
              id: comparingFields.header,
            }}
          >
            <MenuItem key={comparingFields.header} value="">
              {comparingFields.header}
            </MenuItem>
            {comparingFields.options.map(opt => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.display}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className={classes.criteriaControl}>
          <InputLabel
            className={classes.labels}
            htmlFor={comparingCriterias.header}
          >
            {comparingCriterias.header}
          </InputLabel>
          <Select
            value={comparingCriterias.selectedItem || ''}
            className={classes.selects}
            onChange={this.changeCriteria}
            inputProps={{
              name: comparingCriterias.header,
              id: comparingCriterias.header,
            }}
          >
            <MenuItem key={comparingCriterias.header} value="">
              {comparingCriterias.header}
            </MenuItem>
            {comparingCriterias.options.map(opt => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.display}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className={classes.valueControl}>
          <InputLabel className={classes.labels} htmlFor="select-multiple-chip">
            {comparingValues.header}
          </InputLabel>
          <Select
            multiple
            value={comparingValues.selectedItems}
            className={classes.selects}
            onChange={this.changeComparingValues}
            input={<Input id="select-multiple-chip" />}
            renderValue={selected => (
              <div className={classes.chips}>
                {selected.map(value => (
                  <Chip key={value} label={value} className={classes.chip} />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {this.buildComparingValueItems(
              comparingValues.options,
              comparingFields.selectedItem,
              comparingValues.selectedItems,
            )}
          </Select>
        </FormControl>

        <div className={classes.iconContainer}>
          {currentConditionLen > 1 && (
            <Icon
              className={classes.addRemoveIcon}
              color="secondary"
              onClick={this.removeCondition}
            >
              remove_circle
            </Icon>
          )}
          {index === currentConditionLen - 1 && (
            <Icon
              className={classes.addRemoveIcon}
              color="primary"
              onClick={this.addCondition}
            >
              add_circle
            </Icon>
          )}
        </div>
      </div>
    );
  }
}

const withStylesConditionItem = withStyles(styles);

export default compose(withStylesConditionItem)(ConditionItem);
