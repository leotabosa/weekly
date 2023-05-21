document.getElementById("botao-sair").addEventListener("click", () => {
  window.localStorage.removeItem("_wk.usuario");
  window.location.pathname = "/";
});
