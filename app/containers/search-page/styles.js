const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 1000,
    backgroundColor: theme.palette.background.paper,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 'calc(100% - 15px)', // for some reasons, margin caused overflow so needed to calculate width here
  },
  inline: {
    display: 'inline',
  },
  avatar: {
    margin: 5,
    width: 60,
    height: 60,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
});

export default styles;