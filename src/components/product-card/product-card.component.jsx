import { useContext } from "react";
import "./product-card.styles.scss";
import { CartContext } from "../../context/cart.context";
import Button, { BUTTON_TYPE_CLASSES }  from "../button/button.component";

const ProductCard = ({product}) => {

    const { name, imageUrl, price } = product;
    const { addItemToCart } = useContext(CartContext);

    const addProductToCart = () => addItemToCart(product);
    return (
        <div className="product-card-container">
            <img src={imageUrl} alt={name}></img>
            <div className="footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={ addProductToCart }>Add to cart</Button>
        </div>
    )

};

export default ProductCard;