document.getElementById("login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const userId = document.getElementById("userId").value;
  const password = document.getElementById("password").value;

  fetch("users.json")
    .then(response => response.json())
    .then(data => {
      const user = data.users.find(user => user.userId === userId);

      if (user) {
        if (user.password === password) {
          const expiryDate = new Date(user.expiry);
          const currentDate = new Date();

          if (currentDate <= expiryDate) {
            sessionStorage.setItem("loggedInUser", JSON.stringify(user));
            window.location.href = "main.html";
          } else {
            alert("Your login has expired.");
          }
        } else {
          alert("Invalid password.");
        }
      } else {
        alert("User not found.");
      }
    })
    .catch(error => {
      console.error("Error fetching user data:", error);
    });
});
