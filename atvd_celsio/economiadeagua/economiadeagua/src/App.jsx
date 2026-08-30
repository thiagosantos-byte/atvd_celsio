import { useState } from 'react'
import './App.css'

function App() {
  const [moradores, setMoradores] = useState('')
  const [banhos, setBanhos] = useState('')
  const [tempoAtual, setTempoAtual] = useState('')
  const [tempoNovo, setTempoNovo] = useState('')
  const [vazao, setVazao] = useState('')
  const [resultado, setResultado] = useState(null)
  const [erro, setErro] = useState('')

  const calcular = (e) => {
    e.preventDefault()
    setErro('')
    setResultado(null)

    const m = parseInt(moradores)
    const b = parseInt(banhos)
    const ta = parseFloat(tempoAtual)
    const tn = parseFloat(tempoNovo)
    const v = parseFloat(vazao)

    if ([m, b, ta, tn, v].some(x => isNaN(x) || x <= 0)) {
      setErro('Preencha todos os campos com valores positivos.')
      return
    }
    if (tn > ta) {
      setErro('O novo tempo não pode ser maior que o tempo atual.')
      return
    }

    const consumoAtual = m * b * ta * v
    const consumoNovo = m * b * tn * v
    const economiaDiaria = consumoAtual - consumoNovo
    const economiaMensal = economiaDiaria * 30

    setResultado({
      diario: economiaDiaria.toFixed(1),
      mensal: economiaMensal.toFixed(1)
    })
  }

  const limpar = () => {
    setMoradores('')
    setBanhos('')
    setTempoAtual('')
    setTempoNovo('')
    setVazao('')
    setResultado(null)
    setErro('')
  }

  return (
    <div className="container">
      <h1>Economia de Água</h1>
      <form onSubmit={calcular}>
        <div className="campo">
          <label>Quantidade de moradores</label>
          <input type="number" value={moradores} onChange={e => setMoradores(e.target.value)} />
        </div>
        <div className="campo">
          <label>Banhos por pessoa/dia</label>
          <input type="number" value={banhos} onChange={e => setBanhos(e.target.value)} />
        </div>
        <div className="campo">
          <label>Tempo atual de banho (min)</label>
          <input type="number" step="0.5" value={tempoAtual} onChange={e => setTempoAtual(e.target.value)} />
        </div>
        <div className="campo">
          <label>Novo tempo de banho (min)</label>
          <input type="number" step="0.5" value={tempoNovo} onChange={e => setTempoNovo(e.target.value)} />
        </div>
        <div className="campo">
          <label>Vazão do chuveiro (L/min)</label>
          <input type="number" step="0.1" value={vazao} onChange={e => setVazao(e.target.value)} />
        </div>
        {erro && <p className="erro">{erro}</p>}
        <div className="botoes">
          <button type="submit">Calcular economia</button>
          <button type="button" onClick={limpar} className="secundario">Limpar</button>
        </div>
      </form>

      {resultado && (
        <div className="resultado">
          <p>💧 Economia diária: <strong>{resultado.diario} litros</strong></p>
          <p>💧 Economia mensal (30 dias): <strong>{resultado.mensal} litros</strong></p>
          <p className="msg">Cada gota conta! Continue economizando água.</p>
        </div>
      )}
    </div>
  )
}

export default App