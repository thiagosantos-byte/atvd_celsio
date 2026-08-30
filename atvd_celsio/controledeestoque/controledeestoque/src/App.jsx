import { useState } from 'react'
import './App.css'

function App() {
  const [nome, setNome] = useState('')
  const [quantidade, setQuantidade] = useState('')
  const [minimo, setMinimo] = useState('')
  const [preco, setPreco] = useState('')
  const [produtos, setProdutos] = useState([])
  const [erro, setErro] = useState('')

  const formatar = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  const adicionar = (e) => {
    e.preventDefault()
    const q = parseInt(quantidade)
    const m = parseInt(minimo)
    const p = parseFloat(preco)

    if (!nome.trim() || isNaN(q) || isNaN(m) || isNaN(p) || q < 0 || m < 0 || p < 0) {
      setErro('Preencha todos os campos com valores válidos (≥ 0).')
      return
    }

    setProdutos([...produtos, {
      id: Date.now(),
      nome: nome.trim(),
      quantidade: q,
      minimo: m,
      preco: p
    }])
    setNome('')
    setQuantidade('')
    setMinimo('')
    setPreco('')
    setErro('')
  }

  const excluir = (id) => {
    setProdutos(produtos.filter(p => p.id !== id))
  }

  const totalFinanceiro = produtos.reduce((acc, p) => acc + (p.quantidade * p.preco), 0)

  return (
    <div className="container">
      <h1>Estoque da Papelaria</h1>
      <form onSubmit={adicionar} className="formulario">
        <input value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome do produto" />
        <input type="number" value={quantidade} onChange={e => setQuantidade(e.target.value)} placeholder="Quantidade" />
        <input type="number" value={minimo} onChange={e => setMinimo(e.target.value)} placeholder="Estoque mínimo" />
        <input type="number" step="0.01" value={preco} onChange={e => setPreco(e.target.value)} placeholder="Preço unitário" />
        <button type="submit">Cadastrar</button>
      </form>
      {erro && <p className="erro">{erro}</p>}

      <p className="info">Produtos cadastrados: <strong>{produtos.length}</strong> | Valor total: <strong>{formatar(totalFinanceiro)}</strong></p>

      {produtos.length === 0 ? (
        <p className="vazio">Nenhum produto cadastrado.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Qtd</th>
              <th>Mín</th>
              <th>Preço</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {produtos.map(p => (
              <tr key={p.id} className={p.quantidade < p.minimo ? 'baixo' : ''}>
                <td>{p.nome}</td>
                <td>{p.quantidade}</td>
                <td>{p.minimo}</td>
                <td>{formatar(p.preco)}</td>
                <td>{p.quantidade < p.minimo ? '⚠️ Reposição necessária' : 'OK'}</td>
                <td><button onClick={() => excluir(p.id)} className="excluir">Excluir</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default App