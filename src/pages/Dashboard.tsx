import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { AxiosError } from "axios";

import { api } from "../services/api";

import searchSvg from "../assets/search.svg";
import { CATEGORIES } from "../utils/categories";
import { formatCurrency } from "../utils/formatCurrency";

import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Pagination } from "../components/Pagination";
import { RefundItem, type RefundItemProps } from "../components/RefundItem";

import { useAuth } from "../hooks/useAuth";

type FormData = {
  name: string;
};

const REFUND_EXAMPLE = {
  id: "123",
  name: "Rodrigo",
  category: "Transporte",
  amount: formatCurrency(34.5),
  categoryImg: CATEGORIES["transport"].icon,
};

const PER_PAGE = 5;

export function Dashboard() {
  const [page, setPage] = useState(1);
  const [totalOfPage, setTotalOfPage] = useState(0);
  const [refunds, setRefunds] = useState<RefundItemProps[]>([REFUND_EXAMPLE]);

  const context = useAuth();

  const {
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
    },
  });

  const search = watch("name");

  async function fetchRefunds() {
    try {
      const response = await api.get<RefundsPaginationAPIResponse>(
        `/refunds?name=${search.trim()}&page=${page}&perPage=${PER_PAGE}`,
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);

      if (error instanceof AxiosError) {
        return alert(error.response?.data.message);
      }

      alert("Não foi possível carregar");
    }
  }

  function handlePagination(action: "next" | "previous") {
    setPage((prev) => {
      if (action === "next" && prev < totalOfPage) {
        return prev + 1;
      } else if (action === "previous" && prev > 1) {
        return prev - 1;
      }
      return prev;
    });
  }

  useEffect(() => {
    fetchRefunds();
  }, [page, search]);

  return (
    <div className="flex flex-col  p-10 bg-gray-500 rounded-xl md:min-w-3xl ">
      <h1 className="text-gray-100 font-bold text-xl flex-1">Solicitações</h1>
      <form
        className="flex flex-1 items-center justify-between pb-6 border-b border-b-gray-400 md:flex-row gap-2 mt-6"
        onSubmit={handleSubmit(fetchRefunds)}
      >
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <Input required placeholder="Pesquisar pelo nome" {...field} />
          )}
        />

        <Button type="submit" variant="icon" isLoading={isSubmitting}>
          <img src={searchSvg} alt="Ícone de pesquisar" className="w-5" />
        </Button>
      </form>
      <div className="my-6 flex flex-col gap-4 max-h-85.5 overflow-y-scroll">
        {refunds.map((refund) => (
          <RefundItem
            key={refund.id}
            data={refund}
            href={`/refund/${refund.id}`}
          />
        ))}
      </div>
      <Pagination
        onNext={() => handlePagination("next")}
        onPrevious={() => handlePagination("previous")}
        current={page}
        total={totalOfPage}
      />
    </div>
  );
}
