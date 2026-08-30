import { useState } from 'react'
import './App.css'

function App() {
  const [nome, setNome] = useState('')
  const [bruto, setBruto] = useState('')
  const [percentual, setPercentual] = useState('')
  const [beneficios, setBeneficios] = useState('')
  const [resultado, setResultado] = useState(null)
  const [erro, setErro] = useState('')

  const formatar = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  const calcular = (e) => {
    e.preventDefault()
    setErro('')
    setResultado(null)

    const b = parseFloat(bruto)
    const perc = parseFloat(percentual)
    const ben = parseFloat(beneficios) || 0

    if (!nome.trim() || isNaN(b) || isNaN(perc) || b < 0 || perc < 0) {
      setErro('Preencha nome, salário bruto e percentual de desconto corretamente.')
      return
    }

    const desconto = b * (perc / 100)
    const liquido = b - desconto + ben

    setResultado({
      nome,
      bruto: formatar(b),
      desconto: formatar(desconto),
      beneficios: formatar(ben),
      liquido: formatar(liquido)
    })
  }

  const limpar = () => {
    setNome('')
    setBruto('')
    setPercentual('')
    setBeneficios('')
    setResultado(null)
    setErro('')
  }

  return (
    <div className="container">
      <h1>Calculadora de Salário</h1>
      <form onSubmit={calcular}>
        <div className="campo">
          <label>Nome</label>
          <input value={nome} onChange={e => setNome(e.target.value)} />
        </div>
        <div className="campo">
          <label>Salário bruto (R$)</label>
          <input type="number" step="0.01" value={bruto} onChange={e => setBruto(e.target.value)} />
        </div>
        <div className="campo">
          <label>Percentual de desconto (%)</label>
          <input type="number" step="0.1" value={percentual} onChange={e => setPercentual(e.target.value)} />
        </div>
        <div className="campo">
          <label>Benefícios (R$)</label>
          <input type="number" step="0.01" value={beneficios} onChange={e => setBeneficios(e.target.value)} />
        </div>
        {erro && <p className="erro">{erro}</p>}
        <div className="botoes">
          <button type="submit">Calcular</button>
          <button type="button" onClick={limpar} className="secundario">Limpar</button>
        </div>
      </form>

      {resultado && (
        <div className="resultado">
          <h2>{resultado.nome}</h2>
          <p>Salário bruto: {resultado.bruto}</p>
          <p>Descontos: {resultado.desconto}</p>
          <p>Benefícios: {resultado.beneficios}</p>
          <p className="liquido">Salário líquido: <strong>{resultado.liquido}</strong></p>
        </div>
      )}
    </div>
  )
}

export default App