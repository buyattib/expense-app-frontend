import { useState } from 'react'

import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'

import { CreateAccountForm, type CreateAccountFormProps } from './create-account-form'

type CreateAccountModalProps = {
	children: React.ReactNode
	onSuccess: CreateAccountFormProps['onSuccess']
}

export function CreateAccountModal({ children, onSuccess }: CreateAccountModalProps) {
	const [open, setOpen] = useState(false)
	return (
		<Dialog
			open={open}
			onOpenChange={value => {
				setOpen(value)
			}}
		>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent size='lg'>
				<DialogHeader>
					<DialogTitle>Create a new account</DialogTitle>
					<DialogDescription>
						An account is used to track your transactions
					</DialogDescription>
				</DialogHeader>
				<CreateAccountForm
					onSuccess={() =>
						onSuccess().then(() => {
							setOpen(false)
						})
					}
				/>
			</DialogContent>
		</Dialog>
	)
}
