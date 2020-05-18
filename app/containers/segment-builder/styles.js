const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'center',
  },
  paperContainer: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: '80%',
    margin: 0,

    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    // alignItems: 'center',
  },
  searchField: {
    marginBottom: 10,
    width: '100%',
  },
  requiredConds: {
    marginBottom: 10,
    width: '100%',
  },
  optionalConds: {
    marginBottom: 10,
    width: '100%',
  },
  segmentActions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  segmentButton: {
    marginLeft: 10,
    backgroundColor: '#149cff',
  },
});

export default styles;
