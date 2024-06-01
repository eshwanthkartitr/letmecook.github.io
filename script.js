document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "dark") {
      document.body.classList.add("dark-mode");
    }
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      let theme = "light";
      if (document.body.classList.contains("dark-mode")) {
        theme = "dark";
      }
      localStorage.setItem("theme", theme);
    });
  });

  function copyCode() {
    const codeBlock = document.getElementById('codeBlock');
    const textArea = document.createElement('textarea');
    textArea.value = codeBlock.innerText;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    alert('Code copied to clipboard');
}