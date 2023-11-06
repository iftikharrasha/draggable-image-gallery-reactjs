import PropTypes from 'prop-types';

const ImageList = ({isDragging, dropTargetIndex, products, selectedProducts, handleDragStart, handleDragEnter, handleSelectedItem, handleSort}) => {
    return (
        products.map((product, index) => (
            <li key={product.id}
                className={selectedProducts?.find(item => item.id === product.id) ? ' clicked' : ''} 
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragEnter={() => handleDragEnter(index)}
                onDragEnd={handleSort}
            >
                <input
                    type="checkbox"
                    name={product.id}
                    id={product.id}
                    className='checkbox'
                    checked={selectedProducts.find((item) => item.id === product.id) ? true : false}
                    onChange={() => handleSelectedItem(product)}
                />
                <div className='product'>
                    {isDragging && dropTargetIndex === index && (
                    <div className="product__placeholder">
                        <h6>Drop Here</h6>
                    </div>
                    )}
                    <img src={product.src} alt={`Product ${product.id}`} />
                </div>
            </li>
        ))
    );
};

ImageList.propTypes = {
    isDragging: PropTypes.bool.isRequired,
    dropTargetIndex: PropTypes.number,
    products: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      src: PropTypes.string.isRequired,
    })).isRequired,
    selectedProducts: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      src: PropTypes.string.isRequired,
    })).isRequired,
    handleDragStart: PropTypes.func.isRequired,
    handleDragEnter: PropTypes.func.isRequired,
    handleSelectedItem: PropTypes.func.isRequired,
    handleSort: PropTypes.func.isRequired,
};

export default ImageList;