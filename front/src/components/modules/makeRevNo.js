const getRanChar = (qty) => {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const ranCharno = () => Math.floor(Math.random() * (charset.length - 1));
  const resultArr = [];
  for (let index = 0; index < qty; index++) {
    let ranchar = charset[ranCharno()];
    resultArr.push(ranchar);
  }

  return resultArr.join("");
};

export default function makeRevNo() {
  const now = Date.now().toString();
  const nows = {
    now1: now.substring(5, 9),
    now2: now.substring(9, 13),
  };
  const result =
    getRanChar(2) + nows.now1 + getRanChar(2) + nows.now2 + getRanChar(2);

  return result;
}
