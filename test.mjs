import { makeProviders, makeStandardFetcher, targets } from "./lib/index.js";

const providers = makeProviders({
  fetcher: makeStandardFetcher(fetch),
  target: targets.NATIVE
});

const moviesToTest = [
  { title: 'Supergirl', releaseYear: 1984, tmdbId: '1081003', imdbId: 'tt0088206' },
  { title: 'Avengers: Endgame', releaseYear: 2019, tmdbId: '299534', imdbId: 'tt4154796' },
  { title: 'The Matrix', releaseYear: 1999, tmdbId: '603', imdbId: 'tt0133093' },
  { title: 'Inception', releaseYear: 2010, tmdbId: '27205', imdbId: 'tt1375666' }
];

async function run() {
  for (const movie of moviesToTest) {
    console.log(`\n========================================`);
    console.log(`Testing ${movie.title} (${movie.tmdbId})...`);
    console.log(`========================================\n`);
    try {
      const stream = await providers.runAll({
        media: {
          type: 'movie',
          title: movie.title,
          releaseYear: movie.releaseYear,
          tmdbId: movie.tmdbId,
          imdbId: movie.imdbId
        },
        events: {
          update: (ctx) => {
            if (ctx.error) {
              console.error(`[${ctx.id}] ERROR:`, ctx.error);
            } else if (ctx.status === 'notfound') {
              // Ignore notfound for less spam
            } else {
              console.log(`[${ctx.id}] status: ${ctx.status}`, ctx.reason || '');
            }
          }
        }
      });
      console.log(`\nResult for ${movie.title}: Found stream = ${!!stream}`);
      if (stream) console.log(`Stream ID: ${stream.id}, Type: ${stream.stream.type}`);
    } catch(e) {
      console.error(`Scrape failed for ${movie.title}:`, e);
    }
  }
}

run();
