import { useState } from 'react'

import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

import { CreateTransactionForm, type CreateTransactionFormProps } from './create-transaction-form'

type CreateAccountModalProps = {
	children: React.ReactNode
	onSuccess: CreateTransactionFormProps['onSuccess']
}

export function CreateTransactionModal({ children, onSuccess }: CreateAccountModalProps) {
	const [open, setOpen] = useState(false)

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent size='lg'>
				<DialogHeader>
					<DialogTitle>Add a transaction</DialogTitle>
					<DialogDescription>
						A transaction is used to track expenses and incomes
					</DialogDescription>
				</DialogHeader>
				<CreateTransactionForm
					onSuccess={() =>
						onSuccess().then(() => {
							setOpen(false)
						})
					}
				/>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant='outline' full>
							Cancel
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
