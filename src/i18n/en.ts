import { auth } from './en/auth';
import { common } from './en/common';
import { docs } from './en/docs';
import { legal } from './en/legal';
import { marketing } from './en/marketing';
import { pricing } from './en/pricing';

/**
 * The English dictionary, and the schema every other language is typed
 * against. Split across ./en/* by area so no single file has to hold the
 * landing copy, the API reference and the legal text at once.
 */
export const en = {
  ...common,
  ...marketing,
  ...pricing,
  ...auth,
  ...docs,
  ...legal,
};
