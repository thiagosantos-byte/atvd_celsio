import { useState } from 'react'
import './App.css'

function App() {
  const [descricao, setDescricao] = useState('')
  const [valor, setValor] = useState('')
  const [tipo, setTipo] = useState('despesa')
  const [categoria, setCategoria] = useState('')
  const [data, setData] = useState('')
  const [movimentacoes, setMovimentacoes] = useState([])
  const [erro, setErro] = useState('')

  const formatar = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  const adicionar = (e) => {
    e.preventDefault()
    const v = parseFloat(valor)
    if (!descricao.trim() || isNaN(v) || v <= 0) {
      setErro('Descrição e valor positivo são obrigatórios.')
      return
    }
    setMovimentacoes([...movimentacoes, {
      id: Date.now(),
      descricao: descricao.trim(),
      valor: v,
      tipo,
      categoria: categoria.trim() || 'Geral',
      data: data || new Date().toISOString().slice(0, 10)
    }])
    setDescricao('')
    setValor('')
    setTipo('despesa')
    setCategoria('')
    setData('')
    setErro('')
  }

  const excluir = (id) => {
    setMovimentacoes(movimentacoes.filter(m => m.id !== id))
  }

  const receitas = movimentacoes.filter(m => m.tipo === 'receita').reduce((acc, m) => acc + m.valor, 0)
  const despesas = movimentacoes.filter(m => m.tipo === 'despesa').reduce((acc, m) => acc + m.valor, 0)
  const saldo = receitas - despesas

  return (
    <div className="container">
      <h1>Orçamento Doméstico</h1>
      <form onSubmit={adicionar} className="formulario">
        <input value={descricao} onChange={e => setDescricao(e.target.value)} placeholder="Descrição" />
        <input type="number" step="0.01" value={valor} onChange={e => setValor(e.target.value)} placeholder="Valor" />
        <select value={tipo} onChange={e => setTipo(e.target.value)}>
          <option value="receita">Receita</option>
          <option value="despesa">Despesa</option>
        </select>
        <input value={categoria} onChange={e => setCategoria(e.target.value)} placeholder="Categoria" />
        <input type="date" value={data} onChange={e => setData(e.target.value)} />
        <button type="submit">Adicionar</button>
      </form>
      {erro && <p className="erro">{erro}</p>}

      <div className="resumo">
        <div>
          <span>Receitas</span>
          <strong style={{ color: '#16a34a' }}>{formatar(receitas)}</strong>
        </div>
        <div>
          <span>Despesas</span>
          <strong style={{ color: '#dc2626' }}>{formatar(despesas)}</strong>
        </div>
        <div>
          <span>Saldo</span>
          <strong style={{ color: saldo >= 0 ? '#16a34a' : '#dc2626' }}>{formatar(saldo)}</strong>
        </div>
      </div>

      {movimentacoes.length === 0 ? (
        <p className="vazio">Nenhum registro encontrado.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Descrição</th>
              <th>Categoria</th>
              <th>Tipo</th>
              <th>Valor</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {movimentacoes.map(m => (
              <tr key={m.id}>
                <td>{m.data}</td>
                <td>{m.descricao}</td>
                <td>{m.categoria}</td>
                <td className={m.tipo}>{m.tipo}</td>
                <td>{formatar(m.valor)}</td>
                <td><button onClick={() => excluir(m.id)} className="excluir">Excluir</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default App