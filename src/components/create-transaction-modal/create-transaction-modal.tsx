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

type CreateTransactionModalProps = {
	children: React.ReactNode
	onSuccess: CreateTransactionFormProps['onSuccess']
}

export function CreateTransactionModal({ children, onSuccess }: CreateTransactionModalProps) {
	const [open, setOpen] = useState(false)

	const _onSuccess = async () => {
		setOpen(false)
		await onSuccess()
	}

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
				<CreateTransactionForm onSuccess={_onSuccess} />
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
