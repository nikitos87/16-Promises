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

// getAllUsers(USERS_URL, "GET");

// Задание #2

const getUsersByIds = (ids) => {
  setLoader();
  const users = ids.map((id) => fetch(`${USERS_URL}/${id}`));
  Promise.all(users)
    .then((responses) => {
      const result = responses.map((resp) => resp.json());
      // console.log(result);
      return Promise.all(result);
    })
    .then((users) => {
      users.forEach((user) => createUser(user.name));
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setLoader();
    });
};

getUsersByIds([5, 6, 2, 1]);
