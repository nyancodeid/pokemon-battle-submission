export default class PokemonCard extends HTMLElement {
  constructor() {
    super();
    
    this.shadowDOM = this.attachShadow({ mode: "open" });
    this.renderLoading();
  }

  set pokemon(pokemon) {
    this._pokemon = pokemon;

    this.render();
  }

  style() {
    return String.raw`
    <style>
      :host {
        --pokemon-color: rgba(${this._pokemon.color.join(", ")}, .2);
      }

      :host(#pokemon-a) .pokemon-item--header {
        border-top-left-radius: var(--card-radius);
      }
      :host(#pokemon-a) .pokemon-item--header img {
        transform: scaleX(-1);
      }

      :host(#pokemon-b) .pokemon-item--header {
        align-items: flex-end;
        border-top-right-radius: var(--card-radius);
      }
      :host(#pokemon-b) .pokemon-item--subheader {
        flex-direction: row-reverse;
      }
      :host(#pokemon-b) .pokemon-item--badges {
        flex-direction: row-reverse;
      }

      @keyframes bounce {
        from,
        20%,
        53%,
        to {
          animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
          transform: translate3d(0, 0, 0);
        }

        40%,
        43% {
          animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
          transform: translate3d(0, -12px, 0) scaleY(1.1);
        }

        70% {
          animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
          transform: translate3d(0, -8px, 0) scaleY(1.05);
        }

        80% {
          transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
          transform: translate3d(0, 0, 0) scaleY(0.95);
        }

        90% {
          transform: translate3d(0, -4px, 0) scaleY(1.02);
        }
      }
      .animate--animated {
        animation-duration: 1s;
        animation-duration: var(--animate-duration);
        animation-fill-mode: both;
      }
      .animate--bounce {
        animation-name: bounce;
        transform-origin: center bottom;
      }

      .pokemon-item {
        display: flex;
        flex-direction: column;
      }
      .pokemon-item--header {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        padding: 16px;
        background-color: var(--pokemon-color);
        border-bottom: 2px solid var(--border-color);
      }
      .pokemon-item--header img {
        height: 5.5em;
      }
      .pokemon-item--header p {
        margin: 0;
        font-size: 13px;
      }
      .pokemon-item--header .pokemon-item--subheader {
        display: flex;
        align-items: center;
        gap: 16px;
      }
      .pokemon-item--header .pokemon-item--subheader h1 {
        margin: 0;
        font-size: 2em;
        font-weight: 800;
      }
      .pokemon-item--header .pokemon-types {
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .pokemon-item--header .pokemon-types img {
        width: 24px;
        height: 24px;
      }

      .pokemon-item--badges {
        display: flex;
        margin-bottom: 3em;
        gap: 8px;
      }
      .pokemon-item--badges .badge {
        font-size: 14px;
        font-weight: bold;
        padding: 4px 8px;
        background-color: rgba(0, 0, 0, .8);
        border-radius: 8px;
        color: white;
      }
      .pokemon-item--badges .badge.winner {
        background-color: #0b930b;
      }
      .pokemon-item--badges .badge.losser {
        background-color: #f9a918;
      }

      .pokemon-item--stats {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 8px;
        padding: 8px;
      }
      .pokemon-item--stats .pokemon-item-stat {
        display: flex;
        flex-direction: column;
        padding: 8px;
        border-radius: 8px;
        background-color: var(--pokemon-color);
        border: 2px solid var(--border-color);
        justify-content: space-between;
      }
      .pokemon-item--stats .pokemon-item-stat .pokemon-stat--title {
        font-size: 13px;
      }
      .pokemon-item--stats .pokemon-item-stat .pokemon-stat--progressbar {
        display: flex;
        align-items: baseline;
        gap: 4px;

        font-size: 24px;
        font-weight: bold;
      }
      .pokemon-stat--progressbar span {
        font-size: 12px;
      }
      @media (max-width: 768px) {
        .pokemon-item--header {
          min-height: 300px;
          padding: 8px;
        }
        .pokemon-item--header .pokemon-item--subheader {
          align-items: flex-start;
          flex-direction: column;
          gap: 8px;
        }
        :host(#pokemon-b) .pokemon-item--subheader {
          flex-direction: column;
          align-items: flex-end;
        }
        .pokemon-item--header .pokemon-item--subheader h1 {
          font-size: 1.5em;
        }
        .pokemon-item--header p {
          margin: 8px 0;
        }
        :host(#pokemon-b) .pokemon-item--header p {
          text-align: right;
        }
        .pokemon-item--badges {
          flex-wrap: wrap;
          margin-bottom: auto;
          gap: 4px;
        }
        .pokemon-item--badges .badge {
          font-size: 13px;
        }
        .pokemon-item--stats {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }
    </style>
    `;
  }

  html() {
    return String.raw`
      <article class="pokemon-item">
        <section class="pokemon-item--header">
          <div class="pokemon-item--badges">
            <span class="badge">#${this._pokemon.pokemon.id}</span>
            <span class="badge">${this._pokemon.stats.total} PT</span>
            <span class="badge ${this._pokemon.status.toLowerCase()}">${this._pokemon.status}</span>
          </div>

          <div class="animate--animated animate--bounce">
            <img src="${this._pokemon.image}" />
          </div>
          
          <div class="pokemon-item--subheader">
            <h1>${this._pokemon.name}</h2>

            <div class="pokemon-types">
              ${this._pokemon.types.map(({ text, image }) => String.raw`
              <img src="${image}" title="${text}" />
              `).join("")}
            </div>
          </div>

          <p>Height : ${this._pokemon.pokemon.height / 10}m — Weight : ${this._pokemon.pokemon.weight / 10}kg</p>
        </section>

        <section class="pokemon-item--stats">
          ${this._pokemon.stats.items.map(item => String.raw`
          <div class="pokemon-item-stat">
            <div class="pokemon-stat--title">${item.text}</div>

            <div class="pokemon-stat--progressbar">
              ${item.stat} <span>Pt</span>
            </div>
          </div>
          `).join("")}
        </section>
      </article>
    `;
  }

  render() {
    this.shadowDOM.innerHTML = `
      ${this.style()}
      ${this.html()}
    `;
  }

  renderLoading () {
    this.shadowDOM.innerHTML = String.raw`
      <style>
      :host {
        display: flex;
        align-items: center;
        justify-content: center;
        
        width: 384px;
        height: 416px;
      }
      </style>
      <h1>Loading...</h1>
    `;
  }
}
