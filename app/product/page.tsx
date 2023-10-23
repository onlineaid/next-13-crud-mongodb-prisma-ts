import Link from "next/link";
import Image from 'next/image'

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
            {productData.map((product) => (
                <div key={product.id}>
                    <Link href={`/product/${product.id}`}>{product.title}</Link>
                    <Image
                        src={product.image}
                        width={200}
                        height={200}
                        alt={'lol'}
                        loading="lazy"
                        className="transform transition-transform duration-300"
                    />

                </div>
            ))}
        </div>
    );
}
