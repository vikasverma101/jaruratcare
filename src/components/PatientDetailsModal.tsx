import type { Patient } from '../hooks/usePatients'

type Props = {
	patient: Patient | null
	onClose: () => void
}

export default function PatientDetailsModal({ patient, onClose }: Props) {
	if (!patient) return null
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<div className="absolute inset-0 bg-black/40" onClick={onClose} />
			<div className="relative z-10 w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
				<div className="flex items-start justify-between">
					<h2 className="text-xl font-semibold">{patient.name}</h2>
					<button className="text-gray-500 hover:text-gray-700" onClick={onClose}>×</button>
				</div>
				<div className="mt-4 space-y-2 text-sm text-gray-700">
					<p><span className="font-medium">Age:</span> {patient.age}</p>
					<p><span className="font-medium">Contact:</span> {patient.contact}</p>
					{patient.email && <p><span className="font-medium">Email:</span> {patient.email}</p>}
					{patient.address && <p><span className="font-medium">Address:</span> {patient.address}</p>}
				</div>
				<div className="mt-6 text-right">
					<button className="rounded-md border px-4 py-2 text-sm" onClick={onClose}>Close</button>
				</div>
			</div>
		</div>
	)
}
