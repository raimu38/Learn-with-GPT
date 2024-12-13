#include <stdio.h>

int min(int a, int b, int c);

int main(void){
    int a, b, c;
    printf("a: "); scanf("%d",&a);
    printf("b: "); scanf("%d",&b);
    printf("c: "); scanf("%d",&c);

    printf("最小値は:%dです\n", min(a,b,c));
    

}

int min(int a, int b, int c){
    int min = a;
    if(min > b) min = b;
    if(min > c) min = c; 

    return min;
}