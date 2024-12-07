import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useLocation } from 'wouter'

import { PUBLIC_ROUTES } from '@/router/routes'
import { handleError } from '@/services'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { CustomFormInput } from '@/components/custom-form-input'

import { LoginSchema, loginSchema, emailLink } from '@/features/auth'

const loginInitialValues = {
	email: '',
}

export function Login() {
	const [_, navigate] = useLocation()
	const [isSubmiting, setIsSubmiting] = useState(false)

	const form = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
		defaultValues: loginInitialValues,
		mode: 'onSubmit',
	})

	const onSubmit: SubmitHandler<LoginSchema> = async values => {
		setIsSubmiting(true)
		try {
			const response = await emailLink({ email: values.email })
			toast.success(response.message)
			navigate(PUBLIC_ROUTES.EMAIL_SENT)
		} catch (err) {
			const message = handleError(err)
			toast.error('Error', {
				description: message,
			})
		} finally {
			setIsSubmiting(false)
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='max-w-lg mx-auto'>
				<Card>
					<CardHeader>
						<CardTitle>Login</CardTitle>
						<CardDescription>
							You will receive an email with the login information
						</CardDescription>
					</CardHeader>

					<CardContent>
						<CustomFormInput
							label='Email'
							control={form.control}
							name='email'
							placeholder='example@email.com'
							error={!!form.formState.errors.email}
						/>
					</CardContent>

					<CardFooter>
						<Button full type='submit' disabled={isSubmiting}>
							Submit
						</Button>
					</CardFooter>
				</Card>
			</form>
		</Form>
	)
}
