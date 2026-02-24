"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schema/authSchema";
import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import logo from "@/assets/images/logo.png";
import Image from "next/image";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useSignInMutation } from "@/redux/api/authApi";
import CustomLoader from "@/components/CustomLoader/CustomLoader";
import { setUser } from "@/redux/features/authSlice";

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [signin, { isLoading }] = useSignInMutation();

  const onLoginSubmit = async (data) => {
    try {
      const payload = {
        ...data,
      };
      const res = await signin(payload).unwrap();

      if (res?.data?.accessToken) {
        const decodedToken = jwtDecode(res.data.accessToken);
        const userRole = decodedToken?.role;
        if (userRole !== "admin") {
          toast.error("You are not authorized to access this site");
          return;
        }
        toast.success("Login successful");
        dispatch(
          setUser({
            token: res.data.accessToken,
          }),
        );
        router.push("/admin/dashboard");
      } else {
        toast.error(res?.message || "Login failed: No access token received");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to login");
    }
  };

  return (
    <div className="w-full rounded-md border bg-[#9CA2AE]/30 px-6 py-8 shadow-none shadow-primary-blue/10">
      <section className="mb-8 flex flex-col items-center justify-center space-y-2">
        <Image
          src={logo}
          alt="logo"
          className="h-12 w-auto"
          width={1000}
          height={1000}
        />
        <h4 className="text-3xl font-semibold text-white">
          Welcome to Verified Plug!
        </h4>
        <p className="text-center text-white/90">Sign in to your account</p>
      </section>

      <FormWrapper onSubmit={onLoginSubmit} resolver={zodResolver(loginSchema)}>
        <UInput
          name="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
          size="large"
          className="!h-10"
          labelStyles={{ fontWeight: "500", color: "white" }}
        />

        <UInput
          name="password"
          label="Password"
          type="password"
          placeholder="*************"
          size="large"
          className="!mb-0 !h-10"
          labelStyles={{ fontWeight: "500", color: "white" }}
        />

        <Button
          htmlType="submit"
          type="primary"
          size="large"
          className="!h-10 w-full !font-semibold"
          disabled={isLoading}
          loading={isLoading}
          icon={isLoading ? <CustomLoader className="h-5 w-5" /> : null}
        >
          Log In
        </Button>

        <Link
          href="/forgot-password"
          className="mt-2 block text-center font-medium text-white hover:text-primary-blue/85"
        >
          I forgot my password
        </Link>
      </FormWrapper>
    </div>
  );
}
