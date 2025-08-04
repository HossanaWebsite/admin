"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Select from "@/components/form/Select";
import DatePicker from "@/components/form/date-picker";
import TextArea from "@/components/form/input/TextArea";
import FileInput from "@/components/form/input/FileInput";

import { TimeIcon, ChevronDownIcon, EnvelopeIcon } from "@/icons";

// ----- Zod schema -----
const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  location: z.string().min(1, "Location is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  summary: z.string().min(5, "Summary must be at least 5 characters"),
  organizerEmail: z.string().email("Invalid email address"),
  organizerPhone: z.string().min(1, "Phone is required"),
  image: z
    .any()
    .refine((files) => files?.length === 1, "Image is required")
    .optional(),
});

type EventFormType = z.infer<typeof eventSchema>;

export default function EventForm() {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EventFormType>({
    resolver: zodResolver(eventSchema),
  });

  // For watching file input (image)
  const watchImage = watch("image");

 const onSubmit = async (data: EventFormType) => {
  try {
    const slug = data.title.toLowerCase().replace(/\s+/g, "-") + "-2025-feb15";

    const payload = {
      uniqueId: slug,
      slug,
      title: data.title,
      summary: data.summary,
      url: "https://yourdomain.com/events/" + slug,
      image: "/uploads/" + (data.image?.[0]?.name || "default.jpg"),
      picPath: "/uploads/" + (data.image?.[0]?.name || "default.jpg"),
      day: "Feb 15", // optional - static for example
      eventName: data.title,
      location: data.location,
      start: new Date(`${data.date}T${data.time}`),
      end: new Date(`${data.date}T${data.time}`),
      date: new Date(`${data.date}T${data.time}`),
      paragraphs: [], // default or set manually later
      organizer: {
        phone: data.organizerPhone,
        email: data.organizerEmail,
      },
    };

    const res = await fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (result.success) {
      alert("Event created successfully!");
    } else {
      alert("Failed to create event.");
      console.error(result.message || result);
    }
  } catch (error) {
    console.error("Error submitting event:", error);
    alert("Something went wrong.");
  }
};


  // Select options (for position example)
  const options = [
    { value: "member", label: "Member" },
    { value: "vice president", label: "Vice President" },
    { value: "president", label: "President" },
    { value: "coordinator", label: "Coordinator" },
    { value: "guest", label: "Guest" },
  ];

  // Handle select position change (optional example)
  const handleSelectChange = (value: string) => {
    console.log("Position selected:", value);
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setValue("image", files);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <PageBreadcrumb pageTitle="Event Form" />
<div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      {/* ----------- DefaultInputs (Event Details) ----------- */}
      <div className="space-y-6">
      <ComponentCard title="Event Details">
        <div className="space-y-6">
          {/* Title */}
          <div>
            <Label>Title</Label>
            <Input type="text" {...register("title")} />
            {errors.title && (
              <p className="text-red-600 text-sm">{errors.title.message}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <Label>Location</Label>
            <Input type="text" {...register("location")} />
            {errors.location && (
              <p className="text-red-600 text-sm">{errors.location.message}</p>
            )}
          </div>

          {/* Date */}
          <div>
            <Controller
              control={control}
              name="date"
              render={({ field }) => (
                <DatePicker
                  id="date-picker"
                  label="Date"
                  placeholder="Select a date"
                  onChange={(dates, currentDateString) =>
                    field.onChange(currentDateString)
                  }
                  // selected={field.value}
                />
              )}
            />
            {errors.date && (
              <p className="text-red-600 text-sm">{errors.date.message}</p>
            )}
          </div>

          {/* Time */}
          <div>
            <Label htmlFor="time">Time</Label>
            <div className="relative">
              <Input type="time" id="time" {...register("time")} />
              <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                <TimeIcon />
              </span>
            </div>
            {errors.time && (
              <p className="text-red-600 text-sm">{errors.time.message}</p>
            )}
          </div>
        </div>
      </ComponentCard>

      {/* ----------- TextAreaInput ----------- */}
      <ComponentCard title="Detail about event">
        <div className="space-y-6">
          <div>
            <Label>About event (1 line)</Label>
            <Input type="text" {...register("summary")} />
            {errors.summary && (
              <p className="text-red-600 text-sm">{errors.summary.message}</p>
            )}
          </div>
          <div>
            <Label>Description</Label>
            <Controller
              control={control}
              name="summary"
              render={({ field }) => (
                <TextArea
                  value={field.value}
                  onChange={field.onChange}
                  rows={6}
                />
              )}
            />
          </div>
        </div>
      </ComponentCard>
</div>
      {/* ----------- InputGroup (Organizer) ----------- */}
      <div className="space-y-6">
      <ComponentCard title="Organizer">
        <div className="space-y-6">
          <div>
            <Label>Email</Label>
            <div className="relative">
              <Input
                placeholder="info@gmail.com"
                type="text"
                {...register("organizerEmail")}
                className="pl-[62px]"
              />
              <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                <EnvelopeIcon />
              </span>
            </div>
            {errors.organizerEmail && (
              <p className="text-red-600 text-sm">
                {errors.organizerEmail.message}
              </p>
            )}
          </div>
          <div>
            <Label>Phone</Label>
            <Input
              placeholder="+1 (555) 000-0000"
              type="text"
              {...register("organizerPhone")}
            />
            {errors.organizerPhone && (
              <p className="text-red-600 text-sm">
                {errors.organizerPhone.message}
              </p>
            )}
          </div>
        </div>
      </ComponentCard>

      {/* ----------- FileInputExample ----------- */}
      <ComponentCard title="Upload Image">
        <div>
          <Label>Image</Label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="custom-class"
          />
         {typeof errors.image?.message === "string" && (
            <p className="text-red-600 text-sm">{errors.image.message}</p>
          )}
          {watchImage && watchImage.length > 0 && (
            <p className="text-green-600 text-sm">
              Selected file: {watchImage[0].name}
            </p>
          )}
        </div>
      </ComponentCard>
      </div>

      {/* ----------- Submit Button ----------- */}
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Submit Event
      </button>

      </div>
    </form>
  );
}


