/**
 * The FAQ entries themselves live in the dictionaries (`faq.landing`,
 * `contact.faq`, `pricing.faq`); what stays here is the shape the accordion
 * and the section component agree on.
 */
export interface FaqEntry {
  question: string;
  answer: string;
}
