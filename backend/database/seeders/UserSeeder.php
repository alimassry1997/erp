<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        /**
         * Create three record with super admin role
         */
        $super_admins = [
            [
                "system_role_id" => 3,
                "first_name" => "Ahmad",
                "last_name" => "Berri",
                "password" => Hash::make("1q2w3e4r5t"),
                "email" => "ahmad@example.com",
                "email_verified_at" => now(),
                "remember_token" => Str::random(10),
                "phone_number" => "70513964",
                "picture" =>
                    "https://depositphotos.com/171453724/stock-illustration-default-avatar-profile-icon-grey.html",
            ],
            [
                "system_role_id" => 3,
                "first_name" => "Ali",
                "last_name" => "Masri",
                "password" => Hash::make("1q2w3e4r5t"),
                "email" => "ali@example.com",
                "email_verified_at" => now(),
                "remember_token" => Str::random(10),
                "phone_number" => "71861634",
                "picture" =>
                    "https://depositphotos.com/171453724/stock-illustration-default-avatar-profile-icon-grey.html",
            ],
            [
                "system_role_id" => 3,
                "first_name" => "Hassan",
                "last_name" => "Al Dika",
                "password" => Hash::make("1q2w3e4r5t"),
                "email" => "hassan@example.com",
                "email_verified_at" => now(),
                "remember_token" => Str::random(10),
                "phone_number" => "76877530",
                "picture" =>
                    "https://depositphotos.com/171453724/stock-illustration-default-avatar-profile-icon-grey.html",
            ],
        ];
        foreach ($super_admins as $super_admin) {
            User::create($super_admin);
        }

        User::factory()
            ->times(20)
            ->create();
    }
}
