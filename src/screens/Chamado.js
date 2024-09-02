import React, { useState } from 'react';
import { database, ref, set } from '../screens/firebase'; // Atualizar importações
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'; // Importar funções de Storage
import '../styles/Chamado.scss';

export const Chamado = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [serviceType, setServiceType] = useState('');
    const [desiredDate, setDesiredDate] = useState('');
    const [preferredTechnician, setPreferredTechnician] = useState('');
    const [image, setImage] = useState(null);
    const [submissionSuccess, setSubmissionSuccess] = useState(false);
    const [suggestions, setSuggestions] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Objeto para armazenar os dados
        const chamadoData = {
            name,
            phone,
            serviceType,
            desiredDate,
            preferredTechnician,
            image: '' // Inicialmente vazio
        };

        try {
            // Se houver uma imagem, faça o upload para o Firebase Storage
            if (image) {
                const storage = getStorage();
                const imageRef = storageRef(storage, `images/${Date.now()}_${image.name}`);
                await uploadBytes(imageRef, image);
                const imageUrl = await getDownloadURL(imageRef);
                chamadoData.image = imageUrl; // Armazene a URL da imagem no Realtime Database
            }

            // Gerar um ID único para o novo chamado
            const newChamadoRef = ref(database, 'Chamados/' + Date.now());

            // Salvar os dados no Firebase
            await set(newChamadoRef, chamadoData);
            console.log('Chamado salvo com sucesso!');

            // Exibir sugestões com base no tipo de serviço
            if (serviceType === 'Reparo de Computadores') {
                setSuggestions([
                    'Peça de reposição: HD',
                    'Peça de reposição: Memória RAM',
                    'Software de diagnóstico: AIDA64'
                ]);
            } else if (serviceType === 'Manutenção de Redes') {
                setSuggestions([
                    'Roteador de alta performance',
                    'Cabo de rede Cat6',
                    'Software de monitoramento de rede'
                ]);
            } else if (serviceType === 'Instalação de Softwares') {
                setSuggestions([
                    'Antivírus: Norton',
                    'Software de limpeza: CCleaner',
                    'Software de backup: Acronis True Image'
                ]);
            }

            setSubmissionSuccess(true);
        } catch (error) {
            console.error('Erro ao salvar chamado:', error);
        }

        // Limpar os campos após o envio
        setName('');
        setPhone('');
        setServiceType('');
        setDesiredDate('');
        setPreferredTechnician('');
        setImage(null);
    };

    return (
        <div className="chamado-container">
            {!submissionSuccess ? (
                <div>
                    <h1>Formulário de Pedido</h1>
                    <form onSubmit={handleSubmit} className="chamado-form">
                        <div className="form-group">
                            <label htmlFor="name">Nome:</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Número de Telefone:</label>
                            <input
                                type="tel"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="serviceType">Tipo de Serviço:</label>
                            <select
                                id="serviceType"
                                value={serviceType}
                                onChange={(e) => setServiceType(e.target.value)}
                                required
                            >
                                <option value="">Selecione um serviço</option>
                                <option value="Reparo de Computadores">Reparo de Computadores</option>
                                <option value="Manutenção de Redes">Manutenção de Redes</option>
                                <option value="Instalação de Softwares">Instalação de Softwares</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="desiredDate">Data Pretendida Para Resolução do Problema:</label>
                            <input
                                type="date"
                                id="desiredDate"
                                value={desiredDate}
                                onChange={(e) => setDesiredDate(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="preferredTechnician">Preferência Por Técnico (Não obrigatório):</label>
                            <input
                                type="text"
                                id="preferredTechnician"
                                value={preferredTechnician}
                                onChange={(e) => setPreferredTechnician(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="image">Imagem:</label>
                            <input
                                type="file"
                                id="image"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </div>
                        <button type="submit" className="submit-button">Enviar</button>
                    </form>
                </div>
            ) : (
                <div>
                    <h1>Nosso sistema detectou seu chamado</h1>
                    <p>Temos algumas sugestões para você:</p>
                    <ul>
                        {suggestions.map((suggestion, index) => (
                            <li key={index}>{suggestion}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Chamado;
