#include <stdio.h>
#define N 5

int main()
{
    int a[N];
    for (int i = 0; i < N; i++){
        printf("a[%d]" ,i);
        scanf("%d", &a[i]);
    }

    puts("各要素の値");
    for (int i = 0; i < N; i++){
        printf("a[%d] = %d \n", i, a[i]);
    }
    printf("sizeof(a[%d]): %lu", 2, sizeof(a[2]));
    int na = sizeof(a) / sizeof(a[0]);
    printf("aの要素数は%dです", na);
    return 0;
}