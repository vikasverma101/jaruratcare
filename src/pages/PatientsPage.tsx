import { usePatients } from '../hooks/usePatients'
import PatientCard from '../components/PatientCard'
import PatientDetailsModal from '../components/PatientDetailsModal'
import AddPatientForm from '../components/AddPatientForm'

export default function PatientsPage() {
	const { filtered, isLoading, error, search, setSearch, setSelected, selected, addPatient } = usePatients()

	return (
		<div className="space-y-6">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<h1 className="text-2xl font-bold">Patients</h1>
				<input
					className="w-full sm:w-80 rounded-md border px-3 py-2 text-sm"
					placeholder="Search by name..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</div>

			<AddPatientForm onAdd={addPatient} />

			{isLoading && (
				<div className="text-sm text-gray-500">Loading patients...</div>
			)}
			{error && (
				<div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>
			)}

			{!isLoading && !error && (
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{filtered.map((p) => (
						<PatientCard key={p.id} patient={p} onView={setSelected} />
					))}
					{filtered.length === 0 && (
						<div className="text-sm text-gray-500">No patients found.</div>
					)}
				</div>
			)}

			<PatientDetailsModal patient={selected} onClose={() => setSelected(null)} />
		</div>
	)
}
