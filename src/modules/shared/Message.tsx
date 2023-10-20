import toast, { Toaster } from "react-hot-toast";

class Message {
  static Success(message) {
    return toast.success("Successfully!");
  }

  static Error(message) {
    return toast.error(message);
  }
}

export default Message;
