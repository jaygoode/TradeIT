import { Product } from "../../types/product";

const products: Product[] = [
  {
    id: "5",
    title: "Small Wooden Chicken",
    price: 329,
    description:
      "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
    category: {
      id: 2,
      name: "Electronics",
      image: "https://api.lorem.space/image/watch?w=640&h=480&r=613",
    },
    images: [
      "https://api.lorem.space/image/watch?w=640&h=480&r=7516",
      "https://api.lorem.space/image/watch?w=640&h=480&r=5730",
      "https://api.lorem.space/image/watch?w=640&h=480&r=358",
    ],
  },
  {
    id: "6",
    title: "Awesome Rubber Bike",
    price: 965,
    description:
      "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
    category: {
      id: 4,
      name: "Shoes",
      image: "https://api.lorem.space/image/shoes?w=640&h=480&r=4149",
    },
    images: [
      "https://api.lorem.space/image/shoes?w=640&h=480&r=5364",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=8445",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=1848",
    ],
  },
  {
    id: "7",
    title: "Ergonomic Frozen Shoes",
    price: 970,
    description:
      "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
    category: {
      id: 3,
      name: "Furniture",
      image: "https://api.lorem.space/image/furniture?w=640&h=480&r=371",
    },
    images: [
      "https://api.lorem.space/image/furniture?w=640&h=480&r=598",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=6852",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=4667",
    ],
  },
];

const testProduct: Product = {
  id: "7",
  title: "test product",
  price: 100,
  description: "description",
  category: {
    id: 100,
    name: "testname",
    image: "",
  },
  images: [],
};

export default products;
export { testProduct };
