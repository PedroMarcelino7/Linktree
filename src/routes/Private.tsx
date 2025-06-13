import { useEffect, useState, type ReactNode } from 'react'
import { auth } from '../services/firebaseConnection'
import { onAuthStateChanged } from 'firebase/auth'
import { Navigate } from 'react-router-dom'

interface props {
    children: ReactNode
}

export function Private({ children }: props): any {
    const [loading, setLoading] = useState(true)
    const [signed, setSigned] = useState(false)

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                const userData = {
                    uid: user?.uid,
                    email: user?.email
                }

                localStorage.setItem("@reactlinks", JSON.stringify(userData))

                setLoading(false)
                setSigned(true)
            } else {
                console.log('Não há usuário logado')

                setLoading(false)
                setSigned(false)
            }
        })

        return () => {
            unsub()
        }
    }, [])

    if (loading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }

    if (!signed) {
        return <Navigate to="/login" />
    }

    return children
}
