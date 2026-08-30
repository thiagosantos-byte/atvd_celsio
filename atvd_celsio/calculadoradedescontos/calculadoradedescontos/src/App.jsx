import { useState } from 'react'
import './App.css'

function App() {
  const [produto, setProduto] = useState('')
  const [preco, setPreco] = useState('')
  const [percentual, setPercentual] = useState('')
  const [resultado, setResultado] = useState(null)
  const [erro, setErro] = useState('')

  const formatar = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  const calcular = (e) => {
    e.preventDefault()
    setErro('')
    setResultado(null)

    const p = parseFloat(preco)
    const perc = parseFloat(percentual)

    if (!produto.trim() || isNaN(p) || isNaN(perc) || p < 0 || perc < 0 || perc > 100) {
      setErro('Preencha corretamente. Preço ≥ 0 e percentual entre 0 e 100.')
      return
    }

    const desconto = p * (perc / 100)
    const final = p - desconto

    setResultado({
      produto,
      original: formatar(p),
      desconto: formatar(desconto),
      final: formatar(final)
    })
  }

  const limpar = () => {
    setProduto('')
    setPreco('')
    setPercentual('')
    setResultado(null)
    setErro('')
  }

  return (
    <div className="container">
      <h1>Calculadora de Descontos</h1>
      <form onSubmit={calcular}>
        <div className="campo">
          <label>Nome do produto</label>
          <input value={produto} onChange={e => setProduto(e.target.value)} />
        </div>
        <div className="campo">
          <label>Preço original (R$)</label>
          <input type="number" step="0.01" value={preco} onChange={e => setPreco(e.target.value)} />
        </div>
        <div className="campo">
          <label>Percentual de desconto (%)</label>
          <input type="number" step="0.1" value={percentual} onChange={e => setPercentual(e.target.value)} />
        </div>
        {erro && <p className="erro">{erro}</p>}
        <div className="botoes">
          <button type="submit">Calcular</button>
          <button type="button" onClick={limpar} className="secundario">Limpar</button>
        </div>
      </form>

      {resultado && (
        <div className="resultado">
          <h2>{resultado.produto}</h2>
          <p>Preço original: {resultado.original}</p>
          <p>Você economiza: <strong style={{ color: '#38a169' }}>{resultado.desconto}</strong></p>
          <p className="final">Preço final: <strong>{resultado.final}</strong></p>
        </div>
      )}
    </div>
  )
}

export default App