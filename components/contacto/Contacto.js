import React, { useEffect, useRef, useState } from 'react'
import emailjs from 'emailjs-com'
import Link from 'next/link'
import Modal from 'react-bootstrap/Modal'

import Swal from 'sweetalert2'
import { Cv } from '../cv/Cv'

export const Contacto = ({ sections }) => {
	const isMounted = useRef(true)
	const [show, setShow] = useState(false)
	const [contact, setContact] = useState()

	useEffect(() => {
		const sectionID = '5fc3c7bce0c34000178a6c43'
		setContact(sections.find((elm) => elm._id === sectionID))
		return () => {
			isMounted.current = false
		}
	}, [contact])

	const sendEmail = (e) => {
		e.preventDefault()
		emailjs
			.sendForm(process.env.serviceEmail, process.env.templateEmail, e.target, process.env.userEmail)
			.then((result) =>
				Swal.fire({
					title: '¡Gracias!',
					html: 'Tu consulta ha sido enviada',
					confirmButtonText: 'Cerrar',
				})
			)
			.catch((error) => console.log(error.text))
	}

	return (
		<>
			{contact && (
				<section className='contacto'>
					<div className='container'>
						<p className='subtitle'>{contact.subtitle}</p>
						<h2>{contact.title}</h2>
						<div className='fix'>
							<div className='left'>
								{contact.parsedText ? (
									<div>
										<div className='text-editor' dangerouslySetInnerHTML={contact.parsedText}></div>
										<button className='my-btn mini' onClick={() => setShow(true)}>
											Enviar CV
										</button>
									</div>
								) : (
									<p className='contact-text'>{contact.text}</p>
								)}
							</div>
							<div className='right'>
								<form onSubmit={sendEmail}>
									{contact?.formInputs.map(
										(elm, idx) =>
											elm !== 'mensaje' && (
												<div key={idx} className='input-label'>
													<label htmlFor={idx}>{elm}</label>
													{elm === 'email' && <input type='email' name={elm} placeholder='Correo electrónico' id={idx} required />}
													{elm === 'tel' && <input type='phone' name={elm} placeholder='Teléfono' id={idx} required />}
													{elm === 'nombre' && <input type='text' name={elm} placeholder='Nombre' id={idx} required />}
													{elm === 'apellidos' && <input type='text' name={elm} placeholder='Apellidos' id={idx} required />}
													{elm === 'empresa' && <input type='text' name={elm} placeholder='Empresa' id={idx} required />}
												</div>
											)
									)}
									{contact?.formInputs.map(
										(elm, idx) =>
											elm === 'mensaje' && (
												<div key={idx} className='input-textarea'>
													<label htmlFor={idx}>{elm}</label>
													<textarea type='text' name={elm} placeholder='Mensaje' id={idx} required />
												</div>
											)
									)}
									<div className='submit-accept'>
										<div className='terms'>
											<input id='terms' name='terms' type='checkbox' value='1' required />
											<label htmlFor='terms'>
												Acepto la
												<Link href='/politica-privacidad' target='new'>
													<a>Política de Privacidad</a>
												</Link>
											</label>
										</div>
										<button type='submit' className='my-btn '>
											Enviar consulta
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
					<Modal dialogClassName='modal-width' centered className='my-modals' show={show} onHide={() => setShow(false)}>
						<Cv sections={sections} setShow={setShow} />
					</Modal>
				</section>
			)}
		</>
	)
}
