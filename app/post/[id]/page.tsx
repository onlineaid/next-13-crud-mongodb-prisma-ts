import Image from "next/image";

interface Product {
  id: string;
  title: string;
  description: string;
  createAt: string;
  updateAt: string;
}

interface Params {
  id: string; // Assuming 'id' is a string, adjust the type as needed
}

export default async function page({ params }: { params: Params }) {
  const productId = params.id;
  const details = await fetch(`http://localhost:3000/api/posts/${productId}`);
  const data: Product = await details.json();

  return (
    <>
      <div className="bg-slate-500 p-5 flex justify-between">
        <div>
          <div>page params id is {params.id}</div>
          <h1>{data.title}</h1>
          <h1>{data.description}</h1>
        </div>

        <button>Edit</button>
      </div>
    </>
  );
}
