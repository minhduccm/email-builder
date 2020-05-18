/*
* EmailBuidler
* Notes for Editor rich text:
* 1. The order of execution of commands: common commands -> commands binded to plugins in order of declaration (ex: highlight -> add link) -> onChangeEditorState
* 2. Don't return 'handled' in command handler unless we do want to halt the above execution flow at some point -> return nothing or 'not-handle' in order flow to continue.
*/

import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
import injectReducer from 'utils/injectReducer';

import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';

import {
  RichUtils,
  EditorState,
  KeyBindingUtil,
  AtomicBlockUtils,
  convertToRaw,
  Modifier,
} from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createHighlightPlugin from './editor-plugins/highlight';
import addLinkPlugin from './editor-plugins/add-link';

import {
  makeSelectEditorState,
  makeSelectEmailTplId,
  makeSelectTitle,
  makeSelectIsInfoDialogOpened,
} from './selectors';

import reducer from './reducer';
import styles from './styles';
import { handleKeyCommand, changeEditor, changeTitle, toggleInfoDialog } from './actions';

import {
  updateEmailTplThunk,
  createEmailTplThunk,
  getEmailTplByIdThunk,
} from './middlewares';

import BlockStyleToolbar, {
  getBlockStyle,
} from '../../components/block-style-toolbar';
import { mediaBlockRenderer } from '../../components/media-block-renderer';
import InformationDialog from '../../components/information-dialog';

const fields = ['name', 'company'];
const Placeholder = props => (
    <span
      style={{
        color: 'rgba(0, 0, 0, 0.87)',
        border: 'none',
        borderRadius: 16,
        backgroundColor: '#e0e0e0',
        padding: '1px 8px 2px 8px',
      }}
      data-offset-key={props.offsetKey}
    >
      {props.children}
    </span>
  );

/* eslint-disable react/prefer-stateless-function */
export class EmailBuidler extends React.PureComponent {
  constructor(props) {
    super(props);
    this.clickUnderlineBtn = this.clickUnderlineBtn.bind(this);
    this.clickBoldBtn = this.clickBoldBtn.bind(this);
    this.clickItalicBtn = this.clickItalicBtn.bind(this);
    this.clickHighlightBtn = this.clickHighlightBtn.bind(this);
    this.clickAddLinkBtn = this.clickAddLinkBtn.bind(this);
    this.clickSaveBtn = this.clickSaveBtn.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.changeField = this.changeField.bind(this);
    this.toggleBlockType = this.toggleBlockType.bind(this);
    this.onAddImage = this.onAddImage.bind(this);
    this.handleKeyCommandForCommonCommands = this.handleKeyCommandForCommonCommands.bind(
      this,
    );
    this.handleKeyCommandForHighlightPlugin = this.handleKeyCommandForHighlightPlugin.bind(
      this,
    );
    this.handleKeyCommandForAddLink = this.handleKeyCommandForAddLink.bind(
      this,
    );
    this.keyBindingFnForAddLink = this.keyBindingFnForAddLink.bind(this);
    this.focus = this.focus.bind(this);

    const highlightPlugin = createHighlightPlugin();
    highlightPlugin.handleKeyCommand = this.handleKeyCommandForHighlightPlugin;

    addLinkPlugin.handleKeyCommand = this.handleKeyCommandForAddLink;
    addLinkPlugin.keyBindingFn = this.keyBindingFnForAddLink;
    this.plugins = [highlightPlugin, addLinkPlugin];
  }

  componentDidMount() {
    const { match, onGetEmailTplById } = this.props;
    const { emailTplId } = match.params;
    if (emailTplId) {
      onGetEmailTplById(emailTplId);
    }
  }

