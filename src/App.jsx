import { useRef, useState } from 'react'
import { gallery } from './utils/data/gallery'
import upload from './assets/images//upload.png'

function App() {
  const [products, setProducts] = useState(gallery);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const [dropTargetIndex, setDropTargetIndex] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const movingItem = useRef(0);
  const movedToItem = useRef(0);

  //sorting the item
  const handleSort = () => {
    const productClone = [...products];
    const movingItemTemp = productClone[movingItem.current];
    
    // The original and dropped position references
    const draggedPosition = movingItem.current;
    const droppedPosition = movedToItem.current;

    // Remove the moving item from its original position
    productClone.splice(draggedPosition, 1);

    // Insert the moving item at the dropped position
    productClone.splice(droppedPosition, 0, movingItemTemp);

    setProducts(productClone);
    setIsDragging(false);
  };

  const handleDragStart = (i) => {
    movingItem.current = i;
    setIsDragging(true);
  }

  const handleDragEnter = (i) => {
    movedToItem.current = i;
    setDropTargetIndex(i);
  }

  const handleFileUpload = (e) => {
    const allFilesToBeUploaded = e.target.files;

    const newImages = Array.from(allFilesToBeUploaded).map((file, index) => {
      const id = products.length + index + 1;
      const src = URL.createObjectURL(file);

      return { id, src };
    });

    setProducts([...products, ...newImages]);
  };

  const handleSelectedItem = (product) => {
    const isSelected = selectedProducts?.find(item => item.id === product.id)
    if (isSelected){
      setSelectedProducts(selectedProducts.filter((item) => item.id !== product.id));
    }else{
      setSelectedProducts([...selectedProducts, product]);
    }
  }

  const handleDeleteItems = () => {
    const remainingProducts = products.filter((product) => !selectedProducts.some((item) => item.id === product.id))
    setSelectedProducts([])
    setProducts(remainingProducts);
  }

  return (
    <>
      <div className='image-header'>
        <div className="header-right">
            <h2>{selectedProducts.length > 0 ? selectedProducts.length === 1 ? `1 item selected` : `${selectedProducts.length} items selected` : 'Draggable Gallery'}</h2>
        </div>
        <div className="header-left">
          {selectedProducts.length > 0 ? <button onClick={handleDeleteItems}>Delete Files</button> : ''}
        </div>
      </div> 
      <div className='image-gallery'>
        <ul>
          {
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
                  className='image-check'
                  checked={selectedProducts.find((item) => item.id === product.id) ? true : false}
                  onChange={() => handleSelectedItem(product)}
                />
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
    </>
  )
}

export default App
