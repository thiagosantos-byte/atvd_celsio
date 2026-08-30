import { useState } from 'react'
import './App.css'

function App() {
  const [descricao, setDescricao] = useState('')
  const [disciplina, setDisciplina] = useState('')
  const [data, setData] = useState('')
  const [prioridade, setPrioridade] = useState('media')
  const [tarefas, setTarefas] = useState([])
  const [erro, setErro] = useState('')

  const adicionar = (e) => {
    e.preventDefault()
    if (!descricao.trim()) {
      setErro('A descrição é obrigatória.')
      return
    }
    setTarefas([...tarefas, {
      id: Date.now(),
      descricao: descricao.trim(),
      disciplina: disciplina.trim() || 'Geral',
      data,
      prioridade,
      concluida: false
    }])
    setDescricao('')
    setDisciplina('')
    setData('')
    setPrioridade('media')
    setErro('')
  }

  const toggleConcluida = (id) => {
    setTarefas(tarefas.map(t => t.id === id ? { ...t, concluida: !t.concluida } : t))
  }

  const excluir = (id) => {
    setTarefas(tarefas.filter(t => t.id !== id))
  }

  const pendentes = tarefas.filter(t => !t.concluida).length
  const concluidas = tarefas.filter(t => t.concluida).length

  return (
    <div className="container">
      <h1>Tarefas Acadêmicas</h1>
      <form onSubmit={adicionar} className="formulario">
        <input value={descricao} onChange={e => setDescricao(e.target.value)} placeholder="Descrição da tarefa" />
        <input value={disciplina} onChange={e => setDisciplina(e.target.value)} placeholder="Disciplina" />
        <input type="date" value={data} onChange={e => setData(e.target.value)} />
        <select value={prioridade} onChange={e => setPrioridade(e.target.value)}>
          <option value="baixa">Prioridade Baixa</option>
          <option value="media">Prioridade Média</option>
          <option value="alta">Prioridade Alta</option>
        </select>
        <button type="submit">Adicionar</button>
      </form>
      {erro && <p className="erro">{erro}</p>}

      <div className="totais">
        <span>Pendentes: {pendentes}</span>
        <span>Concluídas: {concluidas}</span>
      </div>

      {tarefas.length === 0 ? (
        <p className="vazio">Nenhuma tarefa cadastrada.</p>
      ) : (
        <ul className="lista">
          {tarefas.map(t => (
            <li key={t.id} className={`${t.concluida ? 'concluida' : ''} prioridade-${t.prioridade}`}>
              <div>
                <strong>{t.descricao}</strong>
                <p>{t.disciplina} {t.data && `• ${t.data}`}</p>
              </div>
              <div className="acoes">
                <button onClick={() => toggleConcluida(t.id)}>
                  {t.concluida ? 'Desfazer' : 'Concluir'}
                </button>
                <button onClick={() => excluir(t.id)} className="excluir">Excluir</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App