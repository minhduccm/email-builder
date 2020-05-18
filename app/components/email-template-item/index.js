/*
* EmailTemplateItem
*/
import React from 'react';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';

import { EditorState, convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

import styles from './styles';
// import CandidatesItem from '../candidate-item';

/* eslint-disable react/prefer-stateless-function */
export class EmailTemplateItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.expandEmailTemplate = this.expandEmailTemplate.bind(this);
    this.clickUpdateEmailTplBtn = this.clickUpdateEmailTplBtn.bind(this);
    this.clickDeleteEmailTplBtn = this.clickDeleteEmailTplBtn.bind(this);
  }

  expandEmailTemplate() {
    const { emailTemplate, onExpandEmailTemplate } = this.props;
    onExpandEmailTemplate(emailTemplate.emailTplId);
  }

  clickUpdateEmailTplBtn(e) {
    const { emailTemplate, onClickUpdateEmailTplBtn } = this.props;
    onClickUpdateEmailTplBtn(emailTemplate.emailTplId);
    e.stopPropagation();
  }

  clickDeleteEmailTplBtn(e) {
    const { emailTemplate, onClickDeleteEmailTplBtn } = this.props;
    onClickDeleteEmailTplBtn(emailTemplate.emailTplId);
    e.stopPropagation();
  }

  render() {
    const { classes, emailTemplate, expandedEmailTplId } = this.props;
    const editorState = EditorState.createWithContent(
      convertFromRaw(JSON.parse(emailTemplate.content)),
    );
    const editorContentHtml = stateToHTML(editorState.getCurrentContent());
    return (
      <div className={classes.root}>
        <ExpansionPanel
          square
          expanded={expandedEmailTplId === emailTemplate.emailTplId}
          onChange={this.expandEmailTemplate}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <div className={classes.emailTplHeader}>
              <Typography className={classes.title}>
                {emailTemplate.title}
              </Typography>
              <div className={classes.actionIcons}>
                <IconButton onClick={this.clickUpdateEmailTplBtn}>
                  <Icon
                    className={classes.addRemoveIcon}
                    color="primary"
                    fontSize="small"
                  >
                    edit
                  </Icon>
                </IconButton>
                <IconButton onClick={this.clickDeleteEmailTplBtn}>
                  <Icon
                    className={classes.addRemoveIcon}
                    color="secondary"
                    fontSize="small"
                  >
                    delete_forever
                  </Icon>
                </IconButton>
              </div>
            </div>
          </ExpansionPanelSummary>
          <Divider className={classes.divider} />
          <ExpansionPanelDetails>
            <div dangerouslySetInnerHTML={{ __html: editorContentHtml }} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

const withMyStyles = withStyles(styles);

export default compose(withMyStyles)(EmailTemplateItem);
