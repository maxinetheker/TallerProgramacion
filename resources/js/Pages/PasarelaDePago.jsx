import WelcomeLayout from '@/Layouts/WelcomeLayout';
import { Head, router } from '@inertiajs/react';
import Swal from 'sweetalert2';

export default function ({ auth, laravelVersion, phpVersion }) {
    const handlePagar = (carro) => {
        router.post(
            route('registrarcompra'),
            { carro },
            {
                onSuccess: () => {
                    //Borrar local storage
                    localStorage.removeItem('compras');
                    Swal.fire({
                        title: 'Pago exitoso',
                        text: '¡Gracias por tu compra!',
                        icon: 'success',
                        confirmButtonText: 'Aceptar',
                    }).then(() => {
                        window.location.href = route('home');

                    });
                },
                onError: () => {
                    Swal.fire({
                        title: 'Error',
                        text: 'Hubo un error al procesar el pago',
                        icon: 'error',
                        confirmButtonText: 'Aceptar',
                    });
                },
            },
        );
    };
    return (
        <>
            <Head title="Comprar Cursos" />
            <WelcomeLayout
                auth={auth}
                laravelVersion={laravelVersion}
                phpVersion={phpVersion}
            >
                {(setMostrarFormulario, carro) => {
                    const total = carro.reduce((acc, item) => {
                        const precio = parseFloat(
                            item.precio.replace('S/.', '').replace(',', ''),
                        );
                        return acc + precio;
                    }, 0);

                    return (
                        <section id="PasarelaPrincipal" className="bg-gray-100 px-4 py-8">
                            <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-md">
                                <h2 className="mb-6 text-2xl font-bold">
                                    Resumen del Pago
                                </h2>
                                <div className="space-y-4">
                                    {carro.map((curso) => (
                                        <div
                                            key={curso.id}
                                            className="flex items-center gap-4 border-b pb-4"
                                        >
                                            <img
                                                src={curso.imagen}
                                                alt={curso.titulo}
                                                className="h-24 w-24 rounded object-cover"
                                            />
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold">
                                                    {curso.titulo}
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    {curso.descripcion}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Duración: {curso.duracion}
                                                </p>
                                            </div>
                                            <span className="text-lg font-bold text-blue-600">
                                                {curso.precio}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 flex items-center justify-between">
                                    <span className="text-xl font-semibold">
                                        Total a pagar:
                                    </span>
                                    <span className="text-xl font-bold text-green-600">
                                        S/. {total.toFixed(2)}
                                    </span>
                                </div>

                                <div className="mt-6 text-right">
                                    <button
                                        onClick={() => {
                                            handlePagar(carro);
                                        }}
                                        className="rounded bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
                                    >
                                        Proceder al pago
                                    </button>
                                </div>
                            </div>
                        </section>
                    );
                }}
            </WelcomeLayout>
        </>
    );
}
