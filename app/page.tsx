import { SearchParams } from "nuqs";
import { loadSearchParams } from "./searchParams";
import { getProducts } from "@/server/Product";
import { revalidateTag } from "next/cache";
import ProductFilter from "@/components/ProductFilter";
import ProductCard from "@/components/CardProduct";
import ProductsPagination from "@/components/ProductsPagination";


type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Home({ searchParams }: PageProps) {
  const { search, perPage, offset } = await loadSearchParams(searchParams);

  const transformedOffset = (offset - 1) * perPage;

  const products = await getProducts({
    search,
    perPage,
    offset: transformedOffset,
  });

  async function refetchProducts() {
    "use server";

    revalidateTag("products");
  }

  return (
    <main className="flex flex-col gap-10 justify-center max-w-6xl mx-auto p-10">
      <h1 className="text-2xl font-bold text-primary">MY STORE</h1>

      <ProductFilter refetchProducts={refetchProducts} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <ProductsPagination refetchProducts={refetchProducts} />
    </main>
  );
}