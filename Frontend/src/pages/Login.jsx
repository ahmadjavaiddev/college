import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useAuthStore } from "../app/AuthStore";

export const Login = () => {
  const [adminData, setAdminData] = useState({
    email: "kips@kips.com",
    password: "123",
  });

  const store = useAuthStore();
  const { loginUser, accessToken, isAuthenticated } = store;

  useEffect(() => {
    if (accessToken && isAuthenticated) {
      window.location.assign("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(adminData);
    } catch (error) {
      console.log("Error :: Admin Login ::", error);
    }
  };

  return (
    <Card className="w-[400px] mx-auto mt-5 py-4">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-4"
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={adminData.email}
                onChange={(e) =>
                  setAdminData({
                    ...adminData,
                    email: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                value={adminData.password}
                onChange={(e) =>
                  setAdminData({
                    ...adminData,
                    password: e.target.value,
                  })
                }
                required
              />
            </div>

            <Button type="submit" className="col-span-2">
              Add Admin
            </Button>
          </motion.div>
        </form>
      </CardContent>
    </Card>
  );
};
