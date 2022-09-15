import ColorThief from "colorthief";
import mitt from "mitt";

const extractor = new ColorThief();

export const emitter = mitt();

emitter.on("increment:score", ({ side, onlyFetch = false }) => {
  let score = localStorage.getItem("score") ?? `{"pokemon-a":0,"pokemon-b":0}`;

  score = JSON.parse(score);

  if (!onlyFetch) {
    score[side] += 1;

    localStorage.setItem("score", JSON.stringify(score));
  }

  const scoreElement = document.querySelector("score-result");

  scoreElement.score = { score, side };
});

export function blobToDataUri(blob) {
  return new Promise(function (resolve) {
    const reader = new FileReader();

    reader.onloadend = function () {
      resolve(reader.result);
    };

    reader.readAsDataURL(blob);
  });
}

export function useCDN(url) {
  return url.replace(
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/",
    "https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/"
  );
}

export async function fetchImage(url) {
  const response = await fetch(useCDN(url));
  const blob = await response.blob();

  return blobToDataUri(blob);
}

export async function extractColor(url) {
  return new Promise((resolve) => {
    const image = new Image();

    image.addEventListener("load", function () {
      resolve(extractor.getColor(image));
    });

    image.crossOrigin = "Anonymous";
    image.src = url;
  });
}
