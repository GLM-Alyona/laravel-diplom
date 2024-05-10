<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\HallsController;
use App\Http\Controllers\MoviesController;
use App\Http\Controllers\SeatsController;
use App\Http\Controllers\TypesController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\PricesController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\TicketsController;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

/*
Защиненное API для авторизированных пользователей
*/
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/signout', [AuthController::class, 'signout']);
    Route::get('/current', [AuthController::class, 'current']);
    Route::get('/seats/vip/{hall_id}', [SeatsController::class, 'vip']);
    Route::get('/seats/default/{hall_id_id}', [SeatsController::class, 'default']);
    Route::apiResource('movies', MoviesController::class);
    Route::apiResource('halls', HallsController::class);
    Route::apiResource('types', TypesController::class);
    Route::apiResource('seats', SeatsController::class);
    Route::apiResource('users', UsersController::class);
    Route::apiResource('prices', PricesController::class);
    Route::apiResource('sessions', SessionController::class);
});

/*
API для гостевого доступа
*/
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/signin', [AuthController::class, 'signin']);
// Для страницы Index
Route::get('/getmovies', [MoviesController::class, 'indexGuest']);
Route::get('/getsessions/{movie_id}', [SessionController::class, 'showSessionsByMovie']);
Route::get('/gethalls', [HallsController::class, 'index']);
// Для страниц Session/Payment
Route::get('/getsession/{id}', [SessionController::class, 'showSession']);
Route::get('/getmovie/{movie_id}', [MoviesController::class, 'show']);
Route::get('/getseats/{hall_id}', [SeatsController::class, 'show']);
Route::get('/getseat/{seat_id}', [SeatsController::class, 'showByID']);
Route::get('/gethall/{hall_id}', [HallsController::class, 'show']);
Route::get('/gettypes', [TypesController::class, 'index']);
Route::get('/getprices/{hall_id}', [PricesController::class, 'show']);
Route::post('/tickets', [TicketsController::class, 'store']);
Route::get('/getticket/{session_id}/{date}', [TicketsController::class, 'showSeatsBySession']);
Route::get('/getticket/{uuid}', [TicketsController::class, 'showTicketsBySession']);
