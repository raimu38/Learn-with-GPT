<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

use PHPUnit\Framework\TestCase;

require __DIR__ . '/../Code/ShoppingCart.php';

class ShoppingCartTest extends TestCase
{
    public function testAddProductToCart()
    {
        $cart = new ShoppingCart();
        $cart->addProduct('Apple', 100);
        $cart->addProduct('Apple', 100);
        $cart->addProduct('Apple', 100);
        $cart->addProduct('Apple', 100);
        $cart->addProduct('Apple', 100);
        $this->assertEquals(5, $cart->countItems());
    }

    public function testCountTotalPrice()
    {
        $cart = new ShoppingCart();
        $cart->addProduct('Apple', 100);
        $cart->addProduct('Banana', 200);
        $this->assertEquals(300, $cart->getTotalPrice());
    }

    public function testShowProduct()
    {
        $cart = new ShoppingCart();
        $cart->addProduct('Peach', 500);
        $cart->addProduct('Apple', 400);
        $this->assertEquals(['Peach', 'Apple'], $cart->getProducts());
    }
}
