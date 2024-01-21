"use client";
import { authenticate } from "@/app/lib/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function LoginForm() {
  const handleSubmit = async (data: FormData) => {
    const result = await authenticate("signin", data);

    if (result === "Invalid credentials.") {
      return toast.error("Invalid credentials.");
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
