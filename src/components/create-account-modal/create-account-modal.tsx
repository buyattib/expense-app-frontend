import { DialogProps } from '@radix-ui/react-dialog'

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

import { CreateAccountForm, type CreateAccountFormProps } from './create-account-form'

type CreateAccountModalProps = {
	onSuccess: CreateAccountFormProps['onSuccess']
	open: boolean
	onOpenChange: DialogProps['onOpenChange']
}

export function CreateAccountModal({ open, onOpenChange, onSuccess }: CreateAccountModalProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent size='lg'>
				<DialogHeader>
					<DialogTitle>Create a new account</DialogTitle>
					<DialogDescription>
						An account is used to track your transactions
					</DialogDescription>
				</DialogHeader>
				<CreateAccountForm onSuccess={onSuccess} />
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
