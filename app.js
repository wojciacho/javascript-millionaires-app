const main = document.querySelector("#main"),
  addUser = document.querySelector(".add"),
  doubleMoney = document.querySelector(".double"),
  showMillionaires = document.querySelector(".show"),
  sortMillionaires = document.querySelector(".sort"),
  calculateWealth = document.querySelector(".calculate"),
  URL = "https://randomuser.me/api";

let millionaires = [];

const getMillionaires = async () => {
  const response = await fetch(URL);
  const data = await response.json();

  const {first: firstName, last: lastName} = data.results[0].name;

  const user = {
    name: `${firstName} ${lastName}`,
    money: Math.floor(Math.random() * 1000000),
  };
  calculateWealth.removeAttribute("disabled");

  updateUser(user);
};

const updateUser = (person) => {
  millionaires.push(person);
  updateDOM();
};

const updateDOM = (person = millionaires) => {
  main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;

  person.forEach((item) => {
    const div = document.createElement("div");

    div.classList.add("person");
    div.innerHTML = `<strong>${item.name}</strong> $${formatWealth(
      item.money
    )}`;
    main.appendChild(div);

    div.addEventListener("click", (e) => {
      e.preventDefault();
      div.remove();
      const item = e.target.innerHTML;
      const findItem = millionaires.findIndex(
        (element) => element.name === item
      );
      calculateWealth.removeAttribute("disabled");
      millionaires.splice(findItem, 1);

      if (millionaires.length === 0) {
        calculateWealth.setAttribute("disabled", "");
      }
      updateDOM();
    });
  });
};

const formatWealth = (money) => {
  return money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};

const doubling = () => {
  millionaires = millionaires.map((millionair) => {
    return {...millionair, money: millionair.money * 2};
  });
  calculateWealth.removeAttribute("disabled");
  updateDOM();
};

const sortTheRichest = () => {
  millionaires.sort(
    (firstMillionair, secondMillionair) =>
      secondMillionair.money - firstMillionair.money
  );
  calculateWealth.removeAttribute("disabled");
  updateDOM();
};

const showTopMillionaires = () => {
  calculateWealth.removeAttribute("disabled");
  millionaires = millionaires.filter(
    (millionair) => millionair.money > 1000000
  );
  updateDOM();
};

const calculateTotal = () => {
  const total = millionaires.reduce(
    (total, millionair) => (total += millionair.money),
    0
  );

  const div = document.createElement("div");
  div.innerHTML = `<h3>Total Wealth: <strong>$${formatWealth(total)}</h3>`;

  main.appendChild(div);

  calculateWealth.setAttribute("disabled", "");
};

addUser.addEventListener("click", getMillionaires);
doubleMoney.addEventListener("click", doubling);
sortMillionaires.addEventListener("click", sortTheRichest);
showMillionaires.addEventListener("click", showTopMillionaires);
calculateWealth.addEventListener("click", calculateTotal);

if (!millionaires.length) {
  calculateWealth.setAttribute("disabled", "");
}
