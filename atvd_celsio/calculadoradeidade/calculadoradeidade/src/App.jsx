import { useState } from 'react'
import './App.css'

function App() {
  const [nome, setNome] = useState('')
  const [nascimento, setNascimento] = useState('')
  const [resultado, setResultado] = useState(null)
  const [erro, setErro] = useState('')

  const calcular = (e) => {
    e.preventDefault()
    setErro('')
    setResultado(null)

    if (!nome.trim() || !nascimento) {
      setErro('Preencha nome e data de nascimento.')
      return
    }

    const dataNasc = new Date(nascimento)
    const hoje = new Date()

    if (dataNasc > hoje) {
      setErro('A data de nascimento não pode ser futura.')
      return
    }

    let idade = hoje.getFullYear() - dataNasc.getFullYear()
    const mes = hoje.getMonth() - dataNasc.getMonth()
    if (mes < 0 || (mes === 0 && hoje.getDate() < dataNasc.getDate())) {
      idade--
    }

    let classificacao = ''
    if (idade <= 12) classificacao = 'Criança'
    else if (idade <= 17) classificacao = 'Adolescente'
    else if (idade <= 59) classificacao = 'Adulto'
    else classificacao = 'Pessoa idosa'

    setResultado({ nome, idade, classificacao })
  }

  const limpar = () => {
    setNome('')
    setNascimento('')
    setResultado(null)
    setErro('')
  }

  return (
    <div className="container">
      <h1>Calculadora de Idade</h1>
      <form onSubmit={calcular}>
        <div className="campo">
          <label>Nome</label>
          <input value={nome} onChange={e => setNome(e.target.value)} />
        </div>
        <div className="campo">
          <label>Data de nascimento</label>
          <input type="date" value={nascimento} onChange={e => setNascimento(e.target.value)} />
        </div>
        {erro && <p className="erro">{erro}</p>}
        <div className="botoes">
          <button type="submit">Calcular idade</button>
          <button type="button" onClick={limpar} className="secundario">Limpar</button>
        </div>
      </form>

      {resultado && (
        <div className="resultado">
          <h2>{resultado.nome}</h2>
          <p>Idade: <strong>{resultado.idade} anos</strong></p>
          <p className="classificacao">{resultado.classificacao}</p>
        </div>
      )}
    </div>
  )
}

export default App