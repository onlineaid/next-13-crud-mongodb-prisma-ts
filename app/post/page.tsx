import Link from 'next/link';

export interface Product {
    id: number;
    title: string;
    body: string;
}


const url = `https://jsonplaceholder.typicode.com/posts`;

export default async function Product() {
    const response = await fetch(url);
    const productData: Product[] = await response.json();

    return (
        <div className=''>
            <h1 className='text-2xl mt-10'>Post page</h1>
            {productData.map(post => (
                <div key={post.id} className=' p-5 mt-10 bg-red-500'>
                    <h2 className='text-1xl'> <Link href={`/post/${post.id}`}>{post.title}</Link></h2>
                </div>
            ))}
        </div>
    )
}
