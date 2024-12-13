#include <stdio.h>

int max4(int a, int b, int c, int d);

int main(void){
    int a, b, c, d;

    printf("a: "); scanf("%d", &a);
    printf("b: "); scanf("%d", &b);
    printf("c: "); scanf("%d", &c);
    printf("d: "); scanf("%d", &d);

    printf("最大値は %d です\n", max4(a,b,c,d));

    return 0;
}

int max4(int a, int b, int c, int d){
    int max = a;
    if(max < b) max = b;
    if(max < c) max = c;
    if(max < d) max = d;

    return max;
}