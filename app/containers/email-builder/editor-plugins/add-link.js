import React from 'react';

export const linkStrategy = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === 'LINK'
    );
  }, callback);
};

export const Link = props => {
  const { contentState, entityKey } = props;
  const { url } = contentState.getEntity(entityKey).getData();
  return (
    <a
      className="link"
      href={url}
      rel="noopener noreferrer"
      target="_blank"
      aria-label={url}
    >
      {props.children}
    </a>
  );
};

const addLinkPlugin = {
  decorators: [
    {
      strategy: linkStrategy,
      component: Link,
    },
  ],
};

export default addLinkPlugin;
