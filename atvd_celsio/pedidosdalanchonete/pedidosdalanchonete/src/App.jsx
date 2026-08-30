import { useState } from 'react'
import './App.css'

const cardapio = [
  { id: 1, nome: 'X-Burger', preco: 18.90 },
  { id: 2, nome: 'X-Salada', preco: 20.90 },
  { id: 3, nome: 'Batata Frita', preco: 12.50 },
  { id: 4, nome: 'Refrigerante', preco: 6.00 },
  { id: 5, nome: 'Suco Natural', preco: 8.50 }
]

function App() {
  const [pedido, setPedido] = useState([])
  const [finalizado, setFinalizado] = useState(false)

  const formatar = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  const adicionar = (produto) => {
    const existente = pedido.find(i => i.id === produto.id)
    if (existente) {
      setPedido(pedido.map(i => i.id === produto.id ? { ...i, qtd: i.qtd + 1 } : i))
    } else {
      setPedido([...pedido, { ...produto, qtd: 1 }])
    }
    setFinalizado(false)
  }

  const alterarQtd = (id, delta) => {
    setPedido(pedido.map(i => {
      if (i.id === id) {
        const nova = i.qtd + delta
        return nova < 1 ? i : { ...i, qtd: nova }
      }
      return i
    }).filter(i => i.qtd >= 1))
  }

  const remover = (id) => {
    setPedido(pedido.filter(i => i.id !== id))
  }

  const total = pedido.reduce((acc, i) => acc + (i.preco * i.qtd), 0)

  const finalizar = () => {
    if (pedido.length === 0) return
    setFinalizado(true)
    setPedido([])
  }

  return (
    <div className="container">
      <h1>Lanchonete</h1>

      <div className="cardapio">
        {cardapio.map(p => (
          <div key={p.id} className="item-cardapio">
            <span>{p.nome} – {formatar(p.preco)}</span>
            <button onClick={() => adicionar(p)}>Adicionar</button>
          </div>
        ))}
      </div>

      <h2>Pedido</h2>
      {pedido.length === 0 ? (
        <p className="vazio">{finalizado ? '✅ Pedido finalizado com sucesso!' : 'Nenhum item no pedido.'}</p>
      ) : (
        <>
          <ul className="pedido">
            {pedido.map(i => (
              <li key={i.id}>
                <span>{i.nome}</span>
                <div className="qtd">
                  <button onClick={() => alterarQtd(i.id, -1)}>−</button>
                  <span>{i.qtd}</span>
                  <button onClick={() => alterarQtd(i.id, 1)}>+</button>
                </div>
                <span>{formatar(i.preco * i.qtd)}</span>
                <button onClick={() => remover(i.id)} className="remover">✕</button>
              </li>
            ))}
          </ul>
          <p className="total">Total: <strong>{formatar(total)}</strong></p>
          <button onClick={finalizar} className="finalizar">Finalizar Pedido</button>
        </>
      )}
    </div>
  )
}

export default App