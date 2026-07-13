import { type ComponentProps, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Input } from "./input";

type PasswordInputProps = ComponentProps<typeof Input>;

const PasswordInput = (props: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        {...props}
        type={showPassword ? "text" : "password"}
        placeholder="********"
        className={`pr-10 ${props.className ?? ""}`}
      />

      <button
        type="button"
        onClick={() => setShowPassword((v) => !v)}
        className="absolute right-3 top-1/2 -translate-y-1/2"
      >
        {showPassword ? (
          <EyeOff className="size-4" />
        ) : (
          <Eye className="size-4" />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
