import { Box, Button, Flex, Text, useDisclosure } from '@chakra-ui/react'
import Profile from './Profile'
import { useContext } from 'react'
import { AppContext } from './AppContext'
import MyDrawer from './Auth/Drawer'

export default function HeaderBar({ setQuestions, questions }) {

    const { isLoggedIn, user } = useContext(AppContext)
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Flex justify="end">

            {isLoggedIn &&
                <Box>
                    Welcome <Text as="span" mr={4} textTransform="uppercase" fontWeight="semibold">{user?.username}</Text>
                </Box>
            }

            {questions.length > 0 &&
                <Button variant="unstyled" onClick={() => setQuestions([])}>New game</Button>
            }

            {isLoggedIn && user ?
                <><Button variant="unstyled" ml={4} onClick={onOpen}>Profil</Button>
                    <Profile isOpen={isOpen} onClose={onClose} />
                </> : <MyDrawer />
            }

        </Flex>
    )
}
