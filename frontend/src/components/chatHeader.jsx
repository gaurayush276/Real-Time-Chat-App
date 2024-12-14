import { X } from "lucide-react";
 
 import { useAuthStore } from "./store/useAuthStroe";
import { useChatStore } from "./store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
   const {users} = useChatStore() ; 
//    console.log("users before the going back " , users) ; 
  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
  
              <img src={selectedUser.profilePic || "https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png"} alt={selectedUser.fullName} />
            </div>
            
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>
            <div > Bg </div>

        {/* Close button */}
        <button onClick={() => {setSelectedUser(null) }}>
          <X />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;