import { SourcererOutput, makeSourcerer } from '@/providers/base';
import { MovieScrapeContext, ShowScrapeContext } from '@/utils/context';
import { NotFoundError } from '@/utils/errors';

const PRIMENET_BASE = 'https://primenet.stream';

async function primenetScraper(ctx: ShowScrapeContext | MovieScrapeContext): Promise<SourcererOutput> {
  const { title, releaseYear } = ctx.media;
  
  // 1. Search for the content on Primenet
  // Note: Primenet typically uses a search endpoint or slug-based URL
  const searchUrl = `${PRIMENET_BASE}/search?q=${encodeURIComponent(title)}`;
  const searchResults = await ctx.proxiedFetcher(searchUrl);

  if (!searchResults) throw new NotFoundError('No results found on Primenet');

  // 2. Logic to find the specific movie/episode match
  // 3. Extract the video player or embed link (HLS/m3u8)

  return {
    embeds: [],
    stream: [
      {
        id: 'primary',
        type: 'hls',
        url: 'REPLACE_WITH_EXTRACTED_M3U8_URL',
        flags: [],
      },
    ],
  };
}

export const primenetSource = makeSourcerer({
  id: 'primenet',
  name: 'Primenet',
  rank: 250, // Higher rank than VidLink to prioritize it
  disabled: false,
  flags: [],
  scrapeMovie: primenetScraper,
  scrapeShow: primenetScraper,
});
