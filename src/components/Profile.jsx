import { AppContext } from "./AppContext"
import { updateProfile } from "../fetch"

import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react"
import { useContext } from "react"
import { useFormik } from "formik"


export default function Profile({ isOpen, onClose }) {

    const { user, setUser, setIsLoggedIn } = useContext(AppContext)
    const myDate = new Date(user?.createdAt)

    // Functions 
    const updateInfosUser = async (values) => {
        try {
            const response = await updateProfile(values, user?.id)
            console.log(response)
            setUser(response)
            onClose()
        }
        catch (error) {
            console.log(error.message)
        }
    }

    // To logOut the user 
    const logOut = () => {
        localStorage.removeItem('token')
        setIsLoggedIn(false)
        setUser(null)
        onClose()
    }

    // Hook useFormik 
    const formik = useFormik({
        initialValues: {
            username: user?.username
        },
        onSubmit: values => {
            updateInfosUser(values)
        }
    })

    if (user?.id) {
        return (
            <div>
                <Modal isCentered isOpen={isOpen} onClose={onClose} size="xl" >
                    <ModalOverlay
                        bg='red.100'
                        backdropFilter='blur(10px) hue-rotate(90deg)'
                    />
                    <ModalContent m={5}>
                        <ModalHeader>Welcome to your profile</ModalHeader>
                        <ModalCloseButton />
                        <form onSubmit={formik.handleSubmit}>
                            <ModalBody>
                                <Text mb={2} fontWeight={500}>Your nickname</Text>
                                <Input name="username" pl={2} mb={5} value={formik.values.username} onChange={formik.handleChange} />

                                <Text mb={2} fontWeight={500}>Your email</Text>
                                <Input pl={2} defaultValue={user?.email} isReadOnly variant='unstyled' mb={5} />

                                <Text mb={2} fontWeight={500}>Games played</Text>
                                <Input pl={2} defaultValue={user?.history} isReadOnly variant='unstyled' mb={5} />

                                <Text mb={2} fontWeight={500}>Total of points</Text>
                                <Input pl={2} defaultValue={user?.points} isReadOnly variant='unstyled' mb={12} />

                                <Text fontStyle="italic">Account created on {myDate.toLocaleDateString('en', { weekday: "long", year: "numeric", month: "short", day: "numeric" })}</Text>
                            </ModalBody>
                            <ModalFooter>
                                <Button onClick={logOut}>Log out</Button>
                                <Button ml={4} type="submit">Save</Button>
                            </ModalFooter>
                        </form>
                    </ModalContent>
                </Modal>
            </div >
        )
    }
}

