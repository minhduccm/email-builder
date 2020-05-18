/**
 * Asynchronously loads the component for Candidates
 */
import loadable from 'loadable-components';

export default loadable(() => import('./index'));
