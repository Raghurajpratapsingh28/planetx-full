"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { FaSearch } from "react-icons/fa";
import { BiTargetLock } from "react-icons/bi";
import { useRouter, useSearchParams } from "next/navigation";

export const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize states with sidebar filter values if available
  const [activeBox, setActiveBox] = useState("Residential");
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "0");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "10000000");
  const [propertyType, setPropertyType] = useState(searchParams.get("propertyType") || "For Sale");
  const [category, setCategory] = useState(searchParams.get("category") || "Residential");

  // Define allowed categories and property types
  const categories = [
    "Residential",
    "Pg",
    "Hotel",
    "Office",
    "Shop",
    "Warehouse",
    "Shared Warehouse",
    "EventSpace", // Kept as provided; change to "EventSpace" if typo
  ];
  const propertyTypes = ["For Sale", "For Rent", "Commercial"];

  // Map categories to their display labels and URL values
  const categoryLabels = {
    Residential: { display: "Residential", url: "Residential" },
    Pg: { display: "Paying Guest", url: "Pg" },
    Hotel: { display: "Hotels", url: "Hotel" },
    Office: { display: "Office", url: "Office" },
    Shop: { display: "Shop", url: "Shop" },
    Warehouse: { display: "Warehouse", url: "Warehouse" },
    "Shared Warehouse": { display: "Shared Warehouse", url: "Shared Warehouse" },
    EventSpace: { display: "Event Space", url: "EventSpace" },
  };

  const handleSearch = () => {
    // Ensure category and propertyType are valid
    if (!categories.includes(category) || !propertyTypes.includes(propertyType)) {
      console.error("Invalid category or property type");
      return;
    }

    // Construct query parameters with category before propertyType
    const queryParams = new URLSearchParams();
    queryParams.append("minPrice", minPrice);
    queryParams.append("maxPrice", maxPrice);
    queryParams.append("category", categoryLabels[category].url);
    queryParams.append("propertyType", propertyType);
    if (searchQuery) {
      queryParams.append("search", searchQuery);
    }

    router.push(`/show-property?${queryParams.toString()}`);
  };

  return (
    <div className="p-4 sm:p-6 bg-transparent">
      <div className="flex flex-wrap gap-2 sm:gap-4 mb-4 sm:mb-6 relative justify-center">
        {categories.map((cat) => (
          <div key={cat} className="relative">
            <Button
              variant="outline"
              className={`p-3 sm:p-4 rounded-md border-none text-xs sm:text-sm ${
                activeBox === cat
                  ? "bg-[#7B00FF] text-white hover:bg-[#7B00FF]"
                  : "bg-white text-[#6C696A] hover:bg-purple-800"
              }`}
              onClick={() => {
                setActiveBox(cat);
                setCategory(cat);
              }}
            >
              {categoryLabels[cat].display}
            </Button>
            {activeBox === cat && (
              <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 w-8 sm:w-10 h-2 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#7B00FF]" />
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 bg-white py-2 sm:py-3 px-3 sm:px-5 rounded-lg">
        <Select
          onValueChange={(value) => {
            setPropertyType(value);
          }}
        >
          <SelectTrigger className="w-full sm:w-40 md:w-48 border border-gray-300 bg-transparent text-xs sm:text-sm">
            <SelectValue placeholder={propertyTypes[0]} />
          </SelectTrigger>
          <SelectContent>
            {propertyTypes.map((type, index) => (
              <SelectItem key={index} value={type} className="text-xs sm:text-sm">
                {type === "For Sale" ? "Sale" : type === "For Rent" ? "Rent" : "Commercial"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="relative flex-1 w-full">
          <input
            type="text"
            placeholder="       Search area, city"
            className="w-full p-2 pr-14 sm:pr-16 border border-gray-300 rounded-md text-xs sm:text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="absolute text-stone-300 top-[10px] sm:top-[12px] left-[10px]" />
          <Button
            variant="outline"
            className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 bg-transparent border-none hover:bg-transparent text-[#7B00FF] text-xs sm:text-sm"
            onClick={() => router.push("#NearbyProperty")}
          >
            Near Me
            <BiTargetLock className="text-[20px] sm:text-[25px]" />
          </Button>
        </div>

        <Button
          variant="default"
          className="w-full sm:w-auto bg-[#7B00FF] text-white text-xs sm:text-sm px-4 sm:px-6 py-2"
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>
    </div>
  );
};