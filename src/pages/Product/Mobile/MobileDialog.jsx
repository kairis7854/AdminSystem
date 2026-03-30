import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addMobile, updateMobile } from '../../../store/modules/productStore.jsx'
import { toast } from "sonner"

export function MobileDialog({ isOpen, setIsOpen, dialogData }) {
    const [form, setForm] = useState(
        {
            id: "",
            brand: "",
            model: "",
            spec: "",
            price: "",
            onSell: true,
        }
    )
    const dispatch = useDispatch()
    useEffect(() => {
        if (dialogData?.type === 'edit' && dialogData.data) {
            setForm(dialogData.data);
        } else if (dialogData?.type === 'add') {
            setForm({ brand: "", model: "", spec: "", price: "", onSell: true });
        }
    }, [dialogData]);

    const onSave = (e) => {
        e.preventDefault()
        if (dialogData.type === 'add') {
            dispatch(addMobile({ ...form, id: crypto.randomUUID() }));
            toast.success('新增成功')
        } else if (dialogData.type === 'edit') {
            dispatch(updateMobile(form));
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
                <DialogHeader className="mb-[20px]">
                    <DialogTitle className="text-[18px]">{dialogData?.type === 'add' ? '新增' : '編輯'}商品</DialogTitle>
                </DialogHeader>
                <DialogDescription className="sr-only">
                    {dialogData?.type === 'add' ? '新增商品資訊表單' : '編輯商品資訊表單'}
                </DialogDescription>
                <form className="p-[20px]" onSubmit={onSave} autoComplete="off">
                    <div className="flex items-center  mb-[10px]">
                        <span className="pr-[5px] whitespace-nowrap">廠牌</span>
                        <input className="h-9 w-full rounded-[4px] border border-[#d9d9d9] pl-[5px]" onChange={onInputChange} name="brand" value={form.brand} id="brand" required  />
                    </div>
                    <div className="flex items-center  mb-[10px]">
                        <span className="pr-[5px] whitespace-nowrap">型號</span>
                        <input className="h-9 w-full rounded-[4px] border border-[#d9d9d9] pl-[5px]" onChange={onInputChange} name="model" value={form.model} id="model" required  />
                    </div>
                    <div className="flex items-center  mb-[10px]">
                        <span className="pr-[5px] whitespace-nowrap">規格</span>
                        <input className="h-9 w-full rounded-[4px] border border-[#d9d9d9] pl-[5px]" onChange={onInputChange} name="spec" value={form.spec} id="spec" required  />
                    </div>
                    <div className="flex items-center  mb-[10px]">
                        <span className="pr-[5px] whitespace-nowrap">價格</span>
                        <input className="h-9 w-full rounded-[4px] border border-[#d9d9d9] pl-[5px]" onChange={onInputChange} name="price" value={form.price} id="price" required  />
                    </div>
                    <DialogFooter showCloseButton={false}>
                        <DialogClose asChild>
                            <Button variant="cancel" type="button">取消</Button>
                        </DialogClose>
                        <Button variant="confirm" type="submit">儲存</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
export default MobileDialog