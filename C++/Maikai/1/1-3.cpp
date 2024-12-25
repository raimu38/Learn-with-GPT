#include <iostream>
using namespace std;

int main(){
 const double PI = 3.1415927;
 double r;

 cout << "半径は : ";
 cin >> r;
 cout << "円の円周は: "<< 2 * PI * r << "です。" << endl;
 cout << "円の面積は: "<< PI * r * r << "です。" << endl;

 enum Day {
    Sun,
    Mon,
    Tue = 5,
    Wed,
    Thu,
    Fri,
    Sat
 };

 Day day = Fri;
 int x = Tue;
cout << "day:" << day << "x: " <<x << endl;
}