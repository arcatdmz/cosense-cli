import { parsePageUrl } from './parseUrl.ts';
import { requestJson } from './request.ts';
import { resolveServiceAccount } from './settings.ts';

export const fetchRelatedPages = async (
  url: string,
  hop: 1 | 2,
  query?: string
): Promise<unknown> => {
  const { origin, projectName, encodedTitle } = parsePageUrl(url);
  const queryParam = query ? `?search=${encodeURIComponent(query)}` : '';
  const apiUrl = `${origin}/api/pages/v2/${projectName}/${encodedTitle}/links${hop}hop${queryParam}`;
  const serviceAccount = resolveServiceAccount(origin, projectName);
  return requestJson(apiUrl, { serviceAccount });
};
