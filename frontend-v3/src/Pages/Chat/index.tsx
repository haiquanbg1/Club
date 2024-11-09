import Header from "./Header";
import MessageList from "./MessageList";
import Footer from "./Footer";
import * as ScrollArea from '@radix-ui/react-scroll-area';

export default function ChatPage() {
    return (
        <div className="h-screen flex-auto flex flex-col bg-gray-700 relative">
            <ScrollArea.Root className="w-full overflow-y-auto p-4 mt-5
                [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-track]:bg-gray-100
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-gray-300
                dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                <Header author="Thang" id="shachi1234"/>
                <MessageList />
                
                
            </ScrollArea.Root>
            <Footer className="bottom-2 w-full mt-2" author="Thang" />
        </div>
    )
}
