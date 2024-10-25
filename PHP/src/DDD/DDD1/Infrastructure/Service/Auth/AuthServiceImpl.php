<?php

namespace Infrastructure\Service\Auth;

use Domain\Models\User;
use Domain\Repository\Auth;
use Domain\Repository\Auth\UserRepository;
use Domain\Service\Auth\AuthService;
use Utils\Hash;

class AuthServiceImpl implements AuthService
{
    private  $useRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->useRepository = $userRepository;
    }

    public function register(string $email, string $password): void
    {
        $passwordHash = Hash::make($password);
        $user = new User($email, $passwordHash);
        $this->useRepository->save($user);
    }

    public function authenticate(string $email, string $password): User|null
    {
        $user = $this->useRepository->findByEmail($email);
        if ($user && Hash::verify($password, $user->getPasswordHash())) {
            return $user;
        }
        return null;
    }
}
