import toast, { Toaster } from "react-hot-toast";

class Message {
  static Success(message) {
    return toast.success("Successfully!");
  }

  static Error(message) {
    return toast.error("This didn't work.");
  }
}

export default Message;
