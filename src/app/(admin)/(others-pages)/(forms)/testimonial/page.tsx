"use client";
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Select from "@/components/form/Select";
import TextArea from "@/components/form/input/TextArea";
import { ChevronDownIcon } from "@/icons";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";

const testimonySchema = z.object({
  name: z.string().min(1, "Full name is required"),
  position: z.string().min(1, "Please select a position"),
  testimony: z.string().min(1, "Testimony is required"),
  image: z
    .any()
    .refine((file) => file?.length === 1, "Image is required")
    .optional(),
});

type TestimonyFormType = z.infer<typeof testimonySchema>;

export default function FormElements() {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TestimonyFormType>({
    resolver: zodResolver(testimonySchema),
  });

  const options = [
    { value: "memeber", label: "Memeber" },
    { value: "president", label: "President" },
    { value: "guest", label: "Guest" },
  ];

const onSubmit = async (data: TestimonyFormType) => {
  console.log(data)
  try {
    const response = await fetch("/api/testimony", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        position: data.position,
        testimony: data.testimony,
        pic: data.image?.[0]?.name || null,
      }),
    });

    const result = await response.json();
    console.log(result,result.success)
      if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // if (response.ok ) {
       toast.success(`Your request has been submitted for: `, {
            position: 'top-right',
            autoClose: 4000,
          });
      
      // reset() or redirect if needed
    // } else {
    //   toast.error(result.error || "Submission failed!", {
    //         position: 'top-right',
    //         autoClose: 4000,
    //       });
    // }
  } catch (err) {
    console.error("Submission error:", err);
    toast.error("Something went wrong. Please try again.");
  }
};

  return (
    <div>
      <ToastContainer />
      <PageBreadcrumb pageTitle="Testimony" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="space-y-6">
            <ComponentCard title="About you">
              <div className="space-y-6">
                <div>
                  <Label>Full name</Label>
                  <Input type="text" {...register("name")} />
                  {errors.name && (
                    <p className="text-red-600 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label>Position</Label>
                  <div className="relative">
                    <Controller
                      control={control}
                      name="position"
                      render={({ field }) => (
                        <>
                          <Select
                            options={options}
                            placeholder="Select Option"
                            onChange={(val) => field.onChange(val)}
                            className="dark:bg-dark-900"
                          />
                          <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                            <ChevronDownIcon />
                          </span>
                        </>
                      )}
                    />
                  </div>
                  {errors.position && (
                    <p className="text-red-600 text-sm">
                      {errors.position.message}
                    </p>
                  )}
                </div>
              </div>
            </ComponentCard>

          </div>

          <div className="space-y-6">
            <div>
              <Label>Description</Label>
              <Controller
                control={control}
                name="testimony"
                render={({ field }) => (
                  <TextArea
                    value={field.value}
                    onChange={field.onChange}
                    rows={6}
                  />
                )}
              />
              {errors.testimony && (
                <p className="text-red-600 text-sm">
                  {errors.testimony.message}
                </p>
              )}
            </div>
          </div>

          <div className="mt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Submit Testimony
          </button>
        </div>
        </div>

        
      </form>
    </div>
  );
}
