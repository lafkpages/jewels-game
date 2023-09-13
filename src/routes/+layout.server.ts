import { redirect } from '@sveltejs/kit';

import type { LayoutServerLoad } from './$types';

export const load = (async ({
  cookies,
  url
}) => {
  // Only allow access to the Repl dev version (on .repl.co)
  // if user has set the cookie "__jewels_dev" to "yas"

  const urlMatch = url.origin.match(/^https?:\/\/([a-z0-9-]+)\.[a-z0-9-]+\.repl.co$/i);

  if (urlMatch && cookies.get('__jewels_dev') != 'yas') {
    throw redirect(307, `https://${urlMatch[1]}.replit.app`);
  }
}) satisfies LayoutServerLoad;
