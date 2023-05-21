import api from "./clientApi.js";

document.getElementById("form-login").onsubmit = () => {
  autenticar();
  return false;
};

async function autenticar() {
  try {
    document.getElementById("botao-login").setAttribute("disabled", "");
    document.getElementById("erro-login").classList.add("d-none");
    const email = document.getElementById("input-email").value;
    const senha = document.getElementById("input-senha").value;
    const resposta = await api.post("/auth", { email, senha });

    window.localStorage.setItem(
      "_wk.usuario",
      JSON.stringify((resposta && resposta.data) || null)
    );
    window.location.pathname = "gestao-administrativa.html";
  } catch (error) {
    document.getElementById("erro-login").classList.remove("d-none");
    document.getElementById("erro-login").innerText = error.response.data.erro;
  } finally {
    document.getElementById("botao-login").removeAttribute("disabled");
  }
}
