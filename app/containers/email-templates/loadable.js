/**
 * Asynchronously loads the component for EmailTemplates
 */
import loadable from 'loadable-components';

export default loadable(() => import('./index'));
