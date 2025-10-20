import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { useAuth } from '../hooks/useAuth';
import { productService } from '../services/productService';
import type { Product } from '../types';
import './MyProducts.css';

const MyProducts = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    imageUrl: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadMyProducts = async () => {
    try {
      setLoading(true);
      if (user?.userId) {
        const data = await productService.getByUserId(user.userId);
        setProducts(data);
      }
    } catch (err) {
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadMyProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.name || !formData.description || !formData.price || !formData.category || !formData.stock || !formData.imageUrl) {
      setError('Por favor completa todos los campos requeridos');
      return;
    }

    if (!user?.userId) {
      setError('Usuario no autenticado');
      return;
    }

    try {
      await productService.createForUser(user.userId, {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        stock: parseInt(formData.stock),
        imageUrl: formData.imageUrl,
      });

      setSuccess('¡Producto creado exitosamente!');
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        imageUrl: '',
      });
      setShowForm(false);
      loadMyProducts();
    } catch (err) {
      setError('Error al crear el producto');
      console.error('Error creating product:', err);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        await productService.delete(id);
        setSuccess('Producto eliminado exitosamente');
        loadMyProducts();
      } catch (err) {
        setError('Error al eliminar el producto');
        console.error('Error deleting product:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando tus productos...</p>
      </div>
    );
  }

  return (
    <div className="my-products">
      <div className="my-products-header">
        <h2>Mis Productos</h2>
        <button onClick={() => setShowForm(!showForm)} className="add-product-btn">
          {showForm ? 'Cancelar' : '+ Agregar Producto'}
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {showForm && (
        <div className="product-form-card">
          <h3>Nuevo Producto</h3>
          <form onSubmit={handleSubmit} className="product-form">
            <div className="form-group">
              <label htmlFor="name">Nombre del Producto *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ej: Laptop HP"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Descripción *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe tu producto..."
                rows={4}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="price">Precio *</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="stock">Stock *</label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="category">Categoría *</label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Ej: Electronics"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="imageUrl">URL de Imagen *</label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/imagen.jpg"
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              Publicar Producto
            </button>
          </form>
        </div>
      )}

      {products.length === 0 ? (
        <div className="no-products-message">
          <p>No tienes productos publicados</p>
          <p className="hint">Haz clic en "Agregar Producto" para crear tu primer producto</p>
        </div>
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
                      e.currentTarget.style.display = 'none';
                      const placeholder = e.currentTarget.nextElementSibling as HTMLElement;
                      if (placeholder) placeholder.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className="product-image-placeholder" style={{ display: product.imageUrl ? 'none' : 'flex' }}>
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
                <p className="product-stock">Stock: {product.stock}</p>
              </div>
              <div className="product-actions">
                <button
                  onClick={() => handleDelete(product.id)}
                  className="delete-btn"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProducts;
