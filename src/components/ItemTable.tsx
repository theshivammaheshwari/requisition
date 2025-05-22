import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash } from "lucide-react";

interface Item {
  id: number;
  particulars: string;
  qty: string;
  estimatedCost: string;
  remarks: string;
}

interface ItemTableProps {
  items: Item[];
  setItems: (items: Item[]) => void;
}

const ItemTable: React.FC<ItemTableProps> = ({ items, setItems }) => {
  const handleChange = (id: number, field: keyof Item, value: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const calculateTotal = () => {
    return items
      .reduce((sum, item) => {
        const cost = parseFloat(item.estimatedCost) || 0;
        const qty = parseFloat(item.qty) || 0;
        return sum + (cost * qty);
      }, 0)
      .toFixed(2);
  };

  const addItem = () => {
    const newId = Math.max(0, ...items.map((item) => item.id)) + 1;
    setItems([...items, { id: newId, particulars: '', qty: '', estimatedCost: '', remarks: '' }]);
  };

  const removeItem = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="space-y-1">
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-8 text-center text-xs p-1">S.No</TableHead>
              <TableHead className="w-1/3 text-xs p-1">Particulars</TableHead>
              <TableHead className="w-16 text-center text-xs p-1">Qty.</TableHead>
              <TableHead className="text-center text-xs p-1">Per Item Est. Cost (₹)</TableHead>
              <TableHead className="text-xs p-1">Remarks</TableHead>
              <TableHead className="w-8 print:hidden p-1"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell className="text-center font-medium p-1">{index + 1}</TableCell>
                <TableCell className="p-1">
                  <Input
                    value={item.particulars}
                    onChange={(e) => handleChange(item.id, 'particulars', e.target.value)}
                    className="border-2 border-black focus-visible:ring-0 h-7"
                    placeholder="Item details"
                  />
                </TableCell>
                <TableCell className="p-1">
                  <Input
                    value={item.qty}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '');
                      handleChange(item.id, 'qty', value);
                    }}
                    className="border-2 border-black focus-visible:ring-0 text-center h-7"
                    inputMode="numeric"
                    pattern="[0-9]*"
                  />
                </TableCell>
                <TableCell className="p-1">
                  <Input
                    value={item.estimatedCost}
                    onChange={(e) => handleChange(item.id, 'estimatedCost', e.target.value)}
                    className="border-2 border-black focus-visible:ring-0 text-center h-7"
                    type="number"
                    min="0"
                    step="0.01"
                  />
                </TableCell>
                <TableCell className="p-1">
                  <Input
                    value={item.remarks}
                    onChange={(e) => handleChange(item.id, 'remarks', e.target.value)}
                    className="border-2 border-black focus-visible:ring-0 h-7"
                    placeholder="Any remarks"
                  />
                </TableCell>
                <TableCell className="p-0 print:hidden">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 print:hidden"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash className="h-3 w-3 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={2} className="text-right font-bold p-1">
                TOTAL
              </TableCell>
              <TableCell className="text-center font-medium p-1">
                {items.reduce((sum, item) => sum + (parseInt(item.qty) || 0), 0)}
              </TableCell>
              <TableCell className="text-center font-bold p-1">
                ₹{calculateTotal()}
              </TableCell>
              <TableCell colSpan={2}></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="mt-1 print:hidden"
        onClick={addItem}
      >
        <PlusCircle className="h-4 w-4 mr-2" /> Add Item
      </Button>
    </div>
  );
};

export default ItemTable;