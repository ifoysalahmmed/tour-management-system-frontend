import { Link, useNavigate } from "react-router";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import Google from "@/assets/icons/Google";
import { envVars } from "@/config/env";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import PasswordInput from "@/components/ui/password";
import { cn } from "@/lib/utils";
import {
  useRegisterMutation,
  useSendOTPMutation,
} from "@/redux/features/auth/auth.api";
import type { ApiError } from "@/types";

import { registerSchema, type RegisterFormInputs } from "./register.schema";

const GOOGLE_REGISTER_URL = `${envVars.VITE_BASE_URL}/auth/google`;

const RegisterForm = ({
  className,
  ...props
}: React.ComponentProps<"form">) => {
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const [sendOTP] = useSendOTPMutation();

  const { control, handleSubmit } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    const toastId = toast.loading("Registering your account...");

    try {
      const result = await register(userData).unwrap();

      await sendOTP({ email: data.email }).unwrap();

      toast.success(result.message, { id: toastId });

      navigate("/verify", { state: data.email });
    } catch (error) {
      const err = error as ApiError;

      if (err.data?.statusCode === 409) {
        toast.error("Email already exists. Please use a different email.", {
          id: toastId,
        });

        return;
      }

      toast.error(
        err.data?.message ?? "Something went wrong. Please try again later.",
        { id: toastId },
      );
    }
  };

  return (
    <form
      noValidate
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>

          <p className="text-sm text-balance text-muted-foreground">
            Fill in the form below to create your account
          </p>
        </div>

        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>

              <Input
                {...field}
                id="name"
                type="text"
                placeholder="John Doe"
                autoComplete="name"
                aria-invalid={fieldState.invalid}
              />

              <FieldDescription className="sr-only">
                Enter your full name.
              </FieldDescription>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>

              <Input
                {...field}
                id="email"
                type="email"
                placeholder="m@example.com"
                autoComplete="email"
                aria-invalid={fieldState.invalid}
              />

              <FieldDescription className="sr-only">
                We'll use this email to contact you.
              </FieldDescription>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>

              <PasswordInput
                {...field}
                id="password"
                autoComplete="new-password"
                aria-invalid={fieldState.invalid}
              />

              <FieldDescription className="sr-only">
                Must be at least 8 characters long.
              </FieldDescription>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="confirmPassword"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>

              <PasswordInput
                {...field}
                id="confirm-password"
                autoComplete="new-password"
                aria-invalid={fieldState.invalid}
              />

              <FieldDescription className="sr-only">
                Re-enter your password.
              </FieldDescription>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Field>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Create Account"}
          </Button>
        </Field>

        <FieldSeparator>Or continue with</FieldSeparator>

        <Field>
          <Button
            type="button"
            variant="outline"
            onClick={() => window.open(GOOGLE_REGISTER_URL, "_self")}
          >
            <Google />
            Register with Google
          </Button>

          <FieldDescription className="px-6 text-center">
            Already have an account?{" "}
            <Link to="/login">
              <span className="underline underline-offset-4">Login</span>
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default RegisterForm;
