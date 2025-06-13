import { useEffect, useState } from "react";
import { SelectField } from "./SelectField";
import { z } from "zod"; 

const countries = [
  { code: "US", name: "United States", dialCode: "+1", flag: "https://flagcdn.com/w40/us.png", format: "(###) ###-####" },
  { code: "CA", name: "Canada", dialCode: "+1", flag: "https://flagcdn.com/w40/ca.png", format: "(###) ###-####" },
  { code: "GB", name: "United Kingdom", dialCode: "+44", flag: "https://flagcdn.com/w40/gb.png", format: "#### ### ####" },
  { code: "KE", name: "Kenya", dialCode: "+254", flag: "https://flagcdn.com/w40/ke.png", format: "### ### ###" },
  { code: "NG", name: "Nigeria", dialCode: "+234", flag: "https://flagcdn.com/w40/ng.png", format: "### ### ####" },
  { code: "ZA", name: "South Africa", dialCode: "+27", flag: "https://flagcdn.com/w40/za.png", format: "## ### ####" },
  { code: "IN", name: "India", dialCode: "+91", flag: "https://flagcdn.com/w40/in.png", format: "##### #####" },
  { code: "AU", name: "Australia", dialCode: "+61", flag: "https://flagcdn.com/w40/au.png", format: "### ### ###" },
  { code: "DE", name: "Germany", dialCode: "+49", flag: "https://flagcdn.com/w40/de.png", format: "### ########" },
  { code: "FR", name: "France", dialCode: "+33", flag: "https://flagcdn.com/w40/fr.png", format: "# ## ## ## ##" },
  { code: "BR", name: "Brazil", dialCode: "+55", flag: "https://flagcdn.com/w40/br.png", format: "(##) #####-####" },
  { code: "MX", name: "Mexico", dialCode: "+52", flag: "https://flagcdn.com/w40/mx.png", format: "### ### ####" },
  { code: "JP", name: "Japan", dialCode: "+81", flag: "https://flagcdn.com/w40/jp.png", format: "###-####-####" },
  { code: "CN", name: "China", dialCode: "+86", flag: "https://flagcdn.com/w40/cn.png", format: "### #### ####" },
  { code: "EG", name: "Egypt", dialCode: "+20", flag: "https://flagcdn.com/w40/eg.png", format: "### ### ####" },
  { code: "UG", name: "Uganda", dialCode: "+256", flag: "https://flagcdn.com/w40/ug.png", format: "### ### ###" },
  { code: "TZ", name: "Tanzania", dialCode: "+255", flag: "https://flagcdn.com/w40/tz.png", format: "### ### ###" },
  { code: "RW", name: "Rwanda", dialCode: "+250", flag: "https://flagcdn.com/w40/rw.png", format: "### ### ###" },
  { code: "GH", name: "Ghana", dialCode: "+233", flag: "https://flagcdn.com/w40/gh.png", format: "### ### ####" },
  { code: "ET", name: "Ethiopia", dialCode: "+251", flag: "https://flagcdn.com/w40/et.png", format: "### ### ####" }
];

// Transform countries into react-select format
const countryOptions = countries.map(country => ({
  value: country.code,
  label: (
    <div className="flex items-center gap-2">
      <img
        src={country.flag}
        alt={`${country.name} flag`}
        className="w-5 h-4 object-cover rounded-sm"
      />
      <span className="text-sm text-gray-700 ml-auto">{country.dialCode}</span>
    </div>
  ),
  searchLabel: `${country.name} ${country.dialCode}`, // For search functionality
  country: country
}));


// Define Zod schema
const phoneNumberSchema = z.object({
  phone_number: z
    .string()
    .regex(/^\+\d{7,15}$/, {
      message: "Phone number must start with '+' and contain 7 to 15 digits.",
    })
});

export const PhoneInput = ({
  label = "Phone Number",
  name = "phone_number",
  value = "",
  onChange,
  required = false,
  disabled = false,
  error = "",
  className = "",
  defaultCountry = "KE"
}) => {
  const [selectedCountry, setSelectedCountry] = useState(
    countries.find(c => c.code === defaultCountry) || countries[2]
  );
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    if (value && value !== `${selectedCountry.dialCode}${phoneNumber}`) {
      const country = countries.find(c => value.startsWith(c.dialCode));
      if (country) {
        setSelectedCountry(country);
        setPhoneNumber(value.substring(country.dialCode.length));
      } else {
        setPhoneNumber(value.replace(/^\+/, ""));
      }
    }
  }, [value]);

  const formatPhoneNumber = (number, format) => {
    const cleaned = number.replace(/\D/g, "");
    let formatted = "";
    let numberIndex = 0;

    for (let i = 0; i < format.length && numberIndex < cleaned.length; i++) {
      if (format[i] === "#") {
        formatted += cleaned[numberIndex];
        numberIndex++;
      } else {
        formatted += format[i];
      }
    }

    return formatted;
  };

  const handlePhoneChange = (e) => {
    const input = e.target.value;
    const cleaned = input.replace(/\D/g, "");

    setPhoneNumber(cleaned);

    const fullNumber = `${selectedCountry.dialCode}${cleaned}`;
    if (onChange) {
      onChange({
        target: {
          name: name,
          value: fullNumber
        }
      });
    }
  };

  const handleCountryChange = (selectedOption) => {
    const country = selectedOption.country;
    setSelectedCountry(country);

    const fullNumber = `${country.dialCode}${phoneNumber}`;
    if (onChange) {
      onChange({
        target: {
          name: name,
          value: fullNumber
        }
      });
    }
  };

  // ✅ Zod-based validation
  const validatePhoneNumber = (number) => {
    const fullNumber = `${selectedCountry.dialCode}${number.replace(/\D/g, "")}`;
    const result = phoneNumberSchema.safeParse({ phone_number: fullNumber });
    return {
      isValid: result.success,
      error: result.success ? "" : result.error.issues[0].message
    };
  };

  const { isValid, error: validationError } = validatePhoneNumber(phoneNumber);
  const displayNumber = phoneNumber ? formatPhoneNumber(phoneNumber, selectedCountry.format) : "";
  const currentCountryOption = countryOptions.find(option => option.value === selectedCountry.code);

  return (
    <div className={`w-full flex flex-col mb-4 ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="flex gap-2">
        <div className="w-max">
          <SelectField
            options={countryOptions}
            value={currentCountryOption}
            onChange={handleCountryChange}
            placeholder="Select country..."
            isDisabled={disabled}
            isSearchable={true}
            filterOption={(option, inputValue) =>
              option.data.searchLabel.toLowerCase().includes(inputValue.toLowerCase())
            }
          />
        </div>

        <div className="flex-1">
          <input
            id={name}
            name={name}
            type="tel"
            value={displayNumber}
            onChange={handlePhoneChange}
            required={required}
            disabled={disabled}
            placeholder="712 121 212"
            className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed ${
              error ? "border-red-500" : ""
            }`}
            style={{ minHeight: "2.75rem" }}
          />
        </div>
      </div>

      <div className="mt-1">
        {phoneNumber && !isValid && !error && (
          <p className="text-red-500 text-sm">{validationError}</p>
        )}
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </div>
  );
};
