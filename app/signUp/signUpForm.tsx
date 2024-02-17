"use client";

import { UserSchema } from "../types";
import { Input } from "../../components/TW/input";
import toast from "react-hot-toast";
import { createUser } from "./add-user-server-actions";

export default function SignUpForm() {
  const clientAction = async (formData: FormData) => {
    const first_name = formData.get("first_name") as string;
    const last_name = formData.get("last_name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const result = UserSchema.safeParse({
      email,
      password,
      first_name,
      last_name,
      role: "user",
    });

    if (!result.success) {
      let errorMessage = "";
      result.error.issues.forEach((issue) => {
        errorMessage =
          errorMessage + issue.path[0] + ": " + issue.message + ". ";
      });
      toast.error(errorMessage);
      return;
    }

    const response = await createUser(result.data);
    if (response?.error) {
      toast.error(response.error);
      return;
    }
  };
  return (
    <div className="z-10 flex flex-col justify-center flex-1 w-full gap-2 px-8 sm:max-w-md">
      <form
        className="flex flex-col justify-center flex-1 w-full gap-2 animate-in text-foreground"
        action={clientAction}
      >
        {" "}
        <label className="text-md" htmlFor="first_name">
          First Name
        </label>
        <Input
          className="py-1 mb-6 rounded-md bg-inherit"
          name="first_name"
          placeholder="Marcos"
        />
        <label className="text-md" htmlFor="last_name">
          Last Name
        </label>
        <Input
          className="py-1 mb-6 rounded-md bg-inherit"
          name="last_name"
          placeholder="Marcos"
        />
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <Input
          className="py-1 mb-6 rounded-md bg-inherit"
          name="email"
          placeholder="you@example.com"
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <Input
          className="py-1 mb-6 rounded-md bg-inherit"
          type="password"
          name="password"
          placeholder="••••••••"
        />
        <button className="px-4 py-2 mb-2 bg-blue-700 rounded-md text-foreground">
          Sign Up
        </button>
      </form>
    </div>
  );
}