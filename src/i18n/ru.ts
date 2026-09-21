import type { Dictionary } from './index';
import { auth } from './ru/auth';
import { common } from './ru/common';
import { docs } from './ru/docs';
import { legal } from './ru/legal';
import { marketing } from './ru/marketing';
import { pricing } from './ru/pricing';

/** Russian dictionary. Typed against `en`, so a missing key fails the build. */
export const ru: Dictionary = {
  ...common,
  ...marketing,
  ...pricing,
  ...auth,
  ...docs,
  ...legal,
};
