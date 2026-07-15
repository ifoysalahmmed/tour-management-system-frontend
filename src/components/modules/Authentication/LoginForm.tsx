import { Link, useNavigate } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Google from "@/assets/icons/Google";
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

import { loginSchema, type LoginFormInputs } from "./login.schema";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const LoginForm = ({ className, ...props }: React.ComponentProps<"form">) => {
  const [login] = useLoginMutation();
  const navigate = useNavigate();

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
      console.log("Login successful:", result);
      toast.success(result.message);
    } catch (error: unknown) {
      if ((error as FetchBaseQueryError).status) {
        const err = error as FetchBaseQueryError & {
          data?: { message?: string };
          status?: number;
        };
        toast.error(err.data?.message || "Login failed. Please try again.");
        if (err.status === 401) {
          navigate("/verify", { state: data.email });
        }
      } else {
        console.error("Login failed:", error);
      }
    }
  };

  return (
    <form
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
                aria-invalid={fieldState.invalid}
                placeholder="m@example.com"
                autoComplete="email"
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
                  to={"/forgot-password"}
                  className="ml-auto text-sm text-orange-600 underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <PasswordInput
                {...field}
                aria-invalid={fieldState.invalid}
                autoComplete="password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Field>
          <Button type="submit">Login</Button>
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field>
          <Button variant="outline" type="button">
            <Google />
            Login with Google
          </Button>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <Link to={"/register"}>
              <span className="underline underline-offset-4">Register</span>
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default LoginForm;
