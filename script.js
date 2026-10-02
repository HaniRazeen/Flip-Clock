const digits = {
h1: document.getElementById("h1"),
h2: document.getElementById("h2"),

m1: document.getElementById("m1"),
m2: document.getElementById("m2"),

s1: document.getElementById("s1"),
s2: document.getElementById("s2")
};

const dateElement = document.getElementById("date");

let previousTime = "";

function updateClock() {

const now = new Date();

const hours = String(now.getHours()).padStart(2, "0");
const minutes = String(now.getMinutes()).padStart(2, "0");
const seconds = String(now.getSeconds()).padStart(2, "0");

const currentTime =
hours + minutes + seconds;

const digitElements = [
digits.h1,
digits.h2,
digits.m1,
digits.m2,
digits.s1,
digits.s2
];

for (let i = 0; i < 6; i++) {

```
if (
  previousTime !== "" &&
  currentTime[i] !== previousTime[i]
) {

  digitElements[i].classList.remove("flip");

  // Restart animation
  void digitElements[i].offsetWidth;

  digitElements[i].classList.add("flip");
}

digitElements[i].textContent = currentTime[i];
```

}

previousTime = currentTime;

dateElement.textContent =
now.toLocaleDateString(undefined, {
weekday: "long",
year: "numeric",
month: "long",
day: "numeric"
});
}

updateClock();

setInterval(updateClock, 1000);

