import { useState } from "react";

function App() {

  const [dados, setDados] = useState()
  const [cep, setCep] = useState()
  const [endereco, setEndereco] = useState("")
  const [bairro, setbairro] = useState("")
  const [cidade, setcidade] = useState("")
  const [uf, setuf] = useState("")
  const [complemento, setcomplemento] = useState("")

  function validarCep(cep) {
    // Expressão regular para validar o formato do CEP
    const regex = /^[0-9]{5}-?[0-9]{3}$/;
    return regex.test(cep);
  }

  async function buscar_cep(){

    if (!cep || !validarCep(cep)) {
      alert("Por favor, insira um CEP válido.");
      return;
    }

    try{
      const requisicao = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      const resposta = await requisicao.json()

      if (resposta.erro) {
        alert("CEP não encontrado.");
        return;
      }
    

    setDados(resposta)
    setEndereco(resposta.logradouro)
    setbairro(resposta.bairro)
    setcidade(resposta.localidade)
    setuf(resposta.uf)
    setcomplemento(resposta.complemento)
    console.log(resposta)
  }catch (error) {
    console.error("Erro ao buscar CEP:", error);
    alert("Houve um erro ao tentar buscar o CEP.");
  }
}
  

  return (
    <>
      <style>
          {`
            /* Resetando margin e padding e garantindo que a altura ocupe 100% */
            html, body {
              height: 100%;
              margin: 0;
              padding: 0;
            }
          `}
        </style>
      
      <div style={{display: "flex",justifyContent: "center", alignItems: "center", height: "100vh"}}>
        <form style={
          {display: "flex",
          flexDirection: "column",
          gap: "5px",
          width: "30vw"}
          }>
          <label>CEP</label>
          <input onBlur={buscar_cep} onChange={(e)=> setCep(e.target.value)}  type="text"/>
        
          <label>Endereço</label>
          <input value={endereco} type="text"/>
          <label>Bairro</label>
          <input value={bairro} type="text"/>
          <label>Cidade</label>
          <input value={cidade} type="text"/>
          <label>UF</label>
          <input value={uf} type="text"/>
          <label>Complemento</label>
          <input value={complemento} type="text"/>
        </form>
      </div>
    </>
      

  );
}

export default App;