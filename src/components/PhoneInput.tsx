"use client";

import { useState } from "react";

interface Country {
  code: string;
  dial: string;
  name: string;
}

const COUNTRIES: Country[] = [
  { code: "IN", dial: "+91", name: "India" },
  { code: "US", dial: "+1", name: "United States" },
  { code: "GB", dial: "+44", name: "United Kingdom" },
  { code: "CA", dial: "+1", name: "Canada" },
  { code: "AU", dial: "+61", name: "Australia" },
  { code: "DE", dial: "+49", name: "Germany" },
  { code: "FR", dial: "+33", name: "France" },
  { code: "IT", dial: "+39", name: "Italy" },
  { code: "ES", dial: "+34", name: "Spain" },
  { code: "NL", dial: "+31", name: "Netherlands" },
  { code: "BE", dial: "+32", name: "Belgium" },
  { code: "CH", dial: "+41", name: "Switzerland" },
  { code: "SE", dial: "+46", name: "Sweden" },
  { code: "NO", dial: "+47", name: "Norway" },
  { code: "DK", dial: "+45", name: "Denmark" },
  { code: "FI", dial: "+358", name: "Finland" },
  { code: "IE", dial: "+353", name: "Ireland" },
  { code: "PT", dial: "+351", name: "Portugal" },
  { code: "AT", dial: "+43", name: "Austria" },
  { code: "PL", dial: "+48", name: "Poland" },
  { code: "JP", dial: "+81", name: "Japan" },
  { code: "KR", dial: "+82", name: "South Korea" },
  { code: "CN", dial: "+86", name: "China" },
  { code: "HK", dial: "+852", name: "Hong Kong" },
  { code: "TW", dial: "+886", name: "Taiwan" },
  { code: "SG", dial: "+65", name: "Singapore" },
  { code: "MY", dial: "+60", name: "Malaysia" },
  { code: "ID", dial: "+62", name: "Indonesia" },
  { code: "TH", dial: "+66", name: "Thailand" },
  { code: "VN", dial: "+84", name: "Vietnam" },
  { code: "PH", dial: "+63", name: "Philippines" },
  { code: "BD", dial: "+880", name: "Bangladesh" },
  { code: "PK", dial: "+92", name: "Pakistan" },
  { code: "LK", dial: "+94", name: "Sri Lanka" },
  { code: "AE", dial: "+971", name: "UAE" },
  { code: "SA", dial: "+966", name: "Saudi Arabia" },
  { code: "QA", dial: "+974", name: "Qatar" },
  { code: "KW", dial: "+965", name: "Kuwait" },
  { code: "BH", dial: "+973", name: "Bahrain" },
  { code: "OM", dial: "+968", name: "Oman" },
  { code: "IL", dial: "+972", name: "Israel" },
  { code: "TR", dial: "+90", name: "Turkey" },
  { code: "EG", dial: "+20", name: "Egypt" },
  { code: "ZA", dial: "+27", name: "South Africa" },
  { code: "NG", dial: "+234", name: "Nigeria" },
  { code: "KE", dial: "+254", name: "Kenya" },
  { code: "BR", dial: "+55", name: "Brazil" },
  { code: "MX", dial: "+52", name: "Mexico" },
  { code: "AR", dial: "+54", name: "Argentina" },
  { code: "CL", dial: "+56", name: "Chile" },
  { code: "CO", dial: "+57", name: "Colombia" },
  { code: "NZ", dial: "+64", name: "New Zealand" },
];

interface PhoneInputProps {
  name?: string;
  value?: string;
  onChange?: (val: string) => void;
  placeholder?: string;
  defaultDial?: string;
  inputClassName?: string;
  inputStyle?: React.CSSProperties;
}

const PhoneInput = ({
  name,
  onChange,
  placeholder = "555 123 4567",
  defaultDial = "+91",
  inputClassName = "",
  inputStyle,
}: PhoneInputProps) => {
  const [dial, setDial] = useState(defaultDial);
  const [num, setNum] = useState("");

  const combined = num ? `${dial} ${num}` : "";

  const handleNumChange = (val: string) => {
    setNum(val);
    onChange?.(val ? `${dial} ${val}` : "");
  };

  const handleDialChange = (val: string) => {
    setDial(val);
    onChange?.(num ? `${val} ${num}` : "");
  };

  return (
    <div className="flex gap-2">
      <select
        value={dial}
        onChange={(e) => handleDialChange(e.target.value)}
        className={`w-[5.5rem] shrink-0 px-2 py-2.5 rounded-lg text-sm text-foreground outline-none focus:ring-1 focus:ring-primary/50 transition-all cursor-pointer ${inputClassName}`}
        style={inputStyle}
        aria-label="Country dial code"
        title={COUNTRIES.find((c) => c.dial === dial)?.name || ""}
      >
        {COUNTRIES.map((c) => (
          <option key={c.code} value={c.dial} style={{ background: "hsl(230 20% 10%)", color: "white" }}>
            {c.dial} {c.code}
          </option>
        ))}
      </select>
      <input
        type="tel"
        value={num}
        onChange={(e) => handleNumChange(e.target.value)}
        placeholder={placeholder}
        className={`flex-1 min-w-0 px-3.5 py-2.5 rounded-lg text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:ring-1 focus:ring-primary/50 transition-all ${inputClassName}`}
        style={inputStyle}
      />
      {name && <input type="hidden" name={name} value={combined} />}
    </div>
  );
};

export default PhoneInput;
