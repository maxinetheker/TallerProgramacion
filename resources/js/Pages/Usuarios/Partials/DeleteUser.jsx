import { useForm } from "@inertiajs/react"

export default function DeleteUser({idUser, mostrarAlerta, historial}) {
    const { data, setData, post, processing, errors, reset} = useForm({
        id : idUser
    })

    const eliminar = () => {
        console.log(idUser)
        post(route('usuarios.delete',data.id), {
            onFinish: () => {
                mostrarAlerta("Éxito", "El usuario se eliminó correctamente.","success")
            },
            onError: (errors) => {
                mostrarAlerta("Error", "Hubo un error al eliminar el usuario:"+ errors,"error")
            }
        })
    }

    return (
        <>
        {
         historial[0].estado != '0' ?   <img
                src="img/trash.svg"
                className="h-6 w-6 cursor-pointer hover:scale-110"
                onClick={eliminar}
            ></img> : ''
        }
        </>
    );
}
