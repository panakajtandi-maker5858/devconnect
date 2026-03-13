import { createContext , useState , useContext , useEffect } from "react";


// creating context
const AuthContext = createContext()

// Making provider

export const AuthProvider = ({children}) =>{

const [ user , setUser] = useState(null)
const [ token , setToken ] = useState(null)
const [ loading ,setloading ] = useState(true)

// App start hone par localstorage check karna 

useEffect(()=>{
    const savedToken = localStorage.getItem('token')
const savedUser = localStorage.getItem('user')

if( savedToken && savedUser ){
    setToken(savedToken)
    setUser(JSON.parse(savedUser))
}

setloading(false)

} , [])

// Login Function 

const login = ( userData , userToken)=>{
    setUser(userData)
    setToken(userToken)
    localStorage.setItem('token', userToken)
    localStorage.setItem('user', JSON.stringify(userData))

}

// Logout Function 

const logout = ()=>{
    setUser(null)
    setToken(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
}

return(

<AuthContext.Provider value={{ user , token , login , logout , loading}} >
    {children}
</AuthContext.Provider>

)

}


// Making of custom HOOK :-
export const useAuth = ()=>{

    return useContext(AuthContext)
}

export default AuthContext