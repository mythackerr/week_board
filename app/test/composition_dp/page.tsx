import { Star } from "lucide-react";
import { Product } from "./types";

const product: Product = {
  id: 1,
  image: "https://iili.io/HCURIHu.jpg",
  title: "Viston Earl Grey Tea",
  category: "Black Tea",
  rating: { stars: 4, reviews: 4 },
  price: 8.95,
};

export default function Page() {
  return (
    <div className="w-full p-5 antialiased">
      <h1 className="text-4xl font-medium my-3">
        Compound Component Composition<i className="text-gray-300">-ing</i> in
        ReactJS
      </h1>
      <div>
        {/* Product Card  */}

        <div>
          <img src={product.image} className="w-full object-cover" />

          <div className="flex items-center flex-col gap-2 p-5">
            <div className="text-[gray] text-sm">BLACK TEA</div>
            <div className="font-medium">Viston Earl Grey Tea</div>
            <div className="flex *:size-4 gap-1">
              <Star fill="black" />
              <Star fill="black" />
              <Star fill="black" />
              <Star fill="black" />
              <Star fill="transparent" />
            </div>
            <div className="font-bold text-2xl">€8.95</div>

            <button className="bg-gray-900  text-white block w-full p-2 my-2 hover:bg-gray-800 cursor-pointer">
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
