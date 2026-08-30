import { useState } from 'react'
import './App.css'

function App() {
  const [ambiente, setAmbiente] = useState('')
  const [comprimento, setComprimento] = useState('')
  const [largura, setLargura] = useState('')
  const [resultado, setResultado] = useState(null)
  const [erro, setErro] = useState('')

  function calcular(e) {
    e.preventDefault()
    setErro('')
    setResultado(null)

    const c = parseFloat(comprimento)
    const l = parseFloat(largura)

    if (!ambiente.trim() || isNaN(c) || isNaN(l) || c <= 0 || l <= 0) {
      setErro('Preencha todos os campos com valores positivos.')
      return
    }

    const area = c * l
    setResultado({
      ambiente,
      comprimento: c,
      largura: l,
      area: area.toFixed(2)
    })
  }

  function limpar() {
    setAmbiente('')
    setComprimento('')
    setLargura('')
    setResultado(null)
    setErro('')
  }

  return (
    <div className="container">
      <h1>Cálculo de Área</h1>
      <form onSubmit={calcular}>
        <div className="campo">
          <label>Nome do ambiente</label>
          <input type="text" value={ambiente} onChange={(e) => setAmbiente(e.target.value)} placeholder="Ex: Sala" />
        </div>
        <div className="campo">
          <label>Comprimento (m)</label>
          <input type="number" step="0.01" value={comprimento} onChange={(e) => setComprimento(e.target.value)} />
        </div>
        <div className="campo">
          <label>Largura (m)</label>
          <input type="number" step="0.01" value={largura} onChange={(e) => setLargura(e.target.value)} />
        </div>
        {erro && <p className="erro">{erro}</p>}
        <div className="botoes">
          <button type="submit">Calcular área</button>
          <button type="button" onClick={limpar} className="secundario">Limpar</button>
        </div>
      </form>
      {resultado && (
        <div className="resultado">
          <h2>{resultado.ambiente}</h2>
          <p>Dimensões: {resultado.comprimento} m × {resultado.largura} m</p>
          <p className="destaque">Área: <strong>{resultado.area} m²</strong></p>
        </div>
      )}
    </div>
  )
}

export default App