import green from '@material-ui/core/colors/green';

const styles = theme => ({
  checkboxRoot: {
    color: green[600],
    '&$checked': {
      color: green[500],
    },
  },
  checkboxChecked: {},
  moreActionsButton: {
    padding: 0,
  },
});

export default styles;


