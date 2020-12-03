import React, { useEffect, useRef, useState } from 'react'
import emailjs from 'emailjs-com'
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
								{contact.parsedText ? <div className='contact-text' dangerouslySetInnerHTML={contact.parsedText}></div> : <p className='contact-text'>{contact.text}</p>}
								{contact?.features.slice(0, contact.features.length - 1).map((elm, idx) => (
									<p className='contact-feat' key={idx}>
										<strong>{elm.split(':')[0]}</strong>: {elm.split(':')[1]}
									</p>
								))}
								<p className='work-with-us'>
									{contact.features[contact.features.length - 1]}{' '}
									<a className='link-to-modal' onClick={() => setShow(true)}>
										aquí
									</a>
									.
								</p>
							</div>
							<div className='right'>
								<form onSubmit={sendEmail}>
									{contact?.formInputs.map(
										(elm, idx) =>
											elm !== 'mensaje' && (
												<div key={idx} className='input-label'>
													<label htmlFor={idx}>{elm}</label>
													{elm === 'email' && <input type='email' name={elm} placeholder={elm} id={idx} required />}
													{elm === 'tel' && <input type='phone' name={elm} placeholder={elm} id={idx} required />}
													{elm === 'nombre' && <input type='text' name={elm} placeholder={elm} id={idx} required />}
													{elm === 'apellidos' && <input type='text' name={elm} placeholder={elm} id={idx} required />}
													{elm === 'empresa' && <input type='text' name={elm} placeholder={elm} id={idx} required />}
												</div>
											)
									)}
									{contact?.formInputs.map(
										(elm, idx) =>
											elm === 'mensaje' && (
												<div key={idx} className='input-textarea'>
													<label htmlFor={idx}>{elm}</label>
													<textarea type='text' name={elm} placeholder={elm} id={idx} required />
												</div>
											)
									)}
									<div className='submit-accept'>
										<div className='terms'>
											<input id='terms' name='terms' type='checkbox' value='1' required />
											<label htmlFor='terms'>Acepto términos y condiciones</label>
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
						<Cv sections={sections} />
					</Modal>
				</section>
			)}
		</>
	)
}
