import { cloneDeep, isArray } from "lodash";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

function useFiltersHandler(initialFilters: any) {
  const [filters, setFilters] = React.useState<{ page: number; size: number } | any>(initialFilters);

  const [rowsSelected, setRowsSelected] = React.useState<(string | number)[]>([]);
  const navigate = useNavigate();

  const handleChangePage = (page: number) => {
    setFilters((prev: object) => {
      return {
        ...prev,
        offset: (page - 1) * 10,
      };
    });
    navigate(`${location.pathname}?page=${page}&size=${filters.limit || filters.pageSize}`);
  };

  const handleChangePageDeleteTable = () => {
    setFilters((prev: object | any) => {
      return {
        ...prev,
        page: prev.page - 1,
      };
    });
  };

  const handleAddParams = (params: object) => {
    setFilters((prev: object) => {
      return {
        ...prev,
        ...params,
      };
    });
  };

  const handlePagesize = (_page: number, size: number) => {
    setFilters((prev: object) => {
      return {
        ...prev,
        // offset: 0,
        size: size,
      };
    });
  };

  const handleFirstPage = () => {
    setFilters((prev: object) => {
      return {
        ...prev,
        // offset: 0,
      };
    });
  };

  const reFetch = () => {
    const cloneFilters = { ...filters };
    setFilters(cloneFilters);
  };

  const resetToInitialFilters = useCallback(() => {
    setFilters(cloneDeep(initialFilters));
  }, [initialFilters]);

  const handleSelectAll = useCallback((data: any) => {
    setRowsSelected((prev) => {
      if (isArray(prev) && prev.length === data.length) {
        return [];
      }
      return data;
    });
  }, []);

  const handleSelectOne = useCallback((data: any) => {
    setRowsSelected((prev) => {
      if (isArray(prev)) {
        const foundIndex = prev.findIndex((elm: any) => elm?.id === data?.id);
        if (foundIndex !== -1) {
          const nextSelectedRow = cloneDeep(prev);
          nextSelectedRow.splice(foundIndex, 1);
          return nextSelectedRow;
        } else {
          return [...prev, data];
        }
      }
      return prev;
    });
  }, []);

  return {
    filters,
    rowsSelected,
    setRowsSelected,
    setFilters,
    resetToInitialFilters,
    handleSelectAll,
    handleSelectOne,
    handleChangePage,
    handleAddParams,
    handlePagesize,
    handleChangePageDeleteTable,
    handleFirstPage,
    reFetch,
  };
}
export default useFiltersHandler;
