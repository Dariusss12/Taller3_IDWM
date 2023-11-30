<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    //
    public function registerUser(Request $request){
        try {
            DB::beginTransaction();

            $fields = $request->validate([
                'name' => 'required|min:10|max:150',
                'rut' => 'required|unique:users,rut',
                'password' => 'required',
                'email' => 'required|regex:/^[^@]+@(ucn.cl)$/|unique:users,email',
                'birth_year' => 'required|integer|min:1900',
            ]);

            //^(?!.*@.*@)(.+)@(ucn\.cl|alumnos\.ucn\.cl|disc\.ucn\.cl|ce\.ucn\.cl)
            $user = User::create([
                'name' => $fields['name'],
                'email' => $fields['email'],
                'rut' => $fields['rut'],
                'password' => Hash::make($fields['password']),
                'birth_year' => $fields['birth_year'],
            ]);

            // Autenticar al usuario y generar el token JWT
            $token = JWTAuth::fromUser($user);

            DB::commit();
            return response()->json(['user' => $user, 'token' => $token], 200);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json($e->getMessage(), 500);
        }
    }

    public function update(Request $request, User $user){
        try {
            DB::beginTransaction();

            $fields = $request->validate([
                'name' => 'required|min:10|max:150',
                'email' => 'required|regex:/^(?!.*@.*@)(.+)@(ucn\.cl|alumnos\.ucn\.cl|disc\.ucn\.cl|ce\.ucn\.cl)$/i|unique:users,email',
                'birth_year' => 'required|integer|min:1900',
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
            return response()->json($e->getMessage(), 500);
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

            DB::commit();
            return response()->json(['user' => $user], 200);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
