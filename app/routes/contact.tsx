import { ActionFunctionArgs } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";

import nodemailer from "nodemailer";
interface Errors {
  email?: string;
  name?: string;
  message?: string;
}

interface ActionData {
  errors?: Errors;
  success?: string;
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const email = String(formData.get("user_email"));
  const name = String(formData.get("user_name"));
  const message = String(formData.get("message"));

  const errors: Errors = {};

  if (!email) {
    errors.email = "Email is required";
  } else if (!email.includes("@")) {
    errors.email = "Invalid email adress";
  }
  if (!name) {
    errors.name = "Please provide a Name";
  }
  if (!message) {
    errors.message = "Please provide a Message";
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "letitia5@ethereal.email",
      pass: "PfUbwNrFmcHjKAGrq4",
    },
  });

  if (Object.keys(errors).length) {
    return {
      errors: errors,
    };
  } else {
    const info = await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: "marcelbialas@gmail.com",
      subject: "Contact Form: mbialas.de",
      text: message,
    });

    console.log("Message sent: %s", info.messageId);
    return {
      success:
        "Your message has been sent, I will get back to you as soon as possible.",
    };
  }
}

export default function Contact() {
  const actionData = useActionData<ActionData>();
  const form = useRef<HTMLFormElement>(null);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    actionData?.errors && setLoading(false);

    if (actionData?.success) {
      form.current?.reset();

      setLoading(false);

      setTimeout(() => {
        window.location.replace("/");
      }, 5000);
    }
  }, [actionData]);

  return (
    <div>
      <h2 className="text-3xl text-center md:text-left md:text-4xl font-bold text-emerald-500 pt-6 pb-8">
        Send me a message
      </h2>
      {!actionData?.errors && actionData?.success ? (
        <span className="block pb-4 font-bold text-lg text-emerald-500">
          {actionData?.success}
        </span>
      ) : null}
      <Form
        method="post"
        ref={form}
        onSubmit={() => setLoading(true)}
        className="flex flex-col gap-4 font-medium text-lg"
      >
        <div>
          {actionData?.errors?.name ? (
            <small className="text-red-500">{actionData?.errors.name}</small>
          ) : null}
          <input
            type="text"
            placeholder="Your Name"
            name="user_name"
            className="pb-3 block w-full rounded-2xl bg-gray-100 dark:bg-gray-900 border-transparent focus:border-gray-500 dark:focus:border-gray-800 dark:placeholder:text-zinc-500 focus:bg-white focus:ring-0"
          />
        </div>
        <div>
          {actionData?.errors?.email ? (
            <small className="text-red-500">{actionData?.errors.email}</small>
          ) : null}

          <input
            type="email"
            placeholder="Your E-Mail Adress"
            name="user_email"
            className="py-3 block w-full rounded-2xl bg-gray-100 dark:bg-gray-900 border-transparent focus:border-gray-500 dark:focus:border-gray-800 dark:placeholder:text-zinc-500 focus:bg-white focus:ring-0"
          />
        </div>
        <div>
          {actionData?.errors?.message ? (
            <small className="text-red-500">{actionData?.errors.message}</small>
          ) : null}
          <textarea
            className="py-3 block w-full rounded-2xl bg-gray-100 dark:bg-gray-900 border-transparent focus:border-gray-500 dark:focus:border-gray-800 dark:placeholder:text-zinc-500 focus:bg-white focus:ring-0"
            rows={6}
            placeholder="Your Message"
            name="message"
          ></textarea>
        </div>
        <button
          type="submit"
          className="group md:ml-auto md:w-1/4 bg-gray-200 text-gray-900 rounded-2xl py-2 px-4 font-bold gap-3 md:mb-6 mb-16 hover:bg-emerald-500 transition-all duration-300 cursor-pointer"
        >
          {loading ? (
            <>
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-5 h-5 me-3 text-gray-900 hover:text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                  className="text-gray-300 group-hover:text-emerald-700 transition-all duration-300"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Loading...
            </>
          ) : (
            "submit"
          )}
        </button>
      </Form>
    </div>
  );
}
