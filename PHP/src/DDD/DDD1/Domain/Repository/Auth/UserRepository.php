<?php

namespace Domain\Repository\Auth;

use Domain\Models\User;

interface UserRepository
{
    public function findByEmail(string $email): ?User;
    public function save(User $user): void;
}
