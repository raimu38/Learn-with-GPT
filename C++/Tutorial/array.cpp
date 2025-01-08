#include <iostream>
#include <vector>
#include <algorithm> // reverse 関数のためのヘッダー

using namespace std;

int main() {
    vector<int> vec = {1, 5, 3};
    reverse(vec.begin(), vec.end()); // {3, 5, 1}

    for (int i = 0; i < vec.size(); i++) {
        cout << vec.at(i) << endl;
    }

    vector<int> x = {0,1,2,3,4};

    for(auto it = x.begin(); it != x.end(); ++it){
        cout << *it << endl;
    }


    return 0;
}
