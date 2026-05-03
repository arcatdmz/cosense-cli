import { enrichTimestampsOf } from '../lib/enrichTimestamps.ts';
import { fetchRelatedPages } from '../lib/relatedPages.ts';

export const list2hopLinksSummary = '2-hop近傍を取得する';

export const list2hopLinksHelp = `list2hopLinks - 2-hop近傍を取得する

Usage:
  cosense list2hopLinks <pageUrl>

引数:
  <pageUrl>  対象ページの完全なURL

戻り値（top-levelの主なkey）:
  links2hop          Array<Link>  2-hop近傍のページ配列
  hiddenHeadwordsLc  string[]     非表示のヘッドワード
  pagination         object       ページネーション情報

各 Link の field:
  id, title, titleLc, image, descriptions, linksLc, linked, pageRank,
  infoboxDefinition, infoboxDisableLinks,
  created, updated, accessed, lastAccessed (string), charsCount

注意:
  - 直接の1-hop近傍は含まれない
  - list1hopLinks と異なり、relation field は付与されない
`;

export const list2hopLinks = async (args: string[]): Promise<void> => {
  if (args.length !== 1) {
    throw new Error('Usage: cosense list2hopLinks <pageUrl>');
  }
  const [url] = args as [string];
  const data = await fetchRelatedPages(url, 2);
  for (const page of (data as { links2hop?: unknown[] }).links2hop ?? []) {
    enrichTimestampsOf(page as Record<string, unknown>);
  }
  process.stdout.write(`${JSON.stringify(data, null, 2)}\n`);
};
