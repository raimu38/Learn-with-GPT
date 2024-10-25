<?php

namespace Infrastructure\Repository\Auth;

use Domain\Models\User;
use Domain\Repository\Auth\UserRepository;

use function PHPUnit\Framework\fileExists;

class JSONUserRepository implements UserRepository
{
    private $filePath;

    public function __construct()
    {
        $this->filePath = __DIR__ . '/../../../Data/user.json';
        if (!file_exists($this->filePath)) {
            file_put_contents($this->filePath, json_encode([]));
        }
    }

    public function findByEmail(string $email): User|null
    {
        $users = json_decode(file_get_contents($this->filePath), true);
        foreach ($users as $userData) {
            if ($userData['email'] === $email) {
                return new User($userData['email'], $userData['passwordHash']);
            }
        }
        return null;
    }

    public function save(User $user): void
    {
        $users = json_decode(file_get_contents($this->filePath), true);
        $users[] = [
            'email' => $user->getEmail(),
            'passwordHash' => $user->getPasswordHash(),
        ];
        file_put_contents($this->filePath, json_encode($users, JSON_PRETTY_PRINT));
    }
}
