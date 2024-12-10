#include <iostream>

int add(int a, int b){
    return a + b;
}

int main(){
    int x;
    int y;
    std::cout << "x:";
    std::cin >> x;
    // std::cout << std::endl;
    std::cout << "y:";
    std::cin >> y;
    
    int result = add(x,y);
    std::cout << x << "+" << y <<"=" <<result << std::endl;
    
}