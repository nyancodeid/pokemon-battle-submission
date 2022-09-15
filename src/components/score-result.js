export default class ScoreResult extends HTMLElement {
  constructor () {
    super();
  }

  set score ({ score, side }) {
    this._score = score;
    this._winner = side;

    this.render();
  }

  isLastWin (side) {
    return (this._winner == side) ? "animate__animated animate__tada" : "";
  }

  formattedScore (side) {
    return String(this._score[side]).padStart(3, '0');
  } 

  html () {
    return String.raw`
      <section class="score-wrapper">
        <div class="score-pokemon-a score-item ${(this.isLastWin('pokemon-a'))}">
          <div class="score-item--name">Player 1</div>
          <span class="score-item--count">${this.formattedScore(['pokemon-a'])}</span>
        </div>
        <div class="score-pokemon-b score-item ${(this.isLastWin('pokemon-b'))}">
          <div class="score-item--name">Player 2</div>
          <span class="score-item--count">${this.formattedScore(['pokemon-b'])}</span>
        </div>
      </section>
    `;
  }

  render () {
    this.innerHTML = `
      ${this.html()}
    `;
  }
}