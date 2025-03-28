"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  description: z.string().min(1, "Description is required"),
  code: z.string().min(1, "Code is required"),
});

export default function CreateGistForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    const response = await fetch("/api/gists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("description")} placeholder="Description" />
      {errors.description && <p>{errors.description.message}</p>}
      <textarea {...register("code")} placeholder="Code" />
      {errors.code && <p>{errors.code.message}</p>}
      <button type="submit">Create Gist</button>
    </form>
  );
}