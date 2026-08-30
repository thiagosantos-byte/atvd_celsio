import { useState } from 'react'
import './App.css'

const perguntas = [
  {
    id: 1,
    pergunta: 'Qual é a capital do Brasil?',
    opcoes: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador'],
    correta: 2
  },
  {
    id: 2,
    pergunta: 'Quanto é 7 × 8?',
    opcoes: ['54', '56', '64', '48'],
    correta: 1
  },
  {
    id: 3,
    pergunta: 'Qual planeta é conhecido como Planeta Vermelho?',
    opcoes: ['Vênus', 'Júpiter', 'Marte', 'Saturno'],
    correta: 2
  },
  {
    id: 4,
    pergunta: 'Quem escreveu "Dom Casmurro"?',
    opcoes: ['Machado de Assis', 'José de Alencar', 'Clarice Lispector', 'Graciliano Ramos'],
    correta: 0
  },
  {
    id: 5,
    pergunta: 'Qual é o maior oceano do mundo?',
    opcoes: ['Atlântico', 'Índico', 'Ártico', 'Pacífico'],
    correta: 3
  }
]

function App() {
  const [nome, setNome] = useState('')
  const [iniciado, setIniciado] = useState(false)
  const [atual, setAtual] = useState(0)
  const [respostas, setRespostas] = useState([])
  const [selecionada, setSelecionada] = useState(null)
  const [finalizado, setFinalizado] = useState(false)

  const iniciar = (e) => {
    e.preventDefault()
    if (!nome.trim()) return
    setIniciado(true)
  }

  const proxima = () => {
    if (selecionada === null) return
    const novas = [...respostas, selecionada]
    setRespostas(novas)
    setSelecionada(null)

    if (atual + 1 < perguntas.length) {
      setAtual(atual + 1)
    } else {
      setFinalizado(true)
    }
  }

  const acertos = respostas.filter((r, i) => r === perguntas[i].correta).length
  const percentual = ((acertos / perguntas.length) * 100).toFixed(0)

  let mensagem = ''
  if (percentual >= 80) mensagem = 'Excelente! Você mandou muito bem!'
  else if (percentual >= 60) mensagem = 'Bom trabalho! Continue estudando.'
  else mensagem = 'Continue praticando, você vai melhorar!'

  const refazer = () => {
    setAtual(0)
    setRespostas([])
    setSelecionada(null)
    setFinalizado(false)
    setIniciado(false)
    setNome('')
  }

  if (!iniciado) {
    return (
      <div className="container">
        <h1>Quiz de Conhecimentos</h1>
        <form onSubmit={iniciar}>
          <div className="campo">
            <label>Seu nome</label>
            <input value={nome} onChange={e => setNome(e.target.value)} placeholder="Digite seu nome" />
          </div>
          <button type="submit">Começar Quiz</button>
        </form>
      </div>
    )
  }

  if (finalizado) {
    return (
      <div className="container">
        <h1>Resultado</h1>
        <p className="nome">Olá, {nome}!</p>
        <p className="pontuacao">{acertos} de {perguntas.length} acertos</p>
        <p className="percentual">{percentual}% de aproveitamento</p>
        <p className="mensagem">{mensagem}</p>
        <button onClick={refazer}>Refazer quiz</button>
      </div>
    )
  }

  const p = perguntas[atual]

  return (
    <div className="container">
      <h1>Quiz – Pergunta {atual + 1}/{perguntas.length}</h1>
      <p className="pergunta">{p.pergunta}</p>
      <div className="opcoes">
        {p.opcoes.map((op, i) => (
          <button
            key={i}
            className={`opcao ${selecionada === i ? 'selecionada' : ''}`}
            onClick={() => setSelecionada(i)}
          >
            {op}
          </button>
        ))}
      </div>
      <button onClick={proxima} disabled={selecionada === null} className="proxima">
        {atual + 1 === perguntas.length ? 'Finalizar' : 'Próxima'}
      </button>
    </div>
  )
}

export default App