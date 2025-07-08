import WelcomeLayout from "@/Layouts/WelcomeLayout";
import { Head } from "@inertiajs/react";
import FirstMenu from "./Welcome/FirstSection/FirstMenu";
import CursosSection from "./Welcome/Sections/CursosSection";
import EstadisticasSection from "./Welcome/Sections/EstadisticasSection";
import RegistroSection from "./Welcome/Sections/RegistroSection";

export default function Welcome({ auth, laravelVersion, phpVersion }) {

    return (
        <>
            <Head title="Bienvenido" />
            <WelcomeLayout auth={auth} laravelVersion={laravelVersion} phpVersion={phpVersion}>
                {(setMostrarFormulario) => (
                    <>
                        <CursosSection></CursosSection>
                        <EstadisticasSection></EstadisticasSection>
                        <RegistroSection setMostrarFormulario={setMostrarFormulario}></RegistroSection>
                    </>)}
            </WelcomeLayout>
        </>
    );
}
