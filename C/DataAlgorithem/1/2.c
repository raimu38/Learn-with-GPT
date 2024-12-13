#include <stdio.h>

int max(int a, int b, int c){
    int max = a;
    
    if(b > max){
        max = b;
    }
    if(c > max){
        max = c;
    }

    return max;
}

int main(void){
    printf("a:%d, b:%d, c:%d, の最大値は %dです", 3,2,1, max(3,2,1));
    
}