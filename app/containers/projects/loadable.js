/**
 * Asynchronously loads the component for SegmentBuilder
 */
import loadable from 'loadable-components';

export default loadable(() => import('./index'));
