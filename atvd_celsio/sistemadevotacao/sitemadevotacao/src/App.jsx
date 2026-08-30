import { useState } from 'react'
import './App.css'

const temasIniciais = [
  { id: 1, nome: 'Energia Sustentável', votos: 0 },
  { id: 2, nome: 'Inteligência Artificial', votos: 0 },
  { id: 3, nome: 'Biotecnologia', votos: 0 },
  { id: 4, nome: 'Exploração Espacial', votos: 0 }
]

function App() {
  const [temas, setTemas] = useState(temasIniciais)
  const [votou, setVotou] = useState(false)

  const votar = (id) => {
    setTemas(temas.map(t => t.id === id ? { ...t, votos: t.votos + 1 } : t))
    setVotou(true)
  }

  const reiniciar = () => {
    if (window.confirm('Deseja realmente reiniciar a votação?')) {
      setTemas(temasIniciais)
      setVotou(false)
    }
  }

  const total = temas.reduce((acc, t) => acc + t.votos, 0)
  const maxVotos = Math.max(...temas.map(t => t.votos))
  const vencedores = temas.filter(t => t.votos === maxVotos && maxVotos > 0)

  return (
    <div className="container">
      <h1>Votação – Feira de Ciências</h1>
      {!votou && <p className="orientacao">Escolha um tema para votar:</p>}

      <div className="temas">
        {temas.map(t => (
          <div key={t.id} className="tema">
            <h3>{t.nome}</h3>
            <p>{t.votos} voto(s) {total > 0 && `(${((t.votos / total) * 100).toFixed(1)}%)`}</p>
            <button onClick={() => votar(t.id)}>Votar</button>
          </div>
        ))}
      </div>

      <p className="total">Total de votos: <strong>{total}</strong></p>

      {total > 0 && (
        <div className="resultado">
          {vencedores.length === 1 ? (
            <p>🏆 Vencendo: <strong>{vencedores[0].nome}</strong></p>
          ) : (
            <p>⚖️ Empate entre: {vencedores.map(v => v.nome).join(', ')}</p>
          )}
        </div>
      )}

      <button onClick={reiniciar} className="reiniciar">Reiniciar votação</button>
    </div>
  )
}

export default App