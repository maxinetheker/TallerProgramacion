import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { forwardRef } from 'react';

const ModalFormulario = forwardRef((props, ref) => {
    const {
        data,
        setData,
        post,
        errors,
        setErrors,
        handleInputChange,
        handleSubmit,
    } = useForm({
        nombre: '',
        correo: '',
        telefono: '',
        curso: '',
    });

    return (
        <div
            ref={ref}
            className={`fixed inset-0 flex h-screen w-screen items-center justify-center bg-neutral-800/25 ${props.mostrarFormulario ? '' : 'hidden'}`}
        >
            <Transition
                show={props.mostrarFormulario}
                enter="transition ease-out duration-300 transform"
                enterFrom="opacity-50 scale-50"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75 transform"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <div>
                    <form className="grid h-[500px] w-full grid-cols-2 bg-white p-10 shadow-lg lg:max-w-3xl">
                        <div className="flex flex-col justify-start gap-6 text-black">
                            <h1 className="text-5xl font-extrabold">
                                Contáctenos
                            </h1>
                            <p className="text-sm text-neutral-500">
                                En Nextech, estamos aquí para ayudarte. Si
                                tienes alguna consulta, sugerencia o deseas más
                                información sobre nuestros servicios, por favor
                                completa el siguiente formulario. Nuestro equipo
                                se pondrá en contacto contigo a la brevedad
                                posible.
                            </p>
                            <p className="font-extrabold">
                                informes@nextech.pe
                            </p>
                        </div>
                        <div>
                            <div className="text-black">Holaaaaaaaa</div>
                        </div>
                    </form>
                </div>
            </Transition>
        </div>
    );
});

export default ModalFormulario;
