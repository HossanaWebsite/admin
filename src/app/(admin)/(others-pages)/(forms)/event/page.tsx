"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import DatePicker from "@/components/form/date-picker";
import TextArea from "@/components/form/input/TextArea";
import { TimeIcon, EnvelopeIcon } from "@/icons";

// --- Zod schema ---
const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  location: z.string().min(1, "Location is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  summary: z.string().min(5, "Summary must be at least 5 characters"),
  organizerEmail: z.string().email("Invalid email address"),
  organizerPhone: z.string().min(1, "Phone is required"),
  paragraphs: z.string().optional(),
  image: z
    .any()
    .refine((files) => files?.length === 1, "Image is required")
    .optional(),
});


type EventFormType = z.infer<typeof eventSchema>;

// Helper to format day like "feb-23"
function formatDay(dateString: string) {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { month: "short", day: "2-digit" };
  return date
    .toLocaleDateString("en-US", options)
    .toLowerCase()
    .replace(/\s/g, "-");
}

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

  // Watch image input
  const watchImage = watch("image");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setValue("image", files);
  };

  const onSubmit = async (data: EventFormType) => {
    try {
      // Format day string like "feb-23"
      const day = formatDay(data.date);

      // Slug & uniqueId: title lowercase + day string
      const baseSlug = data.title.toLowerCase().replace(/\s+/g, "-");
      const slug = `${baseSlug}-${day}`;
      const paragraphsArray = data.paragraphs
  ? data.paragraphs.split(/\n{2,}|\r?\n/).map(p => p.trim()).filter(Boolean)
  : []

      const payload = {
        uniqueId: slug,
        slug,
        title: data.title,
        summary: data.summary,
        url: `https://yourdomain.com/events/${slug}`,
        image: `/uploads/${data.image?.[0]?.name || "default.jpg"}`,
        picPath: `/uploads/${data.image?.[0]?.name || "default.jpg"}`,
        day,
        eventName: data.title,
        location: data.location,
        start: new Date(`${data.date}T${data.time}`),
        end: new Date(`${data.date}T${data.time}`),
        date: new Date(`${data.date}T${data.time}`),
        paragraphs: paragraphsArray, // empty array for now
        organizer: {
          phone: data.organizerPhone,
          email: data.organizerEmail,
        },
      };

        console.log(payload)

      const res = await fetch("/api/event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      console.log(res)

      const result = await res.json();

      if (res.ok && result.success) {
        toast.success("Event created successfully!");
        // alert("Event created successfully!");
      } else {
        // alert("Failed to create event.");
        toast.error(result.message || "Failed to create event.");
        console.error(result.message || result);
      }
    } catch (error) {
      console.error("Error submitting event:", error);
      toast.error("Something went wrong.");
      // alert("Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <PageBreadcrumb pageTitle="Event Form" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ComponentCard title="Event Details">
          <div className="space-y-6">
            <div>
              <Label>Title</Label>
              <Input type="text" {...register("title")} />
              {errors.title && (
                <p className="text-red-600 text-sm">{errors.title.message}</p>
              )}
            </div>

            <div>
              <Label>Location</Label>
              <Input type="text" {...register("location")} />
              {errors.location && (
                <p className="text-red-600 text-sm">{errors.location.message}</p>
              )}
            </div>

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
                  />
                )}
              />
              {errors.date && (
                <p className="text-red-600 text-sm">{errors.date.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="time">Time</Label>
              <Input type="time" id="time" {...register("time")} />
              {errors.time && (
                <p className="text-red-600 text-sm">{errors.time.message}</p>
              )}
            </div>
          </div>
        </ComponentCard>

        <ComponentCard title="About Event">
          <div className="space-y-6">
            <div>
              <Label>Summary</Label>
              <Input type="text" {...register("summary")} />
              {errors.summary && (
                <p className="text-red-600 text-sm">{errors.summary.message}</p>
              )}
            </div>
            <div>
              <Label>Description</Label>
                <Controller
                    control={control}
                    name="paragraphs"
                    render={({ field }) => (
                      <TextArea
                        placeholder="Separate each paragraph with a new line"
                        rows={6}
                        {...field}
                      />
                    )}
                  />
              <small className="text-gray-500">Each paragraph should be separated by a new line.</small>
            </div>
          </div>
        </ComponentCard>

        <ComponentCard title="Organizer">
          <div className="space-y-6">
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="info@gmail.com"
                {...register("organizerEmail")}
              />
              {errors.organizerEmail && (
                <p className="text-red-600 text-sm">
                  {errors.organizerEmail.message}
                </p>
              )}
            </div>
            <div>
              <Label>Phone</Label>
              <Input
                type="text"
                placeholder="+1 (555) 000-0000"
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

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Submit Event
      </button>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </form>
  );
}
