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
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'HomePagesController.home').as('home')
Route.get('/tes', 'HomePagesController.test').as('test')
Route.get('/login', 'Auth/LoginController.login').as('login')

// Register User
Route.get('/register', 'Auth/RegistersController.register').as('register')


Route.group(()=>{

    Route.post('/authUser', 'Auth/LoginController.authUser').as('authUser')
    Route.get('/logout', 'Auth/LoginController.logout').as('logout')
    Route.post('/register', 'Auth/RegistersController.registrationUsers').as('registrationUsers')
    Route.post('/updatePassword', 'Auth/LoginController.updatePassword').as('updatePassword')


}).prefix("consumeapi/");