  findPlaceholders(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges(character => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'PLACEHOLDER'
      );
    }, callback);
  }

  keyBindingFnForAddLink(event) {
    // NOTE: don't return null or '' or anything else that is not equal 'add-link' (the supported command type)
    const { editorState } = this.props;
    const selection = editorState.getSelection();
    if (
      !selection.isCollapsed() &&
      KeyBindingUtil.hasCommandModifier(event) &&
      event.which === 75
    ) {
      return 'add-link';
    }
  }

  handleKeyCommandForAddLink(command) {
    console.log('handleKeyCommandForAddLink');
    if (command === 'add-link') {
      const { onChangeEditor, editorState } = this.props;
      const link = window.prompt('Paste the link -');
      const selection = editorState.getSelection();
      if (!link) {
        onChangeEditor(RichUtils.toggleLink(editorState, selection, null));
        return;
      }
      const content = editorState.getCurrentContent();
      const contentWithEntity = content.createEntity('LINK', 'MUTABLE', {
        url: link,
      });
      const newEditorState = EditorState.push(
        editorState,
        contentWithEntity,
        'create-entity',
      );
      const entityKey = contentWithEntity.getLastCreatedEntityKey();
      onChangeEditor(
        RichUtils.toggleLink(newEditorState, selection, entityKey),
      );
    }
  }

  clickUnderlineBtn() {
    const { onChangeEditor, editorState } = this.props;
    onChangeEditor(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
  }

  clickBoldBtn() {
    const { onChangeEditor, editorState } = this.props;
    onChangeEditor(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  }

  clickItalicBtn() {
    const { onChangeEditor, editorState } = this.props;
    onChangeEditor(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
  }

  clickHighlightBtn() {
    const { onChangeEditor, editorState } = this.props;
    onChangeEditor(RichUtils.toggleInlineStyle(editorState, 'HIGHLIGHT'));
  }

  clickAddLinkBtn() {
    const { editorState, onChangeEditor } = this.props;
    const selection = editorState.getSelection();
    const link = window.prompt('Paste the link -');
    if (!link) {
      onChangeEditor(RichUtils.toggleLink(editorState, selection, null));
      return;
    }
    const content = editorState.getCurrentContent();
    const contentWithEntity = content.createEntity('LINK', 'MUTABLE', {
      url: link,
    });
    const newEditorState = EditorState.push(
      editorState,
      contentWithEntity,
      'create-entity',
    );
    const entityKey = contentWithEntity.getLastCreatedEntityKey();
    onChangeEditor(RichUtils.toggleLink(newEditorState, selection, entityKey));
  }

  handleKeyCommandForCommonCommands(command) {
    console.log('handleKeyCommandForCommonCommands: ', command);
    // BOLD, ITALIC, UNDERLINE
    this.props.onHandleKeyCommand(command);
    // return "handled";
  }

  handleKeyCommandForHighlightPlugin(command) {
    console.log('handleKeyCommandForHighlightPlugin');
    if (command === 'highlight') {
      const { onChangeEditor, editorState } = this.props;
      onChangeEditor(RichUtils.toggleInlineStyle(editorState, 'HIGHLIGHT'));
    }
  }

  toggleBlockType(blockType) {
    const { onChangeEditor, editorState } = this.props;
    const editor = RichUtils.toggleBlockType(editorState, blockType);
    onChangeEditor(editor);
  }

  onAddImage(e) {
    e.preventDefault();
    const { editorState, onChangeEditor } = this.props;
    const urlValue = window.prompt('Paste Image Link');
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'image',
      'IMMUTABLE',
      { src: urlValue },
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(
      editorState,
      { currentContent: contentStateWithEntity },
      'create-entity',
    );
    onChangeEditor(
      AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '),
    );
  }

  clickSaveBtn() {
    const {
      editorState,
      title,
      emailTplId,
      onUpdateEmailTpl,
      onCreateEmailTpl,
    } = this.props;
    const contentState = editorState.getCurrentContent();
    const emailTpl = {
      title,
      content: JSON.stringify(convertToRaw(contentState)),
    };
    if (emailTplId) {
      emailTpl.emailTplId = emailTplId;
      onUpdateEmailTpl(emailTpl);
      return;
    }
    onCreateEmailTpl(emailTpl);
  }

  changeTitle(e) {
    const { onChangeTitle } = this.props;
    const title = e.target.value;
    onChangeTitle(title);
  }

  focus() {
    this.refs.editor.focus();
  }

  changeField(e) {
    const { editorState, onChangeEditor } = this.props;
    const { value } = e.target;

    const currentContent = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const contentStateWithEntity = currentContent.createEntity(
      'PLACEHOLDER',
      'IMMUTABLE',
      { value },
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const textWithEntity = Modifier.insertText(
      currentContent,
      selection,
      value,
      null,
      entityKey,
    );

    const newEditorState = EditorState.push(
      editorState,
      textWithEntity,
      'insert-characters',
    );
    onChangeEditor(newEditorState);
  }

  render() {
    const { classes, editorState, onChangeEditor, title, isInfoDialogOpened, onToggleInfoDialog } = this.props;
    const decorators = [
      {
        strategy: this.findPlaceholders,
        component: Placeholder,
      },
    ];

    return (
      <div className={classes.root}>
        <div className={classes.introSection}>
          THE FIRST EMAIL BUILDER ON ARWEAVE BLOCKCHAIN
        </div>
        <div className={classes.upperSection}>
          <div className={classes.titleSection}>
            <InputBase
              className={classes.emailTitle}
              placeholder="Input email template name here..."
              autoFocus
              onChange={this.changeTitle}
              value={title}
            />
            <IconButton disabled>
              <Icon className={classes.addRemoveIcon} color="disabled">
                edit
              </Icon>
            </IconButton>
          </div>
          <Button
            onClick={this.clickSaveBtn}
            variant="contained"
            color="primary"
            className={classes.saveBtn}
          >
            Save
          </Button>
        </div>
        <Paper className={classes.paperContainer}>
          <AppBar
            position="static"
            color="default"
            className={classes.headerBar}
          >
            <Toolbar className={classes.headerToolbar}>
              <BlockStyleToolbar
                editorState={editorState}
                onToggle={this.toggleBlockType}
              />
              <IconButton onClick={this.clickUnderlineBtn}>
                <Icon className={classes.addRemoveIcon} color="primary">
                  format_underlined
                </Icon>
              </IconButton>
              <IconButton onClick={this.clickBoldBtn}>
                <Icon className={classes.addRemoveIcon} color="primary">
                  format_bold
                </Icon>
              </IconButton>
              <IconButton onClick={this.clickItalicBtn}>
                <Icon className={classes.addRemoveIcon} color="primary">
                  format_italic
                </Icon>
              </IconButton>
              <IconButton
                onClick={this.clickHighlightBtn}
                style={{ background: 'yellow' }}
              >
                <Icon className={classes.addRemoveIcon} color="primary">
                  format_color_fill
                </Icon>
              </IconButton>
              <IconButton onClick={this.clickAddLinkBtn}>
                <Icon className={classes.addRemoveIcon} color="primary">
                  insert_link
                </Icon>
              </IconButton>
              <IconButton onClick={this.onAddImage}>
                <Icon className={classes.addRemoveIcon} color="primary">
                  insert_photo
                </Icon>
              </IconButton>
              <FormControl className={classes.formControl}>
                <Select
                  value=""
                  onChange={this.changeField}
                  input={<Input name="name" id="uncontrolled-native" />}
                >
                  <MenuItem value="">
                    <em>Fields</em>
                  </MenuItem>
                  {fields.map(field => (
                    <MenuItem key={field} value={field}>
                      {field}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Toolbar>
          </AppBar>

          <div className={classes.editor} onClick={this.focus}>
            <Editor
              blockStyleFn={getBlockStyle}
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommandForCommonCommands}
              onChange={onChangeEditor}
              plugins={this.plugins}
              blockRendererFn={mediaBlockRenderer}
              ref="editor"
              decorators={decorators}
            />
          </div>
        </Paper>
        <InformationDialog
          isOpenedDialog={isInfoDialogOpened}
          informationMessage="Congrastulation! Your email template has been persisted permanently on Arweave blockchain."
          onClose={onToggleInfoDialog}
        />
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    onHandleKeyCommand: command => dispatch(handleKeyCommand(command)),
    onChangeEditor: editorState => dispatch(changeEditor(editorState)),
    onGetEmailTplById: emailTplId => dispatch(getEmailTplByIdThunk(emailTplId)),
    onUpdateEmailTpl: emailTpl => dispatch(updateEmailTplThunk(emailTpl)),
    onCreateEmailTpl: emailTpl => dispatch(createEmailTplThunk(emailTpl)),
    onChangeTitle: title => dispatch(changeTitle(title)),
    onToggleInfoDialog: () => dispatch(toggleInfoDialog()),
  };
}

const mapStateToProps = createStructuredSelector({
  editorState: makeSelectEditorState(),
  emailTplId: makeSelectEmailTplId(),
  title: makeSelectTitle(),
  isInfoDialogOpened: makeSelectIsInfoDialogOpened(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'emailBuidler', reducer });

const withStylesCandidates = withStyles(styles);

export default compose(
  withReducer,
  withConnect,
  withStylesCandidates,
)(EmailBuidler);
