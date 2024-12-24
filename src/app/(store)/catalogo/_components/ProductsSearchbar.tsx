"use client";
import { IconButton } from "@/components/buttons/IconButton";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { IoSearch } from "react-icons/io5";

export const ProductsSearchbar = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchQueryChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchQuery(e.target.value);
  }

  const handleSearch: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const sanitizedSearchQuery = searchQuery.trim().toLowerCase();

    const params = new URLSearchParams(searchParams);
    if(sanitizedSearchQuery) {
      params.set("busqueda", sanitizedSearchQuery);
    } else {
      params.delete("busqueda");
    }
    router.push(`?${params.toString()}`, { scroll: false });
  }

  return (
    <form onSubmit={handleSearch} className="flex items-center mb-9">
      <input 
        type="text" 
        placeholder="Buscar producto por nombre"
        className="mr-5"
        value={searchQuery}
        onChange={handleSearchQueryChange}
      />
      <IconButton type="submit">
        <IoSearch />
      </IconButton>
    </form>
  );
}
