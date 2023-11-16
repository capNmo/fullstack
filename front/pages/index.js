import axios from 'axios';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';
import { Store } from '../utils/Store';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function Home({ products, featuredProducts }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);

    const quantity = existItem ? existItem.quantity + 1 : 1;
    let data = [];
    var url = `http://localhost:4000/api/products/${product._id}`;
    let axi = await axios.get(url).then(
      response => {
        data = response.data
      }
    )
    
    if (data.countInStock < quantity) {
      return toast.error('Sorry. Product is out of stock');
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });

    toast.success('Product added to the cart');
  };

  return (
    <Layout title="Home Pagesss">
      {/* <Carousel showThumbs={false} autoPlay>
        {featuredProducts.map((product) => (
          <div key={product._id}>
            <Link href={`/product/${product.slug}`} passHref className="flex">
              <img src={product.banner} alt={product.name} />
            </Link>
          </div>
        ))}
      </Carousel> */}
      <h2 className="h2 my-4">Latest Productssss</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductItem
            product={product}
            key={product.slug}
            addToCartHandler={addToCartHandler}
          ></ProductItem>
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {

  var mproducts = [] //await Product.find().lean();
  var featuredProducts = [] //await Product.find({ isFeatured: true }).lean();
  
  await axios.get('http://localhost:4000/api/products')
  .then(function (response) {
    mproducts = response.data;
  })
  .catch(function (error) {
    console.log(error);
  });

  return { 
    props: {
      featuredProducts: featuredProducts,
      products: mproducts,
    },
  };
}
