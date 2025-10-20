import { useState, useEffect } from 'react';
import { productService } from '../services/productService';
import type { Product } from '../types';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAll();
      setProducts(data);
      setError('');
    } catch (err) {
      setError('Error al cargar los productos');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-text">{error}</p>
        <button onClick={loadProducts} className="retry-button">
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="product-list">
      <h2 className="product-list-title">Todos los Productos</h2>
      {products.length === 0 ? (
        <p className="no-products">No hay productos disponibles</p>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                {product.imageUrl ? (
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="product-image"
                    onError={(e) => {
                      // Si la imagen falla al cargar, mostrar placeholder
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                ) : null}
                <div className={`product-image-placeholder ${product.imageUrl ? 'hidden' : ''}`}>
                  <span className="product-icon">📦</span>
                </div>
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-details">
                  <span className="product-price">${product.price.toFixed(2)}</span>
                  <span className="product-category">{product.category}</span>
                </div>
                <p className="product-stock">
                  Stock: {product.stock} {product.stock === 1 ? 'unidad' : 'unidades'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
