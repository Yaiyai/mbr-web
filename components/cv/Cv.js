import React, { useEffect, useRef, useState } from 'react'
import emailjs from 'emailjs-com'
import Swal from 'sweetalert2'
import Modal from 'react-bootstrap/Modal'

export const Cv = ({ sections, setShow }) => {
	const isMounted = useRef(true)
	const [cv, setCv] = useState()

	useEffect(() => {
		const sectionID = '5fc3c6aee0c34000178a6c42'
		setCv(sections.find((elm) => elm._id === sectionID))
		return () => {
			isMounted.current = false
		}
	}, [cv])

	const sendEmailCV = (e) => {
		e.preventDefault()
		emailjs
			.sendForm(process.env.serviceEmailCV, process.env.templateEmailCV, e.target, process.env.userEmail)
			.then((result) => {
				Swal.fire({
					title: '¡Gracias!',
					html: 'Tu solicitud de trabajo ha sido enviada',
					confirmButtonText: 'Cerrar',
				})
			})
			.then(() => setShow(false))
			.catch((error) => console.log(error.text))
	}

	return (
		<>
			{cv && (
				<>
					<Modal.Body>
						<h2>{cv.title}</h2>
						<p>{cv.text}</p>
						<form encType='multipart/form-data' method='post' onSubmit={sendEmailCV}>
							{cv?.formInputs.map(
								(elm) =>
									elm !== 'mensaje' && (
										<div key={elm} className='input-label'>
											<label htmlFor={elm}>{elm}</label>
											{elm === 'email' && <input type='email' name={elm} placeholder={elm} id={elm} required />}
											{elm === 'tel' && <input type='phone' name={elm} placeholder={elm} id={elm} required />}
											{elm === 'nombre' && <input type='text' name={elm} placeholder={elm} id={elm} required />}
											{elm === 'apellidos' && <input type='text' name={elm} placeholder={elm} id={elm} required />}
											{elm === 'cv' && <input type='file' name={elm} placeholder={elm} id={elm} required />}
										</div>
									)
							)}
							{cv?.formInputs.map(
								(elm) =>
									elm === 'mensaje' && (
										<div key={elm} className='input-textarea'>
											<label htmlFor={elm}>¿Por qué quiere trabajar con nosotros?</label>
											<textarea type='text' name={elm} placeholder={elm} id={elm} required />
										</div>
									)
							)}
							<div className='submit-accept'>
								<div className='terms'>
									<input id='terms' name='terms' type='checkbox' value='1' required />
									<label htmlFor='terms'>Acepto términos y condiciones</label>
								</div>
								<button type='submit' className='my-btn '>
									Enviar solicitud
								</button>
							</div>
						</form>
					</Modal.Body>
				</>
			)}
		</>
	)
}
