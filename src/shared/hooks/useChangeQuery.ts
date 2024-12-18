"use client";

import { usePathname, useRouter } from "next/navigation";

import getRoute from "../utils/exam-list";
import useGetAllParams from "./useQueryParams";

const useChangeQuery = <
  T extends (queries: Record<string, string | number>, ...args: any[]) => void,
>(
  mutateQuery: T,
) => {
  const router = useRouter();
  const pathName = usePathname();
  const queries = useGetAllParams();

  return (...args: Parameters<T> extends [any, ...infer P] ? P : never) => {
    mutateQuery(queries, ...args);

    const queryIds = Object.values(queries);
    const route = getRoute(queryIds, pathName);

    router.push(route);
  };
};

export default useChangeQuery;
