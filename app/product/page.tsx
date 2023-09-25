import Link from 'next/link';


export interface Product {
    id: number;
    title: string;
    image: string;
    // Add other properties as needed
}

const url = `https://fakestoreapi.com/products`;

export default async function Product() {
    const response = await fetch(url);
    const productData: Product[] = await response.json();

    return (
        <div>
            {productData.map(product => (
                <div key={product.id}>
                    <Link href={`/product/${product.id}`}>{product.title}</Link>
                </div>
            ))}
        </div>
    )
}
