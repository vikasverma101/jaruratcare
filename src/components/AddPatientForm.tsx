import { useState } from 'react'
import type { Patient } from '../hooks/usePatients'

type Props = {
	onAdd: (p: Omit<Patient, 'id'>) => void
}

export default function AddPatientForm({ onAdd }: Props) {
	const [name, setName] = useState('')
	const [age, setAge] = useState<number>(30)
	const [contact, setContact] = useState('')
	const [email, setEmail] = useState('')

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		if (!name.trim() || !contact.trim()) return
		onAdd({ name: name.trim(), age, contact: contact.trim(), email })
		setName('')
		setAge(30)
		setContact('')
		setEmail('')
	}

	return (
		<form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3 sm:grid-cols-4">
			<input
				className="col-span-1 rounded-md border px-3 py-2 text-sm"
				placeholder="Name"
				value={name}
				onChange={(e) => setName(e.target.value)}
				required
			/>
			<input
				type="number"
				min={0}
				className="col-span-1 rounded-md border px-3 py-2 text-sm"
				placeholder="Age"
				value={age}
				onChange={(e) => setAge(parseInt(e.target.value || '0', 10))}
				required
			/>
			<input
				className="col-span-1 rounded-md border px-3 py-2 text-sm"
				placeholder="Contact"
				value={contact}
				onChange={(e) => setContact(e.target.value)}
				required
			/>
			<div className="col-span-1 flex gap-2">
				<input
					className="flex-1 rounded-md border px-3 py-2 text-sm"
					placeholder="Email (optional)"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<button type="submit" className="rounded-md bg-green-600 px-4 py-2 text-white text-sm hover:bg-green-700">
					Add
				</button>
			</div>
		</form>
	)
}
