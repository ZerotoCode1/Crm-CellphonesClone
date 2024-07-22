import ProductServices, { ProductItem } from "@/services/Product/product.service";
import { useEffect, useState } from "react";

const useGetDetailProduct = (id: string) => {
  const [dataDetail, setData] = useState<ProductItem>();

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    try {
      const body = {
        _id: `${id}`,
      };
      const res = await ProductServices.getById(body);
      setData(res.data);
    } catch {}
  };

  return {
    dataDetail,
  };
};

export default useGetDetailProduct;
