// import reactLogo from './assets/images/react.svg'
import { products } from './utils/data/products'
import './App.css'

function App() {
  return (
    <>
      <ul className="image-gallery">
        {
          products.map((product) => (
            <li
              key={product.id}
              className={`image-item ${product.isFeatured ? 'featured' : ''}`}
            >
              <img src={product.src} alt={`Product ${product.id}`} />
            </li>
          ))
        }
      </ul>
    </>
  )
}

export default App
