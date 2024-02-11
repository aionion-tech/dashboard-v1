"use client";
import { loginAction } from "@/app/lib/actions/auth.actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginForm() {
  const router = useRouter();

  const handleSubmit = async (data: FormData) => {
    const user = await loginAction({
      email: data.get("email") as string,
      password: data.get("password") as string,
    });

    if (user) {
      toast.success("Login successful");
      router.push("/dashboard");
    }
  };

  return (
    <form action={handleSubmit} className="w-full h-full">
      <Card className="w-full h-full">
        <CardContent className="flex p-8 min-h-96 h-full">
          <div className="w-1/2 flex flex-col justify-between">
            <h1>SIGNIN</h1>
            <p>
              Now III can't be responsible if I get you in trouble now. So
              you're too irresistable. yeah that's for sure
            </p>
          </div>
          <div className="w-1/2 flex items-center justify-center">
            <div className="w-[70%]">
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
              <Button className="w-full">
                <span>Log in</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
