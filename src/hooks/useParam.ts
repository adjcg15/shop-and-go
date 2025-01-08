import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function useParam(paramName: string, defaultValue: string) {
  const searchParams = useSearchParams();
  const [paramValue, setParamValue] = useState(defaultValue);

  useEffect(() => {
    const urlParam = searchParams.get(paramName);

    setParamValue(urlParam || defaultValue);
  }, [searchParams, defaultValue, paramName]);

  return {
    paramValue
  }
}