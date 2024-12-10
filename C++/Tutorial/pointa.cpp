#include <iostream>

int main() {
    int x = 42; // 通常の変数
    int* ptr = &x; // x のアドレスを格納するポインタ

    std::cout << "Value of x: " << x << std::endl;
    std::cout << "Address of x: " << &x << std::endl;
    std::cout << "Value stored in ptr (address of x): " << ptr << std::endl;
    std::cout << "Value pointed to by ptr: " << *ptr << std::endl;

    return 0;
}