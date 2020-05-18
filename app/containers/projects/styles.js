const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '80%', // TODO: using media query in order to adjust this percentage
    // height: 450,
  },
  listTile: {
    height: 'auto !important',
  },
  subHeaderListTile: {
    height: 'auto !important',
  },
  subHeaderContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
  },
  subHeader: {
    fontSize: 20,
    paddingLeft: 0,
    paddingRight: 0,
    margin: 0,
    color: '#1565c0',
  },
  card: {
    // maxWidth: 245,
    margin: 20,
  },
  projectInfo: {
    background: 'linear-gradient(#70def7, #8fb9fb)',
  },
  actions: {
    display: 'flex',
    padding: '8px 4px',
    boxSizing: 'border-box',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  shortDesc: {
    height: 70,
    overflow: 'scroll',
  },
  addFab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
    backgroundColor: '#149cff',
  },
});

export default styles;
