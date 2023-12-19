// To create the context
import { createContext, useEffect, useState } from 'react';
import { authentification, findUser, register } from '../fetch';
import { useDisclosure } from '@chakra-ui/react';

export const AppContext = createContext();

export default function AppContextProvider({ children }) {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    // To handle the modal of the drawer
    const { isOpen: isOpenDrawer, onOpen: onOpenDrawer, onClose: onCloseDrawer } = useDisclosure()

    // To check is a user is connected with his token and to redirect him straight to the area of connected user.
    const checkIfUserIsConnected = async (token) => {
        try {
            const userLoogedIn = await findUser(token)
            setUser(userLoogedIn)
            setIsLoggedIn(true)

        } catch (error) {
            console.log(error.message)
        }
    }

    // To register a new user 
    const handleRegistration = async (values, onClose) => {

        try {
            setIsLoading(true)
            const newUser = await register(values)
            console.log(newUser)
            setUser(newUser.user)
            setIsLoggedIn(true)

            setErrorMessage(false)
            onClose()
        } catch (error) {
            setErrorMessage(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    // To logIn a user
    const handleAuthSubmit = async (values, onClose) => {

        try {
            setIsLoading(true)

            const { jwt, user } = await authentification(values)
            setIsLoggedIn(true)
            localStorage.setItem('token', jwt)
            setUser(user)
            setErrorMessage(false)
            onClose()
            return user

        } catch (error) {
            console.log(error)
            setErrorMessage(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) { checkIfUserIsConnected(token) }
    }, [])

    return (
        <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn, handleAuthSubmit, user, setUser, handleRegistration, errorMessage, setErrorMessage, isLoading, isOpenDrawer, onOpenDrawer, onCloseDrawer }}>
            {children}
        </AppContext.Provider>
    )
}
