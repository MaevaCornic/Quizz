import { Alert, AlertIcon, Box, Button, Container, Drawer, DrawerCloseButton, DrawerContent, DrawerOverlay } from '@chakra-ui/react'
import { useContext, useRef, useState } from 'react'
import Register from './Register'
import LogIn from './LogIn'
import { AppContext } from '../AppContext'

export default function MyDrawer() {

    const { errorMessage, setErrorMessage, onOpenDrawer, isOpenDrawer, onCloseDrawer } = useContext(AppContext)

    const btnRef = useRef()

    const [isLogInForm, setIsLogInForm] = useState(false)

    //   To show or how hide the "Log in" button. 
    const handleConnexionButton = () => {
        onOpenDrawer()
        setIsLogInForm(true)
    }

    // To switch the form between login & register 
    const handleRegisterForm = () => {
        setIsLogInForm(false)
        setErrorMessage("")
    }
    const handleLoginForm = () => {
        setIsLogInForm(true)
        setErrorMessage("")
    }

    return (
        <div>
            <Box >
                <Button ml={3} variant="unstyled" onClick={handleConnexionButton} ref={btnRef}>Log in </Button>
            </Box>

            <Drawer
                isOpen={isOpenDrawer}
                placement='right'
                onClose={onCloseDrawer}
                finalFocusRef={btnRef}
            >
                <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
                    <DrawerOverlay
                        py={{ base: '0', sm: '8' }}
                        px={{ base: '4', sm: '10' }}
                        boxShadow={{ base: 'none', sm: 'md' }}
                        borderRadius={{ base: 'none', sm: 'xl' }}
                    />
                    <DrawerContent>
                        <DrawerCloseButton />

                        {isLogInForm ? <LogIn onClose={onCloseDrawer} handleRegisterForm={handleRegisterForm} />
                            : <Register onClose={onCloseDrawer} handleLoginForm={handleLoginForm} />}


                        {!!errorMessage &&
                            <Alert status='error'>
                                <AlertIcon />
                                {errorMessage}
                            </Alert>
                        }

                    </DrawerContent>
                </Container>
            </Drawer>
        </div>
    )
}
