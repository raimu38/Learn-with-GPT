#include <iostream>
using namespace std;

template <typename T>
T add(T a, T b){
    return a + b;
}

template <typename G>
class Box{
    private:
        G value;
    public:
        Box(G v) : value(v){}
        G getvalue(){return value;}
};

int main(){
    cout << "整数の加算" << add(3, 4) << endl;
    cout << "少数の加算" << add(4.5, 5.0) << endl;

    Box<int> intBox(49);
    Box<string> strBox("TemplateBox");

    cout << "整数:" << intBox.getvalue() << endl;
    cout << "文字列:" << strBox.getvalue() << endl;
    return 0;
}

