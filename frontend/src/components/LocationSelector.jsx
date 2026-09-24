import { useMemo } from "react";
import { MapPin } from "lucide-react";
import { locations } from "../data/mockData";

export default function LocationSelector({
  selected,
  setSelected,
}) {
  const districtOptions = useMemo(() => {
    return locations.districts[selected.state] || [];
  }, [selected.state]);

  const blockOptions = useMemo(() => {
    return locations.blocks[selected.district] || [];
  }, [selected.district]);

  const panchayatOptions = useMemo(() => {
    return locations.panchayats[selected.block] || [];
  }, [selected.block]);

  const updateState = (value) => {
    const nextDistrict = locations.districts[value]?.[0] || "";
    const nextBlock = locations.blocks[nextDistrict]?.[0] || "";
    const nextPanchayat =
      locations.panchayats[nextBlock]?.[0] || "";

    setSelected({
      state: value,
      district: nextDistrict,
      block: nextBlock,
      panchayat: nextPanchayat,
    });
  };

  const updateDistrict = (value) => {
    const nextBlock = locations.blocks[value]?.[0] || "";
    const nextPanchayat =
      locations.panchayats[nextBlock]?.[0] || "";

    setSelected({
      ...selected,
      district: value,
      block: nextBlock,
      panchayat: nextPanchayat,
    });
  };

  const updateBlock = (value) => {
    const nextPanchayat =
      locations.panchayats[value]?.[0] || "";

    setSelected({
      ...selected,
      block: value,
      panchayat: nextPanchayat,
    });
  };

  return (
    <section className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-3 sm:grid-cols-2 xl:grid-cols-4">
      <Selector
        label="State"
        value={selected.state}
        options={locations.states}
        onChange={updateState}
      />

      <Selector
        label="District"
        value={selected.district}
        options={districtOptions}
        onChange={updateDistrict}
      />

      <Selector
        label="Block"
        value={selected.block}
        options={blockOptions}
        onChange={updateBlock}
      />

      <Selector
        label="Panchayat"
        value={selected.panchayat}
        options={panchayatOptions}
        onChange={(value) =>
          setSelected({
            ...selected,
            panchayat: value,
          })
        }
      />
    </section>
  );
}

function Selector({
  label,
  value,
  options,
  onChange,
}) {
  return (
    <div>
      <label className="mb-1.5 flex items-center gap-1 text-[11px] font-medium text-slate-500">
        {label === "Panchayat" && (
          <MapPin className="h-3 w-3" />
        )}

        {label}
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 outline-none transition focus:border-emerald-400"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}