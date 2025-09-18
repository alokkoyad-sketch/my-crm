// components/OrderModal.js
"use client";
import { useEffect, useState } from "react";

export default function OrderModal({ isOpen, onClose, initialData, onSave }) {
  const [form, setForm] = useState(getEmpty());
  const [postOffices, setPostOffices] = useState([]);
  const [loadingPO, setLoadingPO] = useState(false);
  const [poError, setPoError] = useState("");

  useEffect(() => {
    setForm(initialData ? { ...initialData } : getEmpty());
    setPostOffices([]);
    setPoError("");
  }, [initialData, isOpen]);

  useEffect(() => {
    // fetch post offices when pincode length looks valid (6)
    const pin = (form.pincode || "").trim();
    if (pin.length === 6) {
      fetchPostOffices(pin);
    } else {
      setPostOffices([]);
      setPoError("");
    }
  }, [form.pincode]);

  function getEmpty() {
    return {
      id: null,
      orderNo: "",
      awb: "",
      courierCompany: "",
      courierMode: "",
      mobile: "",
      mobile2: "",
      name: "",
      product: "",
      course: "",
      offerPrice: "",
      pincode: "",
      postOffice: "",
      address: "",
      remarks: "",
      landmark: "",
      city: "",
      state: "",
      status: "UNTOUCHED",
      phone: "", // alias
      date: "",
      agent: "",
      mode: "",
    };
  }

  const couriers = [
    "Delhivery",
    "Bluedart",
    "Xpressbees",
    "Shadowfax",
    "Ecom Express",
    "DTDC",
    "India Post",
    "Professional Courier",
    "FedEx",
    "Aramex",
  ];

  async function fetchPostOffices(pin) {
    setLoadingPO(true);
    setPoError("");
    try {
      const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
      const json = await res.json();
      if (json?.[0]?.Status === "Success" && json[0].PostOffice?.length) {
        const names = json[0].PostOffice.map((p) => p.Name + (p.Division ? ` (${p.Division})` : ""));
        setPostOffices(names);
        // if only one, auto-select it
        if (names.length === 1) setForm((f) => ({ ...f, postOffice: names[0] }));
      } else {
        setPostOffices([]);
        setPoError("No post offices found for this PIN");
      }
    } catch (err) {
      setPostOffices([]);
      setPoError("Failed to lookup PIN");
    } finally {
      setLoadingPO(false);
    }
  }

  function updateField(name, value) {
    setForm((f) => ({ ...f, [name]: value }));
  }

  function validateAndSave() {
    // minimal validation
    if (!form.name?.trim()) return alert("Name is required");
    if (!form.mobile?.trim()) return alert("Mobile is required");
    // if adding new and no orderNo generate one
    const payload = { ...form };
    onSave(payload);
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-[860px] overflow-hidden">
        {/* header */}
        <div className="bg-slate-900 text-white px-6 py-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold">{form?.id ? "Update Order" : "Add Order"}</h3>
          <button onClick={onClose} className="text-white text-xl leading-none">✕</button>
        </div>

        {/* body */}
        <div className="p-5">
          <div className="grid grid-cols-2 gap-3">
            <input
              name="awb"
              value={form.awb || ""}
              onChange={(e) => updateField("awb", e.target.value)}
              placeholder="Tracking ID / AWB No."
              className="border p-2 rounded"
            />
            <input
              name="courierCompany"
              value={form.courierCompany || ""}
              onChange={(e) => updateField("courierCompany", e.target.value)}
              placeholder="Courier Company (free text)"
              className="border p-2 rounded"
            />

            <select
              name="courierMode"
              value={form.courierMode || ""}
              onChange={(e) => updateField("courierMode", e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">-- Courier Mode --</option>
              {couriers.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>

            <input
              name="mobile"
              value={form.mobile || ""}
              onChange={(e) => updateField("mobile", e.target.value)}
              placeholder="Mobile*"
              className="border p-2 rounded"
            />

            <input
              name="mobile2"
              value={form.mobile2 || ""}
              onChange={(e) => updateField("mobile2", e.target.value)}
              placeholder="Mobile Secondary"
              className="border p-2 rounded"
            />
            <input
              name="name"
              value={form.name || ""}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="Name*"
              className="border p-2 rounded"
            />

            <input
              name="product"
              value={form.product || ""}
              onChange={(e) => updateField("product", e.target.value)}
              placeholder="Product*"
              className="border p-2 rounded"
            />

            <input
              name="course"
              value={form.course || ""}
              onChange={(e) => updateField("course", e.target.value)}
              placeholder="Course*"
              className="border p-2 rounded"
            />

            <input
              name="offerPrice"
              value={form.offerPrice || ""}
              onChange={(e) => updateField("offerPrice", e.target.value)}
              placeholder="Offer Price*"
              className="border p-2 rounded"
            />

            <div className="flex gap-2">
              <input
                name="pincode"
                value={form.pincode || ""}
                onChange={(e) => updateField("pincode", e.target.value)}
                placeholder="PIN Code"
                className="border p-2 rounded w-1/2"
              />
              <select
                name="postOffice"
                value={form.postOffice || ""}
                onChange={(e) => updateField("postOffice", e.target.value)}
                className="border p-2 rounded w-1/2"
              >
                <option value="">{loadingPO ? "Loading post offices..." : "--Post Office--"}</option>
                {postOffices.map((po) => <option key={po} value={po}>{po}</option>)}
              </select>
            </div>

            <textarea
              name="address"
              value={form.address || ""}
              onChange={(e) => updateField("address", e.target.value)}
              placeholder="Address*"
              className="border p-2 rounded col-span-2"
            />

            <textarea
              name="remarks"
              value={form.remarks || ""}
              onChange={(e) => updateField("remarks", e.target.value)}
              placeholder="Remarks"
              className="border p-2 rounded col-span-2"
            />

            <input
              name="landmark"
              value={form.landmark || ""}
              onChange={(e) => updateField("landmark", e.target.value)}
              placeholder="Landmark"
              className="border p-2 rounded"
            />
            <input
              name="city"
              value={form.city || ""}
              onChange={(e) => updateField("city", e.target.value)}
              placeholder="City"
              className="border p-2 rounded"
            />
            <input
              name="state"
              value={form.state || ""}
              onChange={(e) => updateField("state", e.target.value)}
              placeholder="State"
              className="border p-2 rounded"
            />

            <select
              name="status"
              value={form.status || ""}
              onChange={(e) => updateField("status", e.target.value)}
              className="border p-2 rounded"
            >
              <option value="UNTOUCHED">UNTOUCHED</option>
              <option value="IN PROCESS">IN PROCESS</option>
              <option value="CALL BACK">CALL BACK</option>
              <option value="SHIPROCKET">SHIPROCKET</option>
              <option value="INDIA POST">INDIA POST</option>
              <option value="HOLD">HOLD</option>
              <option value="FAKE">FAKE</option>
              <option value="CONFIRM">CONFIRM</option>
              <option value="COMPLETE">COMPLETE</option>
              <option value="CANCEL">CANCEL</option>
              <option value="CALL CUT">CALL CUT</option>
              <option value="NOT PICKED">NOT PICKED</option>
            </select>
          </div>

          {poError && <p className="text-sm text-red-600 mt-2">{poError}</p>}
        </div>

        {/* footer */}
        <div className="px-5 py-4 border-t flex items-center justify-between">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                const phone = form.mobile || form.phone || "";
                if (!phone) return alert("Mobile missing");
                const text = encodeURIComponent(`Hello ${form.name || ""}, regarding order ${form.orderNo || ""}`);
                window.open(`https://wa.me/${phone.replace(/\D/g, "")}?text=${text}`, "_blank");
              }}
              className="bg-emerald-600 text-white px-3 py-2 rounded"
            >
              Send WhatsApp
            </button>
            <button
              type="button"
              onClick={() => {
                if (!form.mobile) return alert("Mobile missing");
                // open SMS client (basic)
                window.open(`sms:${form.mobile}`, "_self");
              }}
              className="bg-slate-700 text-white px-3 py-2 rounded"
            >
              SMS
            </button>
          </div>

          <div className="flex gap-3">
            <button onClick={validateAndSave} className="px-4 py-2 bg-green-600 text-white rounded">
              Submit
            </button>
            <button onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  function validateAndSave() {
    // simple validation
    if (!form.name?.trim()) return alert("Name required");
    if (!form.mobile?.trim()) return alert("Mobile required");
    // ensure orderNo exists for new orders
    if (!form.orderNo) {
      form.orderNo = "ME" + Date.now().toString().slice(-6);
    }
    onSave(form);
    onClose();
  }
}
