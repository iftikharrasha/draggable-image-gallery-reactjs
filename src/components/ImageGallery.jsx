import { useRef, useState } from 'react'
import { gallery } from '../assets/data/gallery'
import ImageList from './ImageList';
import ImageUpload from './ImageUpload';

const ImageGallery = () => {
    const [products, setProducts] = useState(gallery);
    const [selectedProducts, setSelectedProducts] = useState([]);
  
    const [dropTargetIndex, setDropTargetIndex] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
  
    //dragging references
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
  
    //multiple files uploading
    const handleFileUpload = (e) => {
      const allFilesToBeUploaded = e.target.files;
  
      const newImages = Array.from(allFilesToBeUploaded).map((file, index) => {
        const id = products.length + index + 1;
        const src = URL.createObjectURL(file);
  
        return { id, src };
      });
  
      setProducts([...products, ...newImages]);
    };
  
    //selecting multiple items
    const handleSelectedItem = (product) => {
      const isSelected = selectedProducts?.find(item => item.id === product.id)
      if (isSelected){
        setSelectedProducts(selectedProducts.filter((item) => item.id !== product.id));
      }else{
        setSelectedProducts([...selectedProducts, product]);
      }
    }
  
    //deleting selected items
    const handleDeleteItems = () => {
      const remainingProducts = products.filter((product) => !selectedProducts.some((item) => item.id === product.id))
      setSelectedProducts([])
      setProducts(remainingProducts);
    }

    return (
        <>
            <section className='details'>
                <div className="details__right">
                    <h2>{selectedProducts.length > 0 ? selectedProducts.length === 1 ? `1 item selected` : `${selectedProducts.length} items selected` : 'Draggable Gallery'}</h2>
                </div>
                <div className="details__left">
                {selectedProducts.length > 0 ? <button onClick={handleDeleteItems}>Delete Now</button> : ''}
                </div>
            </section> 
            <section className='gallery'>
                <ul>
                    <ImageList
                        isDragging={isDragging}
                        dropTargetIndex={dropTargetIndex} 
                        products={products} 
                        selectedProducts={selectedProducts} 
                        handleDragStart={handleDragStart} 
                        handleDragEnter={handleDragEnter}
                        handleSelectedItem={handleSelectedItem} 
                        handleSort={handleSort} 
                        handleFileUpload={handleFileUpload}
                    />
                    <ImageUpload handleFileUpload={handleFileUpload}/>
                </ul>
            </section>
        </>
    );
};

export default ImageGallery;