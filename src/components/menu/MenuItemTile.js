import AddToCartButton from "@/components/menu/AddToCartButton";

export default function MenuItemTile({ onAddToCart, ...item }) {
  const { image, description, name, basePrice, sizes, extraIngredientPrices } =
    item;
  const hasSizesOrExtras =
    sizes?.length > 0 || extraIngredientPrices?.length > 0;
  return (
    <div className="bg-gray-100 p-2 rounded-lg text-center group transition-transform transform hover:scale-105 hover:bg-gray-200 hover:shadow-md hover:shadow-gray-400/30 grid grid-rows-[auto,1fr,auto] h-full">
      <div className="overflow-hidden rounded-lg w-full h-48 mx-auto mb-4 transition-transform transform group-hover:scale-105">
        <img src={image} className="w-full h-full object-cover" alt="pizza" />
      </div>
      <h4 className="font-semibold text-xl text-gray-800 my-3 transition-colors group-hover:text-primary">
        {name}
      </h4>
      <p className="text-gray-600 text-sm line-clamp-3 mb-4 transition-opacity group-hover:opacity-90">
        {description}
      </p>
      <div className="flex justify-center mt-auto">
        <AddToCartButton
          image={image}
          hasSizesOrExtras={hasSizesOrExtras}
          onClick={onAddToCart}
          basePrice={basePrice}
        />
      </div>
    </div>
  );
}
