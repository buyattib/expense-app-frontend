import { useState } from 'react'
import { Plus as PlusIcon } from 'lucide-react'

import { Title } from '@/components/ui/title'
import { Button } from '@/components/ui/button'

import { Accounts } from './accounts'

export function AccountsContainer() {
	const [isCreateOpen, setIsCreateOpen] = useState(false)

	return (
		<section className='space-y-4 min-h-72'>
			<div className='flex flex-row justify-between items-center'>
				<Title level='h1'>Accounts</Title>
				<Button onClick={() => setIsCreateOpen(true)}>
					<PlusIcon />
					Account
				</Button>
			</div>

			<div className='flex flex-col gap-4'>
				<Accounts isCreateOpen={isCreateOpen} onCreateOpenChange={setIsCreateOpen} />
			</div>
		</section>
	)
}
