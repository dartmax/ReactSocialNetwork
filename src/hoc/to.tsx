import { LocationDescriptor } from 'history';
import { Link } from 'react-router-dom';

const to = (to: LocationDescriptor) => ({ to, component: Link as any });

export default to;