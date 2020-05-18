const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    backgroundColor: 'aliceblue',
  },
  introSection: {
    color: 'cornflowerblue',
    fontSize: '24px',
    fontWeight: 'bold',
    margin: 20,
  },
  upperSection: {
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 12,
  },
  titleSection: {
    flex: 1,

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    '&:hover': {
      border: '1px solid #d0d0d0',
    },
  },
  emailTitle: {
    flex: 1,
    padding: 3,
    fontSize: 25,
    fontWeight: 500,
  },
  saveBtn: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 20,
  },
  paperContainer: {
    width: '80%',
    margin: 0,
    flex: 1,

    display: 'flex',
    flexDirection: 'column',
    marginBottom: 12,
  },
  headerBar: {},
  headerToolbar: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editor: {
    flex: 1,
    overflow: 'scroll',
    padding: 15,
  },
});

export default styles;
