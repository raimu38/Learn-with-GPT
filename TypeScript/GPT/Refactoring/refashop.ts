type Product = {
  id: number;
  name: string;
  price: number;
};

type CartItem = {
  product: Product;
  quantity: number;
};

let cart: CartItem[] = [];

class CartOperation {
  addToCart(product: Product, quantity: number): void {
    const existingItem = cart.find((item) => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart = [...cart, { product, quantity }];
    }
  }

  removeFromCart(productId: number): boolean {
    const newCart = cart.filter((item) => item.product.id !== productId);
    if (newCart.length !== cart.length) {
      cart = newCart;
      return true;
    } else {
      console.log("Error the product not found");
      return false;
    }
  }

  calculateTotal(): number {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }
}
