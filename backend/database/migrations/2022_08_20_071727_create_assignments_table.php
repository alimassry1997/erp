<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create("assignments", static function (Blueprint $table) {
            $table->id();
            $table->foreignId("project_id")->constrained("projects");
            $table->foreignId("user_id")->constrained("users");
            $table->unsignedBigInteger("role_id")->nullable();
            $table->date("end_date")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists("assignments");
    }
};
