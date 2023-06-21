const answer = "APPLE";

let attempts = 0;
let index = 0;
let timer = 0;

function appStart() {
  const nextLine = () => {
    if (attempts === 6) return gameover();
    attempts += 1;
    index = 0;
  };
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료되었습니다.";
    div.style =
      "display: flex; justify-content:center; align-items: center; position:absolute; top:40vh; left:40vw; background-color: tomato; width:200px; height: 100px; opacity:0.5; border-radius:20px;";
    document.body.appendChild(div);
  };
  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    clearInterval(timer);
  };
  const handleBackspaceKey = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };
  const handleEnterKey = () => {
    let correct = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const inputChar = block.innerText;
      const outputChar = answer[i];

      if (inputChar === outputChar) {
        block.style.background = "#6AAA64";
        correct += 1;
      } else if (answer.includes(inputChar)) block.style.background = "#C9B458";
      else block.style.background = "#787C7E";

      block.style.color = "white";
    }
    if (correct === 5) gameover();
    nextLine();
  };
  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );
    if (event.key === "Backspace") handleBackspaceKey();
    if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
    }
  };

  const startTimer = () => {
    const time = new Date();

    const setTime = () => {
      const curTime = new Date();
      const pasTime = new Date(curTime - time);
      const min = pasTime.getMinutes().toString().padStart(2, "0");
      const sec = pasTime.getSeconds().toString().padStart(2, "0");
      const timeH1 = document.querySelector("#timer");
      timeH1.innerText = `${min}:${sec}`;
    };
    timer = setInterval(setTime, 1000);
  };
  startTimer();
  window.addEventListener("keydown", handleKeydown);
}

appStart();
