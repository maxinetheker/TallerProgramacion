import { Select } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import React, {Fragment, useEffect, useState} from "react";
import Swal from "sweetalert2";
import DeleteUser from "./DeleteUser";



export default function DatosUsuarios({ user, expanded, toggleRow, historial, idx  }) {
    const { data, setData, post, processing, errors, reset} = useForm({
        estado: historial[0].estado,
        permisos: user.permisos,
    })

    useEffect(() => {
        setData('estado', historial[0].estado)
        setData('permisos', user.permisos)
       
    }, [])


    const mostrarAlerta = (title, message, icon) => {
        Swal.fire({
            title: title,
            text: message,
            icon: icon,
            confirmButtonText: 'Aceptar'
        });
    };


    const submit = (e) => {
        post(route('historial.update', user.id), {
            onFinish: () => {
                mostrarAlerta('Éxito', 'El usuario se actualizó correctamente.', 'success');
            },
            onError: (errors) => {
                mostrarAlerta('Error', 'Hubo un error al actualizar el usuario: ' + errors,'error');
            }
        });
    }
 return (
    <React.Fragment>
    {/* Fila principal */}
    <tr
      className={`${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} cursor-pointer hover:bg-blue-50`}  
      onClick={() => toggleRow(user.id)}
    >
      <td className="px-4 py-2">{user.usuario}</td>
      <td className="px-4 py-2">{user.nombres}</td>
      <td className="px-4 py-2">{user.apellidos}</td>
      <td className="px-4 py-2">{user.id}</td>
    </tr>

    {/* Filas expandidas */}
    {expanded && (
      historial.map((h,key) => (
        <React.Fragment key={key}>
         <tr className="bg-gray-100">
            <td className="px-4 py-2 font-semibold">Permisos</td>
            <td className="px-4 py-2">
                { historial[0].estado != '0' ? (
                    <select id="permisos" name="permisos" onChange={(e) => setData('permisos', e.target.value)} value={data.permisos}>
                    <option value="Administrador">Administrador</option>
                    <option value="UsuarioNormal">Usuario Normal</option>
                    </select>
                ) : (
                    user.permisos == "Administrador" ? "Administrador" : "Usuario Normal"  // Solo el texto o lo que quieras mostrar
                )}
                </td>
            <td className="px-4 py-2 font-semibold">ItemAi</td>
            <td className="px-4 py-2">{user.ItemAi}</td>
          </tr>
          <tr className="bg-gray-100">
            <td className="px-4 py-2 font-semibold">CodUsuario</td>
            <td className="px-4 py-2">{user.codUsuario}</td>
            <td className="px-4 py-2 font-semibold">Email</td>
            <td className="px-4 py-2">{user.email}</td>
          </tr>
          <tr className="bg-gray-100">
            <td className="px-4 py-2 font-semibold">En línea</td>
            <td className="px-4 py-2">{h.enlinea ? (<div className='w-4 h-4 rounded-full bg-green-600 mx-auto'></div>) : (<div className='w-4 h-4 rounded-full bg-red-600  mx-auto'></div>)}</td>
            <td className="px-4 py-2 font-semibold">Ingresos</td>
            <td className="px-4 py-2">{h.num_ingresos}</td>
          </tr>
          <tr className="bg-gray-100">
            <td className="px-4 py-2 font-semibold">Fec Creación</td>
            <td className="px-4 py-2">{h.fec_creacion}</td>
            <td className="px-4 py-2 font-semibold">Hora Creación</td>
            <td className="px-4 py-2">{h.hora_creacion || '-'}</td>
          </tr>
          <tr className="bg-gray-100">
            <td className="px-4 py-2 font-semibold">Fec Modificación</td>
            <td className="px-4 py-2">{h.fec_modificacion || '-'}</td>
            <td className="px-4 py-2 font-semibold">Hora Modificación</td>
            <td className="px-4 py-2">{h.hora_modificacion || '-'}</td>
          </tr>
          <tr className="bg-gray-100">
            <td className="px-4 py-2 font-semibold">Fec Eliminación</td>
            <td className="px-4 py-2">{h.fec_eliminacion || '-'}</td>
            <td className="px-4 py-2 font-semibold">Hora Eliminación</td>
            <td className="px-4 py-2">{h.hora_eliminacion || '-'}</td>
          </tr>
          <tr className="bg-gray-100">
            <td className="px-4 py-2 font-semibold">Fec Último Acceso</td>
            <td className="px-4 py-2">{h.fec_ultimo_acceso}</td>
            <td className="px-4 py-2 font-semibold">Hora Último Acceso</td>
            <td className="px-4 py-2">{h.hora_ultimo_acceso}</td>
          </tr>
          <tr className="bg-gray-100">
            <td className="px-4 py-2 font-semibold">Creado Por</td>
            <td className="px-4 py-2">{h.creado_por || '-'}</td>
            <td className="px-4 py-2 font-semibold">Modificado Por</td>
            <td className="px-4 py-2">{h.modificado_por || '-'}</td>
          </tr>
          <tr className="bg-gray-100">
            <td className="px-4 py-2 font-semibold">Eliminado Por</td>
            <td className="px-4 py-2">{h.eliminado_por || '-'}</td>
            <td className="px-4 py-2 font-semibold">Estado</td>
           { historial[0].estado != '0' ? (<td className="px-4 py-2 font-bold ">
                 <Select id={"estado"} name={"estado"} onChange={(e)=> setData('estado', e.target.value)} value={data.estado} >
                  <option value="1">Activo</option>
                  <option value="2">Desactivo</option>
                 </Select>
             </td> ): <td className="px-4 py-2 font-bold text-red-600">Anulado</td>}
          </tr>
          <tr className="bg-gray-100" >
            <td colSpan={4} className=" justify-center items-center py-4">
              <div className='w-full flex flex-row justify-center items-center text-center gap-20 '>
              {
                 historial[0].estado != '0' ?  (<img src='img/save.svg' className='w-6 h-6 cursor-pointer hover:scale-110' onClick={() => submit()}></img>) : "" }
                <DeleteUser
                  idUser={user.id}
                  mostrarAlerta={mostrarAlerta}
                  historial={historial}
                />
              </div>
            </td>
          </tr>
          </React.Fragment>
      ))
    )}
  </React.Fragment>
 )
}