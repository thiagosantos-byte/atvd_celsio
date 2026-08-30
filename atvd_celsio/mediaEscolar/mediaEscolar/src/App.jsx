import { useState } from 'react'
import './App.css'

function App() {
  const [nome, setNome] = useState('')
  const [n1, setN1] = useState('')
  const [n2, setN2] = useState('')
  const [n3, setN3] = useState('')
  const [n4, setN4] = useState('')
  const [resultado, setResultado] = useState(null)
  const [erro, setErro] = useState('')

  const calcular = (e) => {
    e.preventDefault()
    setErro('')
    setResultado(null)

    if (!nome.trim()) {
      setErro('Informe o nome do aluno.')
      return
    }

    const notas = [n1, n2, n3, n4].map(n => parseFloat(n))
    if (notas.some(n => isNaN(n) || n < 0 || n > 10)) {
      setErro('Todas as notas devem estar entre 0 e 10.')
      return
    }

    const media = (notas[0] + notas[1] + notas[2] + notas[3]) / 4
    let situacao = ''
    let cor = ''

    if (media >= 7) {
      situacao = 'Aprovado'
      cor = '#27ae60'
    } else if (media >= 5) {
      situacao = 'Recuperação'
      cor = '#f39c12'
    } else {
      situacao = 'Reprovado'
      cor = '#e74c3c'
    }

    setResultado({
      nome,
      media: media.toFixed(1),
      situacao,
      cor
    })
  }

  const limpar = () => {
    setNome('')
    setN1('')
    setN2('')
    setN3('')
    setN4('')
    setResultado(null)
    setErro('')
  }

  return (
    <div className="container">
      <h1>Média Escolar</h1>
      <form onSubmit={calcular}>
        <div className="campo">
          <label>Nome do aluno</label>
          <input value={nome} onChange={e => setNome(e.target.value)} />
        </div>
        <div className="notas">
          <div className="campo">
            <label>Nota 1</label>
            <input type="number" step="0.1" value={n1} onChange={e => setN1(e.target.value)} />
          </div>
          <div className="campo">
            <label>Nota 2</label>
            <input type="number" step="0.1" value={n2} onChange={e => setN2(e.target.value)} />
          </div>
          <div className="campo">
            <label>Nota 3</label>
            <input type="number" step="0.1" value={n3} onChange={e => setN3(e.target.value)} />
          </div>
          <div className="campo">
            <label>Nota 4</label>
            <input type="number" step="0.1" value={n4} onChange={e => setN4(e.target.value)} />
          </div>
        </div>
        {erro && <p className="erro">{erro}</p>}
        <div className="botoes">
          <button type="submit">Calcular média</button>
          <button type="button" onClick={limpar} className="secundario">Limpar</button>
        </div>
      </form>

      {resultado && (
        <div className="resultado" style={{ borderColor: resultado.cor }}>
          <h2>{resultado.nome}</h2>
          <p>Média: <strong>{resultado.media}</strong></p>
          <p style={{ color: resultado.cor, fontWeight: 'bold', fontSize: '1.2rem' }}>{resultado.situacao}</p>
        </div>
      )}
    </div>
  )
}

export default App