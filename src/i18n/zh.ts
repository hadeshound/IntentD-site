import type { Dictionary } from './index';
import { auth } from './zh/auth';
import { common } from './zh/common';
import { docs } from './zh/docs';
import { legal } from './zh/legal';
import { marketing } from './zh/marketing';
import { pricing } from './zh/pricing';

/**
 * Simplified Chinese dictionary. Typed against `en`, so a missing key fails
 * the build.
 */
export const zh: Dictionary = {
  ...common,
  ...marketing,
  ...pricing,
  ...auth,
  ...docs,
  ...legal,
};
