const modeToggleBtn = document.getElementById("modeToggleBtn");
const body = document.body;

modeToggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  const isDarkMode = body.classList.contains("dark-mode");
  
  if (isDarkMode) {
    modeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
  } else {
    modeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
  }
});
