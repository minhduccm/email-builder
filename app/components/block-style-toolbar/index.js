/*
* BlockStyleToolbar
*/

import React from 'react';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';
import HeaderStyleDropdown from './header-style-dropdown';
import BlockStyleButton from './block-style-button';

export const BLOCK_TYPES = [
  { label: ' “ ” ', style: 'blockquote', icon: 'format_quote' },
  { label: 'UL', style: 'unordered-list-item', icon: 'format_list_bulleted' },
  { label: 'OL', style: 'ordered-list-item', icon: 'format_list_numbered' },
  { label: '{ }', style: 'code-block', icon: 'code' },
];
export const BLOCK_TYPE_HEADINGS = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'H6', style: 'header-six' },
];

export function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote';
    default:
      return null;
  }
}

/* eslint-disable react/prefer-stateless-function */
export class BlockStyleToolbar extends React.PureComponent {
  render() {
    const { editorState, onToggle, classes } = this.props;
    const selection = editorState.getSelection();
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();

    return (
      <div className={classes.root}>
        <HeaderStyleDropdown
          headerOptions={BLOCK_TYPE_HEADINGS}
          active={blockType}
          onToggle={onToggle}
        />

        {BLOCK_TYPES.map(type => (
          <BlockStyleButton
            active={type.style === blockType}
            label={type.label}
            icon={type.icon}
            onToggle={onToggle}
            style={type.style}
            key={type.label}
            type={type}
          />
        ))}
      </div>
    );
  }
}

const withMyStyles = withStyles(styles);

export default compose(withMyStyles)(BlockStyleToolbar);
