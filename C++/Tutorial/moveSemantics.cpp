#include <iostream>
#include <utility> // std::move
#include <cstring> // std::strlen, std::strcpy

class MyString {
private:
    char* str; // 動的に確保された文字列

public:
    // コンストラクタ
    MyString(const char* s) {
        std::cout << "Constructor called\n";
        str = new char[std::strlen(s) + 1]; // 文字列サイズ分メモリを確保
        std::strcpy(str, s);               // 文字列をコピー
    }

    // デストラクタ
    ~MyString() {
        std::cout << "Destructor called\n";
        delete[] str; // メモリ解放
    }

    // コピーコンストラクタ
    MyString(const MyString& other) {
        std::cout << "Copy Constructor called\n";
        str = new char[std::strlen(other.str) + 1]; // メモリ確保
        std::strcpy(str, other.str);               // 文字列コピー
    }

    // ムーブコンストラクタ
    MyString(MyString&& other) noexcept : str(nullptr) {
        std::cout << "Move Constructor called\n";
        str = other.str;       // 所有権を移動
        other.str = nullptr;   // 元のオブジェクトを無効化
    }

    // コピー代入演算子
    MyString& operator=(const MyString& other) {
        std::cout << "Copy Assignment Operator called\n";
        if (this != &other) { // 自己代入を防ぐ
            delete[] str; // 既存のメモリを解放
            str = new char[std::strlen(other.str) + 1];
            std::strcpy(str, other.str);
        }
        return *this;
    }

    // ムーブ代入演算子
    MyString& operator=(MyString&& other) noexcept {
        std::cout << "Move Assignment Operator called\n";
        if (this != &other) {
            delete[] str;       // 既存のメモリを解放
            str = other.str;    // 所有権を移動
            other.str = nullptr; // 元のオブジェクトを無効化
        }
        return *this;
    }

    // 文字列を出力
    void print() const {
        std::cout << (str ? str : "Empty") << std::endl;
    }
};

int main() {
    MyString a("Hello, World!"); // 通常のコンストラクタ呼び出し
    a.print();

    MyString b = std::move(a);   // ムーブコンストラクタ呼び出し
    b.print();
    a.print();                  // aは空になる（所有権を失う）

    MyString c("Temporary");
    c = std::move(b);           // ムーブ代入演算子呼び出し
    c.print();
    b.print();                  // bは空になる

    return 0;
}
