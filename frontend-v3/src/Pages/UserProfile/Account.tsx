import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import userApiRequest from '@/apiRequest/userProfile'
import { useToast } from '@/hooks/use-toast'
import { useNavigate } from 'react-router-dom'
export default function Account() {
    const navigate = useNavigate();
    const { toast } = useToast()
    const handleDelete = async () => {
        try {
            await userApiRequest.delete();
            navigate("/login")
        }
        catch (error: any) {
            console.log(error.payload)
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            })

        }
    }
    return (
        <div className='w-full'>
            <h3 className='mb-[10px]'>Ngưng sử dụng tài khoản</h3>
            <div>

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant={"destructive"} className="text-[14px] p-[5px] " >Xóa tài khoản </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Bạn chắc chắn muốn xóa tài khoản?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your
                                account and remove your data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDelete}>Xác nhận</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    )
}
