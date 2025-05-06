import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { Input } from 'postcss';
import { forwardRef, useRef } from 'react';

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

    
    const formRef = useRef(null);

    return (
        <div
            ref={ref}
            className={`fixed inset-0 flex h-screen w-screen items-center justify-center bg-neutral-800/25 ${props.mostrarFormulario ? '' : 'hidden'}`}
            onClick={()=> {
               if (!formRef.current.contains(event.target)) {
                props.setMostrarFormulario(false);
                console.log()
               } 
            }}
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
                <div ref={formRef}>
                    <form className="grid h-[500px] w-full grid-cols-2 bg-white p-16 shadow-lg lg:max-w-3xl">
                        <div className="flex flex-col justify-start gap-6 text-black w-[70%]">
                            <h1 className="text-4xl font-extrabold">
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
                        <div className='flex flex-col gap-2'>
                            <label className='text-black'>Nombre Completo</label>
                            <input placeholder={"Nombre Completo"} className="border-b-2 border-b-black w-full border-0 text-black" name='nombre' onChange={(e)=> setData('nombre',e.target.value)} > 
                            </input>
                            <label className='text-black'>Correo electrónico</label>
                            <input placeholder={"Email"} className="border-b-2 border-b-black w-full border-0 text-black" name='email' onChange={(e)=> setData('email',e.target.value)} > 
                            </input>
                            <label className='text-black'>Telefono</label>
                            <input placeholder={"Celular"} className="border-b-2 border-b-black w-full border-0 text-black" name='telefono' onChange={(e)=> setData('telefono',e.target.value)} > 
                            </input>
                        </div>
                    </form>
                </div>
            </Transition>
        </div>
    );
});

export default ModalFormulario;
