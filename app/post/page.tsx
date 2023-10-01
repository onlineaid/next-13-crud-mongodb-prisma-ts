import Link from 'next/link';

interface Product {
    id: string;
    title: string;
    description: string;
    createAt: string;
    updateAt: string;
  }
  
  interface SearchResponse {
    results: Product[];
  }
  

const url = `https://jsonplaceholder.typicode.com/posts`;
const searchUrl = `http://localhost:3000/api/search?query=${`init`}`;

async function getPostsData() {
    const response = await fetch(url);
    const productData: Product[] = await response.json();
    return productData
}

async function getSearchData() {
    const response = await fetch(searchUrl);
    const searchData: SearchResponse = await response.json();
    return searchData
}
export default async function Product() {
    const [posts, search] = await Promise.all([getPostsData(), getSearchData()])

    return (
        <div className=''>
            <h1 className='text-2xl mt-10'>Post page</h1>
            <div>
                {search.results.map(s => (
                    <div key={s.id} className=' p-5 mt-10 bg-red-500'>
                        <h2 className='text-1xl'> <Link href={`/post/${s.id}`}>{s.title}</Link></h2>
                    </div>
                ))}
            </div>

            <hr />

            {posts.map(post => (
                <div key={post.id} className=' p-5 mt-10 bg-red-500'>
                    <h2 className='text-1xl'> <Link href={`/post/${post.id}`}>{post.title}</Link></h2>
                </div>
            ))}
        </div>
    )
}
