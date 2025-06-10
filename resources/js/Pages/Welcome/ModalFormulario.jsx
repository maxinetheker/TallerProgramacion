import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { Input } from 'postcss';
import { forwardRef, useEffect, useRef } from 'react';
import Swal from 'sweetalert2'

const ModalFormulario = forwardRef((props, ref) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        nombre: '',
        email: '',
        telefono: '',
        curso: 'sap',
    });


    const enviarFormulario = (e) => {
        e.preventDefault();

        post(route('contactar'), {
            onSuccess: () => {
                props.setMostrarFormulario(false);
                //mostrar resulpuesta del server
                // Limpiar formulario
                reset(); // Resetear formulario
                Swal.fire({
                    title: 'Enviado!',
                    text: 'Formulario enviado con éxito',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                })
            },
            onError: (error) => {
                console.error('Error al enviar el formulario:', error);
                Swal.fire({
                    title: 'Error',
                    text: error.form,
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            },
        });
    };

    const formRef = useRef(null);

    return (
        <div
            ref={ref}
            className={`fixed z-20 inset-0 flex h-screen w-screen items-center justify-center bg-neutral-800/25 ${props.mostrarFormulario ? '' : 'hidden'}`}
            onClick={(e) => {
                if (!formRef.current.contains(e.target)) {
                    props.setMostrarFormulario(false);
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
                <div ref={formRef} className='relative'>
                    <form
                        onSubmit={enviarFormulario}
                        className="grid h-[500px] w-full sm:grid-cols-2 bg-white p-8 sm:p-16 shadow-lg lg:max-w-3xl"
                    >
                        <h1 className='sm:hidden text-black font-extrabold text-2xl'>Contáctenos</h1>
                        <div className="hidden sm:flex flex-col justify-start gap-6 text-black w-[70%]">
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
                        <div className='flex flex-col gap-2 h-[400px] overflow-auto ' >
                            <label className='text-black'>Nombre Completo</label>
                            <input placeholder={"Nombre Completo"} className="border-b-2 border-b-black w-full border-0 text-black" name='nombre' value={data.nombre} onChange={(e) => setData('nombre', e.target.value)} >
                            </input>
                            {errors.nombre && (
                                <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>
                            )}
                            <label className='text-black'>Correo electrónico</label>
                            <input placeholder={"Email"} value={data.email} className="border-b-2 border-b-black w-full border-0 text-black" name='email' onChange={(e) => setData('email', e.target.value)} >
                            </input>
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                            )}
                            <label className='text-black'>Telefono</label>
                            <input placeholder={"Celular"} value={data.telefono} className="border-b-2 border-b-black w-full border-0 text-black" name='telefono' onChange={(e) => setData('telefono', e.target.value)} >
                            </input>
                            {errors.telefono && (
                                <p className="text-red-500 text-sm mt-1">{errors.telefono}</p>
                            )}
                            <label className='text-black '>Curso de Interes</label>
                            <select className='text-black' name="curso" id="curso" value={data.curso} onChange={(e) => setData('curso', e.target.value)}>
                                <option value="scrum">Scrum Master</option>
                                <option value="pm">Project Management</option>
                                <option value="excel-avanzado">Excel Avanzado</option>
                                <option value="powerbi">Power BI</option>
                                <option value="python">Python para análisis de datos</option>
                                <option value="sql">SQL para bases de datos</option>
                                <option value="cyberseguridad">Fundamentos de Ciberseguridad</option>
                                <option value="redes">Redes Cisco CCNA</option>
                                <option value="aws">AWS Cloud Practitioner</option>
                                <option value="azure">Microsoft Azure Fundamentals</option>
                                <option value="java">Programación en Java</option>
                                <option value="html-css-js">Desarrollo Web (HTML, CSS, JS)</option>
                                <option value="react">React.js Básico</option>
                                <option value="devops">DevOps Fundamentals</option>
                                <option value="office">Microsoft Office (Word, Excel, PowerPoint)</option>
                            </select>
                            {errors.curso && (
                                <p className="text-red-500 text-sm mt-1">{errors.curso}</p>
                            )}
                            <button
                                type="submit"
                                disabled={processing}
                                className="
                                    bg-[#0E4BE5] text-white rounded-xl p-2 mt-4
                                    hover:brightness-110
                                    disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
                                    disabled:hover:brightness-100
                                    transition
                                "
                            >
                                {processing ? 'Enviando...' : 'Contactar'}
                            </button>
                        </div>
                    </form>
                    {errors.correo && (
                        <p className="text-red-500 text-sm">{errors.correo}</p>
                    )}
                    <div className='font-bold absolute top-2 right-2 border-2 border-red-200 text-white text-xl p-2 bg-red-500 w-5 h-5 box-content flex justify-center items-center hover:scale-110 cursor-pointer select-none'
                        onClick={() => {
                            props.setMostrarFormulario(false);
                            reset();
                            errors.curso = '';
                            errors.email = '';
                            errors.nombre = '';
                            errors.telefono = ''
                        }} >
                        x
                    </div>
                </div>
            </Transition>
        </div>
    );
});

export default ModalFormulario;
