import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import CheckboxComponents from "@/components/form/form-elements/CheckboxComponents";
import DefaultInputs from "@/components/form/form-elements/DefaultInputs";
import DropzoneComponent from "@/components/form/form-elements/DropZone";
import FileInputExample from "@/components/form/form-elements/FileInputExample";
import InputGroup from "@/components/form/form-elements/InputGroup";
import InputStates from "@/components/form/form-elements/InputStates";
import RadioButtons from "@/components/form/form-elements/RadioButtons";
import SelectInputs from "@/components/form/form-elements/SelectInputs";
import TextAreaInput from "@/components/form/form-elements/TextAreaInput";
import ToggleSwitch from "@/components/form/form-elements/ToggleSwitch";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Event Form ",
  description:
    "This is Next.js Form Elements page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

export default function FormElements() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Event Form" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <DefaultInputs title="Event Details" labelTitle="Title" fields={['location', 'date', 'time']} />
          {/* <SelectInputs /> */}
          <TextAreaInput title="Detail about event" event={true}/>
          {/* <InputStates /> */}
        </div>
        <div className="space-y-6">
          <InputGroup title="Organizer" />
          <FileInputExample title="upload image"/>
          {/* <CheckboxComponents /> */}
          {/* <RadioButtons /> */}
          {/* <ToggleSwitch /> */}
          <DropzoneComponent />
        </div>
      </div>
    </div>
  );
}
