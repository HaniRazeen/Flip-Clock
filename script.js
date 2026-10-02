const clock = document.getElementById("clock");
const dateText = document.getElementById("date");

const cards = [];

function makeCard() {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <div class="half top"><span>0</span></div>
    <div class="half bottom"><span>0</span></div>
    <div class="half flip-top"><span>0</span></div>
    <div class="half flip-bottom"><span>0</span></div>
  `;
  return card;
}

for (let i = 0; i < 3; i++) {
  const group = document.createElement("div");
  group.className = "group";

  for (let j = 0; j < 2; j++) {
    const card = makeCard();
    cards.push(card);
    group.appendChild(card);
  }

  clock.appendChild(group);

  if (i < 2) {
    const colon = document.createElement("div");
    colon.className = "colon";
    clock.appendChild(colon);
  }
}

function setText(card, selector, value) {
  card.querySelector(selector + " span").textContent = value;
}

function setDigit(card, next) {
  const current = card.dataset.value;

  if (current === next) return;

  if (current === undefined) {
    [".top", ".bottom", ".flip-top", ".flip-bottom"].forEach((part) => {
      setText(card, part, next);
    });
    card.dataset.value = next;
    return;
  }

  setText(card, ".top", next);
  setText(card, ".flip-top", current);
  setText(card, ".flip-bottom", next);
  card.classList.add("flipping");

  setTimeout(() => {
    setText(card, ".bottom", next);
    card.classList.remove("flipping");
  }, 600);

  card.dataset.value = next;
}

function tick() {
  const now = new Date();

  const time = [now.getHours(), now.getMinutes(), now.getSeconds()]
    .map((n) => String(n).padStart(2, "0"))
    .join("");

  time.split("").forEach((digit, i) => setDigit(cards[i], digit));

  dateText.textContent = now.toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

tick();


setInterval(tick, 250);
