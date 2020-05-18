/*
* HeaderStyleDropdown
*/

import React from 'react';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

import styles from './styles';

class HeaderStyleDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.onToggle = this.onToggle.bind(this);
  }

  onToggle(event) {
    const { value } = event.target;
    this.props.onToggle(value);
  }

  render() {
    const { headerOptions, classes } = this.props;
    return (
      <FormControl className={classes.formControl}>
        <NativeSelect
          defaultValue=""
          onChange={this.onToggle}
          input={<Input name="name" id="uncontrolled-native" />}
        >
          <option value="">Header Levels</option>
          {headerOptions.map(heading => (
            <option value={heading.style} key={heading.style}>
              {heading.label}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    );
  }
}

const withMyStyles = withStyles(styles);
export default compose(withMyStyles)(HeaderStyleDropdown);
