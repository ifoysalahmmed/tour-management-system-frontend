import { Link, useNavigate } from "react-router";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

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
import { useLoginMutation } from "@/redux/features/auth/auth.api";

import { loginSchema, type LoginFormInputs } from "./login.schema";

import { toast } from "sonner";

const GOOGLE_LOGIN_URL = `${envVars.VITE_BASE_URL}/auth/google`;

type ApiError = FetchBaseQueryError & {
  data?: {
    message?: string;
  };
};

const LoginForm = ({ className, ...props }: React.ComponentProps<"form">) => {
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { control, handleSubmit } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const result = await login(data).unwrap();

      toast.success(result.message);

      navigate("/", {
        replace: true,
      });
    } catch (error) {
      const err = error as ApiError;

      const errorMessage =
        err.data?.message ?? "Login failed. Please try again later.";

      toast.error(errorMessage);

      if (errorMessage.toLowerCase().includes("not verified")) {
        navigate("/verify", {
          state: data.email,
        });
      }
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
          <h1 className="text-2xl font-bold">Login to your account</h1>

          <p className="text-sm text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>

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

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <div className="flex items-center">
                <FieldLabel htmlFor="password">Password</FieldLabel>

                <Link
                  to="/forgot-password"
                  className="ml-auto text-sm text-orange-600 underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>

              <PasswordInput
                {...field}
                id="password"
                autoComplete="current-password"
                aria-invalid={fieldState.invalid}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Field>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </Field>

        <FieldSeparator>Or continue with</FieldSeparator>

        <Field>
          <Button
            type="button"
            variant="outline"
            onClick={() => window.open(GOOGLE_LOGIN_URL, "_self")}
          >
            <Google />
            Login with Google
          </Button>

          <FieldDescription className="text-center">
            Don't have an account?{" "}
            <Link to="/register">
              <span className="underline underline-offset-4">Register</span>
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default LoginForm;
