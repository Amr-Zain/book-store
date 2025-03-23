import { FaBox } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import Button from "../utils/button";
import { useState, useEffect } from "react";

function CartAddButton({ isAdded, add }: { isAdded: boolean; add: () => void }) {
    const [isClicked, setIsClicked] = useState(false);
    
    // Reset animation state when item is removed
    useEffect(() => {
        if (!isAdded) {
            setIsClicked(false);
        }
    }, [isAdded]);

    const clickHandler = () => {
        if (!isAdded) {
            add();
            setIsClicked(true);
            
        }
    };
    const bothFase = !isAdded && !isClicked;
    return (
        <Button
            onClick={clickHandler}
            className={`group flex justify-center h-8 relative transition-all duration-300 ease-in-out items-center gap-1 text-sm overflow-hidden ${
                isClicked ? 'clicked' : ''
            }`}
        >
            <span className={`absolute z-30 left-1/2 top-1/2 text-sm text-white transform -translate-x-1/2 -translate-y-1/2 transition-opacity ${
                isAdded ? 'opacity-0' : 'opacity-100'
            } ${isClicked ? 'animate-txt1' : ''}`}>
                Add to cart
            </span>

            <span className={`absolute z-30 left-1/2 top-1/2 text-sm text-white transform -translate-x-1/2 -translate-y-1/2 transition-opacity ${
                isAdded ? 'opacity-100' : 'opacity-0'
            } ${isClicked ? 'animate-txt2' : ''}`}>
                Added
            </span>

            {/* Icons always rendered but positioned conditionally */}
            <FiShoppingCart className={`absolute z-20 top-1/2 text-2xl transform -translate-x-1/2 -translate-y-1/2 ${
                isClicked ? 'animate-cart' : 'left-[-10%]'
            } ${isAdded ? 'left-[110%]' : ''}`} />

            <FaBox className={`absolute z-30 text-sm transform -translate-x-1/2 -translate-y-1/2 
            ${ bothFase ? 'animate-box' : 'top-[-30%] left-[52%]'}
            ${isAdded ? 'top-[40%] left-[112%]' : 'top-[-30%] left-[52%]'}
             `} 
            />
        </Button>
    );
}

export default CartAddButton;

/*
<FiShoppingCart className='absolute z-20 top-1/2 left-[-10%] text-2xl transform -translate-x-1/2 -translate-y-1/2 group-[.clicked]:animate-cart' />
                    <FaBox className='absolute z-30 top-[-30%] left-[52%] text-sm transform -translate-x-1/2 -translate-y-1/2 group-[.clicked]:animate-box'/> 
 */