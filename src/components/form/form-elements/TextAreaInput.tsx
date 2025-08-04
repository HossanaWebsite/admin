"use client";
import React, { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import TextArea from "../input/TextArea";
import Label from "../Label";
import Input from "../input/InputField";

interface TextAreaInputProps {
  title: string;
  event?:boolean
}

export default function TextAreaInput({ title,event }: TextAreaInputProps) {
  const [message, setMessage] = useState("");
  const [messageTwo, setMessageTwo] = useState("");
  return (
    <ComponentCard title={title}>
      <div className="space-y-6">
        {/* Default TextArea */}

        {
          event && (
             <div>
               <Label>about event (1 line)</Label>
               <Input type="text" />
             </div>
          )
        }
        <div>
          <Label>Description</Label>
          <TextArea
            value={message}
            onChange={(value) => setMessage(value)}
            rows={6}
          />
        </div>

        {/* Disabled TextArea */}
        {/* <div>
          <Label>Description</Label>
          <TextArea rows={6} disabled />
        </div> */}

        {/* Error TextArea */}
        {/* <div>
          <Label>Description</Label>
          <TextArea
            rows={6}
            value={messageTwo}
            error
            onChange={(value) => setMessageTwo(value)}
            hint="Please enter a valid message."
          />
        </div> */}
      </div>
    </ComponentCard>
  );
}
