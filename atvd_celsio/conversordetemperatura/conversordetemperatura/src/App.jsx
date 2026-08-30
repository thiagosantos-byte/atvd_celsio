import { useState } from 'react'
import './App.css'

function App() {
  const [temp, setTemp] = useState('')
  const [escala, setEscala] = useState('C')
  const [resultado, setResultado] = useState(null)
  const [erro, setErro] = useState('')

  const converter = (e) => {
    e.preventDefault()
    setErro('')
    setResultado(null)

    const valor = parseFloat(temp)
    if (isNaN(valor)) {
      setErro('Informe uma temperatura válida.')
      return
    }

    let convertido, origem, destino
    if (escala === 'C') {
      convertido = (valor * 1.8) + 32
      origem = 'Celsius'
      destino = 'Fahrenheit'
    } else {
      convertido = (valor - 32) / 1.8
      origem = 'Fahrenheit'
      destino = 'Celsius'
    }

    setResultado({
      original: valor,
      convertido: convertido.toFixed(2),
      origem,
      destino
    })
  }

  const limpar = () => {
    setTemp('')
    setEscala('C')
    setResultado(null)
    setErro('')
  }

  return (
    <div className="container">
      <h1>Conversor de Temperaturas</h1>
      <form onSubmit={converter}>
        <div className="campo">
          <label>Temperatura</label>
          <input type="number" step="0.1" value={temp} onChange={e => setTemp(e.target.value)} />
        </div>
        <div className="campo">
          <label>Escala de origem</label>
          <select value={escala} onChange={e => setEscala(e.target.value)}>
            <option value="C">Celsius (°C)</option>
            <option value="F">Fahrenheit (°F)</option>
          </select>
        </div>
        {erro && <p className="erro">{erro}</p>}
        <div className="botoes">
          <button type="submit">Converter</button>
          <button type="button" onClick={limpar} className="secundario">Nova conversão</button>
        </div>
      </form>

      {resultado && (
        <div className="resultado">
          <p>{resultado.original} °{resultado.origem[0]} =</p>
          <p className="destaque">{resultado.convertido} °{resultado.destino[0]}</p>
          <p className="info">{resultado.origem} → {resultado.destino}</p>
        </div>
      )}
    </div>
  )
}

export default App