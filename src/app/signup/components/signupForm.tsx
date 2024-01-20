"use client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function LoginForm() {
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const response = await fetch(
      "http://localhost:3001/auth/api/v1/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.get("username"),
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      }
    );

    if (response.ok) {
      toast.success("Account created successfully");

      return router.push("/signin");
    }

    const data = await response.json();

    if (data.issues) {
      data.issues.forEach((issue: any) => {
        toast.error(issue.message);
      });
    } else {
      toast.error(data.message);
    }

    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full h-full">
      <Card className="w-full h-full">
        <CardContent className="flex p-8 min-h-96 h-full">
          <div className="w-1/2 flex flex-col justify-between">
            <h1>SIGNUP</h1>
            <p>
              Now III can't be responsible if I get you in trouble now. So
              you're too irresistable. yeah that's for sure
            </p>
          </div>
          <div className="w-1/2 flex items-center justify-center">
            <div className="w-[70%]">
              <div className="mb-4">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="username"
                  name="username"
                  placeholder="Username"
                  required
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  required
                />
              </div>
              <div className="mb-4">
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    required
                    minLength={6}
                  />
                </div>
              </div>
              <div className="mb-4">
                <div>
                  <Label htmlFor="confirmPassword">Confirm password</Label>
                  <Input
                    id="confirmPassword"
                    type="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    required
                    minLength={6}
                  />
                </div>
              </div>
              <Button className="w-full">
                <span>Signup</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
