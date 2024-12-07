import { Component, ErrorInfo } from 'react'
import { GlobalError } from '@/pages/global-error'

interface ErrorBoundaryState {
	hasError: boolean
}
interface ErrorBoundaryProps {
	children: React.ReactNode
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props)
		this.state = { hasError: false }
	}

	static getDerivedStateFromError(e: Error): ErrorBoundaryState {
		return { hasError: true }
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.log(error)
		console.log(errorInfo)
	}

	render() {
		if (this.state.hasError) {
			return <GlobalError />
		}

		return this.props.children
	}
}
