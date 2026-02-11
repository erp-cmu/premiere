import { useAuthGuard } from "@/hooks/authGuard";
import { useCompany, useItem, useWarehouse } from "@/hooks/siteInfo";
import { useFrappeCreateDoc } from "frappe-react-sdk";
import { useState } from "react";

const Stock = () => {
  useAuthGuard();
  const { company } = useCompany();
  const { warehouse } = useWarehouse();
  const { items } = useItem();
  const [qty, setQty] = useState(0);
  const [itemCode, setItemCode] = useState("");

  const { createDoc, loading, error, isCompleted, reset } =
    useFrappeCreateDoc();

  // console.log({ items });
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
    <div className="mx-auto w-full max-w-2xl">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body gap-6">
          <div>
            <h2 className="card-title text-2xl">เพิ่มรายการสินค้าในสต็อก</h2>
            <p className="text-sm text-base-content/70">
              บันทึกรายการรับวัตถุดิบเข้าสู่คลังที่เลือก
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="form-control">
              <div className="label">
                <span className="label-text">รายการสินค้า</span>
              </div>
              <select
                className="select select-bordered w-full"
                onChange={(e) => setItemCode(e.target.value)}
                value={itemCode}
              >
                <option value="" disabled>
                  เลือกรายการสินค้า
                </option>
                {items &&
                  items.map((item) => (
                    <option key={item.item_code} value={item.item_code}>
                      {item.item_name}
                    </option>
                  ))}
              </select>
            </label>

            <label className="form-control">
              <div className="label">
                <span className="label-text">จำนวน</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={0}
                  className="input input-bordered w-full"
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                />
                <span>
                  {itemCode
                    ? items &&
                      items.find((item) => item.item_code === itemCode)
                        ?.stock_uom
                    : ""}
                </span>
              </div>
            </label>
          </div>

          <div className="card-actions justify-end gap-2">
            <button
              onClick={() => {
                setQty(0);
                setItemCode("");
                reset();
              }}
              className="btn btn-ghost"
              type="button"
            >
              เริ่มใหม่
            </button>
            <button
              onClick={handleCreate}
              className="btn btn-primary"
              type="button"
            >
              สร้างเอกสารการนำเข้า
            </button>
          </div>

          {(loading || error || isCompleted) && (
            <div className="text-sm">
              {loading && <span className="loading loading-spinner" />}
              {error && (
                <span className="text-error">Failed to create entry.</span>
              )}
              {isCompleted && (
                <span className="text-success">Entry created.</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stock;
