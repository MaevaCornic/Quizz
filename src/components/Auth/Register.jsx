import { Box, Button, DrawerBody, DrawerHeader, FormLabel, Input, Link, Stack, Text } from "@chakra-ui/react";
import { PasswordFields } from "./PasswordFields";
import { useFormik } from 'formik';
import { useContext } from "react";
import { AppContext } from "../AppContext";

export default function Register({ handleLoginForm, onClose }) {

    const { handleRegistration, isLoading } = useContext(AppContext)

    // Hook useFormik to handle the values
    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: ""
        },
        onSubmit: values => handleRegistration(values, onClose)
    })

    return (
        <div>
            <DrawerHeader size={{ base: 'xs', md: 'sm' }}>Sign up to your account</DrawerHeader>

            <DrawerBody>
                <Stack spacing="8">
                    <Stack spacing="6">

                        <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                            <Text color="fg.muted">
                                Already have an account ? <Link onClick={handleLoginForm}>Log in</Link>
                            </Text>
                        </Stack>
                    </Stack>
                    <Box
                    // py={{ base: '0', sm: '8' }}
                    // px={{ base: '4', sm: '10' }}
                    // bg={{ base: 'transparent', sm: 'bg.surface' }}
                    // boxShadow={{ base: 'none', sm: 'md' }}
                    // borderRadius={{ base: 'none', sm: 'xl' }}
                    >
                        <Stack spacing="6">
                            <form onSubmit={formik.handleSubmit}>
                                <Stack spacing="5">
                                    <FormLabel htmlFor="username">Nickname</FormLabel>
                                    <Input id="username" name="username" onChange={formik.handleChange} value={formik.values.username} required />

                                    <FormLabel htmlFor="email">Email</FormLabel>
                                    <Input id="email" type="email" name="email" onChange={formik.handleChange} value={formik.values.email} required />

                                    <PasswordFields onChange={formik.handleChange} value={formik.values.password} />
                                </Stack>

                                <Stack spacing="6">
                                    <Button mt={6} type="sumbit" isDisabled={isLoading} isLoading={isLoading}>Sign up</Button>
                                </Stack>
                            </form>
                        </Stack >
                    </Box>
                </Stack>
            </DrawerBody>
        </div >
    )
}
