"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useProfile from "./hooks/profile-section.hook";
import { UserPayload } from "@/@types/user.entity";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import TooltipInfo from "@/components/utils/Tooltip";

interface ProfileSectionProps {
  onSave: (data: UserPayload) => void;
}

const ProfileSection = ({ onSave }: ProfileSectionProps) => {
  const { form, onSubmit } = useProfile({
    onSave,
  });

  return (
    <Card className={cn("overflow-hidden")}>
      <CardContent className="p-6">
        <div className="flex w-full justify-between">
          <h1 className="text-3xl font-bold mb-4">Profile</h1>
          <p className="italic text-sm">
            {" "}
            {/* <strong>Created:</strong>{formatDateFromFirebase(loggedUser?.createdAt.)} */}
          </p>
        </div>
        <p className="text-gray-500 mb-4">
          Manage your personal details, update preferences, and customize your
          experience here.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your first name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="identification"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Identification</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your phone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your country" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="useCase"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      Use Case
                      <TooltipInfo content="Your company or even if you are testing..." />
                    </FormLabel>

                    <FormControl>
                      <Input placeholder="Specify your use case" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button className="w-full md:w-1/6" type="submit">
              Update profile
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProfileSection;
