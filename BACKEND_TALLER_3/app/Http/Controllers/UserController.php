<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Helpers\Helper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class UserController extends Controller
{
    //
    public function registerUser(Request $request)
    {
        $customMessages = [
            'name.required' => 'Debe completar el campo Nombre Completo',
            'name.min' => 'El nombre de tener mínimo 10 caracteres',
            'name.max' => 'El nombre de tener máximo 150 caracteres',

            'rut.required' => 'Debe completar el campo RUT',
            'rut.regex' => 'El formato del RUT es incorrecto',
            'rut.unique' => 'El RUT ingresado ya existe en el sistmea',

            'email.required' => 'Debe completar el campo Correo electrónico',
            'email.regex' => 'El correo electrónico debe ser de dominio UCN',
            'email.unique' => 'El correo electrónico ingresado ya existe en el sistmea',

            'birth_year.required' => 'Debe completar el campo Año de nacimiento',
            'birth_year.integer' => 'El valor ingresado debe ser un entero',
            'birth_year.min' => 'El año ingresado no puede ser inferior a 1900',
            'birth_year.max' => 'El año ingresado no puede ser superior al año actual',
        ];
        try {
            DB::beginTransaction();

            $fields = $request->validate([
                'name' => [
                    'required',
                    'min:10',
                    'max:150'
                ],
                'rut' => [
                    'required',
                    'unique:users,rut',
                    'regex:/^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/'
                ],
                'email' => [
                    'required',
                    'regex:/^[a-zA-Z0-9._%+-]+@(alumnos\.ucn\.cl|ucn\.cl|disc\.ucn\.cl|ce\.ucn\.cl)$/',
                    'unique:users,email',
                ],
                'birth_year' => [
                    'required',
                    'integer',
                    'min:1900',
                    'max:' . Carbon::now()->year
                ],
            ],$customMessages);

            $rutValido = Helper::verifyRut($fields['rut']);
            if(!$rutValido){
                return response()->json('El rut no es valido',200);
            }

            $password = str_replace(['.', '-'], '', $fields['rut']);

            $user = User::create([
                'name' => $fields['name'],
                'email' => $fields['email'],
                'rut' => $fields['rut'],
                'password' => Hash::make($password),
                'birth_year' => $fields['birth_year'],
            ]);

            // Autenticar al usuario y generar el token JWT
            $token = JWTAuth::fromUser($user);

            DB::commit();
            return response()->json(['user' => $user, 'token' => $token], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json($e->errors(), 500);
        }
    }


    public function update(Request $request, User $user){
        $customMessages = [
            'name.required' => 'Debe completar el campo Nombre Completo',
            'name.min' => 'El nombre de tener mínimo 10 caracteres',
            'name.max' => 'El nombre de tener máximo 150 caracteres',

            'email.required' => 'Debe completar el campo Correo electrónico',
            'email.regex' => 'El correo electrónico debe ser de dominio UCN',
            'email.unique' => 'El correo electrónico ingresado ya existe en el sistmea',

            'birth_year.required' => 'Debe completar el campo Año de nacimiento',
            'birth_year.integer' => 'El valor ingresado debe ser un entero',
            'birth_year.min' => 'El año ingresado no puede ser inferior a 1900',
            'birth_year.max' => 'El año ingresado no puede ser superior al año actual',
        ];
        try {
            DB::beginTransaction();

            $fields = $request->validate([
                'name' => [
                    'required',
                    'min:10',
                    'max:150'
                ],
                'email' => [
                    'required',
                    'regex:/^[a-zA-Z0-9._%+-]+@(alumnos\.ucn\.cl|ucn\.cl|disc\.ucn\.cl|ce\.ucn\.cl)$/',
                    'unique:users,email',
                ],
                'birth_year' => [
                    'required',
                    'integer',
                    'min:1900',
                    'max:' . Carbon::now()->year
                ],
            ]);

            $user->update([
                'name' => $fields['name'],
                'email' => $fields['email'],
                'birth_year' => $fields['birth_year'],
            ]);

            DB::commit();
            return response()->json(['user' => $user], 200);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json($e->errors(), 500);
        }
    }

    public function changePassword(Request $request, User $user){
        try {
            DB::beginTransaction();

            $fields = $request->validate([
                'old_password' => 'required',
                'new_password' => 'required',
            ]);

            if (!Hash::check($fields['old_password'], $user->password)) {
                throw new \Exception('La contraseña actual ingresada no es válida.');
            }

            $user->update([
                'password' => Hash::make($fields['new_password']),
            ]);

            JWTAuth::invalidate(JWTAuth::parseToken());

            DB::commit();
            return response()->json(['user' => $user], 200);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

}
