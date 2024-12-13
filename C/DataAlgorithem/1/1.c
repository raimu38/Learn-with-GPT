#include <stdio.h>
//stdio = standard input outpu header
int main(void){
    int a, b, c;

    printf("三つの整数の最大値をお求めます\n");
    printf("a:"); scanf("%d",&a);
    printf("b:"); scanf("%d",&b);
    printf("c:"); scanf("%c",&c);

    int max = a;
    if (max <b) max = b;
    if (max <c) max = c;

    prinitf("max: %d \n", max);
    
}



