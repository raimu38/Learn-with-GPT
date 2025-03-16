#include <iostream>

int main(){

  int num = 5;
  if (num > 0){
    std::cout << "num is positiven\n"; 
  }else{
    std::cout <<  "num is zero or negativen\n"; 
  }

  for (int i = 0; i < 5; i++){
    std::cout << "i = " << i << "\n"; 
  }

  int j = 0;
  while (j < 5){
    std::cout << "j = " << j << "\n"; 
    j++;
  }

  return 0;
}


