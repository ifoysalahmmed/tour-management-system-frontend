import { Link, useNavigate } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
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
import { useRegisterMutation } from "@/redux/features/auth/auth.api";

import { registerSchema, type RegisterFormInputs } from "./register.schema";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const RegisterForm = ({
  className,
  ...props
}: React.ComponentProps<"form">) => {
  const [register] = useRegisterMutation();
  const navigate = useNavigate();

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

    try {
      const result = await register(userData).unwrap();
      console.log("Registration successful:", result);
      toast.success(result.message);
      navigate("/verify");
    } catch (error: unknown) {
      if ((error as FetchBaseQueryError).status) {
        const err = error as FetchBaseQueryError & {
          data?: { statusCode?: number };
        };

        if (err.data?.statusCode === 409) {
          toast.error("Email already exists. Please use a different email.");
        } else {
          console.error("Registration failed:", error);
        }
      } else {
        toast.error("Something went wrong. Please try again later.");
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
                aria-invalid={fieldState.invalid}
                placeholder="John Doe"
                autoComplete="name"
              />
              <FieldDescription className="sr-only">
                Enter your fullname
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
                aria-invalid={fieldState.invalid}
                placeholder="m@example.com"
                autoComplete="email"
              />
              <FieldDescription className="sr-only">
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
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
                aria-invalid={fieldState.invalid}
                autoComplete="password"
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
                aria-invalid={fieldState.invalid}
                autoComplete="confirm password"
              />
              <FieldDescription className="sr-only">
                Please confirm your password.
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Field>
          <Button type="submit">Create Account</Button>
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field>
          <Button variant="outline" type="button">
            <Google />
            Register with Google
          </Button>
          <FieldDescription className="px-6 text-center">
            Already have an account?{" "}
            <Link to={"/login"}>
              <span className="underline underline-offset-4">Login</span>
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default RegisterForm;
