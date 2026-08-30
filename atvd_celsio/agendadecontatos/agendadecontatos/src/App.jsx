import { useState } from 'react'
import './App.css'

function App() {
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [email, setEmail] = useState('')
  const [empresa, setEmpresa] = useState('')
  const [contatos, setContatos] = useState([])
  const [busca, setBusca] = useState('')
  const [erro, setErro] = useState('')

  const adicionar = (e) => {
    e.preventDefault()
    if (!nome.trim() || !telefone.trim()) {
      setErro('Nome e telefone são obrigatórios.')
      return
    }
    setContatos([...contatos, {
      id: Date.now(),
      nome: nome.trim(),
      telefone: telefone.trim(),
      email: email.trim(),
      empresa: empresa.trim()
    }])
    setNome('')
    setTelefone('')
    setEmail('')
    setEmpresa('')
    setErro('')
  }

  const excluir = (id) => {
    setContatos(contatos.filter(c => c.id !== id))
  }

  const filtrados = contatos.filter(c =>
    c.nome.toLowerCase().includes(busca.toLowerCase())
  )

  return (
    <div className="container">
      <h1>Agenda de Contatos</h1>
      <form onSubmit={adicionar} className="formulario">
        <input value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome *" />
        <input value={telefone} onChange={e => setTelefone(e.target.value)} placeholder="Telefone *" />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail" />
        <input value={empresa} onChange={e => setEmpresa(e.target.value)} placeholder="Empresa" />
        <button type="submit">Cadastrar</button>
      </form>
      {erro && <p className="erro">{erro}</p>}

      <input
        className="busca"
        value={busca}
        onChange={e => setBusca(e.target.value)}
        placeholder="Pesquisar por nome..."
      />

      <p className="total">Contatos: {contatos.length}</p>

      {filtrados.length === 0 ? (
        <p className="vazio">{busca ? 'Nenhum contato encontrado.' : 'Nenhum contato cadastrado.'}</p>
      ) : (
        <div className="cards">
          {filtrados.map(c => (
            <div key={c.id} className="card">
              <h3>{c.nome}</h3>
              <p>📞 {c.telefone}</p>
              {c.email && <p>✉️ {c.email}</p>}
              {c.empresa && <p>🏢 {c.empresa}</p>}
              <button onClick={() => excluir(c.id)}>Excluir</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App