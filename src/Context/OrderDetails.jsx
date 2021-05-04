import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { pricePerItem } from "../constants";

//format number as currency
function formatCurrency(amount){
  return new Intl.NumberFormat('en-US',{
    style:"currency",
    currency: "USD",
    minimumFractionDigits:2
  }).format(amount)
}

const OrderDetails = createContext();

export function useOrderDetails() {
  const context = useContext(OrderDetails);
  if (!context)
    throw new Error("Component must be wrapped with OrderDetailsProvider");

  return context;
}

function calculateSubtotal(optionType, optionCounts) {
  let optionCount = 0;
  optionCounts[optionType].forEach(count=>{
    optionCount += count;
  })
  const subtotal = optionCount * pricePerItem[optionType];
  return subtotal
}

export function OrderDetailsProvider(props) {
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });
  const zeroCurrency = formatCurrency(0)
  const [totals, setTotals] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency,
  });
  
  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal("scoops", optionCounts);
    const toppingsSubtotal = calculateSubtotal("toppings", optionCounts);
    const grandTotal = scoopsSubtotal + toppingsSubtotal;
    setTotals({
      scoops: formatCurrency(scoopsSubtotal),
      toppings: formatCurrency(toppingsSubtotal),
      grandTotal:formatCurrency(grandTotal),
    });
  }, [optionCounts]);

  const value = useMemo(() => {
    function updateItemCount(itemName, newItemCount, optionType) {
      const newOptionCounts = { ...optionCounts };
      const optionCountsMap = newOptionCounts[optionType];
        optionCountsMap.set(itemName, parseInt(newItemCount));
      setOptionCounts(newOptionCounts);
    }
    //getter: Object contianing options counts for scooping and topping, subtotal and total
    //setter: update option counts
    return [{ ...optionCounts,totals },updateItemCount];
  }, [optionCounts,totals]);
  return <OrderDetails.Provider value={value} {...props} />;
}
