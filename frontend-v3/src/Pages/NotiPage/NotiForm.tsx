import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  NotificationBody,
  NotificationBodyType,
} from "@/schemaValidations/notification.schema";
import { useParams } from "react-router-dom";
import NotificationApiRequest from "@/apiRequest/notification";
// import socket from "../../socket";
// import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const NotiFormSchema = NotificationBody;
export default function NotiForm({
  setOpen,
  resetNoti,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  resetNoti?: () => Promise<void>;
}) {
  const { toast } = useToast()
  const { clubId } = useParams();
  const form = useForm<NotificationBodyType>({
    resolver: zodResolver(NotiFormSchema),
    defaultValues: {
      title: "",
      description: "",
      club_id: "",
    },
  });

  // const sendNotification = () => {
  //     socket.emit("send_group_notification", {
  //         groupId,
  //         message,
  //         senderId: 123, // ID của người gửi
  //     });
  //     setMessage("");
  // };

  // 2. Define a submit handler.
  const onSubmit = async (values: NotificationBodyType) => {
    try {
      const body = {
        title: values.title,
        description: values.description,
        club_id: clubId || "",
      };

      await NotificationApiRequest.create(body);
      setOpen(false);
      if (resetNoti) {
        resetNoti();
      }

      form.reset();
      toast({

        title: "Thành công",
        description: "Tạo thông báo thành công",

      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",

      })
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[16px]">Title</FormLabel>
              <FormControl>
                <Input placeholder="Loại thông báo" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[16px]">Descrition</FormLabel>
              <FormControl>
                <textarea
                  className="w-full rounded-lg outline-none resize-none bg-transparent h-[160px] border-[solid] border-[1px] p-2 scrollbar-hide"
                  placeholder="Nhập chi tiết thông báo của bạn"
                  {...field}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
