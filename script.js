document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname;

  if (currentPage.includes("index.html") || currentPage === "/") {
    document.getElementById("login-form").addEventListener("submit", async (e) => {
      e.preventDefault();

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      const response = await fetch("users.json");
      const users = await response.json();

      const user = users.find(user => user.username === username && user.password === password);

      if (user) {
        const expiryDate = new Date(user.expiry);
        const currentDate = new Date();

        if (currentDate > expiryDate) {
          alert("Your account has expired!");
          return;
        }

        sessionStorage.setItem("loggedIn", "true");
        sessionStorage.setItem("expiryDate", user.expiry);
        window.location.href = "main.html";
      } else {
        alert("Invalid credentials!");
      }
    });
  }

  if (currentPage.includes("main.html")) {
    const loggedIn = sessionStorage.getItem("loggedIn");
    const expiryDate = new Date(sessionStorage.getItem("expiryDate"));
    const currentDate = new Date();

    if (!loggedIn || currentDate > expiryDate) {
      sessionStorage.clear();
      alert("Session expired or not logged in.");
      window.location.href = "index.html";
    }

    document.getElementById("logout-button").addEventListener("click", () => {
      sessionStorage.clear();
      window.location.href = "index.html";
    });
  }
});
ram
