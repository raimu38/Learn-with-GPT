#include <iostream>
#include <string>

class Person{
public:
  std::string name;
  int age;

  Person(const std::string& n, int a) : name(n), age(a) {}

  void introduce(){
    std::cout << "Hi , I'm " << name << "and I'm " << age << "year old.\n"; 
  }

};

int main(){
  Person alice("Alice", 30);
  alice.introduce();
  return 0;
}



