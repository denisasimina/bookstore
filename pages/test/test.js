// ProductList.js
import Product from '../../models/Product';
import Category from '../../models/Category';
import React from 'react';
// import { useDispatch } from 'react-redux';
import { addToCart} from '../../store/cartSlice';

import db from '../../utils/db';
// ProductList.js

const ProductList = ({ products }) => {
  const dispatch = useDispatch(); // Folosește useDispatch pentru a trimite acțiuni

  const handleAddToCart = (product) => {
    // Când se apasă pe un produs, adăugăm produsul în coș
    dispatch(addToCart({
      productId: product.id,
      title: product.title,
      price: product.price,
      quantity: 1, // Poți să alegi să setezi cantitatea la 1 inițial
      total: product.price, // Prețul total al produsului
    }));
  };

  return (
    <div>
      <h2>Produse</h2>
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <h3>{product.title}</h3>
            <p>Preț: {product.price} lei</p>
            <button onClick={() => handleAddToCart(product)}>Adaugă în coș</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;




export async function getServerSideProps(){
    db.connect_Db();
    
    let products= await Product.find().sort({createdAt:-1}).lean();
    let categories= await Category.find().sort({createdAt:-1}).lean();
    
    return{
      props:{
        products:JSON.parse(JSON.stringify(products)),
        categories:JSON.parse(JSON.stringify(categories)),
      }
    }
     }