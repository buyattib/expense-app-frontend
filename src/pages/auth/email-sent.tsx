import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function EmailSent() {
	return (
		<Card className='mx-auto max-w-xl'>
			<CardHeader>
				<CardTitle alignment='center'>Check your email!</CardTitle>
				<CardDescription alignment='center'>
					We sent an email to the provided address with a link to access the app.
				</CardDescription>
				<CardDescription alignment='center'>
					Do not share that link as it gives access to your account.
				</CardDescription>
				<CardDescription alignment='center'>
					The link expires in 15 minutes.
				</CardDescription>
			</CardHeader>
		</Card>
	)
}
