import green from '@material-ui/core/colors/green';

const styles = theme => ({
  root: {
    width: '100%',
  },
  noResults: {
    textAlign: 'center',
  },
  checkboxRoot: {
    color: green[600],
    '&$checked': {
      color: green[500],
    },
  },
  checkboxChecked: {},
  profilesListHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectAll: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 5,
  },
});

export default styles;
