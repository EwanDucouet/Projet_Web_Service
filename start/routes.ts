/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

// -----AUTH-----
Route.post('api/account', ) // Create user
Route.get('api/account/:uid', ) // Query user
Route.put('api/account/:uid', ) // Update user
Route.post('api/refresh-token/:refreshToken/token', ) // Create access token from refresh token
Route.post('api/token', ) // Create access token
Route.get('api/validate/:accessToken', ) // Validate token

Route.get('movies', 'MoviesController.index');
Route.post('movies', 'MoviesController.store');
Route.get('movies/:name', 'MoviesController.show');
Route.patch('movies/:name', 'MoviesController.update');
Route.delete('movies/:name', 'MoviesController.destroy');

Route.get('categories', 'CategoryController.index');
Route.post('categories', 'CategoryController.store');
Route.get('categories/:name', 'CategoryController.show');
Route.patch('categories/:name', 'CategoryController.update');
Route.delete('categories/:name', 'CategoryController.destroy');
