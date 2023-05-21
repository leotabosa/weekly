import * as bootstrap from "bootstrap";
import "../scss/styles.scss";

window.onload = () => {
  const usuarioLogado = window.localStorage.getItem("_wk.usuario");
  const tela = window.location.pathname;
  const estaEmLoginOuLandingPage =
    tela === "/" || tela === "/login.html" || tela === "";

  if (usuarioLogado && estaEmLoginOuLandingPage) {
    window.location.pathname = "gestao-administrativa.html";
    return;
  }
  if (usuarioLogado || estaEmLoginOuLandingPage) return;

  window.location.pathname = "/";
};
