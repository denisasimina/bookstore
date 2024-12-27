const calculateTotal = (items) => {
    let quantity = 0;
    let sum = 0;
    let saved=0;
  
    items.forEach((item) => {
      quantity += item.quantity;
      sum += item.quantity * (item.price-item.price/item.discount);
      saved +=(item.quantity * item.price-(item.quantity * (item.price-item.price/item.discount)));
    });
  
    return { quantity, sum,saved };
  };
  
  export default calculateTotal; // Exportă direct funcția
  