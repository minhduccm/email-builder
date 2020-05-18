const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    height: 55,
  },
  fieldControl: {
    marginLeft: '1%',
    width: '20%',
  },
  criteriaControl: {
    marginLeft: '2%',
    width: '20%',
  },
  valueControl: {
    marginLeft: '2%',
    width: '40%',
  },
  labels: {
    fontSize: 14,
  },
  selects: {
    height: 30,
    fontSize: 14,
  },
  chips: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflow: 'scroll',
  },
  chip: {
    margin: theme.spacing.unit / 4,
    height: 22,
  },
  noLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  iconContainer: {
    width: '12%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: '2%',
    marginRight: '1%',
  },
  addRemoveIcon: {
    fontSize: 30,
    color: '#149cff',
  },
});

export default styles;
