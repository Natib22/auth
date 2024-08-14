"use client";
import React, { useState, useEffect, useRef } from "react";

const Otpinput = () => {
  const [values, setValues] = useState<string[]>(["", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRefs = useRef<HTMLInputElement[]>([]);
  useEffect(() => {
    let count = 0;
    values.forEach((value) => {
      if (value) count++;
    });
    if (count == 4) setIsSubmitting(true);
    else setIsSubmitting(false);
  }, [values]);

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
      <form id="otp-form" className="flex flex-col gap-11">
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
          the code in 00:30
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
