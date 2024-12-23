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

import {
	CreateTransactionCategoryForm,
	type CreateTransactionCategoryFormProps,
} from './create-transaction-category-form'

type CreateTransactionCategoryModalProps = {
	children: React.ReactNode
	onSuccess?: CreateTransactionCategoryFormProps['onSuccess']
}

export function CreateTransactionCategoryModal({
	children,
	onSuccess,
}: CreateTransactionCategoryModalProps) {
	const [open, setOpen] = useState(false)

	const _onSuccess = async () => {
		setOpen(false)
		await onSuccess?.()
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent size='lg'>
				<DialogHeader>
					<DialogTitle>Create a category</DialogTitle>
					<DialogDescription>
						A category is used to categorize incomes and expenses
					</DialogDescription>
				</DialogHeader>
				<CreateTransactionCategoryForm onSuccess={_onSuccess} />
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
