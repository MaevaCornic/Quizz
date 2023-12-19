import { Box, Button, useDisclosure } from '@chakra-ui/react'
import Profile from './Profile'
import { useContext } from 'react'
import { AppContext } from './AppContext'
import MyDrawer from './Auth/Drawer'

export default function HeaderBar() {

    const { isLoggedIn, user } = useContext(AppContext)
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Box display="flex" border={2}>

            {isLoggedIn && user ?
                <><Button variant="unstyled" ml={4} onClick={onOpen}>Profil</Button>
                    <Profile isOpen={isOpen} onClose={onClose} />
                </> : <MyDrawer />
            }

        </Box>
    )
}
