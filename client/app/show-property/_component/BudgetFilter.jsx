import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const BudgetFilter = () => {
  const [minBudget, setMinBudget] = useState(0);
  const [maxBudget, setMaxBudget] = useState(10000000);
  const [sliderValue, setSliderValue] = useState(10000000);
  const router = useRouter();
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    query.set("minPrice", minBudget);
    query.set("maxPrice", maxBudget);
    router.push(`${window.location.pathname}?${query.toString()}`, {
      scroll: false,
    });
  }, [minBudget, maxBudget]);

  const handleSliderChange = (value) => {
    setSliderValue(value);
    setMaxBudget(value);
  };

  return (
    <Collapsible defaultOpen>
      <CollapsibleTrigger className="flex items-center justify-between w-full">
        <h3 className="font-medium">Budget</h3>
        <ChevronDown className="h-4 w-4" />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-4 pt-4">
        <p className="text-sm">
          ₹ {minBudget} to ₹ {maxBudget}
        </p>
        <div className="flex gap-4">
          <Select onValueChange={(value) => setMinBudget(Number(value))}>
            <SelectTrigger>
              <SelectValue placeholder="Min Budget" />
            </SelectTrigger>
            <SelectContent>
              {[0, 500000, 1000000, 1500000, 2000000,2500000,3000000,3500000,4000000].map((value) => (
                <SelectItem key={value} value={value.toString()}>
                  ₹ {value}L
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => setMaxBudget(Number(value))}>
            <SelectTrigger>
              <SelectValue placeholder="Max Budget" />
            </SelectTrigger>
            <SelectContent>
              {[minBudget,500000, 1000000, 1500000, 2000000,2500000,3000000,3500000,4000000,4500000,5000000,5500000,6000000,6500000,7000000,7500000,8500000,9000000,9500000,10000000]
                .filter((value) => value >= minBudget)
                .map((value) => (
                  <SelectItem key={value} value={value.toString()}>
                    ₹ {value}L
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        <Slider
          value={[sliderValue]}
          onValueChange={(value) => handleSliderChange(value[0])}
          min={0}
          max={10000000}
          step={1}
          className="w-full"
        />
      </CollapsibleContent>
    </Collapsible>
  );
};

export default BudgetFilter;
