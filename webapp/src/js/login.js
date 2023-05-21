import api from "./clientApi.js";

document.getElementById("form-login").onsubmit = () => {
  autenticar();
  return false;
};

async function autenticar() {
  try {
    document.getElementById("erro-login").classList.add("d-none");
    const email = document.getElementById("input-email").value;
    const senha = document.getElementById("input-senha").value;
    const resposta = await api.post("/auth", { email, senha });

    window.localStorage.setItem(
      "_wk.usuario",
      JSON.stringify((resposta && resposta.data) || null)
    );
  } catch (error) {
    document.getElementById("erro-login").classList.remove("d-none");
    document.getElementById("erro-login").innerText = error.response.data.erro;
  }
}
