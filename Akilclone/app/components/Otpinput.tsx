"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const Otpinput = () => {
  const [values, setValues] = useState<string[]>(["", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [counter, setCounter] = useState(30);
  const [isDisabled, setIsDisabled] = useState(true);

  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const router = useRouter();

  const otpsubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("otpsubmit function called"); // Check if this is logged
    let otp = values.join("");
    console.log(email); // Check if email is defined
    if (otp) {
      console.log(otp, "initially before fetch");
      try {
        const response = await fetch(
          "https://akil-backend.onrender.com/verify-email",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              OTP: otp,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        if (result?.success) {
          console.log("otp success");
          router.push("/auth/login");
        } else {
          console.error("OTP verification failed");
        }
      } catch (error) {
        console.error("Error during OTP submission:", error);
      }
    }
  };

  useEffect(() => {
    let count = 0;
    values.forEach((value) => {
      if (value) count++;
    });
    if (count == 4) setIsSubmitting(true);
    else setIsSubmitting(false);
  }, [values]);

  useEffect(() => {
    if (counter > 0) {
      const timer = setInterval(() => {
        setCounter((prevCounter) => prevCounter - 1);
      }, 1000);

      return () => clearInterval(timer); // Clear timer on cleanup
    } else {
      setIsDisabled(false);
    }
  }, [counter]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newValue = e.target.value;
    if (/^\d$/.test(newValue) || newValue === "") {
      const newValues = [...values];
      newValues[index] = newValue;
      setValues(newValues);

      if (newValue && index < values.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      if (index > 0) {
        const newValues = [...values];
        newValues[index - 1] = "";
        setValues(newValues);
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    if (/^\d{4}$/.test(pastedData)) {
      const newValues = pastedData.split("");
      setValues(newValues);
      inputRefs.current[3].focus(); // Move focus to the last input after pasting
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  useEffect(() => {
    const inputs = inputRefs.current;
    inputs.forEach((input) => {
      input.addEventListener("paste", handlePaste as unknown as EventListener);
      return () =>
        input.removeEventListener(
          "paste",
          handlePaste as unknown as EventListener
        );
    });
  }, []);

  return (
    <>
      <form id="otp-form" className="flex flex-col gap-11" onSubmit={otpsubmit}>
        <div className="flex items-center justify-center gap-8">
          {values.map((value, index) => (
            <input
              key={index}
              type="text"
              className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-purple-400 hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              value={value}
              maxLength={1}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => {
                if (el) inputRefs.current[index] = el;
              }}
              onFocus={(e) => handleFocus(e)}
            />
          ))}
        </div>

        <div className="text-sm text-slate-500 mt-4">
          You can request to{" "}
          <a
            className="font-medium text-indigo-500 hover:text-indigo-600"
            href="#0"
          >
            Resend
          </a>{" "}
          {isDisabled && `in ${counter} seconds`}
        </div>

        <button
          type="submit"
          className={`${
            isSubmitting ? "bg-purple-400" : "bg-[#4640DE4D]"
          } px-6 py-3 rounded-[80px] h-12`}
        >
          Continue
        </button>
      </form>
    </>
  );
};

export default Otpinput;
