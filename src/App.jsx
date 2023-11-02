import { useRef, useState } from 'react'
import { gallery } from './utils/data/gallery'
import upload from './assets/images//upload.png'

function App() {
  const [products, setProducts] = useState(gallery);

  const [draggedItemIndex, setDraggedItemIndex] = useState(null);
  const [dropTargetIndex, setDropTargetIndex] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const movingItem = useRef(0);
  const movedToItem = useRef(0);

  //sorting the item
  const handleSort = (e) => {
    e.preventDefault();
    const productClone = [...products];
    const movingItemTemp = productClone[movingItem.current];
    
    // The original and dropped position references
    const draggedPosition = movingItem.current;
    const droppedPosition = movedToItem.current;

    if (productClone[droppedPosition].isFeatured) {
      // swapping with the featured item, non --> featured
      productClone[draggedPosition].isFeatured = true;
      productClone[droppedPosition].isFeatured = false;
    }else{
      if (productClone[draggedPosition].isFeatured) {
        // dragging the featured item, featured --> non
        productClone[1].isFeatured = true;
        productClone[draggedPosition].isFeatured = false;
      }
    }

    // Remove the moving item from its original position
    productClone.splice(draggedPosition, 1);

    // Insert the moving item at the dropped position
    productClone.splice(droppedPosition, 0, movingItemTemp);

    setProducts(productClone);
    setIsDragging(false);
  };

  const handleDragStart = (i) => {
    movingItem.current = i;
    setDraggedItemIndex(i);
    setIsDragging(true);
  }

  const handleDragEnter = (i) => {
    movedToItem.current = i;
    setDraggedItemIndex(null);
    setDropTargetIndex(i);
  }

  return (
    <div className='image-gallery'>
      <ul>
        {
          products.map((product, index) => (
          <li className={`${product.isFeatured ? 'featured' : ''}`} 
              key={product.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragEnter={() => handleDragEnter(index)}
              onDragEnd={(e) => handleSort(e)}
              // onDragOver={(e) => handleSort(e)}
          >
              <div className='image-item'>
                {isDragging && draggedItemIndex === index && (
                  <div className="placeholder-dragged"></div>
                )}
                {isDragging && dropTargetIndex === index && (
                  <div className="placeholder-dropped"></div>
                )}
                <img src={product.src} alt={`Product ${product.id}`} />
              </div>
          </li>
          ))
        }
        <li className="upload">
          <span>
            <img src={upload} alt="upload" width={25}/>
            <br />
            ADD IMAGE
          </span>
        </li>
      </ul>
    </div>
  )
}

export default App
