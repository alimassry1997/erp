<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     * 
     * 
     * @return void
     */
    public function up(): void
    {
        Schema::create("users", function (Blueprint $table) {
            $table->id();
            $table->foreignId("system_role_id");
            $table
                ->foreign("system_role_id")
                ->references("id")
                ->on("system_roles");
            $table->string("first_name");
            $table->string("last_name");
            $table->string("email")->unique();
            $table->timestamp("email_verified_at")->nullable();
            $table->string("password")->nullable();
            $table->integer("phone_number");
            $table->boolean("status")->default(true);
            $table->string("picture")->nullable();
            $table->rememberToken();
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
        Schema::dropIfExists("users");
    }
};
