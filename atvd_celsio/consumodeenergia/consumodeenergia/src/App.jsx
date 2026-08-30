import { useState } from 'react'
import './App.css'

function App() {
  const [nome, setNome] = useState('')
  const [potencia, setPotencia] = useState('')
  const [horas, setHoras] = useState('')
  const [dias, setDias] = useState('')
  const [tarifa, setTarifa] = useState('')
  const [resultado, setResultado] = useState(null)
  const [erro, setErro] = useState('')

  const formatar = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  const calcular = (e) => {
    e.preventDefault()
    setErro('')
    setResultado(null)

    const pot = parseFloat(potencia)
    const h = parseFloat(horas)
    const d = parseFloat(dias)
    const t = parseFloat(tarifa)

    if (!nome.trim() || [pot, h, d, t].some(v => isNaN(v) || v <= 0)) {
      setErro('Preencha todos os campos com valores positivos.')
      return
    }

    const consumo = (pot * h * d) / 1000
    const custo = consumo * t

    setResultado({
      nome,
      consumo: consumo.toFixed(2),
      custo: formatar(custo)
    })
  }

  const limpar = () => {
    setNome('')
    setPotencia('')
    setHoras('')
    setDias('')
    setTarifa('')
    setResultado(null)
    setErro('')
  }

  return (
    <div className="container">
      <h1>Consumo de Energia</h1>
      <form onSubmit={calcular}>
        <div className="campo">
          <label>Nome do equipamento</label>
          <input value={nome} onChange={e => setNome(e.target.value)} />
        </div>
        <div className="campo">
          <label>Potência (W)</label>
          <input type="number" value={potencia} onChange={e => setPotencia(e.target.value)} />
        </div>
        <div className="campo">
          <label>Horas de uso por dia</label>
          <input type="number" step="0.5" value={horas} onChange={e => setHoras(e.target.value)} />
        </div>
        <div className="campo">
          <label>Dias de uso no mês</label>
          <input type="number" value={dias} onChange={e => setDias(e.target.value)} />
        </div>
        <div className="campo">
          <label>Tarifa (R$/kWh)</label>
          <input type="number" step="0.01" value={tarifa} onChange={e => setTarifa(e.target.value)} />
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
          <p>Consumo mensal: <strong>{resultado.consumo} kWh</strong></p>
          <p>Custo estimado: <strong>{resultado.custo}</strong></p>
        </div>
      )}
    </div>
  )
}

export default App