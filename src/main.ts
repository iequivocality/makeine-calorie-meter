import "./style.css";
import gsap from "gsap"; // Only if you use modules

const meterData = [
  { cap: "最終話まで", kcal: 85818 },
  { cap: "第1話", kcal: 5043 },
  { cap: "第2話", kcal: 4938 },
  { cap: "第3話", kcal: 4420 },
  { cap: "第4話", kcal: 1424 },
  { cap: "第5話", kcal: 46145 },
  { cap: "第6話", kcal: 4303 },
  { cap: "第7話", kcal: 327 },
  { cap: "第8話", kcal: 2311 },
  { cap: "第9話", kcal: 1655 },
  { cap: "第10話", kcal: 1850 },
  { cap: "第11話", kcal: 6217 },
  { cap: "最終話", kcal: 7185 },
];

function episodeSelect(episodeNumber: number) {
  const meter = meterData[episodeNumber];

  const calorieMeter = { kcal: 0 };
  gsap.to(calorieMeter, {
    /* The target value for the animation */
    kcal: meter.kcal,
    ease: "power1.in",
    /*
      We want the duration to be longer for larger kcal values.
      Feel free to adjust this value to your liking.
    */
    duration: (meter.kcal % 10000) / 2000, 
    onStart: () => {
      /** Initial state before running animation */
      document.querySelector("#calorie_container .cap .no")!.innerHTML = meter.cap;
      const numbers = document.querySelectorAll(".kcal .number");
      numbers.forEach((number) => {
        number.innerHTML = "";
      });

      /** Add comma when at least 1000 calories, remove comma when less than 1000 calories before running animation */
      if (meter.kcal < 1000) {
        document.querySelector("#calorie_container .kcal")!.classList.remove("with-comma");
      } else {
        document.querySelector("#calorie_container .kcal")!.classList.add("with-comma");
      }
    },
    onUpdate: () => {
      /** Separate each digit of the number into an array for each animation frame */
      let num = calorieMeter.kcal;
      let digits = [];
      let numOfDigits = 0;
      while (num != 0) {
          digits.unshift(Math.floor(num % 10));
          num = Math.trunc(num / 10);
          numOfDigits++;
      }

      /** Pad the array with zeros if the number of digits is less than 5 */
      let padDigits = 5 - numOfDigits; 
      while (padDigits > 0) {
        digits.unshift(0);
        padDigits--;
      }

      /** Set the number of digits to the corresponding element */
      const digitElems = document.querySelectorAll("#calorie_container .kcal .number");
      for (let digit = 0; digit < 5; digit++) {
        digitElems[digit].innerHTML = calorieMeter.kcal < Math.pow(10, 4 - digit) ? "" : digits[digit].toFixed(0);
      }
    }
  });
}


function initializeMeter() {
  episodeSelect(0);

  const buttons = document.querySelectorAll<HTMLButtonElement>("button.select_item");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const episodeNumber = parseInt(button.dataset.episodenumber ?? "0");
      episodeSelect(episodeNumber);
    });
  });
}

initializeMeter();



