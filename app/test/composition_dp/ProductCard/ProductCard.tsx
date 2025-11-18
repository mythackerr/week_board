import React, { ReactNode } from "react";
import ProductCardContext from "./ProductCardContext";
import { Product } from "../types";

type Props = {
  product: Product;
  image?: ReactNode;
  info?: ReactNode;
  action?: ReactNode;
};

export default function ProductCard({ product, image, action, info }: Props) {
  return (
    <ProductCardContext.Provider value={{ product }}>
      <div className="w-[300px] border border-[gray]">
        {image}
        <div className="flex items-center flex-col gap-2 p-5">{info}</div>
        {action}
      </div>
    </ProductCardContext.Provider>
  );
}
