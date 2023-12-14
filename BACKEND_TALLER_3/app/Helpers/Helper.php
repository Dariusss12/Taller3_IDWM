<?php

namespace App\Helpers;

class Helper
{
    public static function verifyRut($rut)
    {
        // Eliminar puntos y guion del RUT
        $rut = preg_replace('/[^0-9kK]/', '', $rut);

        // Verificar longitud del RUT
        if (strlen($rut) != 9) {
            return false;
        }

        // Separar el cuerpo y el dígito verificador
        $cuerpo = substr($rut, 0, -1);
        $verificador = strtoupper(substr($rut, -1));

        // Calcular el dígito verificador esperado
        $suma = 0;
        $multiplo = 2;

        for ($i = strlen($cuerpo) - 1; $i >= 0; $i--) {
            $suma += $multiplo * $cuerpo[$i];
            $multiplo = ($multiplo == 7) ? 2 : $multiplo + 1;
        }

        $digito = 11 - ($suma % 11);

        // Manejar casos especiales
        $digito = ($digito == 10) ? 'K' : $digito;
        $digito = ($digito == 11) ? '0' : $digito;

        // Comparar el dígito verificador calculado con el proporcionado
        return ($digito == $verificador);
    }
}
