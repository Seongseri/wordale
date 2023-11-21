const 정답 = ["TRUTH", "APPLE", "MOUSE", "QUEEN", "PANDA", "YOUTH"];
let index = 0;
let attempts = 0; 
let timer;

function appStart() {
  const random = Math.floor(Math.random() * 6 + 1);
  const 오늘의정답 = 정답[random];
  const displayGameover = () => {
    const message = document.getElementById("message");
    message.style.opacity = 1;
    message.innerText = `게임이 종료됐습니다!!정답은 ${오늘의정답}~~!`;
    document
      .querySelector(`.key-block[data-key='${오늘의정답[0]}']`)
      .animate(
        [
          { transform: "translateX(0px)" },
          { transform: "translateY(-400px)" },
          { transform: "translateX(100px)" },
          { transform: "translateY(50px)" },
          { transform: "translateY(-100px)" },
        ],
        { duration: 6000, iterations: Infinity }
      );
    document
      .querySelector(`.key-block[data-key='${오늘의정답[1]}']`)
      .animate(
        [
          { transform: "translateX(0px)" },
          { transform: "translateY(-500px)" },
          { transform: "translateX(100px)" },
          { transform: "translateY(50px)" },
          { transform: "translateY(-100px)" },
        ],
        { duration: 4000, iterations: Infinity }
      );

    document
      .querySelector(`.key-block[data-key='${오늘의정답[2]}']`)
      .animate(
        [
          { transform: "translateX(0px)" },
          { transform: "translateY(-350px)" },
          { transform: "translateX(-300px)" },
          { transform: "translateY(-10px)" },
          { transform: "translateX(300px)" },
          { transform: "translateY(-100px)" },
        ],
        { duration: 5000, iterations: Infinity }
      );
    document
      .querySelector(`.key-block[data-key='${오늘의정답[3]}']`)
      .animate(
        [
          { transform: "translateX(0px)" },
          { transform: "translateY(-650px)" },
          { transform: "translateX(500px)" },
          { transform: "translateY(-20px)" },
          { transform: "translateY(200px)" },
        ],
        { duration: 3000, iterations: Infinity }
      );

    document
      .querySelector(`.key-block[data-key='${오늘의정답[4]}']`)
      .animate(
        [
          { transform: "translateX(0px)" },
          { transform: "translateY(-300px)" },
          { transform: "translateX(300px)" },
          { transform: "translateY(-50px)" },
          { transform: "translateY(100px)" },
        ],
        { duration: 3000, iterations: Infinity }
      );
  };
  const gameOver = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    clearInterval(timer);
  };

  const nextLine = () => {
    if (attempts === 5)
      return gameOver(); 
    else {
      attempts += 1;
      index = 0;
    }
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };
  const handleEnterKey = () => {
    let 맞은_개수 = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const 입력한_글자 = block.innerText;
      const 정답_글자 = 오늘의정답[i];
      const keyBlock = document.querySelector(
        `.key-block[data-key='${입력한_글자}']`
      );
      if (입력한_글자 === 정답_글자) {
        block.style.background = "#6AAA64";
        맞은_개수 += 1;
        keyBlock.style.background = "#6AAA64";
      } else if (오늘의정답.includes(입력한_글자)) {
        block.style.background = "#C9B458";
        keyBlock.style.background = "#C9B458";
      } else {
        block.style.background = "#787C7E";
        keyBlock.style.background = "#787C7E";
        block.style.color = "white";
        keyBlock.style.color = "white";
      }
    }
    if (맞은_개수 === 5) gameOver();
    else nextLine();
  };

  const handleKeydown = () => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1; 
    }
  };

  const startTimer = () => {
    const startTime = new Date();

    function setTime() {
      const nowTime = new Date(); 
      const flowTime = new Date(nowTime - startTime);
      const min = flowTime.getMinutes().toString();
      const sec = flowTime.getSeconds().toString();
      const timeH1 = document.querySelector("#timer");
      timeH1.innerText = `${min.padStart(2, "0")}:${sec.padStart(2, "0")}`;
      nowTime.get;
    }

    timer = setInterval(setTime, 1000); 
  };
  window.addEventListener("keydown", handleKeydown);

  startTimer();
  const clickKey = (x) => {
    const keyBlock = x;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );
    const asciiKey = keyBlock.charCodeAt(0);

    if (keyBlock === "DELETE") handleBackspace();
    else if (index === 5) {
      if (keyBlock === "ENTER") handleEnterKey();
      else return;
    } else if (65 <= asciiKey <= 90) {
      thisBlock.innerText = keyBlock;
      index += 1; //index ++
    }
  };

  window.document.body.querySelectorAll("[data-key]").forEach((x) => {
    x.addEventListener("click", () => {
      clickKey(x.dataset["key"]);
      console.log(x.dataset.key); //clickKey()
      console.log(x.getAttribute("data-key"));
    });
  });
}

appStart();