import { sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase/app"

export async function handleSendEmail() {
    try {
      const user = auth.currentUser;
  
      if (user) {
        await sendEmailVerification(user);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error resending verification email:", error);
      return false;
    }
  }