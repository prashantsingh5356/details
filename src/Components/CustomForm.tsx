import { useForm } from "react-hook-form";
import { Select } from "chakra-react-select";
import { useRef } from "react";
import { AddIcon } from "@chakra-ui/icons";

import "./CustomForm.css";

const defaultValue = [
  { tech: "Java" },
  { tech: "Python" },
  { tech: "CPP" },
  { tech: "C#" },
];

const defaultOptions = [
  { value: "male", label: "Male", color: "white" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

function CustomForm() {
  const techList = defaultValue.map((val) => <input value={val.tech} />);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: "",
      dateOfBirth: "",
      techStack: [],
    },
  });

  console.log("testString", errors, getValues("gender")); // you can watch individual input by pass the name of the input

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
      })}
    >
      <h1 className="title">Basic Details</h1>
      <div className="form-container">
        <div className="form-Basic-details">
          <div className="form-element">
            <label>First Name</label>
            <input
              placeholder="First Name"
              {...register("firstName", {
                required: true,
                pattern:
                  /^[a-zA-Z]+(?:-[a-zA-Z]+)*(?: [a-zA-Z]+(?:-[a-zA-Z]+)*)*$/,
              })}
            />
          </div>
          <div className="form-element">
            <label>Last Name</label>
            <input
              placeholder="Last Name"
              {...register("lastName", {
                required: true,
                pattern:
                  /^[a-zA-Z]+(?:-[a-zA-Z]+)*(?: [a-zA-Z]+(?:-[a-zA-Z]+)*)*$/,
              })}
            />
          </div>
        </div>
        <h1 className="title">Other Information</h1>
        <div className="form-other-details">
          <div className="form-element">
            <label>Gender</label>
            <Select
              className="genderSelect"
              name="Gender"
              options={defaultOptions}
              placeholder="Gender"
              closeMenuOnSelect={false}
              size="lg"
              // value={"test"}
              onChange={(val: any) => {
                setValue("gender", val.label);
              }}
            />
          </div>
          <div className="form-element">
            <label>Date of Birth</label>
            <input
              type="date"
              placeholder="Date"
              {...register("dateOfBirth")}
            />
          </div>
        </div>
        <div className="form-tech-stack">
          <div>
            <div className="tech-stack_header">
              <label>Tech Stack</label>
              <AddIcon boxSize={4} />
            </div>
            <input
              type="text"
              placeholder="Enter tech stack"
              {...register("techStack")}
            />
          </div>
          <div className="form-tech-list">{techList}</div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-end",
        }}
      >
        <input type="submit" value="Submit" className="submit-btn" />
      </div>
    </form>
  );
}

export default CustomForm;
