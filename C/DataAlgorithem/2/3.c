#include <stdio.h>
#include <stdlib.h>


int main(void){
    int *x = calloc(3, sizeof(int));
    // int x = calloc(1,sizeof(int));
    if( x == NULL)
        puts("記憶領域の確保に失敗しました。");
    else{
        *x = 57;
        printf("*x = %d\n", *x);
        free(x);
    }
    return 0;

}