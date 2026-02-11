import { useCompany, useItem, useWarehouse } from "@/hooks/siteInfo";
import { useFrappeCreateDoc } from "frappe-react-sdk";

const Doc = () => {
  const { company } = useCompany();
  const { warehouse } = useWarehouse();
  const { items } = useItem();

  const { createDoc, loading, error, isCompleted, reset } =
    useFrappeCreateDoc();

  function handleCreate() {
    createDoc("Stock Entry", {
      company: company.name,
      stock_entry_type: "Material Receipt",
      posting_date: new Date().toISOString().split("T")[0],
      posting_time: new Date().toISOString().split("T")[1].split(".")[0],
      items: [
        {
          item_code: items && items[0].item_code,
          item_name: items && items[0].item_name,
          t_warehouse: warehouse.stores.name,
          qty: 10,
        },
      ],
    });
  }

  return (
    <>
      Add Stock Entry
      <select>
        {items && items.map((item) => <option>{item.item_name}</option>)}
      </select>
      <input type="number"></input>
      <button onClick={handleCreate} className="btn btn-primary">
        Create Stock Entry
      </button>
    </>
  );
};

export default Doc;
