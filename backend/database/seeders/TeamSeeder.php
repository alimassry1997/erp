<?php

namespace Database\Seeders;

use App\Models\Team;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class TeamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        $name = "admin";
        $team_admin = ["name" => $name, "slug" => Str::slug($name, "-")];
        Team::create($team_admin);
        Team::factory()
            ->count(3)
            ->create();
    }
}
