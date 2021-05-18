import React, { createContext, useContext, ReactNode } from "react"
import * as auth from 'auth-provider'
import { http } from 'utils/http'
import { User } from "screens/project-list/search-panel"
import { useMount } from "utils"
import { useAsync } from "utils/use-async"
import { FullPageLoading, FullPageError} from "compontents/lib"
interface AuthForm {
    username: string,
    password: string
}

const bootstrapUser = async () => {
    let user = null
    const token = auth.getToken()
    if (token) {
        const data = await http('me', { token })
        user = data.user
    }
    return user
}

const AuthContext = createContext<{
    user: User | null,
    register: (from: AuthForm) => Promise<void>,
    login: (from: AuthForm) => Promise<void>,
    logout: () => Promise<void>,
} | undefined>(undefined)
AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const {data: user, error, isLoading, isIdle, isError, run, setData: setUser} = useAsync<User | null>()

    const login = (form: AuthForm) => auth.login(form).then(setUser)
    const register = (form: AuthForm) => auth.register(form).then(setUser)
    const logout = () => auth.logout().then(user => setUser(null))
    
    useMount(() => {
        run(bootstrapUser())
    })

    if(isIdle || isLoading) {
        return <FullPageLoading />
    }

    if(isError) {
        return <FullPageError error={error} />
    }

    
    return <AuthContext.Provider children={children} value={{ user, login, register, logout }} />
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth必须在AuthProvider中使用')
    }
    return context
}