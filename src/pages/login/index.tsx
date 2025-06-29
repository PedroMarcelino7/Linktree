/*
TO DO

Validar inputs
1. If email contains "@"
2. If password is valid
   > length >= 6
   > password match user password

Desativar botão quando tentar fazer o login para evitar muitas requisições
*/

import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from '../../components/input'

import { auth } from '../../services/firebaseConnection'
import { signInWithEmailAndPassword } from 'firebase/auth'

import { notifySuccess, notifyError, notifyInfo } from '../../utils/toastUtils';

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        const newErrors = { email: '', password: '' };
        let hasError = false;

        if (email === '') {
            newErrors.email = 'E-mail inválido';
            hasError = true;
        }

        if (password === '') {
            newErrors.password = 'Senha incorreta';
            hasError = true;
        }

        if (hasError) {
            setErrors(newErrors);
            notifyInfo("Preencha todos os campos!");
            return;
        }

        setErrors({ email: '', password: '' });

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                notifySuccess("Logado com sucesso!");
                navigate("/admin", { replace: true })
            })
            .catch((error) => {
                if (error.code === 'auth/invalid-email') {
                    setErrors(prev => ({ ...prev, email: 'E-mail inválido' }));
                } else if (error.code === 'auth/wrong-password') {
                    setErrors(prev => ({ ...prev, password: 'Senha incorreta' }));
                } else {
                    notifyError("Erro ao fazer login.");
                }
            })
    }

    return (
        <>
            <div className="flex w-full h-screen items-center justify-center flex-col">
                <Link to="/">
                    <h1 className="mt-11 text-white mb-7 font-bold text-5xl">Dev
                        <span className="bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">Link</span>
                    </h1>
                </Link>

                <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col px-2 gap-3">
                    <Input
                        placeholder="E-mail"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!errors.email}
                        errorMessage={errors.email}
                    />

                    <Input
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={!!errors.password}
                        errorMessage={errors.password}
                    />

                    <button
                        type="submit"
                        className="h-9 bg-blue-600 rounded border-0 text-lg font-medium text-white cursor-pointer">
                        Acessar
                    </button>
                </form>
            </div>
        </>
    )
}