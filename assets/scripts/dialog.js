const cookieModal = document.getElementById("cookieModal");

if (!localStorage.getItem("cookieConsent")) {
  cookieModal.showModal();
}

document.getElementById("cookieAllow").addEventListener("click", () => {
  localStorage.setItem("cookieConsent", "allowed");
  document.body.classList.add("consent");
});
document.getElementById("cookieDeny").addEventListener("click", () => {
  localStorage.setItem("cookieConsent", "denied");
  document.body.classList.remove("consent");
});
