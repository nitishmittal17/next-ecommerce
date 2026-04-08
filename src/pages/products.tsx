import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

import Breadcrumb from "@/components/breadcrumb";
import Footer from "@/components/footer";
import ProductsContent from "@/components/products-content";
import ProductsFilter from "@/components/products-filter";
import {
  ABTASTY_PRODUCTS_SCRIPT_ID,
  ABTASTY_PRODUCTS_SMARTCODE_SRC,
} from "@/utils/experiment-scripts";

import Layout from "../layouts/Main";

function useAbTastyWhenClientNavToProducts() {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    const raw = router.query.vwoMigration;
    const vwoMigration =
      raw === "true" || (Array.isArray(raw) && raw[0] === "true");
    if (vwoMigration) {
      return;
    }
    if (document.getElementById(ABTASTY_PRODUCTS_SCRIPT_ID)) {
      return;
    }
    const script = document.createElement("script");
    script.id = ABTASTY_PRODUCTS_SCRIPT_ID;
    script.type = "text/javascript";
    script.src = ABTASTY_PRODUCTS_SMARTCODE_SRC;
    document.head.appendChild(script);
  }, [router.isReady, router.query.vwoMigration]);
}

const Products = () => {
  useAbTastyWhenClientNavToProducts();

  return (
    <Layout>
      <Breadcrumb />
      <section className="products-page">
        <div className="container">
          <ProductsFilter />
          <ProductsContent />
        </div>
      </section>
      <Footer />
    </Layout>
  );
};

export default Products;

/** SSR on every request so `_document` sees `vwoMigration` (static prerender has empty `query`). */
export const getServerSideProps: GetServerSideProps = async () => ({
  props: {},
});
