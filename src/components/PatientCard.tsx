import type { Patient } from '../hooks/usePatients'

type Props = {
	patient: Patient
	onView: (p: Patient) => void
}

export default function PatientCard({ patient, onView }: Props) {
	return (
		<div className="rounded-lg border bg-white p-4 shadow-sm hover:shadow-lg hover:scale-105 hover:border-indigo-300 transition-all duration-200 cursor-pointer group">
			<div className="flex items-center justify-between">
				<h3 className="text-lg font-semibold group-hover:text-indigo-600 transition-colors duration-200">{patient.name}</h3>
				<span className="text-xs text-gray-500">ID: {patient.id}</span>
			</div>
			<dl className="mt-2 text-sm text-gray-600">
				<div className="flex justify-between">
					<dt className="font-medium">Age</dt>
					<dd>{patient.age}</dd>
				</div>
				<div className="flex justify-between">
					<dt className="font-medium">Contact</dt>
					<dd className="truncate max-w-48">{patient.contact}</dd>
				</div>
			</dl>
			<div className="mt-4">
				<button
					className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-white text-sm hover:bg-indigo-700 group-hover:bg-indigo-700 transition-colors duration-200"
					onClick={() => onView(patient)}
				>
					View Details
				</button>
			</div>
		</div>
	)
}
