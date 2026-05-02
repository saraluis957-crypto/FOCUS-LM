import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*, products(*))')
      .order('created_at', { ascending: false })
      
    if (data) setOrders(data)
    if (error) console.error(error)
    setLoading(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    onLogout()
  }

  const updateStatus = async (orderId: string, status: string) => {
    const { error } = await supabase.from('orders').update({ status }).eq('id', orderId)
    if (!error) fetchOrders()
  }

  return (
    <div style={{ padding: '30px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '28px' }}>Panel de Administración</h2>
        <button onClick={handleLogout} style={{ padding: '8px 16px', background: '#f5f5f5', border: '1px solid #ccc', borderRadius: '8px', cursor: 'pointer' }}>Cerrar sesión</button>
      </div>

      <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '22px', marginBottom: '15px' }}>Pedidos Recientes</h3>
      {loading ? <p style={{ fontSize: '14px', color: '#5F5E5A' }}>Cargando pedidos...</p> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {orders.length === 0 ? <p style={{ fontSize: '14px', color: '#5F5E5A' }}>No hay pedidos registrados en la base de datos.</p> : orders.map(order => (
            <div key={order.id} style={{ border: '1px solid #ED93B1', padding: '15px', borderRadius: '12px', background: '#FBEAF0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <strong style={{ fontSize: '14px' }}>{order.customer_name} ({order.customer_phone})</strong>
                <span style={{ fontSize: '12px', background: order.status === 'completed' ? '#d4edda' : '#fff3cd', padding: '4px 8px', borderRadius: '12px', color: order.status === 'completed' ? '#155724' : '#856404' }}>
                  {order.status === 'completed' ? 'Completado' : 'Pendiente'}
                </span>
              </div>
              <p style={{ fontSize: '13px', marginBottom: '10px', fontWeight: '500' }}>Total del pedido: ${order.total_price}</p>
              
              <div style={{ fontSize: '12px', color: '#5F5E5A', marginBottom: '15px', background: '#fff', padding: '10px', borderRadius: '8px' }}>
                <div style={{ fontWeight: '500', marginBottom: '5px' }}>Artículos:</div>
                {order.order_items?.map((item: any) => (
                  <div key={item.id} style={{ marginBottom: '4px' }}>
                    - {item.quantity}x {item.products?.name}
                  </div>
                ))}
              </div>

              {order.status === 'pending' && (
                <button 
                  onClick={() => updateStatus(order.id, 'completed')} 
                  style={{ padding: '8px 14px', background: '#D4537E', color: 'white', border: 'none', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', fontWeight: '500' }}
                >
                  ✔ Marcar como completado
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
