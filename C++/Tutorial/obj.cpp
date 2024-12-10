#include <iostream>
#include <string>

class Person{
    public:
        std::string name;
        int age;

        Person(std::string person_name, int person_age){
            name = person_name;
            age = person_age;
        }

        void introduction(){
            std::cout << "Hi , my name is " << name << "and I am " << age << "years old" << std::endl;
        }
};

int main(){
    Person p1("Taichi", 23);
    p1.introduction();

    return 0;
}
