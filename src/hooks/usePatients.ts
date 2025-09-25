import { useEffect, useMemo, useState } from 'react'

export type Patient = {
	id: number
	name: string
	age: number
	contact: string
	email?: string
	address?: string
}

type UsePatientsResult = {
	patients: Patient[]
	isLoading: boolean
	error: string | null
	search: string
	setSearch: (value: string) => void
	filtered: Patient[]
	addPatient: (p: Omit<Patient, 'id'>) => void
	selected: Patient | null
	setSelected: (p: Patient | null) => void
}

export function usePatients(): UsePatientsResult {
	const [patients, setPatients] = useState<Patient[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)
	const [search, setSearch] = useState<string>('')
	const [selected, setSelected] = useState<Patient | null>(null)

	useEffect(() => {
		let isCancelled = false
		async function fetchPatients() {
			try {
				setIsLoading(true)
				setError(null)
				const res = await fetch('https://jsonplaceholder.typicode.com/users')
				if (!res.ok) throw new Error('Failed to fetch patients')
				const data: any[] = await res.json()
				const mapped: Patient[] = data.map((u) => ({
					id: u.id,
					name: u.name,
					age: 20 + (u.id % 50),
					contact: u.phone ?? 'N/A',
					email: u.email,
					address: u.address ? `${u.address.street}, ${u.address.city}` : undefined,
				}))
				if (!isCancelled) setPatients(mapped)
			} catch (e: any) {
				const mock: Patient[] = [
					{ id: 1, name: 'Ravi Sharma', age: 34, contact: '98765 43210', email: 'ravi@example.com', address: 'Sector 21, Noida' },
					{ id: 2, name: 'Anita Verma', age: 28, contact: '98765 11111', email: 'anita@example.com', address: 'Andheri West, Mumbai' },
					{ id: 3, name: 'Mohit Singh', age: 42, contact: '98765 22222', email: 'mohit@example.com', address: 'Baner, Pune' },
					{ id: 4, name: 'Priya Kapoor', age: 37, contact: '98765 33333', email: 'priya@example.com', address: 'HSR Layout, Bengaluru' },
				]
				if (!isCancelled) {
					setPatients(mock)
					setError('Loaded local mock data due to network error')
				}
			} finally {
				if (!isCancelled) setIsLoading(false)
			}
		}
		fetchPatients()
		return () => {
			isCancelled = true
		}
	}, [])

	const filtered = useMemo(() => {
		const q = search.trim().toLowerCase()
		if (!q) return patients
		return patients.filter((p) => p.name.toLowerCase().includes(q))
	}, [patients, search])

	function addPatient(p: Omit<Patient, 'id'>) {
		setPatients((prev) => [{ id: Date.now(), ...p }, ...prev])
	}

	return { patients, isLoading, error, search, setSearch, filtered, addPatient, selected, setSelected }
}
