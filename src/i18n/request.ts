import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';
 
export default getRequestConfig(async ({requestLocale}) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;
 
  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }
 
  let messages;
  switch (locale) {
    case 'es':
      messages = (await import('../../messages/es.json')).default;
      break;
    default:
      messages = (await import('../../messages/es.json')).default;
  }

  return {
    locale,
    messages
  };
});
