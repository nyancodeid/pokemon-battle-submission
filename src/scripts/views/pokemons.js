import { emitter } from "@src/scripts/helpers";
import Pokemon from "@src/scripts/repository/pokemon";

const randomId = () => {
  return Math.floor(Math.random() * 100) + 1;
};

export async function loadPokemon() {
  const [pokemonA, pokemonB] = await Promise.all([
    new Pokemon("a", randomId()).fetch(),
    new Pokemon("b", randomId()).fetch(),
  ]);

  if (pokemonA.stats.total > pokemonB.stats.total) {
    pokemonA.status = "Winner";
    pokemonB.status = "Losser";

    emitter.emit("increment:score", {
      side: "pokemon-a",
    });
  } else if (pokemonA.stats.total < pokemonB.stats.total) {
    pokemonA.status = "Losser";
    pokemonB.status = "Winner";

    emitter.emit("increment:score", {
      side: "pokemon-b",
    });
  }

  pokemonA.bindElement();
  pokemonB.bindElement();
}
