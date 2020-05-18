/*
* Highlight plugin
*/

export default () => ({
  customStyleMap: {
    HIGHLIGHT: {
      background: '#fffe0d',
    },
  },
  keyBindingFn: e => {
    if (e.metaKey && e.key === 'h') {
      return 'highlight';
    }
  },
});
