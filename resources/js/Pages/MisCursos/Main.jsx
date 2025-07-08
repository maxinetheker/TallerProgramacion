import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";


export default function MisCursos() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold text-gray-800">
                    Mis Cursos
                </h2>
            }
        >
            <Head title="Mis Cursos" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-x-auto bg-white shadow-sm sm:rounded-lg">
                        <h1 className="px-6 py-3">
                            Mis cursos
                        </h1>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
