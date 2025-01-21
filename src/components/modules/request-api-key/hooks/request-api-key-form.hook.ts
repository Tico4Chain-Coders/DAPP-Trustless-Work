import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore/lite";
import { firebaseDB } from "../../../../../firebase";
import { formSchema } from "../schema/request-api-key-schema";
import { toast } from "@/hooks/use-toast";

type FormValues = z.infer<typeof formSchema>;

export const useRequestApiKeyForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      type: undefined,
      description: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      // Mock API call for email uniqueness check and Firebase insertion
      const { firstName: name, lastName, email, type, description } = data;

      const q = query(
        collection(firebaseDB, "api keys"),
        where("email", "==", email),
      );

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        toast({
          title: "Error",
          description: "An API key has already been requested with this email.",
          variant: "destructive",
        });
        return;
      }

      //  If it doesn't exist, add the new record
      await addDoc(collection(firebaseDB, "api keys"), {
        name,
        lastName,
        email,
        type,
        description,
        createdAt: new Date().toISOString(),
      });
      toast({
        title: "Success",
        description: "Your API key request has been submitted successfully.",
      });
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "An error occurred while processing your request.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { form, isLoading, onSubmit };
};
