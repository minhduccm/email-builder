const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'center',
  },
  statusPaper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    overflow: 'hidden',
    width: '80%',
    margin: 5,
  },
  statusGridList: {
    width: '80%',
  },
  statusTile: {
    textAlign: 'center',
    height: 'auto !important',
  },
  statusButton: {
    display: 'flex',
    flexDirection: 'column',
  },
  statusCount: {
    color: '#f76f34',
  },
  statusType: {
    color: '#f76f34',
  },

  paperContainer: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: '80%',

    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    margin: 5,
  },
  candidatesActions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  candidatesButtons: {
    marginLeft: 10,
    backgroundColor: '#149cff',
  },
});

export default styles;
