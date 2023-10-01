import { BiSearch } from "react-icons/bi";
import { Inter } from "next/font/google";
import { FormEvent, useState } from "react";
import { Spinner, useToast } from "@chakra-ui/react";
import { Product_Review } from "@/types";
import Link from "next/link";
import ReviewModal from "@/Components/ReviewModal";
import Noproduct from "@/public/images/Noproduct.jpg";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

const baseUrl = process.env.NEXT_PUBLIC_BASEURL;

export default function Home() {
  const toast = useToast();
  const [keyword, setKeyword] = useState("");
  const [productReviews, setProductReviews] = useState<Product_Review[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (keyword) {
      try {
        const url = baseUrl + "/v1/api/amazon?keyword=" + keyword;
        console.log("handleSearch ~ url:", url);
        const res = await fetch(url);
        console.log("handleSearch ~ res:", res);

        const response = (await res.json()) as {
          status: boolean;
          message: string;
          product_reviews: Product_Review[];
        };
        console.log("response ~ response:", response);

        if (response.status) {
          setProductReviews(response.product_reviews);
          setIsError(false);
          toast({
            title: "Products fetched Successfully",
            status: "success",
            isClosable: true,
            position: "top-right",
          });
        }
      } catch (error) {
        setIsError(true);
        toast({
          title: "An Error Occured Could not fetch product reviews",
          status: "error",
          isClosable: true,
          position: "top-right",
        });
      }
    } else {
      toast({
        title: "Please Enter keyword",
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    }

    setIsLoading(false);
  };

  return (
    <main
      className={`flex bg-black text-white min-h-screen flex-col items-center justify-between ${inter.className}`}
    >
      <nav className="w-full">
        <div className="flex items-center justify-between w-full p-2">
          <Link href="/" className="font-bold text-xl sm:text-3xl">
            ReviewHub
          </Link>
          <form onSubmit={handleSearch} className="sm:flex items-center hidden">
            <input
              id="search"
              placeholder="Keyword of product you want"
              className="border rounded px-2 bg-gray-100 focus:border-yellow-500 placeholder:italic placeholder:text-xs outline-none border-r-0 rounded-r-none py-1 text-black"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button className="border p-2 rounded rounded-l-none hover:border-yellow-500">
              <BiSearch className="" />
            </button>
          </form>
          <div className="">
            <Link
              href="#contact"
              className="hover:underline hover:text-yellow-300"
            >
              Contact
            </Link>
          </div>
        </div>
        <form
          onSubmit={handleSearch}
          className="sm:hidden items-center flex justify-center w-full"
        >
          <input
            id="search"
            placeholder="Keyword of product you want"
            className="border rounded px-2 bg-gray-100 focus:border-yellow-500 placeholder:italic placeholder:text-xs outline-none border-r-0 rounded-r-none py-1 text-black"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button className="border p-2 rounded rounded-l-none hover:border-yellow-500">
            <BiSearch className="" />
          </button>
        </form>
      </nav>
      <section className="max-w-7xl mx-auto">
        {isLoading ? (
          <div className="flex justify-center flex-col items-center gap-2">
            <p>Sit back and let us do the hardwork for you</p>
            <Spinner />
          </div>
        ) : (
          <ul className="border bg-[#222] p-2 my-5 grid grid-cols-1 md:grid-cols-3 gap-10">
            {productReviews.map((product, i) => (
              <li
                key={i}
                className="shadow-2xl shadow-yellow-800 flex gap-2 rounded-lg p-2 sm:p-4"
              >
                <div className="h-40">
                  <Image
                    width={1000}
                    height={1000}
                    src={Noproduct}
                    alt="product"
                    className="border object-contain rounded-xl"
                  />
                </div>
                <div className="space-y-3">
                  <h3 className="">Name: {product.name}</h3>
                  <p>Price: {product.price}</p>
                  <ReviewModal reviews={product.reviews} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <footer id="contact" className=""></footer>
    </main>
  );
}
