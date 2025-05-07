import { Filter } from 'bad-words';

export const MAX_REVIEW_LENGTH = 500;

const filter = new Filter();

export function validateReviewMessage(message: string, t: (key: string) => string): string | null {
  if (message.length > MAX_REVIEW_LENGTH) {
    return t('reviews.form.errors.messageTooLong');
  }
  if (filter.isProfane(message)) {
    return t('reviews.form.errors.messageProfanity');
  }
  return null;
} 