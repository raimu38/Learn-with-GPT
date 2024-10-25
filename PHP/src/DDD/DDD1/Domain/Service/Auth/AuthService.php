<?php

namespace Domain\Service\Auth;

use Domain\Models\User;

interface AuthService
{
    public function register(string $email, string $password): void;
    public function authenticate(string $email, string $password): ?User;
}
