function changeTheme(toggleTheme) {
  const themeIcon = toggleTheme.querySelector("i");
  const themeText = toggleTheme.querySelector(".theme-text");

  toggleTheme.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-mode");
    document.body.classList.remove(isDark ? "light-mode" : "dark-mode");
    document.body.classList.add(isDark ? "dark-mode" : "light-mode");

    localStorage.setItem("theme", isDark ? "dark" : "light");

    if (isDark) {
      themeIcon.className = "fas fa-sun";
      themeText.textContent = "Light Mode";
    } else {
      themeIcon.className = "fa-regular fa-moon";
      themeText.textContent = "Dark Mode";
    }
  });

  const savedTheme = localStorage.getItem("theme");

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = savedTheme ? savedTheme === "dark" : prefersDark;

  document.body.classList.add(isDark ? "dark-mode" : "light-mode");
  themeIcon.className = isDark ? "fas fa-sun" : "fa-regular fa-moon";
  themeText.textContent = isDark ? "Light Mode" : "Dark Mode";
}

export default changeTheme;