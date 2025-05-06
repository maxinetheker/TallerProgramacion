import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useRef } from 'react';
import DatosUsuarios from './Partials/DatosUsuarios';
import { Transition } from '@headlessui/react';
import Swal from 'sweetalert2';
import ModalCargando from '@/Components/ModalCargando';

export default function Usuarios({ usuarios, historial }) {
    const [expandedRows, setExpandedRows] = useState([]);
    const [modal, setModal] = useState(false);
    const ref = useRef(null);

    const toggleRow = (id) => {
        setExpandedRows((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
        );
    };

    const getHistorialByUsuario = (userId) =>
        historial.filter((h) => h.id_usuario === userId);



    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            <ModalCargando modal={modal} setModal={setModal} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-x-auto bg-white shadow-sm sm:rounded-lg">
                        <table className="min-w-full table-auto divide-y divide-gray-200">
                            <thead className="bg-blue-600 text-white">
                                <tr>
                                    <th className="px-4 py-2">Usuario</th>
                                    <th className="px-4 py-2">Nombres</th>
                                    <th className="px-4 py-2">Apellidos</th>
                                    <th className="px-4 py-2">IdUsuario</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {usuarios.map((user, idx) => (
                                    <DatosUsuarios
                                        key={idx}
                                        user={user}
                                        expanded={expandedRows.includes(
                                            user.id,
                                        )}
                                        toggleRow={toggleRow}
                                        historial={getHistorialByUsuario(
                                            user.id,
                                        )}
                                        idx={idx}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
