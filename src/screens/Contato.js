import React from 'react'
import "../styles/Contato.scss"
import { FaEnvelope } from 'react-icons/fa'

const Contato = () => {
    return (
        <>
            <div className="container">
                <section className="contact-section">
                    <div className="left-side-text">
                        <h2>Fale Conosco</h2>
                        <p>Entre em contato conosco para mais informações ou para falar com um de nosssos atendentes.</p>
                    </div>
                    <div className="right-side-inp-field">
                        <form action="https://formsubmit.co/kigepitu@mailgolem.com" method="post">
                            <div className="input-fields">
                                <label htmlFor="">Nome:</label>
                                <input type="text" name='nome' id='nome' />
                                <label htmlFor="">Email:</label>
                                <input type="text" name='email' id='email' />
                                <label htmlFor="">Mensagem:</label>
                            </div>

                            <textarea name="message" id="message" cols="30" rows="10"></textarea>
                            <button type='submit' className="contact-button">
                                <FaEnvelope className="button-icon" /> Enviar mensagem
                            </button>
                        </form>

                    </div>
                </section>
            </div>
        </>
    )
}

export default Contato