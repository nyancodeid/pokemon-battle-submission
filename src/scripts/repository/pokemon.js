import Stringify from "string";
import { extractColor, fetchImage } from "@src/scripts/helpers";

export default class Pokemon {
  constructor(type, id) {
    this.type = type;
    this.id = id;

    this.pokemon = null;
    this.pokemon_api = `https://pokeapi.co/api/v2/pokemon/:id`;

    this.color = [209, 213, 219];
    this.image = null;

    this._status = "Draw";
  }

  async fetch() {
    const url = this.pokemon_api.replace(":id", this.id);
    const response = await fetch(url);

    this.pokemon = await response.json();
    this.image = await fetchImage(`images/pokemon/${this.id}.webp`);
    this.color = await extractColor(this.image);

    return this;
  }

  get status() {
    return this._status;
  }
  set status(value) {
    this._status = value;
  }

  get name() {
    return Stringify(this.pokemon?.name).humanize().titleCase().toString();
  }

  get types() {
    return this.pokemon?.types.map(({ type }) => ({
      name: type.name,
      text: Stringify(type.name).humanize().titleCase().toString(),
      image: `images/types/type_${type.name}.webp`,
    }));
  }

  get stats() {
    let total = 0;

    const stats = this.pokemon?.stats.map(({ stat, base_stat }) => {
      total += base_stat;

      return {
        name: stat.name,
        text:
          stat.name == "hp"
            ? "HP"
            : Stringify(stat.name).humanize().titleCase().toString(),
        stat: base_stat,
      };
    });

    return {
      items: stats,
      total,
    };
  }

  bindElement() {
    const element = document.getElementById(`pokemon-${this.type}`);
    element.pokemon = this;

    const rgbColors = this.color.join(", ");

    document.body.style.setProperty(
      `--pokemon-${this.type}-color`,
      `rgba(${rgbColors}, .3)`
    );

    if (this.type == "b") {
      document
        .querySelector(".pokemons")
        .style.setProperty(
          `--box-shadow`,
          `rgba(${rgbColors}, 0.4) 0px 5px, rgba(${rgbColors}, 0.3) 0px 10px, rgba(${rgbColors}, 0.2) 0px 15px, rgba(${rgbColors}, 0.1) 0px 20px, rgba(${rgbColors}, 0.05) 0px 25px`
        );
    }
  }
}
