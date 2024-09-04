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
    const [repairDetails, setRepairDetails] = useState(''); // Novo estado para detalhes de reparo

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Objeto para armazenar os dados
        const chamadoData = {
            name,
            phone,
            serviceType,
            desiredDate,
            preferredTechnician,
            image: '', // Inicialmente vazio
            repairDetails // Adicionar detalhes de reparo
        };

        try {
            // Se houver uma imagem, faça o upload para o Firebase Storage
            if (image) {
                const storage = getStorage();
                const imageRef = storageRef(storage, `images/${Date.now()}_${image.name}`);
                await uploadBytes(imageRef, image);
                const imageUrl = await getDownloadURL(imageRef);
                chamadoData.image = imageUrl;
            }

            const newChamadoRef = ref(database, 'Chamados/' + Date.now());

            await set(newChamadoRef, chamadoData);
            console.log('Chamado salvo com sucesso!');

            // Atualizar sugestões com base no tipo de serviço e detalhes de reparo
            if (serviceType === 'Reparo de Computadores') {
                if (repairDetails === 'HD não está funcionando') {
                    setSuggestions([
                        'Peça de reposição: HD',
                        'Software de diagnóstico: AIDA64'
                    ]);
                } else if (repairDetails === 'Computador está lento') {
                    setSuggestions([
                        'Peça de reposição: Memória RAM',
                        'Software de limpeza: CCleaner'
                    ]);
                } else if (repairDetails === 'Problemas de inicialização') {
                    setSuggestions([
                        'Peça de reposição: HD',
                        'Software de diagnóstico: AIDA64'
                    ]);
                } else if (repairDetails === 'Outro') {
                    setSuggestions([
                        'Peça de reposição: HD',
                        'Peça de reposição: Memória RAM',
                        'Software de diagnóstico: AIDA64'
                    ]);
                }
            } else if (serviceType === 'Manutenção de Redes') {
                if (repairDetails === 'Problemas de conexão') {
                    setSuggestions([
                        'Roteador de alta performance',
                        'Cabo de rede Cat6',
                        'Software de monitoramento de rede'
                    ]);
                } else if (repairDetails === 'Rede lenta') {
                    setSuggestions([
                        'Roteador de alta performance',
                        'Cabo de rede Cat6',
                        'Software de monitoramento de rede'
                    ]);
                } else if (repairDetails === 'Falha de hardware') {
                    setSuggestions([
                        'Roteador de alta performance',
                        'Switch de rede',
                        'Cabo de rede Cat6'
                    ]);
                } else if (repairDetails === 'Outro') {
                    setSuggestions([
                        'Roteador de alta performance',
                        'Cabo de rede Cat6',
                        'Switch de rede',
                        'Software de monitoramento de rede'
                    ]);
                }
            } else if (serviceType === 'Instalação de Softwares') {
                if (repairDetails === 'Software não está funcionando') {
                    setSuggestions([
                        'Reinstalação do software',
                        'Verificação de compatibilidade',
                        'Atualização de drivers'
                    ]);
                } else if (repairDetails === 'Erro de instalação') {
                    setSuggestions([
                        'Verificação de requisitos do sistema',
                        'Verificação de espaço em disco',
                        'Atualização do sistema operacional'
                    ]);
                } else if (repairDetails === 'Licença não válida') {
                    setSuggestions([
                        'Verificação da chave de licença',
                        'Contato com o suporte técnico do software',
                        'Atualização de licença'
                    ]);
                } else if (repairDetails === 'Outro') {
                    setSuggestions([
                        'Verificação geral do software',
                        'Reinstalação e configuração',
                        'Contato com o suporte técnico'
                    ]);
                }
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
        setRepairDetails(''); // Limpar detalhes de reparo
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
                                onChange={(e) => {
                                    setServiceType(e.target.value);
                                    // Limpar detalhes de reparo ao mudar o tipo de serviço
                                    setRepairDetails('');
                                }}
                                required
                            >
                                <option value="">Selecione um serviço</option>
                                <option value="Reparo de Computadores">Reparo de Computadores</option>
                                <option value="Manutenção de Redes">Manutenção de Redes</option>
                                <option value="Instalação de Softwares">Instalação de Softwares</option>
                            </select>
                        </div>
                        {serviceType && (
                            <div className="form-group">
                                <label htmlFor="repairDetails">Detalhes do Problema:</label>
                                <select
                                    id="repairDetails"
                                    value={repairDetails}
                                    onChange={(e) => setRepairDetails(e.target.value)}
                                    required
                                >
                                    <option value="">Selecione um detalhe</option>
                                    {serviceType === 'Reparo de Computadores' && (
                                        <>
                                            <option value="HD não está funcionando">HD não está funcionando</option>
                                            <option value="Computador está lento">Computador está lento</option>
                                            <option value="Problemas de inicialização">Problemas de inicialização</option>
                                            <option value="Outro">Outro</option>
                                        </>
                                    )}
                                    {serviceType === 'Manutenção de Redes' && (
                                        <>
                                            <option value="Problemas de conexão">Problemas de conexão</option>
                                            <option value="Rede lenta">Rede lenta</option>
                                            <option value="Falha de hardware">Falha de hardware</option>
                                            <option value="Outro">Outro</option>
                                        </>
                                    )}
                                    {serviceType === 'Instalação de Softwares' && (
                                        <>
                                            <option value="Software não está funcionando">Software não está funcionando</option>
                                            <option value="Erro de instalação">Erro de instalação</option>
                                            <option value="Licença não válida">Licença não válida</option>
                                            <option value="Outro">Outro</option>
                                        </>
                                    )}
                                </select>
                            </div>
                        )}
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
                    <h1>Chamado Registrado com Sucesso!</h1>
                    <p>Aqui estão os detalhes do seu chamado:</p>
                    <div className="chamado-details">
                        <p><strong>Nome:</strong> {name}</p>
                        <p><strong>Número de Telefone:</strong> {phone}</p>
                        <p><strong>Tipo de Serviço:</strong> {serviceType}</p>
                        <p><strong>Detalhes do Problema:</strong> {repairDetails}</p>
                        <p><strong>Data Pretendida:</strong> {desiredDate}</p>
                        <p><strong>Preferência por Técnico:</strong> {preferredTechnician}</p>
                        {image && <p><strong>Imagem:</strong> <a href={image} target="_blank" rel="noopener noreferrer">Visualizar Imagem</a></p>}
                    </div>
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
