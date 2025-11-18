import React from "react";
import { useProductCardContext } from "./ProductCardContext";

export default function ProductCardImage() {
  const { product } = useProductCardContext();
  return <img src={product.image} className="w-full object-cover" />;
}
