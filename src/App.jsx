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
    setDraggedItemIndex(null)
    setDropTargetIndex(i);
  }

  const handleFileUpload = (e) => {
    const allFilesToBeUploaded = e.target.files;

    const newImages = Array.from(allFilesToBeUploaded).map((file, index) => {
      const id = products.length + index + 1;
      const src = URL.createObjectURL(file);
      const isFeatured = false;

      return { id, src, isFeatured };
    });

    setProducts([...products, ...newImages]);
  };

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
          >
              <div className='image-item'>
                {isDragging && dropTargetIndex === index && (
                  <div className="placeholder-overlay">
                    <h6>Drop Here</h6>
                  </div>
                )}
                <img src={product.src} alt={`Product ${product.id}`} />
              </div>
          </li>
          ))
        }
        <li className="upload">
          <input
            type="file"
            multiple
            name="photos"
            id="photos"
            onChange={handleFileUpload}
          />
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
