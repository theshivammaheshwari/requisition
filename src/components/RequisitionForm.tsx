import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import ItemTable from './ItemTable.tsx';
import { Printer } from 'lucide-react';

const departments = [
  "CSE",
  "CCE",
  "ECE",
  "MME",
  "Physics",
  "Mathematics",
  "Humanities and Social Sciences",
  "Registrar",
  "Finance",
  "Others"
];

interface FormData {
  date: string;
  items: Array<{
    id: number;
    particulars: string;
    qty: string;
    estimatedCost: string;
    remarks: string;
  }>;
  recommendedBy: string;
  nameOfIndenter: string;
  department: string;
  customDepartment: string;
  alternativeExplored: string;
  expenditureBudgeted: string;
  stockCheckedDepartment: string;
  stockCheckedStore: string;
  adminApproved: boolean;
  adminNotApproved: boolean;
  committeesRemarks: string;
  uniqueBudgetCode: string;
  budget: string;
  budgetConsumed: string;
  balanceBudget: string;
  financeOfficerSignature: string;
  estateOfficerSignature: string;
}

const RequisitionForm: React.FC = () => {
  const { toast } = useToast();
  const today = new Date().toISOString().split('T')[0];
  const [isPrinted, setIsPrinted] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    date: today,
    items: [{ id: 1, particulars: '', qty: '', estimatedCost: '', remarks: '' }],
    recommendedBy: '',
    nameOfIndenter: '',
    department: '',
    customDepartment: '',
    alternativeExplored: '',
    expenditureBudgeted: '',
    stockCheckedDepartment: '',
    stockCheckedStore: '',
    adminApproved: false,
    adminNotApproved: false,
    committeesRemarks: '',
    uniqueBudgetCode: '',
    budget: '',
    budgetConsumed: '',
    balanceBudget: '',
    financeOfficerSignature: '',
    estateOfficerSignature: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleDepartmentChange = (value: string) => {
    setFormData({
      ...formData,
      department: value,
      customDepartment: ''
    });
  };

  const handlePrint = () => {
    setIsPrinted(true);
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto p-2 print:p-0">
      <form className="space-y-0.5 print:space-y-0">
        <Card className="border-2 border-gray-200 shadow-sm print:shadow-none print:border-0">
          <CardHeader className="border-b py-2 flex flex-row justify-between items-center flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <img 
                src="https://raw.githubusercontent.com/theshivammaheshwari/rform/main/LNMIIT.png" 
                alt="LNMIIT Logo" 
                className="h-12 w-auto"
              />
            </div>
            <div className="text-center">
              <h1 className="text-xl font-bold">Requisition Slip</h1>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2">
                <Label htmlFor="date" className="font-semibold">Date:</Label>
                <Input 
                  id="date" 
                  name="date"
                  type="date" 
                  value={formData.date} 
                  onChange={handleChange} 
                  className="w-40 border-2 border-black"
                />
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-1 space-y-0.5 card-content">
            <div className="space-y-0">
              <div className="flex gap-1 items-start">
                <div className="flex-1">
                  <p className="font-semibold">To: The Director</p>
                  <p>Dear Sir/Madam,</p>
                </div>
              </div>
            </div>

            <div className="border-t border-b py-1">
              <p className="font-medium text-sm">I/We require the following item/service, details are given as under:</p>
            </div>

            <ItemTable 
              items={formData.items} 
              setItems={(items) => setFormData({...formData, items})} 
            />

            <div className="flex items-center gap-4 border-t pt-1">
              <div className="flex-1">
                <Label htmlFor="recommendedBy" className="font-semibold text-sm">Recommended by:</Label>
                <Input 
                  id="recommendedBy" 
                  name="recommendedBy"
                  value={formData.recommendedBy} 
                  onChange={handleChange} 
                  className="border-2 border-black h-8"
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="nameOfIndenter" className="font-semibold text-sm">Name of Indenter:</Label>
                <Input 
                  id="nameOfIndenter" 
                  name="nameOfIndenter"
                  value={formData.nameOfIndenter} 
                  onChange={handleChange} 
                  className="border-2 border-black h-8"
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="department" className="font-semibold text-sm">Department:</Label>
                <div className="print:hidden">
                  <Select value={formData.department} onValueChange={handleDepartmentChange}>
                    <SelectTrigger className="border-2 border-black h-8">
                      <SelectValue placeholder="Select Department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="hidden print:block">
                  <Input
                    value={formData.department === "Others" ? formData.customDepartment : formData.department}
                    className="border-2 border-black h-8"
                    readOnly
                  />
                </div>
                {formData.department === "Others" && (
                  <Input
                    placeholder="Enter Department Name"
                    value={formData.customDepartment}
                    onChange={(e) => setFormData({...formData, customDepartment: e.target.value})}
                    className="mt-1 border-2 border-black h-8"
                  />
                )}
              </div>
            </div>

            <div className="border bg-gray-50 p-1.5 rounded-lg text-xs">
              <h3 className="font-semibold mb-0.5">Declaration by the indenter (if the requisition amount is less than or equal to ₹25,000/-):</h3>
              <p className="italic text-xs">
                "I/We am/are personally/jointly satisfied that these goods/services are of the requisite quality and specification and have been procured from a reliable supplier at a reasonable price."
              </p>
              <div className="mt-1 text-right">
                <p className="font-semibold text-xs">Signature (Indenter/s):</p>
                <div className="border-b border-dashed border-black w-32 h-4 inline-block"></div>
              </div>
            </div>

            <div className="border-t pt-1">
              <h3 className="font-semibold mb-0.5 text-sm">Remarks (Mention Yes/No):</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                <div className="flex items-center gap-2">
                  <Label htmlFor="alternativeExplored" className="text-xs flex-1">Alternative / Lower Cost product explored:</Label>
                  <Input
                    id="alternativeExplored"
                    name="alternativeExplored"
                    value={formData.alternativeExplored}
                    onChange={handleChange}
                    placeholder="Yes/No"
                    className="w-20 h-8 border-2 border-black text-center"
                    readOnly={!isPrinted}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="expenditureBudgeted" className="text-xs flex-1">Expenditure Budgeted - Checked by Finance Dept.:</Label>
                  <Input
                    id="expenditureBudgeted"
                    name="expenditureBudgeted"
                    value={formData.expenditureBudgeted}
                    onChange={handleChange}
                    placeholder="Yes/No"
                    className="w-20 h-8 border-2 border-black text-center"
                    readOnly={!isPrinted}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="stockCheckedDepartment" className="text-xs flex-1">Existing Stock position checked (Department):</Label>
                  <Input
                    id="stockCheckedDepartment"
                    name="stockCheckedDepartment"
                    value={formData.stockCheckedDepartment}
                    onChange={handleChange}
                    placeholder="Yes/No"
                    className="w-20 h-8 border-2 border-black text-center"
                    readOnly={!isPrinted}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="stockCheckedStore" className="text-xs flex-1">Existing Stock position checked (Store):</Label>
                  <Input
                    id="stockCheckedStore"
                    name="stockCheckedStore"
                    value={formData.stockCheckedStore}
                    onChange={handleChange}
                    placeholder="Yes/No"
                    className="w-20 h-8 border-2 border-black text-center"
                    readOnly={!isPrinted}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 border-t pt-1">
              <div className="flex-1">
                <Label htmlFor="financeOfficerSignature" className="font-semibold text-sm">Finance Officer Signature:</Label>
                <div className="border-b border-dashed border-black w-full h-8"></div>
              </div>
              <div className="flex-1">
                <Label htmlFor="estateOfficerSignature" className="font-semibold text-sm">Estate Officer / LUCS Signature:</Label>
                <div className="border-b border-dashed border-black w-full h-8"></div>
                <p className="text-xs text-gray-500 italic">(Not required for service work)</p>
              </div>
            </div>

            <div className="space-y-0.5 border-t pt-1">
              <Label htmlFor="adminApproval" className="font-semibold text-sm">Administrative approval of Director/HOD/HOS/Center Lead:</Label>
              <div className="flex space-x-6">
                <div className="flex items-center space-x-2">
                  <span className="text-sm">Approved:</span>
                  <div className="w-4 h-4 border border-black"></div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm">Not-approved:</span>
                  <div className="w-4 h-4 border border-black"></div>
                </div>
              </div>
              <div className="border-b border-dashed border-black w-full h-4"></div>
            </div>

            <div className="space-y-0.5 border-t pt-1">
              <Label htmlFor="committeesRemarks" className="font-semibold text-sm">Purchase & Condemnation Committee's Remarks:</Label>
              <div className="border-2 border-black min-h-12 rounded-md committee-remarks"></div>
            </div>

            <div className="border-t pt-1">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-1 text-xs">
                <div>
                  <Label htmlFor="uniqueBudgetCode" className="font-semibold">Unique Budget Code:</Label>
                  <Input 
                    id="uniqueBudgetCode" 
                    name="uniqueBudgetCode"
                    value={formData.uniqueBudgetCode} 
                    onChange={handleChange} 
                    className="border-2 border-black h-6 text-xs"
                  />
                </div>
                <div>
                  <Label htmlFor="budget" className="font-semibold">Budget:</Label>
                  <Input 
                    id="budget" 
                    name="budget"
                    value={formData.budget} 
                    onChange={handleChange} 
                    className="border-2 border-black h-6 text-xs"
                  />
                </div>
                <div>
                  <Label htmlFor="budgetConsumed" className="font-semibold">Budget Consumed:</Label>
                  <Input 
                    id="budgetConsumed" 
                    name="budgetConsumed"
                    value={formData.budgetConsumed} 
                    onChange={handleChange} 
                    className="border-2 border-black h-6 text-xs"
                  />
                </div>
                <div>
                  <Label htmlFor="balanceBudget" className="font-semibold">Balance Budget:</Label>
                  <Input 
                    id="balanceBudget" 
                    name="balanceBudget"
                    value={formData.balanceBudget} 
                    onChange={handleChange} 
                    className="border-2 border-black h-6 text-xs"
                  />
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-center border-t pt-2 print:hidden">
            <Button variant="outline" type="button" onClick={handlePrint} className="gap-2">
              <Printer className="h-4 w-4" /> Print Form
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default RequisitionForm;