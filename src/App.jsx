import { useRef, useState } from 'react'
import { gallery } from './utils/data/gallery'

function App() {
  const [products, setProducts] = useState(gallery);

  const movingItem = useRef(0);
  const movedToItem = useRef(0);
  // console.log(`initial ${movingItem.current}`)
  
  //1. swapping items
  // const handleSort = () => {
  //     const productClone = [...products]
  //     const temp = productClone[movingItem.current]
  //     productClone[movingItem.current] = productClone[movedToItem.current]
  //     productClone[movedToItem.current] = temp
  //     setProducts(productClone)
  // };

  //2. sorting before the item
  const handleSort = () => {
    const productClone = [...products];
    const movingItemTemp = productClone[movingItem.current];
    
    // The original and dropped position references
    const originalPosition = movingItem.current;
    const droppedPosition = movedToItem.current;

    // Remove the moving item from its original position
    productClone.splice(originalPosition, 1);

    // Insert the moving item at the dropped position
    productClone.splice(droppedPosition, 0, movingItemTemp);

    setProducts(productClone);
  };

  const handleDragStart = (i) => {
    console.log(`movingItem.current is now ${i}`)
    movingItem.current = i;
  }

  const handleDragEnter = (i) => {
    console.log(`movedToItem.current is now ${i}`)
    movedToItem.current = i;
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
              onDragOver={(e) => e.preventDefault()}
              onDragEnd={handleSort}
          >
              <img src={product.src} alt={`Product ${product.id}`} />
          </li>
          ))
        }
        <li className="upload"
        >
            <span>
              <img src="https://cdn.icon-icons.com/icons2/3214/PNG/512/cloud_file_upload_server_icon_196427.png" alt="upload" width={100}/>
              <br />
              ADD IMAGE
            </span>
        </li>
      </ul>
    </div>
  )
}

export default App
