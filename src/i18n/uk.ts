import type { Dictionary } from './index';
import { auth } from './uk/auth';
import { common } from './uk/common';
import { docs } from './uk/docs';
import { legal } from './uk/legal';
import { marketing } from './uk/marketing';
import { pricing } from './uk/pricing';

/** Ukrainian dictionary. Typed against `en`, so a missing key fails the build. */
export const uk: Dictionary = {
  ...common,
  ...marketing,
  ...pricing,
  ...auth,
  ...docs,
  ...legal,
};
