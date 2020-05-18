/*
 * EmailTemplates
 */

import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
import injectReducer from 'utils/injectReducer';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import {
  makeSelectPagingSkip,
  makeSelectEmailTemplatesList,
  makeSelectExpandedEmailTplId,
  makeSelectIsDeletionConfirmationOpened,
  makeSelectManipulatingEmailTplId,
} from './selectors';

import reducer from './reducer';
import styles from './styles';
import {
  expandEmailTemplate,
  toggleDeletionConfirmationDialog,
} from './actions';
import {
  getEmailTemplatesListThunk,
  deleteEmailTemplateThunk,
} from './middlewares';
import { INITIAL_PAGING_SKIP, PAGING_LIMIT } from '../../common/constants';
import EmailTemplatesList from '../../components/email-templates-list';
import ConfirmationDialog from '../../components/confirmation-dialog';

/* eslint-disable react/prefer-stateless-function */
export class EmailTemplates extends React.PureComponent {
  constructor(props) {
    super(props);
    this.clickUpdateEmailTplBtn = this.clickUpdateEmailTplBtn.bind(this);
    this.clickDeleteEmailTplBtn = this.clickDeleteEmailTplBtn.bind(this);
    this.confirmEmailTplDeletion = this.confirmEmailTplDeletion.bind(this);
    this.loadEmailTplsMore = this.loadEmailTplsMore.bind(this);
    this.clickCreateEmailTpl = this.clickCreateEmailTpl.bind(this);
  }

  componentDidMount() {
    console.log('componentDidMount');
    const { onGetEmailTemplatesList } = this.props;
    onGetEmailTemplatesList(INITIAL_PAGING_SKIP, PAGING_LIMIT, false);
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
  }

  loadEmailTplsMore() {
    const { onGetEmailTemplatesList, emailTemplatesList } = this.props;
    const { skip, limit } = emailTemplatesList;
    onGetEmailTemplatesList(skip + limit, limit, true);
  }

  clickUpdateEmailTplBtn(emailTplId) {
    const { history } = this.props;
    history.push(`/email-templates/${emailTplId}`);
  }

  clickDeleteEmailTplBtn(emailTplId) {
    const { onToggleDeletionConfirmationDialog } = this.props;
    onToggleDeletionConfirmationDialog(emailTplId);
  }

  confirmEmailTplDeletion() {
    const {
      manipulatingEmailTplId,
      onClickDeleteEmailTplBtn,
      onToggleDeletionConfirmationDialog,
    } = this.props;
    onToggleDeletionConfirmationDialog(manipulatingEmailTplId);
    onClickDeleteEmailTplBtn(manipulatingEmailTplId);
  }

  clickCreateEmailTpl() {
    const { history } = this.props;
    history.push(`/email-templates/new`);
  }

  render() {
    console.log('render');
    const {
      classes,
      isDeletionConfirmationOpened,
      emailTemplatesList,
      expandedEmailTplId,
      onExpandEmailTemplate,
      onToggleDeletionConfirmationDialog,
    } = this.props;
    return (
      <div className={classes.root}>
        <EmailTemplatesList
          emailTemplatesList={emailTemplatesList}
          expandedEmailTplId={expandedEmailTplId}
          onExpandEmailTemplate={onExpandEmailTemplate}
          onClickUpdateEmailTplBtn={this.clickUpdateEmailTplBtn}
          onClickDeleteEmailTplBtn={this.clickDeleteEmailTplBtn}
          onLoadEmailTplsMore={this.loadEmailTplsMore}
        />
        <ConfirmationDialog
          isOpenedDialog={isDeletionConfirmationOpened}
          confirmationMessage="Are you sure to delete this email template?"
          onCancel={onToggleDeletionConfirmationDialog}
          onConfirm={this.confirmEmailTplDeletion}
        />
        <Fab
          className={classes.addFab}
          color="primary"
          onClick={this.clickCreateEmailTpl}
        >
          <AddIcon />
        </Fab>
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    onGetEmailTemplatesList: (skip, limit, isLoadingMore) =>
      dispatch(getEmailTemplatesListThunk(skip, limit, isLoadingMore)),
    onExpandEmailTemplate: emailTplId =>
      dispatch(expandEmailTemplate(emailTplId)),
    onClickDeleteEmailTplBtn: emailTplId =>
      dispatch(deleteEmailTemplateThunk(emailTplId)),
    onToggleDeletionConfirmationDialog: (emailTplId) =>
      dispatch(toggleDeletionConfirmationDialog(emailTplId)),
  };
}

const mapStateToProps = createStructuredSelector({
  pagingSkip: makeSelectPagingSkip(),
  emailTemplatesList: makeSelectEmailTemplatesList(),
  expandedEmailTplId: makeSelectExpandedEmailTplId(),
  isDeletionConfirmationOpened: makeSelectIsDeletionConfirmationOpened(),
  manipulatingEmailTplId: makeSelectManipulatingEmailTplId(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'emailTemplates', reducer });

const withStylesEmailTemplates = withStyles(styles);

export default compose(
  withReducer,
  withConnect,
  withStylesEmailTemplates,
)(EmailTemplates);
