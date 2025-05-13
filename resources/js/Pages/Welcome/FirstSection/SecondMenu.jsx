import { Button } from '@headlessui/react';

export default function SecondMenu({ setMostrarFormulario }) {
    return (
        <>

            <h1 className="text-4xl font-extrabold sm:w-[600px] sm:max-screen 2xl:text-5xl">
                IMPULSA TU CARRERA CON NOSOTROS
            </h1>
            <p className="w-80 text-neutral-900">
                Aprende de expertos, certifica tus conocimientos y destaca en el
                mundo laboral con NEXTECH.
            </p>
            <Button
                className={`rounded-xl bg-[#0B60F7] p-3 py-2 text-white hover:scale-110 hover:brightness-110`}
                onClick={() => setMostrarFormulario(true)}
            >
                Deseo Información
            </Button>
        </>
    );
}
