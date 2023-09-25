import Image from 'next/image'
import { Product } from '../page';

interface Params {
  id: string; // Assuming 'id' is a string, adjust the type as needed
}

export default async function page({ params }: { params: Params }) {

  const productId = params.id;
  const details = await fetch(`https://fakestoreapi.com/products/${productId}`);
  await new Promise(resolve => setTimeout(resolve, 100))
  const data: Product = await details.json();


  return (
    <div>
      <div>page params id is {params.id}</div>
      <h1>{data.title}</h1>
      <Image
        src={data.image}
        width={500}
        height={500}
        alt="Picture of the author"
        placeholder='blur'
        blurDataURL="https://fakestoreapi.com/img"
      />
    </div>
  )
}
