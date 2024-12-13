#include <stdlib.h>
#include <stdio.h>

int main(void){
    int na;

    printf("要素数:");
    scanf("%d", &na);

    int *a = calloc(na, sizeof(int));
    if( a == NULL){
        puts("お記憶領域の確保に失敗しました。");
    } else{
        printf("%p *\n", (void *)a);
        printf("%d個の整数を入力してください\n", na);
        for(int i = 0 ; i < na; i++){
            printf("a[%d] : ", i);
            scanf("%d", &a[i]);

        }
        printf("各要素の値は以下のとおりです。\n");
        for (int i = 0; i < na; i++){
            printf("a[%d] = %d\n", i, a[i]);   
        }
        free(a);
    }

    return 0;

}