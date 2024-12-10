#include <iostream>

int main(){
    int age =25;
    double height = 1232.4;
    char iniatil = 'A';
    std::string name = "Tara";
    bool is_student = true;

    std::cout << "Name: " << name << ", Age : " << age << std::endl;
    std::cout << "Height: " << height <<", Initail" << iniatil <<std::endl;
    std::cout << "Student : " << (is_student ? "Yes" : "No") << std::endl;

    int number;
    std::cout << "Enter a number:";
    std::cin >> number;

    if (number % 2 == 0){
        std::cout << number << "is even." << std::endl;
    } else {
        std::cout << number << "is odd." << std::endl;

    }

    for (int i = 2; i <= 10; i++){
        std::cout << "Count :" << i << std::endl;
    }

    return 0;
}