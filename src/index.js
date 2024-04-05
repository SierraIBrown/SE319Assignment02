import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './style.css';

function Navbar({ setSearchQuery, handleReturn }){
    
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return(
        <nav className="navbar">
            <div className="container">
                <div>
                    <button className="return-button" onClick={handleReturn}>Return</button>
                </div>
                <form className="search-container">
                    <input 
                    className="search-input" 
                    type="search" 
                    placeholder="Search" 
                    aria-label="Search"
                    onChange={handleSearchChange}
                    />
                    <button className="search-button" type="submit">Search</button>
                </form>
                <a className="navbar-brand"> Helmets, just cause</a>
                <div className="cart-container">
                    <img className="cart-icon" src="./images/cartIcon.png" alt="cart"/>
                    <button className="checkout-button">Checkout</button>
                </div>
            </div>
        </nav>
    );
}

function Product({ searchQuery }){

    const products = [
        {id: 1, imageSrc: './images/Aether.jpg', title: 'Aether', description: 'Aether Helmet', price: 10.99},
        {id: 2, imageSrc: './images/Anubis.jpg', title: 'Anubis', description: 'Anubis Helmet', price: 10.99},
        {id: 3, imageSrc: './images/Astraios.jpg', title: 'Astraios', description: 'Astraios Helmet', price: 10.99},
        {id: 4, imageSrc: './images/Astreaus.jpg', title: 'Astreaus', description: 'Astreaus Helmet', price: 10.99},
        {id: 5, imageSrc: './images/Erebus.jpg', title: 'Erebus', description: 'Erebus Helmet', price: 10.99},
        {id: 6, imageSrc: './images/Osiris.jpg', title: 'Osiris', description: 'Osiris Helmet', price: 10.99},
        {id: 7, imageSrc: './images/Sobek.jpg', title: 'Sobek', description: 'Sobek Helmet', price: 10.99},
        {id: 8, imageSrc: './images/Thanatos.jpg', title: 'Thanatos', description: 'Thanatos Helmet', price: 10.99}
    ];
    
    const [cart, setCart] = useState({});
    const [isCartView, setIsCartView] = useState(false);

    const handleIncrement = (productId) => {
        setCart((prevCart) => ({
            ...prevCart,
            [productId]: (prevCart[productId] || 0) + 1,
        }));
    };

    const handleDecrement = (productId) =>{
        if(cart[productId] > 0){
            setCart((prevCart) => ({
                ...prevCart,
                [productId]: prevCart[productId] - 1,
            }));
        }
    };

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCheckout = () => {
        setIsCartView(true);
    }

    const handleReturn = () => {
        setIsCartView(false);
    }

    const totalPrice = Object.keys(cart).reduce((total, productId) => {
        const product = products.find((p) => p.id === parseInt(productId));
        return total + (product.price * cart[productId]);
    }, 0);

    const CartItem = ({ imageSrc, title, quantity, price }) => (
        <div className="cart-item">
            <img src={imageSrc} className="cart-item-image" alt="Product"/>
            <div className="cart-item-details">
                <h4>{title}</h4>
                <p>Quantity: {quantity}</p>
                <p>Price: ${price}</p>
            </div>
        </div>
    );

    // const ProductCard = ({ imageSrc, title, description, quantity, price, productId }) => (
    //     <div className="col-md-4" key={productId}>
    //         <div className="card">
    //             <img src={imageSrc} className="card-img-top" alt="Product"/>
    //             <div className="card-body">
    //                 <h4 className="card-title">{title}</h4>
    //                 <p className="card-text">{description}</p>
    //                 <div className="quantity-control">
    //                     <button className="btn btn-sm btn-primary" onClick={() => handleDecrement(productId)}>-</button>
    //                     <span className="quantity">{quantity}</span>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // )

    return(
        <div className="container">
            <div className="row">
                {isCartView ? (
                    <div className="cart-view">
                        {Object.keys(cart).map((productId) => {
                            const product = products.find((p) => p.id === parseInt(productId));
                            return (
                                <CartItem 
                                    key={productId}
                                    imageSrc={product.imageSrc}
                                    title={product.title}
                                    quantity={cart[productId]}
                                    price={product.price * cart[productId]}
                                />
                            );
                        })}
                        <div className="total-price">Total: ${totalPrice}</div>
                    </div>
                ):(
                    filteredProducts.map((product) => (
                        <div className="col-md-4" key={product.id}>
                            <div className = "card">
                                <img src={product.imageSrc} className="card-img-top" alt="Product"/>
                                <div className="card-body">
                                    <h4 className="card-title">{product.title}</h4>
                                    <p className="card-text">{product.description}</p>
                                    <div className="quantity-control">
                                        <button className="btn btn-sm btn-primary" onClick={() => handleDecrement(product.id)}>-</button>
                                        <span className="quantity">{cart[product.id] || 0}</span>
                                        <button className="btn btn-sm btn-primary" onClick={() => handleIncrement(product.id)}>+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

function Page(){

    const [searchQuery, setSearchQuery] = useState('');

    return(
        <div>
            <Navbar setSearchQuery={setSearchQuery}/>
            <Product searchQuery={searchQuery}/>
        </div>
    );
}

ReactDOM.render(
    <React.StrictMode>
        <Page />
    </React.StrictMode>,
    document.getElementById('root')
);