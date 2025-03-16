#include  <iostream>

int add(int a, int b){
    return a + b; 
}
int main(){

  int a = 39;
  int b = 19;

  int result = add(a,b);
  std::cout << "result : " << result << std::endl;
  
}
