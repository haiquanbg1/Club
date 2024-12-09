import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { TiDelete } from "react-icons/ti";


type Props = {
	openState: boolean;
	setOpenState: (openState: boolean) => void;
	handleDeleteConfirm: () => void;
	handleDeleteCancel: () => void;
}

const AlertDeleteOtherMes = (
	{ openState: isDeleteDialogOpen, 
		setOpenState: setIsDeleteDialogOpen, 
		handleDeleteConfirm: confirmDelete, 
		handleDeleteCancel: cancelDelete,
	}: Props
) => {
	return (
		<AlertDialog.Root open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
			<AlertDialog.Trigger asChild>
				<button
					className="p-1 bg-slate-400 rounded-full hover:bg-red-600 text-white flex justify-center items-center"
				>
					<TiDelete size={18} />
				</button>
			</AlertDialog.Trigger>

			<AlertDialog.Portal>
				<AlertDialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-50" />
				<AlertDialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-600 p-6 rounded-lg shadow-lg w-96 z-50">

					<AlertDialog.Title className="text-lg font-semibold mb-1 text-white">
						Gỡ đối với bạn?
					</AlertDialog.Title>
					<AlertDialog.Description className="text-sm mb-6 text-white">
						Tin nhắn này sẽ bị gỡ khỏi thiết bị của bạn, nhưng vẫn hiển thị với các thành viên khác trong đoạn chat.
					</AlertDialog.Description>
					<div className="flex gap-4 justify-center w-full">
						<AlertDialog.Cancel asChild>
							<button
								className="px-4 py-2 bg-gray-500 rounded-lg hover:bg-gray-700 text-sm font-semibold w-full"
								onClick={cancelDelete}
							>
								Cancel
							</button>
						</AlertDialog.Cancel>
						<AlertDialog.Action asChild>
							<button
								className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-semibold  w-full"
								onClick={confirmDelete}
							>
								Yes, delete
							</button>
						</AlertDialog.Action>
					</div>
				</AlertDialog.Content>
			</AlertDialog.Portal>
		</AlertDialog.Root>

	)
}

export default AlertDeleteOtherMes;