import React from "react";
import Otpinput from "./Otpinput";

const OtpForm = () => {
  return (
    <div className="flex justify-center items-center w-[720px] h-[850px] ">
      <div className="w-[409px] h-auto flex flex-col gap-11">
        <h1 className="font-poppins font-black text-[32px] text-center">
          Verify Email
        </h1>
        <p className="text-sm leading-[22px] text-[#7C8493]">
          We have sent a verification code to the email address you provided. To
          complete the verification process, please enter the code here.
        </p>
        <div className="flex flex-col gap-6">
          <Otpinput />
        </div>
      </div>
    </div>
  );
};

export default OtpForm;
