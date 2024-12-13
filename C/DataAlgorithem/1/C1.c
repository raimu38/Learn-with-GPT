#include <stdio.h>
int med3(int a, int b, int c);

int med3(int a, int b, int c){ 
    if( a ==b && b ==c) return  a;
    else if( a ==b || b ==c) return b;
    else if( a == c ) return  a;
    else if ( a > b){
        if(b > c ) return b;
        else   return c;
    }
    else if (b > c){
        if ( c > a) return c;
        else  return a;
    }
    else {
        if ( a > b) return a;
        else  return b;
    }
 
}

int main(void){
    int a, b, c;
    printf("3つの値の中央値は");
    printf("a: "); scanf("%d", &a);
    printf("b: "); scanf("%d", &b);
    printf("c: "); scanf("%d", &c);

    printf("中央値は %d です\n", med3(a,b,c));

    return 0;
}