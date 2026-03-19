import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function UserEditDialog({ open, onOpenChange, userData }) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader className="mb-[20px]">
                    <DialogTitle className="text-[18px]">新增商品</DialogTitle>
                </DialogHeader>

                <div className="p-[20px]">
                    <div className="flex items-center  mb-[10px]">
                        <span className="pr-[5px] whitespace-nowrap">廠牌</span>
                        <input className="h-9 w-full rounded-[4px] border border-[#d9d9d9] pl-[5px]" defaultValue={'111'} type="brand" />
                    </div>
                    <div className="flex items-center  mb-[10px]">
                        <span className="pr-[5px] whitespace-nowrap">型號</span>
                        <input className="h-9 w-full rounded-[4px] border border-[#d9d9d9] pl-[5px]" defaultValue={'111'} type="model" />
                    </div>
                    <div className="flex items-center  mb-[10px]">
                        <span className="pr-[5px] whitespace-nowrap">規格</span>
                        <input className="h-9 w-full rounded-[4px] border border-[#d9d9d9] pl-[5px]" defaultValue={'111'} type="spec" />
                    </div>
                    <div className="flex items-center  mb-[10px]">
                        <span className="pr-[5px] whitespace-nowrap">價格</span>
                        <input className="h-9 w-full rounded-[4px] border border-[#d9d9d9] pl-[5px]" defaultValue={'111'} type="price" />
                    </div>
                </div>

                <DialogFooter showCloseButton={false}>
                    <Button variant="cancel" type="button">取消</Button>
                    <Button variant="confirm" type="submit">儲存修改</Button>
                </DialogFooter>
            </DialogContent>

        </Dialog>
    );
}
export default UserEditDialog