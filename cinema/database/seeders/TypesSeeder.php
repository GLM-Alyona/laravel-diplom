<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TypesSeeder extends Seeder
{
    /**
     * Предзаполняем таблицу с типами мест
     */
    public function run(): void
    {
        DB::table('types')->insert([
            'type' => 'Обычное',
            'color' => '63536C',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('types')->insert([
            'type' => 'VIP',
            'color' => 'FFD700',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('types')->insert([
            'type' => 'Заблокированное',
            'color' => 'A9A9A9',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
