import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function OrderSection() {
  const [categories, setCategories] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCategories()
    fetchProducts()
  }, [])

  async function fetchCategories() {
    const { data } = await supabase.from('categories').select('*').order('created_at', { ascending: true })
    if (data) setCategories(data)
  }

  async function fetchProducts(categoryId?: string) {
    setLoading(true)
    let query = supabase.from('products').select('*')
    if (categoryId) {
      query = query.eq('category_id', categoryId)
    }
    const { data } = await query
    if (data) setProducts(data)
    setLoading(false)
  }

  const handleCategoryClick = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null)
      fetchProducts() // fetch all
    } else {
      setSelectedCategory(categoryId)
      fetchProducts(categoryId)
    }
  }

  return (
    <div className="pedido">
      <div className="section-label">Pide en línea</div>
      <div className="section-title" style={{ marginBottom: '18px' }}>Haz tu pedido</div>
      <div className="pedido-inner">
        <div className="pedido-menu">
          <div className="menu-label">Categorías</div>
          {categories.map((cat) => (
            <div 
              key={cat.id} 
              className={`menu-item`}
              onClick={() => handleCategoryClick(cat.id)}
              style={{ 
                borderColor: selectedCategory === cat.id ? '#D4537E' : '#F4C0D1', 
                fontWeight: selectedCategory === cat.id ? '600' : 'normal',
                backgroundColor: selectedCategory === cat.id ? '#FBEAF0' : '#fff'
              }}
            >
              {cat.name}
            </div>
          ))}
          {categories.length === 0 && <div className="menu-item" style={{ opacity: 0.5 }}>Cargando...</div>}
        </div>
        <div className="pedido-content">
          <div className="search-row">
            <input placeholder="Busca tu ancheta o decoración..." />
            <div className="icon-btn">🔍</div>
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            {loading ? (
              <p style={{ fontSize: '12px', color: '#5F5E5A' }}>Cargando productos...</p>
            ) : products.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '12px' }}>
                {products.map(product => (
                  <div key={product.id} className="card" style={{ padding: '12px', background: '#fff' }}>
                    <div style={{ width: '100%', height: '100px', background: '#f5f5f5', borderRadius: '8px', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                       {product.image_url ? <img src={product.image_url} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : '📷'}
                    </div>
                    <h4 style={{ fontSize: '13px', marginBottom: '4px' }}>{product.name}</h4>
                    <p style={{ fontSize: '12px', color: '#D4537E', fontWeight: 'bold' }}>${product.price}</p>
                    <button className="btn-add" style={{ width: '100%', marginTop: '8px', padding: '6px' }}>Agregar al carrito</button>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '30px', border: '1px dashed #ED93B1', borderRadius: '12px', background: '#fff' }}>
                <p style={{ fontSize: '13px', color: '#5F5E5A' }}>No hay productos disponibles por ahora.</p>
                <p style={{ fontSize: '11px', color: '#aaa', marginTop: '4px' }}>(Añádelos desde tu panel de Supabase)</p>
              </div>
            )}
          </div>

          <div className="action-row">
            <button className="btn-buy" style={{ width: '100%' }}>Finalizar compra</button>
          </div>
        </div>
      </div>
    </div>
  )
}
