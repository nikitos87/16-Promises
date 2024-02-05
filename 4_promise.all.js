// Задание #1

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

const setLoader = () => {
  const loader = document.querySelector("#loader");
  if (loader.hasAttribute("hidden")) {
    loader.removeAttribute("hidden");
  } else {
    loader.setAttribute("hidden", "");
  }
};

const getAllUsers = (url, method) => {
  setLoader();
  const result = fetch(url, {
    method: method,
  });

  result
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка загрузки пользователей.");
      }
      return response.json();
    })
    .then((users) => {
      users.forEach((user) => createUser(user.name));
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setLoader();
    });
};

function createUser(name) {
  const dataContainer = document.querySelector("#data-container");
  const userElement = document.createElement("li");
  const userLink = document.createElement("a");
  userLink.setAttribute("href", "#");
  userLink.textContent = name;
  userElement.append(userLink);
  dataContainer.append(userElement);
}

getAllUsers(USERS_URL, "GET");
