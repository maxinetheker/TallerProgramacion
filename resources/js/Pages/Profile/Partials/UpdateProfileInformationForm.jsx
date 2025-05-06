import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Select, Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            nombres: user.nombres,
            apellidos: user.apellidos,
            email: user.email,
            permisos: user.permisos,
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="codUsuario" value="Cod. Usuario" />

                    <TextInput
                        id="codUsuario"
                        className="mt-1 block w-full select-none text-neutral-500"
                        value={user.codUsuario}
                        required
                        isFocused
                        disabled
                    />
                </div>
                <div>
                    <InputLabel htmlFor="usuario" value="Usuario" />

                    <TextInput
                        id="usuario"
                        className="mt-1 block w-full select-none text-neutral-500"
                        value={user.usuario}
                        required
                        disabled
                    />
                </div>
                <div>
                    <InputLabel htmlFor="nombres" value="Nombres" />

                    <TextInput
                        id="nombres"
                        className="mt-1 block w-full"
                        value={data.nombres}
                        onChange={(e) => setData('nombres', e.target.value)}
                        required
                        autoComplete="nombres"
                    />

                    <InputError className="mt-2" message={errors.nombres} />
                </div>

                <div>
                    <InputLabel htmlFor="apellidos" value="Apellidos" />

                    <TextInput
                        id="apellidos"
                        className="mt-1 block w-full"
                        value={data.apellidos}
                        onChange={(e) => setData('apellidos', e.target.value)}
                        required
                        autoComplete="apellidos"
                    />

                    <InputError className="mt-2" message={errors.apellidos} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>
                {user.permisos == 'Administrador' && (
                    <div>
                        <InputLabel htmlFor="permisos" value="Permisos" />
                        <Select
                            id="permisos"
                            className="mt-1 block w-full select-none rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            value={data.permisos}
                            onChange={(e) =>
                                setData('permisos', e.target.value)
                            }
                        >
                            <option value="Administrador">Administrador</option>
                            <option value="UsuarioNormal">
                                Usuario Normal
                            </option>
                        </Select>
                        <InputError
                            className="mt-2"
                            message={errors.permisos}
                        />
                    </div>
                )}

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Guardar</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Guardado.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
