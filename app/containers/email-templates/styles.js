const styles = theme => ({
  root: {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',

    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    // height: 726,
  },
  addFab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
    backgroundColor: '#149cff',
  },
});

export default styles;
