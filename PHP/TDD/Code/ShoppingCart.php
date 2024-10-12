<?php

class ShoppingCart
{

    private $items = [];
    public function addProduct($product, $price)
    {
        $this->items[] = ['product' => $product, 'price' => $price];
    }
    public function countItems()
    {
        return count($this->items);
    }

    public function getTotalPrice()
    {
        $total = 0;
        foreach ($this->items as $item) {
            $total += $item['price'];
        }
        return $total;
    }

    public function getProducts()
    {
        $products = [];
        foreach ($this->items as $item) {
            $products[] = $item['product'];
        }
        return $products;
    }
}
