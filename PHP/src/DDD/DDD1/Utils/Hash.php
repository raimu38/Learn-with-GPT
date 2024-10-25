<?php

namespace Utils;

class Hash
{
    public static function make(string $password): string
    {
        return password_hash($password, PASSWORD_BCRYPT);
    }


    public static function verify($password, $passwordHash): bool
    {
        return password_verify($password, $passwordHash);
    }
}
