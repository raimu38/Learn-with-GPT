#include <iostream>
#include <string>

class Animal{
    public:
        std::string name;
        Animal(std::string animal_name) : name(animal_name){}
        void speak(){
            std::cout << name << "makes a sound ." << std::endl;
        }
};

class Dog : public Animal {
    public:
        Dog(std::string dog_name) : Animal(dog_name) {}
        void speak(){
            std::cout << name << " barks : Woof!" << std::endl;
        }
};

int main(){
    Animal a("Generic Animal");
    Dog b("Buddy");
    a.speak();
    b.speak();

    return 0;
}