import { PasswordFields } from './PasswordFields'
import { AppContext } from '../AppContext';
import { useFormik } from 'formik';

import {
    Box,
    Button,
    FormLabel,
    Input,
    Link,
    Stack,
    Text,
    DrawerBody,
    DrawerHeader,

} from '@chakra-ui/react'
import { useContext } from 'react';

export default function LogIn({ handleRegisterForm, onClose }) {

    const { handleAuthSubmit, isLoading } = useContext(AppContext)

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: values => handleAuthSubmit(values, onClose)
    })

    return (
        <>
            <DrawerHeader size={{ base: 'xs', md: 'sm' }}>Log in to your account</DrawerHeader>

            <DrawerBody>
                <Stack spacing="8">
                    <Stack spacing="6">
                        <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                            <Text color="fg.muted">
                                Don&apos;t have an account? <Link onClick={handleRegisterForm}>Sign up</Link>
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
                                    <FormLabel htmlFor="email">Email</FormLabel>
                                    <Input id="email" type="email" name="email" onChange={formik.handleChange} value={formik.values.email} required />
                                    <PasswordFields onChange={formik.handleChange} value={formik.values.password} />
                                </Stack>

                                <Stack spacing="6">
                                    <Button mt={6} type="sumbit" isLoading={isLoading} isDisabled={isLoading}>Log In</Button>
                                </Stack>
                            </form>
                        </Stack>
                    </Box>
                </Stack>
            </DrawerBody>
        </>
    )
}