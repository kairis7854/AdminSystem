import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addComputer, updateComputer } from '../../../store/modules/productStore.jsx'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export function ComputerDialog({ isOpen, setIsOpen, computerData, onDelete }) {
    const [form, setForm] = useState(
        {
            id: '',
            name: "",
            brand: "",
            price: 0,
            image: ''
        }
    )
    const dispatch = useDispatch()

    useEffect(() => {
        if (computerData?.type === 'edit' && computerData.data) {
            setForm(computerData.data);
        } else if (computerData?.type === 'add') {
            setForm({ id: "", name: "", brand: "", price: "", image: "" });
        }
    }, [computerData]);

    const onSave = (e) => {
        e.preventDefault()
        if (computerData.type === 'add') {
            dispatch(addComputer({ ...form, id: crypto.randomUUID() }));
            toast.success('新增成功')
        } else if (computerData.type === 'edit') {
            dispatch(updateComputer(form));
            toast.success('修改成功')
        }
        setIsOpen(false);
    };

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                {/* 標題˙ */}
                <DialogHeader className="mb-[20px]">
                    <DialogTitle className="text-[18px]">{computerData?.type === 'add' ? '新增' : '編輯'}商品</DialogTitle>
                </DialogHeader>
                <DialogDescription className="sr-only">
                    {computerData?.type === 'add' ? '新增商品資訊表單' : '編輯商品資訊表單'}
                </DialogDescription>

                <form className="p-[20px]" onSubmit={onSave} autoComplete="off">
                    {/* input框 */}
                    <div className="flex justify-center items-center  mb-[20px]">
                        <label className="w-[120px] aspect-square border-2 border-dashed border-[#d9d9d9] rounded-[8px] flex flex-col items-center justify-center cursor-not-allowed hover:border-[#1DA57A] hover:bg-[#f6ffed] transition-all overflow-hidden group">
                            {form.image ? (
                                <img src={form.image} className="w-full h-full object-cover" alt="preview" />
                            ) : (
                                <div className="flex flex-col items-center justify-center">
                                    <span className="text-[12px] text-gray-400 group-hover:text-[#1DA57A]">點擊上傳</span>
                                </div>
                            )}
                            <input
                                // type="file"
                                className="hidden"
                                name='computerImage'
                            // accept="image/*"
                            />
                        </label>
                    </div>
                    <div className="flex items-center  mb-[10px]">
                        <span className="pr-[5px] whitespace-nowrap">型號</span>
                        <input className="h-9 w-full rounded-[4px] border border-[#d9d9d9] pl-[5px]" onChange={onInputChange} name="name" value={form.name} id="name" required autoComplete="name" />
                    </div>
                    <div className="flex items-center  mb-[10px]">
                        <span className="pr-[5px] whitespace-nowrap">廠牌</span>
                        <input className="h-9 w-full rounded-[4px] border border-[#d9d9d9] pl-[5px]" onChange={onInputChange} name="brand" value={form.brand} id="brand" required autoComplete="brand" />
                    </div>
                    <div className="flex items-center  mb-[10px]">
                        <span className="pr-[5px] whitespace-nowrap">價格</span>
                        <input className="h-9 w-full rounded-[4px] border border-[#d9d9d9] pl-[5px]" onChange={onInputChange} name="price" value={form.price} id="price" required autoComplete="price" />
                    </div>

                    {/* 按鈕 */}
                    <DialogFooter showCloseButton={false}>
                        <DialogClose asChild>
                            <Button variant="cancel" type="button">取消</Button>
                        </DialogClose>
                        {
                            computerData?.type === 'add'
                                ? null
                                : <Button variant="delete" type="button" onClick={() => { onDelete(form.id) }}>刪除</Button>
                        }
                        <Button variant="confirm" type="submit">儲存</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
export default ComputerDialog