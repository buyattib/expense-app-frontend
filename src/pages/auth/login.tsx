import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { loginInitialValules, LoginSchema, loginSchema } from './lib/schemas'
import { emailLink } from './lib/services'

export function Login() {
	const form = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
		defaultValues: loginInitialValules,
		mode: 'onSubmit',
	})

	const onSubmit: SubmitHandler<LoginSchema> = async values => {
		try {
			const response = await emailLink({ email: values.email })
			console.log(response)
		} catch (err) {
			console.log(err)
			toast.error('Error', {
				description: err.message,
			})
		}
	}

	return (
		<section className='flex items-start justify-center h-full bg-muted'>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='w-full max-w-lg my-24'>
					<Card>
						<CardHeader>
							<CardTitle className='text-xl'>Login</CardTitle>
							<CardDescription>
								You will receive an email with the login information
							</CardDescription>
						</CardHeader>

						<CardContent>
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												placeholder='example@email.com'
												{...field}
												className={`${form.formState.errors.email ? 'border-destructive' : ''}`}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</CardContent>

						<CardFooter>
							<Button type='submit'>Submit</Button>
						</CardFooter>
					</Card>
				</form>
			</Form>
		</section>
	)
}
