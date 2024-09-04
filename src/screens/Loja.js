import React from 'react';
import '../styles/Loja.scss';

import Product from '../components/Produto';

const Loja = () => {
    const products = [
        {
            image: 'https://thispersondoesnotexist.com/',
            title: 'Produto 1',
            description: 'Descrição do produto 1',
            price: 'R$ 100,00'
        },
        {
            image: 'https://thispersondoesnotexist.com/',
            title: 'Produto 2',
            description: 'Descrição do produto 2',
            price: 'R$ 150,00'
        },
        {
            image: 'https://thispersondoesnotexist.com/',
            title: 'Produto 2',
            description: 'Descrição do produto 2',
            price: 'R$ 150,00'
        },
        {
            image: 'https://thispersondoesnotexist.com/',
            title: 'Produto 2',
            description: 'Descrição do produto 2',
            price: 'R$ 150,00'
        },
        {
            image: 'https://thispersondoesnotexist.com/',
            title: 'Produto 2',
            description: 'Descrição do produto 2',
            price: 'R$ 150,00'
        },
        {
            image: 'https://thispersondoesnotexist.com/',
            title: 'Produto 2',
            description: 'Descrição do produto 2',
            price: 'R$ 150,00'
        },
        {
            image: 'https://thispersondoesnotexist.com/',
            title: 'Produto 2',
            description: 'Descrição do produto 2',
            price: 'R$ 150,00'
        },
        {
            image: 'https://thispersondoesnotexist.com/',
            title: 'Produto 2',
            description: 'Descrição do produto 2',
            price: 'R$ 150,00'
        }
    ]

    return (
        <div className="loja-container">
            <main className="loja-main">
                <section className="produtos">
                    <div className="produto-list">
                        {products.map((product, index) => (
                            <Product
                                key={index}
                                image={product.image}
                                title={product.title}
                                description={product.description}
                                price={product.price}
                            />
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Loja;
