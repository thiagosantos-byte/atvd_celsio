import { useState } from 'react'
import './App.css'

function App() {
  const [titulo, setTitulo] = useState('')
  const [autor, setAutor] = useState('')
  const [ano, setAno] = useState('')
  const [categoria, setCategoria] = useState('')
  const [disponivel, setDisponivel] = useState(true)
  const [livros, setLivros] = useState([])
  const [busca, setBusca] = useState('')
  const [erro, setErro] = useState('')

  const adicionar = (e) => {
    e.preventDefault()
    if (!titulo.trim() || !autor.trim()) {
      setErro('Título e autor são obrigatórios.')
      return
    }
    setLivros([...livros, {
      id: Date.now(),
      titulo: titulo.trim(),
      autor: autor.trim(),
      ano: ano || '—',
      categoria: categoria || 'Geral',
      disponivel
    }])
    setTitulo('')
    setAutor('')
    setAno('')
    setCategoria('')
    setDisponivel(true)
    setErro('')
  }

  const excluir = (id) => {
    setLivros(livros.filter(l => l.id !== id))
  }

  const filtrados = livros.filter(l =>
    l.titulo.toLowerCase().includes(busca.toLowerCase())
  )

  return (
    <div className="container">
      <h1>Biblioteca Comunitária</h1>
      <form onSubmit={adicionar} className="formulario">
        <input value={titulo} onChange={e => setTitulo(e.target.value)} placeholder="Título" />
        <input value={autor} onChange={e => setAutor(e.target.value)} placeholder="Autor" />
        <input type="number" value={ano} onChange={e => setAno(e.target.value)} placeholder="Ano" />
        <input value={categoria} onChange={e => setCategoria(e.target.value)} placeholder="Categoria" />
        <label className="check">
          <input type="checkbox" checked={disponivel} onChange={e => setDisponivel(e.target.checked)} />
          Disponível
        </label>
        <button type="submit">Cadastrar</button>
      </form>
      {erro && <p className="erro">{erro}</p>}

      <input
        className="busca"
        value={busca}
        onChange={e => setBusca(e.target.value)}
        placeholder="Pesquisar por título..."
      />

      <p className="total">Total de livros: {livros.length}</p>

      {filtrados.length === 0 ? (
        <p className="vazio">{busca ? 'Nenhum resultado encontrado.' : 'Nenhum livro cadastrado.'}</p>
      ) : (
        <div className="cards">
          {filtrados.map(l => (
            <div key={l.id} className={`card ${l.disponivel ? '' : 'emprestado'}`}>
              <h3>{l.titulo}</h3>
              <p>{l.autor} • {l.ano}</p>
              <p>{l.categoria}</p>
              <p className="status">{l.disponivel ? '✅ Disponível' : '📕 Emprestado'}</p>
              <button onClick={() => excluir(l.id)}>Excluir</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App