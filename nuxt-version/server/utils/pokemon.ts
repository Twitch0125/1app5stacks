/**
 * Fetches all Pokemon from Gen 1-9 (up to #1025) from the PokeAPI GraphQL endpoint.
 * Each Pokemon includes their name, Pokedex number, and sprite URL.
 * Results are cached indefinitely using Next.js cache.
 */
export const getAllPokemon = defineCachedFunction(
  async () => {
    console.log("Fetching all Pokemon");
    // Use the graphql endpoint because the normal one won't let you get names
    // in a single query
    const query = `
    query GetAllPokemon {
      pokemon_v2_pokemon(where: {id: {_lte: 1025}}) {
        id
        pokemon_v2_pokemonspecy {
          name
        }
      }
    }
  `;
    const response = await fetch("https://beta.pokeapi.co/graphql/v1beta", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const data = (await response.json()).data as {
      pokemon_v2_pokemon: {
        id: number;
        pokemon_v2_pokemonspecy: {
          name: string;
        };
      }[];
    };

    return data.pokemon_v2_pokemon.map((pokemon) => ({
      name: pokemon.pokemon_v2_pokemonspecy.name,
      dexNumber: pokemon.id,
    }));
  },
  { maxAge: 60 * 60 * 24 * 7 }
);

export async function getTwoRandomPokemon() {
  const allPokemon = await getAllPokemon();
  const shuffled = allPokemon.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 2);
}

export async function recordBattle(winner: number, loser: number) {
  return await Promise.all([
    // Record battle
    saveBattle({ winner, loser }),
    // Increment win/loss counters
    incrementKey(`pokemon:${winner}:wins`),
    incrementKey(`pokemon:${loser}:losses`),
  ]);
}
type Battle = { winner: number; loser: number; date: number };
async function saveBattle(battle: Omit<Battle, "date">) {
  const storage = useStorage();
  const battles = (await storage.getItem<Battle[]>("battles:all")) ?? [];
  battles.push({ ...battle, date: Date.now() });
  await storage.setItem("battles:all", battles);
}
async function incrementKey(key: string) {
  const storage = useStorage();
  const total = (await storage.getItem<number>(key)) ?? 0;
  await storage.setItem(key, total + 1);
}

export async function getRankings() {
  const pokemonList = await getAllPokemon();

  // Construct win/loss keys directly from pokemon list
  const storage = useStorage();
  const [wins, losses] = await Promise.all([
    storage.getItems<number>(
      pokemonList.map((p) => `pokemon:${p.dexNumber}:wins`)
    ),
    storage.getItems<number>(
      pokemonList.map((p) => `pokemon:${p.dexNumber}:losses`)
    ),
  ]);
  const stats = pokemonList.map((pokemon, index) => {
    const totalWins = wins[index].value ?? 0;
    const totalLosses = losses[index].value ?? 0;
    const totalBattles = totalWins + totalLosses;

    return {
      ...pokemon,
      stats: {
        wins: totalWins,
        losses: totalLosses,
        winRate: totalBattles > 0 ? totalWins / totalBattles : 0,
      },
    };
  });
  return stats.sort((a, b) => {
    const winRateDiff = b.stats.winRate - a.stats.winRate;
    if (winRateDiff !== 0) return winRateDiff;
    return b.stats.wins - a.stats.wins;
  });
}
