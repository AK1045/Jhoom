import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChatStore } from "@/stores/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { Send } from "lucide-react";
import { useState } from "react"

const MessageSender = () => {
    const [message,setMessage] = useState("");
    const {selectedUser,sendMessage} = useChatStore();
    const {user} = useUser();

    const handleSend=()=>{
        if(!selectedUser || !user || !message) return;
        sendMessage(selectedUser.clerkId,user.id,message);
        setMessage("");
    }
  return (
    <div className="p-4 mt-auto border-t border-zinc-700">
        <div className="flex gap-2">
            <Input placeholder="Send a Message" value={message} onChange={(e)=> setMessage(e.target.value)} className="bg-zinc-700 border-none"
            onKeyDown={(e)=>e.key === "Enter" && handleSend()}/>
            <Button size={"icon"} onClick={handleSend} disabled={!message.trim()}>
                <Send className="size-4" />
            </Button>
        </div>
    </div>
  )
}

export default MessageSender