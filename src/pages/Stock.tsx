import { useCompany, useItem, useWarehouse } from "@/hooks/siteInfo";
import { useFrappeCreateDoc } from "frappe-react-sdk";
import { useState } from "react";

const Doc = () => {
  const { company } = useCompany();
  const { warehouse } = useWarehouse();
  const { items } = useItem();
  const [qty, setQty] = useState(0);
  const [itemCode, setItemCode] = useState("");

  console.log({ itemCode, qty, items });

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
          item_code: itemCode,
          item_name:
            items &&
            items.find((item) => item.item_code === itemCode)?.item_name,
          t_warehouse: warehouse.stores.name,
          qty: qty,
        },
      ],
    });
  }

  return (
    <>
      Add Stock Entry
      <select onChange={(e) => setItemCode(e.target.value)} value={itemCode}>
        <option value="" disabled selected>
          Select Item
        </option>
        {items &&
          items.map((item) => (
            <option key={item.item_code} value={item.item_code}>
              {item.item_name}
            </option>
          ))}
      </select>
      <input
        type="number"
        value={qty}
        onChange={(e) => setQty(Number(e.target.value))}
      ></input>
      <button onClick={handleCreate} className="btn btn-primary">
        Create Stock Entry
      </button>
      <button
        onClick={() => {
          setQty(0);
          setItemCode("");
          reset();
        }}
      >
        Reset
      </button>
    </>
  );
};

export default Doc;
