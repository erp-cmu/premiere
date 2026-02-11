import { useFrappeGetDocList } from "frappe-react-sdk";

export function useCompany() {
  const { data, isLoading, error } = useFrappeGetDocList(
    "Company",
    {
      fields: ["name", "abbr"],
    },
    {
      key: "company",
    },
  );

  // Extract information
  const company = {
    name: data ? data[0].name : null,
    abbr: data ? data[0].abbr : null,
  };

  return { company, isLoading, error };
}

export function useWarehouse() {
  const { data, isLoading, error } = useFrappeGetDocList(
    "Warehouse",
    {
      fields: ["*"],
      filters: [["is_group", "!=", 1]],
    },
    {
      key: "warehouse",
    },
  );

  // Extract information
  const stores = data ? data.filter((d) => d.warehouse_name === "Stores") : [];
  const work_in_progress = data
    ? data.filter((d) => d.warehouse_name === "Work In Progress")
    : [];
  const finished_goods = data
    ? data.filter((d) => d.warehouse_name === "Finished Goods")
    : [];
  const warehouse = {
    stores: stores.length > 0 ? stores[0] : null,
    work_in_progress: work_in_progress.length > 0 ? work_in_progress[0] : null,
    finished_goods: finished_goods.length > 0 ? finished_goods[0] : null,
  };

  // console.log("Warehouse:", { data, isLoading, error, warehouse });
  return { warehouse, isLoading, error };
}

export function useItem() {
  const { data, isLoading, error } = useFrappeGetDocList(
    "Item",
    {
      fields: ["*"],
      filters: [["disabled", "!=", 1]],
    },
    {
      key: "item",
    },
  );

  return { items: data, isLoading, error };
}
