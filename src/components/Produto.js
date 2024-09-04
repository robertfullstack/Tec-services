import React from 'react';
import '../styles/Product.scss';

const Product = ({ image, title, description, price }) => (
  <div className="produto-item">
    <img src={image} alt={title} />
    <h3>{title}</h3>
    <p>{description}</p>
    <p>{price}</p>
    <button>Adicionar ao Carrinho</button>
  </div>
);

export default Product;
