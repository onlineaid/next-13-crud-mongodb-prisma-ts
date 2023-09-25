import Image from 'next/image'
import { Product } from '../page';

interface Params {
  id: string; // Assuming 'id' is a string, adjust the type as needed
}

export default async function page({ params }: { params: Params }) {

  const productId = params.id;
  const details = await fetch(`https://jsonplaceholder.typicode.com/posts/${productId}`);
  const data: Product = await details.json();


  return (
    <div>
      <div>page params id is {params.id}</div>
      <h1>{data.body}</h1>
    </div>
  )
}
