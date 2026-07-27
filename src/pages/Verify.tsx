import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BadgeCheckIcon, RefreshCwIcon } from "lucide-react";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  useResendOTPMutation,
  useVerifyOTPMutation,
} from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const verifySchema = z.object({
  otp: z
    .string()
    .regex(/^\d{6}$/, "Please enter a valid 6-digit verification code"),
});

type VerifyFormInputs = z.infer<typeof verifySchema>;

const Verify = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = typeof location.state === "string" ? location.state : "";

  const [verifyOTP, { isLoading: isVerifying }] = useVerifyOTPMutation();

  const [resendOTP, { isLoading: isResending }] = useResendOTPMutation();

  const [timer, setTimer] = useState(0);
  const [isResendDisabled, setIsResendDisabled] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<VerifyFormInputs>({
    resolver: zodResolver(verifySchema),
    mode: "onChange",
    defaultValues: {
      otp: "",
    },
  });

  useEffect(() => {
    if (!email) {
      navigate("/", { replace: true });
    }
  }, [email, navigate]);

  useEffect(() => {
    if (!isResendDisabled) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsResendDisabled(false);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isResendDisabled]);

  if (!email) {
    return null;
  }

  const onSubmit = async (data: VerifyFormInputs) => {
    try {
      const result = await verifyOTP({
        email,
        otp: data.otp,
      }).unwrap();

      toast.success(result.message);

      navigate("/login", {
        replace: true,
      });
    } catch (error: any) {
      toast.error(
        error?.data?.message ?? "Invalid verification code. Please try again.",
      );
    }
  };

  const handleResendOTP = async () => {
    const loadingToast = toast.loading("Resending verification code...");

    try {
      const result = await resendOTP({ email }).unwrap();

      toast.success(result.message, {
        id: loadingToast,
      });

      setIsResendDisabled(true);
      setTimer(120);
    } catch (error: any) {
      toast.error(
        error?.data?.message ?? "Failed to resend verification code.",
        {
          id: loadingToast,
        },
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-background via-background to-muted/30 px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">
        <Card className="border-border/50 shadow-xl">
          <CardHeader className="space-y-5 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <BadgeCheckIcon className="size-6 text-primary" />
            </div>

            <div className="space-y-2">
              <CardTitle className="text-3xl font-bold tracking-tight">
                Verify your login
              </CardTitle>

              <CardDescription className="text-base">
                We've sent a 6-digit verification code to
              </CardDescription>

              <div className="inline-flex rounded-full border bg-muted px-4 py-1.5 text-sm font-medium">
                {email}
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <Controller
              name="otp"
              control={control}
              render={({ field, fieldState }) => (
                <Field>
                  <div className="mb-4 flex items-center justify-between">
                    <FieldLabel htmlFor="otp-verification">
                      One-time password (OTP)
                    </FieldLabel>

                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleResendOTP}
                      disabled={isResendDisabled || isResending}
                      className="text-primary"
                    >
                      <RefreshCwIcon
                        className={cn(
                          "mr-2 size-4",
                          isResending && "animate-spin",
                        )}
                      />

                      <span className="text-sm font-medium">
                        {isResendDisabled
                          ? `Resend in (${timer}s)`
                          : isResending
                            ? "Sending..."
                            : "Resend"}
                      </span>
                    </Button>
                  </div>

                  <div className="flex justify-center">
                    <InputOTP
                      id="otp-verification"
                      maxLength={6}
                      autoComplete="one-time-code"
                      value={field.value}
                      onChange={field.onChange}
                    >
                      <InputOTPGroup className="gap-2">
                        {[0, 1, 2].map((index) => (
                          <InputOTPSlot
                            key={index}
                            index={index}
                            className="h-14 w-14 rounded-xl border text-xl font-semibold"
                          />
                        ))}
                      </InputOTPGroup>

                      <InputOTPSeparator className="mx-3" />

                      <InputOTPGroup className="gap-2">
                        {[3, 4, 5].map((index) => (
                          <InputOTPSlot
                            key={index}
                            index={index}
                            className="h-14 w-14 rounded-xl border text-xl font-semibold"
                          />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </div>

                  {fieldState.invalid && (
                    <FieldError
                      className="mt-3 text-center"
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />
          </CardContent>

          <CardFooter>
            <Button
              type="submit"
              className="h-12 w-full text-base font-semibold"
              disabled={!isValid || isVerifying}
            >
              {isVerifying ? "Verifying..." : "Verify Account"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default Verify;
