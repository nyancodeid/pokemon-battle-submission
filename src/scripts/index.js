import "animate.css";
import "@src/styles/index.scss";

import { loadPokemon } from "@src/scripts/views/pokemons";

import PokemonCard from "@src/components/pokemon-card";
import ScoreResult from "@src/components/score-result";
import { emitter } from "@src/scripts/helpers";

customElements.define("score-result", ScoreResult);
customElements.define("pokemon-card", PokemonCard);

document.addEventListener("DOMContentLoaded", () => {
  const refreshElement = document.querySelector(".refresh:enabled");

  refreshElement.addEventListener("click", (event) => {
    event.stopPropagation();

    if (refreshElement.hasAttribute("disabled")) return;

    refreshElement.toggleAttribute("disabled");
    loadPokemon().then(() => {
      refreshElement.toggleAttribute("disabled");
    });
  });

  loadPokemon();

  emitter.emit("increment:score", { side: "draw", onlyFetch: true });
});
