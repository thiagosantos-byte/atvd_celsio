import { useState } from 'react'
import './App.css'

function App() {
  const [nome, setNome] = useState('')
  const [alunos, setAlunos] = useState([])
  const [erro, setErro] = useState('')

  const adicionar = (e) => {
    e.preventDefault()
    if (!nome.trim()) {
      setErro('Digite o nome do aluno.')
      return
    }
    setAlunos([...alunos, { id: Date.now(), nome: nome.trim(), presente: null }])
    setNome('')
    setErro('')
  }

  const marcar = (id, presente) => {
    setAlunos(alunos.map(a => a.id === id ? { ...a, presente } : a))
  }

  const excluir = (id) => {
    setAlunos(alunos.filter(a => a.id !== id))
  }

  const presentes = alunos.filter(a => a.presente === true).length
  const ausentes = alunos.filter(a => a.presente === false).length
  const totalMarcados = presentes + ausentes
  const percentual = totalMarcados > 0 ? ((presentes / totalMarcados) * 100).toFixed(1) : 0

  return (
    <div className="container">
      <h1>Controle de Frequência</h1>
      <form onSubmit={adicionar} className="formulario">
        <input value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome do aluno" />
        <button type="submit">Adicionar</button>
      </form>
      {erro && <p className="erro">{erro}</p>}

      {alunos.length > 0 && (
        <div className="resumo">
          <span>Presentes: {presentes}</span>
          <span>Ausentes: {ausentes}</span>
          <span>Presença: {percentual}%</span>
        </div>
      )}

      {alunos.length === 0 ? (
        <p className="vazio">Nenhum aluno cadastrado. A chamada ainda não foi realizada.</p>
      ) : (
        <ul className="lista">
          {alunos.map(a => (
            <li key={a.id} className={a.presente === true ? 'presente' : a.presente === false ? 'ausente' : ''}>
              <span>{a.nome}</span>
              <div className="acoes">
                <button onClick={() => marcar(a.id, true)} className="btn-presente">Presente</button>
                <button onClick={() => marcar(a.id, false)} className="btn-ausente">Ausente</button>
                <button onClick={() => excluir(a.id)} className="btn-excluir">Excluir</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App