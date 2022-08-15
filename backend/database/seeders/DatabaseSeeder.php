<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run(): void
    {
        $this->call([
            SkillSeeder::class,
            SystemRoleSeeder::class,
            ProjectSeeder::class,
            TeamSeeder::class,
            UserSeeder::class,
        ]);
    }
}
