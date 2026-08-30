import { useState } from 'react'
import './App.css'

function App() {
  const [cliente, setCliente] = useState('')
  const [capital, setCapital] = useState('')
  const [taxa, setTaxa] = useState('')
  const [prazo, setPrazo] = useState('')
  const [resultado, setResultado] = useState(null)
  const [erro, setErro] = useState('')

  const formatar = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  const calcular = (e) => {
    e.preventDefault()
    setErro('')
    setResultado(null)

    const c = parseFloat(capital)
    const t = parseFloat(taxa)
    const p = parseInt(prazo)

    if (!cliente.trim() || isNaN(c) || isNaN(t) || isNaN(p) || c <= 0 || t <= 0 || p <= 0) {
      setErro('Preencha todos os campos com valores positivos.')
      return
    }

    const juros = c * (t / 100) * p
    const total = c + juros
    const parcela = total / p

    setResultado({
      cliente,
      capital: formatar(c),
      juros: formatar(juros),
      total: formatar(total),
      parcela: formatar(parcela),
      prazo: p
    })
  }

  const limpar = () => {
    setCliente('')
    setCapital('')
    setTaxa('')
    setPrazo('')
    setResultado(null)
    setErro('')
  }

  return (
    <div className="container">
      <h1>Simulador de Empréstimo</h1>
      <p className="aviso">Resultado apenas informativo. Não representa proposta oficial.</p>
      <form onSubmit={calcular}>
        <div className="campo">
          <label>Nome do cliente</label>
          <input value={cliente} onChange={e => setCliente(e.target.value)} />
        </div>
        <div className="campo">
          <label>Capital (R$)</label>
          <input type="number" step="0.01" value={capital} onChange={e => setCapital(e.target.value)} />
        </div>
        <div className="campo">
          <label>Taxa mensal (%)</label>
          <input type="number" step="0.01" value={taxa} onChange={e => setTaxa(e.target.value)} />
        </div>
        <div className="campo">
          <label>Prazo (meses)</label>
          <input type="number" value={prazo} onChange={e => setPrazo(e.target.value)} />
        </div>
        {erro && <p className="erro">{erro}</p>}
        <div className="botoes">
          <button type="submit">Simular</button>
          <button type="button" onClick={limpar} className="secundario">Limpar</button>
        </div>
      </form>

      {resultado && (
        <div className="resultado">
          <h2>{resultado.cliente}</h2>
          <p>Capital: {resultado.capital}</p>
          <p>Juros totais: {resultado.juros}</p>
          <p>Valor total: <strong>{resultado.total}</strong></p>
          <p>Parcela ({resultado.prazo}x): <strong>{resultado.parcela}</strong></p>
        </div>
      )}
    </div>
  )
}

export default App